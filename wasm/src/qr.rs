use fast_qr::convert::svg::SvgBuilder;
use fast_qr::qr::QRBuilder;
use fast_qr::qr::Shape::Square;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn qrsvg(data: &str) -> String {
    // QRBuilder::new can fail if content is too big for version,
    // please check before unwrapping.
    let qrcode = QRBuilder::new(data).build().unwrap();
    let _svg = SvgBuilder::default().shape(Square).to_str(&qrcode);
    _svg
}

#[test]
fn test_qr() {
    let svg = qrsvg("Hello World");
    print!("{}", svg);
}
