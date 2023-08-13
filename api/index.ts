//@ts-ignore
import wasm from "../qrlib/pkg/qrlib_bg.wasm?module";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import init, { qrsvg } from "../qrlib/pkg/qrlib";
export const config = {
  runtime: "edge",
};

const app = new Hono();

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
app.get("/test", async (c) => {
  await init(wasm);
  const qr = qrsvg("hi");
  console.log(qr);
  return c.html(qr);
});
app.get("*", async (c) => {
  let data = c.req.path.substring(1);
  const qr = "hi";

  if (qr) {
    return c.html(htmlqr(qr));
  }
  return c.html("Error");
});

export default handle(app);
