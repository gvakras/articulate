import React from 'react';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';

import messages from '../messages';
import gravatars from '../../../components/Gravatar';
import ChannelsLogos from '../../../components/ChannelsLogos';
import ChannelsColors from '../../../components/ChannelsColors';
import connectionIcon from '../../../images/connection-icon.svg';
import brokenConnectionIcon from '../../../images/broken-connection-icon.svg';

const styles = {
  cardsContainer: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    marginBottom: '80px',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
  },
  newConnectionCard: {
    border: '1px solid #00bd6f',
    height: '205px',
    width: '205px',
    position: 'relative',
  },
  newConnectionCardContent: {
    color: '#00bd6f',
    fontSize: '18px',
    fontFamily: 'Montserrat',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    display: 'grid',
    textAlign: 'center',
    cursor: 'pointer',
    height: '205px',
  },
  connectionCard: {
    border: '1px solid #a2a7b1',
    height: '205px',
    width: '205px',
    cursor: 'pointer',
    position: 'relative',
  },
  emptyCard: {
    border: 0,
    height: 0,
    width: 220,
    backgroundColor: 'transparent',
  },
  connectionCardHeader: {
    color: '#4e4e4e',
    fontSize: '22px',
    fontFamily: 'Montserrat',
    textAlign: 'left',
  },
  connectionNameCard: {
    fontSize: '18px',
  },
  connectionCardContent: {
    color: '#979797',
    fontSize: '14px',
    fontFamily: 'Montserrat',
    textAlign: 'left',
    paddingTop: 0,
    height: '95px',
  },
  link: {
    textDecoration: 'none',
  },
  menuIcon: {
    float: 'right',
    top: '23px',
    right: '20px',
    cursor: 'pointer',
    position: 'relative',
  },
  trashIcon: {
    position: 'relative',
    top: '2px',
    marginRight: '5px',
  },
  exportFooter: {
    borderTop: '1px solid #979797',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    minHeight: '30px',
  },
  exportLabel: {
    '&:hover': {
      color: '#4a4a4a',
    },
    color: '#919192',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  exportLabelReady: {
    color: '#00bd6f',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  importLabel: {
    color: '#00bd6f',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  connectionIcon: {
    marginRight: '5px',
    height: '30px',
  },
  channelIcon: {
    marginTop: '20px',
    height: '30px',
  },
  connectionLink: {
    marginTop: '20px',
    height: '15px',
  },
  agentNameTitle: {
    fontSize: '16px',
  },
  channelTitle: {
    fontSize: '18px',
    fontWeight: '500',
  },
  connectionDataContainer: {
    marginTop: '25px',
  },
};

/* eslint-disable react/prefer-stateless-function */
class ConnectionsCards extends React.Component {
  constructor(props) {
    super(props);
    this.addEmptyCards = this.addEmptyCards.bind(this);
  }

  componentDidMount() {
    if (document.getElementById('dvCardsContainer').addEventListener) {
      // IE9, Chrome, Safari, Opera
      document
        .getElementById('dvCardsContainer')
        .addEventListener('mousewheel', this.scrollHorizontally, false);
      // Firefox
      document
        .getElementById('dvCardsContainer')
        .addEventListener('DOMMouseScroll', this.scrollHorizontally, false);
    } else {
      // IE 6/7/8
      document
        .getElementById('dvCardsContainer')
        .attachEvent('onmousewheel', this.scrollHorizontally);
    }
  }

  scrollHorizontally(e) {
    e = window.event || e;
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.getElementById('dvCardsContainer').scrollLeft -= delta * 40; // Multiplied by 40
    e.preventDefault();
  }

  state = {
    selectedConnection: null,
  };

  addEmptyCards(numOfCards) {
    const emptyCards = [];
    // the ui show 4 cards as max per row
    const numberOfRows = Math.ceil(numOfCards / 4);
    for (let index = 0; index < numberOfRows * 4 - (1 + numOfCards); index++) {
      emptyCards.push(
        <Grid
          key={`emptyCard_${index}`}
          className={this.props.classes.emptyCard}
        />,
      );
    }
    return emptyCards;
  }

  render() {
    const { classes, connections, channels, agents } = this.props;
    return (
      <Grid
        className={classes.cardsContainer}
        justify={window.window.innerWidth < 675 ? 'center' : 'flex-start'}
        container
        spacing={16}
      >
        <Grid key="newConnectionCard" item>
          <Card className={classes.newConnectionCard}>
            <CardContent
              onClick={() => {
                this.props.onGoToUrl('/connection/create');
              }}
              className={classes.newConnectionCardContent}
            >
              <FormattedMessage {...messages.createConnection} />
            </CardContent>
          </Card>
        </Grid>
        {connections.map((connection, index) => {
          const agent = connection.agent
            ? agents.filter(
                tempAgent => parseInt(tempAgent.id) === connection.agent,
              )[0]
            : null;
          return (
            <Grid key={`connectionCard_${index}`} item>
              <Card className={classes.connectionCard}>
                <CardContent
                  onClick={() => {
                    this.props.onGoToUrl(`/connection/${connection.id}`);
                  }}
                  className={classes.connectionCardContent}
                >
                  <Grid
                    className={classes.connectionDataContainer}
                    container
                    justify="center"
                  >
                    <Grid container justify="center" item xs={12}>
                      {agent
                        ? gravatars[agent.gravatar - 1]({
                            color: agent.uiColor,
                            className: classes.connectionIcon,
                          })
                        : null}
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <Typography
                        className={classes.agentNameTitle}
                        style={{ color: agent ? agent.uiColor : '' }}
                      >
                        {agent ? agent.agentName : null}
                      </Typography>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <img
                        className={classes.connectionLink}
                        src={
                          connection.agent
                            ? connectionIcon
                            : brokenConnectionIcon
                        }
                      />
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <ChannelsLogos
                        logo={connection.channel}
                        className={classes.channelIcon}
                      />
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <Typography
                        className={classes.agentNameTitle}
                        style={{ color: ChannelsColors[connection.channel] }}
                      >
                        {channels[connection.channel].name}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        {this.addEmptyCards(connections.length)}
      </Grid>
    );
  }
}

ConnectionsCards.propTypes = {
  classes: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  agents: PropTypes.array.isRequired,
  channels: PropTypes.object.isRequired,
  onGoToUrl: PropTypes.func,
};

export default withStyles(styles)(ConnectionsCards);
