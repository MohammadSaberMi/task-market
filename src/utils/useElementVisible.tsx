import { useEffect, useState } from 'react';

interface UseElementVisibleOptions {
  threshold?: number;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useElementVisible = (
  ref: React.RefObject<HTMLElement>,
  options: UseElementVisibleOptions = {}
) => {
  const { threshold = 0.1, once = false, onEnter, onLeave } = options;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsVisible(inView);

        if (inView) {
          onEnter?.();
          if (once) observer.disconnect();
        } else {
          onLeave?.();
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, once, onEnter, onLeave]);

  return isVisible;
};
