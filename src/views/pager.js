import m from "mithril"
import Arxiv from "../models/arxiv"
import Config from "../models/config"

var Pager = {
  view(){
    let category = Arxiv.categories.join('+')
    let start = parseInt(Arxiv.start) || 0
    let prev = Math.max(0, start - Arxiv.resultsNum)
    let next = start + Arxiv.resultsNum
    let page = start / Arxiv.resultsNum + 1
    return <nav>
      { page > 1 &&
        <a href={`#!/${category}/${prev}`} onclick={() => Arxiv.fetch(start)}>Prev</a>
      }
      <span>Page {page}</span>
      <a href={`#!/${category}/${next}`} onclick={() => Arxiv.fetch(next)}>Next</a>
      <input type="checkbox" checked={Config.summaryShow}
                             onchange={m.withAttr("checked", Config.setSummaryShow)}/>
    </nav>
  }
}

export default Pager
