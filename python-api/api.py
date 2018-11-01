import flask
import datetime

from bson import ObjectId
from flask import request
from pymongo import MongoClient
from bson.json_util import dumps


client = MongoClient('mongodb://localhost:27017')
db = client['events-store']
collection = db['event']

app = flask.Flask(__name__)
app.config["DEBUG"] = True


# A route to return all of the available entries in our catalog.
@app.route('/api/events', methods=['GET'])
def events():
    return dumps(collection.find(), sort_keys=True, indent=4)


@app.route('/api/event/create', methods=['POST'])
def create():
    req_data = request.get_json()
    event_data = {
        'title': req_data['title'],
        '_class': 'nl.elstarit.event.service.model.Event',
        'description': req_data['description'],
        'start_date': req_data['start_date'],
        'end_date': req_data['end_date'],
        'userId': req_data['userId'],
        'created': datetime.datetime.today().strftime('%Y-%m-%d'),
        'modified': datetime.datetime.today().strftime('%Y-%m-%d')
    }
    result = collection.insert_one(event_data)

    inserted_id = result.inserted_id
    return dumps(collection.find_one({'_id': ObjectId(inserted_id)}), sort_keys=True, indent=4)


@app.route('/api/event/update', methods=['PATCH'])
def update():
    req_data = request.get_json()
    event_data = {
        '_id': ObjectId(req_data['_id']),
        'title': req_data['title'],
        '_class': 'nl.elstarit.event.service.model.Event',
        'description': req_data['description'],
        'start_date': req_data['start_date'],
        'end_date': req_data['end_date'],
        'userId': req_data['userId'],
        'created': req_data['created'],
        'modified': datetime.datetime.today().strftime('%Y-%m-%d')
    }
    collection.update_one({'_id': ObjectId(req_data['_id'])}, {"$set": event_data}, upsert=True)

    return dumps(collection.find_one({'_id': ObjectId(req_data['_id'])}), sort_keys=True, indent=4)


@app.route('/api/event/delete/<event_id>', methods=['DELETE'])
def delete(event_id):
    collection.delete_one({'_id': ObjectId(event_id)})
    return "OK"


@app.route('/api/event/<event_id>', methods=['GET'])
def event(event_id):
    return dumps(collection.find_one({'_id': ObjectId(event_id)}), sort_keys=True, indent=4)


@app.route('/api/events/<user_id>', methods=['GET'])
def events_by_use_id(user_id):
    return dumps(collection.find({'userId': user_id}), sort_keys=True, indent=4)


app.run()
