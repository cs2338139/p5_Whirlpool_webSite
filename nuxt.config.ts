export default defineNuxtConfig({
    modules: ['@nuxtjs/apollo'],
  css: ["~/assets/css/main.css"],
  build: {
    transpile: ["gsap"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-TW",
      },
      title: "P5_WhirlPool",
      script: [
        {
          type: "module",
          src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
          body: true,
        },
        {
          nomodule: true,
          src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
          body: true,
        },
      ],
      viewport: "width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0",
      meta: [{ charset: "utf-8" }],
      link: [
        {
        //   rel: "icon",
        //   href: "favicon-32x32.ico",
        },
      ],
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.spacex.land/graphql'
      }
    },
  },
});
