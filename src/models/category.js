import m from "mithril"
import CATEGORY_LIST from "../category"
import Arxiv from "./arxiv"

var Category = {
  list : CATEGORY_LIST,
  selected : null,
  show: false,
  toggleShow(){
    return Category.show = !Category.show
  },
  submit(){
    let categories = [...Category.selected]
    let category = categories.join('+')
    let date = Arxiv.date
    location.href = `#!/${category}/${date}`
    Arxiv.setParameters({ categories, date })
    Arxiv.fetch()
    Category.show = false
  }
}

export default Category
