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

  return {
    sections,
    guideTitle: guideSlug.charAt(0).toUpperCase() + guideSlug.slice(1),
    guideSlug,
    guideColor: color,
    document: {
      banner: 'blob',
      color
    }
  };
}
