import BasicService from "./BasicService";

class CategoryService extends BasicService {
  constructor() {
    super();
  }
  getAllCategory() {
    let url = `/categories`;
    return this.axios.get(url).then(request => request.data);
  }
  getCategoryById(categoryId) {
    let url = `/categories/${categoryId}`;
    return this.axios.get(url).then(request => request.data);
  }
}

const categoryService = new CategoryService();
export default categoryService;
