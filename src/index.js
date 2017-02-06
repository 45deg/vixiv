// index.js
import m from "mithril"
import Navigation from "./views/navigation"
import Articles from "./views/articles"

var App = {
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

m.mount(document.body, App)
