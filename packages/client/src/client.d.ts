import type { PictureSource } from "./components/picture/Picture";

declare global {
  export declare const __SERVER_PORT__: number;

  export declare const __API_ENDPOINT__: string;

  export declare const __API_BASEURL__: string;

  interface Window {
    __PRELOADED_STATE__?: object;
  }

  export declare module "*&source&imagetools" {
    const src: PictureSource[];
    export default src;
  }

  export declare module "*&imagetools" {
    const src: string;
    export default src;
  }
}
