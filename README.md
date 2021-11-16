# Carros

## Cadastro de carros

### Requisitos funcionais
    - Deve ser possível cadastrar um novo carro
    - Deve ser possível listar todas as categorias

### Regras de negócio
    - Não deve ser possível cadastrar um carro com uma placa já existente
    - Não deve ser possível alterar a placa de um carro
    - O carro deve ser cadastrado disponível por padrão
    - Apenas administradores poderão cadastrar novos carros

## Listagem de carros

### Requisitos funcionais
    - Deve ser possível listar todos os carros disponíveis
    - Deve ser possível listar todos os carros disponíveis pelo nome da categoria
    - Deve ser possível listar todos os carros disponíveis pelo nome da marca
    - Deve ser possível listar todos os carros disponíveis pelo nome do carro

### Regras de negócio
    - Não é necessário estar autenticado no sistema para fazer a listagem de carros

## Cadastros de imagens do carro

### Requisitos funcionais
    - Deve ser possível cadastrar a imagem do carro
    - Deve ser possível listar todos os carros

### Requisito não funcional
    - Utilizar o multer para upload dos arquivos

### Regras de negócio
    - O usuário deve poder cadastrar mais de uma imagem para o carro
    - Apenas administradores poderão cadastrar novas imagens para o carro

# Especificações

## Cadastro de especificação no carro

### Requisitos funcionais
    - Deve ser possível cadastrar uma especificação para um carro
    - Deve ser possível listar todas as especificações
    - Deve ser possível listar todos os carros

### Regras de negócio
    - Não deve ser possível cadastrar uma especificação para um carro não cadastrado
    - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
    - Apenas administradores poderão cadastrar novas especificações

# Aluguel

## Aluguel de carro

### Requisitos funcionais
    - Deve ser possível cadastrar um aluguel

### Regras de negócio
    - O aluguel deve ter duração mínima de 24 horas
    - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
    - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro