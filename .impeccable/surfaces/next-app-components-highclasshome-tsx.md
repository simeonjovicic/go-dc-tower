---
version: 1
slug: "next-app-components-highclasshome-tsx"
primary_target: "next-app/components/HighClassHome.tsx"
related_targets: ["next-app/app/menu/page.tsx","next-app/app/catering/page.tsx"]
---

# Surface brief: Startseite (+ /menu, /catering)

Scope: Startseite `/`, Speisekarte `/menu`, Catering `/catering`. Visitor mode: Persuade, mobile first.
Audience: Firmen (Catering, Business Lunch, Firmenreservierung) > Abendgäste/Gruppen > Büroleute mittags.
Action: Tisch reservieren und Online bestellen (GloriaFood), Catering anfragen (Formular).

## Verlauf

- 2026-10-01: Richtung „Der Bestellzettel“ (seed 77ab52c4, helles Papier, Porzellanblau) gebaut und vom Nutzer verworfen: zu weiß, nicht edel, zu viel los. Auch die reduzierte 5-Block-Version wurde abgelehnt.
- 2026-10-02: Rückkehr zur incumbent High-Class-Welt (Stand 7f477f8): dunkler Ramen-Hero, Creme/Schwarz/Rot, Italiana + DM Sans, Eyebrows und Struktur wie dort. Nutzer-bestätigte Ausnahmen:
  1. Hero-Hierarchie: „RA’MIEN GO“ groß (Italiana, gesperrt) als einziger Anker, 面 groß und leise (8–9 %) als Wasserzeichen hinter der Wortmarke, nie über der Schale; kein Slogan.
  2. Reservieren und Bestellen über GloriaFood (GlfButton), Optik der hc-Elemente unverändert.
  3. Catering-Anfrage über das Formular auf /catering, gestaltet im alten Look (schwarzer Zettel, rote Auswahl, Unterstrich-Felder, roter go-Stempel nach dem Absenden).

- 2026-10-02 (später): Sektionen neu gestaltet, Inhalt unverändert. Mehr Schwarz, Creme nur bei Catering, Rot als eine große Fläche (Reservieren). Titel in Shippori Mincho B1 statt Italiana (Hero-Wortmarke bleibt Italiana). Speisekarten-Block neu als Scroll-Bühne (sticky Foto wechselt mit der Kategorie in der Bildschirmmitte). Dezente Scroll-Momente über `useScrollMotion` (Zeilen, Vorhang, Parallax), abgeschaltet bei reduzierter Bewegung.

## Direction contract

THESIS: Elegante, dunkle Restaurant-Welt im Stil des bestehenden High-Class-Designs; der Nutzer zieht sie jeder hellen Neuinterpretation vor.
OWN-WORLD: Schwarz #11110f, Creme #f2eee5/#e7e0d3, Rot #df1d16; Italiana für Display, DM Sans für Text; feine Linien, kleine gesperrte Labels.
STORY: Hero → Visit-Strip → Willkommen → Vorgeschmack (Tabs, Karten) → Restaurant (Etagen, Firmen, Anreise) → Reservieren → Catering → Newsletter → Kontakt.
FIRST VIEWPORT: Vollbild-Ramenfoto, links „RA’MIEN GO“ groß mit Ortszeile darüber und Speisekarte/Reservieren darunter, 面 als leises Wasserzeichen dahinter.
FORM: Incumbent world (kein neuer Roll); Bestellzettel-Roll 77ab52c4 verworfen.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
