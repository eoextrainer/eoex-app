import { apiGet, apiPost } from "../../../core/apiClient.js";
import { getEntityDefinition } from "../../../core/metadata.js";
import { renderForm } from "../../../core/ui/MetaFormRenderer.js";

let mockTickets = [
  {
    id: "tkt-001",
    subject: "Login issue",
    priority: "high",
    status: "new",
    description: "User cannot sign in with SSO.",
  },
];

async function fetchTickets() {
  try {
    return await apiGet("/support/tickets");
  } catch (error) {
    return mockTickets;
  }
}

async function createTicket(payload) {
  try {
    return await apiPost("/support/tickets", payload);
  } catch (error) {
    const next = {
      id: `mock-${Date.now()}`,
      ...payload,
    };
    mockTickets = [next, ...mockTickets];
    return next;
  }
}

export async function renderSupportTickets(root) {
  const metaDef = await getEntityDefinition("support_ticket");
  const container = document.createElement("div");
  container.className = "split";

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  listPanel.innerHTML = "<h2>Tickets</h2>";
  const listContainer = document.createElement("div");
  listPanel.appendChild(listContainer);

  async function loadList() {
    const tickets = await fetchTickets();
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

    tickets.forEach((ticket) => {
      const row = document.createElement("tr");
      columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = ticket[col] ?? "";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    listContainer.appendChild(table);
  }

  const formPanel = document.createElement("section");
  formPanel.className = "panel";
  formPanel.innerHTML = "<h2>Create Ticket</h2>";

  renderForm(formPanel, metaDef, {}, async (payload) => {
    await createTicket(payload);
    await loadList();
  });

  container.appendChild(listPanel);
  container.appendChild(formPanel);
  root.appendChild(container);

  await loadList();
}
