import m from "mithril"
import Arxiv from "../models/arxiv"

var Navigation = {
  view(){
    return <div class="fl w-20">
      <h2 class="mt0 f4 fw7 bb">Category</h2>
      <ul>{ Arxiv.categories.map(category =>
        <li>{ category }</li>
      ) }</ul>
      <h2 class="mt0 f4 fw7 bb">Date</h2>
      <h2 class="mt0 f4 fw7 bb">Translation</h2>
    </div>
  }
}

export default Navigation
