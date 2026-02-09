import { getState, getUsers, login, logout, setState } from "./store.js";
import {
  appModules,
  appOrder,
  buildRoute,
  getDefaultRoute,
  resolveRoute,
  getTabView,
  getVisibleApps,
} from "./moduleRegistry.js";
import { createLoginModal } from "./ui/LoginModal.js";

function buildTabs(appCode, activeTab) {
  const tabBar = document.createElement("nav");
  tabBar.className = "tab-bar";
  const app = appModules[appCode];
  if (!app) return tabBar;
  app.tabs.forEach((tab) => {
    const button = document.createElement("a");
    button.href = `#${buildRoute(appCode, tab.key)}`;
    button.className = "tab";
    button.textContent = tab.label;
    if (tab.key === activeTab) {
      button.classList.add("active");
    }
    tabBar.appendChild(button);
  });
  return tabBar;
}

function buildSidebar(activeApp, activeTab, visibleApps) {
  const sidebar = document.createElement("aside");
  sidebar.className = "app-sidebar";

  const brand = document.createElement("div");
  brand.className = "app-logo";
  brand.textContent = "EOEX";
  sidebar.appendChild(brand);

  const hamburger = document.createElement("button");
  hamburger.className = "hamburger";
  hamburger.type = "button";
  hamburger.textContent = "☰ SOSX Apps";
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
  sidebar.appendChild(hamburger);

  const list = document.createElement("div");
  list.className = "app-list";

  appOrder.forEach((appCode) => {
    if (!visibleApps.includes(appCode)) return;
    const app = appModules[appCode];
    if (!app) return;
    const section = document.createElement("details");
    section.open = appCode === activeApp;
    section.className = "app-group";

    const summary = document.createElement("summary");
    summary.textContent = app.label;
    section.appendChild(summary);

    const items = document.createElement("div");
    items.className = "app-items";
    app.tabs.forEach((tab) => {
      const link = document.createElement("a");
      link.href = `#${buildRoute(appCode, tab.key)}`;
      link.textContent = tab.label;
      if (appCode === activeApp && tab.key === activeTab) {
        link.classList.add("active");
      }
      items.appendChild(link);
    });
    section.appendChild(items);
    list.appendChild(section);
  });

  sidebar.appendChild(list);
  return sidebar;
}

function buildTopActions({ user, onLoginClick }) {
  const actions = document.createElement("div");
  actions.className = "top-actions";

  const bell = document.createElement("button");
  bell.className = "icon-button";
  bell.type = "button";
  bell.textContent = "🔔";
  actions.appendChild(bell);

  const setup = document.createElement("button");
  setup.className = "icon-button";
  setup.type = "button";
  setup.textContent = "⚙";
  actions.appendChild(setup);

  const loginButton = document.createElement("button");
  loginButton.className = "button secondary";
  loginButton.type = "button";
  loginButton.textContent = user ? `${user.name}` : "Login";
  loginButton.addEventListener("click", onLoginClick);
  actions.appendChild(loginButton);

  if (user) {
    const logoutButton = document.createElement("button");
    logoutButton.className = "button secondary";
    logoutButton.type = "button";
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", () => logout());
    actions.appendChild(logoutButton);
  }

  return actions;
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

  const tabsContainer = document.createElement("div");
  header.appendChild(tabsContainer);

  const actionsContainer = document.createElement("div");
  header.appendChild(actionsContainer);

  const body = document.createElement("div");
  body.className = "app-body";

  const content = document.createElement("main");
  content.className = "app-content";

  shell.appendChild(header);
  shell.appendChild(body);
  body.appendChild(content);
  root.appendChild(shell);

  let modalRef = null;

  function closeModal() {
    if (modalRef) {
      modalRef.remove();
      modalRef = null;
    }
  }

  function openLoginModal() {
    closeModal();
    const users = getUsers();
    const { user } = getState();
    modalRef = createLoginModal({
      users,
      currentUser: user,
      onLogin: (email, password) => {
        const loggedIn = login(email, password);
        if (loggedIn) {
          closeModal();
          render();
        }
        return loggedIn;
      },
      onClose: () => closeModal(),
    });
    document.body.appendChild(modalRef);
  }

  function ensureAuthenticated() {
    if (!getState().user) {
      openLoginModal();
    }
  }

  function render() {
    const path = window.location.hash.replace("#", "") || getDefaultRoute();
    const { appCode, tabKey } = resolveRoute(path);
    const { user } = getState();
    const visibleApps = getVisibleApps(user);

    const nextApp = visibleApps.includes(appCode)
      ? appCode
      : visibleApps[0] || "CRM";
    const nextTab = appModules[nextApp]?.tabs.find((tab) => tab.key === tabKey)
      ? tabKey
      : appModules[nextApp]?.tabs[0]?.key || "dashboard";

    setState({ activeApp: nextApp, activeTab: nextTab });

    tabsContainer.innerHTML = "";
    tabsContainer.appendChild(buildTabs(nextApp, nextTab));

    actionsContainer.innerHTML = "";
    actionsContainer.appendChild(buildTopActions({
      user,
      onLoginClick: openLoginModal,
    }));

    body.querySelector(".app-sidebar")?.remove();
    body.prepend(buildSidebar(nextApp, nextTab, visibleApps));

    content.innerHTML = "";
    const view = getTabView(nextApp, nextTab);
    if (view) {
      view(content);
    }
  }

  window.addEventListener("hashchange", render);
  render();
  ensureAuthenticated();
}
