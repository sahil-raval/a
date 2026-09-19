/**
 * Default fallback content. These mirror the existing hardcoded values from
 * the original site so the app continues to look identical until the Sanity
 * dataset is populated. After seeding, Sanity values take precedence.
 */

export const FALLBACK_SITE = {
  companyName: "APM Energy",
  tagline: "Solar & Battery Solutions",
  shortDescription:
    "Providing sustainable solar, battery, engineering, and electrical maintenance solutions for homes and businesses across Australia.",
  abn: "11 681 478 848",
  email: "info@apmenergy.com.au",
  phone: "+61 412 391 878",
  address: "West 6, 33 Mackey Street, North Geelong VIC, 3215",
  businessHours: "Mon-Fri from 8am to 5pm.",
  serviceArea: "Servicing all metropolitan and regional areas.",
  logoUrl: "/logo.png",
  netccLogoUrl: "/netcc-logo.png",
  socialLinks: [
    { platform: "facebook", url: "#" },
    { platform: "instagram", url: "#" },
    { platform: "twitter", url: "#" },
    { platform: "linkedin", url: "#" },
  ],
  defaultSeo: {
    title: "APM Energy | Solar & Battery Solutions",
    description:
      "APM Energy is a specialist solar and battery solutions provider delivering high-quality, performance-driven energy systems for homes and businesses across Australia.",
    keywords: [
      "solar",
      "battery",
      "solar panels",
      "renewable energy",
      "Australia",
      "APM Energy",
    ],
    ogImageUrl: "/opengraph.jpg",
  },
};

export const FALLBACK_NAV = {
  primaryLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  servicesMenuItems: [
    {
      title: "Solar and Battery",
      href: "/services/solar-and-battery",
      description: "Advanced PV systems and smart storage solutions.",
      icon: "Sun",
    },
    {
      title: "Maintenance",
      href: "/services/maintenance",
      description: "Comprehensive electrical maintenance services.",
      icon: "Wrench",
    },
    {
      title: "Responsible Recycling",
      href: "/services/responsible-recycling",
      description: "Eco-friendly disposal of old equipment.",
      icon: "Recycle",
    },
    {
      title: "Engineering",
      href: "/services/engineering",
      description: "Technical design and engineering solutions.",
      icon: "HardHat",
    },
    {
      title: "Project Management",
      href: "/services/project-management",
      description: "End-to-end project delivery and coordination.",
      icon: "ClipboardList",
    },
    {
      title: "EV Chargers",
      href: "/services/ev-chargers",
      description: "Supply and installation of EV charging solutions.",
      icon: "Zap",
    },
  ],
  ctaLabel: "Get a Quote",
  ctaHref: "/contact",
};

export const FALLBACK_FOOTER = {
  description:
    "Providing sustainable solar, battery, engineering, and electrical maintenance solutions for homes and businesses across Australia.",
  linkColumns: [
    {
      title: "Services",
      links: [
        { label: "Solar and Battery", href: "/services/solar-and-battery" },
        { label: "Maintenance", href: "/services/maintenance" },
        {
          label: "Responsible Recycling",
          href: "/services/responsible-recycling",
        },
        { label: "Engineering", href: "/services/engineering" },
        { label: "Project Management", href: "/services/project-management" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "How We Work", href: "/how-we-work" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
      ],
    },
  ],
  copyrightLine:
    "© {year} APM Energy. All rights reserved. ABN: 11 681 478 848",
};

export const FALLBACK_SERVICES = [
  {
    title: "Solar and Battery",
    slug: "solar-and-battery",
    icon: "Sun",
    shortDescription:
      "Harness the power of the sun with advanced PV systems and smart storage.",
    longDescription:
      "Harness the power of the sun with advanced PV systems and smart storage solutions to reduce energy costs and independence.",
    navDescription: "Advanced PV systems and smart storage solutions.",
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2064&auto=format&fit=crop",
    order: 1,
    showOnHome: true,
  },
  {
    title: "Maintenance",
    slug: "maintenance",
    icon: "Wrench",
    shortDescription: "Proactive electrical care.",
    longDescription:
      "Comprehensive electrical maintenance and safety checks to keep your systems running smoothly and safely.",
    navDescription: "Comprehensive electrical maintenance services.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop",
    order: 2,
    showOnHome: true,
  },
  {
    title: "Engineering",
    slug: "engineering",
    icon: "HardHat",
    shortDescription: "Technical design and engineering solutions.",
    longDescription:
      "Technical design and engineering solutions tailored to your site requirements and compliance obligations.",
    navDescription: "Technical design and engineering solutions.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    order: 3,
    showOnHome: true,
  },
  {
    title: "Responsible Recycling",
    slug: "responsible-recycling",
    icon: "Recycle",
    shortDescription: "Eco-friendly disposal services.",
    longDescription:
      "Eco-friendly disposal and recycling services for old solar panels, batteries, and electrical equipment.",
    navDescription: "Eco-friendly disposal of old equipment.",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2000&auto=format&fit=crop",
    order: 4,
    showOnHome: true,
  },
  {
    title: "Project Management",
    slug: "project-management",
    icon: "ClipboardList",
    shortDescription: "End-to-end project delivery and coordination.",
    longDescription:
      "End-to-end project delivery and coordination — from initial consultation through to commissioning and handover.",
    navDescription: "End-to-end project delivery and coordination.",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop",
    order: 5,
    showOnHome: true,
  },
  {
    title: "EV Chargers",
    slug: "ev-chargers",
    icon: "Zap",
    shortDescription: "Supply and installation of EV charging solutions.",
    longDescription:
      "Supply and installation of electric vehicle charging solutions for homes and businesses across Australia.",
    navDescription: "Supply and installation of EV charging solutions.",
    imageUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    order: 6,
    showOnHome: true,
  },
];

export const FALLBACK_HOME = {
  heroBadge: "Powering the Future of Energy",
  heroHeadingLine1: "Sustainable Energy.",
  heroHeadingLine2: "Smart Solutions.",
  heroSubheading:
    "We provide cutting-edge solar, battery, heating, and cooling solutions tailored for modern homes and businesses.",
  heroPrimaryCtaLabel: "Get a Free Quote",
  heroPrimaryCtaHref: "/contact",
  heroSecondaryCtaLabel: "Explore Services",
  heroSecondaryCtaHref: "/services",
  heroChips: [
    { label: "Solar Power", icon: "Sun" },
    { label: "Battery Storage", icon: "Zap" },
  ],
  servicesTitle: "Comprehensive Energy Solutions",
  servicesSubtitle:
    "We integrate modern technology with sustainable practices to deliver reliable, efficient, and eco-friendly services for your property.",
  globeBadge: "Global Impact",
  globeHeadingLine1: "Sustainable Energy",
  globeHeadingLine2: "For A Greener Planet",
  globeDescription:
    "We are committed to reducing carbon footprints worldwide through innovative renewable energy solutions and smart infrastructure. Our network spans across continents, delivering clean energy to where its needed most.",
  globeStats: [
    { value: "50+", label: "Countries Served" },
    { value: "10GW", label: "Energy Generated" },
  ],
  featuresTitle: "Why Choose APM Energy?",
  featuresSubtitle:
    "We combine industry expertise with a passion for sustainability to deliver results that matter.",
  features: [
    {
      title: "Licensed & Insured",
      description:
        "Fully qualified professionals ensuring safety and compliance with all Australian standards.",
      icon: "ShieldCheck",
    },
    {
      title: "Eco-Friendly Solutions",
      description:
        "Dedicated to reducing carbon footprints with sustainable energy technologies.",
      icon: "Leaf",
    },
    {
      title: "Latest Technology",
      description:
        "We use cutting-edge equipment and smart systems for maximum efficiency.",
      icon: "Zap",
    },
    {
      title: "Quality Guaranteed",
      description:
        "Premium materials and workmanship backed by comprehensive warranties.",
      icon: "Award",
    },
    {
      title: "On-Time Service",
      description:
        "Reliable scheduling and efficient project completion to respect your time.",
      icon: "Clock",
    },
    {
      title: "Customer Focused",
      description:
        "Personalized solutions tailored to your specific energy needs and budget.",
      icon: "Users",
    },
  ],
  testimonialsTitle: "Trusted by Our Clients",
  testimonialsSubtitle:
    "Don't just take our word for it. Here's what our customers have to say about our services.",
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "The solar installation process was seamless. The team was professional, explained everything clearly, and our energy bills have dropped significantly!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content:
        "APM Energy upgraded our entire office lighting to LED. The difference in quality is amazing, and the ROI has been better than expected.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Davis",
      role: "Property Manager",
      content:
        "Reliable, efficient, and always responsive. Their maintenance team keeps our properties running smoothly without any headaches.",
      rating: 5,
      avatar: "ED",
    },
  ],
  ctaHeading: "Ready to Upgrade Your Energy Efficiency?",
  ctaDescription:
    "Get a customized quote for your home or business today. Our experts are ready to help you save money and the planet.",
  ctaPrimaryLabel: "Contact Us Now",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Learn More About Us",
  ctaSecondaryHref: "/about",
  seo: {
    title: "APM Energy | Solar & Battery Solutions",
    description:
      "APM Energy is a specialist solar and battery solutions provider delivering high-quality, performance-driven energy systems for homes and businesses across Australia.",
  },
};

export const FALLBACK_ABOUT = {
  heroTitle: "About APM Energy",
  heroSubtitle:
    "A specialist solar and battery solutions provider focused on delivering high-quality, performance-driven energy systems for homes and businesses across Australia.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop",
  approachTitle: "Our Approach",
  approachBody:
    "At APM Energy, we don't just install systems — we take ownership of outcomes. Every project is carefully engineered to maximise long-term savings, system reliability, and return on investment.",
  differentiatorTitle: "What Sets Us Apart",
  differentiatorBody:
    "Our project management mindset. We understand the importance of timelines, safety, compliance, and clear communication — ensuring every project is delivered smoothly and professionally.",
  whoWeAreTitle: "Who We Are",
  whoWeAreParagraphs: [
    "With over 7 years of hands-on experience in the solar industry, we bring a practical, end-to-end understanding of how to design, deliver, and optimise renewable energy projects — from initial feasibility through to commissioning and ongoing performance.",
    "We've successfully delivered a wide range of residential and commercial installations, managing everything from system design and procurement to installation, compliance, and client handover.",
  ],
  bulletPoints: [
    {
      title: "Do it right the first time",
      description: "Our approach is simple — no shortcuts, on every project.",
    },
    {
      title: "Ownership of outcomes",
      description:
        "We don't just install systems. We are accountable for results.",
    },
    {
      title: "Precision, transparency, and accountability",
      description:
        "Whether residential or commercial, we deliver with these values at the core.",
    },
  ],
  stats: [
    {
      icon: "Clock",
      heading: "7+ Years",
      label: "Hands-on experience in the solar industry",
    },
    {
      icon: "Layers",
      heading: "End-to-End",
      label:
        "From feasibility through to commissioning and ongoing performance",
    },
    {
      icon: "ClipboardList",
      heading: "Project Mindset",
      label:
        "Timelines, safety, compliance, and clear communication on every project",
    },
    {
      icon: "CheckCircle",
      heading: "No Shortcuts",
      label: "Do it right the first time — residential and commercial",
    },
  ],
  ctaHeading: "Whether you're a homeowner or a business",
  ctaBody:
    "Whether you're a homeowner looking to reduce energy bills or a business seeking a scalable energy solution, APM Energy delivers with precision, transparency, and accountability.",
  ctaLabel: "Get in Touch",
  ctaHref: "/contact",
  seo: {
    title: "About Us",
    description:
      "Learn about APM Energy — a specialist solar and battery solutions provider with 7+ years of experience.",
  },
};

export const FALLBACK_CONTACT = {
  heroTitle: "Lets Talk Energy",
  heroSubtitle:
    "Ready to start your project or need maintenance? Our team is here to help.",
  callLabel: "Call Us",
  callDescription: "Mon-Fri from 8am to 5pm.",
  emailLabel: "Email Us",
  emailDescription: "We will respond within 24 hours.",
  visitLabel: "Visit Us",
  visitDescription: "West 6, 33 Mackey Street, North Geelong VIC, 3215",
  serviceAreaLabel: "Service Area",
  serviceAreaDescription:
    "Servicing all metropolitan and regional areas.",
  serviceOptions: [
    { label: "Solar and Battery", value: "solar" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Responsible Recycling", value: "recycling" },
    { label: "Other", value: "other" },
  ],
  submitLabel: "Send Message",
  successTitle: "Message Sent!",
  successMessage:
    "Thanks for reaching out. We'll get back to you as soon as possible — usually within 24 hours.",
  seo: {
    title: "Contact Us",
    description:
      "Get in touch with APM Energy for solar, battery, and electrical solutions.",
  },
};

export const FALLBACK_HOW_WE_WORK = {
  heroTitle: "How We Work",
  heroSubtitle:
    "A transparent, structured approach aligned with the New Energy Tech Consumer Code (NETCC) — from first enquiry to ongoing support.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
  introTitle: "Our Commitment to You",
  introParagraphs: [
    "APM Energy operates with structured systems and procedures aligned with the New Energy Tech Consumer Code (NETCC), ensuring compliance across all stages of the customer journey — from initial enquiry through to post-installation support.",
    "The business is committed to delivering transparent and accurate information, designing fit-for-purpose systems, ensuring compliant installation practices, and maintaining accountability beyond project completion.",
  ],
  processTitle: "Our Process",
  processSubtitle:
    "Nine structured stages — covering every aspect of your journey from first contact to long-term support.",
  journey: [
    {
      step: "01",
      icon: "MessageSquare",
      title: "Sales & Customer Engagement",
      desc: "We conduct structured consultations to assess your energy consumption patterns, tariff structures, and anticipated future needs such as EV integration or business electrification. Proposals are prepared with clear detail on system configuration, expected performance ranges, key assumptions, and limitations — with no misleading representations. You are provided with sufficient information and time to make an informed decision.",
    },
    {
      step: "02",
      icon: "Cpu",
      title: "System Design",
      desc: "Designs are developed to be fit-for-purpose, based on site-specific conditions and customer requirements. Consideration is given to roof orientation, shading, available space, electrical configuration, and load profile. Network constraints such as export limits and DNSP requirements are factored into all designs. Future requirements, including battery integration and load growth, are also considered where applicable. Designs are prepared using industry-standard tools and reviewed prior to installation.",
    },
    {
      step: "03",
      icon: "ClipboardList",
      title: "Contracts & Documentation",
      desc: "APM Energy utilises standardised contractual documentation to ensure clarity and transparency. All agreements clearly define the scope of works, system specifications, inclusions and exclusions, pricing, payment terms, and applicable warranties. Pricing structures are fully transparent with no hidden costs. Formal proposal documentation is provided prior to acceptance.",
    },
    {
      step: "04",
      icon: "FileCheck",
      title: "Agreement & Scheduling",
      desc: "Once you are ready to proceed, we finalise the agreement, arrange the deposit, and schedule your installation at a time that suits you. A confirmed timeline is provided and you are kept informed of any changes prior to the installation date.",
    },
    {
      step: "05",
      icon: "Wrench",
      title: "Installation & Safety",
      desc: "All installations are delivered by qualified and accredited installers in accordance with relevant Australian Standards and workplace health and safety requirements. Appropriate planning is undertaken prior to installation to address site conditions and safety considerations. Installation activities are monitored to ensure adherence to the defined scope and compliance obligations. Quality assurance checks are conducted to verify installation standards and system integrity.",
    },
    {
      step: "06",
      icon: "Zap",
      title: "Grid Connection & Compliance",
      desc: "APM Energy manages grid connection processes and regulatory requirements on behalf of the customer. This involves coordination of pre-approval applications, management of export limitations, and submission of required documentation to the relevant DNSP. All compliance requirements are addressed prior to system commissioning to ensure regulatory alignment.",
    },
    {
      step: "07",
      icon: "PackageCheck",
      title: "Commissioning & Handover",
      desc: "Systems are commissioned and tested to confirm functionality and performance prior to handover. Customers are provided with access to monitoring platforms and guidance on system operation, including safety procedures and basic troubleshooting. Handover is completed once the system is verified as operational and compliant.",
    },
    {
      step: "08",
      icon: "HeartHandshake",
      title: "After-Sales Support & Warranty",
      desc: "APM Energy maintains ongoing responsibility for customer support following installation. Support is provided for system performance enquiries, fault identification, and general operation. Warranty claims and defect resolution are managed in coordination with relevant manufacturers and installation teams. A clear point of contact is maintained to ensure continuity of communication.",
    },
    {
      step: "09",
      icon: "AlertTriangle",
      title: "Complaints Handling",
      desc: "A formal complaints handling process is maintained in line with consumer protection guidelines. Complaints are acknowledged promptly, assessed objectively, and addressed within a reasonable timeframe. Where required, matters are escalated to ensure appropriate resolution. All complaints and outcomes are recorded to support continuous improvement.",
    },
  ],
  systemsTitle: "Our Business Systems",
  systemsSubtitle:
    "Structured processes that ensure quality, compliance, and accountability at every stage.",
  businessSystems: [
    {
      icon: "MessageSquare",
      title: "Sales & Customer Engagement",
      desc: "APM Energy follows a structured consultation and sales approach to ensure customers are fully informed and solutions are tailored to their requirements. Consultations are conducted to assess energy consumption patterns, tariff structures, and anticipated future needs such as home/business electrification or electric vehicle integration. No misleading or deceptive representations are made, particularly in relation to system performance, savings, or payback periods. Customers are provided with sufficient information and time to make informed decisions.",
    },
    {
      icon: "Cpu",
      title: "System Design",
      desc: "System designs are developed to be fit-for-purpose, based on site-specific conditions and customer requirements. Consideration is given to roof orientation, shading, available space, electrical configuration (single or three phase), and load profile. Network constraints such as export limits and DNSP requirements are factored into all designs. Future requirements, including battery integration and load growth, are also considered where applicable. Designs are prepared using industry-standard tools and reviewed prior to installation.",
    },
    {
      icon: "FileCheck",
      title: "Contracts & Documentation",
      desc: "APM Energy utilises standardised contractual documentation to ensure clarity and transparency. All agreements clearly define the scope of works, system specifications, inclusions and exclusions, pricing, payment terms, and applicable warranties. Pricing structures are fully transparent, with no hidden costs. Customers are provided with formal proposal documentation prior to acceptance, ensuring full visibility of the system and associated obligations.",
    },
    {
      icon: "Shield",
      title: "Installation & Safety",
      desc: "All installations are delivered by qualified and accredited installers in accordance with relevant Australian Standards and workplace health and safety requirements. Appropriate planning is undertaken prior to installation to address site conditions and safety considerations. Installation activities are monitored to ensure adherence to defined scope and compliance obligations. Quality assurance checks are conducted to verify installation standards and system integrity.",
    },
    {
      icon: "Zap",
      title: "Grid Connection & Compliance",
      desc: "APM Energy manages grid connection processes and regulatory requirements on behalf of the customer. This involves coordination of pre-approval applications, management of export limitations, and submission of required documentation to the relevant DNSP. All compliance requirements are addressed prior to system commissioning to ensure regulatory alignment.",
    },
    {
      icon: "HeartHandshake",
      title: "After-Sales Support & Warranty",
      desc: "APM Energy maintains ongoing responsibility for customer support following installation. Support is provided for system performance enquiries, fault identification, and general operation. Warranty claims and defect resolution are managed in coordination with relevant manufacturers and installation teams. A clear point of contact is maintained to ensure continuity of communication.",
    },
  ],
  complaintsBadge: "Step 09 — Complaints Handling",
  complaintsTitle: "We Take Complaints Seriously",
  complaintsIntro:
    "A formal complaints handling process is maintained in line with the New Energy Tech Consumer Code (NETCC) and Australian Consumer Law. All complaints and outcomes are recorded to support continuous improvement.",
  complaintTimelines: [
    {
      title: "Acknowledged within 2 business days",
      desc: "Every complaint is logged on receipt and you will receive confirmation with the name of your dedicated representative.",
    },
    {
      title: "Substantive response within 15 business days",
      desc: "Each complaint is assessed objectively. Relevant documentation, records, and communications are reviewed and you are kept informed throughout.",
    },
    {
      title: "Resolved within 45 business days",
      desc: "Outcomes may include clarification, rectification works, repair, replacement, or commercial resolution. All decisions are communicated clearly in writing.",
    },
    {
      title: "Escalation pathways available",
      desc: "If unresolved, complaints may be escalated to senior management or relevant state-based consumer protection bodies and NETCC-approved dispute resolution pathways.",
    },
  ],
  lodgeTitle: "How to Lodge a Complaint",
  lodgeIntro:
    "Customers are encouraged to provide as much detail as possible to assist in timely assessment and resolution.",
  lodgeFooter:
    "All complaints are recorded upon receipt in our internal register.",
  netccTitle: "NETCC Approved Seller",
  netccBody:
    "APM Energy is a New Energy Tech Consumer Code (NETCC) Approved Seller, demonstrating our commitment to fair dealing, transparency, and consumer protection in the new energy technology sector.",
  netccCtaLabel: "Get in Touch",
  netccCtaHref: "/contact",
  seo: {
    title: "How We Work",
    description:
      "Our 9-stage NETCC-aligned process — from consultation to after-sales support.",
  },
};

/* -------------------------------------------------------------------------- */
/*  Blog + Landing Pages                                                      */
/* -------------------------------------------------------------------------- */

// Helper to build Portable Text blocks from simple markup so fallback demo
// content renders through the same PortableText pipeline as real Sanity data.
let _k = 0;
const bk = () => `fb${(_k++).toString(36)}`;
function blocks(items: string[]): any[] {
  return items.map((raw) => {
    const heading = raw.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      const style = heading[1].length === 2 ? "h2" : heading[1].length === 3 ? "h3" : "h4";
      return {
        _type: "block",
        _key: bk(),
        style,
        markDefs: [],
        children: [{ _type: "span", _key: bk(), text: heading[2], marks: [] }],
      };
    }
    const bullet = raw.match(/^-\s+(.*)$/);
    if (bullet) {
      return {
        _type: "block",
        _key: bk(),
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [{ _type: "span", _key: bk(), text: bullet[1], marks: [] }],
      };
    }
    return {
      _type: "block",
      _key: bk(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: bk(), text: raw, marks: [] }],
    };
  });
}

export const FALLBACK_BLOG_POSTS = [
  {
    title: "How Home Batteries Slash Your Power Bill",
    slug: "home-batteries-slash-power-bill",
    excerpt:
      "Pairing solar with a home battery lets you store daytime energy and use it at night — here's how much you can really save.",
    author: "APM Energy",
    publishedAt: "2025-01-15T09:00:00.000Z",
    category: "Battery",
    coverImageUrl:
      "https://images.pexels.com/photos/37929911/pexels-photo-37929911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tags: ["Solar", "Battery", "Savings"],
    body: blocks([
      "Solar panels are brilliant during the day, but most households use the bulk of their electricity in the evening. A home battery bridges that gap by storing surplus daytime generation for use after sunset.",
      "## Why batteries make financial sense",
      "Feed-in tariffs have fallen sharply across Australia, which means exporting excess solar to the grid earns you very little. Storing that same energy and using it yourself avoids buying power at peak retail rates.",
      "- Maximise self-consumption of your own solar",
      "- Protect against rising grid prices",
      "- Keep the lights on during outages with backup-capable systems",
      "## What size battery do you need?",
      "The right capacity depends on your evening load and how much solar you generate. Our team models your usage profile to recommend a system that pays for itself as fast as possible.",
      "Ready to see your numbers? Book a free assessment and we'll show you a realistic payback estimate for your home.",
    ]),
    seo: {
      title: "How Home Batteries Slash Your Power Bill | APM Energy",
      description:
        "Discover how pairing solar with a home battery cuts your electricity bill, boosts self-consumption and protects against rising grid prices.",
      keywords: ["home battery", "solar storage", "power bill savings", "solar battery Australia"],
    },
  },
  {
    title: "Solar Panel Maintenance: A Simple Seasonal Checklist",
    slug: "solar-panel-maintenance-checklist",
    excerpt:
      "A few minutes of seasonal care keeps your solar system performing at its best. Follow this simple checklist.",
    author: "APM Energy",
    publishedAt: "2025-02-02T09:00:00.000Z",
    category: "Maintenance",
    coverImageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2064&auto=format&fit=crop",
    tags: ["Maintenance", "Solar"],
    body: blocks([
      "Solar systems are famously low-maintenance, but a little attention each season keeps them generating peak power for decades.",
      "## Keep an eye on output",
      "Check your monitoring app monthly. A sudden drop in generation is the earliest sign something needs attention.",
      "## Keep panels clean",
      "Dust, pollen and bird droppings reduce output. In most areas rain does the job, but a gentle rinse before summer helps.",
      "- Inspect for shading from growing trees",
      "- Look for loose mounting or damaged cabling",
      "- Book a professional inspection every few years",
      "If you notice anything unusual, our maintenance team can run a full safety and performance check.",
    ]),
    seo: {
      title: "Solar Panel Maintenance Checklist | APM Energy",
      description:
        "Keep your solar system performing at its best with this simple seasonal maintenance checklist from APM Energy.",
      keywords: ["solar maintenance", "solar panel cleaning", "solar inspection"],
    },
  },
  {
    title: "EV Chargers at Home: What You Need to Know",
    slug: "ev-chargers-at-home-guide",
    excerpt:
      "Thinking about a home EV charger? Here's how to choose the right unit and charge for next to nothing using solar.",
    author: "APM Energy",
    publishedAt: "2025-02-20T09:00:00.000Z",
    category: "EV Charging",
    coverImageUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    tags: ["EV", "Charging", "Solar"],
    body: blocks([
      "Home charging is the most convenient — and cheapest — way to keep your electric vehicle ready to go each morning.",
      "## Level 2 is the sweet spot",
      "A dedicated 7kW Level 2 charger adds around 40km of range per hour, comfortably topping up most cars overnight.",
      "## Charge on sunshine",
      "Smart chargers can prioritise your solar generation, so you fill the battery with free energy from your roof rather than the grid.",
      "- Faster, safer charging than a standard power point",
      "- Solar-aware scheduling to cut costs",
      "- Future-proof for a second EV",
      "We supply and install EV charging solutions for homes and businesses across Australia.",
    ]),
    seo: {
      title: "Home EV Chargers Guide | APM Energy",
      description:
        "Everything you need to know about installing a home EV charger and charging your car with solar power.",
      keywords: ["home EV charger", "EV charging", "solar EV charging", "Level 2 charger"],
    },
  },
];

export const FALLBACK_LANDING_PAGES = [
  {
    title: "Summer Solar Offer",
    slug: "summer-solar-offer",
    published: true,
    heroHeading: "Go Solar This Summer & Save",
    heroSubheading:
      "Premium solar and battery packages installed by accredited experts — with transparent pricing and no hidden costs.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop",
    heroCtaLabel: "Get a Free Quote",
    heroCtaHref: "/contact",
    sections: [
      {
        _type: "featureGrid",
        _key: "lg1",
        heading: "Why Choose APM Energy",
        subheading: "Quality systems, expert installation and long-term support.",
        items: [
          { _key: "f1", icon: "ShieldCheck", title: "Licensed & Insured", description: "Fully qualified professionals compliant with Australian standards." },
          { _key: "f2", icon: "Zap", title: "Latest Technology", description: "Premium panels and smart batteries for maximum efficiency." },
          { _key: "f3", icon: "Award", title: "Quality Guaranteed", description: "Premium materials backed by comprehensive warranties." },
        ],
      },
      {
        _type: "ctaBanner",
        _key: "lg2",
        heading: "Ready to start saving?",
        description: "Book your free, no-obligation assessment today.",
        buttonLabel: "Contact Us",
        buttonHref: "/contact",
      },
    ],
    seo: {
      title: "Summer Solar Offer | APM Energy",
      description: "Premium solar and battery packages installed by accredited experts. Get a free quote this summer.",
      keywords: ["solar offer", "solar quote", "battery package"],
    },
  },
];

export type SiteContent = typeof FALLBACK_SITE;
export type NavContent = typeof FALLBACK_NAV;
export type FooterContent = typeof FALLBACK_FOOTER;
export type HomeContent = typeof FALLBACK_HOME;
export type AboutContent = typeof FALLBACK_ABOUT;
export type ContactContent = typeof FALLBACK_CONTACT;
export type HowWeWorkContent = typeof FALLBACK_HOW_WE_WORK;
export type ServiceContent = (typeof FALLBACK_SERVICES)[number];
export type BlogPostContent = (typeof FALLBACK_BLOG_POSTS)[number];
export type LandingPageContent = (typeof FALLBACK_LANDING_PAGES)[number];
