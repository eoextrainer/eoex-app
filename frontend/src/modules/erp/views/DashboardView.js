import { apiGet } from "../../../core/apiClient.js";

async function safeLoadProducts() {
  try {
    return await apiGet("/erp/products");
  } catch (error) {
    return [];
  }
}

export async function renderErpDashboard(root) {
  const container = document.createElement("div");
  container.className = "split";

  const inventoryPanel = document.createElement("section");
  inventoryPanel.className = "panel";
  inventoryPanel.innerHTML = "<h2>ERP Inventory</h2>";

  const products = await safeLoadProducts();
  const notice = document.createElement("div");
  notice.className = "notice";
  notice.textContent = `${products.length} products tracked across warehouses.`;
  inventoryPanel.appendChild(notice);

  const actions = document.createElement("div");
  actions.className = "form-grid";
  const productsLink = document.createElement("a");
  productsLink.className = "button";
  productsLink.href = "#/erp/products";
  productsLink.textContent = "Manage Products";
  actions.appendChild(productsLink);
  inventoryPanel.appendChild(actions);

  const ordersPanel = document.createElement("section");
  ordersPanel.className = "panel";
  ordersPanel.innerHTML = "<h2>Orders</h2>";
  const ordersLink = document.createElement("a");
  ordersLink.className = "button secondary";
  ordersLink.href = "#/erp/orders";
  ordersLink.textContent = "View Orders";
  ordersPanel.appendChild(ordersLink);

  container.appendChild(inventoryPanel);
  container.appendChild(ordersPanel);
  root.appendChild(container);
}
