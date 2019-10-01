import React from 'react';
import { connect } from 'react-redux';
import { serverRenderClock } from './../store';
import Examples from './../components/examples';

class Index extends React.Component {

  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req;

    reduxStore.dispatch(serverRenderClock(isServer));

    return {}
  }

  componenDidMount () {
    this.timer = setInterval(() => this.props.startClock(), 1000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  render() {
    return <Examples />
  }
}

function mapStateToPros(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToPros, mapDispatchToProps)(Index);