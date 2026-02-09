import { apiGet, apiPost } from "../../../core/apiClient.js";
import { getEntityDefinition } from "../../../core/metadata.js";
import { renderForm } from "../../../core/ui/MetaFormRenderer.js";

let mockContacts = [
  {
    id: "demo-1",
    first_name: "Lena",
    last_name: "Stone",
    email: "lena@eoex.dev",
    phone: "+1-555-0123",
    job_title: "Head of Growth",
  },
];

async function fetchContacts() {
  try {
    return await apiGet("/crm/contacts");
  } catch (error) {
    return mockContacts;
  }
}

async function createContact(payload) {
  try {
    return await apiPost("/crm/contacts", payload);
  } catch (error) {
    const next = {
      id: `mock-${Date.now()}`,
      ...payload,
    };
    mockContacts = [next, ...mockContacts];
    return next;
  }
}

export async function renderContactsView(root) {
  const metaDef = await getEntityDefinition("crm_contact");

  const container = document.createElement("div");
  container.className = "split";

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  listPanel.innerHTML = "<h2>Contacts</h2>";

  const listContainer = document.createElement("div");
  listPanel.appendChild(listContainer);

  async function loadList() {
    const contacts = await fetchContacts();
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

    contacts.forEach((contact) => {
      const row = document.createElement("tr");
      columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = contact[col] ?? "";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    listContainer.appendChild(table);
  }

  const formPanel = document.createElement("section");
  formPanel.className = "panel";
  formPanel.innerHTML = "<h2>Add Contact</h2>";

  renderForm(formPanel, metaDef, {}, async (payload) => {
    await createContact(payload);
    await loadList();
  });

  container.appendChild(listPanel);
  container.appendChild(formPanel);
  root.appendChild(container);

  await loadList();
}
