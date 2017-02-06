import m from "mithril"

var Config = {
  summaryShow : true,
  language : 'ja',
  setSummaryShow(flag){
    Config.summaryShow = !!flag
  }
}

export default Config
