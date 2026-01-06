import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MOAI Handbook',
  tagline: 'Complete Methodology for Building Production-Quality SaaS with AI',
  favicon: 'img/favicon.ico',

  // Future flags
  future: {
    v4: true,
  },

  url: 'https://handbook.yourdomain.com',
  baseUrl: '/',
  organizationName: 'aiappdev2025-rgb',
  projectName: 'handbook-repo',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Docs at root
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/aiappdev2025-rgb/handbook-repo/tree/main/docusaurus/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'MOAI Handbook',
      logo: {
        alt: 'MOAI',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'handbookSidebar',
          position: 'left',
          label: 'Handbook',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/aiappdev2025-rgb/handbook-repo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      copyright: `MOAI Handbook v3.1 • ${new Date().getFullYear()}`,
    },

    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
