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

  // If section is draft, don't send the HTML content
  const isDraft = section.draft || false;
  const sectionData = isDraft
    ? { ...section, html: null }
    : section;

  const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  return {
    section: sectionData,
    prevSection,
    nextSection,
    guideSlug,
    isDraft,
    pageMeta: {
      title: `${section.section} - ${capitalize(guideSlug)} Guide`,
      description: section.description,
      ogImage: `https://vizchitra.com/images/preview/preview-guides-${guideSlug}.jpg`
    }
  };
}
