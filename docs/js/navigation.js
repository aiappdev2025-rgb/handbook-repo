/**
 * AI SaaS Handbook - Navigation System
 * Single source of truth navigation loaded from navigation-data.json
 */

(function() {
  'use strict';

  // Determine the base path based on current page location
  function getBasePath() {
    const path = window.location.pathname;
    const docsIndex = path.indexOf('/docs/');
    if (docsIndex === -1) return '';

    const relativePath = path.substring(docsIndex + 6); // After '/docs/'
    const depth = (relativePath.match(/\//g) || []).length;

    if (depth === 0) return '';
    if (depth === 1) return '../';
    if (depth === 2) return '../../';
    return '../'.repeat(depth);
  }

  // Get current page path relative to docs/
  function getCurrentPagePath() {
    const path = window.location.pathname;
    const docsIndex = path.indexOf('/docs/');
    if (docsIndex === -1) return '';
    return path.substring(docsIndex + 6); // After '/docs/'
  }

  // Load navigation data
  async function loadNavigationData() {
    const basePath = getBasePath();
    try {
      const response = await fetch(basePath + 'js/navigation-data.json');
      if (!response.ok) throw new Error('Failed to load navigation data');
      return await response.json();
    } catch (error) {
      console.error('Navigation data load error:', error);
      return null;
    }
  }

  // Render top navigation bar
  function renderTopNav(data, basePath, currentPath) {
    const nav = document.getElementById('top-nav');
    if (!nav) return;

    let html = `
      <a href="${basePath}index.html" class="nav-brand">${data.site.title}</a>
      <button class="menu-toggle" aria-label="Toggle menu">&#9776;</button>
      <div class="nav-links">
    `;

    data.topNav.forEach(item => {
      if (item.children) {
        // Dropdown menu
        html += `
          <div class="dropdown">
            <a href="#" class="dropdown-trigger">${item.label} &#9662;</a>
            <div class="dropdown-content">
        `;
        item.children.forEach(child => {
          const href = basePath + child.href;
          const isActive = currentPath === child.href;
          html += `<a href="${href}"${isActive ? ' class="active"' : ''}>${child.label}</a>`;
        });
        html += `
            </div>
          </div>
        `;
      } else {
        // Regular link
        const href = basePath + item.href;
        const isActive = currentPath === item.href || currentPath.startsWith(item.href.split('/')[0] + '/');
        html += `<a href="${href}"${isActive ? ' class="active"' : ''}>${item.label}</a>`;
      }
    });

    html += '</div>';
    nav.innerHTML = html;

    // Add mobile menu toggle
    const toggle = nav.querySelector('.menu-toggle');
    const links = nav.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('open');
      });
    }
  }

  // Determine which sidebar section to show based on current path
  function getSidebarSection(currentPath, sectionMapping) {
    for (const [pathPrefix, sectionId] of Object.entries(sectionMapping)) {
      if (currentPath.startsWith(pathPrefix)) {
        return sectionId;
      }
    }
    return null;
  }

  // Render sidebar
  function renderSidebar(data, basePath, currentPath) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const currentSection = getSidebarSection(currentPath, data.sectionMapping);
    if (!currentSection) {
      sidebar.style.display = 'none';
      return;
    }

    const sectionData = data.sidebar[currentSection];
    if (!sectionData) {
      sidebar.style.display = 'none';
      return;
    }

    let html = `
      <div class="sidebar-section">
        <div class="sidebar-title">${sectionData.title}</div>
        <ul class="sidebar-items">
    `;

    sectionData.chapters.forEach(chapter => {
      const fullPath = sectionData.basePath + '/' + chapter.href;
      const href = basePath + fullPath;
      const isActive = currentPath === fullPath;
      html += `<li><a href="${href}"${isActive ? ' class="active"' : ''}>${chapter.title}</a></li>`;
    });

    html += `
        </ul>
      </div>
    `;

    // Add other sections (collapsed)
    Object.entries(data.sidebar).forEach(([sectionId, section]) => {
      if (sectionId === currentSection) return;

      html += `
        <div class="sidebar-section">
          <div class="sidebar-title collapsed">${section.title}</div>
          <ul class="sidebar-items collapsed">
      `;

      section.chapters.forEach(chapter => {
        const fullPath = section.basePath + '/' + chapter.href;
        const href = basePath + fullPath;
        html += `<li><a href="${href}">${chapter.title}</a></li>`;
      });

      html += `
          </ul>
        </div>
      `;
    });

    sidebar.innerHTML = html;

    // Add collapse/expand functionality
    sidebar.querySelectorAll('.sidebar-title').forEach(title => {
      title.addEventListener('click', () => {
        title.classList.toggle('collapsed');
        const items = title.nextElementSibling;
        if (items) {
          items.classList.toggle('collapsed');
        }
      });
    });
  }

  // Render previous/next navigation
  function renderPageNav(data, basePath, currentPath) {
    const pageNav = document.getElementById('page-nav');
    if (!pageNav) return;

    const pageOrder = data.pageOrder;
    const currentIndex = pageOrder.indexOf(currentPath);

    if (currentIndex === -1) {
      pageNav.style.display = 'none';
      return;
    }

    let html = '';

    // Previous link
    if (currentIndex > 0) {
      const prevPath = pageOrder[currentIndex - 1];
      const prevTitle = getPageTitle(data, prevPath);
      html += `
        <a href="${basePath}${prevPath}" class="prev-link">
          <span class="nav-label">&larr; Previous</span>
          <span class="nav-title">${prevTitle}</span>
        </a>
      `;
    } else {
      html += '<span></span>';
    }

    // Next link
    if (currentIndex < pageOrder.length - 1) {
      const nextPath = pageOrder[currentIndex + 1];
      const nextTitle = getPageTitle(data, nextPath);
      html += `
        <a href="${basePath}${nextPath}" class="next-link">
          <span class="nav-label">Next &rarr;</span>
          <span class="nav-title">${nextTitle}</span>
        </a>
      `;
    }

    pageNav.innerHTML = html;
  }

  // Get page title from navigation data
  function getPageTitle(data, pagePath) {
    for (const section of Object.values(data.sidebar)) {
      for (const chapter of section.chapters) {
        const fullPath = section.basePath + '/' + chapter.href;
        if (fullPath === pagePath) {
          return chapter.title;
        }
      }
    }
    return pagePath.split('/').pop().replace('.html', '').replace(/-/g, ' ');
  }

  // Initialize navigation
  async function initNavigation() {
    const data = await loadNavigationData();
    if (!data) {
      console.error('Could not initialize navigation');
      return;
    }

    const basePath = getBasePath();
    const currentPath = getCurrentPagePath();

    renderTopNav(data, basePath, currentPath);
    renderSidebar(data, basePath, currentPath);
    renderPageNav(data, basePath, currentPath);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
