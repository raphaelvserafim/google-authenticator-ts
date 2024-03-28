# Google Authenticator

Este projeto implementa um autenticador compatível com o Google Authenticator, fornecendo funcionalidades para geração de códigos TOTP (Time-based One-Time Password), verificação de códigos, geração de segredos e criação de URLs para códigos QR.

## Começando

Estas instruções vão te mostrar como obter uma cópia do projeto em funcionamento na sua máquina local para fins de desenvolvimento e teste.

```sh
npm i @raphaelvserafim/google-authenticator
```

# Uso
```ts
import { GoogleAuthenticator } from "@raphaelvserafim/google-authenticator";
```
### ou
```js
const { GoogleAuthenticator } = require("@raphaelvserafim/google-authenticator");
```

## Gerando um Segredo para Autenticação:
```js
const authenticator = new GoogleAuthenticator();
const secret = authenticator.createSecret();
console.log({secret});
``` 

## Criando uma URL do Qrcode:
```js
const url = authenticator.getQRCodeGoogleUrl('Test User', secret, 'Test Title');
console.log({ url });
``` 

## Verificando um Código TOTP:
```js
const isValid = authenticator.verifyCode(secret, code);
``` 
