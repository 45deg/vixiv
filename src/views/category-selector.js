import m from "mithril"
import Arxiv from "../models/arxiv"
import Category from "../models/category"

var CategorySelector = {
  oninit(){
    Category.selected = new Set(Arxiv.categories)
  },
  toggleCheckbox(checked){
    if(checked) {
      Category.selected.add(this.abbr)
    } else {
      Category.selected.delete(this.abbr)
    }
  },
  toggleSub(abbr){
    if(!Category.openSubs.has(abbr)) {
      Category.openSubs.add(abbr)
    } else {
      Category.openSubs.delete(abbr)
    }
  },
  handleSubmit(e){
    e.preventDefault()
    let categories = [...Category.selected]
    let category = categories.join('+')
    let date = Arxiv.date
    location.href = `#!/${category}/${date}`
    Arxiv.setParameters({ categories, date })
    Arxiv.fetch()
    Category.show = false
  },
  view(){
    if(!Category.show) return false
    return <form onsubmit={CategorySelector.handleSubmit}>
      <div class="bg-black-20 cf">
        <div class="flex flex-wrap">{
          Category.list.map(({ category, abbr, sub }) => {
            let metaAbbr = abbr
            let id = abbr && abbr.replace(/[^A-Za-z]/g, '')
            return <div class="pa3 f6">
               <h3 class="ma0">
                  { metaAbbr !== null ?
                    [
                      <input type="checkbox" class="mr1" id={id}
                             checked={Category.selected.has(metaAbbr)}
                             onchange={m.withAttr("checked",
                                           CategorySelector.toggleCheckbox,
                                           { abbr })} />,
                      <label for={id}>{ category }</label>
                    ]
                  : category }
               </h3>
                 <ul class="list ma0 pa2">{
                   sub.map(({ abbr, title }) => {
                     let id = abbr.replace(/[^\w]/g, '')
                     let disabled = Category.selected.has(metaAbbr)
                     let checked  = Category.selected.has(abbr)
                     return <li class={disabled ? "black-50" : ""}>
                      <input type="checkbox" id={id} value={abbr} class="mr1"
                             checked={checked} disabled={disabled}
                             onchange={m.withAttr("checked",
                                           CategorySelector.toggleCheckbox,
                                           { abbr })} />
                      <label for={id}>{title} ({abbr})</label>
                     </li>
                   })
                 }</ul>
            </div>
          })
        }</div>
        <div class="tc pb2 fw6 f4">
          <input type="submit" value="OK" />
        </div>
      </div>
    </form>
  }
}

export default CategorySelector
