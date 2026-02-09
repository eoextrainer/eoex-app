import { renderCrmDashboard } from "../modules/crm/views/DashboardView.js";
import { renderContactsView } from "../modules/crm/views/ContactsView.js";
import { renderErpDashboard } from "../modules/erp/views/DashboardView.js";
import { renderProductsView } from "../modules/erp/views/ProductsView.js";
import { renderOrdersView } from "../modules/erp/views/OrdersView.js";
import { renderStudioDashboard } from "../modules/studio/views/DashboardView.js";
import { renderCampaignsView } from "../modules/studio/views/CampaignsView.js";
import { renderSupportDashboard } from "../modules/support/views/DashboardView.js";
import { renderSupportTickets } from "../modules/support/views/TicketsView.js";

export const moduleRoutes = {
  CRM: {
    label: "CRM",
    path: "/crm",
    view: renderCrmDashboard,
    routes: {
      "/crm/contacts": renderContactsView,
    },
  },
  ERP: {
    label: "ERP",
    path: "/erp",
    view: renderErpDashboard,
    routes: {
      "/erp/products": renderProductsView,
      "/erp/orders": renderOrdersView,
    },
  },
  STUDIO: {
    label: "Studio",
    path: "/studio",
    view: renderStudioDashboard,
    routes: {
      "/studio/campaigns": renderCampaignsView,
    },
  },
  SUPPORT: {
    label: "Support",
    path: "/support",
    view: renderSupportDashboard,
    routes: {
      "/support/tickets": renderSupportTickets,
    },
  },
};
