import "./styles.css";
import { initRouter } from "./core/router.js";
import { applyTheme } from "./core/ui/theme.js";
import { initSkins } from "./core/ui/skins.js";
import { initAnimations } from "./core/ui/animations.js";

applyTheme("default");
initSkins();
initAnimations();

const appRoot = document.getElementById("app");
initRouter(appRoot);
