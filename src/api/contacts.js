import axios from "axios"

const url = axios.create({
    baseURL:"https://tgt-commerce-server.herokuapp.com/api/products"
});

export default url;