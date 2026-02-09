import { apiGet, apiPost } from "../../../core/apiClient.js";
import { getEntityDefinition } from "../../../core/metadata.js";
import { renderForm } from "../../../core/ui/MetaFormRenderer.js";

let mockCampaigns = [
  { id: "camp-001", name: "Spring Launch", channel: "email", status: "draft" },
];

async function fetchCampaigns() {
  try {
    return await apiGet("/studio/campaigns");
  } catch (error) {
    return mockCampaigns;
  }
}

async function createCampaign(payload) {
  try {
    return await apiPost("/studio/campaigns", payload);
  } catch (error) {
    const next = {
      id: `mock-${Date.now()}`,
      ...payload,
    };
    mockCampaigns = [next, ...mockCampaigns];
    return next;
  }
}

export async function renderCampaignsView(root) {
  const metaDef = await getEntityDefinition("studio_campaign");
  const container = document.createElement("div");
  container.className = "split";

  const listPanel = document.createElement("section");
  listPanel.className = "panel";
  listPanel.innerHTML = "<h2>Campaigns</h2>";
  const listContainer = document.createElement("div");
  listPanel.appendChild(listContainer);

  async function loadList() {
    const campaigns = await fetchCampaigns();
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

    campaigns.forEach((campaign) => {
      const row = document.createElement("tr");
      columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = campaign[col] ?? "";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    listContainer.appendChild(table);
  }

  const formPanel = document.createElement("section");
  formPanel.className = "panel";
  formPanel.innerHTML = "<h2>Create Campaign</h2>";

  renderForm(formPanel, metaDef, {}, async (payload) => {
    await createCampaign(payload);
    await loadList();
  });

  container.appendChild(listPanel);
  container.appendChild(formPanel);
  root.appendChild(container);

  await loadList();
}
