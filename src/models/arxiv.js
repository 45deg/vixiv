import m from "mithril"

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
  resultsNum : 15,
  start: 0,
  categories: [],
  waiting: false,

  fetch(start){
    Arxiv.waiting = true
    Arxiv.start   = start
    let query = Arxiv.categories.map(e => `cat:${e}`).join(" OR ")
    m.request({
      method: 'GET',
      url: 'http://export.arxiv.org/api/query',
      data: { search_query: query,
              sortBy: 'submittedDate',
              start,
              max_results: Arxiv.resultsNum},
      deserialize: content => (new DOMParser()).parseFromString(content, 'application/xml')
    })
    .then(xml => {
      let entries = [...xml.querySelectorAll('entry')];
      Arxiv.articles = entries.map(entry => ({
        title: getText(entry, 'title'),
        summary : getText(entry, 'summary').replace(/\r?\n/g, ''),
        published: getText(entry, 'published'),
        id: getText(entry, 'id'),
        author: getTexts(entry, 'author name'),
        pdf: entry.querySelector('link[title="pdf"]').getAttribute('href'),
        category: [...entry.querySelectorAll('category')]
                    .map(cat => cat.getAttribute('term'))
      }))
      Arxiv.waiting = false
    })
  },
  setParameters({ categories, start }){
    Arxiv.categories = categories
    Arxiv.start = start
  }
}

export default Arxiv
