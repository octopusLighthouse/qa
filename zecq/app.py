from flask import Flask, jsonify
import os
from flask_smorest import Api
from db import db
from dotenv import load_dotenv
from config import app_config
from scenarios import ScenarioBlueprint
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__)

    load_dotenv()
    app_config(app)

    db.init_app(app)
    migrate = Migrate(app, db)

    api = Api(app)

    api.register_blueprint(ScenarioBlueprint)

    return app
