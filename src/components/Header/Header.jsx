import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setCurrentLanguage } from '../../store/slices/navigationSlice';
import { getMediaUrl } from '../../services/api';
import { formatMedia } from '../../utils/strapiHelpers';
import { fetchMenuData } from '../../store/slices/globalSlice';

const Header = ({ darkText = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const menuFetchAttemptedRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  // Generic dropdown state management using item IDs
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedTreatmentCategory, setSelectedTreatmentCategory] =
    useState(null);
  const [hoverTimeouts, setHoverTimeouts] = useState({});
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({
    about: false,
    hospitals: false,
    treatments: false,
    clinicalTrials: false,
    resources: false,
  });
  const [mobileTreatmentCategory, setMobileTreatmentCategory] = useState(null);

  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector((state) => state.global?.loading);
  const { menuData, loading: menuLoading } = useSelector(
    (state) => state.global
  );

  // Only fetch menu once when missing; avoid infinite retry loop when API is down/slow
  useEffect(() => {
    if (!menuData && !menuLoading && !menuFetchAttemptedRef.current) {
      menuFetchAttemptedRef.current = true;
      dispatch(fetchMenuData());
    }
  }, [dispatch, menuData, menuLoading]);

  const { currentLanguage } = useSelector((state) => state.navigation);

  const headerMenuRaw = globalData?.headerMenu;
  const headerMenu = headerMenuRaw?.data?.attributes || headerMenuRaw;

  const globalCtaLabel = globalData?.ctaLabel;
  const globalCtaUrl = globalData?.ctaUrl;

  const navbarDataRaw = globalData?.navbar;
  const navbarData = navbarDataRaw?.data?.attributes || navbarDataRaw || null;
  const navbarMenu = navbarData?.menu;

  const navbarCta = navbarData?.cta || null;

  // Legacy navbar structure (fallback - check for menuItems directly)
  const legacyMenuItems = navbarData?.menuItems || [];

  const languages = navbarData?.languages || [];
  const buttons = navbarData?.buttons || null;

  // Transform Strapi menu structure to component format
  const transformMenuItems = (menu) => {
    if (!menu || !menu.items) return [];

    // Get top-level items (no parent)
    const topLevelItems = menu.items.filter(
      (item) => !item.parent || !item.parent.id
    );

    // Sort by order
    topLevelItems.sort((a, b) => (a.order || 0) - (b.order || 0));

    // Transform to component format
    return topLevelItems.map((item) => ({
      id: item.id,
      label: item.label || '',
      link: item.external_url || item.internal_path || '#',
      type: item.type || 'link',
      isClickable: item.is_clickable !== false,
      order: item.order || 0,
      children: item.children
        ? transformMenuItems({ items: item.children })
        : null,
      links: item.links || null, // For mega menu component links
      icon: item.icon || null,
    }));
  };

  // Extract menu items from new structure (headerMenu) or navbar.menu or legacy
  const strapiMenuItems = headerMenu
    ? transformMenuItems(headerMenu)
    : navbarMenu
      ? transformMenuItems(navbarMenu)
      : [];
  const menuItems =
    strapiMenuItems.length > 0 ? strapiMenuItems : legacyMenuItems;

  // CTA: prioritize new structure (globalCtaLabel/globalCtaUrl), then navbar.cta, then legacy buttons
  // Actual API structure: navbar.cta has { text, URL, target, variant }
  const actualCtaLabel = globalCtaLabel || navbarCta?.text || null;
  const actualCtaUrl = globalCtaUrl || navbarCta?.URL || null;

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuOpen && !event.target.closest('[data-language-menu]')) {
        setLanguageMenuOpen(false);
      }
      // Generic dropdown close handler
      Object.keys(openDropdowns).forEach((dropdownKey) => {
        if (
          openDropdowns[dropdownKey] &&
          !event.target.closest(`[data-dropdown="${dropdownKey}"]`)
        ) {
          setOpenDropdowns((prev) => ({
            ...prev,
            [dropdownKey]: false,
          }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [languageMenuOpen, openDropdowns]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageToggle = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const { i18n } = useTranslation();

  const handleLanguageSelect = (language) => {
    const langCode = language.code || language;
    // Update i18n language
    if (i18n) {
      i18n.changeLanguage(langCode);
    }
    // Update Redux store
    dispatch(setCurrentLanguage(language));
    // Save to localStorage
    localStorage.setItem('preferredLanguage', langCode);
    setLanguageMenuOpen(false);
  };

  // Generic dropdown handlers
  const clearHoverTimeout = (key) => {
    if (hoverTimeouts[key]) {
      clearTimeout(hoverTimeouts[key]);
      setHoverTimeouts((prev) => {
        const newTimeouts = { ...prev };
        delete newTimeouts[key];
        return newTimeouts;
      });
    }
  };

  const setHoverTimeout = (key, callback, delay = 300) => {
    clearHoverTimeout(key);
    const timeout = setTimeout(callback, delay);
    setHoverTimeouts((prev) => ({
      ...prev,
      [key]: timeout,
    }));
  };

  // Generic dropdown toggle handler
  const handleDropdownToggle = (dropdownKey) => (e) => {
    e.preventDefault();
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey],
    }));
  };

  // Generic dropdown mouse enter handler
  const handleDropdownMouseEnter = (dropdownKey) => () => {
    if (window.innerWidth > 768) {
      // Close all other dropdowns
      setOpenDropdowns((prev) => {
        const newState = {};
        Object.keys(prev).forEach((key) => {
          newState[key] = false;
        });
        return newState;
      });
      // Clear all timeouts
      Object.keys(hoverTimeouts).forEach((key) => clearHoverTimeout(key));
      clearHoverTimeout(dropdownKey);
      setOpenDropdowns((prev) => ({
        ...prev,
        [dropdownKey]: true,
      }));
    }
  };

  // Generic dropdown mouse leave handler
  const handleDropdownMouseLeave = (dropdownKey) => (e) => {
    if (window.innerWidth > 768) {
      const relatedTarget = e.relatedTarget;
      const wrapper = e.currentTarget;

      // Check if mouse is moving to another nav item or its dropdown
      if (relatedTarget && relatedTarget.closest) {
        const isMovingToNavItem = relatedTarget.closest('[data-dropdown]');
        if (isMovingToNavItem) {
          return;
        }
        if (wrapper.contains(relatedTarget)) {
          return;
        }
      }

      setHoverTimeout(
        dropdownKey,
        () => {
          setOpenDropdowns((prev) => ({
            ...prev,
            [dropdownKey]: false,
          }));
        },
        250
      );
    }
  };

  // Generic dropdown close handler
  const handleDropdownMenuClose = (dropdownKey) => () => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownKey]: false,
    }));
  };

  const toggleMobileSubMenu = (menuKey) => {
    setMobileSubMenuOpen((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const defaultLanguages = [
    { id: 1, name: 'English', code: 'en', flag: '🇬🇧' },
    { id: 2, name: 'Spanish', code: 'es', flag: '🇪🇸' },
    { id: 3, name: 'French', code: 'fr', flag: '🇫🇷' },
    { id: 4, name: 'German', code: 'de', flag: '🇩🇪' },
    { id: 5, name: 'Chinese', code: 'zh', flag: '🇨🇳' },
  ];

  // Transform menu data coming from `/api/menu-items` (menuData in global slice)
  // Sample structure reference: menu.json at project root
  const transformMenuDataFromApi = (rawMenuData) => {
    if (!rawMenuData || !Array.isArray(rawMenuData)) return [];

    const normalizeItem = (item) => {
      if (!item) return null;
      // Handle Strapi shape: { id, attributes: { ...fields } }
      if (item.attributes) {
        return { id: item.id, ...item.attributes };
      }
      return item;
    };

    const mapItem = (rawItem) => {
      const item = normalizeItem(rawItem);
      if (!item) return null;

      const children = Array.isArray(item.children)
        ? item.children.map(mapItem).filter(Boolean)
        : [];

      return {
        id: item.id,
        label: (item.label || '').trim(),
        slug: item.slug,
        type: item.type || 'link',
        isClickable: item.is_clickable !== false,
        is_clickable: item.is_clickable,
        order: item.order || 0,
        internal_path: item.internal_path,
        external_url: item.external_url,
        link: item.external_url || item.internal_path || '#',
        children,
      };
    };

    // Top-level items are those without a parent
    const normalized = rawMenuData.map(normalizeItem).filter(Boolean);
    const topLevelItems = normalized.filter(
      (item) => !item.parent || !item.parent.id
    );

    topLevelItems.sort((a, b) => (a.order || 0) - (b.order || 0));

    return topLevelItems.map(mapItem).filter(Boolean);
  };

  const apiMenuItems =
    menuData && Array.isArray(menuData)
      ? transformMenuDataFromApi(menuData)
      : [];

  const navigationLinks =
    apiMenuItems && apiMenuItems.length > 0
      ? apiMenuItems
      : menuItems && menuItems.length > 0
        ? menuItems
        : globalLoading || menuLoading
          ? []
          : [];

  const extractLogoUrl = useCallback((media) => {
    if (!media) return null;

    if (typeof media === 'string') {
      const trimmed = media.trim();
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    // Handle Strapi v4 media structure: { id, name, hash, url, ... }
    // When populated, logo has: { id, documentId, name, hash, url, ... }
    if (media.url) {
      const trimmed =
        typeof media.url === 'string' ? media.url.trim() : media.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    // Handle nested data.attributes.url structure
    if (media.data?.attributes?.url) {
      const trimmed =
        media.data.attributes.url?.trim?.() ?? media.data.attributes.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    if (media.attributes?.url) {
      const trimmed = media.attributes.url?.trim?.() ?? media.attributes.url;
      if (!trimmed) return null;
      return getMediaUrl(trimmed);
    }

    // Some Strapi responses might nest the media object deeper
    if (Array.isArray(media.data) && media.data.length > 0) {
      const nestedAttributesUrl = media.data[0]?.attributes?.url;
      if (nestedAttributesUrl) {
        return getMediaUrl(nestedAttributesUrl);
      }
    }

    // Handle hash-based URL construction (Strapi v4 pattern)
    // If we have hash and name, construct URL: /uploads/{hash}_{name}
    if (media.hash && media.name) {
      const hash = media.hash.trim();
      const name = media.name.trim();
      return getMediaUrl(`/uploads/${hash}_${name}`);
    }

    if (media.logo && media.logo !== media) {
      return extractLogoUrl(media.logo);
    }

    // As a last resort, check common fields
    if (media.src) {
      return getMediaUrl(media.src);
    }

    return null;
  }, []);

  // Languages handling
  const availableLanguages =
    languages && languages.length > 0 ? languages : defaultLanguages;
  const selectedLanguage = currentLanguage || availableLanguages[0];

  // Language flag/icon handling - check multiple possible fields
  const languageIcon = selectedLanguage?.flagImage?.data?.attributes?.url
    ? getMediaUrl(selectedLanguage.flagImage.data.attributes.url)
    : selectedLanguage?.flag?.data?.attributes?.url
      ? getMediaUrl(selectedLanguage.flag.data.attributes.url)
      : null;

  // Button handling - use actual API structure
  // Priority: globalCtaLabel/globalCtaUrl > navbar.cta > legacy buttons > default
  const connectButtonText =
    actualCtaLabel ||
    buttons?.connectButtonText ||
    buttons?.connectButton?.text ||
    'Connect With Us';
  const connectButtonLink =
    actualCtaUrl ||
    buttons?.connectButtonLink ||
    buttons?.connectButton?.link ||
    '/contact-us';

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run on mount in case page is already scrolled

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if a link is active
  const isLinkActive = useCallback((link) => {
    if (!link || link === '#') return false;

    // Remove leading/trailing slashes and normalize
    const normalizePath = (path) => {
      if (!path) return '';
      // Remove protocol and domain if present
      const cleanPath = path.replace(/^https?:\/\/[^/]+/, '');
      return cleanPath.replace(/^\/+|\/+$/g, '').toLowerCase();
    };

    const currentPath = normalizePath(location.pathname);
    const linkPath = normalizePath(link);

    // Exact match
    if (currentPath === linkPath) return true;

    // For home page
    if (linkPath === '' && currentPath === '') return true;

    // Check if current path starts with link path (for nested routes)
    // This allows parent paths to be highlighted when child pages are active
    // e.g., /treatments should be active when on /treatments/car-t-cell
    // Only match if linkPath is not empty and current path is a child of the link path
    if (linkPath && linkPath !== currentPath) {
      // Check if current path is a child route (starts with linkPath + '/')
      if (currentPath.startsWith(linkPath + '/')) {
        return true;
      }
    }

    return false;
  }, [location.pathname]);

  return (
    <NavContainer
      $darkText={darkText}
      className={`header ${isSticky ? 'header-fixed' : ''} ${darkText ? '' : 'header-overlay'
        }`}
    >
      <NavContent>
        <Logo href='/'>
          {darkText ? (
            <img src={'/images/logo-dark.svg'} alt='CancerFax' />
          ) : (
            <img src={formatMedia(globalData?.navbarLogoUrl)} alt='CancerFax' />
          )}
        </Logo>

        <NavMenu $darkText={darkText}>
          {navigationLinks.map((item, index) => {
            const label = (item.label || '').trim();
            const itemType = item.type || 'link';
            const children = Array.isArray(item.children) ? item.children : [];
            const hasChildren = children.length > 0;
            const dropdownKey = item.id || item.slug || `menu-${index}`;

            // Get the link URL - prioritize internal_path, then external_url, then item.link
            const itemLink =
              item.internal_path ||
              item.external_url ||
              item.link ||
              `#${label.toLowerCase().replace(/\s+/g, '-')}`;

            // Check if this item or any of its children is active
            const checkItemActive = (menuItem) => {
              const menuItemLink =
                menuItem.internal_path ||
                menuItem.external_url ||
                menuItem.link ||
                '#';
              if (isLinkActive(menuItemLink)) return true;
              if (Array.isArray(menuItem.children)) {
                return menuItem.children.some(checkItemActive);
              }
              return false;
            };
            const isItemActive = checkItemActive(item);

            // Determine if item should be clickable based on type and children
            // 1. Category without children -> clickable
            // 2. Subcategory without children -> clickable
            // 3. Link -> always clickable
            // 4. Item with is_clickable = true and internal_path not null -> clickable (even with children)
            const shouldBeClickable =
              itemType === 'link' ||
              (itemType === 'category' && !hasChildren) ||
              (itemType === 'subcategory' && !hasChildren) ||
              (item.is_clickable === true && item.internal_path !== null);

            // Determine if this item should have a dropdown
            // Only show dropdown if category has children
            const shouldShowDropdown = hasChildren && itemType === 'category';

            // If item is clickable and has dropdown, clicking should navigate (not just toggle dropdown)
            const shouldNavigateOnClick = shouldBeClickable && shouldShowDropdown;

            // Check if children are subcategories (for TreatmentsDropdown layout)
            const hasSubcategories = children.some(
              (child) => (child.type || '').toLowerCase() === 'subcategory'
            );

            // If no dropdown needed, render as simple clickable link
            // This handles: categories without children, subcategories without children, and links
            if (!shouldShowDropdown) {
              // Use isItemActive which checks both the item itself and all its children
              return (
                <NavLink
                  key={item.id || index}
                  href={shouldBeClickable ? itemLink : '#'}
                  $darkText={darkText}
                  $isActive={isItemActive}
                >
                  {label}
                </NavLink>
              );
            }

            // If item has subcategories, check if any have children
            if (hasSubcategories) {
              // Separate subcategories: those with children (for selection) and those without (render as links)
              const subcategoriesWithChildren = children.filter((child) => {
                const isSubcategory =
                  (child.type || '').toLowerCase() === 'subcategory';
                const hasChildren =
                  Array.isArray(child.children) && child.children.length > 0;
                return isSubcategory && hasChildren;
              });

              const subcategoriesWithoutChildren = children.filter((child) => {
                const isSubcategory =
                  (child.type || '').toLowerCase() === 'subcategory';
                const hasChildren =
                  Array.isArray(child.children) && child.children.length > 0;
                return isSubcategory && !hasChildren;
              });

              // Only show left column if there are subcategories with children
              const hasSelectableSubcategories =
                subcategoriesWithChildren.length > 0;

              // If no subcategories have children, use standard AboutDropdown (narrow width)
              if (
                !hasSelectableSubcategories &&
                subcategoriesWithoutChildren.length > 0
              ) {
                return (
                  <NavLinkWrapper
                    key={item.id || index}
                    data-dropdown={dropdownKey}
                    onMouseEnter={handleDropdownMouseEnter(dropdownKey)}
                    onMouseLeave={handleDropdownMouseLeave(dropdownKey)}
                  >
                    <NavLink
                      href={shouldNavigateOnClick ? itemLink : '#'}
                      onClick={shouldNavigateOnClick ? handleDropdownMenuClose(dropdownKey) : handleDropdownToggle(dropdownKey)}
                      $darkText={darkText}
                      $isActive={isItemActive}
                    >
                      {label}
                    </NavLink>
                    <AboutDropdown
                      isOpen={openDropdowns[dropdownKey] || false}
                      onMouseEnter={handleDropdownMouseEnter(dropdownKey)}
                      onMouseLeave={handleDropdownMouseLeave(dropdownKey)}
                    >
                      <DropdownHeader>
                        <DropdownHeaderIcon hasIcon={children.length > 0}>
                          {children.length > 0 && (
                            <svg
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M19 14C19 15.3261 18.4732 16.5979 17.5355 17.5355C16.5979 18.4732 15.3261 19 14 19C12.6739 19 11.4021 18.4732 10.4645 17.5355C9.52678 16.5979 9 15.3261 9 14C9 12.6739 9.52678 11.4021 10.4645 10.4645C11.4021 9.52678 12.6739 9 14 9C15.3261 9 16.5979 9.52678 17.5355 10.4645C18.4732 11.4021 19 12.6739 19 14Z'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M12 6L8 10H11V18H17V10H20L16 6H12Z'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          )}
                        </DropdownHeaderIcon>
                        <DropdownHeaderText>{label}</DropdownHeaderText>
                      </DropdownHeader>
                      {subcategoriesWithoutChildren.map((subcategory) => {
                        const subcategoryUrl =
                          subcategory.internal_path ||
                          subcategory.external_url ||
                          subcategory.link ||
                          '#';
                        const isSubcategoryActive = isLinkActive(subcategoryUrl);
                        return (
                          <DropdownMenuItem
                            key={subcategory.id}
                            to={subcategoryUrl}
                            onClick={handleDropdownMenuClose(dropdownKey)}
                            $isActive={isSubcategoryActive}
                          >
                            <MenuItemIndicator />
                            <MenuItemText>
                              {(subcategory.label || '').trim()}
                            </MenuItemText>
                          </DropdownMenuItem>
                        );
                      })}
                    </AboutDropdown>
                  </NavLinkWrapper>
                );
              }

              // If there are subcategories with children, use TreatmentsDropdown (two-column layout)
              const fallbackCategoryKey =
                subcategoriesWithChildren[0]?.slug ||
                subcategoriesWithChildren[0]?.id ||
                null;
              const effectiveSelectedCategory =
                selectedTreatmentCategory || fallbackCategoryKey;

              const activeCategory =
                subcategoriesWithChildren.find(
                  (cat) => (cat.slug || cat.id) === effectiveSelectedCategory
                ) || subcategoriesWithChildren[0];

              // Get links from active category (if it has children)
              const activeLinks = Array.isArray(activeCategory?.children)
                ? activeCategory.children.filter(
                  (child) => (child.type || '').toLowerCase() === 'link'
                )
                : [];

              // Right column should show:
              // 1. Links from selected subcategory (if it has links)
              // 2. OR subcategories without children (if selected subcategory has no links)
              const showActiveCategoryLinks = activeLinks.length > 0;
              const showSubcategoriesAsLinks =
                subcategoriesWithoutChildren.length > 0 &&
                !showActiveCategoryLinks;

              return (
                <NavLinkWrapper
                  key={item.id || index}
                  data-dropdown={dropdownKey}
                  onMouseEnter={handleDropdownMouseEnter(dropdownKey)}
                  onMouseLeave={handleDropdownMouseLeave(dropdownKey)}
                >
                  <NavLink
                    href={shouldNavigateOnClick ? itemLink : '#'}
                    onClick={shouldNavigateOnClick ? handleDropdownMenuClose(dropdownKey) : handleDropdownToggle(dropdownKey)}
                    $darkText={darkText}
                    $isActive={isItemActive}
                  >
                    {label}
                  </NavLink>
                  <TreatmentsDropdown
                    isOpen={openDropdowns[dropdownKey] || false}
                    onMouseEnter={handleDropdownMouseEnter(dropdownKey)}
                    onMouseLeave={handleDropdownMouseLeave(dropdownKey)}
                  >
                    <DropdownHeader>
                      <DropdownHeaderIcon hasIcon={true}>
                        <svg
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12 2L2 7L12 12L22 7L12 2Z'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M2 17L12 22L22 17'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M2 12L12 17L22 12'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </DropdownHeaderIcon>
                      <DropdownHeaderText>{label}</DropdownHeaderText>
                    </DropdownHeader>
                    <TreatmentsContent>
                      <TreatmentsColumn>
                        {subcategoriesWithChildren.map((category) => {
                          const categoryKey = category.slug || category.id;
                          const isActive =
                            categoryKey === effectiveSelectedCategory;
                          const categoryUrl =
                            category.internal_path ||
                            category.external_url ||
                            category.link ||
                            '#';
                          const isCategoryClickable =
                            category.is_clickable === true &&
                            category.internal_path !== null;

                          return (
                            <TreatmentCategoryItem
                              key={category.id}
                              active={isActive}
                              as={isCategoryClickable ? Link : 'button'}
                              to={isCategoryClickable ? categoryUrl : undefined}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isCategoryClickable) {
                                  handleDropdownMenuClose(dropdownKey)();
                                } else {
                                  setSelectedTreatmentCategory(categoryKey);
                                }
                              }}
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                if (window.innerWidth > 768) {
                                  clearHoverTimeout(dropdownKey);
                                  setSelectedTreatmentCategory(categoryKey);
                                }
                              }}
                            >
                              {isActive ? null : <MenuItemIndicator />}
                              <MenuItemText>
                                {(category.label || '').trim()}
                              </MenuItemText>
                            </TreatmentCategoryItem>
                          );
                        })}
                      </TreatmentsColumn>
                      {(showActiveCategoryLinks ||
                        showSubcategoriesAsLinks) && (
                          <TreatmentsColumn>
                            <TreatmentSubItems>
                              {showActiveCategoryLinks &&
                                activeLinks.map((link) => {
                                  const linkUrl =
                                    link.internal_path ||
                                    link.external_url ||
                                    link.link ||
                                    '#';
                                  const isLinkItemActive = isLinkActive(linkUrl);
                                  return (
                                    <DropdownMenuItem
                                      key={link.id}
                                      to={linkUrl}
                                      onClick={handleDropdownMenuClose(
                                        dropdownKey
                                      )}
                                      $isActive={isLinkItemActive}
                                    >
                                      <MenuItemIndicator />
                                      <MenuItemText>
                                        {(link.label || '').trim()}
                                      </MenuItemText>
                                    </DropdownMenuItem>
                                  );
                                })}
                              {showSubcategoriesAsLinks &&
                                subcategoriesWithoutChildren.map(
                                  (subcategory) => {
                                    const subcategoryUrl =
                                      subcategory.internal_path ||
                                      subcategory.external_url ||
                                      subcategory.link ||
                                      '#';
                                    const isSubcategoryActive = isLinkActive(subcategoryUrl);
                                    return (
                                      <DropdownMenuItem
                                        key={subcategory.id}
                                        to={subcategoryUrl}
                                        onClick={handleDropdownMenuClose(
                                          dropdownKey
                                        )}
                                        $isActive={isSubcategoryActive}
                                      >
                                        <MenuItemIndicator />
                                        <MenuItemText>
                                          {(subcategory.label || '').trim()}
                                        </MenuItemText>
                                      </DropdownMenuItem>
                                    );
                                  }
                                )}
                            </TreatmentSubItems>
                          </TreatmentsColumn>
                        )}
                    </TreatmentsContent>
                  </TreatmentsDropdown>
                </NavLinkWrapper>
              );
            }

            // Otherwise, use standard AboutDropdown (single column)
            return (
              <NavLinkWrapper
                key={item.id || index}
                data-dropdown={dropdownKey}
                onMouseEnter={handleDropdownMouseEnter(dropdownKey)}
                onMouseLeave={handleDropdownMouseLeave(dropdownKey)}
              >
                <NavLink
                  href={shouldNavigateOnClick ? itemLink : '#'}
                  onClick={shouldNavigateOnClick ? handleDropdownMenuClose(dropdownKey) : handleDropdownToggle(dropdownKey)}
                  $darkText={darkText}
                  $isActive={isItemActive}
                >
                  {label}
                </NavLink>
                {children.length > 0 && (
                  <AboutDropdown
                    isOpen={openDropdowns[dropdownKey] || false}
                    onMouseEnter={handleDropdownMouseEnter(dropdownKey)}
                    onMouseLeave={handleDropdownMouseLeave(dropdownKey)}
                  >
                    <DropdownHeader>
                      <DropdownHeaderIcon hasIcon={children.length > 0}>
                        {children.length > 0 && (
                          <svg
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M19 14C19 15.3261 18.4732 16.5979 17.5355 17.5355C16.5979 18.4732 15.3261 19 14 19C12.6739 19 11.4021 18.4732 10.4645 17.5355C9.52678 16.5979 9 15.3261 9 14C9 12.6739 9.52678 11.4021 10.4645 10.4645C11.4021 9.52678 12.6739 9 14 9C15.3261 9 16.5979 9.52678 17.5355 10.4645C18.4732 11.4021 19 12.6739 19 14Z'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M12 6L8 10H11V18H17V10H20L16 6H12Z'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        )}
                      </DropdownHeaderIcon>
                      <DropdownHeaderText>{label}</DropdownHeaderText>
                    </DropdownHeader>
                    {children.map((child) => {
                      // Get child link - prioritize internal_path, then external_url, then link
                      const childLink =
                        child.internal_path ||
                        child.external_url ||
                        child.link ||
                        '#';
                      const childHasChildren =
                        Array.isArray(child.children) &&
                        child.children.length > 0;
                      // Subcategory without children should be clickable
                      // Also clickable if is_clickable = true and internal_path is not null
                      const childIsClickable =
                        child.type === 'link' ||
                        (child.type === 'subcategory' &&
                          !childHasChildren &&
                          child.is_clickable !== false) ||
                        (child.is_clickable === true && child.internal_path !== null);
                      const isChildActive = isLinkActive(childLink);

                      return (
                        <DropdownMenuItem
                          key={child.id}
                          to={childIsClickable ? childLink : '#'}
                          onClick={handleDropdownMenuClose(dropdownKey)}
                          $isActive={isChildActive}
                        >
                          <MenuItemIndicator />
                          <MenuItemText>
                            {(child.label || '').trim()}
                          </MenuItemText>
                        </DropdownMenuItem>
                      );
                    })}
                  </AboutDropdown>
                )}
              </NavLinkWrapper>
            );
          })}
        </NavMenu>

        <NavButtons>
          <LanguageWrapper data-language-menu>
            <LanguageButton
              $darkText={darkText}
              onClick={handleLanguageToggle}
              aria-label='Change Language'
            >
              {languageIcon ? (
                <img
                  src={languageIcon}
                  alt={selectedLanguage?.name || 'Language'}
                />
              ) : // Show flag emoji or default UK Flag SVG
                selectedLanguage?.flag &&
                  typeof selectedLanguage.flag === 'string' ? (
                  <span style={{ fontSize: '22px', lineHeight: '16px' }}>
                    {selectedLanguage.flag}
                  </span>
                ) : (
                  <svg width='35' height='35' viewBox='0 0 35 35' fill='none'>
                    <circle cx='17.5' cy='17.5' r='17.5' fill='#012169' />
                    <path
                      d='M3.5 6.5L17.5 17.5M31.5 28.5L17.5 17.5M17.5 17.5L31.5 6.5M17.5 17.5L3.5 28.5'
                      stroke='white'
                      strokeWidth='2'
                    />
                    <path
                      d='M3.5 6.5L17.5 17.5M31.5 28.5L17.5 17.5M17.5 17.5L31.5 6.5M17.5 17.5L3.5 28.5'
                      stroke='#C8102E'
                      strokeWidth='1'
                    />
                    <path
                      d='M0 17.5H35M17.5 0V35'
                      stroke='white'
                      strokeWidth='4'
                    />
                    <path
                      d='M0 17.5H35M17.5 0V35'
                      stroke='#C8102E'
                      strokeWidth='2.5'
                    />
                  </svg>
                )}
            </LanguageButton>
            <LanguageDropdown isOpen={languageMenuOpen}>
              {availableLanguages.map((lang) => (
                <LanguageOption
                  key={lang.id}
                  isActive={selectedLanguage?.id === lang.id}
                  onClick={() => handleLanguageSelect(lang)}
                >
                  <LanguageFlag>
                    {lang.flagImage?.data?.attributes?.url ? (
                      <img
                        src={getMediaUrl(lang.flagImage.data.attributes.url)}
                        alt={lang.name}
                      />
                    ) : lang.flag?.data?.attributes?.url ? (
                      <img
                        src={getMediaUrl(lang.flag.data.attributes.url)}
                        alt={lang.name}
                      />
                    ) : typeof lang.flag === 'string' ? (
                      <span className='flag-text'>{lang.flag}</span>
                    ) : (
                      <span className='flag-text'>🌐</span>
                    )}
                  </LanguageFlag>
                  <LanguageLabel>{lang.name}</LanguageLabel>
                </LanguageOption>
              ))}
            </LanguageDropdown>
          </LanguageWrapper>
          <ConnectButton to={connectButtonLink}>
            {connectButtonText}
          </ConnectButton>
          <HamburgerButton
            onClick={toggleMenu}
            isOpen={isMenuOpen}
            $darkText={darkText}
          >
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
        </NavButtons>
      </NavContent>

      <MobileMenu isOpen={isMenuOpen}>
        {navigationLinks.map((item, index) => {
          const itemLink =
            item.internal_path ||
            item.external_url ||
            item.link ||
            `#${(item.label || '').toLowerCase().replace(/\s+/g, '-')}`;

          // Check if this item or any of its children is active (recursive check)
          const checkItemActive = (menuItem) => {
            const menuItemLink =
              menuItem.internal_path ||
              menuItem.external_url ||
              menuItem.link ||
              '#';
            if (isLinkActive(menuItemLink)) return true;
            if (Array.isArray(menuItem.children)) {
              return menuItem.children.some(checkItemActive);
            }
            return false;
          };
          const isItemActive = checkItemActive(item);

          if (item.label === 'About') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('about')}
                  isOpen={mobileSubMenuOpen.about}
                  $isActive={isItemActive}
                >
                  <span>{item.label}</span>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 9L12 15L18 9'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.about}>
                  <MobileSubMenuItem to='/about-us' onClick={closeMenu}>
                    About Us
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to='/specialisation' onClick={closeMenu}>
                    Our Specialisation
                  </MobileSubMenuItem>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }

          if (item.label === 'Hospitals & Doctors') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('hospitals')}
                  isOpen={mobileSubMenuOpen.hospitals}
                  $isActive={isItemActive}
                >
                  <span>{item.label}</span>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 9L12 15L18 9'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.hospitals}>
                  <MobileSubMenuItem to='/hospitals' onClick={closeMenu}>
                    Hospitals
                  </MobileSubMenuItem>
                  <MobileSubMenuItem to='/doctors' onClick={closeMenu}>
                    Doctors
                  </MobileSubMenuItem>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }

          if (item.label === 'Treatments') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('treatments')}
                  isOpen={mobileSubMenuOpen.treatments}
                  $isActive={isItemActive}
                >
                  <span>{item.label}</span>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 9L12 15L18 9'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.treatments}>
                  <MobileTreatmentCategoryItem
                    onClick={() =>
                      setMobileTreatmentCategory(
                        mobileTreatmentCategory === 'car-t-cell'
                          ? null
                          : 'car-t-cell'
                      )
                    }
                    isOpen={mobileTreatmentCategory === 'car-t-cell'}
                  >
                    <span>CAR T-Cell therapy</span>
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6 9L12 15L18 9'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </MobileTreatmentCategoryItem>
                  <MobileTreatmentSubMenu
                    isOpen={mobileTreatmentCategory === 'car-t-cell'}
                  >
                    <MobileSubMenuItem
                      to='/treatments/car-t-autoimmune'
                      onClick={closeMenu}
                    >
                      CAR T Cell Therapy In Autoimmune Disorders
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/car-t-cll'
                      onClick={closeMenu}
                    >
                      CAR T-Cell Therapy For Chronic Lymphocytic Leukemia
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/car-t-gastric'
                      onClick={closeMenu}
                    >
                      CAR T Cell Therapy For Gastric Cancer
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/car-t-glioblastoma'
                      onClick={closeMenu}
                    >
                      CAR T-Cell Therapy For Glioblastoma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/car-t-myeloma'
                      onClick={closeMenu}
                    >
                      CAR T Cell Therapy For Multiple Myeloma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/fucaso'
                      onClick={closeMenu}
                    >
                      FUCASO: CAR T-Cell Therapy For Multiple Myeloma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/car-t-neuroblastoma'
                      onClick={closeMenu}
                    >
                      CAR T-Cell Therapy For Neuroblastoma
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/car-t-china'
                      onClick={closeMenu}
                    >
                      CAR T-Cell Therapy In China
                    </MobileSubMenuItem>
                  </MobileTreatmentSubMenu>

                  <MobileTreatmentCategoryItem
                    onClick={() =>
                      setMobileTreatmentCategory(
                        mobileTreatmentCategory === 'gene-therapy'
                          ? null
                          : 'gene-therapy'
                      )
                    }
                    isOpen={mobileTreatmentCategory === 'gene-therapy'}
                  >
                    <span>Gene Therapy</span>
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6 9L12 15L18 9'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </MobileTreatmentCategoryItem>
                  <MobileTreatmentSubMenu
                    isOpen={mobileTreatmentCategory === 'gene-therapy'}
                  >
                    <MobileSubMenuItem
                      to='/treatments/crispr-china'
                      onClick={closeMenu}
                    >
                      CRISPR/Cas9 Gene Therapy In China
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/gene-metachromatic'
                      onClick={closeMenu}
                    >
                      Gene Therapy For Metachromatic
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/gene-sickle-cell'
                      onClick={closeMenu}
                    >
                      Gene Therapy For Sickle Cell Anemia
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/gene-thalassemia'
                      onClick={closeMenu}
                    >
                      Gene Therapy for Thalassemia
                    </MobileSubMenuItem>
                  </MobileTreatmentSubMenu>

                  <MobileTreatmentCategoryItem
                    onClick={() =>
                      setMobileTreatmentCategory(
                        mobileTreatmentCategory === 'til-therapy'
                          ? null
                          : 'til-therapy'
                      )
                    }
                    isOpen={mobileTreatmentCategory === 'til-therapy'}
                  >
                    <span>TIL therapy</span>
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6 9L12 15L18 9'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </MobileTreatmentCategoryItem>
                  <MobileTreatmentSubMenu
                    isOpen={mobileTreatmentCategory === 'til-therapy'}
                  >
                    <MobileSubMenuItem
                      to='/treatments/gamma-delta'
                      onClick={closeMenu}
                    >
                      Gamma Delta T-Cell Therapy
                    </MobileSubMenuItem>
                    <MobileSubMenuItem
                      to='/treatments/til-china'
                      onClick={closeMenu}
                    >
                      Tumor-Infiltrating Lymphocyte (TIL) Therapy In China
                    </MobileSubMenuItem>
                  </MobileTreatmentSubMenu>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }

          if (item.label === 'Clinical Trials') {
            return (
              <MobileNavItem key={index}>
                <MobileNavItemHeader
                  onClick={() => toggleMobileSubMenu('clinicalTrials')}
                  isOpen={mobileSubMenuOpen.clinicalTrials}
                  $isActive={isItemActive}
                >
                  <span>{item.label}</span>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 9L12 15L18 9'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </MobileNavItemHeader>
                <MobileSubMenu isOpen={mobileSubMenuOpen.clinicalTrials}>
                  <MobileSubMenuItem
                    to='/clinical-trials/ongoing'
                    onClick={closeMenu}
                  >
                    Ongoing Clinical Trials
                  </MobileSubMenuItem>
                  <MobileSubMenuItem
                    to='/clinical-trials/car-t-cell'
                    onClick={closeMenu}
                  >
                    CAR T Cell therapy clinical trials
                  </MobileSubMenuItem>
                  <MobileSubMenuItem
                    to='/clinical-trials/ball-car-t'
                    onClick={closeMenu}
                  >
                    Clinical trial for BALL CAR T-Cell therapy
                  </MobileSubMenuItem>
                  <MobileSubMenuItem
                    to='/clinical-trials/car-t-myeloma'
                    onClick={closeMenu}
                  >
                    CAR T Cell therapy trials for multiple myeloma
                  </MobileSubMenuItem>
                  <MobileSubMenuItem
                    to='/clinical-trials/car-t-thrombocytopenia'
                    onClick={closeMenu}
                  >
                    CAR T-Cell therapy clinical trials for Immune
                    thrombocytopenia
                  </MobileSubMenuItem>
                </MobileSubMenu>
              </MobileNavItem>
            );
          }

          if (item.label === 'Resources') {
            return (
              <MobileNavLink
                key={index}
                href={item.link || '/resources'}
                onClick={closeMenu}
                $isActive={isItemActive}
              >
                {item.label}
              </MobileNavLink>
            );
          }

          return (
            <MobileNavLink
              key={index}
              href={
                item.link || `#${item.label.toLowerCase().replace(/\s+/g, '-')}`
              }
              onClick={closeMenu}
              $isActive={isItemActive}
            >
              {item.label}
            </MobileNavLink>
          );
        })}
      </MobileMenu>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 100;
  padding: 22px 0;
  box-sizing: border-box;
  overflow: visible;
  pointer-events: none;
  transition: background 300ms ease, box-shadow 300ms ease;
  &.header-fixed {
    background-color: ${(props) =>
    props.$darkText
      ? props.theme.backgroundColor.white
      : props.theme.backgroundColor.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  &.header-overlay {
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      mask-image: linear-gradient(
        to bottom,
        rgba(54, 69, 79, 0.901) 50%,
        transparent 90%
      );
      backdrop-filter: blur(30px);
    }
  }

  > * {
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    padding: 14px 0;
  }

  @media (max-width: 768px) {
    padding: 12px 0;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
  }

  @media (max-width: 360px) {
    padding: 8px 0;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  height: 48px;
  min-height: 48px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }

  @media (max-width: 1200px) {
    padding: 0 20px;
  }

  @media (max-width: 1024px) {
    height: 44px;
    min-height: 44px;
  }

  @media (max-width: 768px) {
    height: 40px;
    min-height: 40px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  color: ${(props) => (props.$darkText ? '#1F2937' : props.theme.colors.white)};
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
  z-index: 1;
  min-width: 176px;

  &:hover {
    opacity: 0.8;
  }

  img {
    transition: all 0.3s ease;
     height: 30px;
    max-width: 176px;
  }

  svg {
    width: 176px;
    height: 29px;
    transition: all 0.3s ease;
  }

  @media (max-width: 1200px) {
    img {
      height: 26px;
      max-width: 160px;
    }

    svg {
      width: 160px;
      height: 26px;
    }
  }

  @media (max-width: 1024px) {
    min-width: 100px;
    img {
      height: 24px;
      max-width: 140px;
    }

    svg {
      width: 140px;
      height: 24px;
    }
  }

  @media (max-width: 768px) {
    img {
      height: 22px;
      max-width: 120px;
    }

    svg {
      width: 120px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    img {
      height: 20px;
      max-width: 100px;
    }

    svg {
      width: 100px;
      height: 20px;
    }
  }

  @media (max-width: 360px) {
    img {
      height: 18px;
      max-width: 90px;
    }

    svg {
      width: 90px;
      height: 18px;
    }
  }
`;

const LogoImage = styled.img`
  height: 36px;
  width: auto;
  display: block;
  object-fit: contain;
`;

const LogoFallbackIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: #ff4fa3;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
`;

const LogoFallbackText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => (props.$darkText ? '#1F2937' : '#ffffff')};
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  max-width: 1024px;
  width: auto;
  height: 48px;
  padding: 0 24px;
  border-radius: 20px;
  background: ${(props) =>
    props.$darkText ? 'rgba(255, 255, 255, 0)' : 'rgba(255,255,255,0.17)'};
  backdrop-filter: blur(126.4px);
  opacity: 1;
  transform: rotate(0deg);
  flex-shrink: 1;
  overflow: visible;

  @media (max-width: 1400px) {
    max-width: 800px;
    gap: 24px;
  }

  @media (max-width: 1200px) {
    max-width: 680px;
    gap: 12px;
    height: 44px;
    padding: 0 20px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${(props) => (props.$darkText ? '#36454F' : props.theme.colors.white)};
  font-family: ${(props) =>
    props.$darkText ? "'Be Vietnam Pro', sans-serif" : 'inherit'};
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  font-style: normal;
  font-size: ${(props) => (props.$darkText ? '16px' : '16px')};
  line-height: ${(props) => (props.$darkText ? '100%' : 'normal')};
  letter-spacing: ${(props) => (props.$darkText ? '0px' : 'normal')};
  vertical-align: ${(props) => (props.$darkText ? 'middle' : 'baseline')};
  transition: opacity 0.3s, font-weight 0.3s;
  white-space: nowrap;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  text-decoration: none;
  
  ${(props) =>
    props.$isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${props.$darkText ? props.theme.colors.pink : props.theme.colors.white};
      border-radius: 1px;
    }
  `}
  
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1200px) {
    font-size: ${(props) => (props.$darkText ? '14px' : '14px')};
  }

  @media (max-width: 1024px) {
    font-size: ${(props) => (props.$darkText ? '14px' : '14px')};
  }
`;

const NavLinkWrapper = styled.div`
  position: relative;
  display: inline-block;

  @media (min-width: 769px) {
    &:hover > div {
      pointer-events: auto;
    }
  }
`;

const AboutDropdown = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 12px;
  min-width: 280px;
  z-index: 1000;
  animation: fadeInDown 0.2s ease;
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: -50px;
    right: -50px;
    height: 16px;
    background: transparent;
    pointer-events: auto;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    min-width: 240px;
    left: 0;
    right: auto;
    pointer-events: auto;
    top: calc(100% + 12px);
  }

  @media (max-width: 480px) {
    min-width: 220px;
  }
`;

const TreatmentsDropdown = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 12px;
  min-width: 600px;
  z-index: 1000;
  animation: fadeInDown 0.2s ease;
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: -50px;
    right: -50px;
    height: 16px;
    background: transparent;
    pointer-events: auto;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    min-width: 500px;
  }

  @media (max-width: 768px) {
    min-width: 280px;
    left: 0;
    right: auto;
    pointer-events: auto;
    top: calc(100% + 12px);
  }

  @media (max-width: 480px) {
    min-width: 260px;
  }
`;

const TreatmentsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const TreatmentsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TreatmentCategoryItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 200px;
  height: 52px;
  padding: 16px 20px;
  border-radius: 20px;
  background: ${(props) => (props.active ? 'transparent' : 'white')};
  border: ${(props) => (props.active ? '1px solid' : '1px solid transparent')};
  border-color: ${(props) =>
    props.active ? props.theme.colors.pink : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  opacity: 1;
  transform: rotate(0deg);
  margin-bottom: 4px;
  box-sizing: border-box;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #36454f;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props) => (props.active ? 'transparent' : '#F8F8F8')};
    border-color: ${(props) =>
    props.active ? props.theme.colors.pink : 'rgba(255, 20, 147, 0.3)'};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 180px;
    padding: 18px 1px;
    height: auto;
    min-height: 48px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    min-height: 44px;
    font-size: 14px;
  }
`;

const TreatmentSubItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 12px 8px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 8px;
`;

const DropdownHeaderIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.pink};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::after {
    content: ${(props) =>
    props.hasIcon ? 'none' : `'${props.icon || 'i'}'`};
    font-family: 'Be Vietnam Pro', sans-serif;
    font-size: ${(props) => props.iconSize || '14px'};
    font-weight: 600;
    color: ${(props) => props.theme.colors.pink};
    line-height: 1;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.colors.pink};
    stroke: ${(props) => props.theme.colors.pink};
    display: ${(props) => (props.hasIcon ? 'block' : 'none')};
  }
`;

const DropdownHeaderText = styled.div`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #36454f;
`;

const DropdownMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  width: 252px;
  max-width: 100%;
  height: 52px;
  padding: 20px 16px 20px 16px;
  border-radius: 16px;
  background: ${(props) => (props.$isActive ? '#FFF0F6' : 'white')};
  border: ${(props) => (props.$isActive ? `1px solid ${props.theme.colors.pink}` : 'none')};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  opacity: 1;
  transform: rotate(0deg);
  margin-bottom: 4px;
  box-sizing: border-box;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props) => (props.$isActive ? '#FFF0F6' : '#f8f8f8')};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 220px;
    padding: 18px 14px;
    height: auto;
    min-height: 48px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    min-height: 44px;
  }
`;

const MenuItemIndicator = styled.div`
  width: 3px;
  height: 100%;
  background: ${(props) => props.theme.colors.pink};
  border-radius: 2px;
  margin-right: 12px;
  flex-shrink: 0;
`;

const MenuItemText = styled.span`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #36454f;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }

  @media (max-width: 360px) {
    gap: 4px;
  }
`;

const LanguageWrapper = styled.div`
  position: relative;
`;

const LanguageButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$darkText ? '#D1D5DB' : '#A1A1A1')};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s ease;
  padding: 0;
  flex-shrink: 0;
  color: ${(props) =>
    props.$darkText ? 'rgba(54, 69, 79, 1)' : 'rgba(255, 255, 255, 1)'};
  text-shadow: 0 0 20px #36454f;
  &:active {
    transform: scale(0.95);
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    transition: all 0.3s ease;
  }

  svg {
    width: 35px;
    height: 35px;
    transition: all 0.3s ease;
  }

  @media (max-width: 1200px) {
    width: 44px;
    height: 44px;
    padding: 8px;

    img {
      width: 32px;
      height: 32px;
    }

    svg {
      width: 32px;
      height: 32px;
    }
  }
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
`;

const LanguageDropdown = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 180px;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    min-width: 160px;
    right: -10px;
  }
`;

const LanguageOption = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  background: ${(props) => (props.isActive ? '#FFF0F6' : 'transparent')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  color: ${(props) => (props.isActive ? '#FF69B4' : '#36454F')};
  text-align: left;

  &:hover {
    background: ${(props) => (props.isActive ? '#FFF0F6' : '#F8F8F8')};
    color: #ff69b4;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LanguageFlag = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  opacity: 1;
  transform: rotate(0deg);
`;

const LanguageLabel = styled.span`
  flex: 1;
`;

const ConnectButton = styled(Link)`
  width: 173px;
  height: 48px;
  padding: 16px 20px;
  gap: 8px;
  background: ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.2s ease, background 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transform: rotate(0deg);
  box-sizing: border-box;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 1200px) {
    padding: 10px 16px;
    font-size: 14px;
    width: auto;
    height: 44px;
  }
  @media (max-width: 767px) {
    height: 40px;
  }
  @media (max-width: 1024px) {
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.$darkText ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.18)'};
  border: 1px solid ${(props) => (props.$darkText ? '#E0E0E0' : '#A1A1A1')};
  border-radius: 20px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px;
  transition: background 0.3s, transform 0.2s ease, border-color 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  &:hover {
    background: ${(props) =>
    props.$darkText ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)'};
    border-color: ${(props) => (props.$darkText ? '#D0D0D0' : '#A1A1A1')};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 1024px) {
    display: flex;
    padding: 7px;
  }

  @media (max-width: 768px) {
    display: flex;
    padding: 6px;
    gap: 4px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    gap: 3px;
    border-radius: 16px;
  }

  @media (max-width: 360px) {
    padding: 4px;
    gap: 2px;
    border-radius: 14px;
  }

  span {
    width: 20px;
    height: 2px;
    background: ${(props) => (props.$darkText ? '#36454F' : 'white')};
    transition: all 0.3s ease;
    border-radius: 2px;
    display: block;

    @media (max-width: 480px) {
      width: 18px;
      height: 2px;
    }

    @media (max-width: 360px) {
      width: 16px;
      height: 1.5px;
    }

    ${(props) =>
    props.isOpen &&
    `
      &:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &:nth-child(2) {
        opacity: 0;
        transform: translateX(-10px);
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(3px, -4px);
      }
    `}
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 72px; /* 14px + 44px + 14px */
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 24px;
    gap: 20px;
    z-index: 99;
    animation: slideDown 0.3s ease-out;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @media (max-width: 768px) {
    top: 64px; /* 12px + 40px + 12px */
    padding: 20px;
    gap: 18px;
  }

  @media (max-width: 480px) {
    top: 58px; /* 10px + 38px + 10px */
    padding: 16px;
    gap: 16px;
  }

  @media (max-width: 360px) {
    top: 52px; /* 8px + 36px + 8px */
    padding: 12px;
    gap: 14px;
  }
`;

const MobileNavLink = styled.a`
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? '600' : '500')};
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.3s, font-weight 0.3s;
  text-decoration: none;
  display: block;
  height: 48px;
  position: relative;

  ${(props) =>
    props.$isActive &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: ${props.theme.colors.pink};
      border-radius: 2px;
    }
  `}

  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MobileNavItem = styled.div`
  width: 100%;
`;

const MobileNavItemHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  font-size: 18px;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  padding: 12px 0;
  border: none;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.3s, font-weight 0.3s;
  cursor: pointer;
  text-align: left;
  position: relative;

  ${(props) =>
    props.$isActive &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: ${props.theme.colors.pink};
      border-radius: 2px;
    }
  `}

  &:hover {
    opacity: 0.8;
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${(props) =>
    props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    width: 16px;
    height: 16px;
    stroke: ${(props) => props.theme.colors.white};
    flex-shrink: 0;
  }
`;

const MobileSubMenu = styled.div`
  max-height: ${(props) => (props.isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: rgba(0, 0, 0, 0.3);
  margin-left: 16px;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding-left: 16px;
`;

const MobileTreatmentCategoryItem = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 400;
  padding: 10px 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 12px;
    background: ${(props) => props.theme.colors.pink};
    border-radius: 2px;
  }

  &:hover {
    opacity: 0.8;
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${(props) =>
    props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    width: 14px;
    height: 14px;
    stroke: rgba(255, 255, 255, 0.9);
    flex-shrink: 0;
  }
`;

const MobileTreatmentSubMenu = styled.div`
  max-height: ${(props) => (props.isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: rgba(0, 0, 0, 0.2);
  margin-left: 20px;
  margin-top: 8px;
  border-left: 2px solid rgba(255, 255, 255, 0.15);
  padding-left: 12px;
`;

const MobileSubMenuItem = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 400;
  padding: 10px 0;
  text-decoration: none;
  transition: opacity 0.3s;
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 12px;
    background: ${(props) => props.theme.colors.pink};
    border-radius: 2px;
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export default Header;
