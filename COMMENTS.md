# Decisão da arquitetura utilizada

Devido ao meu background e experiência em PHP, optei pelo modelo de arquitetura MVC pela facilidade de reutilização de código, escalabilidade e manutenção da aplicação. No entanto, percebi que alguns conceitos como, por exemplo, o paradigma orientação a objetos, poderiam ser melhor aplicados se eu tivesse usado a linguagem de programação TypeScript.

# Lista de bibliotecas de terceiros utilizadas

* Back-end
  * cors: Habilitar CORS
  * dotenv: Carregar variáveis ​​de ambiente
  * express: Servidor WEB
  * husky e lint-staged: Validação de commits
  * jest e supertest: Testes
  * mysql2 e sequelize: Banco de dados
  * nodemon: Reiniciar aplicação automatiocamente
  * standard: Formatação de código
  
* Front-end
  * axios: Cliente HTTP
  * core-js: Biblioetca Javascript
  * vue, @vue/cli e vue-router: Construção de interfaces de usuário
  * vuetify: Criação de componentes em Vue

# O que você melhoraria se tivesse mais tempo

1. Revisão da estrutura
    1. Criação de um adaptador para tratar requisições e respostas sem dependência do express
    1. Criação do StudentRepository para tratar a comunicação com a base de dados retirando essa responsabilidade do StudentController
    1. Padronização do objeto a ser enviado no corpo de retorno das requisições
1. Autenticação e proteção das rotas por meio de JWT
1. Mensagens mais objetivas e amigáveis para o usuário
    1. Dicionário de mensagens
1. Validação de CPF no server e no client
1. Máscara de CPF no client
1. Testes mais abrangentes
1. Documentação da API por meio de framework como o Swagger, por exemplo
