import m from "mithril"
import CATEGORY_LIST from "../category"

var Category = {
  list : CATEGORY_LIST,
  selected : null,
  show: false,
  toggleShow(){
    Category.show = !Category.show
  }
}

export default Category
