from .user_repository import UserModel
from db import db
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from flask_smorest import abort
from passlib.hash import pbkdf2_sha256


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
    def show(user_id):
        user = UserModel.query.get_or_404(user_id)
        return user

    @staticmethod
    def delete(user_id):

        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted."}, 200

    @staticmethod
    def show_all():
        return UserModel.query.all()

