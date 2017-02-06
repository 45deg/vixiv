import m from "mithril"
import Arxiv from "../models/arxiv"
import Config from "../models/config"

function generatePagenation(currentStart){
  let array = []
  let pile = Arxiv.resultsNum
  let currentPage = currentStart / pile + 1
  let offset = Math.max(1, currentPage - 3)
  for(let page = offset; page < offset + 7; page++){
    let start = (page - 1) * pile
    if(Arxiv.totalNum <= start) { break }
    array.push({
      self: page === currentPage,
      start,
      page,
    })
  }
  return array
}

var Pager = {
  onclick(start){
    Arxiv.fetch(start)
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  view(){
    let category = Arxiv.categories.join('+')
    let currentStart = Arxiv.start
    let prev = Math.max(0, currentStart - Arxiv.resultsNum)
    let next = currentStart + Arxiv.resultsNum
    return <nav class="tc">
      <ul class="dib ma2 pa0 f5 center">
      { prev > 0 &&
        <li class="di">
          <a href={`#!/${category}/${prev}`} onclick={() => Pager.onclick(prev)}
             class="no-underline blue">
             <i class="fa fa-angle-double-left"></i>
          </a>
        </li>
      }
      {
        generatePagenation(currentStart).map(({ page, start, self }) =>
          <li class="di mh2">
            {
              self ?
                <span class="b">{page}</span>
              :
                <a href={`#!/${category}/${start}`}
                   onclick={() => Pager.onclick(start)}
                   class="no-underline blue">
                   {page}
                </a>
            }
          </li>
        )
      }
      { Arxiv.totalNum > next && <li class="di">
          <a href={`#!/${category}/${next}`} onclick={() => Pager.onclick(next)}
             class="no-underline blue">
             <i class="fa fa-angle-double-right"></i>
          </a>
        </li> }
      </ul>
      { /* <input type="checkbox" checked={Config.summaryShow}
                             onchange={m.withAttr("checked", Config.setSummaryShow)}/>*/}
    </nav>
  }
}

export default Pager
