use deno_bindgen::deno_bindgen;
use fast_qr::convert::{svg::SvgBuilder, Builder, Shape};
use fast_qr::qr::QRBuilder;

#[deno_bindgen]
fn qrsvg(data: &str) -> String {
    // QRBuilder::new can fail if content is too big for version,
    // please check before unwrapping.
    let qrcode = QRBuilder::new(data).build().unwrap();

    let _svg = SvgBuilder::default()
        .shape(Shape::Square)
        .to_str(&qrcode);

    _svg
}
