// Auto-generated with deno_bindgen
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL("../target/debug", import.meta.url)

let uri = url.pathname
if (!uri.endsWith("/")) uri += "/"

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === "windows") {
  uri = uri.replace(/\//g, "\\")
  // Remove leading slash
  if (uri.startsWith("\\")) {
    uri = uri.slice(1)
  }
}

const { symbols } = Deno.dlopen(
  {
    darwin: uri + "libqrlib.dylib",
    windows: uri + "qrlib.dll",
    linux: uri + "libqrlib.so",
    freebsd: uri + "libqrlib.so",
    netbsd: uri + "libqrlib.so",
    aix: uri + "libqrlib.so",
    solaris: uri + "libqrlib.so",
    illumos: uri + "libqrlib.so",
  }[Deno.build.os],
  {
    qrsvg: {
      parameters: ["buffer", "usize"],
      result: "buffer",
      nonblocking: false,
    },
  },
)

export function qrsvg(a0: string) {
  const a0_buf = encode(a0)

  const rawResult = symbols.qrsvg(a0_buf, a0_buf.byteLength)
  const result = readPointer(rawResult)
  return decode(result)
}
