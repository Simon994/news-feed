import React from 'react'
import logo from '../images/feed-large-3page.png'

const Header = ({ feedActive, loading }) => {
  return (
    <section className='hero is-info is-bold' id={!loading && 'hero-loading'}>
      <div className="hero-body header">
        <div className="container">
          <h1 className="title is-1 has-text-centered">
            <em>News Feed</em>
            <img src={logo} />
          </h1>
          <p className="intro-blurb">browse - create - curate<br /> your own personalised news</p>
        </div>
        {feedActive
          ? <div className="loading" id={loading && 'is-loading'}>LOADING</div>
          : <div className="feed-empty">
            <h3>Your feed is empty right now <br /> Browse to add</h3>
          </div>}
      </div>
    </section>
  )
}

export default Header