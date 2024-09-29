import { useEffect, useRef, useState } from "react";

const useModeChanger = () => {
  const parent = useRef<HTMLDivElement>(null);
  const [isReadonly, setIsReadonly] = useState(true);
  const readOnlyMargin = useRef("");
  useEffect(() => {
    const element = parent?.current;
    if (element) {
      const marginLeft = window.getComputedStyle(element).marginLeft;
      element.style.marginLeft = marginLeft.toString();
      readOnlyMargin.current = marginLeft.toString();
    }
    const resize = () => {
      const element = parent?.current;
      if (element) {
        element.style.marginLeft = "";
        if (readOnlyMargin?.current) {
          readOnlyMargin.current = ""
        }
      }
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    }
  }, []);
  const setPadding = () => {
    const element = parent?.current;
    if (element) {
      if (isReadonly) {
        if (!readOnlyMargin?.current) {
          const marginLeft = window.getComputedStyle(element).marginLeft;
          readOnlyMargin.current = marginLeft.toString();
        }
        element.style.marginLeft = "0";
      } else {
        if (readOnlyMargin?.current) {
          element.style.marginLeft = readOnlyMargin.current.toString();
        }
      }
    }
  };
  return {
    parent,
    isReadonly,
    setIsReadonly,
    setPadding,
  }
}
export default useModeChanger