import Constants from "expo-constants";
import { BACKEND_PORT, PROD_BACKEND_DOMAIN } from "../../../../config";

export default function () {
  //const inProduction = manifest.packagerOpts == null;
  const inProduction = process.env.NODE_ENV === "production";
  const inExpo = Constants.manifest && Constants.manifest.debuggerHost;

  const apiDomain = inProduction
    ? PROD_BACKEND_DOMAIN
    : inExpo
    ? Constants.manifest?.debuggerHost!.split(`:`).shift()
    : "unknown";

  console.log("apiDomain:", apiDomain);

  const protocol = inProduction ? "https" : "http";

  const apiUrl = `${protocol}://${apiDomain}:${BACKEND_PORT}`;
  console.log("apiUrl:", apiUrl);
  return apiUrl;
}
