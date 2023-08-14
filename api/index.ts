//@ts-ignore
import wasm from "fast_qr/fast_qr_bg.wasm?module";
import { Hono } from "hono";
import { handle } from "hono/vercel";
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

app.get("*", async (c) => {
  let data = c.req.path.substring(1);
  await initializeWasm();
  const qr = qr_svg(data, new SvgOptions().shape(Shape.Square));
  c.res.headers.set("Cache-Control", "max-age=31536000 smax-age=0 immutable");
  c.res.headers.set("Content-Type", "image/svg+xml");
  if (qr) {
    return c.text(qr);
  }
  return c.text("Error");
});

export default handle(app);
