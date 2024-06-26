## 🖥 Sobre o projeto:

<p align="justify">Projeto desenvolvido durante o módulo de backend do curso de desenvolvimento web da @betrybe, realizado em Maio de 2023. Trata-se de uma API REST e um banco de dados para a produção de conteúdo para um blog, sendo possível realizar todas as operações CRUD para as postagens e fazendo uso da autenticação de usuários para editar e publicar posts. </p>

## 🛠 Tecnologias e libs utilizadas:
<p>As seguintes ferramentas foram utilizadas na construção do projeto:</p>

- [Sequelize](https://sequelize.org/)
- [Mysql](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [node.js](https://nodejs.org/en)
- [express](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)

## ↗️ Endpoints:
### Login (credenciais de acesso)
```
/login
```
- Utiliza o método POST, recebe as informações de acesso no corpo da requisição.
- Se a requisição não tiver todos os campos devidamente preenchidos, retorna uma mensagem de erro, com um status http `400`.
- Se a requisição receber um par de `email` e `password` errados/inexistentes, retorna uma mensagem de erro, com um status http `400`.
- Se o login foi feito com sucesso, retorna um token com um status http `200`. O token será necessário em requisições nos endpoints de User, Categories e Post.

### User
```
/user
```
- Usando o método GET:
  - Retorna todos os usuários presentes no banco de dados.
  - É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
  - Em caso de sucesso, retorna uma lista contendo os usuários, com um status http `200`:
 
- Usando o método POST:
  - Adiciona um novo usuário ao banco de dados, as informações de nome, email e senha devem estar presentes no corpo da requisição:
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```
  - Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, retorna uma mensagem de erro com um status http `400`.
  - Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, retorna uma mensagem de erro com um status http `400`.
  - Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, retorna uma mensagem de erro com um status http `400`.
  - Se a requisição enviar o campo `email` com um email que já existe, retorna uma mensagem de erro com um status http `409`.
  - Caso o usuário seja criado com sucesso, retorna um token com um status http `201`.

```
/user/id
```
- Usando o método GET, retorna o usuário especificado pelo id, caso ele exista no banco de dados.
- É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
- Em caso de sucesso, retorna o usuário encontrado, com um status http `200`.
- Se o usuário for inexistente, retorna uma mensagem de erro, com um status http `404`.

```
/user/me
```
- Utiliza o método DELETE, deleta o usuário atualmente logado, com base no id presente no token.
- Como dito acima, é necessária a presença de um token valido no cabeçalho da requisição.
- Se o usuário for deletado com sucesso, retorna apenas um status http `204`.

### Categories
```
/categories
```
- Usando o método GET:
  - Retorna todas as categorias presentes no banco de dados.
  - É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
  - Caso não possua um token ou se ele for inválido, retorna uma mensagem de erro com o código `401`
  - Ao listar categorias com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
  
  ``` json
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
- Usando o método POST:
  - Adiciona uma nova categoria na tabela no banco de dados. O nome da nova categoria deve estar presente no corpo da requisição.
  - Em caso de sucesso, retorna um objeto contendo o id e o nome da categoria criada, com um status http `201`.
  - É necessária a presença de um token válido.
  - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), deve retornar uma mensagem de erro, com um status http `400`.

### Post
```
/post
```
- Usando o método GET:
  - Retorna uma lista contendo todos os blog posts presentes no banco de dados, cada blog post contendo informações como o autor e categorias do post.
  - É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
  - Em caso de sucesso, retorna a lista com um status http `200`.
- Usando o método POST:
  - Adiciona um novo blog post e vincula-o às categorias em suas presentes no banco de dados.
  - É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
  - Corpo da requisição deve obedecer o seguinte formato:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```
  - Se a requisição não tiver todos os campos devidamente preenchidos, retorna uma mensagem de erro, com um status http `400`.
  - Se a requisição não tiver o campo `categoryIds` devidamente preenchido com um array com todas as categorias existentes, retorna um erro , com um status http `400`.
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
 
```
/post/id
```
- Usando o método GET:
  - Retorna o blog post especificado pelo id, caso ele exista no banco de dados.
  - É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
  - Em caso de sucesso, retorna o blog post encontrado, com um status http `200`.
  - Se o blog post for inexistente, retorna uma mensagem de erro, com um status http `404`.

- Usando o método PUT:
  - Modifica um blog post, caso ele exista, com as informações presentes no corpo da requisição.
  - É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
  - Só será permitida a alteração do blog post caso a pessoa usuária seja a autora dele. Isso será validado pelo token inserido.
  - Somente os campos title e content poderão ser alterados.
  - O corpo da requisição deve ter o seguinte formato:
   ```json
   {
     "title": "Latest updates, August 1st",
     "content": "The whole text for the blog post goes here in this key"
   }
   ```
  - Se o blog post for alterado com sucesso, retorna o blog post alterado, com um status http `200`.

- Usando o método DELETE:
  - Remove o blog post especificado pelo id, caso ele exista.
  - Só será permitida a remoção do blog post caso a pessoa usuária seja a autora dele. Isso será validado pelo token inserido.
  - É necessária a presença de um token válido, que deve estar presente no cabeçalho da requisição.
  - Se o post for inexistente, retorna uma mensagem de erro, com um status http `404`.
  - Em caso de sucesso, não retorna nenhuma resposta, apenas um status http `204`.

## 👾Autor

 <a href="https://github.com/Gui-lfm">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/72154970?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Guilherme Lucena</b></sub></a>
 
 ### ✉contato:
<div>
  <a href="mailto:guilherme.lucena17@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"/></a>
  <a href="https://www.linkedin.com/in/guilherme-lucena-fm94/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/></a>
</div>
