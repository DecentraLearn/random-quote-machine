import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      quote: '',
      author: '',
      color: '#7FFFD4'
    };
    this.generateQuote = this.generateQuote.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          apiData: responseData.quotes,
        })
        this.handleClick();
      })
      .catch(error => this.setState({ error }))
  }
  generateQuote = () => {
    const randomNum = Math.floor((Math.random() * this.state.apiData.length) + 1);
    const chosenQuote = this.state.apiData[randomNum];
    this.setState({
      quote: chosenQuote.quote,
      author: chosenQuote.author
    })
  }

  changeColor = () => {
    const colors = [
      '#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#AE2012', '#9B2226'
    ]
    const randomNum = Math.floor((Math.random() * colors.length));
    this.setState({
      color: colors[randomNum]
    })
  }

  handleClick = () => {
    this.generateQuote();
    this.changeColor();
  }

  render() {
    return (
      <div id='main'>
      <style>
          {`
          :root {
            --main-color: ${this.state.color};
            }
          `}
        </style>
        <div id='topspace'>
          <h1 id='title' className='text-center'>Random Quote Machine</h1>
        </div>
        <div className='row'>
          <div className='col-2'/>
          <div className='col-8'>
            <div id='quote-box' className='container-fluid'>
                <div id='quote-content' className='row'>
                  <Quote className='row' quote={this.state.quote} />
                  <Author className='row' author={this.state.author}/>
                </div>
                <div id='toolbar' className='d-flex justify-content-between'>
                  <TweetLink />
                  <QuoteButton genQuote={this.handleClick}/>
                </div>
            </div>
          </div>
        </div>
      </div>
    )}
}

const Quote = function(props) {
  return(
    <div>
      <h1 id='text' className='text-center'>'{props.quote}'</h1>
    </div>
  )
}

const Author = function(props) {
  return(
    <div>
      <p id='author'>{props.author}</p>
    </div>
  )
}

const QuoteButton = function(props) {
  return(
    <button id='new-quote' className='btn btn-outline-light' onClick={props.genQuote}>Random Quote</button>
  )
}

const TweetLink = function() {
  return(
    <a id='tweet-quote' href="twitter.com/intent/tweet">
      <i id='twitter-icon' class="fa fa-twitter" aria-hidden="true"></i>
    </a>
  )
}


export default App;
