import { describe, expect, it } from "vitest";
import { appModules, appOrder, buildRoute, resolveRoute } from "../core/moduleRegistry.js";
import { DEFAULT_PASSWORD, getUsers, login, logout, getState } from "../core/store.js";

describe("EOEX app config", () => {
  it("includes all expected apps", () => {
    expect(appOrder).toEqual(["CRM", "STUDIO", "ERP", "SERVICE"]);
    expect(appModules.CRM).toBeTruthy();
    expect(appModules.STUDIO).toBeTruthy();
    expect(appModules.ERP).toBeTruthy();
    expect(appModules.SERVICE).toBeTruthy();
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
});
