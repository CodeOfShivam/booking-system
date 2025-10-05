import { useRef } from "react";

export function useScrollableSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right", amount = 200) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return {
    scrollRef,
    scrollLeft: () => scroll("left"),
    scrollRight: () => scroll("right"),
  };
}
