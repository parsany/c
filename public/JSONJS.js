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
        id: 3,
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
        text: `# Battery MSK Client Website\n\nBuilt over 2 months (shared development cycle with ESP), in collaboration with a team. The client-facing side of the Battery ESP monorepo — same codebase, different brand, implemented 1:1 from the design across both FA and EN locales. Built and styled the public storefront and warranty lookup pages. See the ESP project for full technical details.\n\n- **Role**: Frontend Developer (team)\n- **Timeline**: Dec 2025 – June 2026\n- **Stack**: Next.js, Tailwind CSS, NestJS (shared backend)`
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
        text: `# Battery ESP/MSK E-Commerce\n\nBuilt over 2 months, in collaboration with a team. An e-commerce website for two battery brands sharing the same backend. The interesting part was the warranty verification system — customers enter a serial number and the system validates it against a database of generated keys.\n\n- **Role**: Fullstack Developer (team)\n- **Timeline**: Dec 2025 – June 2026\n- **Stack**: Turborepo monorepo, NestJS, Next.js, PostgreSQL`
    },
    {
        id: 6,
        slug: "atrafian",
        name: "Atrafian Chat & Social Ecosystem",
        description: "Real-time chat app with a native mobile build. WebSockets for messaging, Redis for caching, and a custom radar-based discovery map.",
        date: "Jan 2026 – Mar 2026",
        image: "/professional/atrafian/atrafian-landing.webp",
        project_image: [
            "/professional/atrafian/im0.webp",
            "/professional/atrafian/im1.webp",
            "/professional/atrafian/im2.webp",
            "/professional/atrafian/im3.webp",
            "/professional/atrafian/im4.webp",
            "/professional/atrafian/im5.webp",
            "/professional/atrafian/im6.webp",
            "/professional/atrafian/im7.webp",
            "/professional/atrafian/im8.webp",
            "/professional/atrafian/im9.webp",
            "/professional/atrafian/im10.webp",
            "/professional/atrafian/im11.webp",
            "/professional/atrafian/im12.webp",
            "/professional/atrafian/im13.webp",

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
        text: `# Atrafian Chat & Social Ecosystem\n\nBuilt over 3 months, full-time, solo. A social platform with real-time chat (personal, group, and support channels), stories, chat requests, and media filters. The discovery map uses a solar-system-style layout — users are placed in orbiting belts sorted by online status and distance instead of live location tracking. Media (voice, images, video) goes through a self-hosted MinIO instance, with Redis handling caching and OTP delivery.\n\nBuilt a client-side NSFW detection pipeline (NSFW.js) that automatically flags and reports suspicious profiles to the admin panel at signup, cutting down manual moderation work. Users can also toggle their own NSFW filter, backed by a server-side NSFW and illegal-word filter. Rounded out with a support/ticketing system and a wallet for buying credits through a payment gateway.\n\nThe radar map was the hardest part — it needed to feel smooth on mobile while updating frequently, and a client constraint ruled out React Native, so we settled on Capacitor.JS.\n\n- **Role**: Solo Fullstack & Mobile Developer\n- **Timeline**: Jan 2026 – Mar 2026\n- **Stack**: NestJS, Next.js, Socket.io, Redis, PostgreSQL, Turborepo`
    },
    {
        id: 2,
        slug: "edu-platform",
        name: "Educational Platform*",
        description: "Full-stack educational platform for a professor — video courses hosted on S3, a markdown-powered blog with SEO, and a course management dashboard.",
        date: "July 2026",
        image: "/professional/edu-platform/im1.webp",
        project_image: [
            "/professional/edu-platform/im1.webp",
            "/professional/edu-platform/im2.webp",
            "/professional/edu-platform/im3.webp",
            "/professional/edu-platform/im4.webp",
            "/professional/edu-platform/im5.webp",
            "/professional/edu-platform/im6.webp",
        ],
        tag: ["Next.js", "NestJS", "PostgreSQL", "S3", "Markdown", "SEO"],
        isactive: false,
        link: "",
        links: [],
        role: "Solo Fullstack Developer",
        highlights: ["S3 Video Hosting", "Markdown Blog with SEO", "Course Management Dashboard"],
        text: `# Tutor Edu-Platform\n\nCurrently in development (Jul 2026). Built for a professor from my university i know — they needed a place to host their video courses and write long-form blog posts without relying on third-party platforms.\n\nVideo content is uploaded to an S3-compatible bucket (self-hosted) and streamed directly on the platform. The blog supports full Markdown with automatic SEO metadata generation per post (Open Graph, canonical URLs, structured data). Instructors get a dashboard to manage courses, upload videos, and publish blog posts.\n\n- **Role**: Solo Fullstack Developer\n- **Timeline**: Jul 2026 – present\n- **Stack**: Next.js, NestJS, PostgreSQL, S3 (self-hosted)`
    },
    {
        id: 1,
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
           "/professional/goldenbat/bat19.webp",
           "/professional/goldenbat/bat18.webp",
           "/professional/goldenbat/bat20.webp",
            "/professional/goldenbat/bat11.webp",
           "/professional/goldenbat/bat15.webp",   
           "/professional/goldenbat/bat1.webp",
           "/professional/goldenbat/bat3.webp",
           "/professional/goldenbat/bat4.webp",
           "/professional/goldenbat/bat5.webp",
           "/professional/goldenbat/bat6.webp",
           "/professional/goldenbat/bat7.webp",
           "/professional/goldenbat/bat8.webp",
           "/professional/goldenbat/bat9.webp",
           "/professional/goldenbat/bat13.webp",
           "/professional/goldenbat/bat14.webp",
           "/professional/goldenbat/bat12.webp",
           "/professional/goldenbat/bat16.webp",
           "/professional/goldenbat/bat17.webp"       
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
        text: `# Goldenbat GPS Tracking\n\nBuilt over 5 months, in collaboration with a team. I built the landing page and the mobile PWA, and contributed to the fleet dashboard frontend (Next.js) — including work on geofencing and the notification system; a teammate handled the native mobile work. The backend ingests 10,000+ GPS coordinate updates per minute with sub-second latency — the dashboard plots live vehicle positions, historical paths, and geofencing alerts. Fleet operators use it to manage device groups and assignments.\n\n- **Role**: Frontend Developer\n- **Timeline**: Sep 2024 – Jan 2025\n- **Stack**: Next.js, tRPC, PostgreSQL\n\n currently down due to maintenance`
    },
    {
        id: 0,
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
        text: `# Taxiland Ride-Sharing Platform\n\nBuilt over 4 months, in collaboration with a team. Intercity ride-sharing — passengers book trips, drivers pick them up. I built the mobile app and contributed to the tRPC backend and the dispatch admin panel where operators assign drivers and handle support tickets. Site is currently down, screenshots are from when it was live.\n\n- **Role**: Fullstack Developer (team project)\n- **Timeline**: May 2024 – Aug 2024\n- **Stack**: Next.js, tRPC, PostgreSQL, Turborepo`
    },
    {
        id: 4,
        slug: "alzahra",
        name: "Alzahra Gold Wholesaler B2B Platform",
        description: "Frontend B2B panel for a gold wholesaler, integrated with a Django REST API for transaction management.",
        date: "Mar 2024 – Apr 2024",
        image: "/professional/alzahra/alzahra-landing.webp",
        project_image: [
            "/professional/alzahra/gold0.webp",
           "/professional/alzahra/gold5.webp",
           "/professional/alzahra/gold6.webp",
           "/professional/alzahra/gold1.webp",
           "/professional/alzahra/gold2.webp",
           "/professional/alzahra/gold3.webp",
           "/professional/alzahra/gold4.webp",
        ],
        tag: ["Next.js", "Tailwind CSS", "B2B", "PostgreSQL"],
        isactive: false,
        link: "https://az.parsany.com/landing",
        links: [
            { label: "Website", url: "https://az.parsany.com/landing" }
        ],
        role: "Frontend Developer",
        text: `# Alzahra Gold Wholesaler B2B Platform\n\nBuilt in 1.5 months, in collaboration with a team. A B2B platform for gold wholesale buyers, built on top of a Django REST API handled by the rest of the team. I built the landing page fully and contributed to the buyer dashboard. Landing page hit a desktop Lighthouse score of 99. Customers log in to see pricing, place orders, and track transactions through a multi-step purchasing workflow.\n\n- **Role**: Frontend Developer\n- **Timeline**: Mar 2024 – Apr 2024\n- **Stack**: Next.js, Tailwind CSS (backend: Django REST, not mine)`
    }
];