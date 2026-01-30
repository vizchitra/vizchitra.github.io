import { allGuides } from "content-collections";
import { error } from "@sveltejs/kit";

export function load({ params }) {
  const { guideSlug, sectionSlug } = params;

  // Get all sections for this guide, sorted by order
  const allSections = allGuides
    .filter((g) => g.guideId === guideSlug)
    .sort((a, b) => a.order - b.order);

  // Find current section index
  const currentIndex = allSections.findIndex((s) => s.sectionSlug === sectionSlug);

  if (currentIndex === -1) {
    throw error(404, `Section "${sectionSlug}" not found in guide "${guideSlug}"`);
  }

  const section = allSections[currentIndex];
  const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null;
  const nextSection = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;

  return {
    section,
    prevSection,
    nextSection,
    guideSlug
  };
}
