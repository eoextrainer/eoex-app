import { describe, expect, it } from "vitest";
import {
  appModules,
  appOrder,
  buildRoute,
  resolveRoute,
  getVisibleApps,
} from "../core/moduleRegistry.js";
import { DEFAULT_PASSWORD, getUsers, login, logout, getState } from "../core/store.js";

describe("EOEX app config", () => {
  it("includes all expected apps", () => {
    expect(appOrder).toEqual(["CRM", "STUDIO", "ERP", "SERVICE", "ADMIN"]);
    expect(appModules.CRM).toBeTruthy();
    expect(appModules.STUDIO).toBeTruthy();
    expect(appModules.ERP).toBeTruthy();
    expect(appModules.SERVICE).toBeTruthy();
    expect(appModules.ADMIN).toBeTruthy();
  });

  it("resolves routes correctly", () => {
    const route = buildRoute("CRM", "dashboard");
    expect(resolveRoute(route)).toEqual({ appCode: "CRM", tabKey: "dashboard" });
  });
});

describe("Authentication", () => {
  it("logs in all test users", () => {
    getUsers().forEach((user) => {
      const loggedIn = login(user.email, DEFAULT_PASSWORD);
      expect(loggedIn).toBeTruthy();
      expect(getState().user?.email).toBe(user.email);
      logout();
    });
  });

  it("limits visible apps based on role", () => {
    const users = getUsers();
    const admin = users.find((user) => user.role === "system-admin");
    const crmUser = users.find((user) => user.app === "CRM");
    const serviceUser = users.find((user) => user.app === "SERVICE");

    expect(getVisibleApps(admin)).toEqual(["CRM", "STUDIO", "ERP", "SERVICE", "ADMIN"]);
    expect(getVisibleApps(crmUser)).toEqual(["CRM"]);
    expect(getVisibleApps(serviceUser)).toEqual(["SERVICE"]);
  });
});
