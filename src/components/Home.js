import React from 'react'

import { getKeywords, getSources, removeSubscription } from '../lib/feed'
import { getEverything } from '../lib/api'
import Header from './Header'
import SectionScroll from './SectionScroll'

class Home extends React.Component {

  state = {
    keywords: null,
    sources: null,
    loading: true
  }

  async componentDidMount() {
    const keywords = getKeywords()
    if (keywords) {
      const keywordsObj = await this.getArticles(keywords, 'q')
      this.setState({ keywords: keywordsObj })
    }
    const sources = getSources()
    if (sources) {
      const sourcesObj = await this.getArticles(sources, 'source')

      console.log(sourcesObj)
      this.setState({ sources: sourcesObj, loading: false })
    }
  }

  async getArticles(param, type) {
    const queryObj = []

    for (let i = 0; i < param.length; i++) {
      const q = type === 'q' ? param[i] : ''
      const source = type === 'source' ? param[i] : ''

      const response = await getEverything({ q: q, sources: source, pageSize: 20 })
      console.log(response)
      queryObj.push({ q: param[i], articles: response.data.articles })
    }

    return queryObj
  }

  removeSub = (type, query) => {
    removeSubscription(type, query)
  }


  render() {
    return (
      <>
        <Header feedActive={getKeywords() || getSources()} loading={this.state.loading} />
        {this.state.sources &&
          this.state.sources.map((source, i) => <SectionScroll key={i} query={source} type="source" removeSub={this.removeSub} />)}
        {this.state.keywords &&
          this.state.keywords.map((keyword, i) => <SectionScroll key={i} query={keyword} type="keyword" removeSub={this.removeSub} />)}
      </>
    )
  }
}

export default Home