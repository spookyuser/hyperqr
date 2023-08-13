//@ts-ignore
// import wasm from "qrlib/qrlib_bg.wasm?module";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import init, { qr_svg, SvgOptions, Shape } from "fast_qr";
const options = new SvgOptions().shape(Shape.Square);

export const config = {
  runtime: "edge",
};

const app = new Hono();
let wasmInitialized = false;
const initializeWasm = async () => {
  if (!wasmInitialized) {
    await init();
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

app.get("*", async (c) => {
  let data = c.req.path.substring(1);
  await initializeWasm();
  const qr = qr_svg(data, options);
  if (qr) {
    return c.html(htmlqr(qr));
  }
  return c.html("Error");
});

export default handle(app);
