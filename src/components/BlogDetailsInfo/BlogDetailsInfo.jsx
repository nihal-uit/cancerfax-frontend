import React, { useEffect, useMemo, useRef, useState } from "react";
import { renderRichTextWithImages } from "../../utils/strapiHelpers";
import { getMediaUrl } from "../../services/api";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FIXED_SECTIONS = [
  { id: "author", label: "Author" },
  { id: "related_tags", label: "Related Tags" },
];

const getSectionId = (value) =>
  typeof value === "number" ? `section-${value}` : String(value);

const BlogDetailsInfo = ({ data }) => {
  const [activeId, setActiveId] = useState("about");
  const sectionRefs = useRef({});

  const sections = useMemo(() => {
    const contentArray = Array.isArray(data?.content) ? [...data.content] : [];

    const dynamicSections = contentArray
      .sort((a, b) => a.order - b.order)
      .map((c) => ({
        id: c.section_name,
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
      rootMargin: "-45% 0px -45% 0px", // center-ish
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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hospitalDetailsInfo_sec py-120">
      <div className="containerWrapper">
        <div className="hospitalDetailsInfo_wrap">
          <aside className="sidebar disease-sidebar">
            <ul>
              {sections.map((item) => (
                <li
                  key={item.id}
                  className={item.id === activeId ? "active" : ""}
                  onClick={() => handleClick(item.id)}
                >
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hospitalDetails_info blogDetails_info doctorsDetails_info">
            {data.featured_video ? (
              <div className="featuredMedia mb-4">
                <video
                  controls
                  style={{ width: "100%", borderRadius: "8px" }}
                >
                  <source src={getMediaUrl(data.featured_video)} type="video/mp4" />
                </video>
              </div>
            ) : data.featured_image ? (
              <div className="featuredMedia mb-4">
                <img
                  src={getMediaUrl(data.featured_image)}
                  alt="featured"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>
            ) : null}

            {sections.map((section) => {
              if (section.id === "author") {
                const authorName = `${data.author?.firstName || ""} ${
                  data.author?.lastName || ""
                }`.trim();
                const authorAvatar = getMediaUrl(data.author?.profilePicture);
                const firstInitial = authorName.charAt(0).toUpperCase();
                const hasAvatar = !!authorAvatar;

                return (
                  <div
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-20">
                      <div className="row g-4">
                        <div className="col-lg-4">
                          <div className="doctors-details-img">
                            {hasAvatar ? (
                              <img src={authorAvatar} alt="author_image" />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  minHeight: "300px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background:
                                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  color: "#ffffff",
                                  fontSize: "120px",
                                  fontWeight: "700",
                                  textTransform: "uppercase",
                                  borderRadius: "8px",
                                }}
                              >
                                {firstInitial || "A"}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="content-gap-20">
                            <h4 className="f-w-600">
                              {authorName || "Author"}
                            </h4>
                            <AuthorBio bio={data.author?.bio} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (section.id === "related_tags") {
                return (
                  <div
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className="section"
                  >
                    <div className="commContent_wrap content-gap-20">
                      <div className="row g-4">
                        <div className="col-lg-12">
                          <div className="content-gap-20">
                            <h4 className="f-w-600">Related Tags</h4>
                            <div className="tags_wrap">
                              <ul className="tags_ul">
                                {data?.resource_tags?.map((tag) => (
                                  <li key={tag.id}>{tag.name}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="blog-arrow-wrap">
                      {data?.content?.length > 0 &&
                        data?.content?.length === 1 && (
                          <>
                            <div className="blog-arrow-left"></div>

                            <div className="blog-arrow-right">
                              <p>{data.content[0].heading}</p>
                              {data.content[0].heading ? (
                                <Link
                                  className="arrow-btn"
                                  to={
                                    data?.content?.[0]?.documentId
                                      ? `/resources/${data.content[0].documentId}`
                                      : "#"
                                  }
                                >
                                  <ArrowRight />
                                </Link>
                              ) : null}
                            </div>
                          </>
                        )}

                      {data?.content?.length >= 2 && (
                        <>
                          <div className="blog-arrow-left">
                            {data.content[0].heading ? (
                              <Link
                                className="arrow-btn"
                                to={
                                  data?.content?.[0]?.documentId
                                    ? `/resources/${data.content[0].documentId}`
                                    : "#"
                                }
                              >
                                <ArrowLeft />
                              </Link>
                            ) : null}
                            <p>{data.content[0].heading}</p>
                          </div>

                          <div className="blog-arrow-right">
                            <p>{data.content[1].heading}</p>
                            {data.content[1].heading ? (
                              <Link
                                className="arrow-btn"
                                to={
                                  data?.content?.[1]?.documentId
                                    ? `/resources/${data.content[1].documentId}`
                                    : "#"
                                }
                              >
                                <ArrowRight />
                              </Link>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="section"
                >
                  <div className="commContent_wrap content-gap-24">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="content-gap-20">
                          <h4 className="f-w-600">
                            {section.label
                              ? section.label[0].toUpperCase() +
                                section.label.slice(1)
                              : ""}
                          </h4>
                          {
                            section?.content?.cta
                              ? <CTAButton
                                to={section?.content?.cta?.URL}
                                target={section?.content?.cta?.target}
                                className="btn btn-pink-solid align-right"
                              >
                                {section?.content?.cta?.text}
                              </CTAButton>
                            : null
                          }
                          {
                            section?.content?.featured_video
                              ? <div className="featuredMedia">
                                <video
                                  controls
                                  style={{ width: "100%", borderRadius: "8px" }}
                                >
                                  <source src={getMediaUrl(section?.content?.featured_video)} type="video/mp4" />
                                </video>
                              </div>
                            : null
                          }
                           {
                            section?.content?.featured_image
                              ? <div className="featuredMedia">
                                <img
                                  src={getMediaUrl(section?.content?.featured_image)}
                                  alt="featured"
                                  style={{ width: "100%", borderRadius: "8px" }}
                                />
                              </div>
                            : null
                          }
                          {renderRichTextWithImages(
                            section.content?.description_block
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

  const safeBio = bio || "";
  const shortBio = safeBio.slice(0, 500);

  return (
    <p className="text-16">
      {expanded ? safeBio : shortBio}

      {safeBio?.length && safeBio?.length > 500 && (
        <>
          {!expanded ? "..." : ""}

          <button
            onClick={() => setExpanded(!expanded)}
            className="readMoreBtn"
            style={{
              border: "none",
              background: "none",
              color: "#FF69B4",
              fontWeight: "600",
              cursor: "pointer",
              marginLeft: "6px",
              padding: 0,
            }}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </>
      )}
    </p>
  );
};

const topMedia = (data) => {
  if (data.featured_video) {
    return (
      <div className="featuredMedia">
        <video
          controls
          style={{ width: "100%", borderRadius: "8px" }}
        >
          <source src={getMediaUrl(data.featured_video)} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (data.featured_image) {
    return (
      <div className="featuredMedia">
        <img
          src={getMediaUrl(data.featured_image)}
          alt="featured"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>
    );
  }

  return null;
};

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="10"
    viewBox="0 0 17 10"
    fill="none"
  >
    <path
      d="M11.4717 9.05705C11.7363 9.30201 12.1653 9.30189 12.43 9.05705L16.7427 5.06401C17.0073 4.81899 17.0073 4.42182 16.7427 4.1768L12.43 0.183757C12.1653 -0.0610779 11.7363 -0.0612019 11.4717 0.183757C11.2072 0.428717 11.2073 0.825928 11.4717 1.07096L14.6277 3.99299H0V5.24782H14.6277L11.4717 8.16984C11.2073 8.41488 11.2072 8.81209 11.4717 9.05705Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="10"
    viewBox="0 0 17 10"
    fill="none"
  >
    <path
      d="M5.46968 9.05705C5.20511 9.30201 4.7761 9.30189 4.51144 9.05705L0.198709 5.06401C-0.0659302 4.81899 -0.0659303 4.42182 0.198709 4.1768L4.51144 0.183757C4.7761 -0.0610779 5.20511 -0.0612019 5.46968 0.183757C5.73425 0.428717 5.73412 0.825928 5.46968 1.07096L2.31372 3.99299H16.9414V5.24782H2.31372L5.46968 8.16984C5.73412 8.41488 5.73425 8.81209 5.46968 9.05705Z"
      fill="currentColor"
    />
  </svg>
);

const CTAButton = styled(Link)`
  background: ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
  max-width: 200px;
  @media (max-width: 575px) {
    max-width: 100%;
  }
  align-self: flex-end;
`;

export default BlogDetailsInfo;
