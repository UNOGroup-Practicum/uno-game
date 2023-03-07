import React from "react";

export type PictureSource = { src: string; w: string };

type PictureProps = {
  webp: PictureSource[];
};

export const Picture: React.FC<React.PropsWithChildren<PictureProps>> = ({ webp, children }) => {
  if (!Array.isArray(webp)) {
    return null;
  }

  const acc: string[] = [];

  const webpSrcset = webp
    .reduce((acc, current) => {
      acc.push(`${current.src} ${current.w}w`);

      return acc;
    }, acc)
    .join(", ");

  return (
    <picture>
      <source srcSet={String(webpSrcset)} type="image/webp" />
      {children}
    </picture>
  );
};
