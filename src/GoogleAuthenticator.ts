import * as crypto from 'crypto';
/**
 * @author @raphaelvserafim 
 * Date: 25/Mar/2024
 * PHP: https://github.com/raphaelvserafim/google-authenticator 
 */

export class GoogleAuthenticator {

  private _codeLength: number;

  constructor() {
    this._codeLength = 6;
  }

  public createSecret(secretLength: number = 16): string {
    const buffer = crypto.randomBytes(secretLength);
    const base32Chars = this._getBase32LookupTable().slice(0, 32);
    let secret = '';
    for (let i = 0; i < buffer.length; i++) {
      secret += base32Chars[buffer[i] % 32];
    }
    return secret;
  }

  public getCode(secret: string, timeSlice: number | null = null): string {
    if (timeSlice === null) {
      timeSlice = Math.floor(Date.now() / 1000 / 30);
    }

    const secretKey = Buffer.from(this._base32Decode(secret), 'binary');
    const buffer = Buffer.alloc(8);
    buffer.writeUInt32BE(0, 0);
    buffer.writeUInt32BE(timeSlice, 4);

    const hmac = crypto.createHmac('sha1', secretKey);
    const hm = hmac.update(buffer).digest();
    const offset = hm[hm.length - 1] & 0x0F;
    const hashpart = hm.slice(offset, offset + 4);
    const value = hashpart.readUInt32BE() & 0x7FFFFFFF;
    const modulo = Math.pow(10, this._codeLength);
    const code = (value % modulo).toString().padStart(this._codeLength, '0');
    return code;
  }

  public getQRCodeGoogleUrl(name: string, secret: string, title: string | null = null): string {
    let issuer = '';
    if (title) {
      issuer = `&issuer=${encodeURIComponent(title)}`;
    }
    const urlencoded = `otpauth://totp/${encodeURIComponent(name)}?secret=${secret}${issuer}`;
    return `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${encodeURIComponent(urlencoded)}`;
  }

  public verifyCode(secret: string, code: string, discrepancy: number = 1, currentTimeSlice: number | null = null): boolean {
    if (currentTimeSlice === null) {
      currentTimeSlice = Math.floor(Date.now() / 1000 / 30);
    }
    for (let i = -discrepancy; i <= discrepancy; i++) {
      const calculatedCode = this.getCode(secret, currentTimeSlice + i);
      if (calculatedCode === code) {
        return true;
      }
    }
    return false;
  }

  public setCodeLength(length: number): void {
    this._codeLength = length;
  }

  private _base32Decode(secret: string): string {
    const base32Chars = this._getBase32LookupTable();
    let bits = '';
    for (let i = 0; i < secret.length; i++) {
      const val = base32Chars.indexOf(secret.charAt(i).toUpperCase());
      if (val >= 0) {
        bits += val.toString(2).padStart(5, '0');
      }
    }
    const bytes: number[] = [];
    for (let i = 0; i < bits.length; i += 8) {
      const byte = bits.substr(i, 8);
      bytes.push(parseInt(byte, 2));
    }

    return Buffer.from(bytes).toString('binary');
  }


  private _getBase32LookupTable(): string[] {
    return [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z', '2', '3', '4', '5', '6', '7',
      '='
    ];
  }
}


