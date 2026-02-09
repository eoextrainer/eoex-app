import {
  renderCrmAccounts,
  renderCrmCalendar,
  renderCrmCampaigns,
  renderCrmContacts,
  renderCrmDashboard,
  renderCrmLeads,
  renderCrmOpportunities,
  renderCrmReports,
  renderCrmTasks,
} from "../modules/crm/views/TabViews.js";
import {
  renderErpAssetManager,
  renderErpCalendar,
  renderErpDashboard,
  renderErpFinances,
  renderErpHr,
  renderErpQaRisk,
  renderErpStrategies,
} from "../modules/erp/views/TabViews.js";
import {
  renderStudioCalendar,
  renderStudioCampaigns,
  renderStudioContentScheduler,
  renderStudioDashboard,
  renderStudioLeads,
  renderStudioMessageEditor,
} from "../modules/studio/views/TabViews.js";
import {
  renderServiceCalendar,
  renderServiceDashboard,
  renderServiceHighSla,
  renderServiceLowSla,
  renderServiceMidSla,
} from "../modules/support/views/TabViews.js";
import {
  renderAdminDashboard,
  renderAdminReleases,
  renderAdminUsers,
} from "../modules/admin/views/TabViews.js";

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
        view: renderCrmCampaigns,
      },
      {
        key: "leads",
        label: "Leads",
        view: renderCrmLeads,
      },
      {
        key: "opportunities",
        label: "Opportunities",
        view: renderCrmOpportunities,
      },
      {
        key: "accounts",
        label: "Accounts",
        view: renderCrmAccounts,
      },
      {
        key: "contacts",
        label: "Contacts",
        view: renderCrmContacts,
      },
      {
        key: "tasks",
        label: "Tasks",
        view: renderCrmTasks,
      },
      {
        key: "reports",
        label: "Reports",
        view: renderCrmReports,
      },
      {
        key: "calendar",
        label: "Forecast Calendar",
        view: renderCrmCalendar,
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
        view: renderStudioCampaigns,
      },
      {
        key: "leads",
        label: "Leads",
        view: renderStudioLeads,
      },
      {
        key: "calendar",
        label: "Editorial Calendar",
        view: renderStudioCalendar,
      },
      {
        key: "message-editor",
        label: "Message Editor",
        view: renderStudioMessageEditor,
      },
      {
        key: "content-scheduler",
        label: "Content Scheduler",
        view: renderStudioContentScheduler,
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
        view: renderErpAssetManager,
      },
      {
        key: "finances",
        label: "Finances",
        view: renderErpFinances,
      },
      {
        key: "hr",
        label: "HR",
        view: renderErpHr,
      },
      {
        key: "strategies",
        label: "Strategies",
        view: renderErpStrategies,
      },
      {
        key: "qa-risk",
        label: "QA & Risk",
        view: renderErpQaRisk,
      },
      {
        key: "calendar",
        label: "Ops Calendar",
        view: renderErpCalendar,
      },
    ],
  },
  SERVICE: {
    label: "Service",
    tabs: [
      {
        key: "dashboard",
        label: "Dashboard",
        view: renderServiceDashboard,
      },
      {
        key: "high-sla",
        label: "High SLA Tickets",
        view: renderServiceHighSla,
      },
      {
        key: "mid-sla",
        label: "Mid SLA Tickets",
        view: renderServiceMidSla,
      },
      {
        key: "low-sla",
        label: "Low SLA Tickets",
        view: renderServiceLowSla,
      },
      {
        key: "calendar",
        label: "Calendar",
        view: renderServiceCalendar,
      },
    ],
  },
  ADMIN: {
    label: "Admin Portal",
    tabs: [
      {
        key: "dashboard",
        label: "Dashboard",
        view: renderAdminDashboard,
      },
      {
        key: "users",
        label: "Users",
        view: renderAdminUsers,
      },
      {
        key: "releases",
        label: "Releases",
        view: renderAdminReleases,
      },
    ],
  },
};

export const appOrder = ["CRM", "STUDIO", "ERP", "SERVICE", "ADMIN"];

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
    "/studio": { appCode: "STUDIO", tabKey: "dashboard" },
    "/support": { appCode: "SERVICE", tabKey: "dashboard" },
    "/admin": { appCode: "ADMIN", tabKey: "dashboard" },
  };
  return legacyMap[path] || { appCode: "CRM", tabKey: "dashboard" };
}

export function getTabView(appCode, tabKey) {
  const app = appModules[appCode];
  if (!app) return null;
  return app.tabs.find((tab) => tab.key === tabKey)?.view || app.tabs[0]?.view;
}

export function getVisibleApps(user) {
  if (!user) return [];
  if (user.role === "system-admin" || user.app === "ALL") {
    return appOrder;
  }
  return appOrder.filter((appCode) => appCode === user.app);
}
