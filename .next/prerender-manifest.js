self.__PRERENDER_MANIFEST = {
  version: 4,
  routes: {
    "/favicon.ico": {
      initialHeaders: {
        "cache-control": "public, max-age=0, must-revalidate",
        "content-type": "image/x-icon",
        "x-next-cache-tags": "/favicon.ico/route",
      },
      initialRevalidateSeconds: false,
      srcRoute: "/favicon.ico",
      dataRoute: null,
    },
    "/": {
      initialRevalidateSeconds: false,
      srcRoute: "/",
      dataRoute: "/index.rsc",
    },
  },
  dynamicRoutes: {},
  notFoundRoutes: [],
  preview: {
    previewModeId: "218f9cf77f64c029d46b29223ea721b7",
    previewModeSigningKey:
      "488dcc5bb17d989700dc832650b555e69245c4900391b9d56f6947e8a724c2a0",
    previewModeEncryptionKey:
      "3a0182a99857461c3508b8ded4dd2466704609cfefb584fa25a6ddf660e833eb",
  },
};
