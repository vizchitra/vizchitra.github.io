import { allGuides } from "content-collections";
import { error } from "@sveltejs/kit";

const guideColors = {
  talks: 'blue',
  dialogues: 'teal',
  workshops: 'pink',
  exhibition: 'orange',
  panels: 'yellow'
};

export function load({ params }) {
  const { guideSlug } = params;

  const sections = allGuides
    .filter((g) => g.guideId === guideSlug)
    .sort((a, b) => a.order - b.order);

  if (sections.length === 0) {
    throw error(404, `Guide "${guideSlug}" not found`);
  }

  const color = guideColors[guideSlug] || 'blue';
  const guideTitle = guideSlug.charAt(0).toUpperCase() + guideSlug.slice(1);

  return {
    sections,
    guideTitle,
    guideSlug,
    guideColor: color,
    document: {
      banner: 'blob',
      color
    },
    pageMeta: {
      title: `${guideTitle} Guide`,
      ogImage: `https://vizchitra.com/images/preview/preview-guides-${guideSlug}.jpg`
    },
    pageLayout: {
      banner: 'blob',
      color
    }
  };
}
