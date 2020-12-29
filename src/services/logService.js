// import Raven from "raven-js";
function init() {
  //   Raven.config(
  //     "https://9e87204acdce4d4295b755e7182db7fd@o410149.ingest.sentry.io/5563753",
  //     {
  //       release: "myapp@1.3.0",
  //     }
  //   ).install();
}
function log(error) {
  // Raven.captureException(error);
  console.log(error);
}
export default {
  init,
  log,
};
