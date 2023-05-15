
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
        return {"api-for-theoddsapi-proxy Base index class" : "index_page"}

class the_odds_api_route(Resource):
    def get(self):
        #example: /api/fetch-api1-data?sport=${sport}&endpoint=${endpoint}&date=${dateIsoString}`
        # maps to     
        # const oddsAPI = `https://api.the-odds-api.com/v4/sports/${sport}/${endpoint}`;
        # const apiKey = process.env.REACT_APP_ODDS_API_API_KEY;
        # //the following are defaults
        # const fullAPI = `${oddsAPI}?apiKey=${apiKey}&dateFormat=iso&date=${dateIsoString}`;
        sport = request.args.get('sport', default = "", type = str)
        endpoint = request.args.get('endpoint', default = "", type = str)
        date = request.args.get('date', default = "", type = str)
        apiKey = os.getenv("API_KEY")
        odds_api_url = f"https://api.the-odds-api.com/v4/sports/{sport}/{endpoint}?apiKey={apiKey}&dateFormat=iso&date={date}"
        #make request and pass the data back
        try:
            response = requests.get(odds_api_url)
            response.raise_for_status()
            data = response.json()
            return {"data": data}, 200
        except requests.exceptions.HTTPError as errh:
            return {"error" : errh}
        except requests.exceptions.ConnectionError as errc:
            return {"error" : errc}
        except requests.exceptions.Timeout as errt:
            return {"error" : errt}
        except requests.exceptions.RequestException as err:
            return {"error" : err}
    def put(self):
        return {"api-for-theoddsapi put route" : "the_odds_api_route"}
#add resources
api.add_resource(index_class, '/api')
api.add_resource(the_odds_api_route, '/api/fetch-api1-data')