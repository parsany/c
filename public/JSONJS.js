export const ProjectAcademic = [
  {
    id: 1,
    name: "Cat Emotion recognition",
    description:
      "Using CNN, I trained a model to recognize the emotion of cats. Last update Aug 2025, *improved accuracy to 70%* ",
    date: "Aug 21, 2025",
    image: "/projects/cat.png",
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
    image: "/projects/cell.png",
    link: "https://github.com/parsany/Conway-game-of-life-invaders",
    video: "/media/cell.webm",
    tag: ["Programming", "Games"]
  },
  {
    id: 7,
    name: "Evolutionary Algorithm in C++",
    description:
      "I like heuristic algorithms and simulations.(empty repo, stay tuned!)",
    date: "May 20, 2023",
    image: "/projects/robot.png",
    link: "",
    tag: ["Robotics"],
    wlink: "https://github.com/parsany/EvolutionaryAlgo"
  },
  {
    id: 3,
    name: "PID_NN",
    description:
      "PID control for optimization of neural networks.",
    date: "March 27, 2025",
    image: "/projects/PID.png",
    link: "https://github.com/parsany/PID_NN",
    tag: ["AI"]
  },
  {
    id: 5,
    name: "Library Program QT",
    description:
      "I Hate Calibre's UI and macOS got a pretty nice feel app, so i made this for myself.",
    date: "Feb 14, 2025",
    image: "/projects/QtLib.png",
    link: "https://github.com/parsany/PyLibrary-QT",
    tag: ["Programming", "Apps"],
  },
  {
    id: 6,
    name: "anomaly detection for goldmines ",
    description:
      "deep learning models for mineral zone detection (as anomalies) using various Autoencoder architectures.",
    date: "Nov 2, 2025",
    image: "/projects/anomaly.png",
    link: "https://github.com/parsany/anomaly-VAE",
    tag: ["AI"],
  },
  {
    id: 4,
    name: "Simple Interpreter with Flex & Bison",
    description:
      "project i did for university class",
    date: "Sep 2, 2025",
    image: "/projects/flex.png",
    link: "https://github.com/parsany/InterpreterFlexBison",
    tag: ["Programming"],
  },
];

export const ProjectProfessional = [
  {
    id: 8,
    slug: "charbag",
    name: "Charbag Ceramic Studio",
    description: "A boutique ceramic shop featuring custom hand-made item listings, an admin portal, and client dashboards.",
    date: "Aug 10, 2025",
    image: "/professional/char/char-landing.jpg",
    project_image: [
      "/professional/char/char-landing.jpg"
    ],
    tag: ["Next.js", "Tailwind CSS", "PostgreSQL", "Boutique"],
    isactive: true,
    link: "",
    role: "Solo Fullstack Developer",
    timeline: "1 Month",
    highlights: ["Boutique Catalog Showcase", "Interactive Client Hub", "Studio Control Center"],
    text: `# Charbag Ceramic Studio\n\nA premium e-commerce platform and gallery designed for selling unique hand-made ceramic items.\n\n## Project Overview\n- **Role**: Solo Fullstack Developer\n- **Timeline**: 1 Month\n\n## Key Features\n- **Boutique Catalog**: Minimalist showcase of handcrafted collections.\n- **Interactive Client Hub**: Personal dashboard for customers to monitor custom order processes.\n- **Studio Control Center**: Rich admin panel for tracking inventory, managing ceramic workshops, and updating site layouts.\n\n## Tech Stack\n- **Framework**: Next.js\n- **Frontend**: React`
  },
  {
    id: 7,
    slug: "msk",
    name: "Battery MSK Client Web Portal",
    description: "A custom battery storefront client design linking to Battery ESP for payment processing and warranty management.",
    date: "Jun 30, 2025",
    image: "/professional/battery-msk/msk-landing.png",
    project_image: [
      "/professional/battery-msk/msk-landing.png",
      "/professional/battery-msk/msk-about.png",
      "/professional/battery-msk/msk-warranty.png",
      "/professional/battery-msk/msk-services.png",
      "/professional/battery-msk/msk-product-id.png"
    ],
    tag: ["Next.js", "Tailwind CSS", "NestJS", "Turborepo", "PostgreSQL", "dual-Language"],
    isactive: false,
    redirect: "esp",
    link: "",
    text: `# Battery MSK Client Web Portal\n\nA custom battery store frontend created as an alternative design for a partner brand, sharing the main database and logic endpoints of Battery ESP.\n\n## Project Overview\n- **Role**: Frontend Developer\n- **Timeline**: Integrated concurrent with Battery ESP\n\n## Redirect Details\nClicking details on this project redirects directly to the primary **Battery ESP** page.`
  },
  {
    id: 6,
    slug: "esp",
    name: "Battery ESP Warranty & E-Commerce",
    description: "A dual-language web portal and admin panel for battery sales, warranty verification, and order processing.",
    date: "Jun 15, 2025",
    image: "/professional/battery-esp/esp-landing.png",
    project_image: [
      "/professional/battery-esp/esp-landing.png",
      "/professional/battery-esp/esp-product-page.png",
      "/professional/battery-esp/esp-product-id.png",
      "/professional/battery-esp/battery-warranty.png",
      "/professional/battery-esp/battery-dash-products.png",
      "/professional/battery-esp/battery-dash-perm.png"
    ],
    tag: ["Turborepo", "Tailwind CSS","NestJS", "Next.js", "PostgreSQL", "dual-Language"],
    isactive: false,
    link: "",
    text: `# Battery ESP Warranty & E-Commerce\n\nA full-fledged commercial web application designed for selling vehicle batteries and tracking serial warranty activations.\n\n## Project Overview\n- **Role**: Fullstack Developer (Team cooperation)\n- **Timeline**: 3 Weeks\n\n## Key Features\n- **Product Catalogs**: Browsable battery categories with technical specification comparisons.\n- **Warranty System**: Verification panel where customers search serial numbers to validate purchase warranty.\n- **Admin Management**: Advanced admin panel to regulate product listings, access permissions, and generate warranty keys.\n- **Checkout**: Shopping cart module configured for manual checkout verification via phone/operator services.\n- **Localization**: Full dual-language support.\n\n## Tech Stack\n- **Architecture**: Monorepo using Turborepo\n- **Backend**: NestJS\n- **Frontend**: Next.js, React`
  },
  {
    id: 5,
    slug: "atrafian",
    name: "Atrafian Chat & Social Ecosystem",
    description: "A feature-rich real-time chat application, adventure map, and support ticketing platform.",
    date: "Apr 25, 2025",
    image: "/professional/atrafian/atrafian-landing.png",
    project_image: [
      "/professional/atrafian/atrafian-landing.png",
      "/professional/atrafian/atrafian-chat.png",
      "/professional/atrafian/atrafian-mobile-radar.png",
      "/professional/atrafian/atrafian-story.png",
      "/professional/atrafian/atrafian-profile.png",
      "/professional/atrafian/atrafian-dash-main.png",
      "/professional/atrafian/atrafian-dash-users.png",
      "/professional/atrafian/atrafian-dash-support.png",
      "/professional/atrafian/atrafian-dash-access.png"
    ],
    tag: ["NestJS", "Next.js", "Tailwind CSS","Turborepo", "Socket.io", "PostgreSQL", "Payment Gateway"],
    isactive: true,
    link: "https://atrafian.ir",
    role: "Solo Fullstack & Mobile Dev",
    timeline: "2 Months",
    highlights: ["Real-time Socket.io Chat", "Radar Navigation & Discovery", "AWS S3/MinIO Integration"],
    text: `# Atrafian Chat & Social Ecosystem\n\nAn enterprise-grade, highly secure real-time messaging platform and social dashboard built from scratch.\n\n## Project Overview\n- **Role**: Solo Fullstack & Mobile Developer\n- **Timeline**: 2 Months (Full-time)\n\n## Core Features\n- **Real-Time Communication**: Multi-channel personal chats, group chats, and support tickets built with Socket.io.\n- **Radar Navigation & Discovery**: Custom vector adventure map with hardware-accelerated interactive filters.\n- **Privacy & Security**: End-to-end security measures including secure message closing/deletion.\n- **Social Features**: Follower/following architecture and user story updates.\n- **Rich Media**: Sending voice messages, images, and videos stored on AWS S3-compatible MinIO instances.\n- **Infrastructure & Caching**: OTP SMS authentication and also for Redis cache database layer to maximize the speed.\n\n## Tech Stack\n- **Monorepo**: Turborepo\n- **Backend**: NestJS, PostgreSQLQL, Redis, Socket.io\n- **Frontend**: Next.js (Pages Router), React Query`
  },
  {
    id: 4,
    slug: "himheh",
    name: "Himheh Publishing",
    description: "A comprehensive book publishing platform featuring an online bookstore, user dashboards, and secure payment processing.",
    date: "Feb 20, 2025",
    image: "/professional/himeh/himeh-landing.png",
    project_image: [
      "/professional/himeh/himeh-landing.png",
      "/professional/himeh/himeh-products.png",
      "/professional/himeh/himeh-product-id.png",
      "/professional/himeh/himeh-checkout.png"
    ],
    tag: ["Next.js", "Tailwind CSS","tRPC", "Payment Gateway", "PostgreSQL"],
    isactive: true,
    link: "",
    role: "Solo Fullstack Developer",
    timeline: "2 Months",
    highlights: ["Book Catalog Search Index", "tRPC Type-Safe API", "Integrated Payment Gateway"],
    text: `# Himheh Book Publishing Platform\n\nA complete book selling and publishing web application developed from scratch.\n\n## Project Overview\n- **Role**: Solo Fullstack Developer\n- **Timeline**: 2 Months\n\n## Key Features\n- **Book Catalog**: A performant browse and search index for published books.\n- **Shopping Cart**: Real-time cart calculations and user inventory verification.\n- **User & Admin Dashboards**: Complete panels for managing orders, uploading new books, and editing publishing metadata.\n- **Security & Payments**: Integrated OTP SMS service for secure authentication and local payment gateway for transactions.\n\n## Tech Stack\n- **Frontend & Backend**: Next.js, tRPC, React\n- **Database**: PostgreSQLQL with Prisma ORM`
  },
  {
    id: 3,
    slug: "goldenbat",
    name: "Goldenbat GPS Tracking",
    description: "Enterprise GPS fleet tracking dashboard and landing page displaying real-time vehicle diagnostics.",
    date: "Dec 05, 2024",
    image: "/professional/goldenbat/goldenbat-landing.png",
    project_image: [
      "/professional/goldenbat/goldenbat-landing.png",
      "/professional/goldenbat/goldenbat-application.png",
      "/professional/goldenbat/goldenbat-sup.png"
    ],
    tag: ["Next.js","Tailwind CSS", "tRPC", "GPS", "PostgreSQL"],
    isactive: false,
    link: "https://app.goldengps.ir",
    text: `# Goldenbat GPS Tracking\n\nAn enterprise-grade vehicle tracking dashboard connected directly to GPS hardware endpoints.\n\n## Project Overview\n- **Role**: Backend & Web Dashboard Developer (Team project)\n- **Timeline**: 2 Weeks (Landing Page) + 1.5 Months (Admin Panel & Backend)\n- **Mobile App**: Developed by a team member\n\n## Key Features\n- **Real-Time GPS Monitoring**: Live mapping of active vehicles across the country, showing vehicle speeds, GPS coordinates, and historical paths.\n- **Device Integration**: Connected backend ingestion endpoints to IoT GPS devices for high-frequency status tracking.\n- **Admin Control Center**: Fully featured admin panel for managing user accounts, fleet groups, and device assignments.\n\n## Tech Stack\n- **Web App**: Next.js with tRPC\n- **Styles**: Custom CSS Modules`
  },
  {
    id: 2,
    slug: "taxiland",
    name: "Taxiland Ride-Sharing",
    description: "An Uber-like intercity transportation dashboard and mobile app facilitating manual and auto driver assignments.",
    date: "Oct 12, 2024",
    image: "/professional/taxiland/taxiland-app.png",
    project_image: [
      "/professional/taxiland/taxiland-app.png",
      "/professional/taxiland/taxiland-dash-admin.png",
      "/professional/taxiland/taxiland-dash-drivers.png",
      "/professional/taxiland/taxiland-dash-addtrip.png",
      "/professional/taxiland/taxiland-dash-tickets.png",
      "/professional/taxiland/taxiland-app-wallet.png"
    ],
    tag: ["Next.js", "tRPC", "Turborepo", "Tailwind CSS", "PostgreSQL"],
    isactive: false,
    link: "",
    text: `# Taxiland Ride-Sharing\n\nAn Uber-like ride-sharing platform specifically tailored for intercity travel, connecting drivers and passengers across cities.\n\n## Project Overview\n- **Role**: Fullstack Developer (Team collaboration)\n- **Timeline**: 4 Months\n- **Status**: Currently down (archived screenshots shown)\n\n## Key Features\n- **Driver Assignment**: Hybrid assignment system matching passengers to drivers automatically or manually via phone and support dispatch.\n- **Admin Panel**: High-performance dashboard for operators to coordinate trips, manage driver statuses, and process tickets.\n- **Mobile Experience**: Responsive, low-latency client-side interface built for passengers and drivers.\n\n## Tech Stack\n- **Framework**: Next.js (Pages Router)\n- **API layer**: tRPC for type-safe API communication\n- **Styling**: Tailwind CSS`
  },
  {
    id: 1,
    slug: "alzahra",
    name: "Alzahra Gold Banking B2B",
    description: "A secure B2B digital gold trading and banking web portal optimized for high-volume transactions.",
    date: "Aug 15, 2024",
    image: "/professional/alzahra/alzahra-landing.png",
    project_image: [
      "/professional/alzahra/alzahra-landing.png",
      "/professional/alzahra/alzahra-about.png",
      "/professional/alzahra/alzahra-helper.png"
    ],
    tag: ["Next.js", "Tailwind CSS", "B2B", "PostgreSQL"],
    isactive: false,
    link: "https://app.alzahragold.com",
    text: `# Alzahra Gold Banking B2B Platform\n\nA secure, enterprise-grade B2B platform designed for wholesale gold trading, liquidity management, and institutional banking services.\n\n## Project Overview\n- **Role**: Frontend Developer (Solo landing page implementation)\n- **Timeline**: 1 Week\n- **Backend**: Django (implemented by team members)\n\n## Key Features\n- **Gold Trading Interface**: High-fidelity dashboard for commercial partners to monitor real-time gold spot prices and execute transactions.\n- **B2B User Flow**: Custom onboarding, corporate verification checklists, and secure transactional panels.\n- **Performance**: Optimized frontend with page load times under 1 second using Next.js static optimization.\n\n## Tech Stack\n- **Frontend**: Next.js, Tailwind CSS\n- **Backend API**: Django REST Framework`
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
      // { name: "C#", level: 70 },
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
