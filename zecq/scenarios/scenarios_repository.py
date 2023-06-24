from db import db
import uuid
from datetime import datetime
from marshmallow import Schema, fields
import json

class ScenarioModel(db.Model):
    __tablename__ = "scenarios"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4().hex))
    url = db.Column(db.String, nullable=False)
    period = db.Column(db.Integer, nullable=False)
    acceptance = db.Column(db.JSON, nullable=False)
    #email = db.Column(db.String)
    #phone = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("UserModel", back_populates="scenarios")
    inform_channels = db.Column(db.JSON)


class AcceptanceSchema(Schema):
    time = fields.Int(required=True)

class InformChannelsSchema(Schema):
    email = fields.String()

class PlainScenarioSchema(Schema):
    id = fields.Str(dump_only=True)
    url = fields.Str(required=True)
    period = fields.Int(required=True)
    #acceptance_time = fields.Int(required=True)
    email = fields.String()
    phone = fields.String()
    created_at = fields.String(dump_only=True)
    acceptance = fields.Nested(AcceptanceSchema(), required=True)
    inform_channels = fields.Nested(InformChannelsSchema())


class ScenarioSchema(PlainScenarioSchema):
    user_id = fields.Int(required=True, load_only=True)


