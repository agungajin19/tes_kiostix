from blueprints import db
from flask_restful import fields
import datetime

class Books(db.Model):
    __tablename__ = 'buku'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    judul = db.Column(db.String(30), nullable=False)
    penulis_id = db.Column(db.Integer, db.ForeignKey('kategori.id', ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now(), default=datetime.datetime.now())


    response_fields = {
        'id' : fields.Integer,
        'judul' : fields.String,
        'penulis_id' : fields.Integer,
    }

    def __init__(self, judul, penulis_id):
        self.judul = judul
        self.penulis_id = penulis_id

    def __repr__(self):
        return '<Book %r>' %self.id