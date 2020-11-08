import React from 'react';
import { connect } from 'react-redux'
import { login } from '../redux/user'

class LogUser extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onSubmit(event){
    event.preventDefault()
    this.props.login(this.state.name, this.state.password)
  }
  render() {
    return (
      <div className="LogUser">
        <form onSubmit={this.onSubmit}>
          <label>User Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <button type="submit">Log in!</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  login: (name, password) => dispatch(login(name, password))
})



export default connect(null, mapDispatch)(LogUser)
