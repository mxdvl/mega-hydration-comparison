import type { StateUpdater } from "preact/hooks";
import { useEffect, useRef, useState } from "preact/hooks";

/**
 * Custom hook around the `IntersectionObserver`.
 *
 * @param options
 * @param {boolean} [options.debouce] If `true`, debounce triggers by 200ms.
 * By default, trigger instantaneously. Enabling debouncing ensures the target
 * element intersects for at least 200ms before the callback is executed
 * @param {boolean} [options.repeat] If `true`, trigger the hook on
 * all intersections. By default, only trigger on the first intersection.
 * @param {boolean} [options.node] Set the initial node, if known.
 * @returns a tuple containing [isInView, setNode];
 */
const useIsInView = (
  options: IntersectionObserverInit & {
    debounce?: true;
    repeat?: true;
    node?: HTMLElement;
  }
): [boolean, StateUpdater<HTMLElement | null>] => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [node, setNode] = useState<HTMLElement | null>(options.node ?? null);

  const observer = useRef<IntersectionObserver | null>(null);

  const intersectionFn: IntersectionObserverCallback = ([entry]) => {
    if (!entry) return;

    if (entry.isIntersecting) {
      setIsInView(true);
    } else if (options.repeat) {
      setIsInView(false);
    }
  };

  useEffect(() => {
    // TODO: can we remove this? It’s now always cleaned up
    if (observer.current) {
      observer.current.disconnect();
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- Safety for browser support
    if (window.IntersectionObserver) {
      observer.current = new window.IntersectionObserver(
        intersectionFn,
        options
      );

      if (node) {
        observer.current.observe(node);
      }
    }

    return () => observer.current?.disconnect();
  }, [node, options, intersectionFn]);

  return [isInView, setNode];
};

export { useIsInView };
