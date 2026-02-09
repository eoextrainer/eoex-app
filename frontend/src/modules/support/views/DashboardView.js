import { apiGet } from "../../../core/apiClient.js";

async function safeLoadTickets() {
  try {
    return await apiGet("/support/tickets");
  } catch (error) {
    return [];
  }
}

export async function renderSupportDashboard(root) {
  const container = document.createElement("div");
  container.className = "split";

  const ticketsPanel = document.createElement("section");
  ticketsPanel.className = "panel";
  ticketsPanel.innerHTML = "<h2>Support Queue</h2>";

  const tickets = await safeLoadTickets();
  const notice = document.createElement("div");
  notice.className = "notice";
  notice.textContent = `${tickets.length} tickets awaiting action.`;
  ticketsPanel.appendChild(notice);

  const actions = document.createElement("div");
  actions.className = "form-grid";
  const ticketsLink = document.createElement("a");
  ticketsLink.className = "button";
  ticketsLink.href = "#/support/tickets";
  ticketsLink.textContent = "View Tickets";
  actions.appendChild(ticketsLink);
  ticketsPanel.appendChild(actions);

  const insightsPanel = document.createElement("section");
  insightsPanel.className = "panel";
  insightsPanel.innerHTML = "<h2>Service Health</h2>";
  const status = document.createElement("div");
  status.className = "status";
  status.textContent = "Self-healing jobs are configured for critical workflows.";
  insightsPanel.appendChild(status);

  container.appendChild(ticketsPanel);
  container.appendChild(insightsPanel);
  root.appendChild(container);
}
