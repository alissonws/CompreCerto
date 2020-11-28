from flask import Flask, render_template, Response, request, make_response, url_for, redirect

import json, csv, os
from tempfile import NamedTemporaryFile

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('login_page'))

@app.route('/dashboard/<user_id>', methods=['GET'])
def dashboard_page(user_id):
    return render_template('dashboard.html', user_id=user_id)

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
    form = request.json # Em POST requests, você acessa os dados pelo request.form

    foreign_key = form['user_id']
    name = form['card_name']
    flag = form['card_flag']
    bank = form['card_bank']
    bill = form['card_bill']
    active = 1

    primary_key = 0

    with open('cards.csv') as cards:
        primary_key = sum(1 for line in cards) + 1

    with open('cards.csv', 'a', newline='') as cards :
        cardwriter = csv.writer(cards, delimiter=',')
        cardwriter.writerow([primary_key, name, flag, bank, bill, foreign_key, active])

    response = {
        'message': 'Successfully added',
        'user_id': foreign_key
    }

    return make_response(json.dumps(response), 200)


@app.route('/api/getCards', methods=['POST'])
def read():
    form = request.json

    foreign_key = form['user_id']

    response = {
        'cards': []
    }

    with open('cards.csv', newline='') as cards:
        cardreader = csv.reader(cards, delimiter= ',')

        for row in cardreader:
            if foreign_key == row[5] and row[6] == '1':
                response['cards'].append(row[:5])

    return make_response(json.dumps(response), 200)

@app.route('/api/editCard', methods=['POST'])
def edit():
    form = request.form
    
    primary_key = form['user_id']
    name = form['card_name']
    flag = form['card_flag']
    bank = form['card_bank']
    bill = form['card_bill']


    filename = 'tmpEmployeeDatabase.csv'
    tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

    with open('cards.csv', 'r', newline='') as cards, tempfile:
        reader = csv.reader(cards, delimiter=',', quotechar='"')
        writer = csv.writer(tempfile, delimiter=',', quotechar='"')

        for row in reader:
            if row [0] == primary_key:
                row [1]=name
                row [2]=flag 
                row [3]=bank
                row [4]=bill
            writer.writerow(row)

    os.rename(tempfile.name, filename)
    
    return Response(status=200)


@app.route('/api/signup', methods=['POST'])
def signup():
    form = request.json

    email = form['email']

    name = form['name']

    password = form['password']

    num_lines = 0    
    # Abrindo arquivo no modo leitura
    with open('users.csv', newline='') as users:
        reader = csv.reader(users, delimiter=',')

        for line in reader:
            num_lines += 1

            if email == line[2]: # Checando se existe uma ocorrência do e-mail em alguma linha do arquivo
                # Existe uma ocorrência, retornando 403
                response = {
                    'message': 'Já existe um usuário com esse e-mail registrado'
                }
                return make_response(response, 403) # (body, status, headers)

    # Se o código chegou até aqui é porque não existe um e-mail igual no arquivo, podemos prosseguir

    new_id = num_lines + 1 # Criando a nova id
    
    # Abrindo o arquivo pra escrita
    with open('users.csv', 'a', newline='') as users :
        userwriter = csv.writer(users, delimiter=',')
        userwriter.writerow([new_id, name, email, password]) # Escrevendo a nova linha

    response = {
        'message': 'Signed up successfully',
        'user_id': new_id
    }

    return make_response(json.dumps(response), 200) # (body, status, headers)




@app.route('/api/login', methods=['POST'])
def login():
    form = request.json
 
    email = form['email']
    password = form['password']

    with open('users.csv', newline='') as users:
        reader = csv.reader(users, delimiter=',', quotechar='|')
        for row in reader:
            if email in row:
                if password in row:
                    response = {
                        'message': 'Logged successfully',
                        'user_id': row[0]
                    }
                    return make_response(response, 200) # (body, status, headers)

                else:
                    response = {
                        'message': 'Senha incorreta'
                    }
                    return make_response(response, 403) # (body, status, headers)

    response = {
        'message': 'Não existe uma conta com esse e-mail registrado'
    }

    return make_response(json.dumps(response), 403) # (body, status, headers)
        
