[![Coverage Status](https://coveralls.io/repos/github/ufabc-code/learning-platform/badge.svg?branch=main)](https://coveralls.io/github/ufabc-code/learning-platform?branch=main)

# Instruções

## Softwares necessários

```
Node: v14+
NPM: v6+
```

## Instalação de dependencias

Após clonar este repositório, entre na pasta do projeto e instale as dependencias

```bash
cd learning-platform
npm install
```

## Executar o código

O comando a seguir irá utilizar da porta 3000 do localhost para expor a aplicação
http://localhost:3000

```bash
npm run dev
```

# Sobre o projeto

O projeto utiliza da T3 stack, para mais informações, leia o arquivo T3Stack.md

## API

As rotas da api contém o prefixo /api

Exemplo

```
/api/users
```
Como estamos utilizando tRPC, todo backend está exposto em ```/api/tRPC/**```


## Rotas

Por padrão o Next utiliza a mesma estrutura de pastas para as rotas da aplicação

Confira um exemplo de rota em:

```
src/pages/example
```

URL de acesso:

```
/example
```
Todo arquivo com nome de `index` vai ser renderizado na rota de seu diretório pai.

Todo e qualquer arquivo `*.tsx` dentro da pasta pages irá gerar uma nova rota, logo, caso seja necessário criar um componente especifico para uma página, adicione-o dentro da pasta `components` com o mesmo caminho da página em que irá ser usado.

## Consumo de APIs

Como utilizamos tRPC, a interface do backend para o endpoint é inferida a ferramenta de consumo dessas apis dentro do frontend. A ferramenta utilizada pelo tRPC é o [react-query](https://tanstack.com/query/v4), que expoe hooks e trás varias funcionalidades comuns para `fetching`, não sendo necessário se preocupar com states, retries, cache, refetching, etc.

Para realizar uma requisição get/post que não alteram dados, basta utilizar o hook

```javascript
tRPC.useQuery(['backendRoute.method'])
```
o hook vai inciar a requisição assim que o componente for renderizado e vai devolver informações como `isLoading`, `isError` e `data`.

Também é possível realizar a requisição de forma programática em ações de usuário, ao invés dela ser realizada quando a página é carregada.

```javascript
const { client } = tRPC.useContext()

/* ... */

onClick = async () => {
    result = await client.query('backendRoute.method', {
        ...params
    })
}
```

Para realizar requisições que realizam alterações de dados, utilize o hook

```javascript
const { mutate } = tRPC.useMutation('backendRoute.method')
```

O hook vai devolver a função mutate, além de outras utilidades, que pode ser invocado em, por exemplo, uma ação de usuário.

```javascript
mutate({
    ...params
}, {
    ...options
})
```

## APIs Backend e Arquitetura

Como o projeto se utiliza do tRPC, é necessario definir um schema dos dados de entrada das funções, esse schema é construído com `zod`. As rotas são definidas a partir do router do tRPC, que realiza um merge de todas as rotas de cada um dos serviços.

As rotas e os schemas podem ser encontrados dentro da pasta `server/router/**`

A arquitetura do backend é inspirada no modelo de clean architecture, sendo assim, (quase) nunca dependementos de classes concretas, utilizando de interfaces e realizando injeção de dependencia. Dessa forma o código fica mais simples de testar.

As dependências das services são definidas no arquivo container.ts. Estas são injetadas em cada uma das factories das respectivas services, que estão na pasta `server/modules/**`. As services são disponibilizadas nas rotas do tRPC.

## Testes unitários

Utilizamos jest para realizar os testes do projeto.

Pelo menos todas as services do projeto devem ser testadas, dessa forma, sempre que desenvolver uma nova funcionalidade será necessário cobrir os cenários esperados e de excessão de seu código.

Para executar os testes integrados basta utilizar o comando:
```bash
npm run test
```

## Testes integrados

Os testes integrados se utilizam de um banco em memória para realizar os testes backend e validar se as principais regras de negocio estão funcionando de maneira integrada entre todas as camadas projeto.

Para executar os testes integrados basta utilizar o comando:
```bash
npm run test:integration
```

## Padrões de commits

O projeto utiliza do commitlint para validar se os commits estão nos padrões descritos no [Convetional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).