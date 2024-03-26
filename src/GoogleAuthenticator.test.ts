import { GoogleAuthenticator } from "./GoogleAuthenticator";

describe('GoogleAuthenticator', () => {
  let authenticator: GoogleAuthenticator;

  beforeEach(() => {
    authenticator = new GoogleAuthenticator();
  });

  test('createSecret generates a non-empty string', () => {
    const secret = authenticator.createSecret();
    expect(secret).not.toBe('');
  });

  test('getCode generates a valid code', () => {
    const secret = authenticator.createSecret();
    const code = authenticator.getCode(secret);
    expect(code).toMatch(/^\d{6}$/);
  });

  test('getQRCodeGoogleUrl generates a valid URL', () => {
    const secret = authenticator.createSecret();
    const url = authenticator.getQRCodeGoogleUrl('Test User', secret, 'Test Title');
    console.log({ url });

  });

  test('verifyCode validates a correct token', () => {
    const secret = authenticator.createSecret();
    const code = authenticator.getCode(secret);
    const isValid = authenticator.verifyCode(secret, code);
    expect(isValid).toBe(true);
  });

  test('verifyCode invalidates an incorrect token', () => {
    const secret = authenticator.createSecret();
    const incorrectCode = '123456';
    const isValid = authenticator.verifyCode(secret, incorrectCode);
    expect(isValid).toBe(false);
  });
});
