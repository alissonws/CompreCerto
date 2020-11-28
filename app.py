from flask import Flask, render_template, Response, request

import json, csv

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/signup', methods=['GET'])
def signup_page():
    return render_template('signup.html')

@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

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

@app.route('/api/SignUp', methods=['POST'])
def signup():
    
    with open('users.csv') as users:
        count = sum(1 for line in users)

    id = count +1
    
    mail = request.form['email']

    name = request.form['nome']

    password = request.form['senha']

    with open('users.csv', 'a', newline='') as users :
        userwriter = csv.writer(users, delimiter=',')
        userwriter.writerow([id, name, mail, password])
    return Response(status=200)




@app.route('/api/Login', methods=['POST'])
def login():
 
    lmail = request.form['email']
    lpswrd = request.form['senha']

    with open('users.csv', newline='') as users:
        reader = csv.reader(users, delimiter=',', quotechar='|')
        for row in reader:
            if lmail in row:
                if lpswrd in row:
                    return Response(status=200)
                else:
                    return Response('senha incorreta')
        return Response(status=403)
        