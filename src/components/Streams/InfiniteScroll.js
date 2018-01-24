import React, { Component } from 'react';
import axios from 'axios';
import config from '../../key';
import CircularProgress from 'material-ui/CircularProgress';
import './InfiniteScroll.scss';

class InfiniteData extends Component {
  
  constructor() {
    super();
    this.state = {
      data: [],
      requestSent: false,
      number: 25
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleOnScroll);

    this.props.initFetchData;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  querySearchResult = () => {
    if (this.state.requestSent) {
      return;
    }
    // enumerate a slow query

    if (this.props.numberToFetch < 100) {
      setTimeout(this.props.fetchMoreData, 1000);      
    }

    this.setState({ requestSent: true })

    console.log('REACHED');
    console.log(this.state);    
  }

  initFetchData = () => {
    this.props.initFetchData;    
    // const url = `https://api.twitch.tv/helix/streams?game_id=21779&first=${this.state.number}`
    // axios
    //   .get(url, config)
    //   .then(res => this.setState({ data: res.data.data }))
  }

  fetchMoreData = () => {
    this.props.fetchMoreData;
    // this.setState({ number: this.state.number + 25 })
    // const url = `https://api.twitch.tv/helix/streams?game_id=21779&first=${this.state.number}`
    // axios
    //   .get(url, config)
    //   .then(res => this.setState({ data: res.data.data, requestSent: false }))
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.querySearchResult();
    }
  }

  render () {
    return (
      <div>
        <div className="data-container">
          {this.props.streams.map((data, index) => {
              return (
                <div className="data-info" key={index}>
                  <p>{data.id}</p>
                  <p>{data.user_id}</p>
                  <p>{data.game_id}</p>
                  <p>{data.type}</p>
                </div>
              )
            })
          }
        </div>
        {(() => {
          if (this.state.requestSent) {
            return(
              <div className="data-loading">
                <CircularProgress size={20} color="black"/>
              </div>
            );
          } else {
            return(
              <div className="data-loading"></div>
            );
          }
        })()}
      </div>
    );
  }
} 

export default InfiniteData;