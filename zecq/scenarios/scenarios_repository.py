from db import db
import uuid
from datetime import datetime
from marshmallow import Schema, fields, ValidationError
from flask import jsonify
class ScenarioModel(db.Model):
    __tablename__ = "scenarios"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4().hex))
    url = db.Column(db.String, nullable=False)
    period = db.Column(db.Integer, nullable=False)
    acceptance_time = db.Column("acceptanceTime", db.Integer, nullable=False)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    created_at = db.Column("createdAt", db.DateTime, default=datetime.now)
    user_id = db.Column("userId", db.String)
    #user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    #user = db.relationship("UserModel", back_populates="scenarios")


# class PlainScenarioSchema(Schema):
#     id = fields.Str(dump_only=True)
#     url = fields.Str(required=True)
#     period = fields.Int(required=True)
#     acceptance_time = fields.Int(required=True)
#     email = fields.String()
#     phone = fields.String()
#     created_at = fields.String(dump_only=True)
#
#
# class ScenarioSchema(PlainScenarioSchema):
#     user_id = fields.Int(load_only=True)



class PlainScenarioSchema(Schema):
    id = fields.Str(dump_only=True)
    url = fields.Str(required=True)
    period = fields.Int(required=True)
    acceptance_time = fields.Int(required=True)
    email = fields.Str()
    phone = fields.Str()
    created_at = fields.Str(dump_only=True)
    user_id = fields.Str(dump_only=True)


# class ScenarioSchema(PlainScenarioSchema):
#     user_id = fields.Int(load_only=True)



