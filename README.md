# @aprendizap/aws-lambda-responses

Um pequeno pacote para facilitar a criação de respostas para funções lambda.
Retorna a saída em string com headers para compatibilidade com CORS.

## Instalação

```bash
npm install @aprendizap/aws-lambda-responses
```

## Uso

Importe o módulo e utilize a função correspondente ao código para gerar a saída da sua função lambda.

```typescript
import Responses from '@aprendizap/aws-lambda-responses';

exports.handler = async (event) => {
  return Responses._200({ message: 'Hello World!' });
};
// output: {
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': '*',
//     'Access-Control-Allow-Credentials': true
//   },
//   statusCode: 200,
//   body: '{"error":false,"message":"Hello World!"}'
// }
```

Funciona também como um módulo CommonJS:

```javascript
const Responses = require('@aprendizap/aws-lambda-responses');

export const handler = async (event) => {
  return Responses._200({ message: 'Hello World!' });
};
```

Você pode passar mensagens de erro para os métodos que implementam o código de status 4xx:

```javascript
import Responses from '@aprendizap/aws-lambda-responses';

export const handler = async (event) => {
  return Responses._400('My bad!');
};
//output: {
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': '*',
//     'Access-Control-Allow-Credentials': true
//   },
//   statusCode: 400,
//   body: '{"error":true,"message":"My bad!"}'
// }
```

## Métodos disponíveis

Os métodos disponíveis e suas respectivas mensagens padrão são:

- \_200 -> (sem mensagem)
- \_303 -> (sem mensagem)
- \_400 -> There are missing or invalid parameters.
- \_429 -> Too many requests.
- \_403 -> Forbidden.
- \_404 -> Resource not found.
- \_500 -> Internal server error occurred.

### 200

O método aceita 2 tipos de parâmetros:

- Arrays: que serão emitidos na propriedade 'items'
- Objetos: que serão emitidos diretamente no objeto de resposta

A propriedade error é sempre false.

```javascript
Responses._200(); // Padrão sem mensagem
Responses._200({ message: 'Hello World!' }); // Objeto com propriedades
Responses._200(['Hello', 'World']); // Array
```

### Erros

Os métodos de erro aceitam strings para substituir a mensagem padrão e dados para serem adicionados ao body final.

```javascript
Responses._400(); // Padrão sem mensagem
Responses._400('My bad!'); // Substitui a mensagem padrão 'There are missing or invalid parameters'
Responses._400('My bad!', { foo: 'bar' }); // Adiciona a propriedade foo ao body
```

As outras respostas de erro funcionam da mesma forma.
