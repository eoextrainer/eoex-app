import {
  renderKpiTiles,
  renderGroupedCards,
  renderListView,
  renderDetailCard,
  renderYearCalendar,
} from "../../../core/ui/ViewBuilders.js";

export function renderServiceDashboard(root) {
  renderKpiTiles(root, [
    { label: "Open Tickets", value: "42", meta: "6 critical" },
    { label: "SLA Health", value: "96%", meta: "▲ 2%" },
    { label: "Backlog", value: "18", meta: "Stable" },
    { label: "CSAT", value: "4.6", meta: "Last 30 days" },
  ]);

  renderGroupedCards(root, [
    {
      title: "Queues",
      cards: [
        { title: "High SLA", value: "6", status: "Escalations active" },
        { title: "Mid SLA", value: "18", status: "On track" },
        { title: "Low SLA", value: "18", status: "Backlog" },
      ],
    },
    {
      title: "Service Ops",
      cards: [
        { title: "Self-healing Jobs", value: "4 active" },
        { title: "On-call Rotation", value: "Week 6" },
      ],
    },
  ]);
}

export function renderServiceHighSla(root) {
  renderListView(root, {
    title: "High SLA Tickets",
    subtitle: "Priority cases requiring immediate response.",
    columns: [
      { key: "ticket", label: "Ticket" },
      { key: "account", label: "Account" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      { ticket: "#INC-4021", account: "Acme Logistics", status: "Escalated", owner: "Level 3 Support" },
      { ticket: "#INC-4018", account: "Lumina Retail", status: "Investigating", owner: "Level 2 Support" },
    ],
  });

  renderDetailCard(root, {
    title: "Ticket Detail",
    subtitle: "#INC-4021",
    fields: [
      { label: "Priority", value: "Critical" },
      { label: "SLA", value: "1h" },
      { label: "Next Step", value: "Bridge call" },
      { label: "Owner", value: "Level 3 Support" },
    ],
  });
}

export function renderServiceMidSla(root) {
  renderListView(root, {
    title: "Mid SLA Tickets",
    subtitle: "Active cases with standard response windows.",
    columns: [
      { key: "ticket", label: "Ticket" },
      { key: "issue", label: "Issue" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      { ticket: "#SR-2101", issue: "SSO sync", status: "In progress", owner: "Level 2 Support" },
      { ticket: "#SR-2097", issue: "Billing export", status: "Waiting", owner: "Level 1 Support" },
      { ticket: "#SR-2094", issue: "API latency", status: "Monitoring", owner: "Level 2 Support" },
    ],
  });
}

export function renderServiceLowSla(root) {
  renderListView(root, {
    title: "Low SLA Tickets",
    subtitle: "Backlog and low urgency items prioritized by impact.",
    columns: [
      { key: "ticket", label: "Ticket" },
      { key: "issue", label: "Issue" },
      { key: "priority", label: "Priority" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      { ticket: "#BK-902", issue: "UI request", priority: "Low", owner: "Level 1 Support" },
      { ticket: "#BK-898", issue: "Export enhancement", priority: "Low", owner: "Level 1 Support" },
    ],
  });
}

export function renderServiceCalendar(root) {
  renderYearCalendar(root, {
    title: "Service Calendar",
    year: 2026,
    entries: [
      { month: 2, day: "03", label: "On-call rotation" },
      { month: 4, day: "11", label: "Maintenance window" },
      { month: 7, day: "09", label: "Incident drill" },
      { month: 10, day: "28", label: "SLA review" },
      { month: 12, day: "15", label: "Holiday coverage" },
    ],
  });
}
