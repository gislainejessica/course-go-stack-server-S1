# Conceitos Basicos de jwt e validações nas rotas
- Sessões que retornan um TOKEN ( Headers, Payload, Assinatura ). __Assinatura__, é o modo de segurança do token, que vai garantir que o TOKEN não foi alterado no meio do caminho.

- O Token contem informações imbutidas no codigo como: Qual o tipo de token, algoritmo e alguns dados do usuario da sessão.

---
Como processeder para gerar o TOKEN:

- Instalar a biblioteca que vai ajudar a gerar o token

  `yarn add jsonwebtoken`

- Criar no modelo `User.js` um metodo para comparar a senha passada com a senha hash armazenada

- Criar um controller para lidar com a sessão

- Criar uma rota de sessões

- Criar um arquivo de confifuração para guarda dados de auth.js na pasta config

## **LINKS úteis**
[md5online](https://www.md5online.org)

---

### Bloquear usuario em rotas que ele não pode acessar se não tiver logado ou não tem autorização
- Criar o __midlleware__ de autorização
  - Verificar se token foi passado nos headers
  - Decriptar o token passado
  - Verificar credenciais do usuário
  - Seguir rota para o `UserController.js` para tentar fazer a atualização que usuario requisita

- Nova rota de update do usuario na `routes.js` e criar o metodo update dentro do `UserController.js`

---

### Edição dos dados do cadastro
- A lógica para o usuário conseguir fazer alterações no cadastro está no mátodo _update_ do `UserVontroller.js`
  - Agente basicamente verifica os dados passados, a validade dos mesmos e caso estaja tudo correto realizamos a alteração

---

### Validação dos dados de entrada do usuário
Como criar um validador de entrada, para evitar que se passa dados invalidos ou incompletos?
  - Importar a biblioteca:

    `yarn add yup`

-  Validar criação e edição de usuários

   Codigo de exemplo:

    ```js
    // Validação de entrada Update
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    })
    // Verificar se passou na validação
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' })
    }
    ```



