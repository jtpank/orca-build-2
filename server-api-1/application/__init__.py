import os
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Resource, Api
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
def create_app():
    app = Flask(__name__, static_url_path='/static')

    with app.app_context():
        from . import routes
        app.register_blueprint(routes.main_app_frontend)
        from . import api_routes
        app.register_blueprint(api_routes.api_main)
        # app.wsgi_app = ProxyFix(
        #     app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
        # )
        jwt = JWTManager(app)
        CORS(app, resources={r'/api/*': {"origins": "*"}}, methods=['GET', 'PUT', 'POST'])
        return app
