import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrollSlice } from "@/widgets/Navbar/model";
import { debounce } from "lodash";

export const useHidingNavbar = () => {
  const dispatch = useDispatch();
  const topPosition = useSelector(scrollSlice.selectors.topPosition);

  useEffect(() => {
    dispatch(scrollSlice.actions.setIsMobile(window.innerWidth < 768));

    const handleResize = () => {
      dispatch(scrollSlice.actions.setIsMobile(window.innerWidth < 768));
      dispatch(scrollSlice.actions.setTopPosition(0));
    };

    const handleTouchEnd = () => {
      dispatch(scrollSlice.actions.handleTouchEnd());
    };

    const scrollListener = () => {
      debounce(() => {
        dispatch(scrollSlice.actions.handleScroll(document.documentElement.scrollTop));
      }, 10)();
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { topPosition };
};