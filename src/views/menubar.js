import m from "mithril"
import Arxiv from "../models/arxiv"
import Config from "../models/config"
import CategorySelector from "./category-selector"
import Category from "../models/category"
import { generateCalender } from "../utils/calender"

var MenuBar = {
  handleClick(day) {
    Arxiv.date = day
    Arxiv.fetch()
  },
  view(){
    let category = Arxiv.categories.join('+')
    return <div>
      <div class="flex">
      <h2 class="ma0 f5 inline">Published At: </h2>
      <nav>
        <ul class="ma0 pa0">{
        generateCalender(5).map(({ label, day }) =>
          <li class="di ml2">
            <a href={`#!/${category}/${day}`} class="blue"
               onclick={() => MenuBar.handleClick(day)}>{ label }</a>
          </li>
        )
        }</ul>
      </nav>
      <div class="fr">
        <input type="checkbox" checked={Config.summaryShow} id="toggle-summary"
                       onchange={m.withAttr("checked", Config.setSummaryShow)} />
        <label for="toggle-summary">Show Summary</label>
        <a href="javascript:void(0)"
           onclick={() => Category.toggleShow()}>▼ Select Category</a>
      </div>
      </div>
      <CategorySelector />
    </div>
  }
}

export default MenuBar
