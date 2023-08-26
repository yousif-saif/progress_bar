from flask import Flask, jsonify, render_template, request
from flask_caching import Cache
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

app.debug = True

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

json_data = {
    "name": "yousif",
    "age": 14
}

@app.route("/")
def main():
    return render_template("index.html")


@cache.cached(timeout=60)
def load_data():
    with open("MOCK_DATA.json", "r") as f:
        data = json.load(f)
    
    return data

@app.route("/get_data", methods=["POST"])
def get_data():
    curr_index = int(request.get_json().get("curr_index", 0))

    data = load_data()
    buffer = len(data) // 10

    l = (curr_index * len(data)) // buffer # i used the butterfly technique in math (i.e 1/buffer = x/len(data))
    r = l + buffer

    data_to_send = data[l:r]


    percentage_of_data = curr_index * 10
    print("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", percentage_of_data)

    data_to_send.append({"percentage_of_data": percentage_of_data})

    return jsonify(data_to_send)

if __name__ == "__main__":
    app.run()
