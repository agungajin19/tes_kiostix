import React from "react";
import { withRouter, Link} from "react-router-dom";
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
                <td>{item.judul}</td>
                <td>{item.nama_penulis}</td>
                <td>{item.kategori}</td>
                <td>
                    <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        onClick={() => this.props.deleteBook(item.id)}
                        >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </td>
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
                    <form className="col-12 box-filter form-row mt-5">
                        <div className="col-4 form-group">
                            <h3>Kategori</h3>
                            <select
                                className="custom-select col-12 "
                                id="categoryId"
                                name="categoryId"
                                onChange={e => this.handleInputFilter(e)}
                            >
                                <option value="">Semua Kategori</option>
                                {listAllCategory}
                            </select>
                        </div>
                        <div className="col-4 form-group">
                            <h3>Penulis</h3>
                            <select
                                className="custom-select col-12 "
                                id="penulisId"
                                name="penulisId"
                                onChange={e => this.handleInputFilter(e)}
                            >
                                <option value="">Semua Penulis</option>
                                {listAllPenulis}
                            </select>
                        </div>
                        <div className="col-4 form-group">
                            <h3>Judul</h3>
                            <input
                                type="text"
                                className="form-control"
                                id="judul"
                                name="judul"
                                placeholder="Cari Buku"
                                onChange={e => this.handleInputFilter(e)}
                            />
                        </div>
                    </form>
                    <div className="col-12 box-content"> 
                        <Link to='/add' type="button" className="btn btn-secondary">Tambah</Link>                     
                        <table className="table table-sm mt-4">
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
export default connect("listBook, listPenulis, listCategory, judul, penulisId, categoryId", actions)(withRouter(Home));