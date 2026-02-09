import {
  renderKpiTiles,
  renderGroupedCards,
  renderListView,
} from "../../../core/ui/ViewBuilders.js";
import { getUsers } from "../../../core/store.js";

export function renderAdminDashboard(root) {
  renderKpiTiles(root, [
    { label: "Active Users", value: "17", meta: "All modules" },
    { label: "Active Apps", value: "4", meta: "CRM, Studio, ERP, Service" },
    { label: "Releases", value: "2", meta: "Stable tags" },
    { label: "Health", value: "Healthy", meta: "No alerts" },
  ]);

  renderGroupedCards(root, [
    {
      title: "Governance",
      cards: [
        { title: "Impersonation", status: "Enabled" },
        { title: "Access Reviews", status: "Monthly" },
      ],
    },
    {
      title: "Platform",
      cards: [
        { title: "Feature Flags", value: "8" },
        { title: "Audit Logs", value: "120 events" },
      ],
    },
  ]);
}

export function renderAdminUsers(root) {
  const users = getUsers();
  renderListView(root, {
    title: "User Directory",
    subtitle: "System-wide access overview.",
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "app", label: "App" },
      { key: "email", label: "Email" },
    ],
    rows: users,
  });
}

export function renderAdminReleases(root) {
  renderGroupedCards(root, [
    {
      title: "Stable Releases",
      cards: [
        { title: "stable-2026-02-09", status: "Current" },
        { title: "stable-2026-02-09-2", status: "Snapshot" },
      ],
    },
    {
      title: "Rollback Plan",
      cards: [
        { title: "Fallback Tag", value: "stable-2026-02-09" },
        { title: "Regression Suite", value: "Automated" },
      ],
    },
  ]);
}
