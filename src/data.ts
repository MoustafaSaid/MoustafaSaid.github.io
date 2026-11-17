export const wabl = {
  name: 'Wabl',
  arabic: 'وبل العقارية',
  site: 'https://wabl.sa',
  image: '/assets/wabl-sa.jpg',
}

export const apps = [
  {
    name: 'Xtreme Store',
    icon: '/assets/xtreme-store.png',
    meta: 'iOS · Shopping',
    desc: 'Store app for a 70+ branch telecom retailer in Kuwait — catalogue, offers and branch services.',
    url: 'https://apps.apple.com/us/app/xtreme-store-app/id6474149541',
  },
  {
    name: 'Zeedly',
    icon: '/assets/zeedly.png',
    meta: 'iOS · Marketplace',
    desc: 'Car marketplace for Kuwait with anonymous bidding and ask prices on vehicles.',
    url: 'https://apps.apple.com/us/app/zeedly/id6472618232',
  },
  {
    name: 'Sabah Al Salem',
    icon: '/assets/sabah-al-salem.png',
    meta: 'iOS · Arabic / English',
    desc: 'Co-op supermarket app: weekly offers, branches, opening hours and shareholder services.',
    url: 'https://apps.apple.com/us/app/%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D8%B5%D8%A8%D8%A7%D8%AD-%D8%A7%D9%84%D8%B3%D8%A7%D9%84%D9%85-%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A9/id6502917258',
  },
]

export const repos = [
  {
    name: 'automated-posting',
    desc: 'One message, five platforms, concurrent delivery with per-platform failure isolation.',
    stack: 'FastAPI · Pydantic',
    url: 'https://github.com/MoustafaSaid/automated-posting',
  },
  {
    name: 'movie_app',
    desc: 'TMDb client with infinite scroll, offline cache and clean data/domain/presentation layers.',
    stack: 'Flutter · Sentry',
    url: 'https://github.com/MoustafaSaid/movie_app',
  },
  {
    name: 'Pet_App',
    desc: 'Test-first Flutter app — BLoC, GetIt, dartz and a TDD loop from the first commit.',
    stack: 'Flutter · TDD',
    url: 'https://github.com/MoustafaSaid/Pet_App',
  },
]

export const stack: { title: string; items: string[] }[] = [
  { title: 'Mobile', items: ['Flutter', 'Dart', 'Swift / SwiftUI', 'Kotlin', 'React Native', 'Expo'] },
  { title: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'Python', 'Zod'] },
  { title: 'Data & platform', items: ['PostgreSQL', 'Drizzle ORM', 'Prisma', 'Redis', 'Notion API', 'Firebase', 'Docker', 'PostHog'] },
]
