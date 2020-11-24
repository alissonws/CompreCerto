from flask import Flask, render_template, Response, request

import json, csv

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

"""
COMO TESTAR POST REQUESTS NO POSTMAN?
Selecione o método como POST, e na aba body você deve preencher a KEY com o mesmo nome que você chama no formulário. Ex: user_id
"""

@app.route('/api/addCard', methods=['POST']) # Tive que usar POST pela quantidade de dados
def write():
    form = request.form # Em POST requests, você acessa os dados pelo request.form

    print(
        form['user_id'],
        form['card_name'],
        form['card_flag'],
        form['card_bank'],
        form['card_bill'])

    with open('cards.csv', 'a') as cards: # Abrindo o CSV no modo append, isso significa que você vai adicionar linhas no fim do arquivo
        cards.write('cartão')

    return Response(status=200)

@app.route('/api/getCards') # Essa é a notação para passar argumentos via GET requests. Pra implementar o sistema de login vou usar esse sistema. <variavel> declara uma variável a ser passada
def read():
    form = request.form # Em POST requests, você acessa os dados pelo request.form

    user_id = form['user_id']

    response = []

    with open('cards.csv', 'r') as cards: # Abrindo arquivo 
        reader = csv.reader(cards, delimiter=',') # Criando um objeto reader de CSV

        for line in reader:
            card_name, card_flag, card_bank, bill, foreign_user_id = line      # Atribuindo cada variável da linha do csv
            if user_id == foreign_user_id:                                     # Checando se a referência pro usuário na linha é a que a request pede
                response.append([card_name, card_flag, card_bank, bill])       # Caso sim, coloca os dados juntos na resposta

    return Response(200, json.dumps(response))