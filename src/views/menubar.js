import m from "mithril"
import Arxiv from "../models/arxiv"
import { generateCalender } from "../utils/calender"

var MenuBar = {
  handleClick(day) {
    Arxiv.date = day
    Arxiv.fetch()
  },
  view(){
    let category = Arxiv.categories.join('+')
    return <div class="flex">
      <h2 class="ma0 f5 inline">Published At: </h2>
      <nav>
        <ul class="ma0 pa0">{
        generateCalender(5).map(({ label, day }) =>
          <li class="di ml2">
            <a href={`#!/${category}/${day}`} class="blue"
               onclick={() => MenuBar.handleClick(day)}>{ label }</a>
          </li>
        )
      }
      </ul></nav>
    </div>
  }
}

export default MenuBar
