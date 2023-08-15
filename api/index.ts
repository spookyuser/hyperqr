//@ts-ignore
import wasm from "fast_qr/fast_qr_bg.wasm?module";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { home } from "../pages/home";
import { jsx } from "hono/jsx";

import init, { qr_svg, SvgOptions, Shape } from "fast_qr";

export const config = {
  runtime: "edge",
};

const app = new Hono();
let wasmInitialized = false;
const initializeWasm = async () => {
  if (!wasmInitialized) {
    await init(wasm);
    wasmInitialized = true;
  }
};

app.get("/", async (c) => {
  c.res.headers.set("Cache-Control", "max-age=31536000 smax-age=0 immutable");
  let page = home();
  return c.html(page);
});

app.get("*", async (c) => {
  c.res.headers.set("Cache-Control", "max-age=31536000 smax-age=0 immutable");
  c.res.headers.set("Content-Type", "image/svg+xml");
  c.res.headers.set("Content-Disposition", `inline; filename="qrcode.svg"`);

  await initializeWasm();
  let data = decodeURIComponent(c.req.path.substring(1));
  const qr = qr_svg(data, new SvgOptions().shape(Shape.Square));
  if (qr) {
    return c.text(qr);
  }
  return c.text("Error");
});

export default handle(app);
