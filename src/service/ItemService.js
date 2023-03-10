import BasicService from "./BasicService";

class ItemService extends BasicService {
  constructor() {
    super();
  }
  getAllItem(page = 0, pageSize = 10) {
    let url = `/items`;
    return this.axios
      .get(url, {
        params: {
          page,
          pageSize,
        },
      })
      .then((request) => request.data);
  }

  getItemByCategoryId(categoryId, sort = { sortBy: "", dir: "ASC" }) {
    let url = `/categories/${categoryId}/items`;
    return this.axios
      .get(url, {
        params: {
          sortBy: sort.sortBy,
          dir: sort.dir,
          page: 0,
          pageSize: 100,
        },
      })
      .then((request) => request.data);
  }

  getItemByName(itemName, sort = { sortBy: "", dir: "ASC" }) {
    let url = "/item";
    return this.axios
      .get(url, {
        params: {
          itemName,
          sortBy: sort.sortBy,
          dir: sort.dir,
          page: 0,
          pageSize: 100,
        },
      })
      .then((request) => request.data);
  }

  loadSpecialCategory() {
    let url = "/specialCategories";
    return this.axios.get(url).then((request) => request.data);
  }
}

const itemService = new ItemService();
export default itemService;
