import { html } from "hono/html";

const createUrl = (example: string) => `https://hyperqr.xyz/${example}`;

const base = (body: any) => html`
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="stylesheet" href="style.css" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>hyperqr.xyz</title>
      <meta property="og:title" content="hyperqr.xyz" />
      <meta
        property="og:description"
        content="Generate QR codes for any URL, but hyper yk?"
      />
      <meta property="og:image" content="https://hyperqr.xyz/realogimage.svg" />
      <meta property="og:url" content="https://hyperqr.xyz" />
      <meta property="og:type" content="website" />
    </head>
    ${body}
    <footer style="position: absolute; bottom: 0">
      <span>
        Thanks to
        <a href="https://html.energy">html.energy</a>
        for the css!
      </span>
    </footer>
  </html>
`;

const row = (example: string) => (
  <tr>
    <td colspan="2">
      <a href={createUrl(example)}>{createUrl(example)}</a>
    </td>
  </tr>
);

const exampleTable = () => {
  const examples = [
    "wowwhatalongpasswordDiNB8azbz5Zq5@",
    "mailto:hi@weirdlongemail.com",
    "https://www.youtube.com/watch?v=TnsHcQYPFlY",
  ];

  return (
    <table
      class="container"
      style="text-align: left; font-family: monospace; font-size: 1rem"
    >
      ${examples.map((example) => row(example))}
    </table>
  );
};

const body = () => html`
  <body class="container">
    <a
      class="github-fork-ribbon"
      href="https://github.com/spookyuser/hyperqr"
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
    >
      Fork me on GitHub
    </a>
    <h3>u can put whatever u want after the /</h3>
    <h4>and get a qr code back :)</h4>
    ${exampleTable()}
  </body>
  )
`;

export const home = () => base(body());
