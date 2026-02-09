const API_BASE = "/api/v1";

let token = null;
let tenantId = null;

export function setToken(nextToken) {
  token = nextToken;
}

export function setTenant(nextTenantId) {
  tenantId = nextTenantId;
}

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(tenantId ? { "x-tenant-id": tenantId } : {}),
  };
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: buildHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
