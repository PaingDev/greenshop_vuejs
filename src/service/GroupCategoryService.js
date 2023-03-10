import BasicService from "./BasicService";

class GroupCategoryService extends BasicService {
  constructor() {
    super();
  }
  
  getSpecialCategoryByGroupId(groupCatId) {
    let url = `/groupCategory/${groupCatId}`;
    return this.axios.get(url).then(request => request.data);
  }
  getAllCategory(){
    let url = `/groupCategory`;
    return this.axios.get(url).then(request=> request.data);
  }
}

const groupCategoryService = new GroupCategoryService();
export default groupCategoryService;
