import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../stores/MainStore";

class AddBook extends React.Component {
    handleInput = e => {
      store.setState({ [e.target.name]: e.target.value });
    };
    render() {
        const { listPenulis } = this.props;
        const listAllPenulis = listPenulis.map(item => {
            return <option value={item.nama} />;
            });

        return (
            <React.Fragment>
                <div className="container">
                    <form action="" onSubmit={e => e.preventDefault()} className='mt-5 pl-5 pr-5'>
                        <div className="form-group row text-left">
                            <label className="col-sm-4" for="judulInput">
                            Judul
                            </label>
                            <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="judulInput"
                                name="judulInput"
                                onChange={e => this.handleInput(e)}
                                required
                            />
                            </div>
                        </div>
                        <div className="form-group row text-left">
                            <label className="col-sm-4 col-form-label" for="penulisInput">
                            Penulis
                            </label>
                            <div className="col-sm-8">
                            <input
                                list="penulisInput"
                                name="penulisInput"
                                className="custom-select custom-select-md"
                                onChange={e => this.handleInput(e)}
                                required
                            />
                            <datalist id="penulisInput">
                                {listAllPenulis}
                            </datalist>
                            </div>
                        </div>
                        <div className="form-group row text-left">
                            <label className="col-sm-4 col-form-label" for="categoryInput">
                            Kategori
                            </label>
                            <   div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="drama" name="drama" value="1" onChange={e => this.handleInput(e)}/>
                                    <label class="form-check-label" for="drama">drama</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="action" name="action" value="2" onChange={e => this.handleInput(e)}/>
                                    <label class="form-check-label" for="action">action</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="horror" name="horror" value="3" onChange={e => this.handleInput(e)}/>
                                    <label class="form-check-label" for="horror">horror</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="comedy" name="comedy" value="4" onChange={e => this.handleInput(e)}/>
                                    <label class="form-check-label" for="comedy">comedy</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="romance" name="romance" value="5" onChange={e => this.handleInput(e)}/>
                                    <label class="form-check-label" for="romance">romance</label>
                                </div>
                        </div>
                        
                        <div className="col-12 text-center">
                            <Link
                            type="button"
                            className="btn btn-danger mr-2"
                            to='/'
                            >
                            Kembali{" "}
                            </Link>
                            <Link
                            to ='/'
                            className="btn btn-secondary ml-2"
                            onClick={this.props.addBook}
                            >
                            Tambah{" "}
                            </Link>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
  }
  export default connect(
    "judulInput, penulisInput, categoryInput, listPenulis, drama, action, horror, comedy, romance",
    actions
  )(withRouter(AddBook));