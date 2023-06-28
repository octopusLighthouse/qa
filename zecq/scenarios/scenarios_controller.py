from flask.views import MethodView
from .scenarios_repository import PlainScenarioSchema, ScenarioModel
from flask_smorest import abort, Blueprint
from .scenarios_service import ScenarioService
from .dto.dto import ScenarioDTO
import jwt
from flask import request, jsonify, g
from marshmallow import ValidationError
blp = Blueprint("scenarios", __name__, description="Operations on scenarios")


@blp.before_request
def check_authorization():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            token = auth_header.split('Bearer ')[1]
            decoded_token = jwt.decode(token, 'YOUR_SECRET_KEY', algorithms=['HS256'])
            request.decoded_token = decoded_token
            g.user_id = decoded_token.get('id')

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
    else:
        return jsonify({'message': 'Missing Authorization header'}), 401


@blp.route("/scenarios")
class Scenarios(MethodView):
    @blp.arguments(PlainScenarioSchema)
    @blp.response(200, PlainScenarioSchema)
    def post(self, scenario_data):

        dto = ScenarioDTO(**scenario_data)
        updated_settings = ScenarioService.create(dto)
        return updated_settings

@blp.route("/scenarios")
class ScenariosList(MethodView):
    #@blp.response(200, PlainScenarioSchema(many=True))
    def get(self):
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('pageSize', 100))
        sort_field = request.args.get('sort', 'id')
        scenarios, total_pages = ScenarioService.get_all(page, page_size)
        serialized_scenarios = PlainScenarioSchema(many=True).dump(scenarios)

        response = {
            'data': serialized_scenarios,
            'page': page,
            'pageSize': page_size,
            'count': total_pages,
            #'id': g.user_id
        }

        return response



@blp.errorhandler(ValidationError)
def handle_validation_error(error):
    print('Validation error:', error.messages)

    response = jsonify({
        'message': 'Validation error',
        'errors': error.messages
    })
    response.status_code = 422
    return response

@blp.errorhandler(Exception)
def handle_exception(error):
    print('An error occurred:', str(error))

    response = jsonify({
        'message': 'An error occurred',
        'error': str(error)
    })
    response.status_code = 500
    return response