export const ProjectAcademic = [
    {
        id: 5,
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
        id: 4,
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
        id: 3,
        name: "PID_NN",
        description:
            "PID control for optimization of neural networks.",
        date: "March 27, 2025",
        image: "/projects/PID.webp",
        link: "https://github.com/parsany/PID_NN",
        tag: ["AI"]
    },
    {
        id: 2,
        name: "Library Program QT",
        description:
            "I Hate Calibre's UI and macOS got a pretty nice feel app, so i made this for myself.",
        date: "Feb 14, 2025",
        image: "/projects/QtLib.webp",
        link: "https://github.com/parsany/PyLibrary-QT",
        tag: ["Programming", "Apps"],
    },
    {
        id: 6,
        name: "Anomaly detection for goldmines ",
        description:
            "deep learning models for mineral zone detection (as anomalies) using various Autoencoder architectures.",
        date: "Nov 2, 2025",
        image: "/projects/anomaly.webp",
        link: "https://github.com/parsany/anomaly-VAE",
        tag: ["AI"],
    },
    {
        id: 1,
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
        date: "Apr 2025",
        image: "/professional/char/char-landing.webp",
        project_image: [
            "/professional/char/char-landing.webp"
        ],
        tag: ["Next.js", "Tailwind CSS", "PostgreSQL", "Boutique"],
        isactive: true,
        link: "",
        links: [],
        highlights: ["Boutique Catalog Showcase", "Interactive Client Hub", "Studio Control Center"],
        text: `# Charbag Ceramic Studio\n\nBuilt in 1 month for a local ceramics studio. The client needed a storefront to show their catalog and a simple admin panel to manage orders and workshop schedules — no bloated CMS, just what they actually needed.\n\n- **Role**: Solo Fullstack Developer\n- **Timeline**: Apr 2025\n- **Stack**: Next.js, PostgreSQL`
    },
    {
        id: 8,
        slug: "msk",
        name: "Battery MSK Client Website",
        description: "Client-facing website and internal admin panel with dual-language support and a serial-number warranty validation system.",
        date: "Dec 2025 – June 2026",
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
        link: "https://mkweb.parsany.com/en/landing",
        links: [
            { label: "Website", url: "https://mkweb.parsany.com/en/landing" }
        ],
        role: "Frontend Developer (team)",
        text: `# Battery MSK Client Website\n\nBuilt over 2 months (shared development cycle with ESP). The client-facing side of the Battery ESP monorepo — same codebase, different brand. Built and styled the public storefront and warranty lookup pages. See the ESP project for full technical details.\n\n- **Role**: Frontend Developer (team)\n- **Timeline**: Dec 2025 – June 2026\n- **Stack**: Next.js, Tailwind CSS, NestJS (shared backend)`
    },
    {
        id: 7,
        slug: "esp",
        name: "Battery ESP/MSK E-Commerce",
        description: "Full e-commerce platform with dual-language support, warranty lookup by serial number, and an internal admin panel.",
        date: "Dec 2025 – June 2026",
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
        link: "https://epweb.parsany.com/",
        links: [
            { label: "Website", url: "https://epweb.parsany.com/" },
            { label: "Dashboard", url: "https://edash.parsany.com/" }
        ],
        role: "Fullstack Developer (team)",
        text: `# Battery ESP/MSK E-Commerce\n\nBuilt over 2 months. An e-commerce website for two battery brands sharing the same backend. The interesting part was the warranty verification system — customers enter a serial number and the system validates it against a database of generated keys.\n\n- **Role**: Fullstack Developer (team)\n- **Timeline**: Dec 2025 – June 2026\n- **Stack**: Turborepo monorepo, NestJS, Next.js, PostgreSQL`
    },
    {
        id: 6,
        slug: "atrafian",
        name: "Atrafian Chat & Social Ecosystem",
        description: "Real-time chat app with a native mobile build. WebSockets for messaging, Redis for caching, and a custom radar-based discovery map.",
        date: "Jan 2026 – Mar 2026",
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
        links: [
            { label: "Live Site", url: "https://atrafian.ir" },
            { label: "Mobile Demo", url: "https://github.com/quantinity/Atrafian-App-Demo" }
        ],
        role: "Solo Fullstack Developer",
        highlights: ["Real-time Socket.io Chat", "Radar Navigation & Discovery", "AWS S3/MinIO Integration"],
        text: `# Atrafian Chat & Social Ecosystem\n\nBuilt over 3 months, full-time. A social platform with real-time chat (personal, group, and support channels), a Capacitor-based mobile app, and a custom radar map for location-based discovery. Media (voice, images, video) goes through a self-hosted MinIO instance. Redis handles caching and OTP delivery.\n\nThe radar map was the hardest part — it needed to feel smooth on mobile while handling frequent location updates, still due to client's contraint instead of using React Native we settled for Capacitor.JS.\n\n- **Role**: Solo Fullstack & Mobile Developer\n- **Timeline**: Jan 2026 – Mar 2026\n- **Stack**: NestJS, Next.js, Socket.io, Redis, PostgreSQL, Turborepo`
    },
    {
        id: 3,
        slug: "himheh",
        name: "Himeh Publishing",
        description: "Book store and publishing platform. Users can browse, purchase, and track orders. Authors get a dashboard to upload and manage titles.",
        date: "Feb 2025 – Mar 2025",
        image: "/professional/himeh/himeh-landing.webp",
        project_image: [
            "/professional/himeh/himeh-landing.webp",
            "/professional/himeh/himeh-products.webp",
            "/professional/himeh/himeh-product-id.webp",
            "/professional/himeh/himeh-checkout.webp"
        ],
        tag: ["Next.js", "Tailwind CSS", "tRPC", "Payment Gateway", "PostgreSQL"],
        isactive: true,
        link: "https://himeh.parsany.com/",
        links: [
            { label: "Website", url: "https://himeh.parsany.com/" },
            { label: "Dashboard", url: "https://himeh.parsany.com/admin" },
            { label: "User Panel", url: "https://himeh.parsany.com/profile" }
        ],
        role: "Solo Fullstack Developer",
        highlights: ["Book Catalog Search Index", "tRPC Type-Safe API", "Integrated Payment Gateway"],
        text: `# Himeh Book Publishing Platform\n\nBuilt over 2 months. A complete book store — authors upload titles through an admin dashboard, customers browse, add to cart, and check out via a local payment gateway. OTP-based auth instead of passwords.\n\n- **Role**: Solo Fullstack Developer\n- **Timeline**: Feb 2025 – Mar 2025\n- **Stack**: Next.js, tRPC, PostgreSQL, Prisma`
    },
    {
        id: 5,
        slug: "goldenbat",
        name: "Goldenbat GPS Tracking",
        description: "Live vehicle tracking dashboard. Ingests GPS coordinates from IoT hardware and shows real-time routes on a map.",
        date: "Sep 2024 – Jan 2025",
        image: "/professional/goldenbat/goldenbat-landing.webp",
        project_image: [
            "/professional/goldenbat/goldenbat-landing.webp",
            "/professional/goldenbat/goldenbat-application.webp",
            "/professional/goldenbat/goldenbat-sup.webp"
        ],
        tag: ["Next.js", "Tailwind CSS", "tRPC", "GPS", "PostgreSQL"],
        isactive: false,
        link: "https://gbat.parsany.com",
        links: [
            { label: "Website", url: "https://gbat.parsany.com" },
            { label: "Web Application", url: "https://gbat.parsany.com/auth/signin" },
            { label: "Dashboard", url: "https://gdash.parsany.com/" }
        ],
        role: "Frontend Developer",
        text: `# Goldenbat GPS Tracking\n\nBuilt over 5 months. Team project. I built the landing page and the fleet dashboard frontend (Next.js), also worked on the geofencing and the notification system; a teammate handled the mobile app. The backend ingests 10,000+ GPS coordinate updates per minute with sub-second latency — the dashboard plots live vehicle positions, historical paths, and geofencing alerts. Fleet operators use it to manage device groups and assignments.\n\n- **Role**: Frontend Developer\n- **Timeline**: Sep 2024 – Jan 2025\n- **Stack**: Next.js, tRPC, PostgreSQL\n\n currently down due to maintenance`
    },
    {
        id: 1,
        slug: "taxiland",
        name: "Taxiland Ride-Sharing Platform",
        description: "Intercity ride-sharing platform. Built the web admin panel that dispatch operators use for driver assignment and support tickets.",
        date: "May 2024 – Aug 2024",
        image: "/professional/taxiland/taxiland-app.webp",
        project_image: [
            "/professional/taxiland/taxiland-dash-addtrip.webp",
            "/professional/taxiland/taxiland-dash-tickets.webp",
            "/professional/taxiland/taxiland-app-wallet.webp"
        ],
        tag: ["Next.js", "tRPC", "Turborepo", "Tailwind CSS", "PostgreSQL"],
        isactive: false,
        link: "",
        links: [],
        role: "Fullstack Developer",
        text: `# Taxiland Ride-Sharing Platform\n\nBuilt over 4 months. Team collaboration. Intercity ride-sharing — passengers book trips, drivers pick them up. I worked across the stack: built the tRPC backend, contributed to the mobile app, and built the dispatch admin panel where operators assign drivers and handle support tickets. Site is currently down, screenshots are from when it was live.\n\n- **Role**: Fullstack Developer (team project)\n- **Timeline**: May 2024 – Aug 2024\n- **Stack**: Next.js, tRPC, PostgreSQL, Turborepo`
    },
    {
        id: 4,
        slug: "alzahra",
        name: "Alzahra Gold Wholesaler B2B Platform",
        description: "Frontend B2B panel for a gold wholesaler, integrated with a Django REST API for transaction management.",
        date: "Mar 2024 – Apr 2024",
        image: "/professional/alzahra/alzahra-landing.webp",
        project_image: [
            "/professional/alzahra/alzahra-landing.webp",
            "/professional/alzahra/alzahra-about.webp",
            "/professional/alzahra/alzahra-helper.webp"
        ],
        tag: ["Next.js", "Tailwind CSS", "B2B", "PostgreSQL"],
        isactive: false,
        link: "https://az.parsany.com/landing",
        links: [
            { label: "Website", url: "https://az.parsany.com/landing" }
        ],
        role: "Frontend Developer",
        text: `# Alzahra Gold Wholesaler B2B Platform\n\nBuilt in 1.5 months. Frontend only — a B2B platform for gold wholesale buyers. I built the landing page (2 weeks) and contributed to the buyer dashboard (1 month) on top of a Django REST API handled by the rest of the team. Landing page hit a desktop Lighthouse score of 99. Customers log in to see pricing, place orders, and track transactions through a multi-step purchasing workflow.\n\n- **Role**: Frontend Developer\n- **Timeline**: Mar 2024 – Apr 2024\n- **Stack**: Next.js, Tailwind CSS (backend: Django REST, not mine)`
    }
];