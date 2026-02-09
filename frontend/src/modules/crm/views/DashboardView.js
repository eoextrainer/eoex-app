import { getEntityDefinition } from "../../../core/metadata.js";
import { apiGet } from "../../../core/apiClient.js";

async function safeLoadContacts() {
  try {
    return await apiGet("/crm/contacts");
  } catch (error) {
    return [];
  }
}

export async function renderCrmDashboard(root) {
  const container = document.createElement("div");
  container.className = "split";

  const overview = document.createElement("section");
  overview.className = "panel";
  overview.innerHTML = "<h2>CRM Overview</h2>";

  const meta = await getEntityDefinition("crm_contact");
  const contacts = await safeLoadContacts();

  const stats = document.createElement("div");
  stats.className = "notice";
  stats.textContent = `${contacts.length} ${meta.entity?.name || "Contacts"} in your pipeline.`;
  overview.appendChild(stats);

  const actions = document.createElement("div");
  actions.className = "form-grid";

  const contactsLink = document.createElement("a");
  contactsLink.className = "button";
  contactsLink.href = "#/crm/contacts";
  contactsLink.textContent = "Manage Contacts";

  actions.appendChild(contactsLink);
  overview.appendChild(actions);

  const highlights = document.createElement("section");
  highlights.className = "panel";
  highlights.innerHTML = "<h2>Highlights</h2>";

  const list = document.createElement("div");
  list.className = "status";
  if (contacts.length === 0) {
    list.textContent = "No contacts yet. Add your first contact to get started.";
  } else {
    const recent = contacts.slice(0, 3);
    list.textContent = `Recent contacts: ${recent
      .map((c) => `${c.first_name} ${c.last_name}`)
      .join(", ")}`;
  }
  highlights.appendChild(list);

  container.appendChild(overview);
  container.appendChild(highlights);
  root.appendChild(container);
}
