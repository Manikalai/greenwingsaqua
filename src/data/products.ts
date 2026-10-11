import type { ImageMetadata } from 'astro';
import genmaxDolphine from '@/assets/products/genmax-dolphine.jpg';
import prolifeViber from '@/assets/products/prolife-viber-copper.jpg';
import prolifeFiesta from '@/assets/products/prolife-fiesta-copper.jpg';
import blueshellDolphin from '@/assets/products/blueshell-dolphin-plus.jpg';
import nileN301 from '@/assets/products/nile-aqua-nine-n301.jpg';
import nileN302 from '@/assets/products/nile-aqua-nine-n302.jpg';
import nileN902 from '@/assets/products/nile-aqua-nine-n902.jpg';
import nileN901 from '@/assets/products/nile-aqua-nine-n901.jpg';
import purosisFinpure from '@/assets/products/purosis-finpure.jpg';
import purosisLifestyle from '@/assets/products/purosis-lifestyle.jpg';
import neptuneMetallic from '@/assets/products/neptune-metallic.jpg';
import emeraldRo from '@/assets/products/emerald-ro.jpg';
import gplusDigiplus from '@/assets/products/gplus-series-digiplus.jpg';
import nileMars from '@/assets/products/nile-aqua-mars.jpg';
import aquawide from '@/assets/products/aquawide-copper-filter.jpg';
import bluelife from '@/assets/products/bluelife-hygieneplus.jpg';
import aquaPluto from '@/assets/products/aqua-pluto.jpg';
import applePureX from '@/assets/products/apple-pure-x.jpg';
import aquaXl from '@/assets/products/aqua-xl.jpg';
import sonnet from '@/assets/products/sonnet-ro.jpg';

// Wording is the catalogue's own; tags only drive the filter chips. A tag is set
// only where the product's own description names that technology.
export type Tech = 'RO' | 'UV' | 'UF' | 'Copper' | 'Alkaline' | 'Digital';
export const TECHS: Tech[] = ['RO', 'UV', 'UF', 'Copper', 'Alkaline', 'Digital'];

export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  image: ImageMetadata;
  alt: string;
  tags: Tech[];
  highlights?: string[];
  variants?: { image: ImageMetadata; label: string }[];
}

export const PRODUCTS: Product[] = [
  { id: 'genmax-dolphine', brand: 'GenMax Aqua', name: 'Dolphine', image: genmaxDolphine,
    alt: 'GenMax Aqua Dolphine reverse osmosis system',
    description: '5-stage Reverse Osmosis System — compact wall-mount design.',
    tags: ['RO'], highlights: ['5-stage', 'Wall-mount'] },
  { id: 'prolife-viber-copper', brand: 'Prolife', name: 'Viber Copper', image: prolifeViber,
    alt: 'Prolife Viber Copper water purifier',
    description: 'RO + UV with Copper Mineral technology — works up to 2000 PPM TDS.',
    tags: ['RO', 'UV', 'Copper'], highlights: ['Up to 2000 PPM TDS'] },
  { id: 'prolife-fiesta-copper', brand: 'Prolife', name: 'Fiesta Copper', image: prolifeFiesta,
    alt: 'Prolife Fiesta Copper water purifier',
    description: 'Copper Charge technology with self-suction pump and large water storage.',
    tags: ['Copper'], highlights: ['Self-suction pump', 'Large storage'] },
  { id: 'blueshell-dolphin-plus', brand: 'Blueshell', name: 'Dolphin+', image: blueshellDolphin,
    alt: 'Blueshell Dolphin+ smart RO water purifier',
    description: 'Smart Reverse Osmosis — 5-stage filtration, 9L storage, 18L/hr capacity.',
    tags: ['RO'], highlights: ['9L storage', '18L/hr'] },
  { id: 'nile-aqua-nine', brand: 'Nile', name: 'Aqua Nine', image: nileN301,
    alt: 'Nile Aqua Nine water purifier',
    description: 'Modern design with digital display and 10L large storage tank — available in multiple finishes.',
    tags: ['Digital'], highlights: ['10L tank', '4 finishes'],
    variants: [
      { image: nileN301, label: 'White' },
      { image: nileN302, label: 'White leaf' },
      { image: nileN902, label: 'Black gold' },
      { image: nileN901, label: 'Black mandala' },
    ] },
  { id: 'purosis-finpure', brand: 'Purosis', name: 'Finpure', image: purosisFinpure,
    alt: 'Finpure by Purosis water purifier',
    description: 'RO + Alkaline + UV with TDS control.',
    tags: ['RO', 'UV', 'Alkaline'], highlights: ['TDS control'] },
  { id: 'purosis-lifestyle', brand: 'Purosis', name: 'Redefining Purity', image: purosisLifestyle,
    alt: 'Purosis water purifier',
    description: 'Compact RO water purification unit.',
    tags: ['RO'], highlights: ['Compact'] },
  { id: 'neptune-metallic', brand: 'Neptune', name: 'Metallic Series', image: neptuneMetallic,
    alt: 'Neptune Metallic water purifier',
    description: 'Multi-stage water purification system with a metallic finish tank.',
    tags: [], highlights: ['Metallic finish'] },
  { id: 'emerald-ro', brand: 'Emerald', name: 'Reverse Osmosis System', image: emeraldRo,
    alt: 'Emerald Reverse Osmosis water purifier',
    description: '100% pure water technology, ISO 9001:2008 certified manufacturing.',
    tags: ['RO'], highlights: ['ISO 9001:2008'] },
  { id: 'gplus-digiplus', brand: 'G+ Series', name: 'DigiPlus', image: gplusDigiplus,
    alt: 'G+ Series DigiPlus water purifier',
    description: '7-stage purification with Copper + Zinc + Alkaline and a smart digital display.',
    tags: ['Copper', 'Alkaline', 'Digital'], highlights: ['7-stage'] },
  { id: 'nile-aqua-mars', brand: 'Nile', name: 'Aqua Mars', image: nileMars,
    alt: 'Nile Aqua Mars water purifier',
    description: 'Modern design Reverse Osmosis system with a 9L detachable tank.',
    tags: ['RO'], highlights: ['9L detachable tank'] },
  { id: 'aquawide', brand: 'Aqua Wide', name: 'Safe & Healthy', image: aquawide,
    alt: 'Aqua Wide water purifier with copper filter',
    description: 'Available with an optional Copper Filter cartridge (Japanese technology).',
    tags: ['Copper'], highlights: ['Optional copper filter'] },
  { id: 'bluelife-hygieneplus', brand: 'BlueLife', name: 'HygienePlus', image: bluelife,
    alt: 'BlueLife HygienePlus water purifier',
    description: 'Stainless steel body — "Purity Uncompromised."',
    tags: [], highlights: ['Stainless steel'] },
  { id: 'aqua-pluto', brand: 'Aqua Pluto', name: 'Water Purification', image: aquaPluto,
    alt: 'Aqua Pluto water purifier',
    description: 'Removes hardness and improves taste — unbreakable, dust and insect-proof body.',
    tags: [], highlights: ['Unbreakable body'] },
  { id: 'apple-pure-x', brand: 'Apple Water Purifier', name: 'Pure-X', image: applePureX,
    alt: 'Apple Water Purifier Pure-X',
    description: 'RO + UV + UF + TDS + Alkaline + Mineral — "Pure n Fresh."',
    tags: ['RO', 'UV', 'UF', 'Alkaline'], highlights: ['TDS + Mineral'] },
  { id: 'aqua-xl', brand: 'Aqua XL', name: 'Water Purification System', image: aquaXl,
    alt: 'Aqua XL water purification system',
    description: '7-stage Reverse Osmosis system — "Healthy water for a healthy life."',
    tags: ['RO'], highlights: ['7-stage'] },
  { id: 'sonnet-ro', brand: 'Sonnet', name: 'RO Water Purifier', image: sonnet,
    alt: 'Sonnet RO water purifier',
    description: 'RO + TDS control with large storage capacity.',
    tags: ['RO'], highlights: ['TDS control', 'Large storage'] },
];

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];
export const FEATURED = ['blueshell-dolphin-plus', 'nile-aqua-mars', 'gplus-digiplus', 'aqua-xl'];
