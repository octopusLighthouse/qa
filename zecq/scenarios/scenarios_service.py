from scenarios_repository import ScenarioModel
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from flask import jsonify
from flask_smorest import abort
import validators

from zecq.db import db

class ScenarioService:
    @staticmethod
    def create(settings_data):
        test_settings = ScenarioModel(**settings_data)
        if not validators.url(test_settings.url):
            abort(404, message="URL is not valid or doesn't exist")
        try:
            db.session.add(test_settings)
            db.session.commit()
        except IntegrityError as error:
            db.session.rollback()
            error_message = str(error.orig)
            return jsonify(message="An integrity error occurred", error=error_message), 500
        except SQLAlchemyError as error:
            abort(500, message=error)
        return test_settings

    @staticmethod
    def get_all():
        return ScenarioModel.query.all()

