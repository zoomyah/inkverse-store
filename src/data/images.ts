// ===== Trae text_to_image URL builder =====
// Prompts are vivid and anime/manga-appropriate. Returns landscape 16:9 URLs.

const ENDPOINT = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";

/** Build a Trae text_to_image URL from a prompt. */
export function img(prompt: string): string {
  return `${ENDPOINT}?prompt=${encodeURIComponent(prompt)}&image_size=landscape_16_9`;
}

// ---- Category images ----
export const HERO_IMAGE = img(
  "dramatic anime hero silhouette under neon Tokyo skyline at night, manga ink style, vibrant pink and cyan neon, radial speed lines, cinematic, high contrast, bold"
);

export const CATEGORY_IMAGES = {
  figures: img(
    "detailed anime figure collectible on dark pedestal, dramatic studio lighting, product photography, neon pink rim light, dark background"
  ),
  manga: img(
    "Japanese manga volume cover, bold ink art, dynamic shonen composition, vibrant, dramatic"
  ),
  apparel: img(
    "anime graphic t-shirt flat lay, neon print on black fabric, manga panel design, studio shot"
  ),
  posters: img(
    "anime art poster, vibrant ink illustration, wall mounted, dramatic lighting, neon accents"
  ),
  plushies: img(
    "cute anime plush toy, soft lighting, product shot, pastel neon glow, dark background"
  ),
  accessories: img(
    "anime enamel pin and keychain collection macro, dark background, neon reflections, product photography"
  ),
};
