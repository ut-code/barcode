import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeScannerId = "qrcode-scanner";

export default function QrcodeScanner() {
  useEffect(() => {
    const qrcodeScanner = new Html5QrcodeScanner(
      qrcodeScannerId,
      {
        fps: 10,
      },
      false,
    );
    qrcodeScanner.render(
      (decodedText) => {
        alert(decodedText);
      },
      () => {},
    );
    return () => {
      qrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear Html5QrcodeScanner.", error);
      });
    };
  });

  return <div id={qrcodeScannerId}></div>;
}
