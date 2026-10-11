// Every phone number, link and fact shown on the site lives here, so a change is
// made once and every page agrees.

export const SITE = {
  name: 'Green Wings Aqua',
  legalName: 'Green Wings Aqua Sales and Service',
  url: 'https://greenwingsaqua.com',
  email: 'greenwingsaqua@gmail.com',
  call: { display: '94893 53955', e164: '+919489353955' },
  whatsapp: { display: '99445 60234', number: '919944560234' },
  address: {
    street: 'No 110, Venkatachalam Sakundhala Complex, Majeeth Rd, Aranmanai Vaasal',
    lines: ['No 110, Venkatachalam Sakundhala Complex,', 'Majeeth Rd, Aranmanai Vaasal,', 'Sivaganga, Tamil Nadu 630561'],
    city: 'Sivaganga',
    region: 'Tamil Nadu',
    postcode: '630561',
  },
  rating: { value: '4.8', count: 49 },
  social: {
    instagram: 'https://www.instagram.com/greenwingsaqua',
    facebook: 'https://www.facebook.com/share/194A6QHFdb/',
    youtube: 'https://www.youtube.com/@karthickkarthicksandy8659',
  },
  mapEmbed:
    'https://maps.google.com/maps?q=No%20110%2C%20Venkatachalam%20Sakundhala%20Complex%2C%20Majeeth%20Rd%2C%20Aranmanai%20Vaasal%2C%20Sivaganga%2C%20Tamil%20Nadu%20630561&output=embed',
  mapLink:
    'https://www.google.com/maps/search/?api=1&query=Green%20Wings%20Aqua%2C%20Majeeth%20Rd%2C%20Aranmanai%20Vaasal%2C%20Sivaganga',
} as const;

export const telHref = `tel:${SITE.call.e164}`;
export const waHref = (text?: string) =>
  `https://wa.me/${SITE.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/products.html', label: 'Products' },
  { href: '/services.html', label: 'Services' },
  { href: '/amc.html', label: 'AMC Plans' },
  { href: '/contact.html', label: 'Contact' },
] as const;

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.legalName,
  image: `${SITE.url}/assets/og-image.jpg`,
  logo: `${SITE.url}/assets/logo.png`,
  url: `${SITE.url}/`,
  sameAs: Object.values(SITE.social),
  telephone: SITE.call.e164,
  email: SITE.email,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postcode,
    addressCountry: 'IN',
  },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: SITE.rating.value, reviewCount: String(SITE.rating.count) },
  areaServed: 'Sivagangai district, Tamil Nadu',
};
