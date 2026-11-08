import { describe, expect, it } from "bun:test";
import worker from "./index";

const served: string[] = [];
const env = {
  ASSETS: {
    fetch: async (request: Request) => {
      served.push(request.url);
      return new Response("asset");
    },
  },
};

describe("worker", () => {
  it("sends the bare domain to www with a permanent redirect, keeping path and query", async () => {
    const response = await worker.fetch(new Request("https://velloxstudio.com/ar/portfolio/amank?x=1"), env);
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://www.velloxstudio.com/ar/portfolio/amank?x=1");
  });

  it("sends plain http to https www in a single hop", async () => {
    for (const from of ["http://velloxstudio.com/contact", "http://www.velloxstudio.com/contact"]) {
      const response = await worker.fetch(new Request(from), env);
      expect(response.status).toBe(301);
      expect(response.headers.get("location")).toBe("https://www.velloxstudio.com/contact");
    }
  });

  it("serves the static files on www", async () => {
    const response = await worker.fetch(new Request("https://www.velloxstudio.com/contact"), env);
    expect(await response.text()).toBe("asset");
    expect(served).toContain("https://www.velloxstudio.com/contact");
  });

  it("serves other hosts, such as the workers.dev preview, unchanged", async () => {
    const response = await worker.fetch(new Request("https://round-math-59b4.example.workers.dev/"), env);
    expect(response.status).toBe(200);
  });
});
