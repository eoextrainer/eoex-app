export const DEFAULT_PASSWORD = "EOEX2026!";

const users = [
  {
    id: "user-admin",
    name: "System Admin",
    role: "system-admin",
    app: "ALL",
    email: "admin@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "crm-manager",
    name: "CRM Manager",
    role: "manager",
    app: "CRM",
    email: "crm.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "studio-manager",
    name: "Studio Manager",
    role: "manager",
    app: "STUDIO",
    email: "studio.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "erp-manager",
    name: "ERP Manager",
    role: "manager",
    app: "ERP",
    email: "erp.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "service-manager",
    name: "Service Manager",
    role: "manager",
    app: "SERVICE",
    email: "service.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "crm-bizdev",
    name: "Business Development",
    role: "user",
    app: "CRM",
    email: "bizdev@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "crm-account",
    name: "Sales Account Manager",
    role: "user",
    app: "CRM",
    email: "account.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "studio-marketing",
    name: "Marketing Manager",
    role: "user",
    app: "STUDIO",
    email: "marketing.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "studio-digital",
    name: "Digital Marketing",
    role: "user",
    app: "STUDIO",
    email: "digital.marketing@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "studio-campaign",
    name: "Campaign Manager",
    role: "user",
    app: "STUDIO",
    email: "campaign.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "erp-hr",
    name: "HR Manager",
    role: "user",
    app: "ERP",
    email: "hr.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "erp-finance",
    name: "Accounting & Finance",
    role: "user",
    app: "ERP",
    email: "finance.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "erp-planning",
    name: "Resource Planning Manager",
    role: "user",
    app: "ERP",
    email: "planning.manager@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "erp-ceo",
    name: "CEO",
    role: "user",
    app: "ERP",
    email: "ceo@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "service-l1",
    name: "Level 1 Support",
    role: "user",
    app: "SERVICE",
    email: "support.l1@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "service-l2",
    name: "Level 2 Support",
    role: "user",
    app: "SERVICE",
    email: "support.l2@eoex.app",
    password: DEFAULT_PASSWORD,
  },
  {
    id: "service-l3",
    name: "Level 3 Support",
    role: "user",
    app: "SERVICE",
    email: "support.l3@eoex.app",
    password: DEFAULT_PASSWORD,
  },
];

const state = {
  enabledModules: ["CRM", "ERP", "STUDIO", "SERVICE"],
  tenant: { id: "demo-tenant", name: "Acme" },
  user: null,
  activeApp: "CRM",
  activeTab: "dashboard",
};

const listeners = new Set();

export function getState() {
  return { ...state };
}

export function setState(partial) {
  Object.assign(state, partial);
  listeners.forEach((cb) => cb(getState()));
}

export function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getUsers() {
  return [...users];
}

export function login(email, password) {
  const user = users.find(
    (candidate) =>
      candidate.email.toLowerCase() === email.toLowerCase() &&
      candidate.password === password
  );
  if (!user) return null;
  setState({ user });
  return user;
}

export function logout() {
  setState({ user: null });
}
