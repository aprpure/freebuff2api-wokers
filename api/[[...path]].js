import worker from "../worker.js";

const env = {
  FREEBUFF_TOKEN: process.env.FREEBUFF_TOKEN || "",
  FREEBUFF_API_KEY: process.env.FREEBUFF_API_KEY || "",
  FREEBUFF_DEBUG: process.env.FREEBUFF_DEBUG || "false",
  CODEBUFF_API: process.env.CODEBUFF_API || "",
  RELAY_KEY: process.env.RELAY_KEY || "",
};

function stripApiPrefix(request) {
  const url = new URL(request.url);
  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    url.pathname = url.pathname.slice(4) || "/";
    return new Request(url, request);
  }
  return request;
}

export default {
  fetch(request) {
    return worker.fetch(stripApiPrefix(request), env);
  },
};

export const config = {
  maxDuration: 300,
};
