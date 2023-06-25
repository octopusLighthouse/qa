from flask.views import MethodView
from .scenarios_repository import ScenarioSchema, ScenarioModel
from flask_smorest import abort, Blueprint
from .scenarios_service import ScenarioService
import jwt
from flask import request, jsonify, g

blp = Blueprint("scenarios", __name__, description="Operations on scenarios")


@blp.before_request
def check_authorization():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            token = auth_header.split('Bearer ')[1]
            decoded_token = jwt.decode(token, 'YOUR_SECRET_KEY', algorithms=['HS256'])
            request.decoded_token = decoded_token
            g.user_id = int(decoded_token.get('userId'))

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
    else:
        return jsonify({'message': 'Missing Authorization header'}), 401


@blp.route("/scenarios")
class Scenarios(MethodView):
    @blp.arguments(ScenarioSchema)
    @blp.response(200, ScenarioSchema)
    def post(self, settings_data):
        updated_settings = ScenarioService.create(settings_data)
        return updated_settings


@blp.route("/scenarios")
class SettingsList(MethodView):
    @blp.response(200, ScenarioSchema(many=True))
    def get(self):
        return ScenarioService.get_all()
