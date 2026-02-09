import { apiGet } from "./apiClient.js";

const fallbackMeta = {
  crm_contact: {
    entity: { code: "crm_contact", name: "Contact" },
    fields: [
      { name: "First Name", code: "first_name", ui_component: "text", ui_order: 1 },
      { name: "Last Name", code: "last_name", ui_component: "text", ui_order: 2 },
      { name: "Email", code: "email", ui_component: "text", ui_order: 3 },
      { name: "Phone", code: "phone", ui_component: "text", ui_order: 4 },
      { name: "Job Title", code: "job_title", ui_component: "text", ui_order: 5 },
    ],
    layouts: [
      {
        layout_type: "list",
        config: { columns: ["first_name", "last_name", "email", "phone"] },
      },
      {
        layout_type: "form",
        config: {
          groups: [
            {
              title: "Main",
              fields: [
                "first_name",
                "last_name",
                "email",
                "phone",
                "job_title",
              ],
            },
          ],
        },
      },
    ],
  },
  erp_product: {
    entity: { code: "erp_product", name: "Product" },
    fields: [
      { name: "SKU", code: "sku", ui_component: "text", ui_order: 1 },
      { name: "Name", code: "name", ui_component: "text", ui_order: 2 },
      {
        name: "Price (cents)",
        code: "price_cents",
        ui_component: "number",
        ui_order: 3,
      },
      {
        name: "Stock Qty",
        code: "stock_qty",
        ui_component: "number",
        ui_order: 4,
      },
    ],
    layouts: [
      {
        layout_type: "list",
        config: { columns: ["sku", "name", "price_cents", "stock_qty"] },
      },
      {
        layout_type: "form",
        config: {
          groups: [
            {
              title: "Main",
              fields: ["sku", "name", "price_cents", "stock_qty"],
            },
          ],
        },
      },
    ],
  },
  erp_order: {
    entity: { code: "erp_order", name: "Order" },
    fields: [
      { name: "Order No", code: "order_no", ui_component: "text", ui_order: 1 },
      {
        name: "Status",
        code: "status",
        ui_component: "select",
        ui_order: 2,
        metadata: { options: ["draft", "confirmed", "shipped", "completed"] },
      },
    ],
    layouts: [
      {
        layout_type: "list",
        config: { columns: ["order_no", "status", "total_cents"] },
      },
      {
        layout_type: "form",
        config: { groups: [{ title: "Main", fields: ["order_no", "status"] }] },
      },
    ],
  },
  studio_campaign: {
    entity: { code: "studio_campaign", name: "Campaign" },
    fields: [
      { name: "Name", code: "name", ui_component: "text", ui_order: 1 },
      {
        name: "Channel",
        code: "channel",
        ui_component: "select",
        ui_order: 2,
        metadata: { options: ["email", "sms", "push"] },
      },
      {
        name: "Status",
        code: "status",
        ui_component: "select",
        ui_order: 3,
        metadata: { options: ["draft", "scheduled", "running", "paused"] },
      },
    ],
    layouts: [
      {
        layout_type: "list",
        config: { columns: ["name", "channel", "status"] },
      },
      {
        layout_type: "form",
        config: { groups: [{ title: "Main", fields: ["name", "channel", "status"] }] },
      },
    ],
  },
  support_ticket: {
    entity: { code: "support_ticket", name: "Ticket" },
    fields: [
      { name: "Subject", code: "subject", ui_component: "text", ui_order: 1 },
      {
        name: "Priority",
        code: "priority",
        ui_component: "select",
        ui_order: 2,
        metadata: { options: ["low", "normal", "high"] },
      },
      {
        name: "Status",
        code: "status",
        ui_component: "select",
        ui_order: 3,
        metadata: { options: ["new", "in_progress", "waiting", "resolved"] },
      },
      {
        name: "Description",
        code: "description",
        ui_component: "textarea",
        ui_order: 4,
      },
    ],
    layouts: [
      {
        layout_type: "list",
        config: { columns: ["subject", "priority", "status"] },
      },
      {
        layout_type: "form",
        config: {
          groups: [
            {
              title: "Main",
              fields: ["subject", "priority", "status", "description"],
            },
          ],
        },
      },
    ],
  },
};

export async function getEntityDefinition(code) {
  try {
    return await apiGet(`/meta/entities/${code}`);
  } catch (error) {
    if (fallbackMeta[code]) {
      return fallbackMeta[code];
    }
    throw error;
  }
}
