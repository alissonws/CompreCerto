from flask import Flask, render_template, Response, request

import json, csv, os
from tempfile import NamedTemporaryFile

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

    foreign_key = form['user_id']
    name = form['card_name']
    flag = form['card_flag']
    bank = form['card_bank']
    bill = form['card_bill']

    primary_key = 0

    with open('cards.csv') as cards:
        primary_key = sum(1 for line in cards) + 1

    with open('cards.csv', 'a', newline='') as cards :
        cardwriter = csv.writer(cards, delimiter=',')
        cardwriter.writerow([primary_key, name, flag, bank, bill, foreign_key])

    return Response(200)

@app.route('/api/getCard', methods=['POST'])
def read():
    form = request.form

    foreign_key = form['user_id']
    name = form['card_name']
    flag = form['card_flag']
    bank = form['card_bank']
    bill = form['card_bill']

    with open('cards.csv', newline='') as cards:
        cardreader = csv.reader(cards, delimiter= ' ', quotechar = '|')
        for row in cardreader:
            print(', '.join(row))

    return Response(200)

@app.route('/api/writeCard', methods=['POST'])
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
        
