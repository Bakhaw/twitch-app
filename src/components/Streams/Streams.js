import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';

import Header from './Header';
import FrenchStreams from './FrenchStreams';

import { connect } from 'react-redux';
import { fetchGames } from '../../redux/actions/fetchGames';
import { fetchStreams } from '../../redux/actions/fetchStreams';

class Streams extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // store the game ID from the react router params (/streams/gameID) to make dynamic fetching with this ID    
      gameId: this.props.match.params.gameId,
      // number of streams to fetch every time
      numberToFetch: 20
    }
  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleOnScroll);

    this.fetchInitData();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  fetchInitData = () => {
    // fetch the first 20 streams
    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?game_id=${this.state.gameId}&first=${this.state.numberToFetch}`);
  }

  fetchMoreData = () => {
    // when the page is fully scrolled down, fetch 20 new streams
    this.setState({ numberToFetch: this.state.numberToFetch + 20 })
    this.props.fetchStreams(`https://api.twitch.tv/helix/streams?game_id=${this.state.gameId}&first=${this.state.numberToFetch}`)
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && this.state.numberToFetch < 100) {
      // if page is scrolled to bottom and total streams fetched are less than 100, fires fetchMoreData()
      this.fetchMoreData();
    }
  }

  render() {

    // streams array
    const streams = this.props.streams.streams.data;
    let gameId = this.props.match.params.gameId;


    return (
      <div className="rightContent">


        {/* Before data is loaded... */}
        {!this.props.streams.fetched &&
          <div className="loading">
            <CircularProgress size={20} color="black"/>
          </div>
        }

        <div>
          {/* When data is loaded... */}
          {this.props.streams.fetched &&
            <div className="streamsFirstContainer">
              <Header gameId={gameId} />
              
              <FrenchStreams streams={streams} gameId={gameId} />

              <div className="streamsSecondContainer">
                {streams.map((stream, index) => {

                  let streamer = stream.thumbnail_url.slice(52).slice(0, -21);
                  let streamImage = stream.thumbnail_url.slice(0, -20) + "320x180.jpg";
                  let streamUrl = `/live/${gameId}/${streamer}`;

                  return (
                    <div key={index} className="streamsThirdContainer">

                      <h4 className="streamsTitle">TOUTES LES CHAÎNES</h4>

                      <div className="streamCard">
                        <Link to={streamUrl}
                              params={{ gameId, streamer }}>
                          <img src={streamImage} alt={`${streamer} cover image`} />
                        </Link>
                        <Link to={streamUrl}
                              params={{ gameId, streamer }}>
                          <h3>{stream.title}</h3>
                        </Link>
                        <p>{stream.viewer_count.toLocaleString()} spectateurs sur 
                          <Link to={`/${gameId}/${streamer}/videos`}
                                params={{ gameId, streamer }}>
                            &nbsp;{streamer}
                          </Link>
                        </p>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.streamsReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (url) => { dispatch(fetchStreams(url)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Streams);