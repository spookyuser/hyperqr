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
  }
};

const htmlqr = (qrsvg: string) => `
<!DOCTYPE html>
 <html>
    <head>
      <title>QR Code Generator</title>
      <style>
        body {
          display: flex;
          justify-content: center; 
          align-items: center;     
          margin: 0;               
        }
        svg {
          max-width: 80vh;
        }
      </style>
    </head>
    <body>
      ${qrsvg}
    </body>
  </html>
`;

app.get("/svg/*", async (c) => {
  let data = c.req.path.substring(1);
  await initializeWasm();
  const qr = qr_svg(data, new SvgOptions().shape(Shape.Square));
  c.res.headers.set("Content-Type", "image/svg+xml");
  if (qr) {
    return c.text(qr);
  }
  return c.text("Error");
});

app.get("*", async (c) => {
  let data = c.req.path.substring(1);
  await initializeWasm();
  const qr = qr_svg(data, new SvgOptions().shape(Shape.Square));
  if (qr) {
    return c.html(htmlqr(qr));
  }
  return c.html("Error");
});

export default handle(app);
