'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type CursorMode = 'default' | 'magnetic' | 'view' | 'drag';

type CursorCtx = {
  mode: CursorMode;
  label: string | null;
  setMode: (mode: CursorMode) => void;
  setLabel: (label: string | null) => void;
};

const Ctx = createContext<CursorCtx | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState<string | null>(null);

  const value = useMemo(() => ({ mode, label, setMode, setLabel }), [mode, label]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCursor() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
