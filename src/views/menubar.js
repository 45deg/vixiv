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
  toggleSelector(){
    let open = Category.toggleShow()
    if(!open) {
      Category.submit()
    }
  },
  view(){
    let category = Arxiv.categories.join('+')
    return <div>
      <div class="cf pv1">
        <h2 class="ma0 f5 inline fl">Published At: </h2>
        <nav>
          <ul class="ma0 pa0">{
          generateCalender(5).map(({ label, day }) =>
            <li class="di ml2 fl">
              <a href={`#!/${category}/${day}`} class="blue"
                 onclick={() => MenuBar.handleClick(day)}>{ label }</a>
            </li>
          )
          }</ul>
        </nav>
        <div class="fr">
          <input type="checkbox" class="mr1"
                 checked={Config.summaryShow} id="toggle-summary"
                 onchange={m.withAttr("checked", Config.setSummaryShow)} />
          <label for="toggle-summary">Show Summary</label>
          <a href="javascript:void(0)" class="ml2 link blue"
             onclick={MenuBar.toggleSelector}>
              {Category.show ? "▼" : "▶"} Select Category</a>
        </div>
      </div>
      <CategorySelector />
    </div>
  }
}

export default MenuBar
