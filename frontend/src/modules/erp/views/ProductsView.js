import { apiGet, apiPost } from "../../../core/apiClient.js";
import { getEntityDefinition } from "../../../core/metadata.js";
import { renderForm } from "../../../core/ui/MetaFormRenderer.js";

let mockProducts = [
  { id: "sku-001", sku: "EOEX-001", name: "Starter Kit", price_cents: 1999, stock_qty: 40 },
];

async function fetchProducts() {
  try {
    return await apiGet("/erp/products");
  } catch (error) {
    return mockProducts;
  }
}

async function createProduct(payload) {
  try {
    return await apiPost("/erp/products", payload);
  } catch (error) {
    const next = {
      id: `mock-${Date.now()}`,
      ...payload,
    };
    mockProducts = [next, ...mockProducts];
    return next;
  }
}

export async function renderProductsView(root) {
  const metaDef = await getEntityDefinition("erp_product");
  const container = document.createElement("div");
  container.className = "split";

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  listPanel.innerHTML = "<h2>Products</h2>";
  const listContainer = document.createElement("div");
  listPanel.appendChild(listContainer);

  async function loadList() {
    const products = await fetchProducts();
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

    products.forEach((product) => {
      const row = document.createElement("tr");
      columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = product[col] ?? "";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    listContainer.appendChild(table);
  }

  const formPanel = document.createElement("section");
  formPanel.className = "panel";
  formPanel.innerHTML = "<h2>Add Product</h2>";

  renderForm(formPanel, metaDef, {}, async (payload) => {
    payload.price_cents = Number(payload.price_cents || 0);
    payload.stock_qty = Number(payload.stock_qty || 0);
    await createProduct(payload);
    await loadList();
  });

  container.appendChild(listPanel);
  container.appendChild(formPanel);
  root.appendChild(container);

  await loadList();
}
