import { company, event } from "./company";
import {
  helpAreas,
  invoiceMethods,
  pathfinderRecommendations,
  systemOptions,
} from "./systems";

/* ------------------------------------------------------------------ *
 * Content contracts — every slide declares its type and typed content *
 * so nothing is hardcoded inside JSX.                                 *
 * ------------------------------------------------------------------ */

interface CoverContent {
  kicker: string;
  titleMain: string;
  titleSub: string;
  themeLines: string[];
  date: string;
  time: string;
  presenter: string;
  badge: string;
  poster: string;
}

interface WelcomeContent {
  lead: string;
  points: { title: string; body: string; icon: string }[];
}

interface BeforeAfterContent {
  beforeTitle: string;
  afterTitle: string;
  before: string[];
  after: string[];
  takeaway: string;
  note: string;
}

interface IntroContent {
  definition: string;
  body: string[];
  facets: { title: string; body: string; icon: string }[];
  keyIdea: string;
  note: string;
}

interface AudienceContent {
  lead: string;
  segments: { label: string; icon: string }[];
  note: string;
}

interface PathfinderContent {
  lead: string;
  steps: { key: string; question: string; hint: string }[];
  systemOptions: typeof systemOptions;
  invoiceMethods: typeof invoiceMethods;
  helpAreas: typeof helpAreas;
  recommendations: typeof pathfinderRecommendations;
  resultTitle: string;
  disclaimer: string;
}

interface ApproachContent {
  lead: string;
  stages: { key: string; title: string; body: string; icon: string }[];
  note: string;
}

interface KeepContent {
  question: string;
  answer: string;
  equation: string[];
  examples: string[];
  emphasis: string;
  message: string;
}

interface MotheoContent {
  badge: string;
  lead: string;
  modules: { label: string; icon: string }[];
  flow: string[];
  ctaLabel: string;
  ctaHref: string;
  note: string;
}

interface PathwayContent {
  label: string;
  lead: string;
  flow: { node: string; caption: string }[];
  areasTitle: string;
  areas: string[];
  note: string;
}

interface EcosystemContent {
  lead: string;
  tiers: { title: string; items: string[] }[];
  centre: string;
  top: string;
  note: string;
}

export interface RegisteredModel {
  id: number;
  name: string;
  version: string;
  status: string;
  device: string;
  category: string;
  manufacturer: string;
}

interface RegisteredContent {
  lead: string;
  image: string;
  annotation: string;
  models: RegisteredModel[];
  disclaimer: string;
}

interface DataPrepContent {
  lead: string;
  groups: { key: string; title: string; icon: string; items: string[] }[];
  note: string;
}

interface FaqContent {
  lead: string;
  items: { question: string; answer: string }[];
}

interface RoadmapContent {
  lead: string;
  days: { day: string; title: string; body: string }[];
  label: string;
  note: string;
}

interface ServicesContent {
  lead: string;
  cards: { title: string; body: string; icon: string }[];
  formula: string[];
  result: string;
}

interface QuestionsContent {
  title: string;
  sub: string;
  ctas: { label: string; href: string; kind: "primary" | "secondary" | "ghost" }[];
  note: string;
}

interface ClosingContent {
  lead: string;
  steps: string[];
  signature: string[];
  email: string;
  website: string;
}

interface SlideContentMap {
  cover: CoverContent;
  welcome: WelcomeContent;
  beforeAfter: BeforeAfterContent;
  intro: IntroContent;
  audience: AudienceContent;
  pathfinder: PathfinderContent;
  approach: ApproachContent;
  keep: KeepContent;
  motheo: MotheoContent;
  pathway: PathwayContent;
  ecosystem: EcosystemContent;
  registered: RegisteredContent;
  dataPrep: DataPrepContent;
  faq: FaqContent;
  roadmap: RoadmapContent;
  services: ServicesContent;
  questions: QuestionsContent;
  closing: ClosingContent;
}

interface SlideBase {
  id: string;
  eyebrow: string;
  title: string;
  theme: "dark" | "light" | "mist" | "green";
  speakerNotes: string;
}

export type SlideType = keyof SlideContentMap;

export type Slide = {
  [K in SlideType]: SlideBase & { type: K; content: SlideContentMap[K] };
}[SlideType];

type SlideOfType<T extends SlideType> = SlideBase & {
  type: T;
  content: SlideContentMap[T];
};

function defineSlide<T extends SlideType>(slide: SlideOfType<T>): SlideOfType<T> {
  return slide;
}

const coverageLabel =
  "Illustrative flow. Specific obligations and technical detail are subject to applicable RSL requirements.";

/* ------------------------------------------------------------------ *
 * The deck                                                            *
 * ------------------------------------------------------------------ */

export const slides: Slide[] = [
  defineSlide({
    id: "cover",
    type: "cover",
    eyebrow: event.eyebrow,
    title: "LEKUKA e-Invoicing",
    theme: "dark",
    content: {
      kicker: event.eyebrow,
      titleMain: event.title,
      titleSub: event.titleSuffix,
      themeLines: [...event.theme],
      date: event.date,
      time: event.time,
      presenter: event.organizer,
      badge: company.partnerBadge,
      poster: "/images/lekuka-awareness-poster.jpg",
    },
    speakerNotes: `
      Welcome the audience and set the frame for the next two hours.
      This session is an awareness session, not a product pitch: the goal is to leave
      every business able to answer one question — what does Lekuka mean for the way
      we already issue invoices?
      Remind the room that IBD is an RSL Certified Lekuka Partner and that the theme
      for today is "Understand the requirements. Prepare your business."
    `,
  }),

  defineSlide({
    id: "welcome",
    type: "welcome",
    eyebrow: "Agenda",
    title: "Welcome to the LEKUKA e-Invoicing Awareness Session",
    theme: "light",
    content: {
      lead: "Today is about understanding:",
      points: [
        {
          icon: "landmark",
          title: "What Lekuka means for your business",
          body: "The compliance environment your invoices now sit inside.",
        },
        {
          icon: "send",
          title: "What changes in your invoicing process",
          body: "How an invoice moves from your system to the customer.",
        },
        {
          icon: "monitor",
          title: "What your current system needs",
          body: "The data, configuration and access your platform must support.",
        },
        {
          icon: "workflow",
          title: "How integration can work",
          body: "Connecting existing software to the compliance workflow.",
        },
        {
          icon: "clipboardCheck",
          title: "How to prepare",
          body: "A practical sequence: assess, prepare, integrate, test.",
        },
        {
          icon: "headphones",
          title: "Where IBD can assist",
          body: "Assessment, build, testing, deployment and ongoing support.",
        },
      ],
    },
    speakerNotes: `
      Walk through the six outcomes quickly — these are the promises for the session.
      Emphasise that every one of them starts from the business, not from a product.
      If time is short, tell the room we will return to "how to prepare" and
      "where IBD can assist" in the second half.
    `,
  }),

  defineSlide({
    id: "why-this-matters",
    type: "beforeAfter",
    eyebrow: "Why this matters",
    title: "e-Invoicing Changes the Way Invoices Move",
    theme: "mist",
    content: {
      beforeTitle: "Before",
      afterTitle: "After",
      before: ["Business", "Invoice", "Customer", "Accounting records"],
      after: [
        "Business System",
        "Compliance Process",
        "Lekuka / RSL",
        "Customer",
        "Accounting / Audit Trail",
      ],
      takeaway:
        "The invoice becomes part of a governed process — it no longer travels alone.",
      note: coverageLabel,
    },
    speakerNotes: `
      Explain that the purpose of the session is not simply to introduce software.
      The purpose is to help businesses understand how their current systems can be
      prepared for the Lekuka environment.
      Contrast the two columns: previously an invoice was created and sent; now it
      passes through a compliance process and leaves an audit trail.
      Do not quote specific regulatory rules — the detail is subject to applicable
      RSL requirements.
    `,
  }),

  defineSlide({
    id: "what-is-lekuka",
    type: "intro",
    eyebrow: "Foundations",
    title: "What is Lekuka e-Invoicing?",
    theme: "light",
    content: {
      definition:
        "Lekuka is the e-invoicing environment associated with Revenue Services Lesotho (RSL).",
      body: [
        "Businesses need to understand how their sales and invoicing systems interact with the required compliance process.",
        "The requirements apply to the taxpayer's systems and data — not to any single product or vendor.",
        "Every engagement therefore begins with the business's own environment before any technical decision is made.",
      ],
      facets: [
        {
          icon: "fileText",
          title: "It is about invoices",
          body: "Sales documents move through a digital compliance workflow instead of only being printed or emailed.",
        },
        {
          icon: "network",
          title: "It is about systems",
          body: "Whatever produces your invoices — POS, ERP or accounting — has to participate in that workflow.",
        },
        {
          icon: "shieldCheck",
          title: "It is about evidence",
          body: "Responses and statuses are retained so your records and the compliance record agree.",
        },
      ],
      keyIdea:
        "Your invoice is no longer only a document — it becomes part of a digital compliance workflow.",
      note: coverageLabel,
    },
    speakerNotes: `
      Keep this slide deliberately high level. Lekuka is the e-invoicing environment
      associated with Revenue Services Lesotho; we are not here to quote technical
      specifications.
      Land the key idea out loud: the invoice becomes part of a digital compliance
      workflow.
      If someone asks for field-level detail, answer that it is to be confirmed based
      on the applicable Lekuka technical specification.
    `,
  }),

  defineSlide({
    id: "who-should-prepare",
    type: "audience",
    eyebrow: "Audience",
    title: "Who Should Prepare?",
    theme: "dark",
    content: {
      lead:
        "Any organisation that issues invoices and wants them to be part of the compliance workflow.",
      segments: [
        { icon: "store", label: "Retailers" },
        { icon: "boxes", label: "Wholesalers" },
        { icon: "briefcase", label: "Service businesses" },
        { icon: "bedDouble", label: "Hospitality" },
        { icon: "hardHat", label: "Contractors" },
        { icon: "scale", label: "Professional services" },
        { icon: "stethoscope", label: "Healthcare" },
        { icon: "school", label: "Schools / institutions" },
        { icon: "building2", label: "Multi-branch organizations" },
        { icon: "calculator", label: "Businesses using ERP / accounting software" },
        { icon: "server", label: "Businesses using custom systems" },
      ],
      note:
        "Sectors shown are illustrative of the audience for this session and are not a statement of regulatory scope.",
    },
    speakerNotes: `
      Ask for a show of hands across the room — the point is that the requirement
      crosses sectors, not that it applies identically to everyone.
      Call out that ERP and accounting users are on the list as well as retailers,
      because those are the audiences most likely to assume they are unaffected.
      Stress that scope for any individual taxpayer is subject to applicable RSL
      requirements.
    `,
  }),

  defineSlide({
    id: "first-question",
    type: "pathfinder",
    eyebrow: "Self-assessment",
    title: "What system are you using today?",
    theme: "light",
    content: {
      lead:
        "Your answer sets the starting point. Select an option to see how IBD would assess it.",
      steps: [
        {
          key: "system",
          question: "What system do you use?",
          hint: "Select the platform that produces your invoices today.",
        },
        {
          key: "method",
          question: "How do you currently issue invoices?",
          hint: "Where the document is actually created and sent.",
        },
        {
          key: "help",
          question: "What do you want help with?",
          hint: "Choose the outcome you need first.",
        },
      ],
      systemOptions,
      invoiceMethods,
      helpAreas,
      recommendations: pathfinderRecommendations,
      resultTitle: "Your next step",
      disclaimer:
        "This is a software and business workflow recommendation only. No personal data is stored or transmitted.",
    },
    speakerNotes: `
      Invite the audience to click through this themselves — it is the interactive
      centre of the session.
      Make the rule explicit: each option returns "your starting point", not a
      promise. Not every system follows the same integration process.
      Close by saying IBD would validate any of these answers in a discovery call
      before recommending a path.
    `,
  }),

  defineSlide({
    id: "ibd-approach",
    type: "approach",
    eyebrow: "Method",
    title: "Don't Start With Software. Start With Your Business.",
    theme: "dark",
    content: {
      lead:
        "Five stages take an organisation from its current process to a supported, compliant workflow.",
      stages: [
        {
          key: "discover",
          icon: "search",
          title: "Discover",
          body: "Understand your current invoicing process.",
        },
        {
          key: "assess",
          icon: "clipboardList",
          title: "Assess",
          body: "Identify compliance and integration requirements.",
        },
        {
          key: "prepare",
          icon: "database",
          title: "Prepare",
          body: "Configure data, invoices, customers, products and tax information.",
        },
        {
          key: "integrate",
          icon: "cable",
          title: "Integrate",
          body: "Connect the relevant business system to the compliance workflow.",
        },
        {
          key: "support",
          icon: "lifeBuoy",
          title: "Support",
          body: "Monitor, troubleshoot and maintain the solution.",
        },
      ],
      note:
        "IBD's implementation approach. The technical detail of each stage depends on the taxpayer's system and applicable RSL requirements.",
    },
    speakerNotes: `
      This is the spine of IBD's method. Spend the most time on Assess and Prepare,
      because that is where most organisations underestimate the work.
      Make the point that Integration is stage four, not stage one — you cannot
      connect a process you have not documented.
      Support is not an afterthought; it is what keeps the workflow compliant after
      go-live.
    `,
  }),

  defineSlide({
    id: "keep-your-system",
    type: "keep",
    eyebrow: "Core message",
    title: "Do I Need to Replace My ERP?",
    theme: "green",
    content: {
      question: "Do I Need to Replace My ERP?",
      answer: "Not necessarily.",
      equation: ["Existing ERP", "IBD Integration", "Lekuka Compliance"],
      examples: [
        "Sage Intacct",
        "Odoo",
        "Zoho Books",
        "Xero",
        "QuickBooks",
        "Custom ERP",
      ],
      emphasis: "where technically appropriate",
      message:
        "Where technically appropriate, integration can allow businesses to retain their existing operational systems.",
    },
    speakerNotes: `
      This is the central message of the whole session: Lekuka compliance does not
      necessarily mean replacing your existing business system.
      Read the equation aloud — existing ERP, plus IBD integration, plus Lekuka
      compliance.
      Be precise about the qualifier: where technically appropriate. We assess first;
      we never promise that every system integrates in the same way.
    `,
  }),

  defineSlide({
    id: "motheo-pos",
    type: "motheo",
    eyebrow: "Platform",
    title: "Motheo POS + Lekuka",
    theme: "light",
    content: {
      badge: "IBD's RSL Certified Lekuka platform",
      lead:
        "A point-of-sale and business management platform built with the Lekuka compliance workflow in mind.",
      modules: [
        { icon: "shoppingCart", label: "Sales" },
        { icon: "package", label: "Inventory" },
        { icon: "users", label: "Customers" },
        { icon: "fileText", label: "Invoices" },
        { icon: "trendingUp", label: "Reports" },
        { icon: "shieldCheck", label: "Compliance" },
        { icon: "cable", label: "ERP Integration" },
      ],
      flow: [
        "Sale",
        "Invoice",
        "Compliance processing",
        "Lekuka / RSL",
        "Customer / records",
      ],
      ctaLabel: "See how Motheo POS can support your business",
      ctaHref: company.motheo,
      note:
        "Motheo POS is presented as IBD's RSL Certified Lekuka platform. Configuration, scope and behaviour are subject to applicable RSL requirements.",
    },
    speakerNotes: `
      Present Motheo POS as one option inside IBD's portfolio, not as the answer for
      everyone in the room.
      Walk the flow: sale, invoice, compliance processing, Lekuka/RSL, then the
      customer and your records.
      Point people to motheopos.com for a demo if they want to see the platform
      hands-on after the session.
    `,
  }),

  defineSlide({
    id: "sage-intacct",
    type: "pathway",
    eyebrow: "Integration pathway",
    title: "Sage Intacct Integration Pathway",
    theme: "mist",
    content: {
      label: "Sage Intacct integration pathway",
      lead:
        "IBD can assess the client's Sage Intacct configuration and determine the appropriate integration pathway.",
      flow: [
        { node: "Sage Intacct", caption: "Your existing platform" },
        {
          node: "Invoice / Customer / Tax Data",
          caption: "The records that must travel",
        },
        { node: "IBD Integration Layer", caption: "Mapping, validation, control" },
        { node: "Lekuka Compliance Workflow", caption: "Prepare, submit, track" },
        { node: "RSL", caption: "Revenue Services Lesotho" },
      ],
      areasTitle: "Potential areas to assess",
      areas: [
        "Customers",
        "Items / services",
        "Tax information",
        "Sales invoices",
        "Credit notes",
        "Invoice status",
        "Compliance responses",
        "Audit trail",
      ],
      note:
        "Potential areas only. Exact fields, payload and behaviour are to be confirmed based on the applicable Lekuka technical specification and the client's Sage Intacct configuration.",
    },
    speakerNotes: `
      Say the words "integration pathway" deliberately — we are not claiming a
      pre-built, regulator-approved connector for every Sage Intacct configuration.
      The eight areas are a discussion list for the assessment, not a specification.
      If pressed for API fields or payload detail, defer to the applicable Lekuka
      technical specification.
    `,
  }),

  defineSlide({
    id: "odoo",
    type: "pathway",
    eyebrow: "Integration pathway",
    title: "Odoo Integration Pathway",
    theme: "light",
    content: {
      label: "Odoo integration pathway",
      lead:
        "Odoo environments vary widely, so the pathway is designed around the edition, version and modules the client actually runs.",
      flow: [
        { node: "Odoo", caption: "Your existing platform" },
        { node: "Sales / Accounting", caption: "Where invoices originate" },
        { node: "IBD Integration Layer", caption: "Mapping, validation, control" },
        { node: "Lekuka", caption: "Compliance workflow" },
        { node: "RSL", caption: "Revenue Services Lesotho" },
      ],
      areasTitle: "Potential areas to assess",
      areas: [
        "Customers",
        "Products",
        "Taxes",
        "Invoices",
        "Credit notes",
        "Statuses",
        "Compliance records",
      ],
      note:
        "Exact integration depends on the client's Odoo version, configuration and applicable technical requirements.",
    },
    speakerNotes: `
      Repeat the same discipline as the Sage Intacct slide: this is a pathway, not a
      promise of a fixed connector.
      Note that Odoo Community and Enterprise, and different versions, behave
      differently — that variability is exactly what the assessment is for.
      Invite Odoo users to book a configuration review after the session.
    `,
  }),

  defineSlide({
    id: "other-systems",
    type: "ecosystem",
    eyebrow: "Ecosystem",
    title: "Your Existing System Can Be Part of the Solution",
    theme: "dark",
    content: {
      lead:
        "Different platforms, one compliance layer. Keep what works. Connect what needs to connect. Make compliance part of the workflow.",
      tiers: [
        {
          title: "Accounting & ERP",
          items: ["Zoho Books", "Xero", "QuickBooks", "Sage"],
        },
        {
          title: "Bespoke & legacy",
          items: ["Custom ERP", "Legacy Systems", "POS Systems"],
        },
        {
          title: "IBD platforms",
          items: ["Motheo POS", "Sage Intacct pathway", "Odoo pathway"],
        },
      ],
      centre: "IBD Integration / Compliance Layer",
      top: "LEKUKA / RSL",
      note:
        "Systems shown represent categories IBD works with. Each integration is assessed individually and is subject to applicable RSL requirements.",
    },
    speakerNotes: `
      Read the three-line philosophy: keep what works, connect what needs to
      connect, make compliance part of the workflow.
      The visual deliberately puts the IBD layer between every platform and Lekuka —
      that layer is where mapping, validation and monitoring live.
      Position this as breadth of coverage, not as a claim that every system on the
      slide has identical integration behaviour.
    `,
  }),

  defineSlide({
    id: "registered-footprint",
    type: "registered",
    eyebrow: "Evidence",
    title: "IBD's Registered Integration Footprint",
    theme: "mist",
    content: {
      lead:
        "Registered models recorded against Infinity Business Dynamics (Pty) Ltd on the supplied RSL platform.",
      image: "/images/rsl-platform-screenshot.png",
      annotation: "Illustrative view of IBD registered models",
      models: [
        {
          id: 42,
          name: "INFINITY",
          version: "1.0.1",
          status: "Active",
          device: "Virtual Device",
          category: "Software / Virtual Point Of Sale (POS)",
          manufacturer: "INFINITY BUSINESS DYNAMICS (PTY) LTD",
        },
        {
          id: 81,
          name: "INFINITY_ZOHO_BOOKS",
          version: "1.0.1",
          status: "Active",
          device: "Virtual Device",
          category: "Software / Virtual Point Of Sale (POS)",
          manufacturer: "INFINITY BUSINESS DYNAMICS (PTY) LTD",
        },
        {
          id: 101,
          name: "INFINITY_XERO",
          version: "1.0.1",
          status: "Active",
          device: "Virtual Device",
          category: "Software / Virtual Point Of Sale (POS)",
          manufacturer: "INFINITY BUSINESS DYNAMICS (PTY) LTD",
        },
        {
          id: 102,
          name: "INFINITY_QUICKBOOKS",
          version: "1.0.1",
          status: "Active",
          device: "Virtual Device",
          category: "Software / Virtual Point Of Sale (POS)",
          manufacturer: "INFINITY BUSINESS DYNAMICS (PTY) LTD",
        },
        {
          id: 131,
          name: "INFINITY_SAGEONE",
          version: "1.0.1",
          status: "Active",
          device: "Virtual Device",
          category: "Software / Virtual Point Of Sale (POS)",
          manufacturer: "INFINITY BUSINESS DYNAMICS (PTY) LTD",
        },
      ],
      disclaimer:
        "Registration information shown from the supplied RSL platform screenshot. Registration status and technical scope should be verified against current RSL documentation where required.",
    },
    speakerNotes: `
      This slide is evidence of platform registration context — nothing more.
      Read the model names and IDs exactly as shown; do not imply that the list
      proves regulatory approval for every integration IBD delivers.
      The disclaimer on screen is the line to use if anyone asks about approval
      numbers or scope.
    `,
  }),

  defineSlide({
    id: "data-preparation",
    type: "dataPrep",
    eyebrow: "Preparation",
    title: "Prepare Your Data Before Integration",
    theme: "light",
    content: {
      lead:
        "Integration succeeds or fails on the quality of the data underneath it. Four areas to clean first.",
      groups: [
        {
          key: "customers",
          icon: "users",
          title: "Customers",
          items: ["Legal / business name", "Tax information", "Contact information"],
        },
        {
          key: "products",
          icon: "package",
          title: "Products / Services",
          items: ["Description", "Units", "Prices", "Tax classification"],
        },
        {
          key: "invoices",
          icon: "fileText",
          title: "Invoices",
          items: [
            "Invoice numbering",
            "Dates",
            "Customer",
            "Items",
            "Tax",
            "Totals",
          ],
        },
        {
          key: "system",
          icon: "settings",
          title: "System",
          items: [
            "Users",
            "Permissions",
            "API / integration access",
            "Configuration",
            "Backup",
          ],
        },
      ],
      note:
        "Mandatory fields, formats and validation rules are to be confirmed based on the applicable Lekuka technical specification.",
    },
    speakerNotes: `
      This is the most practical slide in the deck — tell people to photograph it.
      The four groups are what IBD reviews during the Prepare stage.
      Progress bars indicate how much of a typical dataset is ready, not a
      regulatory score.
      Mandatory fields are not stated here because they are subject to the
      applicable Lekuka technical specification.
    `,
  }),

  defineSlide({
    id: "preparation-questions",
    type: "faq",
    eyebrow: "FAQ",
    title: "Common Preparation Questions",
    theme: "mist",
    content: {
      lead: "The questions finance and IT teams ask first — with practical answers.",
      items: [
        {
          question: "Which system are we currently using?",
          answer:
            "Document the product, version and how invoices are created today. Every later decision is planned from this answer.",
        },
        {
          question: "Does our system support integration?",
          answer:
            "It depends on the system, its version and the access it allows. IBD assesses it and confirms what is technically appropriate.",
        },
        {
          question: "What customer information is required?",
          answer:
            "Start with the legal or business name, tax information and contacts you already hold. Exact mandatory fields are subject to applicable RSL requirements.",
        },
        {
          question: "Are our products / services configured correctly?",
          answer:
            "We check descriptions, units, prices and tax classification so invoice lines are consistent before any integration work begins.",
        },
        {
          question: "How are taxes configured?",
          answer:
            "Tax treatment is reviewed inside your own system first. Rates and rules are applied from your configuration, not assumed.",
        },
        {
          question: "How will invoice responses be handled?",
          answer:
            "Responses are captured back against the invoice so status is visible in your own system. The exact mechanism follows the applicable technical specification.",
        },
        {
          question: "What happens when an invoice fails?",
          answer:
            "Failures are logged with a clear status and a defined route to retry or correct. Handling is agreed during the integration design.",
        },
        {
          question: "What happens when our system is offline?",
          answer:
            "Connectivity interruptions are planned for: queued documents, monitoring and a recovery procedure are defined before go-live.",
        },
        {
          question: "Who will maintain the integration?",
          answer:
            "IBD can support it under an agreed scope, or hand it to your IT team with documentation. Ownership is agreed before deployment.",
        },
        {
          question: "How do we test before going live?",
          answer:
            "A controlled test cycle using real business scenarios is run and signed off before deployment.",
        },
      ],
    },
    speakerNotes: `
      Use this as the live Q&A warm-up: ask the room which of the ten they would
      ask first.
      Keep answers practical. Where a question touches regulation, use the neutral
      wording on screen rather than improvising an RSL rule.
      Offer to run the full list as a structured assessment after the session.
    `,
  }),

  defineSlide({
    id: "implementation-roadmap",
    type: "roadmap",
    eyebrow: "Roadmap",
    title: "From Current System to Compliance",
    theme: "dark",
    content: {
      lead:
        "A staged engagement path for organisations that are ready to move from understanding to execution.",
      days: [
        {
          day: "Day 1",
          title: "Discovery",
          body: "Map the current invoicing process, systems and stakeholders.",
        },
        {
          day: "Day 2",
          title: "System & data assessment",
          body: "Review configuration, data quality and integration options.",
        },
        {
          day: "Day 3",
          title: "Configuration / integration preparation",
          body: "Prepare mappings, records and the compliance layer.",
        },
        {
          day: "Day 4",
          title: "Testing",
          body: "Run realistic scenarios and resolve exceptions.",
        },
        {
          day: "Day 5",
          title: "Deployment / compliance readiness",
          body: "Go live with monitoring and support in place.",
        },
      ],
      label: "IBD's stated 5-day compliance pathway for applicable engagements",
      note:
        "Not an RSL regulatory deadline and not a universal implementation guarantee. Actual timing depends on the taxpayer's system, data readiness and applicable RSL requirements.",
    },
    speakerNotes: `
      Read the label above the timeline word for word before anyone asks: this is
      IBD's stated five-day compliance pathway for applicable engagements.
      It is not an RSL deadline and not a guarantee for every organisation.
      The variable is always the same two things — the client's system and the
      readiness of their data.
    `,
  }),

  defineSlide({
    id: "what-ibd-does",
    type: "services",
    eyebrow: "Capability",
    title: "What IBD Can Do For You",
    theme: "light",
    content: {
      lead:
        "One accountable team across the compliance journey — from first assessment to day-to-day support.",
      cards: [
        {
          icon: "shieldCheck",
          title: "Compliance assessment",
          body: "Establish where your business stands and what the compliance workflow expects of your systems.",
        },
        {
          icon: "cable",
          title: "System integration",
          body: "Connect the relevant POS, ERP or accounting platform to the compliance layer where technically appropriate.",
        },
        {
          icon: "database",
          title: "Data preparation",
          body: "Clean and structure customers, products, tax information and invoice history.",
        },
        {
          icon: "settings",
          title: "Configuration",
          body: "Set up users, permissions, numbering, statuses and integration access.",
        },
        {
          icon: "rocket",
          title: "Testing & deployment",
          body: "Validate real scenarios, resolve exceptions and go live with confidence.",
        },
        {
          icon: "lifeBuoy",
          title: "Ongoing support",
          body: "Monitor submissions, troubleshoot failures and keep the workflow maintained.",
        },
      ],
      formula: [
        "Technology",
        "Finance",
        "Tax Compliance",
        "Business Intelligence",
      ],
      result: "IBD",
    },
    speakerNotes: `
      Six cards, one team. The differentiator for IBD is that technology, finance
      and tax compliance sit under the same roof.
      Use the formula line as the closing beat: Technology plus Finance plus Tax
      Compliance plus Business Intelligence equals IBD.
      Invite the audience to pick one card as their starting point.
    `,
  }),

  defineSlide({
    id: "questions",
    type: "questions",
    eyebrow: "Discussion",
    title: "Questions?",
    theme: "dark",
    content: {
      title: "Questions?",
      sub: "Let's understand your current system.",
      ctas: [
        {
          label: "Request a Lekuka Assessment",
          href: `${company.mailto}?subject=Lekuka%20Assessment%20Request`,
          kind: "primary",
        },
        {
          label: "Discuss Integration",
          href: `${company.mailto}?subject=Integration%20Discussion`,
          kind: "secondary",
        },
        {
          label: "Request a Demo",
          href: company.motheoDemo,
          kind: "secondary",
        },
        {
          label: "Contact IBD",
          href: company.website,
          kind: "ghost",
        },
      ],
      note:
        "Every conversation starts with discovery — no commitment is required to book an assessment.",
    },
    speakerNotes: `
      Open the floor. Capture questions on screen where possible so the room can see
      them answered.
      Then transition to the four actions: assessment, integration discussion, demo
      or a general conversation with IBD.
      Leave the contact block visible while questions are being taken.
    `,
  }),

  defineSlide({
    id: "closing",
    type: "closing",
    eyebrow: "Next steps",
    title: "Is Your Business Ready for Lekuka?",
    theme: "green",
    content: {
      lead: "Six steps from today's session to a compliant, supported workflow.",
      steps: [
        "Know your current system",
        "Assess your invoicing process",
        "Prepare your data",
        "Confirm your integration path",
        "Test before going live",
        "Have support available",
      ],
      signature: [...company.positioning],
      email: company.email,
      website: company.websiteLabel,
    },
    speakerNotes: `
      Close by reading the six steps as a single sentence: know your system, assess
      the process, prepare the data, confirm the path, test, and have support.
      Reinforce the central message one final time — Lekuka compliance does not
      necessarily mean replacing your existing business system.
      Thank the room and point to the contact details for follow-up.
    `,
  }),
];

export type DeckSlide = Slide;

export type ContentOf<T extends SlideType> = Extract<Slide, { type: T }>["content"];

export const totalSlides = slides.length;

export function slideNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
