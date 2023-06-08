import Constants from "expo-constants";

export default function () {
  //const inProduction = manifest.packagerOpts == null;
  const inProduction = process.env.NODE_ENV === "production";
  const inExpo = Constants.manifest && Constants.manifest.debuggerHost;

  const apiDomain = inProduction
    ? "mywebsite.com"
    : inExpo
    ? Constants.manifest?.debuggerHost!.split(`:`).shift()
    : "unknown";

  console.log("apiDomain:", apiDomain);

  const protocol = inProduction ? "https" : "http";

  const apiUrl = `${protocol}://${apiDomain}:5050`;
  console.log("apiUrl:", apiUrl);
  return apiUrl;
}
