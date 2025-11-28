import React, { useEffect, useMemo, useRef, useState } from 'react';
import { renderRichTextWithImages } from '../../utils/strapiHelpers';
import { getMediaUrl } from '../../services/api';

const FIXED_SECTIONS = [
  { id: 'author', label: 'Author' },
  { id: 'related_tags', label: 'Related Tags' },
];

const getSectionId = (value) =>
  typeof value === 'number' ? `section-${value}` : String(value);

const BlogDetailsInfo = ({ data, loading }) => {
  const [activeId, setActiveId] = useState('about');
  const sectionRefs = useRef({});

  const sections = useMemo(() => {
    const contentArray = Array.isArray(data?.content) ? [...data.content] : [];

    const dynamicSections = contentArray
      .sort((a, b) => a.order - b.order)
      .map((c) => ({
        id: getSectionId(c.id),
        label: c.section_name,
        content: c,
      }));

    const fixedSections = FIXED_SECTIONS.map((section) => ({
      ...section,
      id: getSectionId(section.id),
    }));

    return [...dynamicSections, ...fixedSections];
  }, [data?.content]);

  // Scroll spy – highlight active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // center-ish
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className='hospitalDetailsInfo_sec py-120'>
      <div className='containerWrapper'>
        <div className='hospitalDetailsInfo_wrap'>
          <aside className='sidebar'>
            <ul>
              {sections.map((item) => (
                <li
                  key={item.id}
                  className={item.id === activeId ? 'active' : ''}
                  onClick={() => handleClick(item.id)}
                >
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className='hospitalDetails_info blogDetails_info doctorsDetails_info'>
            {sections.map((section) => {
              if (section.id === 'author') {
                const authorName = `${data.author?.firstName || ''} ${
                  data.author?.lastName || ''
                }`.trim();
                const authorAvatar = getMediaUrl(data.author?.avatar);
                const firstInitial = authorName.charAt(0).toUpperCase();
                const hasAvatar = !!authorAvatar;

                return (
                  <div
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className='section'
                  >
                    <div className='commContent_wrap content-gap-20'>
                      <div className='row g-4'>
                        <div className='col-lg-4'>
                          <div className='doctors-details-img'>
                            {hasAvatar ? (
                              <img src={authorAvatar} alt='author_image' />
                            ) : (
                              <div
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  minHeight: '300px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background:
                                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  color: '#ffffff',
                                  fontSize: '120px',
                                  fontWeight: '700',
                                  textTransform: 'uppercase',
                                  borderRadius: '8px',
                                }}
                              >
                                {firstInitial || 'A'}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-lg-8'>
                          <div className='content-gap-20'>
                            <h4 className='f-w-600'>
                              {authorName || 'Author'}
                            </h4>
                            <AuthorBio bio={data.author?.bio} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (section.id === 'related_tags') {
                return (
                  <div
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className='section'
                  >
                    <div className='commContent_wrap content-gap-20'>
                      <div className='row g-4'>
                        <div className='col-lg-12'>
                          <div className='content-gap-20'>
                            <h4 className='f-w-600'>Related Tags</h4>
                            <div className='tags_wrap'>
                              <ul className='tags_ul'>
                                {data.tags?.map((tag) => (
                                  <li key={tag.id}>{tag.name}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className='section'
                >
                  <div className='commContent_wrap content-gap-24'>
                    <div className='row g-4'>
                      <div className='col-lg-12'>
                        <div className='content-gap-20'>
                          <h4 className='f-w-600'>{section.label}</h4>
                          {renderRichTextWithImages(
                            section.content?.description
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const AuthorBio = ({ bio }) => {
  const [expanded, setExpanded] = useState(false);

  const safeBio = bio || ''; // <-- prevents null / undefined issues
  const shortBio = safeBio.slice(0, 500);

  return (
    <p className='text-16'>
      {expanded ? safeBio : shortBio}

      {safeBio.length > 500 && (
        <>
          {!expanded ? '...' : ''}

          <button
            onClick={() => setExpanded(!expanded)}
            className='readMoreBtn'
            style={{
              border: 'none',
              background: 'none',
              color: '#FF69B4',
              fontWeight: '600',
              cursor: 'pointer',
              marginLeft: '6px',
              padding: 0,
            }}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        </>
      )}
    </p>
  );
};

export default BlogDetailsInfo;
