# Sistema Gerenciamento de usuário

## Tecnologias Utilizadas

- [PHP 8](https://www.php.net/)
- [Laravel 11](https://laravel.com/docs/11.x)
- [Docker e Docker Compose](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Features Desenvolvidas

- Login
- Logout
- Cadastro de Usuário
- Listagem de usuários - API
- Listagem de um usuário - API
- Atualização de dados de usuário - API
- Deleção de usuário - API

### Configuração

1. Fazer a cópia do projeto para sua máquina

   ```bash
    git clone git@github.com:mauricioccardoso/systock-user-management.git

    ou

    git clone https://github.com/mauricioccardoso/systock-user-management.git
   ```

2. Caso tenha o Docker e Docker compose configurado na sua máquina, siga para [Docker e Docker Compose](#configuração-com-docker-e-docker-compose).
   Caso não tenha docker, continue para a coniguração do backend e frontend abaixo.

   ### BackEnd

3. Acessa a pasta do projeto a partir do terminal e acessa a pasta backend

   ```bash
    cd backend
   ```

4. Fazer a instalação das dependências do laravel

   ```bash
    composer install
   ```

5. Copiar o arquivo .env.example, renomear para .env e configurar as variáveis de acordo com seu banco de dados. Ex:

   ```bash
    DB_CONNECTION=mysql
    DB_HOST=app-db
    DB_PORT=5432
    DB_DATABASE=app-db
    DB_USERNAME=root
    DB_PASSWORD=rootpass
   ```

6. Caso o laravel não gere um chave, usar o comando para gerar uma nova chave de criptografia

   ```bash
    php artisan key:generate
   ```

7. Executar o comando para criar as tabelas no banco de dados e as seeds

   ```bash
    php artisan migrate --seed
   ```

   Obs.: Para subir o servido backend localmente utilize o comando dentro da pasta backend

   ```bash
    php artisan serve --host=0.0.0.0 --port=8080

    ou

    php artisan serve --host=localhost --port=8080
   ```

   ### Frontend

8. Retorne a pasta raiz e entre na pasta do frontend

   ```bash
   cd ../frontend
   ```

9. Faça a instalação das dependências

   ```bash
     npm install

     ou

     yarn
   ```

10. Se necessário, verifique e altere a url da api na variável "baseURL" no arquivo index.ts da pasta http

    ```bash
      const httpClient: AxiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api/'
      })
    ```

11. Utilize o comando abaixo para inicia o projeto frontend

    ```bash
      npm run dev
    ```

Acessar a rota [http://localhost:8081/login](http://localhost:8081/login)

---

### Configuração com Docker e Docker compose

1. Acessa a pasta raiz do projeto a partir do terminal ou com o editor de texto.

2. Na pasta "Backend", copiar o arquivo ".env.exemple" e renomear para ".env".
   E configurar as variáveis de ambiente.

   ```bash
    ## Docker Database Configuration
    DB_CONNECTION=pgsql
    DB_HOST=app-database
    DB_PORT=5432
    DB_DATABASE=app-db
    DB_USERNAME=root
    DB_PASSWORD=rootpass
   ```

3. Voltar para a raiz do projeto e usar o comando para subir os containers

   ```bash
    docker compose up -d
   ```

4. Após os containers estiverem prontos, acessar no navegador:

Frontend - Aplicação
[http://localhost:8081/](http://localhost:8081/)

Backend - Server Status
[http://localhost:8080/](http://localhost:8080/)
