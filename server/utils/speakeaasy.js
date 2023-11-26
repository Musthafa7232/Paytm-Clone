import speakeasy from "speakeasy";
import qrcode from "qrcode";

export const generateQr = async () => {
  const secret = speakeasy.generateSecret({ length: 20 });

  const otpauthURL = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: "PaytmClone",
    issuer: "PaytmClone",
  });

  console.log("OTP Auth URL:", otpauthURL);

  const qrCodeDataUrl = await qrcode.toDataURL(otpauthURL);

  console.log("QR Code Data URL:", qrCodeDataUrl);

return {secret:secret,qr:qrCodeDataUrl}
};


export const verifySecret=(userSecret,otp)=>{
    const verificationResult = speakeasy.totp.verify({
    secret: userSecret,
    encoding: 'ascii',
    token: otp,
  });
  console.log(verificationResult);
  if (verificationResult) {
   return true
  } else {
    console.log('Invalid TOTP');
    throw new Error('Invalid TOTP');
  }
}
