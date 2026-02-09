import { apiGet, apiPost } from "../../../core/apiClient.js";
import { getEntityDefinition } from "../../../core/metadata.js";
import { renderForm } from "../../../core/ui/MetaFormRenderer.js";

let mockOrders = [
  { id: "ord-001", order_no: "ORD-1001", status: "draft", total_cents: 0 },
];

async function fetchOrders() {
  try {
    return await apiGet("/erp/orders");
  } catch (error) {
    return mockOrders;
  }
}

async function createOrder(payload) {
  try {
    return await apiPost("/erp/orders", payload);
  } catch (error) {
    const next = {
      id: `mock-${Date.now()}`,
      total_cents: payload.total_cents ?? 0,
      ...payload,
    };
    mockOrders = [next, ...mockOrders];
    return next;
  }
}

export async function renderOrdersView(root) {
  const metaDef = await getEntityDefinition("erp_order");
  const container = document.createElement("div");
  container.className = "split";

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  listPanel.innerHTML = "<h2>Orders</h2>";
  const listContainer = document.createElement("div");
  listPanel.appendChild(listContainer);

  async function loadList() {
    const orders = await fetchOrders();
    const columns = metaDef.layouts.find((layout) => layout.layout_type === "list")
      ?.config?.columns || [];

    listContainer.innerHTML = "";
    const table = document.createElement("table");
    table.className = "data-table";

    const headRow = document.createElement("tr");
    columns.forEach((col) => {
      const th = document.createElement("th");
      th.textContent = metaDef.fields.find((field) => field.code === col)?.name || col;
      headRow.appendChild(th);
    });
    table.appendChild(headRow);

    orders.forEach((order) => {
      const row = document.createElement("tr");
      columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = order[col] ?? "";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    listContainer.appendChild(table);
  }

  const formPanel = document.createElement("section");
  formPanel.className = "panel";
  formPanel.innerHTML = "<h2>Create Order</h2>";

  renderForm(formPanel, metaDef, {}, async (payload) => {
    await createOrder(payload);
    await loadList();
  });

  container.appendChild(listPanel);
  container.appendChild(formPanel);
  root.appendChild(container);

  await loadList();
}
