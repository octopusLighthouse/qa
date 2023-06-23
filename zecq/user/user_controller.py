from flask_smorest import abort, Blueprint
from flask.views import MethodView
from .user_repository import UserSchema
from .user_service import UserService
import requests

blp = Blueprint("users", __name__, description="Operations on users")
AUTHENTICATION_SERVICE_URL = "http://localhost:3000/auth/123"


def get_permission_status():
    response = requests.get(AUTHENTICATION_SERVICE_URL)
    if response.status_code == 200:
        permission_status = response.json()["permision"]
        return permission_status
    else:
        abort(500, message="Failed to retrieve permission status from authentication service")


@blp.before_request
def handle_authentication():
    permission_status = get_permission_status()
    if permission_status["permission"] == "denied":
        abort(403, message="Permission denied")


@blp.route("/user/<int:user_id>")
class User(MethodView):

    @blp.response(200, UserSchema)
    def get(self, user_id):
        user = UserService.show(user_id)
        return user

    def delete(self, user_id):
        user = UserService.delete(user_id)
        return user


@blp.route("/user")
class UsersList(MethodView):
    @blp.response(200, UserSchema(many=True))
    def get(self):
        return UserService.show_all()
