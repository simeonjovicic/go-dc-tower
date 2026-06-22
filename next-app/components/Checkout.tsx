'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCart } from './CartProvider';
import { fmt } from '@/lib/format';

type Slot = { value: string; label: string };

function buildPickupSlots(now: Date): Slot[] {
  const day = now.getDay(); // 0=Sun, 1=Mo … 6=Sa
  // Closing minute of day. Saturday closed, Sunday until 17:00, else 22:00 (Küche bis 21:00 - we still take orders up to 21:00).
  if (day === 6) {
    return [{ value: 'next-open', label: 'Heute geschlossen – Bestellung für Montag' }];
  }
  const close = day === 0 ? 17 * 60 : 21 * 60; // last accepted slot
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  let start = Math.ceil((minutesNow + 20) / 15) * 15;
  if (start < 11 * 60 + 30) start = 11 * 60 + 30; // earliest 11:30

  const slots: Slot[] = [{ value: 'asap', label: 'So schnell wie möglich · ~20 Min' }];
  if (start > close) {
    return [{ value: 'next-open', label: 'Heute geschlossen – Bestellung für morgen' }];
  }
  for (let m = start; m <= close; m += 15) {
    const h = String(Math.floor(m / 60)).padStart(2, '0');
    const min = String(m % 60).padStart(2, '0');
    const label = `${h}:${min} Uhr`;
    slots.push({ value: `${h}:${min}`, label });
  }
  return slots;
}

export function Checkout() {
  const {
    checkoutOpen, closeCheckout,
    total, clear,
    pickupTime, setPickupTime,
  } = useCart();
  const [placed, setPlaced] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([
    { value: 'asap', label: 'So schnell wie möglich · ~20 Min' },
  ]);

  useEffect(() => {
    if (!checkoutOpen) return;
    setSlots(buildPickupSlots(new Date()));
  }, [checkoutOpen]);

  const selectedSlot = useMemo(
    () => slots.find((s) => s.value === pickupTime),
    [slots, pickupTime],
  );

  if (!checkoutOpen) return null;

  function close() {
    closeCheckout();
    if (placed) {
      clear();
      setPlaced(false);
      setPickupTime('asap');
    }
  }

  function placeOrder() {
    setPlaced(true);
  }

  const confirmationTime = selectedSlot
    ? selectedSlot.value === 'asap'
      ? 'in ca. 20 Min.'
      : `um ${selectedSlot.label.replace(' Uhr', ' Uhr')}`
    : '';

  const input: React.CSSProperties = {
    padding: 14,
    border: '1.5px solid rgba(22,24,28,0.18)',
    borderRadius: 12,
    background: '#fff',
    fontSize: 15,
    width: '100%',
  };

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'rgba(22,24,28,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'floatUp 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 460,
          background: '#FAF6EC',
          borderRadius: 24,
          padding: 30,
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {placed ? (
          <div style={{ textAlign: 'center', padding: '18px 6px' }}>
            <div
              style={{
                width: 74,
                height: 74,
                margin: '0 auto',
                background: '#2FA36B',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 40,
                color: '#fff',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 34,
                textTransform: 'uppercase',
                margin: '18px 0 0',
              }}
            >
              Bestellung abgeschickt!
            </h3>
            <p
              style={{
                fontSize: 16,
                color: '#3a3d42',
                lineHeight: 1.5,
                margin: '10px 0 0',
              }}
            >
              Danke! Deine Bestellung ist abholbereit {confirmationTime} im DC&nbsp;Tower,
              Donau-City-Straße 7.
            </p>
            <button
              onClick={close}
              style={{
                marginTop: 24,
                padding: '15px 30px',
                background: '#16181C',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Schließen
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-saira)',
                  fontWeight: 800,
                  fontSize: 30,
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Zur Kasse
              </h3>
              <button
                onClick={close}
                aria-label="Schließen"
                style={{
                  width: 36,
                  height: 36,
                  border: 'none',
                  background: 'rgba(22,24,28,0.07)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: '12px 14px',
                background: '#fff',
                border: '1px solid rgba(22,24,28,0.08)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 13,
                fontWeight: 600,
                color: '#16181C',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: '#2FA36B',
                  borderRadius: '50%',
                  flex: 'none',
                }}
              />
              Nur Abholung · DC&nbsp;Tower, Donau-City-Straße 7
            </div>

            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.02em',
                }}
              >
                Abholzeit
                <select
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  style={input}
                >
                  {slots.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <input type="text" placeholder="Name" required style={input} />
              <input type="tel" placeholder="Telefon (für Rückfragen)" required style={input} />
            </div>

            <div
              style={{
                marginTop: 18,
                paddingTop: 14,
                borderTop: '1px dashed rgba(22,24,28,0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-saira)',
                  fontWeight: 800,
                  fontSize: 22,
                  textTransform: 'uppercase',
                }}
              >
                Gesamt
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-saira)',
                  fontWeight: 900,
                  fontSize: 30,
                  color: '#E1391F',
                }}
              >
                {fmt(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={placeOrder}
              className="hov-shine"
              style={{
                width: '100%',
                marginTop: 16,
                padding: 17,
                background: '#E1391F',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 18,
                boxShadow: '0 10px 24px rgba(225,57,31,0.3)',
              }}
            >
              Bestellung abschicken · {fmt(total)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
