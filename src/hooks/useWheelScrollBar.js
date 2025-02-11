import { useRef, useEffect, useState } from "react";

export default function useWheelScrollBar(itemCount, itemWidth) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      if (!container) return;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const index = Math.round((scrollLeft / maxScrollLeft) * (itemCount - 1));
      setCurrentIndex(index);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [itemCount]);

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  return { scrollRef, currentIndex, scrollToIndex };
}
