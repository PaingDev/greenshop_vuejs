module.exports = {
  /* ... other config ... */
  // pwa: {
  //   themeColor: "#68C101",
  //   name: "FreshMyanmar",
  //   iconPaths: {
  //     msTileImage: "logo.png",
  //   },
  // },
  transpileDependencies: ["vuex-persist"],

  pwa: {
    themeColor: "#68C101",
    workboxPluginMode: "GenerateSW",
    name: "FreshMyanmar",

    manifestOptions: {
      name: "FreshMyanmar",
      short_name: "FreshMM",
      theme_color: "#68c101",
      background_color: "#68c101",
      display: "standalone",
      orientation: "portrait",
      Scope: "/",
      start_url: ".",
      icons: [
        {
          src: "images/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "images/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "images/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "images/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "images/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "images/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "images/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "images/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],

      splash_pages: null,
    },
    iconPaths: {
      favicon32: "images/icons/icon-72x72.png",
      favicon16: "images/icons/icon-72x72.png",
      appleTouchIcon: "images/icons/icon-152x152.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png",
    },
  },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
};
