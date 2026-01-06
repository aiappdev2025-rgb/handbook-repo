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
          { "label": "Phase 1: Validate", "href": "handbook/phase1/chapter-01-introduction.html" },
          { "label": "Phase 2: Design", "href": "handbook/phase2/chapter-08-design-philosophy.html" },
          { "label": "Phase 3: Architect", "href": "handbook/phase3/chapter-13-architecture.html" },
          { "label": "Phase 4: Build", "href": "handbook/phase4/chapter-23-moai-overview.html" },
          { "label": "Phase 5: Launch", "href": "handbook/phase5/chapter-42-qa-deployment.html" }
        ]
      },
      {
        "label": "Workspace",
        "href": "tools/project-list.html"
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
      "handbook-phase1": {
        "title": "Phase 1: Validate",
        "basePath": "handbook/phase1",
        "chapters": [
          { "id": "ch1", "title": "1. Introduction", "href": "chapter-01-introduction.html" },
          { "id": "ch2", "title": "2. Quality Crisis", "href": "chapter-02-quality-crisis.html" },
          { "id": "ch3", "title": "3. Quality Framework", "href": "chapter-03-quality-framework.html" },
          { "id": "ch4", "title": "4. Claude Tools", "href": "chapter-04-claude-tools.html" },
          { "id": "ch5", "title": "5. Research", "href": "chapter-05-research.html" },
          { "id": "ch6", "title": "6. One-Pager", "href": "chapter-06-one-pager.html" },
          { "id": "ch7", "title": "7. Design Brief", "href": "chapter-07-design-brief.html" }
        ]
      },
      "handbook-phase2": {
        "title": "Phase 2: Design",
        "basePath": "handbook/phase2",
        "chapters": [
          { "id": "ch8", "title": "8. Design Philosophy", "href": "chapter-08-design-philosophy.html" },
          { "id": "ch9", "title": "9. UX Package", "href": "chapter-09-ux-package.html" },
          { "id": "ch10", "title": "10. UX Critique", "href": "chapter-10-ux-critique.html" },
          { "id": "ch11", "title": "11. UI System", "href": "chapter-11-ui-system.html" },
          { "id": "ch12", "title": "12. Visual Direction", "href": "chapter-12-visual-direction.html" }
        ]
      },
      "handbook-phase3": {
        "title": "Phase 3: Architect",
        "basePath": "handbook/phase3",
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
      "handbook-phase4": {
        "title": "Phase 4: Build",
        "basePath": "handbook/phase4",
        "chapters": [
          { "id": "ch23", "title": "23. MOAI Overview", "href": "chapter-23-moai-overview.html" },
          { "id": "ch24", "title": "24. SPEC-First Dev", "href": "chapter-24-spec-first.html" },
          { "id": "ch25", "title": "25. TDD Workflow", "href": "chapter-25-tdd-workflow.html" },
          { "id": "ch26", "title": "26. Tech Debt", "href": "chapter-26-tech-debt.html" },
          { "id": "ch27", "title": "27. Build Milestones", "href": "chapter-27-build-milestones.html" },
          { "id": "ch28", "title": "28. M1: Project Setup", "href": "chapter-28-m1-project-setup.html" },
          { "id": "ch29", "title": "29. M2: Design System", "href": "chapter-29-m2-design-system.html" },
          { "id": "ch30", "title": "30. M3: Database", "href": "chapter-30-m3-database.html" },
          { "id": "ch31", "title": "31. Checkpoint A", "href": "chapter-31-checkpoint-a.html" },
          { "id": "ch32", "title": "32. M4: Layouts", "href": "chapter-32-m4-layouts.html" },
          { "id": "ch33", "title": "33. M5: Authentication", "href": "chapter-33-m5-authentication.html" },
          { "id": "ch34", "title": "34. M6: Core Feature", "href": "chapter-34-m6-core-feature.html" },
          { "id": "ch35", "title": "35. Checkpoint B", "href": "chapter-35-checkpoint-b.html" },
          { "id": "ch36", "title": "36. M7: Admin Console", "href": "chapter-36-m7-admin-console.html" },
          { "id": "ch37", "title": "37. M8: Supporting Features", "href": "chapter-37-m8-supporting-features.html" },
          { "id": "ch38", "title": "38. M9: Payments", "href": "chapter-38-m9-payments.html" },
          { "id": "ch39", "title": "39. M10: Polish", "href": "chapter-39-m10-polish.html" },
          { "id": "ch40", "title": "40. Checkpoint C", "href": "chapter-40-checkpoint-c.html" },
          { "id": "ch41", "title": "41. M11: Testing", "href": "chapter-41-m11-testing.html" },
          { "id": "app-a", "title": "Appendix A: SPEC Template", "href": "appendix-a-spec-template.html" },
          { "id": "app-b", "title": "Appendix B: Quality Gates", "href": "appendix-b-quality-gates.html" }
        ]
      },
      "handbook-phase5": {
        "title": "Phase 5: Launch",
        "basePath": "handbook/phase5",
        "chapters": [
          { "id": "ch42", "title": "42. QA & Deployment", "href": "chapter-42-qa-deployment.html" },
          { "id": "ch43", "title": "43. Launch Checklist", "href": "chapter-43-launch-checklist.html" }
        ]
      }
    },
    "pageOrder": [
      "handbook/phase1/chapter-01-introduction.html",
      "handbook/phase1/chapter-02-quality-crisis.html",
      "handbook/phase1/chapter-03-quality-framework.html",
      "handbook/phase1/chapter-04-claude-tools.html",
      "handbook/phase1/chapter-05-research.html",
      "handbook/phase1/chapter-06-one-pager.html",
      "handbook/phase1/chapter-07-design-brief.html",
      "handbook/phase2/chapter-08-design-philosophy.html",
      "handbook/phase2/chapter-09-ux-package.html",
      "handbook/phase2/chapter-10-ux-critique.html",
      "handbook/phase2/chapter-11-ui-system.html",
      "handbook/phase2/chapter-12-visual-direction.html",
      "handbook/phase3/chapter-13-architecture.html",
      "handbook/phase3/chapter-14-database-schema.html",
      "handbook/phase3/chapter-15-github-setup.html",
      "handbook/phase3/chapter-16-supabase-setup.html",
      "handbook/phase3/chapter-17-vercel-setup.html",
      "handbook/phase3/chapter-18-multi-environment.html",
      "handbook/phase3/chapter-19-build-contract-intro.html",
      "handbook/phase3/chapter-20-build-contract-structure.html",
      "handbook/phase3/chapter-21-generating-contract.html",
      "handbook/phase3/chapter-22-dev-environment.html",
      "handbook/phase4/chapter-23-moai-overview.html",
      "handbook/phase4/chapter-24-spec-first.html",
      "handbook/phase4/chapter-25-tdd-workflow.html",
      "handbook/phase4/chapter-26-tech-debt.html",
      "handbook/phase4/chapter-27-build-milestones.html",
      "handbook/phase4/chapter-28-m1-project-setup.html",
      "handbook/phase4/chapter-29-m2-design-system.html",
      "handbook/phase4/chapter-30-m3-database.html",
      "handbook/phase4/chapter-31-checkpoint-a.html",
      "handbook/phase4/chapter-32-m4-layouts.html",
      "handbook/phase4/chapter-33-m5-authentication.html",
      "handbook/phase4/chapter-34-m6-core-feature.html",
      "handbook/phase4/chapter-35-checkpoint-b.html",
      "handbook/phase4/chapter-36-m7-admin-console.html",
      "handbook/phase4/chapter-37-m8-supporting-features.html",
      "handbook/phase4/chapter-38-m9-payments.html",
      "handbook/phase4/chapter-39-m10-polish.html",
      "handbook/phase4/chapter-40-checkpoint-c.html",
      "handbook/phase4/chapter-41-m11-testing.html",
      "handbook/phase5/chapter-42-qa-deployment.html",
      "handbook/phase5/chapter-43-launch-checklist.html",
      "handbook/phase4/appendix-a-spec-template.html",
      "handbook/phase4/appendix-b-quality-gates.html"
    ],
    "sectionMapping": {
      "handbook/phase1": "handbook-phase1",
      "handbook/phase2": "handbook-phase2",
      "handbook/phase3": "handbook-phase3",
      "handbook/phase4": "handbook-phase4",
      "handbook/phase5": "handbook-phase5"
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

  // Phase navigation data
  const PHASES = [
    { num: 1, name: 'Validate', chapters: 'Ch 1-7', href: 'handbook/phase1/chapter-01-introduction.html', pathPrefix: 'handbook/phase1' },
    { num: 2, name: 'Design', chapters: 'Ch 8-12', href: 'handbook/phase2/chapter-08-design-philosophy.html', pathPrefix: 'handbook/phase2' },
    { num: 3, name: 'Architect', chapters: 'Ch 13-22', href: 'handbook/phase3/chapter-13-architecture.html', pathPrefix: 'handbook/phase3' },
    { num: 4, name: 'Build', chapters: 'Ch 23-41', href: 'handbook/phase4/chapter-23-moai-overview.html', pathPrefix: 'handbook/phase4' },
    { num: 5, name: 'Launch', chapters: 'Ch 42-43', href: 'handbook/phase5/chapter-42-qa-deployment.html', pathPrefix: 'handbook/phase5' }
  ];

  // Render phase navigation bar
  function renderPhaseNav(basePath, currentPath) {
    const topNav = document.getElementById('top-nav');
    if (!topNav) return;

    // Only show phase nav on handbook pages
    const isHandbookPage = currentPath.startsWith('handbook/phase');
    if (!isHandbookPage) return;

    // Create phase nav element
    const phaseNav = document.createElement('nav');
    phaseNav.id = 'phase-nav';

    // Determine current phase
    let currentPhase = null;
    for (const phase of PHASES) {
      if (currentPath.startsWith(phase.pathPrefix)) {
        currentPhase = phase.num;
        break;
      }
    }

    // Build phase links
    let html = '';
    PHASES.forEach(phase => {
      const isActive = phase.num === currentPhase;
      html += `
        <a href="${basePath}${phase.href}" class="phase-${phase.num}${isActive ? ' active' : ''}">
          <span class="phase-name">Phase ${phase.num}: ${phase.name}</span>
          <span class="phase-chapters">${phase.chapters}</span>
        </a>
      `;
    });

    phaseNav.innerHTML = html;

    // Insert after top nav
    topNav.insertAdjacentElement('afterend', phaseNav);
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
    renderPhaseNav(basePath, currentPath);
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
