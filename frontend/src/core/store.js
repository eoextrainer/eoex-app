const state = {
  enabledModules: ["CRM", "ERP", "STUDIO", "SUPPORT"],
  tenant: { id: "demo-tenant", name: "Acme" },
  user: { id: "demo-user", name: "Alex Morgan" },
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
