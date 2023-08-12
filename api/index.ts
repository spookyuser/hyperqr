import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono();

import QRCode from "qrcode";

const generateQR = async (data: string) => {
  try {
    return QRCode.toString(data, { type: "svg" });
  } catch (err) {
    console.error(err);
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
  const qr = await generateQR(data);

  if (qr) {
    return c.html(htmlqr(qr));
  }
  return c.html("Error");
});

export default handle(app);
