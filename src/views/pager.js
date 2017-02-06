import m from "mithril"
import Arxiv from "../models/arxiv"
import Config from "../models/config"

function genPages(page){
  let array = []
  let start = Math.max(1, page - 3)
  for(let i = start; i < start + 7; ++i){
    array.push(i)
  }
  return array
}

var Pager = {
  view(){
    let category = Arxiv.categories.join('+')
    let start = Arxiv.start
    let prev = Math.max(0, start - Arxiv.resultsNum)
    let next = start + Arxiv.resultsNum
    let currentPage = start / Arxiv.resultsNum + 1
    return <nav class="tc">
      <ul class="dib ma2 pa0 f5 center">
      { currentPage > 1 &&
        <li class="di">
          <a href={`#!/${category}/${prev}`} onclick={() => Arxiv.fetch(prev)}
             class="no-underline blue">
             <i class="fa fa-angle-double-left"></i>
          </a>
        </li>
      }
      {
        genPages(currentPage).map(page =>
          <li class="di mh2">
            {
              page === currentPage ?
                <span class="b">{page}</span>
              :
                <a href={`#!/${category}/${(page - 1) * Arxiv.resultsNum}`}
                   onclick={() => Arxiv.fetch((page - 1) * Arxiv.resultsNum)}
                   class="no-underline blue">
                   {page}
                </a>
            }
          </li>
        )
      }
      { <li class="di">
          <a href={`#!/${category}/${next}`} onclick={() => Arxiv.fetch(next)}
             class="no-underline blue">
             <i class="fa fa-angle-double-right"></i>
          </a>
        </li>
      }
      </ul>
      { /* <input type="checkbox" checked={Config.summaryShow}
                             onchange={m.withAttr("checked", Config.setSummaryShow)}/>*/}
    </nav>
  }
}

export default Pager
