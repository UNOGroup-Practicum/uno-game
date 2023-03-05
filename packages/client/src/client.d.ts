import type { PictureSource } from "./components/picture/Picture";

declare const __SERVER_PORT__: number;

declare global {
  export declare module "*&source&imagetools" {
    const src: PictureSource[];
    export default src;
  }

  export declare module "*&imagetools" {
    const src: string;
    export default src;
  }
}
