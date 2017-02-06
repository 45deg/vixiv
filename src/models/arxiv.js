import m from "mithril"

function getTexts(node, selector) {
  return [...node.querySelectorAll(selector)]
          .map(elem => elem.innerHTML)
}
function getText(node, selector){
  return getTexts(node, selector)[0]
}

var Arxiv = {
  articles : [],
  fetch(){
    m.request({
      method: 'GET',
      url: 'http://export.arxiv.org/api/query',
      data: { search_query: 'cat:cs.*',
              sortBy: 'submittedDate' },
      deserialize: content => (new DOMParser()).parseFromString(content, 'application/xml')
    })
    .then(xml => {
      let entries = [...xml.querySelectorAll('entry')];
      console.log(entries)
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
    })
  }
}

export default Arxiv
