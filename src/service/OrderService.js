import BasicService from "./BasicService";

class OrderService extends BasicService {
  constructor() {
    super();
  }

  saveOrder({
    listDto = [],
    townshipId = 0,
    address = "",
    phoneNo = "",
    preferedTime = "",
    date = "",
  }) {
    let url = `/orders`;
    return this.axios
      .post(url, {
        listDto,
        townshipId,
        address,
        phoneNo,
        preferedTime,
        date,
      })
      .then((request) => request.data);
  }

  getOrder() {
    let url = `/orders`;
    return this.axios.get(url).then((request) => request.data);
  }

  login(token) {
    console.log(token);
    let url = `/userLogin?token=${token}`;
    return this.axios.post(url).then((request) => request.data);
  }

  loginPhone(token) {
    let url = `/userLogin/phone`;
    return this.axios
      .post(url, null, {
        params: {
          token,
        },
      })
      .then((request) => request.data);
  }

  getTownship() {
    let url = `/township`;
    return this.axios.get(url).then((request) => request.data);
  }
}

const orderService = new OrderService();
export default orderService;
