import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css'

import {data} from './data.js';

let json = data.filter((item) => !item.hidden)


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}

console.log(json)

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state={elements:json}
  }


  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  handleChange(event){
    let term = event.target.value.toLowerCase();
    this.setState({elements:json.filter( (item) => 
      (item.name.toLowerCase().search(term) !== -1)
      ||((item.description||'').toLowerCase().search(term) !== -1)
    
    
    )})
  }

  render() {
    return (
        <div className="game-board">
        <div className="row">
           <nav>
            <div className="nav-wrapper">
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="http://github.com">Add Your Project</a></li>
              </ul>
              <form >
                <div className="input-field">
                  <input  value={this.state.value} onChange={this.handleChange} type="search" required placeholder='Search Jupyter Ecosystem'></input>
                  <label className="label-icon" ><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>
          </nav>
          <div className="input-field col s12">
           <ul className="collection">
            {
             this.state.elements.map( function(item){
                
               return (<li className="collection-item">
                <div className="row">
                 <div className="col m2">
                  <img src={"/ecosystem/"+item.path+'/logo.'+item.logo} alt="" className="logos"></img>
                 </div>
                 <div className="col m10">
                  <a href={item.url} className="secondary-content"><i className="material-icons">link</i></a>
                  <a href={item.url} className="secondary-content">{item.license}</a>
                  <a href={item.url} className="secondary-content">{item.category}</a>
                  <h3 className="title">{item.name}</h3>
                  <p>{item.description}</p>
                 </div>
                </div>
              </li>)
             }
             )
            }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return <Board />;
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

