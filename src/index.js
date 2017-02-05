// index.js
var m = require("mithril")

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
        title: entry.querySelector('title').innerHTML,
        summary : entry.querySelector('summary').innerHTML
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
          <h2 class="mt0 f4 fw7 ttu tracked bb">Category</h2>
          <h2 class="mt0 f4 fw7 ttu tracked bb">Date</h2>
        </div>
        <div class="fl w-80 serif">{
          Data.articles.map(article =>
            <article class="outline">
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
            </article>
          )
        }</div>
      </div>
    </div>
  }
}

m.mount(document.body, App)
