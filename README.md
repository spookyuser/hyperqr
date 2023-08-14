# quickqr

This is a simple website where you can get back a .svg with whatever you put after the / in the url. 

## why
sometimes when i need text from someone elses computer, i dont want to type it out or paste it into a weird website.

## how
Currently this runs on the vercel edge and the main qr generator is [fast_qr](https://github.com/erwanvivien/fast_qr) which uses wasm to generate the qrcodes.

## important
There's a patches folder bc if you leave the link to `fast_qr_bg.wasm` anywhere in the js vercel freaks out, i think you could also add ?module after it, but i just removed the line. I think this comes from wasm-pack so maybe someone should make a pr that removes this line, me? okay fine. It took really long to debug this and idk why i even cared so i'm just gonna put the error here in case someone from google runs into the same problem.

```
Error: The Edge Function "api/index" is referencing unsupported modules:
        - fast_qr: vc-blob-asset:fast_qr_bg.wasm
```

## Cool things
You can kinda use this like unsplash used to work too so if i have some text and want to get a qr code anywhere in markdown or html or whatevs I can just do

`![qr code for this page](https://quickqr-spookyuser.vercel.app/github.com)`

and you get:

![qr code for this page](https://quickqr-spookyuser.vercel.app/github.com)


