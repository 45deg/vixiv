// index.js
import m from "mithril"

function getTexts(node, selector) {
  return [...node.querySelectorAll(selector)]
          .map(elem => elem.innerHTML)
}

var Data = {
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
      Data.articles = entries.map(entry => ({
        title: getTexts(entry, 'title')[0],
        summary : getTexts(entry, 'summary')[0].replace(/\r?\n/g, ''),
        published: getTexts(entry, 'published')[0],
        id: getTexts(entry, 'id')[0],
        author: getTexts(entry, 'author name'),
        pdf: entry.querySelector('link[title="pdf"]').getAttribute('href'),
        category: [...entry.querySelectorAll('category')]
                    .map(cat => cat.getAttribute('term'))
      }))
    })
  }
}

var App = {
  oninit: Data.fetch,
  view(){
    return <div class="ph5-ns">
      <h1>Read Latest Papers from arXiv!</h1>
      <div>
        <div class="fl w-20">
          <h2 class="mt0 f4 fw7 bb">Category</h2>
          <h2 class="mt0 f4 fw7 bb">Date</h2>
          <h2 class="mt0 f4 fw7 bb">Translation</h2>
        </div>
        <div class="fl w-80 ph2">{
          Data.articles.map(article =>
            <article class="bb b--black-60 pa2">
              <header>
                <p class="ma0"><time class="b">{ article.published }</time></p>
                <h2 class="ma0 f4 lh-title">
                  <a href={article.id} class="blue dim">{article.title}</a>
                  <a class="black link ml2 hover-red" href={article.pdf}><i class="fa fa-file-pdf-o"></i></a>
                </h2>
                <div class="dark-green ma0 f6">{ article.author.join(', ') }</div>
              </header>
              <p class="serif ma2">
                { article.summary }
                <span class="ml2">
                  <a href={ 'https://translate.google.co.jp/#auto/ja/' + encodeURIComponent(article.summary) }>translate</a>
                </span>
              </p>
              <footer>
                <p class="ma0">Category: {
                  article.category.join(', ')
                }</p>
              </footer>
            </article>
          )
        }</div>
      </div>
    </div>
  }
}

m.mount(document.body, App)
