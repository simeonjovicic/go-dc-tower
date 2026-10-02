---
name: ra'mien go DC Tower
description: Dark, elegant black/cream/red restaurant world for the Asian Fusion kitchen in the DC Tower, Vienna.
colors:
  ink: "#11110f"
  night: "#0d0d0b"
  hero-black: "#0a0806"
  ink-hover: "#30302b"
  cream: "#f2eee5"
  cream-deep: "#e7e0d3"
  ivory: "#fdfbf7"
  go-red: "#df1d16"
  go-red-hover: "#bd1812"
  brick: "#a1372d"
  menu-red: "#b3261c"
  coral-on-ink: "#ee786a"
  muted: "#69645c"
  stone: "#625c52"
  ash-on-ink: "#b7b2a8"
  bone-on-ink: "#cfc8bb"
  second-line: "#a9a296"
  smoke: "#8f8a80"
  stage-dim: "#ffffff38"
  hairline: "rgba(17, 17, 15, .16)"
  hairline-on-ink: "#ffffff30"
  hairline-on-night: "#ffffff1c"
typography:
  wordmark:
    fontFamily: "Italiana, Times New Roman, serif"
    fontSize: "clamp(58px, 6.4vw, 100px)"
    fontWeight: 400
    lineHeight: 1.17
    letterSpacing: ".25em"
  statement:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(46px, 7vw, 112px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-.01em"
  section-title:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(40px, 4.6vw, 72px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.01em"
  stage-row:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(36px, 3.8vw, 60px)"
    fontWeight: 600
    lineHeight: 1.05
  mincho-title:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(24px, 2.2vw, 32px)"
    fontWeight: 600
    lineHeight: 1.15
  figure:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(64px, 7vw, 108px)"
    fontWeight: 800
    lineHeight: 0.9
  display:
    fontFamily: "Italiana, Times New Roman, serif"
    fontSize: "clamp(52px, 6vw, 88px)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Italiana, Times New Roman, serif"
    fontSize: "clamp(38px, 4.3vw, 62px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-.035em"
  title:
    fontFamily: "Italiana, Times New Roman, serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-.02em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.85
  body-small:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: ".12em"
  label-fine:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "9px"
    fontWeight: 400
    letterSpacing: ".14em"
rounded:
  none: "0"
spacing:
  gutter-desktop: "56px"
  gutter-tablet: "32px"
  gutter-mobile: "20px"
  page-max: "1328px"
  grid-gap: "32px"
  section-y: "96px"
  section-y-mobile: "60px"
components:
  button-red:
    backgroundColor: "{colors.go-red}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "17px 22px"
    height: "54px"
  button-red-hover:
    backgroundColor: "{colors.go-red-hover}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "17px 22px"
    height: "54px"
  button-dark-hover:
    backgroundColor: "{colors.ink-hover}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "12px 0 8px"
    height: "44px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 0"
    height: "44px"
  order-slip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 4vw, 52px)"
  tick-box-checked:
    backgroundColor: "{colors.go-red}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    size: "20px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "44px"
  text-link-on-night:
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    height: "44px"
  stage-row:
    backgroundColor: "{colors.night}"
    textColor: "{colors.stage-dim}"
    typography: "{typography.stage-row}"
    padding: "36px 0"
  stage-row-active:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    typography: "{typography.stage-row}"
  reserve-field:
    backgroundColor: "{colors.go-red}"
    textColor: "{colors.ivory}"
    typography: "{typography.statement}"
    padding: "clamp(90px, 11vw, 150px) 0"
---

# Design System: ra'mien go DC Tower

## Overview

**Creative North Star: "The Evening Table"**

The site is a dark, quiet restaurant room. A full-bleed photograph of the restaurant's own ramen on dark wood sets the first viewport. On the home page, everything below the hero is a near-black Night ground. The section titles are set in a weighty Japanese Mincho (Shippori Mincho B1), and each one reveals line by line. Cream appears once, for catering. Red appears as one large reservation field and as single action fills. Every surface has square corners and hairline rules, and no element casts a heavy shadow. The world reads as elegant and evening-lit, never as a bright paper menu.

The user chose this world on 2026-10-02, after rejecting a light paper and porcelain-blue direction ("Der Bestellzettel") as too white and not elegant. That decision is durable. The cream is a warm ground that sits between dark masses. It is never the only colour on a page. On the home page, the cream catering section is the one light field between dark masses. The page opens on the dark hero and closes on the night location block. Subpages end in an ink footer, and the catering page puts its form on an ink slip.

The hero has a single anchor: the uppercase, widely letterspaced Italiana wordmark "RA'MIEN GO". The character 面 sits behind it as a very faint watermark (opacity .08, .09 on mobile) and never overlaps the bowl. A small location line sits above the wordmark and the two actions sit below it. The hero carries no slogan.

**Key Characteristics:**
- Black, cream and red. The night grounds and the photography carry the mood.
- Home-page titles in Shippori Mincho B1, with a muted second line. The hero wordmark and subpage headings stay in Italiana. DM Sans carries text and small letterspaced uppercase labels.
- The menu stage is the signature. A sticky photograph changes with the category nearest the centre of the viewport.
- Square corners everywhere, 1px hairlines and underline links.
- The restaurant's own photography in every image slot.
- Slow, quiet motion on one easing curve: a hero settle, line, fade and curtain reveals, a parallax of at most 40px and a stamp on form success. All of it is off under reduced motion.

## Colors

The palette is warm black, two creams and one brand red, plus a few warm greys tuned for text on each ground.

### Primary
- **Go Red** (go-red): the logo and facade-neon red. It fills the primary button, the one large reservation field on the home page, checked tick boxes, focus outlines and text selection. On subpages, large Italiana italics use it for emphasis. On the home page, it also marks the price of the active stage row and the arrow marks of the order paths. Hover deepens it to Go Red Hover.
- **Brick** (brick) and **Menu Red** (menu-red): darker reds for small red text on cream, such as card labels, the aside `dt` labels and the active menu category. At 9 to 11px, Go Red does not have enough contrast on cream.
- **Coral on Ink** (coral-on-ink): the small red text on dark grounds (the arrival `dt` labels and the location block).

### Neutral
- **Night** (night): the home-page section ground below the hero. The welcome, menu stage, room, newsletter and location sections all use it. Neighbouring night sections are separated by a faint hairline, not by a change of tone.
- **Ink** (ink): the subpage dark mass (the mobile menu panel, the subpage footer and the catering order slip) and the dark button. It is the text colour on cream, and on the red field it colours the second title line.
- **Hero Black** (hero-black): the backdrop behind the hero photograph. The visit strip under the hero is an equivalent near-black (`#0b0b0a`).
- **Cream** (cream): the page ground, the scrolled header (at 96% opacity with blur), inputs on cream and the mobile action bar.
- **Cream Deep** (cream-deep): the second tonal ground on subpages, image placeholders on cream and menu notes.
- **Ivory** (ivory): text and the wordmark on photography, the ink slip and red fills.
- **Muted / Stone** (muted, stone): secondary text and captions on cream.
- **Second Line** (second-line): the muted second line of a two-line Mincho title on night, such as "Ein Stück Asien." It replaces the old red italic phrase.
- **Ash on Ink / Bone on Ink** (ash-on-ink, bone-on-ink): secondary text and lead paragraphs on dark grounds. Bone is the lit text of the active stage row.
- **Smoke** (smoke): the quietest text on night, used for captions, fine labels and dimmed stage descriptions.
- **Stage Dim** (stage-dim): inactive Mincho rows on the menu stage. Only the row nearest the centre of the viewport lights to cream.
- **Hairline / Hairline on Ink / Hairline on Night**: all 1px rules and dividers. On the home page, rows are divided by the faintest of these.

### Named Rules
**The Dark Mass Rule.** Every page carries at least one ink or photographic mass. A page that is all cream and white is off-world. The user rejected that look on 2026-10-02.

**The One Light Field Rule.** On the home page, cream is used only for the catering section. Every other section below the hero is Night.

**The Signal Red Rule.** Red appears as a fill for one primary action per view and as one full-width field at most per page (reservation, on the home page). It also appears as small marks: the active price and the arrows of the order paths. It is never a wash and never body text.

**The No Pure White Ground Rule.** Grounds are cream, cream deep, ink or photography. Pure #fff appears only as text on dark or red.

## Typography

**Title Font (home page):** Shippori Mincho B1, weights 500, 600 and 800 (with Hiragino Mincho ProN, Yu Mincho, serif). It is loaded with `next/font` as `--font-mincho` and `preload: false`, because the font is split into many subset files. The CSS role is `--hx-mincho`.
**Wordmark and Subpage Display Font:** Italiana (with Times New Roman, serif)
**Body Font:** DM Sans (with Arial, sans-serif)

**Character:** Shippori Mincho has the weight and brush-born contrast of Japanese menu lettering. It gives the home-page titles presence without needing colour. Italiana is a thin, high-contrast serif and is kept for the hero wordmark and the subpage heads. DM Sans keeps facts, prices and forms plain and readable.

### Hierarchy
- **Wordmark** (Italiana 400, clamp(58px, 6.4vw, 100px), 1.17, uppercase, letter-spacing .25em; .21em on mobile): the hero only. It is the one anchor of the first viewport.
- **Statement** (Mincho 600): the welcome title, the room title over its photograph and the reservation title. These are the largest titles below the hero.
- **Section Title** (Mincho 600): every other home-page section title, usually two short lines. The second line is set in Second Line grey (on the red field it is Ink). A smaller step (clamp(32px, 3.2vw, 50px)) is used for the newsletter.
- **Stage Row** (Mincho 600): the category names on the menu stage.
- **Mincho Title** (Mincho 600, 22 to 44px): order paths, the company row, the arrival head and catering items. The room intro paragraph is set in Mincho at 18px.
- **Figure** (Mincho 800): the seat counts on the floor cards. This is the only use of the 800 weight.
- **Display** (Italiana 400, clamp(52px, 6vw, 88px), 0.96, -.035em): subpage heads. One italic phrase may turn red (or coral on ink).
- **Headline** (Italiana 400, clamp(38px, 4.3vw, 62px), 1.06): secondary heads on subpages.
- **Title** (Italiana 400, 25 to 36px, about 1.1, -.02em): dish names, card titles, legal subheads and the order-slip legend.
- **Body** (DM Sans 400, 13 to 15px, 1.75 to 1.85): running copy, held to 36 to 62ch.
- **Label** (DM Sans 500 to 600, 9 to 11px, uppercase, .12 to .2em): buttons, navigation, field labels and card labels.

### Named Rules
**The Serif Speaks, Sans Informs Rule.** The serifs (Mincho, Italiana) are used only for titles, figures, the wordmark and one short lead paragraph. They are never used for labels. DM Sans carries every fact, price and form element.

**The Quiet Second Line Rule.** A two-line home-page title stresses its second line by stepping it down to a muted tone, not by turning it red or italic. The title carries no eyebrow label above it.

**The One Wordmark Rule.** The letterspaced uppercase wordmark exists only in the hero. Other headings use normal-case Italiana.

## Layout

Content sits in one centred column: `min(100% - 112px, 1328px)`. Below 1100px it is `100% - 64px`, and below 760px it is `100% - 40px`. Coloured section bands bleed to full width while their content stays in that column. Sections use asymmetric two- and three-column grids (for example 1.2fr / 1fr, or .55fr / 1.25fr / 1fr) with gaps of 32 to 100px. They collapse to one column at 760px. Vertical rhythm is generous. On the home page, section padding is roughly 70 to 210px and is set with clamps (the welcome statement uses the most). Subpages use 80 to 112px on desktop and 60 to 66px on mobile. The home page collapses its grids to one column at 900px.

The home header is fixed. It is transparent white over the hero and turns to blurred cream with a hairline at 76px once the page scrolls. Its navigation is split around a centred logo and becomes a full-screen ink panel below 980px. Subpages use a sticky cream header with the logo on the left and a navigation row. On mobile, a fixed bottom bar offers the two key actions; the red one is the right half.

The hero fills the viewport (100dvh). The wordmark block sits on the left with the bowl photograph on the right. On mobile the copy moves to the top, and 面 moves to the upper right at 68vw.

The menu stage is a two-column grid. The left column holds a sticky photograph (top 104px, height min(100vh - 150px, 720px)). The right column holds an ordered list of rows, each at least 34vh tall, so that one row at a time sits at the centre of the viewport. Below 900px the sticky photograph is hidden. Each row then carries its own 4:3 photograph, and every row is lit.

Breakpoints: 1200px (menu only), 1100px, 980px, 900px (home sections), 760px, 640px, 520px and 380px.

## Elevation & Depth

The system is flat. Depth comes from tonal contrast (cream against ink against red), from photography with dark gradient scrims, and from a fixed fractal-noise grain at 4% opacity, blended with multiply, on the home page. The few shadows are atmospheric, not structural.

### Shadow Vocabulary
- **Wordmark glow** (`text-shadow: 0 2px 40px #0005`): keeps the wordmark legible on the photograph.
- **Mobile action bar** (`box-shadow: 0 -4px 20px #0000000a`): a faint lift for the fixed bottom bar.
- **Title on photograph** (`text-shadow: 0 2px 40px #0006`): the room title set over its photograph. A night scrim at the bottom of the photograph also helps.

### Named Rules
**The Flat Room Rule.** Cards and buttons never cast shadows. Separation comes from a hairline, a tonal ground or an 8px cream-deep frame around an inset photo.

## Shapes

Every corner is square (radius 0). The build forces this onto injected GloriaFood buttons as well (`border-radius: 0 !important; box-shadow: none !important`). Form language is line work: 1px hairlines between list rows, underline links and underline inputs. The only accent stroke is a 2px red left or bottom border marking the current item. Photographs are cropped rectangles with `object-fit: cover` and a slow 1.025 to 1.035 zoom on hover. On the home page they also enter as a curtain: a clip-path wipe upward, while the image settles from scale 1.12.

## Components

### Buttons
- **Shape:** square (0) and at least 54px tall.
- **Red (primary):** a Go Red fill with an ivory uppercase label (10px, 600, .12em). The label and the arrow mark are pushed apart (gap 32px). One per view.
- **Dark:** an Ink fill. Used for the menu-page order action and inside the red reservation field.
- **Hover:** a colour shift only (.25s): red to `#bd1812`, ink to `#30302b`.
- **Text link:** an uppercase label with a 1px currentColor underline, at least 44px tall. Its arrow mark shifts 3px up and right on hover. On night, the link is cream and turns Go Red on hover (10px, 600, .16em).
- **GloriaFood buttons:** reservations and online orders render as `span.glf-button` (role="button", keyboard-operable). They take the class of the surface they sit in (button-red, button-dark, a nav link, a visit-strip cell or a menu card) and look identical to the hc element they replace. The widget script loads on first intent.

### Cards / Containers
- **Corner Style:** square.
- **Background:** none on cream (an image, a small label, an Italiana title, body text and a text link). Menu cards on ink use a 1px hairline grid.
- **Border:** a hairline top rule or a 1px gap grid, never a box outline.
- **Internal Padding:** 26 to 32px where a ground is present.

### Inputs / Fields
- **On ink (catering form):** a transparent field with a 1px `#ffffff40` bottom border and cream text at 15px. The label is 9px, uppercase, .14em. Focus turns the border Go Red. Date and time inputs use `color-scheme: dark`. The textarea is the one boxed field.
- **On cream (menu search):** a 1px ink or `#bcb5a7` box with a square edge. Focus shows a 2px Go Red outline with a 2px offset.
- **On night (newsletter):** a 54px box with a 1px Stage Dim stroke and cream text, next to a red submit. Focus shows the same 2px Go Red outline.
- **Tick:** a 20px square box with a `#ffffff80` stroke. When checked it fills Go Red and shows a white 1.5-stroke SVG check. Each row is separated by a hairline on ink.

### Navigation
The navigation is set in uppercase DM Sans (10px, 500, .16 to .2em). On the home header, hover underlines the link at a 7px offset. The reservation link carries a permanent underline. Subpage links show a red bottom border on hover and on `aria-current`. The mobile panel is an ink full-screen sheet with Italiana links at 32 to 56px separated by hairlines.

### Hero
The hero uses the full-bleed photograph `hero-ramen-dark.jpg` (`-tall.jpg` on mobile). It is brightened slightly (1.12) and settles from scale 1.035 over 2s. Left and top scrims darken it. The faint 面 watermark sits behind the wordmark, and the wordmark rises in over .9s. Below it are one red button (Speisekarte) and one underlined reservation link. A full-width near-black visit strip follows with three hairline-separated facts. Small red arrow marks are the only red in the strip.

### Menu Stage (home-page signature)
This is the home page's signature component. A sticky photograph on the left crossfades to the category whose row is nearest the centre of the viewport. The change is detected by an observer with a -45% top and bottom margin. The incoming photo fades in over .9s and settles from scale 1.06 to 1, and a small caption names the dish. The rows on the right are large Mincho category names, dimmed to Stage Dim, each with its starting price and a short description. The active row lights to cream, its price turns Go Red and its description rises to Bone on Ink. Hover also lights a row. On mobile, each row carries its own curtain-revealed photograph and all rows are lit. Below the stage, three order paths sit in a hairline-topped row (two lunch cards and online ordering), each with a Mincho title, a fine label and a red arrow mark.

### Reservation Field
This is the one large Go Red field on the home page. It holds a two-line statement title (the second line in Ink) and a contact column with a full-width dark GloriaFood button and a phone link.

### Scroll Motion
Scroll motion comes from `useScrollMotion` and uses one easing curve, `cubic-bezier(.16, 1, .3, 1)` (`--hx-ease`). Only elements below the first viewport are hidden, and all content stays visible without JS.
- **Lines** (`data-reveal="lines"`): each title line slides up from 110% inside its own clipping line box over 1.1s, with a 90ms stagger.
- **Fade** (`data-reveal="fade"`): an opacity fade and an 18px rise over 1s.
- **Curtain** (`data-reveal="curtain"`): a `clip-path` wipe over 1.3s while the image settles from scale 1.12. The observer watches the parent element, because a fully clipped element never reports as visible.
- **Parallax** (`data-parallax`): a translate against the scroll, clamped to ±40px, on an image overscanned by 40px top and bottom.
Under `prefers-reduced-motion: reduce`, nothing is hidden, parallax is off and the stage photo swaps without a transition.

### Order Slip (catering inquiry)
The order slip is an ink panel next to a sticky cream aside. Its grid is 4fr / 7fr from 980px up. It holds an Italiana legend, tick rows for the offer, underline fields in two columns from 640px, a consent tick and a red submit button. On success, the panel shows a summary and the go logo is stamped into the top-right corner. The stamp is 92px, rotated -11deg, and arrives via `hcStamp` over .55s (`cubic-bezier(.16, 1, .3, 1)`): it falls from scale 2.4 with blur, overshoots to .94 and lands.

### Subpage Head and Legal Text
`.hc-page-head` holds a display h1 at clamp(52px, 6vw, 88px) and a 52ch stone lede, in the page column with 72px top padding. `.hc-legal-text` is a 760px-max reading column with Italiana 30px subheads and 14px / 1.85 body text. The imprint keeps a hairline definition list (240px term column).

### Menu Explorer (/menu)
The menu page has a sticky 208px category rail with a red left-border active state, and a boxed search field. Dishes sit in a two-column list separated by hairlines, each with a 144px square photo (114px on mobile) and an Italiana 25px name. Tags are small outlined rectangles. On mobile, the rail becomes a four-up chip grid (the active chip is filled ink) and a fixed bottom bar holds a category select and the red order action.

### Icons
Icons are line SVGs on a 24px grid with a 1.5 stroke, round caps and currentColor (`components/Icon.tsx`).

### Imagery
All photographs are the restaurant's own (index: `docs/fotoarchiv.md`). The hero JPGs predate this build. The dish images in `foto/gericht-enhanced/`, which /menu uses, are AI edits that changed only the background to a walnut tabletop. The food, the portions and the blue-and-white tableware were constrained to the originals (prompts and process: `docs/food-photography.md`). The unedited originals stay in `foto/gericht/`. Never present a generated or edited image without that note, and never invent dishes.

## Do's and Don'ts

### Do:
- **Do** keep every page anchored by an ink or photographic mass (the hero, a night section, the ink slip or the ink footer).
- **Do** set home-page section titles in Shippori Mincho B1 600 as short lines that reveal line by line, with the second line in Second Line grey. Keep Italiana for the hero wordmark and the subpage heads.
- **Do** keep home-page sections on Night, with cream only for catering and one red reservation field.
- **Do** drive every scroll movement through `useScrollMotion` with `cubic-bezier(.16, 1, .3, 1)`, keep parallax at or below ±40px, and switch it all off under reduced motion.
- **Do** keep every corner square and every divider a 1px hairline.
- **Do** use small red text in Brick or Menu Red on cream. Go Red is for fills and large display italics.
- **Do** route reservations and orders through `GlfButton`, styled with the class of the hc element it replaces.
- **Do** use 1.5-stroke line SVGs from `Icon.tsx` for any new icon.
- **Do** use only the restaurant's own photography, and label AI-background edits as such.

### Don't:
- **Don't** build light paper, white-dominant or porcelain-blue pages. The user rejected them on 2026-10-02 as not elegant.
- **Don't** add a slogan or a second headline to the hero, and don't let 面 rise above about 9% opacity or overlap the bowl.
- **Don't** round corners, add drop shadows to cards or buttons, or let the GloriaFood widget restyle its buttons.
- **Don't** use Go Red as a background wash beyond one field per page, or as body text.
- **Don't** colour or italicise part of a home-page Mincho title in red. The second line steps down in tone instead.
- **Don't** reuse the letterspaced uppercase wordmark outside the hero.
- **Don't** add new eyebrow labels above headings or new text-glyph arrows (↗). The home page has dropped its eyebrows. Eyebrows remain on the subpages and ↗ arrows remain throughout as incumbent defects, but neither is a pattern for new surfaces.
