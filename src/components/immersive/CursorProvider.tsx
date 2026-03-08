'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

// Colores principales de la ONG
export const CURSOR_COLORS = {
  blue: '#3B82F6',
  lime: '#84CC16',
  orange: '#F97316',
  terracotta: '#C2410C',
} as const;

export type CursorColorKey = keyof typeof CURSOR_COLORS;
export type CursorType = 'default' | 'hover' | 'click' | 'link' | 'drag';

interface CursorState {
  type: CursorType;
  color: string;
  text: string;
  isVisible: boolean;
}

interface CursorContextValue extends CursorState {
  setCursorType: (type: CursorType) => void;
  setCursorColor: (color: string | CursorColorKey) => void;
  setCursorText: (text: string) => void;
  resetCursor: () => void;
  hideCursor: () => void;
  showCursor: () => void;
}

const defaultState: CursorState = {
  type: 'default',
  color: CURSOR_COLORS.blue,
  text: '',
  isVisible: true,
};

const CursorContext = createContext<CursorContextValue | null>(null);

interface CursorProviderProps {
  children: ReactNode;
  defaultColor?: string | CursorColorKey;
}

export function CursorProvider({
  children,
  defaultColor = 'blue',
}: CursorProviderProps): React.JSX.Element {
  const resolvedDefaultColor =
    defaultColor in CURSOR_COLORS
      ? CURSOR_COLORS[defaultColor as CursorColorKey]
      : defaultColor;

  const [state, setState] = useState<CursorState>({
    ...defaultState,
    color: resolvedDefaultColor,
  });

  const setCursorType = useCallback((type: CursorType) => {
    setState((prev) => ({ ...prev, type }));
  }, []);

  const setCursorColor = useCallback((color: string | CursorColorKey) => {
    const resolvedColor =
      color in CURSOR_COLORS
        ? CURSOR_COLORS[color as CursorColorKey]
        : color;
    setState((prev) => ({ ...prev, color: resolvedColor }));
  }, []);

  const setCursorText = useCallback((text: string) => {
    setState((prev) => ({ ...prev, text }));
  }, []);

  const resetCursor = useCallback(() => {
    setState({
      ...defaultState,
      color: resolvedDefaultColor,
    });
  }, [resolvedDefaultColor]);

  const hideCursor = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const showCursor = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: true }));
  }, []);

  const value = useMemo<CursorContextValue>(
    () => ({
      ...state,
      setCursorType,
      setCursorColor,
      setCursorText,
      resetCursor,
      hideCursor,
      showCursor,
    }),
    [state, setCursorType, setCursorColor, setCursorText, resetCursor, hideCursor, showCursor]
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor(): CursorContextValue {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

// Hook opcional para elementos interactivos
export function useCursorHandlers(options?: {
  type?: CursorType;
  color?: string | CursorColorKey;
  text?: string;
}) {
  const { setCursorType, setCursorColor, setCursorText, resetCursor } = useCursor();

  const onMouseEnter = useCallback(() => {
    if (options?.type) setCursorType(options.type);
    if (options?.color) setCursorColor(options.color);
    if (options?.text) setCursorText(options.text);
  }, [options, setCursorType, setCursorColor, setCursorText]);

  const onMouseLeave = useCallback(() => {
    resetCursor();
  }, [resetCursor]);

  return { onMouseEnter, onMouseLeave };
}
