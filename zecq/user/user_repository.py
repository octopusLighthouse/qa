# from db import db
# from marshmallow import Schema, fields
# from scenarios.scenarios_repository import PlainScenarioSchema
#
# class UserModel(db.Model):
#     __tablename__ = "users"
#
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(80), unique=True, nullable=False)
#     password = db.Column(db.String(120), nullable=False)
#
#
# class PlainUserSchema(Schema):
#     id = fields.Int(dump_only=True)
#     email = fields.Str(required=True)
#     password = fields.Str(required=True, load_only=True)
#
# class UserSchema(PlainUserSchema):
#     scenarios = fields.List(fields.Nested(PlainScenarioSchema()),
#                             dump_only=True)
