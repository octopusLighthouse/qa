from .scenarios_repository import ScenarioModel
from sqlalchemy.exc import SQLAlchemyError, IntegrityError, ProgrammingError, DataError
from flask import jsonify
from flask_smorest import abort
import validators
import json
from db import db


class ScenarioService:
    @staticmethod
    def create(settings_data):
        test_settings = ScenarioModel(
            url=settings_data["url"],
            period=settings_data["period"],
            acceptance={
                "time": settings_data["acceptance"]["time"]
            },
            inform_channels={
                "email": settings_data["inform_channels"]["email"],
                "phone": settings_data["inform_channels"]["phone"]
            },
            user_id=settings_data["user_id"]
        )
        if not validators.url(test_settings.url):
            abort(404, message="URL is not valid or doesn't exist")
        try:
            db.session.add(test_settings)
            db.session.commit()
        except IntegrityError as error:
            db.session.rollback()
            error_message = str(error.orig)
            return jsonify(message="An integrity error occurred", error=error_message), 500
        except ProgrammingError as error:
            db.session.rollback()
            error_message = str(error.orig)
            return jsonify(message="A programming error occurred", error=error_message), 500
        except DataError as error:
            db.session.rollback()
            error_message = str(error.orig)
            return jsonify(message="A Data error occurred", error=error_message), 500
        except SQLAlchemyError as error:
            abort(500, message=error)
        return test_settings
    @staticmethod
    def get_all():
        return ScenarioModel.query.all()
