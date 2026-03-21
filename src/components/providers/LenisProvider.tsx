'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createLenis,
  shouldEnableLenis,
  prefersReducedMotion,
  type LenisScrollCallback,
} from '@/lib/scroll/lenis';

// Registrar ScrollTrigger con GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Contexto de Lenis
interface LenisContextValue {
  lenis: Lenis | null;
  isReady: boolean;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  isReady: false,
  scrollTo: () => {},
});

// Hook para acceder a la instancia de Lenis
export const useLenis = (callback?: LenisScrollCallback): LenisContextValue => {
  const context = useContext(LenisContext);

  useEffect(() => {
    if (!callback || !context.lenis) return;

    // Ejecutar callback en cada frame de scroll
    const unsubscribe = context.lenis.on('scroll', () => {
      callback(context.lenis!);
    });

    return () => {
      unsubscribe();
    };
  }, [callback, context.lenis]);

  return context;
};

// Props del provider
interface LenisProviderProps {
  children: ReactNode;
  options?: Partial<Lenis['options']>;
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  // Funcion para scroll programatico
  const scrollTo = useCallback(
    (target: string | number | HTMLElement, scrollOptions?: ScrollToOptions) => {
      if (!lenisRef.current) {
        // Fallback a scroll nativo si Lenis no esta disponible
        if (typeof target === 'string') {
          const element = document.querySelector(target);
          element?.scrollIntoView({ behavior: 'smooth' });
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      lenisRef.current.scrollTo(target, {
        offset: scrollOptions?.offset ?? 0,
        duration: scrollOptions?.duration ?? 1.2,
        immediate: scrollOptions?.immediate ?? false,
        lock: scrollOptions?.lock ?? false,
        onComplete: scrollOptions?.onComplete,
      });
    },
    []
  );

  // Inicializar Lenis y conectar con GSAP ScrollTrigger
  useEffect(() => {
    // No inicializar si no debe habilitarse
    if (!shouldEnableLenis()) {
      setIsReady(true);
      return;
    }

    // Crear instancia de Lenis
    const lenis = createLenis(options);
    if (!lenis) {
      setIsReady(true);
      return;
    }

    lenisRef.current = lenis;

    // Configurar ScrollTrigger.scrollerProxy para integracion con GSAP
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: 'transform',
    });

    // Actualizar ScrollTrigger en cada frame de Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Loop de animacion con requestAnimationFrame
    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);
    setIsReady(true);

    // Escuchar cambios en prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.destroy();
        lenisRef.current = null;
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // Limpiar ScrollTrigger
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, [options]);

  // Resetear scroll al cambiar de pagina (compatibilidad con App Router)
  useEffect(() => {
    if (lenisRef.current) {
      // Scroll al inicio cuando cambia la ruta
      lenisRef.current.scrollTo(0, { immediate: true });
      // Refrescar ScrollTrigger
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  // Refrescar ScrollTrigger cuando el contenido cambia (con debounce)
  useEffect(() => {
    if (!isReady) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // Debounce ScrollTrigger.refresh para evitar llamadas excesivas
    const debouncedRefresh = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Observar cambios en el DOM para refrescar ScrollTrigger
    const observer = new MutationObserver(debouncedRefresh);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [isReady]);

  const contextValue: LenisContextValue = {
    lenis: lenisRef.current,
    isReady,
    scrollTo,
  };

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}

export default LenisProvider;
