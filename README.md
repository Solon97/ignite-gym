# Gympass Style App

## Requisitos Funcionais
- [x] O usuário deve poder se cadastrar;
- [x] O usuário deve poder se autenticar;
- [x] O usuário deve poder consultar o seu perfil logado
- [x] O usuário deve poder realizar check-in em uma academia
- [x] Deve ser possível cadastrar uma academia
- [x] O usuário deve poder obter o número de check-ins realizados
- [x] O usuário deve poder obter o histórico de check-ins
- [x] O usuário deve poder buscar academias pelo nome
- [x] O usuário deve poder buscar academias próximas
- [x] Deve ser possível validar o check-in de um usuário

## Regras de Negócio

- [x] O email do usuário deve ser único
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por adms
- [ ] A academia só pode ser cadastrada por adms

## Requisitos Não Funcionais

- [x] A senha do usuário precisa estar criptograda
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT
