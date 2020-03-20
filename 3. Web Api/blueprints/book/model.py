from blueprints import db
from flask_restful import fields

class Penulises(db.Model):
    __tablename__ = 'penulis'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(255), nullable=False)

    response_fields = {
        'id' : fields.Integer,
        'nama' : fields.String
    }

    def __init__(self, nama):
        self.nama = nama

    def __repr__(self):
        return '<Penulis %r>' %self.id

class Books(db.Model):
    __tablename__ = 'buku'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    penulis_id = db.Column(db.Integer, db.ForeignKey('penulis.id', ondelete='CASCADE'), nullable=False)
    judul = db.Column(db.String(255), nullable=False)

    response_fields = {
        'id' : fields.Integer,
        'judul' : fields.String,
        'penulis_id' : fields.Integer
    }

    def __init__(self, judul, penulis_id):
        self.judul = judul
        self.penulis_id = penulis_id

    def __repr__(self):
        return '<Book %r>' %self.id

class Categories(db.Model):
    __tablename__ = 'kategori'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(255), nullable=False)

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