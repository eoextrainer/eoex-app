import { apiGet } from "../../../core/apiClient.js";

async function safeLoadCampaigns() {
  try {
    return await apiGet("/studio/campaigns");
  } catch (error) {
    return [];
  }
}

export async function renderStudioDashboard(root) {
  const container = document.createElement("div");
  container.className = "split";

  const campaignsPanel = document.createElement("section");
  campaignsPanel.className = "panel";
  campaignsPanel.innerHTML = "<h2>Studio Campaigns</h2>";

  const campaigns = await safeLoadCampaigns();
  const notice = document.createElement("div");
  notice.className = "notice";
  notice.textContent = `${campaigns.length} campaigns in your studio.`;
  campaignsPanel.appendChild(notice);

  const actions = document.createElement("div");
  actions.className = "form-grid";
  const campaignsLink = document.createElement("a");
  campaignsLink.className = "button";
  campaignsLink.href = "#/studio/campaigns";
  campaignsLink.textContent = "Manage Campaigns";
  actions.appendChild(campaignsLink);
  campaignsPanel.appendChild(actions);

  const insightsPanel = document.createElement("section");
  insightsPanel.className = "panel";
  insightsPanel.innerHTML = "<h2>Insights</h2>";
  const status = document.createElement("div");
  status.className = "status";
  status.textContent = "Journey builder and automation hooks are ready to configure.";
  insightsPanel.appendChild(status);

  container.appendChild(campaignsPanel);
  container.appendChild(insightsPanel);
  root.appendChild(container);
}
