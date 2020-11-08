import React from 'react';

import { connect } from 'react-redux';
import LogUser from './LogUser'
import { me } from '../redux/user'

class User extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.me()
  }
  render() {
    return (
      <div>
        <p>Hello, {this.props.user.name}</p>
        <img src={this.props.user.imageUrl}/>
        <LogUser/>
        <form method='get' action='/auth/google'>
          <button type='submit'>Log in with Google!</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({ user: state.user });

const mapDispatch = dispatch => ({ me: () => dispatch(me()) })

export default connect(mapState, mapDispatch)(User);
