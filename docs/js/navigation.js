/**
 * AI SaaS Handbook - Navigation System
 * Navigation data embedded inline (no fetch required - works with file:// protocol)
 */

(function() {
  'use strict';

  // Navigation data embedded inline for file:// compatibility
  const NAV_DATA = {
    "site": {
      "title": "AI SaaS Handbook",
      "version": "3.0",
      "baseUrl": "/docs"
    },
    "topNav": [
      {
        "label": "Home",
        "href": "index.html",
        "icon": "home"
      },
      {
        "label": "Handbook",
        "children": [
          { "label": "Part 1: Strategy & Design", "href": "handbook/part1/chapter-01-introduction.html" },
          { "label": "Part 2: Architecture & Setup", "href": "handbook/part2/chapter-13-architecture.html" },
          { "label": "Part 3: Build & Launch", "href": "handbook/part3/chapter-23-moai-overview.html" }
        ]
      },
      {
        "label": "Build Guide",
        "href": "build-guide-v3.html"
      },
      {
        "label": "Workflow",
        "href": "workflow-guide-v1.html"
      },
      {
        "label": "References",
        "children": [
          { "label": "Navigation Guide", "href": "navigation-guide.html" },
          { "label": "Claude Code Integration", "href": "claude-code-integration.html" }
        ]
      }
    ],
    "sidebar": {
      "handbook-part1": {
        "title": "Part 1: Strategy & Design",
        "basePath": "handbook/part1",
        "chapters": [
          { "id": "ch1", "title": "1. Introduction", "href": "chapter-01-introduction.html" },
          { "id": "ch2", "title": "2. Quality Crisis", "href": "chapter-02-quality-crisis.html" },
          { "id": "ch3", "title": "3. Quality Framework", "href": "chapter-03-quality-framework.html" },
          { "id": "ch4", "title": "4. Claude Tools", "href": "chapter-04-claude-tools.html" },
          { "id": "ch5", "title": "5. Research", "href": "chapter-05-research.html" },
          { "id": "ch6", "title": "6. One-Pager", "href": "chapter-06-one-pager.html" },
          { "id": "ch7", "title": "7. Design Brief", "href": "chapter-07-design-brief.html" },
          { "id": "ch8", "title": "8. Design Philosophy", "href": "chapter-08-design-philosophy.html" },
          { "id": "ch9", "title": "9. UX Package", "href": "chapter-09-ux-package.html" },
          { "id": "ch10", "title": "10. UX Critique", "href": "chapter-10-ux-critique.html" },
          { "id": "ch11", "title": "11. UI System", "href": "chapter-11-ui-system.html" },
          { "id": "ch12", "title": "12. Visual Direction", "href": "chapter-12-visual-direction.html" }
        ]
      },
      "handbook-part2": {
        "title": "Part 2: Architecture & Setup",
        "basePath": "handbook/part2",
        "chapters": [
          { "id": "ch13", "title": "13. Architecture", "href": "chapter-13-architecture.html" },
          { "id": "ch14", "title": "14. Database Schema", "href": "chapter-14-database-schema.html" },
          { "id": "ch15", "title": "15. GitHub Setup", "href": "chapter-15-github-setup.html" },
          { "id": "ch16", "title": "16. Supabase Setup", "href": "chapter-16-supabase-setup.html" },
          { "id": "ch17", "title": "17. Vercel Setup", "href": "chapter-17-vercel-setup.html" },
          { "id": "ch18", "title": "18. Multi-Environment", "href": "chapter-18-multi-environment.html" },
          { "id": "ch19", "title": "19. Build Contract Intro", "href": "chapter-19-build-contract-intro.html" },
          { "id": "ch20", "title": "20. Contract Structure", "href": "chapter-20-build-contract-structure.html" },
          { "id": "ch21", "title": "21. Generating Contract", "href": "chapter-21-generating-contract.html" },
          { "id": "ch22", "title": "22. Dev Environment", "href": "chapter-22-dev-environment.html" }
        ]
      },
      "handbook-part3": {
        "title": "Part 3: Build & Launch",
        "basePath": "handbook/part3",
        "chapters": [
          { "id": "ch23", "title": "23. MOAI Overview", "href": "chapter-23-moai-overview.html" },
          { "id": "ch24", "title": "24. SPEC-First Dev", "href": "chapter-24-spec-first.html" },
          { "id": "ch25", "title": "25. TDD Workflow", "href": "chapter-25-tdd-workflow.html" },
          { "id": "ch26", "title": "26. Tech Debt", "href": "chapter-26-tech-debt.html" },
          { "id": "ch27", "title": "27. Build Milestones", "href": "chapter-27-build-milestones.html" },
          { "id": "ch28", "title": "28. QA & Launch", "href": "chapter-28-qa-launch.html" },
          { "id": "ch29", "title": "29. File Structure", "href": "chapter-29-file-structure.html" },
          { "id": "app-a", "title": "Appendix A: SPEC Template", "href": "appendix-a-spec-template.html" },
          { "id": "app-b", "title": "Appendix B: Quality Gates", "href": "appendix-b-quality-gates.html" }
        ]
      }
    },
    "pageOrder": [
      "handbook/part1/chapter-01-introduction.html",
      "handbook/part1/chapter-02-quality-crisis.html",
      "handbook/part1/chapter-03-quality-framework.html",
      "handbook/part1/chapter-04-claude-tools.html",
      "handbook/part1/chapter-05-research.html",
      "handbook/part1/chapter-06-one-pager.html",
      "handbook/part1/chapter-07-design-brief.html",
      "handbook/part1/chapter-08-design-philosophy.html",
      "handbook/part1/chapter-09-ux-package.html",
      "handbook/part1/chapter-10-ux-critique.html",
      "handbook/part1/chapter-11-ui-system.html",
      "handbook/part1/chapter-12-visual-direction.html",
      "handbook/part2/chapter-13-architecture.html",
      "handbook/part2/chapter-14-database-schema.html",
      "handbook/part2/chapter-15-github-setup.html",
      "handbook/part2/chapter-16-supabase-setup.html",
      "handbook/part2/chapter-17-vercel-setup.html",
      "handbook/part2/chapter-18-multi-environment.html",
      "handbook/part2/chapter-19-build-contract-intro.html",
      "handbook/part2/chapter-20-build-contract-structure.html",
      "handbook/part2/chapter-21-generating-contract.html",
      "handbook/part2/chapter-22-dev-environment.html",
      "handbook/part3/chapter-23-moai-overview.html",
      "handbook/part3/chapter-24-spec-first.html",
      "handbook/part3/chapter-25-tdd-workflow.html",
      "handbook/part3/chapter-26-tech-debt.html",
      "handbook/part3/chapter-27-build-milestones.html",
      "handbook/part3/chapter-28-qa-launch.html",
      "handbook/part3/chapter-29-file-structure.html",
      "handbook/part3/appendix-a-spec-template.html",
      "handbook/part3/appendix-b-quality-gates.html"
    ],
    "sectionMapping": {
      "handbook/part1": "handbook-part1",
      "handbook/part2": "handbook-part2",
      "handbook/part3": "handbook-part3"
    }
  };

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

  // Initialize navigation (synchronous - no fetch needed)
  function initNavigation() {
    const basePath = getBasePath();
    const currentPath = getCurrentPagePath();

    renderTopNav(NAV_DATA, basePath, currentPath);
    renderSidebar(NAV_DATA, basePath, currentPath);
    renderPageNav(NAV_DATA, basePath, currentPath);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
