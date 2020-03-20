from flask import Blueprint
from flask_restful import Api, reqparse, Resource, marshal, inputs
from sqlalchemy import desc
from .model import Books
from .model import Penulises
from .model import Categories
from .model import CategoryDetail
from blueprints import db

bp_book = Blueprint('book', __name__)
api = Api(bp_book)

class BookCrud(Resource):
    #Enable CORS
    def options (self, id=None):
        return {'status' : 'oke'}, 200
    
    def get(self):
        #Input Parameter
        parser = reqparse.RequestParser()
        parser.add_argument('judul', location='args', required = False)
        parser.add_argument('category_id', location='args', required = False)
        parser.add_argument('penulis_id', location='args', required = False)

        args = parser.parse_args()
        qry_book = Books.query
        qry_detail = CategoryDetail.query

        #Query Filter By Judul
        if args['judul'] is not None and args['judul'] != '':
            qry_book = qry_book.filter(Books.judul.like('%'+args['judul']+'%'))

        #Query Filter By Penulis
        if args['penulis_id'] is not None and args['penulis_id'] != '': 
            qry_book = qry_book.filter_by(penulis_id=args['penulis_id'])

        dic = {}
        rows = []

        #Query Filter By Category
        if args['category_id'] is not None and args['category_id'] !='':
            qry_detail = qry_detail.filter_by(category_id=args['category_id']).all()
            for row in qry_book.all():
                for detail in qry_detail:
                    if row.id == detail.book_id:
                        marshalBook = marshal(row, Books.response_fields)
                        marshalBook['nama_penulis'] = Penulises.query.filter_by(id=row.penulis_id).first().nama
                        marshalBook['kategori'] = Categories.query.filter_by(id = args['category_id']).first().nama
                        rows.append(marshalBook)
        else:
            for row in qry_book.all():
                category_detail = CategoryDetail.query.filter_by(book_id = row.id).all()
                category = ''
                for each in category_detail:
                    qry_category = Categories.query.filter_by(id = each.category_id).first().nama
                    category = category + qry_category + ', '
                marshalBook = marshal(row, Books.response_fields)
                marshalBook['nama_penulis'] = Penulises.query.filter_by(id=row.penulis_id).first().nama
                marshalBook['kategori'] = category
                rows.append(marshalBook)
        
        dic['result'] = rows
        return dic, 200
    
    def post(self):
        #Input Parameter
        parser = reqparse.RequestParser()
        parser.add_argument('judul', location='json', required=True)
        parser.add_argument('penulis', location='json', required=True)
        parser.add_argument('category', location='json', required=True, type = list)
        
        args = parser.parse_args()
        qry_penulis = Penulises.query
        qry_book = Books.query

        #Check Penulis whether exist or not and add Penulis to database
        if qry_penulis.filter_by(nama = args['penulis']).first() is None:
            penulis = Penulises(args['penulis'])
            db.session.add(penulis)
            db.session.commit()

        #Add Book to database
        book = Books(args['judul'],qry_penulis.filter_by(nama = args['penulis']).first().id)
        db.session.add(book)
        db.session.commit()

        #Add Category Detail to database
        book_id = qry_book.filter_by(judul = args['judul']).first().id
        for each in args['category']:
            category_detail = CategoryDetail(book_id,each)
            db.session.add(category_detail)
            db.session.commit()

        marshalBook = marshal(book, Books.response_fields)
        return marshalBook, 200, {'Content-Type':'application/json'}
    
    def delete(self, id):
        #Delete Book from database
        qry = Books.query.get(id)
        if qry is None:
            return {'status': 'NOT_FOUND'}, 404

        db.session.delete(qry)
        db.session.commit()

        return {'status': 'Delete success'}, 200

class PenulisCrud(Resource):
    def options (self):
        return {'status' : 'oke'}, 200

    def get(self):
        #Get all Penulis
        dic = {}
        qry_penulis = Penulises.query.all()
        marshalPenulis = marshal(qry_penulis, Penulises.response_fields)
        dic['result'] = marshalPenulis
        return dic, 200
    
class CategoryCrud(Resource):
    def options (self):
        return {'status' : 'oke'}, 200

    def get(self):
        #Get all Category
        dic = {}
        qry_category = Categories.query.all()
        marshalCategory = marshal(qry_category, Categories.response_fields)
        dic['result'] = marshalCategory
        return dic, 200

    
api.add_resource(BookCrud, '/book', '/book/<id>')
api.add_resource(PenulisCrud, '/penulis')
api.add_resource(CategoryCrud, '/category')