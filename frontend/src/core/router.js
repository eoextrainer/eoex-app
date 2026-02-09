import { getState } from "./store.js";
import { moduleRoutes } from "./moduleRegistry.js";

function buildNav(activePath) {
  const nav = document.createElement("nav");
  nav.className = "nav-links";
  const { enabledModules } = getState();
  enabledModules.forEach((code) => {
    const mod = moduleRoutes[code];
    if (!mod) return;
    const link = document.createElement("a");
    link.href = `#${mod.path}`;
    link.textContent = mod.label;
    if (activePath.startsWith(mod.path)) {
      link.classList.add("active");
    }
    nav.appendChild(link);
  });
  return nav;
}

function resolveRoute(path) {
  const flatRoutes = {};
  Object.values(moduleRoutes).forEach((mod) => {
    flatRoutes[mod.path] = mod.view;
    Object.entries(mod.routes || {}).forEach(([subPath, view]) => {
      flatRoutes[subPath] = view;
    });
  });
  return flatRoutes[path] || flatRoutes["/crm"];
}

export function initRouter(root) {
  const shell = document.createElement("div");
  shell.className = "app-shell";

  const header = document.createElement("header");
  header.className = "app-header";
  const title = document.createElement("div");
  title.className = "app-title";
  title.textContent = "EOEX Platform";
  header.appendChild(title);

  const navContainer = document.createElement("div");
  header.appendChild(navContainer);

  const content = document.createElement("main");
  content.className = "app-content";

  shell.appendChild(header);
  shell.appendChild(content);
  root.appendChild(shell);

  function render() {
    const path = window.location.hash.replace("#", "") || "/crm";
    navContainer.innerHTML = "";
    navContainer.appendChild(buildNav(path));
    content.innerHTML = "";
    const view = resolveRoute(path);
    view(content);
  }

  window.addEventListener("hashchange", render);
  render();
}
