import { BellRing, CalendarCheck, Filter, ShoppingBag, Wrench, Hammer, type LucideIcon } from 'lucide-react';

// Copy is the existing site's, unchanged.
export const SERVICES: { icon: LucideIcon; title: string; short: string; long: string; waText: string }[] = [
  { icon: ShoppingBag, title: 'Purifier Sales',
    short: 'New RO/UV/UF purifiers for home and office, fitted to your water source and family size.',
    long: 'New RO, UV and UF water purifiers for homes, offices and shops. We help you pick the right model based on your water source (borewell/municipal), TDS level and household size.',
    waText: "Hi, I'd like help choosing a water purifier" },
  { icon: Hammer, title: 'Installation',
    short: 'Professional fitting with pressure and quality checks before we leave.',
    long: 'Wall-mounted or under-sink fitting with proper piping, pressure checks, and a full demo of filter change and maintenance.',
    waText: "Hi, I'd like to book a purifier installation" },
  { icon: Wrench, title: 'Repair & Troubleshooting',
    short: 'Fast diagnosis and repair for leaks, low output, taste/odour issues and more.',
    long: 'Leakage, low water output, unusual taste/smell, motor or pump issues, membrane replacement — same-day visits wherever possible.',
    waText: 'Hi, I need a purifier repair/service visit' },
  { icon: Filter, title: 'Filter & Membrane Replacement',
    short: 'Genuine sediment, carbon, RO membrane and UV lamp replacements.',
    long: 'Genuine sediment, carbon, RO membrane and UV lamp replacements — scheduled on time so water quality never drops.',
    waText: 'Hi, I need a filter / membrane change' },
  { icon: CalendarCheck, title: 'Annual Maintenance Contracts',
    short: 'Scheduled filter changes and check-ups so you never have to remember the date.',
    long: 'Fixed-cost yearly plans covering scheduled visits, parts and priority repair support.',
    waText: "Hi, I'm interested in an AMC plan" },
  { icon: BellRing, title: 'Service Reminders',
    short: 'We track your next service date and remind you on WhatsApp.',
    long: 'We track your next service/filter-change date and remind you automatically on WhatsApp (with SMS as backup) — no need to remember it yourself.',
    waText: "Hi, I'd like service reminders for my purifier" },
];

export const STEPS = [
  { title: 'Choose a plan', text: 'Pick the AMC that fits your purifier and usage.' },
  { title: 'We schedule visits', text: 'Your service dates are logged and tracked for you.' },
  { title: 'You get reminded', text: 'A WhatsApp message (SMS backup) before each due date.' },
  { title: 'Technician visits', text: 'Our team completes the service and updates your record.' },
];
