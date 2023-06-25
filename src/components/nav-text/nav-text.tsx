import React from 'react'
import './nav-text.scss'

export const NavText: React.FC = () => {
  /*
    Just placeholder item. If navigation implemented this item will get
    replaced with proper nav bar show where we are in
    the url "what page we are on."
      */
  return (
    <section className={'---section-wrapper'}>
      <p className={'main-p'} data-testid="page-dir">
        Home / <span>Cocktail List</span>
      </p>
    </section>
  )
}
