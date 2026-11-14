// Runs in front of the static export (wrangler.jsonc: run_worker_first) so the
// bare domain and plain http can be sent to https://www in one hop:
// _redirects only matches paths, not hosts or schemes.
const APEX = "velloxstudio.com";
const CANONICAL = "www.velloxstudio.com";

type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const ours = url.hostname === APEX || url.hostname === CANONICAL;
    if (ours && (url.hostname === APEX || url.protocol === "http:")) {
      url.hostname = CANONICAL;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    const response = await env.ASSETS.fetch(request);
    // The assets layer sends /about/ to /about with a temporary 307. The move
    // is permanent, so say so: search engines then keep only the short URL.
    const location = response.headers.get("Location");
    if (response.status === 307 && location) {
      return new Response(null, { status: 301, headers: { Location: location } });
    }
    return response;
  },
};

export default worker;
