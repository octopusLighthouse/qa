from flask import Flask, jsonify
import os
from flask_smorest import Api
from db import db
from dotenv import load_dotenv

from scenarios import ScenarioBlueprint
from user import UserBlueprint
import secrets
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)

    load_dotenv()

    app.config["PROPAGATE_EXCEPTiONS"] = True
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    migrate = Migrate(app, db)

    api = Api(app)

    api.register_blueprint(ScenarioBlueprint)
    api.register_blueprint(UserBlueprint)

    return app
