# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

In der Reihenfolge ihrer Bedeutung für die Website:

1. **Firmen**: Office-Manager und Teamverantwortliche, die einen Business Lunch ins Büro, ein Catering, ein Event im Restaurant oder eine Firmenreservierung (bis 50 Personen) anfragen.
2. **Abendgäste und Gruppen**: Freunde, Geburtstage, Feiern; sie reservieren einen Tisch oder eine Etage.
3. **Büroleute zu Mittag**: Sie arbeiten im DC Tower, in der Donau City oder rund um das VIC und wollen schnell die Lunchkarte sehen, reservieren oder online bestellen.

## Product Purpose

Die Website des Restaurants ra'mien go (Ra'miengo) im DC Tower, Wien. Sie soll Besucher dazu bringen, einen Tisch zu reservieren, Catering, Business Lunch oder ein Event anzufragen oder online zu bestellen, und ihnen die Fakten dafür liefern: Karten, Zeiten, Räume, Anreise und Parken.

## Positioning

Asian Fusion in großer Vielfalt an einer Adresse: Nudelsuppen (La Mien), Sushi, Wok, Poké Bowls und Vorspeisen zum Teilen. Für jeden in der Runde ist etwas dabei, mitten im DC Tower.

## Operating Context

- **Öffnungszeiten:** Mo–Fr 11:00–22:00 (Küche bis 21:00), So 11:00–17:00, Samstag und Feiertage geschlossen.
- **Karten:** Lunchkarte Mo–Fr 11:00–17:00. Abendkarte Mo–Fr 17:00–21:00 und So 11:00–17:00.
- **Räume:**
  - Erdgeschoss: bis 80 Sitzplätze, Gruppen bis 65.
  - Obergeschoss: bis 45 Sitzplätze.
  - Firmenreservierungen bis 50 Personen.
- **Catering:**
  - Wird nur geliefert, ohne Service-Personal.
  - Menüs mit mehreren Gängen gibt es ausschließlich im Restaurant.
  - Anfragen bevorzugt per E-Mail, damit die Zusage schriftlich ist.
- **Anreise:**
  - Mit der U1: Kaisermühlen · VIC (2 Gehminuten) oder Donauinsel (ca. 5 Minuten, dazu gibt es ein Video).
  - Mit dem Auto: DC Tower Garage. Das Parkticket wird im Restaurant abgestempelt, dann kostet das Parken 1 € pro Stunde.
- **Reservierungen und Onlinebestellung:** über **GloriaFood** (Widget `https://www.fbgcdn.com/embedder/js/ewm2.js`, cuid `3d1d2f7e-8db5-48c1-b1ba-78b21132b068`, ruid `548b70b8-d40c-4821-9093-68a955a5afb5`), so wie auf der bisherigen godctower.com. Telefon und E-Mail bleiben als Alternative.
- **Catering-Anfragen:** über ein Formular, das als E-Mail bei office@godctower.com ankommt. Die Zusage geht schriftlich per E-Mail zurück.

## Capabilities and Constraints

- **Technik:** Next.js (App Router) in `next-app/`, als statischer Export (`output: export`). Es gibt kein Backend.
- **Ersetzt die bisherige Website** godctower.com komplett. Deren Inhalte dürfen als Material dienen, ihr Design ist kein Vorbild.
- **Seitenstruktur laut Briefing:** Startseite (großes Bild mit 面), Philosophie, Menü, Restaurant, Catering, Newsletter, Kontakt. Dazu kommen `/menu` und `/impressum`.
- **Onlinebestellung:** über einen externen Dienst (`ORDER_URL`).
- **Noch offen:**
  - Text zur Philosophie (schreibt Lee).
  - Lunchkarte und Abendkarte als PDF.
  - Weitere Wegbeschreibungs-Videos.
  - Anbieter für den Newsletter (bis dahin läuft die Anmeldung per E-Mail).
  - Ob es eine englische Version gibt.

## Brand Commitments

- **Name:** ra'mien go, Standort DC Tower. Im Briefing auch „Ra'miengo DC Tower“ geschrieben.
- **Bildmarke:** Logo `next-app/public/go-dc-tower-logo.png`.
- **Zeichen 面** (miàn, Nudeln) als Motiv der Startseite, vom Briefing vorgegeben.
- **Sprache:** Deutsch, **Du/Ihr** (vom Nutzer am 2026-10-01 bestätigt; ersetzt die frühere Angabe „Sie-Form“). Kurz, konkret, faktenbasiert, ohne Werbefloskeln.
- **Geschirr:** Aktuell ist blau-weißes Porzellan (Wolt-Fotos 2026). Die weißen Schalen mit rotem go-Bogen aus den Shootings 2021/22 sind älter, die Fotos dürfen aber für Atmosphäre verwendet werden.
- **Visuelle Welt (vom Nutzer am 2026-10-02 festgelegt):** die dunkle, elegante Schwarz/Creme/Rot-Welt des bestehenden High-Class-Designs. Zu viel Weiß und helle Papier-Looks lehnt der Nutzer ab, sie wirken für ihn nicht edel.
- **Rot** ist die Markenfarbe (Logo, Neon-go an der Fassade, rote Treppe ins Obergeschoss). Laut Nutzer wird es sparsam als Signal eingesetzt.

## Evidence on Hand

- **Fakten:** `next-app/components/site-data.ts` (Adresse, Zeiten, Kontakt, Kapazitäten, Catering, Rechtliches).
- **Speisekarte:** `next-app/components/menu-data.ts`, abgeschrieben aus der Abendkarte-PDF (Stand 2026/05).
- **Catering-Texte:** `docs/Catering_und_Events_Ramiengo_DC_Tower.docx`. Die Kapazitäten darin sind veraltet, es gelten die Zahlen oben.
- **Fotos:**
  - Echte Fotos in `next-app/public/foto/`: Location, Shootings 2021/09, 2021/11 und 2022/03, Wolt 2026, Gerichte, Haus, Leben. Übersicht in `docs/fotoarchiv.md`.
  - Die Gerichtsfotos in `foto/gericht-enhanced/` sind mit KI bearbeitet (nur der Hintergrund, siehe `docs/food-photography.md`).
- **Video:** Anfahrt von der U1 Donauinsel, `next-app/public/videos/anfahrt-u1-donauinsel.mp4`.
- **Nicht vorhanden, also nicht erfinden:** Bewertungen, Testimonials, Pressestimmen, Auszeichnungen, Preise für Catering.

## Product Principles

1. **Anfrage vor Inspiration.** Jeder Bereich führt zu einem klaren nächsten Schritt: reservieren, anfragen oder bestellen.
2. **Firmen sind Kunden.** Catering, Business Lunch und Firmenreservierung sind gleichwertig mit dem Restaurantbesuch, nicht bloß ein Anhang.
3. **Nur echte Fakten.** Zahlen, Zeiten und Zusagen kommen aus `site-data.ts` und von der Inhaberin. Nichts versprechen, was das Haus nicht leistet (kein Personal beim Catering, keine Gänge-Menüs außer Haus).
4. **Vielfalt zeigen.** Die Breite der Karte ist das Argument. Gezeigt werden echte Gerichte mit echten Fotos.

## Accessibility & Inclusion

Das Restaurant ist barrierefrei erreichbar (Erdgeschoss des DC Tower), und die Website sagt das auch. Ein bestimmter Standard für die Website selbst wurde nicht festgelegt.
