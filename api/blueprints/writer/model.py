from blueprints import db
from flask_restful import fields
import datetime

class Writers(db.Model):
    __tablename__ = 'writer'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now(), default=datetime.datetime.now())


    response_fields = {
        'id' : fields.Integer,
        'nama' : fields.String
    }

    def __init__(self, nama):
        self.nama = nama

    def __repr__(self):
        return '<Penulis %r>' %self.id

