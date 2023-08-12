import pogo from "https://deno.land/x/pogo/main.ts";
import { qrsvg } from "./qrlib/bindings/bindings.ts";

const server = pogo.server({ port: 8000 });

server.router.get("/{any*}", async (request, h) => {
  const origin = request.origin;
  const href = request.href;
  const data = href.replace(origin + "/", "");
  const svg = await qrsvg(data);

  return `
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
      ${svg}
    </body>
  </html>
  `;
});

server.start();
