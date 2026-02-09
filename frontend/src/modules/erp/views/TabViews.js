import {
  renderKpiTiles,
  renderGroupedCards,
  renderListView,
  renderDetailCard,
  renderYearCalendar,
} from "../../../core/ui/ViewBuilders.js";

export function renderErpDashboard(root) {
  renderKpiTiles(root, [
    { label: "Asset Utilization", value: "87%", meta: "▲ 3%" },
    { label: "Open Requests", value: "19", meta: "4 urgent" },
    { label: "Budget Burn", value: "62%", meta: "YTD" },
    { label: "Compliance", value: "98%", meta: "On track" },
  ]);

  renderGroupedCards(root, [
    {
      title: "Operations",
      cards: [
        { title: "Resource Plan", items: ["Q2 staffing", "Vendor coverage"] },
        { title: "Facility Ops", items: ["Equipment audit", "Safety checks"] },
      ],
    },
    {
      title: "Risk & QA",
      cards: [
        { title: "Risk Register", value: "6 open" },
        { title: "Audit Readiness", status: "Green" },
      ],
    },
  ]);
}

export function renderErpAssetManager(root) {
  renderListView(root, {
    title: "Asset Manager",
    subtitle: "Track assets and lifecycle status.",
    columns: [
      { key: "asset", label: "Asset" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status" },
      { key: "next", label: "Next Review" },
    ],
    rows: [
      { asset: "Warehouse Robotics", owner: "Ops", status: "Active", next: "Mar 2026" },
      { asset: "Fleet Vehicles", owner: "Logistics", status: "Audit", next: "Apr 2026" },
      { asset: "Data Center", owner: "IT", status: "Active", next: "May 2026" },
    ],
  });

  renderDetailCard(root, {
    title: "Asset Detail",
    subtitle: "Warehouse Robotics",
    fields: [
      { label: "Serial", value: "WH-ROB-22" },
      { label: "Lifecycle", value: "Year 2" },
      { label: "Maintenance", value: "Monthly" },
      { label: "Compliance", value: "Certified" },
    ],
  });
}

export function renderErpFinances(root) {
  renderGroupedCards(root, [
    {
      title: "Financial Pulse",
      cards: [
        { title: "Cash Runway", value: "14 months" },
        { title: "Expense Ratio", value: "0.62" },
      ],
    },
    {
      title: "Reporting",
      cards: [
        { title: "Quarter Close", status: "In progress" },
        { title: "Forecast Update", value: "Feb 12" },
      ],
    },
  ]);
}

export function renderErpHr(root) {
  renderListView(root, {
    title: "HR Operations",
    subtitle: "Hiring and workforce overview.",
    columns: [
      { key: "team", label: "Team" },
      { key: "open", label: "Open Roles" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      { team: "Sales", open: "4", status: "Interviewing", owner: "HR Manager" },
      { team: "Support", open: "2", status: "Sourcing", owner: "HR Manager" },
      { team: "Product", open: "3", status: "Planning", owner: "HR Manager" },
    ],
  });
}

export function renderErpStrategies(root) {
  renderGroupedCards(root, [
    {
      title: "Strategic Initiatives",
      cards: [
        { title: "Global Expansion", status: "Q2" },
        { title: "Process Automation", status: "Pilot" },
      ],
    },
    {
      title: "OKR Health",
      cards: [
        { title: "Operational Efficiency", value: "0.74" },
        { title: "Customer Delivery", value: "0.81" },
      ],
    },
  ]);
}

export function renderErpQaRisk(root) {
  renderListView(root, {
    title: "QA & Risk",
    subtitle: "Audit coverage and mitigation plans.",
    columns: [
      { key: "risk", label: "Risk" },
      { key: "severity", label: "Severity" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { risk: "Vendor outage", severity: "High", owner: "QA Lead", status: "Mitigating" },
      { risk: "Compliance renewal", severity: "Medium", owner: "QA Lead", status: "On track" },
      { risk: "Supply delay", severity: "Low", owner: "Ops", status: "Monitoring" },
    ],
  });
}

export function renderErpCalendar(root) {
  renderYearCalendar(root, {
    title: "Business Operations Planner",
    year: 2026,
    entries: [
      { month: 2, day: "05", label: "Operations review" },
      { month: 4, day: "19", label: "Budget checkpoint" },
      { month: 6, day: "03", label: "Safety audit" },
      { month: 8, day: "12", label: "Resource planning" },
      { month: 10, day: "22", label: "Vendor summit" },
      { month: 12, day: "09", label: "Year-end close" },
    ],
  });
}
