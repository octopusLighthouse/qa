from flask.views import MethodView
from scenarios_repository import ScenarioSchema, ScenarioModel
from flask_smorest import abort, Blueprint
from zecq.scenarios.scenarios_service import ScenarioService

blp = Blueprint("scenarios", __name__, description="Operations on scenarios")

@blp.route("/settings")
class Scenarios(MethodView):
    @blp.arguments(ScenarioSchema)
    @blp.response(200, ScenarioSchema)
    def post(self, settings_data):
        updated_settings = ScenarioService.create(settings_data)
        return updated_settings


@blp.route("/settings")
class SettingsList(MethodView):
    @blp.response(200, ScenarioSchema(many=True))
    def get(self):
        return ScenarioService.get_all()
