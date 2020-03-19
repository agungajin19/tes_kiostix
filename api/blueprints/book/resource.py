from flask import Blueprint
from flask_restful import Api, reqparse, Resource, marshal, inputs
from sqlalchemy import desc
from .model import Books

from blueprints.category.model import Categories
from blueprints.category.model import CategoryDetail

from blueprints import db,app, internal_required
from flask_jwt_extended import jwt_required, get_jwt_claims

bp_book = Blueprint('book', __name__)
api = Api(bp_book)

class BookPublic(Resource):
    def __init__(self):
        pass
    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('judul', location='args')
        parser.add_argument('category_id', type=int, location='args')
        parser.add_argument('penulis_id', type=int, location='args')


        args = parser.parse_args()

        qry_book = Books.query
        qry_detail = CategoryDetail.query
        qry_category = Categories.query

        if args['judul'] is not None:
            qry_book = qry_book.filter(Books.judul.like('%'+args['judul']+'%'))

        if args['penulis'] is not None:
            qry_book = qry_book.filter_by(penulis_id=args['penulis_id'])

        
        dic = {}
        rows = []
        if args['kategory'] is not None:
            qry_detail = qry_detail.filter_by(category_id=args['category_id']).first()
            for row in qry_book.all():
                if row.id == qry_detail.category_id:
                    marshalBook = marshal(row, Books.response_fields)
                    rows.append(marshalBook)
        else:
            for row in qry_book.all():  
                marshalBook = marshal(row, Books.response_fields)
                rows.append(marshalBook)
        
        dic['result'] = rows
        
        return dic, 200
        
    def options (self):
        return {'status' : 'oke'}, 200


api.add_resource(BookPublic, '/book')



