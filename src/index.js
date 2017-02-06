// index.js
import m from "mithril"
import Navigation from "./views/navigation"
import Articles from "./views/articles"
import Arxiv from "./models/arxiv"

var App = {
  oninit(vnode){
    Arxiv.setParameters({
      categories: vnode.attrs.category.split('+'),
      start: parseInt(vnode.attrs.start) || 0
    })
  },
  view(){
    return <div class="ph5-ns">
      <h1>Read Latest Papers from arXiv!</h1>
      <div>
        <Navigation />
        <Articles />
      </div>
    </div>
  }
}

m.route(document.body, '/cs.*', {
  '/:category': App,
  '/:category/:start': App
})
