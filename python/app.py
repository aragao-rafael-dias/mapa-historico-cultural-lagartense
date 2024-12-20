# Bibliotecas
import json
from flask import Flask, render_template, jsonify

# Criando app Flask
app = Flask(__name__)

# Rota para home
@app.route('/')
def index():
    return render_template('index.html')

# Importando os pontos
path_json = "/home/rafael-dias/Área de trabalho/mapa lagarto/python/src/pontos_culturaos.json"

# Carregamento dos pontos
with open(path_json, 'r') as f:
    pontos = json.load(f)

# Definindo as coordenadas de Lagarto para centralizar o mapa
lagarto_center = {
    'latitude': -10.9169,
    'longitude': -37.6619,
    'zoom': 13
}

# Rota para fornecer JSON
@app.route('/api/pontos')
def get_pontos():
    pontos_dict = pontos
    return jsonify(pontos_dict)

# Rota para fornecer coordenadas de Lagarto
@app.route('/api/lagarto')
def get_lagarto_coordinates():
    return jsonify(lagarto_center)

if __name__ == '__main__':
    app.run(debug=True)