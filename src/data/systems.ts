export interface SystemOption {
  id: string;
  label: string;
  category: "pos" | "erp" | "accounting" | "custom" | "manual";
  startingPoint: string;
  note: string;
}

export const systemOptions: SystemOption[] = [
  {
    id: "motheo",
    label: "Motheo POS",
    category: "pos",
    startingPoint:
      "Motheo POS is IBD's RSL Certified Lekuka platform, so the starting point is configuration and workflow readiness rather than a new connection.",
    note: "We confirm your outlets, products, tax setup and invoicing flow, then prepare the platform for the compliance workflow.",
  },
  {
    id: "sage-intacct",
    label: "Sage Intacct",
    category: "erp",
    startingPoint:
      "A Sage Intacct integration pathway assessment begins with how your instance is configured and how invoices are currently produced.",
    note: "IBD reviews customers, items, tax information and sales documents to determine the appropriate integration pathway.",
  },
  {
    id: "odoo",
    label: "Odoo",
    category: "erp",
    startingPoint:
      "An Odoo integration pathway assessment starts with your Odoo edition, version and the modules you actually use.",
    note: "We map sales and accounting data to the compliance workflow and confirm what can be automated.",
  },
  {
    id: "zoho",
    label: "Zoho Books",
    category: "accounting",
    startingPoint:
      "Zoho Books is cloud accounting, so the starting point is your organisation's configuration and how invoices are raised today.",
    note: "IBD assesses connected data and the hand-off into the Lekuka compliance workflow.",
  },
  {
    id: "xero",
    label: "Xero",
    category: "accounting",
    startingPoint:
      "For Xero we first understand your chart of contacts, item tracking and current invoicing practice.",
    note: "The integration pathway is then matched to your subscription, configuration and applicable technical requirements.",
  },
  {
    id: "quickbooks",
    label: "QuickBooks",
    category: "accounting",
    startingPoint:
      "For QuickBooks we look at how customers, products, taxes and invoices are maintained in your company file.",
    note: "From there IBD determines what can be prepared internally and what needs an integration layer.",
  },
  {
    id: "sage",
    label: "Sage",
    category: "accounting",
    startingPoint:
      "Sage families differ, so we first identify the exact product and version you run.",
    note: "The preparation path is then defined around that specific environment and the applicable Lekuka technical requirements.",
  },
  {
    id: "custom-erp",
    label: "Custom ERP",
    category: "custom",
    startingPoint:
      "A custom ERP usually means the integration is designed around your own data model and business rules.",
    note: "IBD assesses data quality, system access and the safest place to introduce a compliance layer.",
  },
  {
    id: "excel",
    label: "Excel / Manual",
    category: "manual",
    startingPoint:
      "Manual or spreadsheet invoicing is still a valid starting point — the process is documented before any technology decision.",
    note: "We structure your customer, product and invoice data so a compliant process can be established.",
  },
  {
    id: "other",
    label: "Other",
    category: "custom",
    startingPoint:
      "If your system is not listed, we begin with a plain description of how invoices are created and stored today.",
    note: "IBD then determines whether configuration, integration or a platform change is most appropriate.",
  },
];

export const invoiceMethods = [
  { id: "pos", label: "POS" },
  { id: "erp", label: "ERP" },
  { id: "accounting", label: "Accounting software" },
  { id: "excel", label: "Excel" },
  { id: "manual", label: "Manual" },
  { id: "other", label: "Other" },
];

export const helpAreas = [
  { id: "compliance", label: "Compliance preparation" },
  { id: "integration", label: "Integration" },
  { id: "data", label: "Data preparation" },
  { id: "assessment", label: "System assessment" },
  { id: "full", label: "Full implementation" },
];

export const pathfinderRecommendations: Record<string, string> = {
  compliance:
    "Start with a compliance assessment: we document your current invoicing flow and confirm what the Lekuka environment expects of it.",
  integration:
    "Start with an integration assessment: we review your system's data and access options to define an appropriate connection path.",
  data:
    "Start with data preparation: customers, products, tax information and invoice history are cleaned and structured first.",
  assessment:
    "Start with a system assessment: we establish what you run today, how it is configured and what it can support.",
  full:
    "Start with a discovery engagement: assessment, data preparation, configuration, integration, testing and support are handled as one programme.",
};
