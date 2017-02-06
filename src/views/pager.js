import m from "mithril"
import Arxiv from "../models/arxiv"
import Config from "../models/config"

var Pager = {
  onclick(category, start){
    let query = category.split('+').map(e => `cat:${e}`).join(" OR ")
    Arxiv.fetch(query, start)
  },
  view(vnode){
    let attrs = vnode.attrs
    let category = attrs.category
    let start = parseInt(attrs.start) || 0
    let prev = Math.max(0, start - Arxiv.resultsNum)
    let next = start + Arxiv.resultsNum
    let page = start / Arxiv.resultsNum + 1
    return <nav>
      { page > 1 &&
        <a href={`#!/${category}/${prev}`} onclick={() => Pager.onclick(category, prev)}>Prev</a>
      }
      <span>Page {page}</span>
      <a href={`#!/${category}/${next}`} onclick={() => Pager.onclick(category, next)}>Next</a>
      <input type="checkbox" checked={Config.summaryShow}
                             onchange={m.withAttr("checked", Config.setSummaryShow)}/>
    </nav>
  }
}

export default Pager
