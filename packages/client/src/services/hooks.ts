import { useEffect, useState } from "react";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import type { AppDispatch, RootState } from "./store";

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const usePageVisibility = (initialState = true) => {
  const [pageIsVisible, setPageIsVisible] = useState(initialState);

  useEffect(() => {
    const handleVisibilitychange = () => {
      if (document.hidden) {
        setPageIsVisible(false);
      } else {
        setPageIsVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilitychange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilitychange);
    };
  }, []);

  return pageIsVisible;
};
