
from flask import flash, Flask, request, jsonify, render_template, redirect, url_for, session, Blueprint, make_response
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_restful import reqparse, abort, Api, Resource
from flask import current_app, Blueprint
import os
import json
from dotenv import load_dotenv
import requests
load_dotenv()
api_main = Blueprint('api', __name__, template_folder='templates')
api = Api(api_main)
app = current_app


#auxiliary functions
# end auxiliary functions

#404 response if field not existent
def abort_if_field_not_exist(data_field, data):
    if data_field not in data:
        abort(404, message="error_message_field: {} does not exist".format(data_field))
#404 response if field not existent
def abort_if_none(data, _id):
    if data is None:
        abort(404, error_message_field="Field: {} does not exist".format(_id))
def abort_if_table_none(data):
    if data is None:
        abort(404, error_message_field="Field: table does not exist")

class index_class(Resource):
    def get(self):
        return {"api-load-db-theoddsapi base" : "index_page"}


#TODO: 
# also need template models
# and need to fill out put requests
class load_cfb_the_odds_api_route(Resource):
    def get(self):
        return {"api-load-db-theoddsapi cfb route" : "load-db route"}
class load_nba_the_odds_api_route(Resource):
    def get(self):
        return {"api-load-db-theoddsapi nba route" : "load-db route"}
class load_nfl_the_odds_api_route(Resource):
    def get(self):
        return {"api-load-db-theoddsapi nfl route" : "load-db route"}
#add resources
api.add_resource(index_class, '/api')
api.add_resource(load_cfb_the_odds_api_route, '/api/db-load-cfb')
api.add_resource(load_nba_the_odds_api_route, '/api/db-load-nba')
api.add_resource(load_nfl_the_odds_api_route, '/api/db-load-nfl')