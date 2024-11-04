# App

GymPass style app.

## Requisitos funcionais

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de chck-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## Regras de negócio

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não deve pode fazer 2 check-ins no mesmo dia;
- [] O usuário não deve pode fazer check-in se não tiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após ser criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## Requisitos não funcionais

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persisttidos em banco PostgresSQL;
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (Json Web Token)