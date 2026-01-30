import { error } from '@sveltejs/kit';
export const prerender = true;
import type { RequestHandler } from './$types';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import cfpRaw from '../../../../../../content/2026/data/cfp.csv?raw';
import cfeRaw from '../../../../../../content/2026/data/cfe_sample.csv?raw';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { CFPProposal, CFEProposal } from '$lib/types/proposals';

// ...

// Fetch fonts using FS to avoid fetch issues during prerender
const fontPath = resolve(process.cwd(), 'static/fonts/IBMPlexSans-Regular.ttf');
const displayFontPath = resolve(process.cwd(), 'static/fonts/Cairo-Bold.ttf');

const fontData = await readFile(fontPath);
const displayFontData = await readFile(displayFontPath);

// Logo
const logoPath = resolve(process.cwd(), 'src/lib/assets/images/logos/vizchitra-logo-small.png');
const logoBuffer = await readFile(logoPath);
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;


// Initialize WASM
let initialized = false;
const initResvg = async () => {
  if (initialized) return;
  const require = createRequire(import.meta.url);
  try {
    const wasmPath = require.resolve('@resvg/resvg-wasm/index_bg.wasm');
    const wasmBuffer = await readFile(wasmPath);
    await initWasm(wasmBuffer);
    initialized = true;
  } catch (e) {
    console.error('Failed to initialize resvg-wasm', e);
  }
};

// Define entries for prerendering
export const entries = async () => {
  const cfpProposals = parseCFPProposals(cfpRaw);
  const cfeProposals = parseCFEProposals(cfeRaw);
  const proposals = [...cfpProposals, ...cfeProposals];
  return proposals.map((p) => ({ id: p.slug }));
};

// Helper to get color code
function getColor(proposal: CFPProposal | CFEProposal) {
  if (proposal.type === 'cfp') {
    const cfpProposal = proposal as CFPProposal;
    switch (cfpProposal.proposalType) {
      case 'Talks':
        return '#3b82f6'; // Viz Blue
      case 'Dialogues':
        return '#14b8a6'; // Viz Teal
      case 'Workshop':
        return '#ec4899'; // Viz Pink
      default:
        return '#4c4c4c';
    }
  }
  return '#f97316'; // Viz Orange for Exhibition
}

export const GET: RequestHandler = async ({ params, fetch }) => {
  await initResvg();
  const cfpProposals = parseCFPProposals(cfpRaw);
  const cfeProposals = parseCFEProposals(cfeRaw);
  const proposals = [...cfpProposals, ...cfeProposals];

  const proposal = proposals.find((p) => p.slug === params.id);

  if (!proposal) {
    throw error(404, 'Proposal not found');
  }

  const isCFP = proposal.type === 'cfp';
  const title = isCFP
    ? (proposal as CFPProposal).title
    : (proposal as CFEProposal).projectTitle;
  const typeName = isCFP ? (proposal as CFPProposal).proposalType : 'Exhibition';
  const theme = isCFP ? (proposal as CFPProposal).theme : '';
  const author = proposal.firstName;
  const organization = proposal.organisation;


  const height = 630;
  const width = 1200;
  const accentColor = getColor(proposal);

  const markup = html(`
		<div
			style="
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
                background-color: #ffffff;
                border: 24px solid ${accentColor};
                padding: 40px;
                justify-content: space-between;
                position: relative;
                font-family: 'IBM Plex Sans', sans-serif;
                background-image: radial-gradient(circle at 100% 0%, ${accentColor}20 0%, transparent 25%), radial-gradient(circle at 0% 100%, ${accentColor}10 0%, transparent 20%);
            "
		>
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
                <div style="display: flex; align-items: center; gap: 12px;">
                     <div style="
                        background-color: ${accentColor};
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-size: 24px;
                        font-weight: 600;
                     ">${typeName}</div>
                     ${theme ? `<div style="
                        color: #666;
                        font-size: 24px;
                        border: 1px solid #ddd;
                         padding: 7px 16px;
                         border-radius: 20px;
                     ">${theme}</div>` : ''}
                </div>
            </div>

            <!-- Absolute Logo -->
            <img src="${logoBase64}" style="position: absolute; bottom: 30px; right: 40px; height: 100px; object-fit: contain;" />

			<div style="display: flex; flex-direction: column; justify-content: center; flex-grow: 1; padding-bottom: 40px;">
				<h1
					style="
                        font-size: 72px;
                        font-family: 'Cairo', sans-serif;
                        font-weight: 700;
                        line-height: 1.1;
                        color: #1a1a1a;
                        margin: 0;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    "
				>
					${title}
				</h1>
			</div>

			<div style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid ${accentColor}40; padding-top: 30px;">
				<div style="font-size: 36px; font-weight: 600; color: ${accentColor};">
					${author}
				</div>
                ${organization ? `<div style="font-size: 24px; color: #666;">${organization}</div>` : ''}
			</div>
		</div>
	`);

  const svg = await satori(markup as any, {
    width,
    height,
    fonts: [
      {
        name: 'IBM Plex Sans',
        data: fontData,
        weight: 400,
        style: 'normal'
      },
      {
        name: 'Cairo',
        data: displayFontData,
        weight: 700,
        style: 'normal'
      }
    ]
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width }
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer as any, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache, no-store' // Disable cache for debugging
    }
  });
};
