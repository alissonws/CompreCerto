# CompreCerto

- Uma ferramenta para controle do melhor dia de compra dos seus cartões
- Realizada como trabalho na disciplina HandsOnWork IV

# Pastas
- static: css e javascript do front-end;
- templates: index.html do fron-end;

# Como criar um ambiente de desenvolvimento?
- Instale o Git
- Instale o python3
- Instale o pip3
- Instale a biblioteca virtualenv com pip `pip3 install virtualenv` pode ser necessário permissão de administrador
- Clone o repositório `git clone https://github.com/alissonws/CompreCerto.git`
- Entre no repositório que acabou de clonar `cd CompreCerto/`
- Crie um ambiente virtual `python3 -m virtualenv venv`
- Acesse o ambiente virtual `cd venv/Scripts && activate && cd../..`
- Instale o Flask `pip3 install flask`
- Dê permições de execução para o arquivo `run_flask.bat` (não sei como fazer isso no Windows)
- Você pode rodar o servidor flask executando `./run_flask.bat`