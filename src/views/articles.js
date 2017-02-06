import m from "mithril"
import Arxiv from "../models/arxiv"
import Pager from "./pager"

var Articles = {
  oninit(vnode) {
    let categories = vnode.attrs.category.split("+")
    let query = categories.map(e => `cat:${e}`).join(" OR ")
    Arxiv.fetch(query, vnode.attrs.start || 0)
  },
  view(vnode){
    return <main class="fl w-80 ph2">
    <Pager {...vnode.attrs} />
    {
      Arxiv.articles.map(article =>
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
    }</main>
  }
}

export default Articles
