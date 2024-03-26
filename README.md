# GoogleAuthenticator

Este projeto implementa um autenticador compatível com o Google Authenticator, fornecendo funcionalidades para geração de códigos TOTP (Time-based One-Time Password), verificação de códigos, geração de segredos e criação de URLs para códigos QR.

## Começando

Estas instruções vão te mostrar como obter uma cópia do projeto em funcionamento na sua máquina local para fins de desenvolvimento e teste.


```sh
 npm install
```

# Uso

```js
const authenticator = new GoogleAuthenticator();
const secret = authenticator.createSecret();
console.log({secret});
``` 

```js
 const url = authenticator.getQRCodeGoogleUrl('Test User', secret, 'Test Title');
console.log({ url });
``` 

```js
const code = authenticator.getCode(secret);
const isValid = authenticator.verifyCode(secret, code);
``` 
