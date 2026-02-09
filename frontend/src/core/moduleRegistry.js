import { renderCrmDashboard } from "../modules/crm/views/DashboardView.js";
import { renderContactsView } from "../modules/crm/views/ContactsView.js";
import { renderErpDashboard } from "../modules/erp/views/DashboardView.js";
import { renderProductsView } from "../modules/erp/views/ProductsView.js";
import { renderOrdersView } from "../modules/erp/views/OrdersView.js";
import { renderStudioDashboard } from "../modules/studio/views/DashboardView.js";
import { renderCampaignsView } from "../modules/studio/views/CampaignsView.js";
import { renderSupportDashboard } from "../modules/support/views/DashboardView.js";
import { renderSupportTickets } from "../modules/support/views/TicketsView.js";

function makePlaceholderView(title, description, highlights = []) {
  return (root) => {
    const panel = document.createElement("section");
    panel.className = "panel";
    panel.innerHTML = `<h2>${title}</h2>`;
    const notice = document.createElement("div");
    notice.className = "notice";
    notice.textContent = description;
    panel.appendChild(notice);
    if (highlights.length) {
      const list = document.createElement("ul");
      list.className = "bullet";
      highlights.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
      panel.appendChild(list);
    }
    root.appendChild(panel);
  };
}

export const appModules = {
  CRM: {
    label: "CRM",
    tabs: [
      {
        key: "dashboard",
        label: "Dashboard",
        view: renderCrmDashboard,
      },
      {
        key: "campaigns",
        label: "Campaigns",
        view: makePlaceholderView(
          "CRM Campaigns",
          "Plan targeted outreach, nurture sequences, and renewal plays.",
          ["Segment leads", "Track engagement", "Measure conversion"]
        ),
      },
      {
        key: "leads",
        label: "Leads",
        view: makePlaceholderView(
          "Lead Pipeline",
          "Capture, qualify, and route new leads to account teams.",
          ["Lead scoring", "Assignment rules", "Next-best actions"]
        ),
      },
      {
        key: "opportunities",
        label: "Opportunities",
        view: makePlaceholderView(
          "Opportunities",
          "Track deal stages, close dates, and forecast accuracy.",
          ["Stage progression", "Win probability", "Forecast rollup"]
        ),
      },
      {
        key: "accounts",
        label: "Accounts",
        view: makePlaceholderView(
          "Accounts",
          "Maintain account profiles, stakeholders, and engagement history.",
          ["Account health", "Key contacts", "Expansion signals"]
        ),
      },
      {
        key: "contacts",
        label: "Contacts",
        view: renderContactsView,
      },
      {
        key: "tasks",
        label: "Tasks",
        view: makePlaceholderView(
          "Tasks",
          "Manage follow-ups, reminders, and team activity queues.",
          ["Task queues", "Ownership", "Due dates"]
        ),
      },
      {
        key: "reports",
        label: "Reports",
        view: makePlaceholderView(
          "Reports",
          "Deliver pipeline snapshots and KPI rollups for leadership.",
          ["Pipeline by stage", "Team performance", "Win/loss"]
        ),
      },
      {
        key: "calendar",
        label: "Forecast Calendar",
        view: makePlaceholderView(
          "Sales Forecast Calendar",
          "Plan account touches and forecast reviews in a shared calendar.",
          ["Team schedules", "Forecast checkpoints", "Meeting outcomes"]
        ),
      },
    ],
  },
  STUDIO: {
    label: "Studio",
    tabs: [
      {
        key: "dashboard",
        label: "Dashboard",
        view: renderStudioDashboard,
      },
      {
        key: "campaigns",
        label: "Campaigns",
        view: renderCampaignsView,
      },
      {
        key: "leads",
        label: "Leads",
        view: makePlaceholderView(
          "Studio Leads",
          "Sync lead engagement for nurture and multi-channel activation.",
          ["Lead sources", "Engagement scoring", "Activation triggers"]
        ),
      },
      {
        key: "calendar",
        label: "Editorial Calendar",
        view: makePlaceholderView(
          "Editorial Calendar",
          "Align campaigns, creative reviews, and publishing windows.",
          ["Content deadlines", "Approval checkpoints", "Channel timing"]
        ),
      },
      {
        key: "message-editor",
        label: "Message Editor",
        view: makePlaceholderView(
          "Message Editor",
          "Compose and personalize multi-channel messaging templates.",
          ["Template blocks", "Personalization", "Preview modes"]
        ),
      },
      {
        key: "content-scheduler",
        label: "Content Scheduler",
        view: makePlaceholderView(
          "Content Scheduler",
          "Queue assets for automated delivery and performance tracking.",
          ["Asset library", "Scheduling", "Delivery status"]
        ),
      },
    ],
  },
  ERP: {
    label: "ERP",
    tabs: [
      {
        key: "dashboard",
        label: "Dashboard",
        view: renderErpDashboard,
      },
      {
        key: "asset-manager",
        label: "Asset Manager",
        view: makePlaceholderView(
          "Asset Manager",
          "Track critical assets, ownership, and lifecycle milestones.",
          ["Asset registry", "Lifecycle status", "Maintenance logs"]
        ),
      },
      {
        key: "finances",
        label: "Finances",
        view: makePlaceholderView(
          "Finances",
          "Monitor cash flow, budgets, and reporting obligations.",
          ["Budgeting", "Expense tracking", "Quarterly close"]
        ),
      },
      {
        key: "hr",
        label: "HR",
        view: makePlaceholderView(
          "HR Operations",
          "Manage workforce planning, onboarding, and compliance.",
          ["Hiring pipeline", "Headcount", "Compliance tasks"]
        ),
      },
      {
        key: "strategies",
        label: "Strategies",
        view: makePlaceholderView(
          "Strategies",
          "Align operational goals, initiatives, and OKR tracking.",
          ["OKR status", "Initiatives", "Risk mitigation"]
        ),
      },
      {
        key: "qa-risk",
        label: "QA & Risk",
        view: makePlaceholderView(
          "QA & Risk",
          "Track audits, assessments, and quality initiatives.",
          ["Audit log", "Risk register", "Mitigation plans"]
        ),
      },
      {
        key: "calendar",
        label: "Ops Calendar",
        view: makePlaceholderView(
          "Business Operations Planner",
          "Plan operations, key reviews, and delivery milestones.",
          ["Ops reviews", "Resource allocation", "Delivery milestones"]
        ),
      },
      {
        key: "products",
        label: "Products",
        view: renderProductsView,
      },
      {
        key: "orders",
        label: "Orders",
        view: renderOrdersView,
      },
    ],
  },
  SERVICE: {
    label: "Service",
    tabs: [
      {
        key: "dashboard",
        label: "Dashboard",
        view: renderSupportDashboard,
      },
      {
        key: "high-sla",
        label: "High SLA Tickets",
        view: makePlaceholderView(
          "High SLA Tickets",
          "Urgent cases requiring immediate response and escalation.",
          ["Critical incidents", "Escalations", "Executive visibility"]
        ),
      },
      {
        key: "mid-sla",
        label: "Mid SLA Tickets",
        view: makePlaceholderView(
          "Mid SLA Tickets",
          "Active cases with standard response windows.",
          ["Queue health", "Resolution rate", "Agent assignment"]
        ),
      },
      {
        key: "low-sla",
        label: "Low SLA Tickets",
        view: makePlaceholderView(
          "Low SLA Tickets",
          "Backlog and low urgency items prioritized by impact.",
          ["Backlog size", "Customer follow-ups", "Resolution pace"]
        ),
      },
      {
        key: "calendar",
        label: "Calendar",
        view: makePlaceholderView(
          "Support Calendar",
          "Schedule support rotations, coverage, and maintenance windows.",
          ["Coverage schedule", "Maintenance windows", "Team availability"]
        ),
      },
      {
        key: "tickets",
        label: "All Tickets",
        view: renderSupportTickets,
      },
    ],
  },
};

export const appOrder = ["CRM", "STUDIO", "ERP", "SERVICE"];

export function buildRoute(appCode, tabKey) {
  return `/app/${appCode}/${tabKey}`;
}

export function getDefaultRoute() {
  return buildRoute("CRM", "dashboard");
}

export function resolveRoute(path) {
  if (path.startsWith("/app/")) {
    const [, , appCode, tabKey] = path.split("/");
    return { appCode, tabKey };
  }

  const legacyMap = {
    "/crm": { appCode: "CRM", tabKey: "dashboard" },
    "/crm/contacts": { appCode: "CRM", tabKey: "contacts" },
    "/erp": { appCode: "ERP", tabKey: "dashboard" },
    "/erp/products": { appCode: "ERP", tabKey: "products" },
    "/erp/orders": { appCode: "ERP", tabKey: "orders" },
    "/studio": { appCode: "STUDIO", tabKey: "dashboard" },
    "/studio/campaigns": { appCode: "STUDIO", tabKey: "campaigns" },
    "/support": { appCode: "SERVICE", tabKey: "dashboard" },
    "/support/tickets": { appCode: "SERVICE", tabKey: "tickets" },
  };
  return legacyMap[path] || { appCode: "CRM", tabKey: "dashboard" };
}

export function getTabView(appCode, tabKey) {
  const app = appModules[appCode];
  if (!app) return null;
  return app.tabs.find((tab) => tab.key === tabKey)?.view || app.tabs[0]?.view;
}
