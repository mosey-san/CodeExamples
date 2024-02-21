import { useEffect, useRef, useState } from 'react';

/**
 * Пользовательский React хук, который возвращает объект ref и булево значение, указывающее на то, находится ли элемент в области просмотра.
 *
 * @param {IntersectionObserverInit | undefined} options - Необязательные параметры для IntersectionObserver.
 * @return {[React.RefObject<T>, boolean]} Массив, содержащий объект ref и булево значение.
 */
export function useViewort<T extends Element>(
  options?: IntersectionObserverInit | undefined,
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const observer = useRef<IntersectionObserver>();
  const [isInViewPort, setIsInViewPort] = useState(false);

  useEffect(() => {
    if (!options)
      options = {
        threshold: [0.2, 0.8],
      };
    if (!observer.current) {
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewPort(true);
        } else {
          setIsInViewPort(false);
        }
      }, options);
    }
    if (ref.current) observer.current.observe(ref.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [options]);

  return [ref, isInViewPort];
}
