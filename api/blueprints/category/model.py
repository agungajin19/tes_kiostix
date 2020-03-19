from blueprints import db
from flask_restful import fields
import datetime

class Categories(db.Model):
    __tablename__ = 'kategori'
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
        return '<Category %r>' %self.id

class CategoryDetail(db.Model):
    __tablename__ = 'kategori_detail'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    book_id = db.Column(db.Integer, db.ForeignKey('buku.id', ondelete='CASCADE'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('kategori.id', ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now(), default=datetime.datetime.now())


    response_fields = {
        'id' : fields.Integer,
        'book_id' : fields.String,
        'category_id' : fields.String
    }

    def __init__(self, book_id, category_id):
        self.book_id = book_id
        self.category_id = category_id

    def __repr__(self):
        return '<Category %r>' %self.id