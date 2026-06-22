'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Reveal } from './Reveal';
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Note,
  Sparkle,
  ArrowRight,
  Mail,
} from './Icons';

export function ReserveSection() {
  const [done, setDone] = useState(false);
  const [time, setTime] = useState('19:00');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section
      id="reservieren"
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px 40px 40px',
        scrollMarginTop: 84,
      }}
    >
      <Reveal>
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#E1391F',
          }}
        >
          Reservieren
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-saira)',
            fontWeight: 800,
            fontSize: 52,
            lineHeight: 1,
            textTransform: 'uppercase',
            margin: '10px 0 0',
          }}
        >
          Tisch sichern.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: '#3a3d42',
            margin: '12px 0 0',
            maxWidth: 520,
          }}
        >
          In 30 Sekunden erledigt – wir bestätigen per E-Mail, meist innerhalb von 2 Std.
        </p>
      </Reveal>

      <div
        data-resv-grid
        style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 28,
          alignItems: 'stretch',
        }}
      >
        {/* ─── FORM CARD ─── */}
        <Reveal>
          <div
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: 22,
              padding: '34px 30px 28px',
              boxShadow: '0 18px 40px rgba(22,24,28,0.06)',
              overflow: 'hidden',
              height: '100%',
            }}
          >
            {/* vermillion accent bar */}
            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 5,
                background: 'linear-gradient(90deg, #E1391F 0%, #F4A52C 100%)',
              }}
            />
            {/* kanji watermark */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: -10,
                bottom: -40,
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 200,
                lineHeight: 1,
                color: 'rgba(225,57,31,0.05)',
                pointerEvents: 'none',
              }}
            >
              席
            </span>

            {done ? (
              <SuccessBlock />
            ) : (
              <form
                onSubmit={onSubmit}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 12,
                  }}
                >
                  <Field icon={<Calendar />} label="Datum">
                    <input type="date" required style={inputStyle} />
                  </Field>
                  <Field icon={<Clock />} label="Uhrzeit">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      style={inputStyle}
                    />
                  </Field>
                </div>
                <Field icon={<Users />} label="Personen">
                  <select required style={inputStyle} defaultValue="2 Personen">
                    <option>1 Person</option>
                    <option>2 Personen</option>
                    <option>3 Personen</option>
                    <option>4 Personen</option>
                    <option>5 Personen</option>
                    <option>6 Personen</option>
                    <option>7 Personen</option>
                    <option>8+ Personen</option>
                  </select>
                </Field>
                <Field icon={<User />} label="Name">
                  <input
                    type="text"
                    placeholder="Vor- und Nachname"
                    required
                    style={inputStyle}
                  />
                </Field>
                <Field icon={<Phone />} label="Kontakt (Tel. oder E-Mail)">
                  <input
                    type="text"
                    placeholder="z. B. +43 …"
                    required
                    style={inputStyle}
                  />
                </Field>
                <Field icon={<Note />} label="Anmerkung (optional)">
                  <input
                    type="text"
                    placeholder="Allergien, Geburtstag, Kinderwagen …"
                    style={inputStyle}
                  />
                </Field>

                <button
                  type="submit"
                  className="hov-shine hov-arrow"
                  style={{
                    marginTop: 10,
                    padding: '16px 22px',
                    background: '#E1391F',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 999,
                    fontWeight: 800,
                    fontSize: 17,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    boxShadow: '0 12px 28px rgba(225,57,31,0.32)',
                  }}
                >
                  Reservierung anfragen
                  <span className="arrow" style={{ display: 'inline-flex' }}>
                    <ArrowRight size={18} />
                  </span>
                </button>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 8,
                    fontSize: 12.5,
                    color: '#6b6e73',
                    fontWeight: 600,
                  }}
                >
                  <Sparkle size={14} />
                  Bestätigung per E-Mail · keine Anzahlung nötig.
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* ─── EVENTS / CATERING CARD ─── */}
        <Reveal delay={120}>
          <div
            id="catering"
            style={{
              position: 'relative',
              background: '#16181C',
              color: '#FAF6EC',
              borderRadius: 22,
              padding: '34px 30px 28px',
              overflow: 'hidden',
              height: '100%',
              scrollMarginTop: 84,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: -20,
                top: -50,
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 240,
                lineHeight: 1,
                color: 'rgba(244,165,44,0.07)',
                pointerEvents: 'none',
              }}
            >
              宴
            </span>

            <div
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#F4A52C',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: '#F4A52C',
                  borderRadius: '50%',
                }}
              />
              Events &amp; Catering
            </div>
            <h3
              style={{
                position: 'relative',
                fontFamily: 'var(--font-saira)',
                fontWeight: 800,
                fontSize: 34,
                lineHeight: 1.02,
                textTransform: 'uppercase',
                margin: '12px 0 6px',
              }}
            >
              Feiern im DC&nbsp;Tower
            </h3>
            <p
              style={{
                position: 'relative',
                fontSize: 14.5,
                lineHeight: 1.5,
                color: '#bdb8a8',
                margin: '0 0 20px',
                maxWidth: 380,
              }}
            >
              Eigenes Menü, Büffet oder Fingerfood – wir stellen alles passend
              auf eure Runde ein.
            </p>

            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <RoomCard
                num="45"
                title="Private Lounge"
                where="1. Stock"
                note="eigenes Menü oder Büffet"
              />
              <RoomCard
                num="80"
                title="Raum mit Bar"
                where="Erdgeschoss"
                note="Büffet oder Fingerfood"
              />
            </div>

            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginTop: 22,
              }}
            >
              <a
                href="mailto:info@godctower.com?subject=Catering-Anfrage"
                className="hov-shine"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '13px 14px',
                  background: '#F4A52C',
                  color: '#16181C',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none',
                  boxShadow: '0 10px 22px rgba(244,165,44,0.25)',
                }}
              >
                <Mail size={16} />
                Anfragen
              </a>
              <a
                href="tel:+4319165156"
                className="hov-lift-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '13px 14px',
                  background: 'rgba(250,246,236,0.08)',
                  color: '#FAF6EC',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                  border: '1px solid rgba(250,246,236,0.18)',
                }}
              >
                <Phone size={16} />
                Anrufen
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----- helpers ----- */

const inputStyle: React.CSSProperties = {
  flex: 1,
  width: '100%',
  padding: '10px 12px 10px 0',
  border: 'none',
  background: 'transparent',
  fontSize: 15,
  outline: 'none',
};

function Field({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#6b6e73',
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '4px 14px',
          background: '#FAF6EC',
          borderRadius: 12,
          border: '1.5px solid transparent',
          transition: 'border-color 0.15s',
        }}
      >
        <span style={{ color: '#E1391F', display: 'inline-flex' }}>{icon}</span>
        {children}
      </span>
    </label>
  );
}

function RoomCard({
  num,
  title,
  where,
  note,
}: {
  num: string;
  title: string;
  where: string;
  note: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        padding: '14px 16px',
        background: 'rgba(250,246,236,0.06)',
        border: '1px solid rgba(250,246,236,0.08)',
        borderRadius: 14,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 56,
          flex: 'none',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-saira)',
            fontWeight: 900,
            fontSize: 30,
            color: '#E1391F',
            lineHeight: 1,
          }}
        >
          {num}
        </div>
        <div
          style={{
            marginTop: 2,
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#9a9488',
          }}
        >
          Gäste
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#FAF6EC' }}>
          {title} · <span style={{ color: '#bdb8a8', fontWeight: 600 }}>{where}</span>
        </div>
        <div style={{ fontSize: 13, color: '#9a9488', marginTop: 2 }}>{note}</div>
      </div>
    </div>
  );
}

function SuccessBlock() {
  return (
    <div
      style={{
        position: 'relative',
        background: '#2FA36B',
        color: '#fff',
        borderRadius: 16,
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          margin: '0 auto 12px',
          background: 'rgba(255,255,255,0.18)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30,
        }}
      >
        ✓
      </div>
      <div
        style={{
          fontFamily: 'var(--font-saira)',
          fontWeight: 800,
          fontSize: 26,
          textTransform: 'uppercase',
        }}
      >
        Reservierung angefragt
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.5 }}>
        Danke! Wir bestätigen deine Reservierung in Kürze per E-Mail.
      </p>
    </div>
  );
}
