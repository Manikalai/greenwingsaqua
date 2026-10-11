import { useMemo, useState } from 'react';
import { MessageCircle, Search, X } from 'lucide-react';

// The only interactive part of the products page. Images arrive already
// optimised by Astro, as plain src/srcset strings.

export type CatalogImage = { src: string; srcset: string; width: number; height: number };
export type CatalogProduct = {
  id: string; brand: string; name: string; description: string; alt: string;
  tags: string[]; highlights: string[];
  image: CatalogImage; variants: { label: string; image: CatalogImage }[];
};

const WA = (text: string, number: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

function Card({ p, waNumber }: { p: CatalogProduct; waNumber: string }) {
  const [v, setV] = useState(0);
  const img = p.variants.length ? p.variants[v].image : p.image;
  return (
    <article className="card group flex flex-col !p-0 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-50 to-aqua-50">
        <img src={img.src} srcSet={img.srcset} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          width={img.width} height={img.height} alt={p.variants.length ? `${p.alt} — ${p.variants[v].label}` : p.alt}
          loading="lazy" decoding="async"
          className="size-full object-contain p-6 transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-700 shadow-sm">{p.brand}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{p.name}</h3>
        <p className="mt-1.5 text-sm text-ink-600">{p.description}</p>
        {(p.tags.length > 0 || p.highlights.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t) => <span key={t} className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">{t}</span>)}
            {p.highlights.map((h) => <span key={h} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-ink-600">{h}</span>)}
          </div>
        )}
        {p.variants.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-ink-500">Finish: <b className="text-ink-800">{p.variants[v].label}</b></div>
            <div className="mt-2 flex gap-2">
              {p.variants.map((x, i) => (
                <button key={x.label} type="button" onClick={() => setV(i)} aria-label={`Show ${x.label} finish`} aria-pressed={i === v}
                  className={`size-11 overflow-hidden rounded-xl border-2 bg-white transition ${i === v ? 'border-brand-500' : 'border-transparent ring-1 ring-slate-200 hover:ring-brand-300'}`}>
                  <img src={x.image.src} alt="" className="size-full object-contain" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex-1" />
        <a href={WA(`Hi, I'm interested in the ${p.brand} ${p.name} purifier`, waNumber)} target="_blank" rel="noopener"
          className="btn-whatsapp mt-5 w-full !px-3 !py-2.5 text-sm">
          <MessageCircle className="size-4" />Enquire on WhatsApp
        </a>
      </div>
    </article>
  );
}

export default function ProductCatalog({ products, techs, waNumber }:
  { products: CatalogProduct[]; techs: string[]; waNumber: string }) {
  const [tech, setTech] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products.filter((p) => (!tech || p.tags.includes(tech))
      && (!t || `${p.brand} ${p.name} ${p.description}`.toLowerCase().includes(t)));
  }, [products, tech, q]);

  const chip = (label: string, value: string | null, count: number) => (
    <button key={label} type="button" onClick={() => setTech(value)} aria-pressed={tech === value}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${tech === value
        ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20'
        : 'border-slate-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700'}`}>
      {label}<span className={`text-xs ${tech === value ? 'text-brand-100' : 'text-ink-500'}`}>{count}</span>
    </button>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {chip('All', null, products.length)}
          {techs.map((t) => chip(t, t, products.filter((p) => p.tags.includes(t)).length))}
        </div>
        <label className="relative w-full lg:w-72">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand or model…"
            className="h-11 w-full rounded-full border border-slate-200 bg-white pl-11 pr-10 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100" />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-ink-500 hover:bg-slate-100">
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>

      <p className="mt-6 text-sm text-ink-500">Showing {shown.length} of {products.length} purifiers{tech ? ` with ${tech}` : ''}</p>
      {shown.length ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p) => <Card key={p.id} p={p} waNumber={waNumber} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 p-12 text-center text-ink-600">
          No purifier matches that. <button type="button" className="font-semibold text-brand-600 underline" onClick={() => { setTech(null); setQ(''); }}>Show all</button>
        </div>
      )}
    </div>
  );
}
