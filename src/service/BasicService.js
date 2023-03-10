import axios from "../config";
import AXIOS from "axios";
import swal from "sweetalert2";

export default class BasicService {
  constructor() {
    this.axios = axios;
    this.AXIOS = AXIOS;
    this.swal = swal;
  }
}
