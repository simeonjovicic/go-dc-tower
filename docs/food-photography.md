# Food photography

The dish photos on the website are the house's Wolt pack shots from 2026 (`Woltbilder_2026/`, 2880 × 1620, white background). Gemini (gemini.google.com, one temporary chat per photo, 2026-11-04/05) replaced only the white background with a dark warm walnut tabletop. The food, portions, arrangement and blue-and-white tableware stay those of the original photo.

Every result was checked side by side against its original before use. Three first attempts were rejected and redone: Chili-Mayo (Gemini put the sauce into the miso soup of the style reference), Tuna-Tataki (zoomed in, plate cut off) and Teriyakisauce (different wood).

Earlier AI edits (`foto/gericht-enhanced/`, built from the older 1100 px Wolt files) are no longer used and have been removed.

## Output and use

- `next-app/public/foto/gericht-echt/<name>.webp`: square 1000 × 1000 crops for /menu. `<name>` is the old menu photo name. The matching new shot was found by comparing the images, not the file names, because several Wolt file names are wrong (for example, the photo labelled "Garnelenrollen" is the one the menu has always shown for Frühlingsrollen).
- `next-app/public/foto/gericht-echt/hoch/<name>.webp`: 3:4 crops for the dish reel on the home page.
- `next-app/public/hero-teller.jpg` and `hero-teller-tall.jpg`: the home page hero. The checked plates were cut out along the plate rim and placed on an empty dark slate table that Gemini generated. The food itself was not regenerated for the hero, only moved and scaled.

The full-size results (2752 × 1536) and the scripts are kept locally in `.gemini-work/`, outside Git.

## Prompt

Image 1 was the original photo, image 2 a walnut style reference.

```text
Edit image 1 only. Image 1 is a real menu photo of a dish from our restaurant. Image 2 is ONLY a reference for the background and lighting style: never copy its bowl, soup or food.
Replace only the plain white / light grey background of image 1 with the same dark warm walnut restaurant tabletop as in image 2 (refined, subtle natural wood grain), with soft warm natural light from the upper left and a realistic soft contact shadow under the plate.
Keep everything else from image 1 exactly as it is: the same dish, every ingredient, the quantities, the arrangement, the sauces and garnish, and the blue-and-white plate, bowl or basket with its exact pattern and shape. Do not re-plate, add, remove or improve any food. Keep the same overhead camera angle, the same framing, the same size and position of the plate, and the same 16:9 landscape format.
No added props, utensils, napkins, steam, hands, text, logos or borders. Output one single finished photo.
```
