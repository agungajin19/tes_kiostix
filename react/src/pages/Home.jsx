import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";

class Home extends React.Component{
    componentDidMount = () =>{
        this.props.getBook()
        this.props.getPenulis()
        this.props.getCategory()
    }
    handleInputFilter = e => {
        store.setState({ [e.target.name]: e.target.value });
        this.props.getBook();
      };
    render(){
        const { listBook, listPenulis, listCategory } = this.props;
        const listAllBook = listBook.map((item, key) => {
            return (
              <tr>
                <th scope="row">{key + 1}</th>
                <td>{item.nama_penulis}</td>
                <td>{item.kategori}</td>
                <td></td>
              </tr>
            );
          });

        const listAllCategory = listCategory.map(item => {
            return <option value={item.id}>{item.nama}</option>;
          });
        const listAllPenulis = listPenulis.map(item => {
            return <option value={item.id}>{item.nama}</option>;
          });

        return(
            <React.Fragment>
                <div className="container">
                    <form className="col-12 box-filter form-row">
                        <div className="col-4 form-group">
                            <h1>Kategori</h1>
                            <select
                                className="custom-select col-12 "
                                id="category"
                                name="category"
                                onChange={e => this.handleInputFilter(e)}
                            >
                                <option value="">Semua Kategori</option>
                                {listAllCategory}
                            </select>
                        </div>
                        <div className="col-4 form-group">
                            <h1>Penulis</h1>
                            <select
                                className="custom-select col-12 "
                                id="penulis"
                                name="penulis"
                                onChange={e => this.handleInputFilter(e)}
                            >
                                <option value="">Semua Penulis</option>
                                {listAllPenulis}
                            </select>
                        </div>
                        <div className="col-4 form-group">
                            <h1>Judul</h1>
                            <input
                                type="text"
                                className="form-control"
                                id="nameProduct"
                                name="nameProduct"
                                placeholder="Cari Produk"
                                onChange={e => this.handleInputFilter(e)}
                            />
                        </div>
                    </form>
                    <div className="col-12 box-content">                      
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Judul</th>
                                <th scope="col">Penulis</th>
                                <th scope="col">Kategori</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>{listAllBook}</tbody>
                        </table>                     
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect("listBook, listPenulis, listCategory", actions)(withRouter(Home));