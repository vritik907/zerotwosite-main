import { useEffect, useRef } from 'react';

const useScrollAnimation = (animationClass, threshold = 0) => {
  const elementRef = useRef(null);
  const isAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated.current) {
          element.classList.add(animationClass);
          isAnimated.current = true;
        }
      },
      { threshold }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animationClass, threshold]);

  return elementRef;
};

export default useScrollAnimation;
