from flask import request
from flask import abort
from flask import Flask, jsonify
import json
import requests

app = Flask(__name__)

api= 'http://192.168.60.3:5000/books'
headers = {'Content-type': 'application/json'}

@app.route('/books', methods=['GET'])
def get_books():
    books = requests.request("GET", url = api, headers = headers)
    return  books.json()

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    api_get_book = api + '/' + str(book_id)
    book = requests.request("GET", url = api_get_book, headers = headers)
    return book.json()

@app.route('/books', methods=['POST'])
def create_book():
    if not request.json or not 'title' in request.json:
        abort(400)
    title = request.json.get('title', "")
    description = request.json.get('description', "")
    author = request.json.get('author', "")
    myobj = {'title': title, 'description': description, 'author': author }
    json_obj = json.dumps(myobj)
    book = requests.request("POST", url = api, data = json_obj, headers = headers)

    return book.json()

@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    api_upd_book = api + '/' + str(book_id)
    title = request.json.get('title', "")
    description = request.json.get('description', "")
    author = request.json.get('author', "")
    myobj = {'title': title, 'description': description, 'author': author }
    json_obj = json.dumps(myobj)
    book = requests.request("PUT", url = api_upd_book, data = json_obj, headers = headers)
    return book.json()

@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    api_del_book = api + '/' + str(book_id)
    book = requests.request("DELETE", url = api_del_book, headers = headers)
    return book.json()