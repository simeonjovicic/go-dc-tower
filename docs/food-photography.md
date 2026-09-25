# Food photography refresh

Created with the built-in Imagegen tool (not the CLI), editing the restaurant's existing photographs. Original files remain in `next-app/public/foto/gericht/`.

## Output and use

31 enhanced images are saved in `next-app/public/foto/gericht-enhanced/` as 1000 × 1000 WebP files (quality 85). Matching 400 × 400 WebP thumbnails (quality 82) are in its `thumbs/` subdirectory. The shared menu data uses the large images; MenuExplorer uses the thumbnails. Both sizes were exported directly from the generated PNGs using cwebp, with no further image retouching.

The intended edit is a walnut tabletop background with restrained lighting/color enhancement. Food, portion, arrangement and blue/white tableware were constrained to the originals and visually compared. These are generative edits, not pixel-identical food cutouts.

## Final prompts

### First image / series style reference: misosuppe

```text
Use case: precise-object-edit.
Asset type: an existing restaurant menu food photo, modest premium photographic enhancement.
Input image 1 is the exact edit target, a bowl of miso soup. Replace only the blank white surrounding table/background with a refined dark warm walnut restaurant tabletop, subtle fine natural grain, no rustic planks.
Preserve the actual soup ingredients, exact portions, arrangement, broth, bowl silhouette, and blue ceramic rim design as closely as possible. This is the restaurant's real dish and must remain recognizable; do not invent a better or different dish.
Keep the same near-overhead camera angle, with the whole bowl centered and fully visible, including rim. Produce a square composition with the bowl approximately 75 percent of image width and breathing room on all sides.
Use soft warm natural light from upper left, believable soft contact shadow, gently improved clarity and appetizing but realistic color. Elegant restrained restaurant editorial photography, not dramatic artificial gloss.
No added food, garnish, utensils, napkins, props, steam, hands, text, logos, or borders. Change only background and gentle photographic lighting/color.
```

### Remaining 30 images

Image 1 was each matching original file. Image 2 was the first enhanced misosuppe image, used only for background and lighting.

```text
Use case: precise-object-edit.
Asset type: photo for a premium restaurant's real menu.
Input image 1 is the exact food-photo EDIT TARGET. Input image 2 is ONLY the approved background and lighting STYLE reference. Never transfer the soup, bowl or ingredients from image 2.
Replace only the blank white surrounding background of image 1 with the same warm dark walnut restaurant tabletop as image 2, refined subtle grain.
Preserve image 1's exact dish, food ingredients and quantities, food arrangement, sauces, garnish, and original blue-and-white ceramic plate or bowl pattern and silhouette. Preserve baskets if present. Do not re-plate or invent food.
Retain the source overhead angle and orientation. Square composition, complete plate centered and fully visible with comfortable margins, approximately 75 percent of frame width.
Match the soft warm natural lighting, realistic contact shadows and restrained photographic enhancement of image 2. Gently improve clarity and natural food color only. Keep real food textures.
No added utensils, props, side dishes, extra garnish, napkins, fake steam, text, logos, borders, or hands. Output one single finished menu photograph.
Target dish filename: {filename_without_extension}.
```

Additional constraint for `kokos-curry`:

> Keep the plain smooth orange coconut curry surface with NO garnish, ingredients or noodles added.

Additional constraint for `mochi` and `eis-mochi`:

> Keep just ONE mochi, same exact original shape and color, uncut, no fillings exposed, no new decorations.

## Files

Each listed filename exists in both the output directory and `thumbs/`, and maps to the same filename in the original directory.

- `misosuppe.webp`
- `wantansuppe.webp`
- `edamame.webp`
- `wakame.webp`
- `fruehlingsrollen.webp`
- `chaoshou.webp`
- `tuna-tataki.webp`
- `chicken-tempura.webp`
- `garnelen-tempura.webp`
- `xiao-long-bao.webp`
- `gebackene-wantan.webp`
- `gruener-salat.webp`
- `lamien-rind.webp`
- `udon-meeresfruechte.webp`
- `wantansuppe-ente.webp`
- `kokos-curry.webp`
- `wok-nudeln-rind.webp`
- `eierreis-rind.webp`
- `chili-rind.webp`
- `bulgogi-rind.webp`
- `knusprige-ente.webp`
- `lachs-gegrillt.webp`
- `mapo-tofu.webp`
- `poke-lachs.webp`
- `poke-maguro.webp`
- `poke-shrimps.webp`
- `poke-tofu.webp`
- `poke-crispy-chicken.webp`
- `hong-tang-ci-ba.webp`
- `mochi.webp`
- `eis-mochi.webp`

