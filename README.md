# Boas-vindas ao repositório do projeto API de Blogs!

Projeto desenvolvido durante a formação de desenvolvedor Full Stack da Trybe.
O objetivo do projeto foi criar uma API em Node.js + Express que simula o funcionamento de um blog, com as seguintes funcionalidades:
* Cadastrar um usuário;
* Efetuar Login;
* Editar Usuário;
* Listar Usuários;
* Criar uma Categoria de Post;
* Listar Cateforias;
* Criar um Post
* Listar Posts;
* Atualizar Posts;
* Deletar Post;
* Deletar o usuário logado;
* Buscar Post por título ou conteúdo;

# Tecnologias utilzadas

* JavaScript;
* Node.js;
* Express;
* Sequelize;;
* JSON Web Token (JWT);
* Swagger;
* Docker;

# Como Rodar a Aplicação
 ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  - Instale as dependências com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.  
  ## 👉 Sem Docker

  - Instale as dependências com `npm install`
  
  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** Necessário também ter o `Mysql` instalado em sua máquina.
</details>

  ## **:warning: Atenção:**  É Necessário configurar suas variáveis de ambiente no arquivo .env.example, e renomear o arquivo para .env;

# Rotas da aplicação

## Rota de documentação - `/api-docs`
Nesta rota se encontra a documentação da aplicação gerada pelo swagger, configurada através de um arquivo json, nesta rota é possível testar cada uma das rotas da aplicação e ver seus detalhes

##  POST `/login`

- O endpoint é acessível através do URL `/login`;
- Endpoint responsável por efetuar o login na aplicação;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```

<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * **[Não é possível fazer login sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Não é possível fazer login com um usuário que não existe]**
    - Se a requisição receber um par de `email` e `password` errados/inexistentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  * **[Login Realizado com sucesso]**
    - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ``
<br />
</details>

---

## POST `/user`

- O endpoint é acessível através do URL `/user`;
- Endpoint responsável por cadastrar um  novo Usuário;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```

<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * **[Não é possível cadastrar com o campo `displayName` menor que 8 caracteres]**
    - Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```
  
  * **[Não é possível cadastrar com o campo `email` com formato inválido]**
    - Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

  * **[Não é possível cadastrar com o campo `password` menor que 6 caracteres]**
    - Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

  * **[Não é possível cadastrar com um email já existente]**
    - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already registered"
    }
    ```
  
  * **[Cadastro de pessoa usuária com sucesso]**
    - Se o user for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```

</details>

---

## :warning: Validando token nas requisições

- As demais rotas da aplicação necessitam de um `token` de autenticação para serem acessadas;
- Caso o token seja inválido ou esteja expirado, você receberá uma das seguintes respostas:

  * **[Não é possível fazer uma operação sem o token na requisição]**
    - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```

  * **[Não é possível fazer uma operação com o token inválido]**
    - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```
---

## GET `/user`

- O endpoint é acessível através do URL `/user`;
- Endpoint responsável por listar todos os Usuários;
<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Listar todos os usuários]**
    - Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## GET `/user/:id`

- O endpoint é acessível através do URL `/user/:id`;
- Endpoint responsável por listar um Usuário;
<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Listar um usuário específico com sucesso]**
    - Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
    ```

  * **[Não é possível listar um usuário inexistente]**
    - Se o usuário for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User does not exist"
    }
    ```

<br />
</details>

---

## POST `/categories`

- O endpoint é acessível através do URL `/categories`;
- Endpoint responsável por cadastrar uma Categoria;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "name": "Typescript"
  }
  ```

<details>
  <summary><strong>Possíveis Repostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Não é possível cadastrar uma categoria sem o campo `name`]**
    - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" is required"
    }
    ```

  * **[Cadastrar uma categoria com sucesso]**
    - Se a categoria for criada com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "name": "Typescript"
    }
    ```

<br />
</details>

---

## GET `/categories`

- O endpoint é acessível através do URL `/categories`;
- Endpoint responsável por listas todas as Categorias;
<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Listar todas as categoria com sucesso]**
    - Ao listar categorias com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "name": "Inovação"
      },
      {
          "id": 2,
          "name": "Escola"
      },

      /* ... */
    ]
    ```

<br />
</details>

---
## POST `/post`

- O endpoint é acessível através do URL `/post`;
- Endpoint responsável por cadastrar um novo Post;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```
  
<details>
  <summary id="requisito12"><strong>Possíveis Retornos</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Não é possível cadastrar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Não é possível cadastrar um blog_post com uma `categoryIds` inexistente]**
    - Se a requisição **não** tiver o campo `categoryIds` devidamente preenchido com um array com **todas** as categorias existentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400``:
    ```json
    {
      "message": "one or more \"categoryIds\" not found"
    }
    ```

  * **[Cadastrar um blog_post com sucesso]**
  - Se o blog post for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
  ```json
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```

<br />
</details>

---

## GET `/post`

- O endpoint é acessível através do URL `/post`;
- Endpoint responsável por listar todos os Posts;

<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Listar blogpost com sucesso]**
    - Ao listar posts com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      
      /* ... */
    ]
    ```

<br />
</details>

---
## GET `/post/:id`

- O endpoint é acessível através do URL `/post/:id`;
- Endpoint responsável por listar um Post;

<details>
  <summary><strong>Possíveis Repostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Listar um blogpost com sucesso]**
    - Ao listar um post com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
          {
              "id": 1,
              "name": "Inovação"
          }
      ]
    }
    ```

  * **[Não é possível listar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## PUT `/post/:id`

- O endpoint é acessível através do URL `/post/:id`;
- Endpoint responsável por atualizar um Post;
- A aplicação só permite a alteração de um blog post caso a pessoa seja dona dele;
- A aplicação não permite a alteração das categorias do post, somente os atributos `title` e `content` podem ser alterados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```
  

<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Não é possível editar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá editá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Não é possível editar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Editar um blogpost com sucesso]**
    - Se o blog post for alterado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2022-05-18T18:00:01.000Z",
      "updated": "2022-05-18T18:07:32.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
    ```

<br />
</details>

---

## DELETE `/post/:id`

- O endpoint é acessível através do URL `/post/:id`;
- Endpoint responsável por deletar um Post;
- A aplicação só permite a deleção de um blog post caso a pessoa seja dona dele;

<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Não é possível deletar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá deletá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Deletar um blogpost com sucesso]**
    - Se o blog post for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

  * **[Não é possível deletar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## DELETE `/user/me`

- O endpoint é acessível através do URL `/user/me`;
- Endpoint responsável por deletar o Usuário logado;
<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Excluir meu usuário com sucesso]**
    - Se o user for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

<br />
</details>

---

## GET `/post/search?q=:searchTerm`

- O endpoint acessível através do URL `/post/search`;
- Endpoint responsável por buscar um Post por um termo de pesquisa;
- O query params da requisição deverá seguir o formato abaixo:
  ```js
    http://localhost:PORT/post/search?q=vamos
  ```

<details>
  <summary><strong>Possíveis Respostas</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Buscar um blogpost pelo `title`]**
    - Se a buscar for pelo `title` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    // GET /post/search?q=Vamos que vamos

    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```

  * **[Buscar um blogpost pelo `content`]**
    - Se a buscar for pelo `content` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=Foguete não tem ré

      [
        {
          "id": 2,
          "title": "Vamos que vamos",
          "content": "Foguete não tem ré",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 2,
              "name": "Escola"
            }
          ]
        }
      ]
    ```

  * **[Buscar todos os blogpost quando passa a busca vazia]**
    - Se a buscar for vazia o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=

      [
        {
          "id": 1,
          "title": "Post do Ano",
          "content": "Melhor post do ano",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 1,
              "name": "Inovação"
            }
          ]
        },
        
        /* ... */
      ]
    ```

  * **[Buscar um blogpost inexistente e retornar array vazio]**
    - Se a buscar um post inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=BATATA

      []
    ```

</details>
