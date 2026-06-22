'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { MENU } from '@/lib/menu';

type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  lineTotal: number;
};

type CartCtx = {
  cart: Record<string, number>;
  cartCount: number;
  cartEmpty: boolean;
  hasItems: boolean;
  lines: CartLine[];
  subtotal: number;
  total: number;
  pickupTime: string;
  setPickupTime: (t: string) => void;
  add: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  checkoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [pickupTime, setPickupTime] = useState<string>('asap');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const add = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }, []);

  const inc = add;

  const dec = useCallback((id: string) => {
    setCart((c) => {
      const next = (c[id] ?? 0) - 1;
      const out = { ...c };
      if (next <= 0) delete out[id];
      else out[id] = next;
      return out;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);
  const openCheckout = useCallback(() => setCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  const value = useMemo<CartCtx>(() => {
    const lines: CartLine[] = Object.entries(cart).map(([id, qty]) => {
      const item = MENU.find((m) => m.id === id)!;
      return {
        id,
        name: item.name,
        price: item.price,
        qty,
        lineTotal: item.price * qty,
      };
    });
    const cartCount = lines.reduce((a, l) => a + l.qty, 0);
    const subtotal = lines.reduce((a, l) => a + l.lineTotal, 0);
    return {
      cart,
      lines,
      cartCount,
      cartEmpty: cartCount === 0,
      hasItems: cartCount > 0,
      subtotal,
      total: subtotal,
      pickupTime,
      setPickupTime,
      add,
      inc,
      dec,
      clear,
      checkoutOpen,
      openCheckout,
      closeCheckout,
    };
  }, [cart, pickupTime, checkoutOpen, add, inc, dec, clear, openCheckout, closeCheckout]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart must be inside CartProvider');
  return v;
}
