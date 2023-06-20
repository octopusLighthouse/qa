from user.user_repository import UserModel
from db import db
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from flask_smorest import abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, get_jwt


class UserService:
    @staticmethod
    def register(user_data):
        if UserModel.query.filter(UserModel.email == user_data["email"]).first():
            abort(409, message="This e-mail is already registered.")

        user = UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
        )
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully."}, 201

    @staticmethod
    def login(user_data):
        user = UserModel.query.filter(
            UserModel.email == user_data["email"]
        ).first()

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token}, 200

        abort(401, message="Invalid credentials.")

    @staticmethod
    def show(user_id):
        user = UserModel.query.get_or_404(user_id)
        return user

    @staticmethod
    def delete(user_id):
        jwt = get_jwt()
        if not jwt.get("is_admin"):
            abort(401, message="Admin privilege required.")
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted."}, 200

    @staticmethod
    def show_all():
        return UserModel.query.all()

