import * as axios from "axios";


export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {
    this.api_token = null;

    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getUsers = () => {
    return this.init().get("/users/");
  };

  getUser = (id)=>{
    return this.init().get(`/users/${id}`);
  }

  getSummary = () => {
    return this.init().get("/summary/");
  };

  getUserSales = (id) => {
    return this.init().get(`/salelogs?uid=${id}`);
  };


}