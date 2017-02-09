// index.js
import m from "mithril"
import Articles from "./views/articles"
import MenuBar from "./views/menubar"
import Arxiv from "./models/arxiv"
import { generateCalender } from "./utils/calender"

var App = {
  oninit(vnode){
    Arxiv.setParameters({
      categories: vnode.attrs.category.split('+'),
      date: parseInt(vnode.attrs.date) || generateCalender(1)[0].day
    })
  },
  view(){
    return <div class="ph5-ns">
      <h1>Read Latest Papers from arXiv!</h1>
      <MenuBar />
      <Articles />
    </div>
  }
}

m.route(document.body, '/cs.*', {
  '/:category': App,
  '/:category/:date': App
})
