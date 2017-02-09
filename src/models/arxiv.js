import m from "mithril"
import { getArxivQuery } from "../utils/calender"

const MAX_RESULTS = 500

function getTexts(node, selector) {
  return [...node.querySelectorAll(selector)]
          .map(elem => elem.innerHTML)
}
function getText(node, selector){
  return getTexts(node, selector)[0]
}

var Arxiv = {
  // configuration
  articles : [],
  totalNum: 0,
  date: null,
  categories: [],
  waiting: false,

  fetch(){
    if(Arxiv.waiting) return
    Arxiv.waiting = true
    let query = Arxiv.categories.map(e => `cat:${e}`).join(" OR ")
    query = `(${query}) AND submittedDate:[${getArxivQuery(Arxiv.date)}]`
    m.request({
      method: 'GET',
      url: 'http://export.arxiv.org/api/query',
      data: { search_query: query,
              sortBy: 'submittedDate',
              max_results: MAX_RESULTS},
      deserialize: content => (new DOMParser()).parseFromString(content, 'application/xml')
    })
    .then(xml => {
      let entries = [...xml.querySelectorAll('entry')];
      Arxiv.articles = entries.map(entry => ({
        title: getText(entry, 'title'),
        summary : getText(entry, 'summary').replace(/\r?\n/g, ' '),
        published: getText(entry, 'published'),
        id: getText(entry, 'id'),
        author: getTexts(entry, 'author name'),
        pdf: entry.querySelector('link[title="pdf"]').getAttribute('href'),
        category: [...entry.querySelectorAll('category')]
                    .map(cat => cat.getAttribute('term'))
      }))
      Arxiv.totalNum = parseInt(xml.querySelector('totalResults').innerHTML)
      Arxiv.waiting = false
    })
  },
  setParameters({ categories, date }){
    Arxiv.categories = categories
    Arxiv.date = date
  }
}

export default Arxiv
