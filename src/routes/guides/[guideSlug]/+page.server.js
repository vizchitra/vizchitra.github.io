import { allGuides } from "content-collections";
import { redirect, error } from "@sveltejs/kit";

export function load({ params }) {
  const { guideSlug } = params;

  const sections = allGuides
    .filter((g) => g.guideId === guideSlug)
    .sort((a, b) => a.order - b.order);

  if (sections.length === 0) {
    throw error(404, `Guide "${guideSlug}" not found`);
  }

  const firstSection = sections[0];
  throw redirect(307, `/guides/${guideSlug}/${firstSection.sectionSlug}`);
}
