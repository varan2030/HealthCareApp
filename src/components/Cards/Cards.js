import React from 'react';
import './Cards.css';

const Cards = props => (
  <div className="card" onClick={() => props.clickCard(props.title, props.content, props.url)}>
  <div className="lang">{props.lang}</div>
    <h4 className="card-head">{props.title}</h4>
        <div dangerouslySetInnerHTML={{__html: props.content}}></div>
    </div>
)

export default Cards;