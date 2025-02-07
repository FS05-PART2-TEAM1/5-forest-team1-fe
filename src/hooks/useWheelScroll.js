// useWheelScroll.js
import { useRef, useEffect } from "react";

export default function useWheelScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // wheel 이벤트 핸들러 (deltaY를 가로 스크롤로 변환)
    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    };

    // passive: false 설정
    container.addEventListener("wheel", handleWheel, { passive: false });

    // cleanup
    return () => {
      container.removeEventListener("wheel", handleWheel, { passive: false });
    };
  }, []);

  return { scrollRef };
}
