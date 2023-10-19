import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

const alertInstance = new Alert();
alertInstance.AlertsDatafetch().then(() => alertInstance.buildAlertElements());
loadHeaderFooter();