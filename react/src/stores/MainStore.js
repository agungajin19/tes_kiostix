import createStore from "unistore";
import axios from "axios";

const initialState = {
    listBook : [],
    listPenulis : [],
    listCategory : [],
    baseUrl : `http://localhost:5000`,
    judul : '',
    penulisId : '',
    categoryId : '',
    penulisInput : '',
    judulInput:'',
    categoryInput: [],
    drama : '',
    action : '',
    horror : '',
    comedy : '',
    romance : '',
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
      deleteBook: (state,id) => {   
        const req = {
          method: "delete",
          url: `${state.baseUrl}/book/${id}`,
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios(req)
          .then(response => {
            getBook(state.baseUrl)
          })
          .catch(error => {});
      },
      addBook: (state) => {
        //Check category checked or not
        let categories = []
        if (state.drama !== ''){
          categories.push(state.drama*1)
        }
        if (state.action !== ''){
          categories.push(state.action*1)
        }
        if (state.horror !== ''){
          categories.push(state.horror*1)
        }
        if (state.comedy !== ''){
          categories.push(state.comedy*1)
        }
        if (state.romance !== ''){
          categories.push(state.romance*1)
        }

        const req = {
          method: "post",
          url: `${state.baseUrl}/book`,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            judul: state.judulInput,
            penulis : state.penulisInput,
            category : categories
          }
        };
        axios(req)
          .then(response => {
            getBook(state.baseUrl)
            store.setState({
              drama : '',
              action : '',
              horror : '',
              comedy : '',
              romance : '',
            })
          })
          .catch(error => {});
      },
});

const getBook = (baseUrl) => {   
  const req = {
    method: "get",
    url: `${baseUrl}/book`,
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
}