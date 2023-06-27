from .scenarios_repository import ScenarioModel, PlainScenarioSchema
from sqlalchemy.exc import SQLAlchemyError, IntegrityError, ProgrammingError, DataError
from flask import jsonify, g
from flask_smorest import abort
import validators
from db import db


# class ScenarioService:
#     @staticmethod
#     def create(settings_data):
#         test_settings = ScenarioModel(
#             url=settings_data["url"],
#             period=settings_data["period"],
#             acceptance_time=settings_data["acceptance_time"],
#             email=settings_data["email"],
#             phone=settings_data["phone"],
#             user_id=g.user_id
#         )

class ScenarioService:
    @staticmethod
    def create(dto):
        test_settings = ScenarioModel(
            url=dto.url,
            period=dto.period,
            acceptance_time=dto.acceptance_time,
            email=dto.email,
            phone=dto.phone,
            user_id=g.user_id
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
    def get_all(page, page_size):
        query = ScenarioModel.query.filter_by(user_id=g.user_id)
        scenarios = query.paginate(page=page, per_page=page_size)

        return scenarios.items, scenarios.pages
