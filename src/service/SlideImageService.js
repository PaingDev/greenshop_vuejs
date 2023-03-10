import BasicService from "./BasicService";

class SlideImageService extends BasicService {
  constructor() {
    super();
  }
  
  getAllSlideImage() {
    let url = `/slides`;
    return this.axios.get(url).then(request => request.data);
  }
}

const slideImageService = new SlideImageService();
export default slideImageService;
