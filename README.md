# Gympass Style App

## Requisitos Funcionais
- [ ] O usuário deve poder se cadastrar;
- [ ] O usuário deve poder se autenticar;
- [ ] O usuário deve poder consultar o seu perfil logado
- [ ] O usuário deve poder obter o número de check-ins realizados
- [ ] O usuário deve poder obter o histórico de check-ins
- [ ] O usuário deve poder buscar academias próximas
- [ ] O usuário deve poder buscar academias pelo nome
- [ ] O usuário deve poder realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## Regras de Negócio

- [ ] O email do usuário deve ser único
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por adms
- [ ] A academia só pode ser cadastrada por adms

## Requisitos Não Funcionais

- [ ] A senha do usuário precisa estar criptograda
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT