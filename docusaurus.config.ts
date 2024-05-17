import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
  title: "二次元コードを体験してみよう！",
  tagline: "二次元コードは面白い！",
  favicon: "img/favicon.svg",

  url: "https://ut-code.github.io",
  baseUrl: "/qrcode/",

  organizationName: "ut-code",
  projectName: "barcode",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/ut-code/barcode/tree/main/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social-card.jpg",
    navbar: {
      title: "二次元コードを体験してみよう！",
      logo: {
        alt: "二次元コードを体験してみよう！ ロゴ",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "チュートリアル",
        },
        {
          href: "https://github.com/ut-code/barcode",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "チュートリアル",
              to: "/docs",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://utcode.net/join/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/utokyo_code",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/ut-code/barcode",
            },
          ],
        },
      ],
      copyright: `QR コードは株式会社デンソーウェーブの登録商標です。<br />Copyright © ${new Date().getFullYear()} 二次元コードを体験してみよう！ Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

export default config;
