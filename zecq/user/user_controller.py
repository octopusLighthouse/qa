from flask_smorest import abort, Blueprint
from flask.views import MethodView
from user_repository import UserSchema
from user_service import UserService

blp = Blueprint("users", __name__, description="Operations on users")

@blp.route("/register")
class UserRegister(MethodView):
    @blp.arguments(UserSchema)

    def post(self, user_data):
        user = UserService.register(user_data)
        return user

@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        login = UserService.login(user_data)
        return login


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
