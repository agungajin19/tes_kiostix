import createStore from "unistore";
import axios from "axios";

const initialState = {
    listBook : [],
    listPenulis : [],
    listCategory : [],
    baseUrl : `localhost:5000`,
    judul : '',
    penulisId : '',
    categoryId : ''
}
export const store = createStore(initialState);

export const actions = store => ({
    getBook: state => {   
        const req = {
          method: "get",
          url: `${state.baseUrl}/book?judul=${state.judul}&penulis_id=${state.penulisId}&category_id=${state.categoryId}`,
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios(req)
          .then(response => {
            store.setState({
              listBook: response.data.result,
            });
          })
          .catch(error => {});
      },
      getPenulis: state => {   
        const req = {
          method: "get",
          url: `${state.baseUrl}/penulis`,
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios(req)
          .then(response => {
            store.setState({
              listPenulis: response.data.result,
            });
          })
          .catch(error => {});
      },
      getCategory: state => {   
        const req = {
          method: "get",
          url: `${state.baseUrl}/category`,
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios(req)
          .then(response => {
            store.setState({
              listCategory: response.data.result,
            });
          })
          .catch(error => {});
      },
});