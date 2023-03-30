interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;

  webkitExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  msExitFullscreen?: () => void;
}

interface ExtendedHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

export const toggleFullScreen = () => {
  const htmlDocument: ExtendedDocument = document;
  const elem: ExtendedHTMLElement = document.documentElement;

  const isFullscreenOff = Boolean(
    (htmlDocument.fullscreenElement !== undefined && htmlDocument.fullscreenElement === null) ||
      (htmlDocument.webkitFullscreenElement !== undefined &&
        !htmlDocument.webkitFullscreenElement) ||
      (htmlDocument.mozFullScreenElement !== undefined && !htmlDocument.mozFullScreenElement) ||
      (htmlDocument.msFullscreenElement !== undefined && htmlDocument.msFullscreenElement === null)
  );

  const activateFullscreen = () => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };
  const deactivateFullscreen = () => {
    if (htmlDocument.exitFullscreen) {
      htmlDocument.exitFullscreen().then();
    } else if (htmlDocument.webkitExitFullscreen) {
      htmlDocument.webkitExitFullscreen();
    } else if (htmlDocument.mozCancelFullScreen) {
      htmlDocument.mozCancelFullScreen();
    } else if (htmlDocument.msExitFullscreen) {
      htmlDocument.msExitFullscreen();
    }
  };

  if (isFullscreenOff) {
    activateFullscreen();
  } else {
    deactivateFullscreen();
  }
};
