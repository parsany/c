export const ProjectAcademic = [
  {
    id: 3,
    name: "Cat Emotion recognition",
    description:
      "Using CNN, I trained a model to recognize the emotion of cats. Last update Aug 2025, *improved accuracy to 70%* ",
    date: "Aug 21, 2025",
    image: "/projects/cat.webp",
    link: "https://github.com/parsany/CatRecognition",
    video: "/media/cat.webm",
    tag: ["AI"]
  },
  {
    id: 2,
    name: "Conway Invaders",
    description:
      "Space invaders game but the enemies are cellular automata!",
    date: "Aug 24, 2024",
    image: "/projects/cell.webp",
    link: "https://github.com/parsany/Conway-game-of-life-invaders",
    video: "/media/cell.webm",
    tag: ["Programming", "Games"]
  },
  {
    id: 4,
    name: "PID_NN",
    description:
      "PID control for optimization of neural networks.",
    date: "March 27, 2025",
    image: "/projects/PID.webp",
    link: "https://github.com/parsany/PID_NN",
    tag: ["AI"]
  },
  {
    id: 5,
    name: "Library Program QT",
    description:
      "I Hate Calibre's UI and macOS got a pretty nice feel app, so i made this for myself.",
    date: "Feb 14, 2025",
    image: "/projects/QtLib.webp",
    link: "https://github.com/parsany/PyLibrary-QT",
    tag: ["Programming", "Apps"],
  },
  {
    id: 1,
    name: "Anomaly detection for goldmines ",
    description:
      "deep learning models for mineral zone detection (as anomalies) using various Autoencoder architectures.",
    date: "Nov 2, 2025",
    image: "/projects/anomaly.webp",
    link: "https://github.com/parsany/anomaly-VAE",
    tag: ["AI"],
  },
  {
    id: 6,
    name: "Simple Interpreter with Flex & Bison",
    description:
      "project i did for university class",
    date: "Sep 2, 2025",
    image: "/projects/flex.webp",
    link: "https://github.com/parsany/InterpreterFlexBison",
    tag: ["Programming"],
  },
];

export const ProjectProfessional = [
  {
    id: 2,
    slug: "charbag",
    name: "Charbag Ceramic Studio",
    description: "Online storefront and order management dashboard for a local ceramics studio.",
    date: "Aug 10, 2025",
    image: "/professional/char/char-landing.webp",
    project_image: [
      "/professional/char/char-landing.webp"
    ],
    tag: ["Next.js", "Tailwind CSS", "PostgreSQL", "Boutique"],
    isactive: true,
    link: "",
    role: "Solo Fullstack Developer",
    timeline: "1 Month",
    highlights: ["Boutique Catalog Showcase", "Interactive Client Hub", "Studio Control Center"],
    text: `# Charbag Ceramic Studio\n\nBuilt solo for a local ceramics studio. The client needed a storefront to show their catalog and a simple admin panel to manage orders and workshop schedules — no bloated CMS, just what they actually needed.\n\n- **Role**: Solo Fullstack Developer\n- **Timeline**: 1 Month\n- **Stack**: Next.js, PostgreSQL`
  },
  {
    id: 8,
    slug: "msk",
    name: "Battery MSK Client Website",
    description: "Client-facing website and internal admin panel with dual-language support and a serial-number warranty validation system.",
    image: "/professional/battery-msk/msk-landing.webp",
    project_image: [
      "/professional/battery-msk/msk-landing.webp",
      "/professional/battery-msk/msk-about.webp",
      "/professional/battery-msk/msk-warranty.webp",
      "/professional/battery-msk/msk-services.webp",
      "/professional/battery-msk/msk-product-id.webp"
    ],
    tag: ["Next.js", "Tailwind CSS", "NestJS", "Turborepo", "PostgreSQL", "dual-Language"],
    isactive: false,
    redirect: "esp",
    link: "",
    text: `# Battery MSK Client Website\n\nThe client-facing side of the Battery ESP monorepo — same codebase, different brand. Built and styled the public storefront and warranty lookup pages. See the ESP project for full technical details.\n\n- **Role**: Frontend Developer\n- **Stack**: Next.js, Tailwind CSS, NestJS (shared backend)`
  },
  {
    id: 7,
    slug: "esp",
    name: "Battery ESP/MSK E-Commerce",
    description: "Full e-commerce platform with dual-language support, warranty lookup by serial number, and an internal admin panel.",
    date: "Jun 15, 2025",
    image: "/professional/battery-esp/esp-landing.webp",
    project_image: [
      "/professional/battery-esp/esp-landing.webp",
      "/professional/battery-esp/esp-product-page.webp",
      "/professional/battery-esp/esp-product-id.webp",
      "/professional/battery-esp/battery-warranty.webp",
      "/professional/battery-esp/battery-dash-products.webp",
      "/professional/battery-esp/battery-dash-perm.webp"
    ],
    tag: ["Turborepo", "Tailwind CSS", "NestJS", "Next.js", "PostgreSQL", "dual-Language"],
    isactive: false,
    redirect: "msk",
    link: "",
    text: `# Battery ESP/MSK E-Commerce\n\nBuilt in 3 weeks with one other developer. A Shopify alternative for two battery brands sharing the same backend. The interesting part was the warranty verification system — customers enter a serial number and the system validates it against a database of generated keys.\n\n- **Role**: Fullstack Developer (team of 2)\n- **Timeline**: 3 Weeks\n- **Stack**: Turborepo monorepo, NestJS, Next.js, PostgreSQL`
  },
  {
    id: 6,
    slug: "atrafian",
    name: "Atrafian Chat & Social Ecosystem",
    description: "Real-time chat app with a native mobile build. WebSockets for messaging, Redis for caching, and a custom radar-based discovery map.",
    date: "Apr 25, 2025",
    image: "/professional/atrafian/atrafian-landing.webp",
    project_image: [
      "/professional/atrafian/atrafian-landing.webp",
      "/professional/atrafian/atrafian-chat.webp",
      "/professional/atrafian/atrafian-mobile-radar.webp",
      "/professional/atrafian/atrafian-story.webp",
      "/professional/atrafian/atrafian-profile.webp",
      "/professional/atrafian/atrafian-dash-main.webp",
      "/professional/atrafian/atrafian-dash-users.webp",
      "/professional/atrafian/atrafian-dash-support.webp",
      "/professional/atrafian/atrafian-dash-access.webp"
    ],
    tag: ["NestJS", "Next.js", "Tailwind CSS", "Turborepo", "Socket.io", "PostgreSQL", "Payment Gateway"],
    isactive: true,
    link: "https://atrafian.ir",
    role: "Solo Fullstack & Mobile Dev",
    timeline: "2 Months",
    highlights: ["Real-time Socket.io Chat", "Radar Navigation & Discovery", "AWS S3/MinIO Integration"],
    text: `# Atrafian Chat & Social Ecosystem\n\nBuilt solo over 2 months, full-time. A social platform with real-time chat (personal, group, and support channels), a Capacitor-based mobile app, and a custom radar map for location-based discovery. Media (voice, images, video) goes through a self-hosted MinIO instance. Redis handles caching and OTP delivery.\n\nThe radar map was the hardest part — it needed to feel smooth on mobile while handling frequent location updates.\n\n- **Role**: Solo Fullstack & Mobile Developer\n- **Stack**: NestJS, Next.js, Socket.io, Redis, PostgreSQL, Turborepo`
  },
  {
    id: 1,
    slug: "himheh",
    name: "Himheh Publishing",
    description: "Book store and publishing platform. Users can browse, purchase, and track orders. Authors get a dashboard to upload and manage titles.",
    date: "Feb 20, 2025",
    image: "/professional/himeh/himeh-landing.webp",
    project_image: [
      "/professional/himeh/himeh-landing.webp",
      "/professional/himeh/himeh-products.webp",
      "/professional/himeh/himeh-product-id.webp",
      "/professional/himeh/himeh-checkout.webp"
    ],
    tag: ["Next.js", "Tailwind CSS", "tRPC", "Payment Gateway", "PostgreSQL"],
    isactive: true,
    link: "",
    role: "Solo Fullstack Developer",
    timeline: "2 Months",
    highlights: ["Book Catalog Search Index", "tRPC Type-Safe API", "Integrated Payment Gateway"],
    text: `# Himheh Book Publishing Platform\n\nBuilt solo over 2 months. A complete book store — authors upload titles through an admin dashboard, customers browse, add to cart, and check out via a local payment gateway. OTP-based auth instead of passwords.\n\n- **Role**: Solo Fullstack Developer\n- **Timeline**: 2 Months\n- **Stack**: Next.js, tRPC, PostgreSQL, Prisma`
  },
  {
    id: 5,
    slug: "goldenbat",
    name: "Goldenbat GPS Tracking",
    description: "Live vehicle tracking dashboard. Ingests GPS coordinates from IoT hardware and shows real-time routes on a map.",
    date: "Dec 05, 2024",
    image: "/professional/goldenbat/goldenbat-landing.webp",
    project_image: [
      "/professional/goldenbat/goldenbat-landing.webp",
      "/professional/goldenbat/goldenbat-application.webp",
      "/professional/goldenbat/goldenbat-sup.webp"
    ],
    tag: ["Next.js", "Tailwind CSS", "tRPC", "GPS", "PostgreSQL"],
    isactive: false,
    link: "http://app.goldengps.ir",
    text: `# Goldenbat GPS Tracking\n\nTeam project. I handled the backend and admin dashboard; a teammate built the mobile app. IoT GPS devices stream coordinates to the server, the dashboard plots live vehicle positions and paths on a map. Fleet operators use it to manage groups and device assignments.\n\n- **Role**: Backend & Dashboard Developer\n- **Timeline**: 2 weeks (landing) + 1.5 months (backend & admin panel)\n- **Stack**: Next.js, tRPC, PostgreSQL`
  },
  {
    id: 3,
    slug: "taxiland",
    name: "Taxiland Ride-Sharing Platform",
    description: "Intercity ride-sharing platform. Built the web admin panel that dispatch operators use for driver assignment and support tickets.",
    date: "Oct 12, 2024",
    image: "/professional/taxiland/taxiland-app.webp",
    project_image: [
      "/professional/taxiland/taxiland-app.webp",
      "/professional/taxiland/taxiland-dash-admin.webp",
      "/professional/taxiland/taxiland-dash-drivers.webp",
      "/professional/taxiland/taxiland-dash-addtrip.webp",
      "/professional/taxiland/taxiland-dash-tickets.webp",
      "/professional/taxiland/taxiland-app-wallet.webp"
    ],
    tag: ["Next.js", "tRPC", "Turborepo", "Tailwind CSS", "PostgreSQL"],
    isactive: false,
    link: "",
    text: `# Taxiland Ride-Sharing Platform\n\nTeam collaboration. Intercity ride-sharing — passengers book trips, drivers pick them up. I built the dispatch admin panel: operators can assign drivers manually or let the system do it automatically, and handle support tickets. Site is currently down, screenshots are from when it was live.\n\n- **Role**: Fullstack Developer (team project)\n- **Timeline**: 4 Months\n- **Stack**: Next.js, tRPC, PostgreSQL, Turborepo`
  },
  {
    id: 4,
    slug: "alzahra",
    name: "Alzahra Gold Wholesaler B2B Platform",
    description: "Frontend B2B panel for a gold wholesaler, integrated with a Django REST API for transaction management.",
    date: "Aug 15, 2024",
    image: "/professional/alzahra/alzahra-landing.webp",
    project_image: [
      "/professional/alzahra/alzahra-landing.webp",
      "/professional/alzahra/alzahra-about.webp",
      "/professional/alzahra/alzahra-helper.webp"
    ],
    tag: ["Next.js", "Tailwind CSS", "B2B", "PostgreSQL"],
    isactive: false,
    link: "http://app.alzahragold.com/",
    text: `# Alzahra Gold Wholesaler B2B Platform\n\nFrontend only — a B2B panel for gold wholesale buyers. I built the landing page and customer dashboard in a week; the Django backend was handled by the rest of the team. Customers log in to see pricing, place orders, and track transactions.\n\n- **Role**: Frontend Developer\n- **Timeline**: 1 Week\n- **Stack**: Next.js, Tailwind CSS (backend: Django REST, not mine)`
  }
];

export const ProSkills = [
  {
    category: "Web Development",
    items: [
      { name: "React & Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Node.js & Express", level: 80 },
      { name: "PostgreSQLQL & Prisma", level: 75 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redis", level: 70 },
      { name: "NestJS", level: 75 },
      { name: "RPC", level: 70 },
      { name: "Celery", level: 70 },
    ],
  },
  {
    category: "AI & Data Science",
    items: [
      { name: "PyTorch", level: 80 },
      { name: "NumPy & Pandas", level: 85 },
      { name: "Scikit-learn", level: 75 },
      { name: "OpenCV", level: 70 },
      { name: "Matplotlib", level: 75 },
      { name: "TensorFlow", level: 65 },
      { name: "Jupyter", level: 85 },
      { name: "LangChain", level: 75 },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "Python", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 75 },
      { name: "Bash", level: 65 },
      { name: "Java", level: 60 },
      { name: "HTML5 & CSS3", level: 95 },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Kubernetes", level: 75 },
      { name: "Linux Server", level: 80 },
      { name: "Figma", level: 75 },
      { name: "LaTeX", level: 85 },
      { name: "Unreal Engine", level: 75 },
      { name: "Postman", level: 80 },
    ],
  },
];
