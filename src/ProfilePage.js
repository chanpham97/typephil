import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { dispatchPassword } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import './style/styles.css';
import './style/ProfilePage.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLinks: ["Learn", "Progress", "Home"],
      edited: false,
      editing: false,
      viewing: false,
      username: "foobar", // TODO not hardcode 
      password: "TEMP",
      touched: {
        password: false
      }
    }
  }

  editPassword = () => {
    if(!this.state.editing)
      this.setState({ editing: true });
    else {
      const { username, password } = this.state;
      var res = this.props.dispatchPassword(
        username,
        password
      );
      console.log(res);
      this.setState({ editing: false, edited: true });
    }
  }

  toggleViewing = () => {
    this.setState({ viewing: !this.state.viewing });
  }

  handleBlur = (e) => {
    this.setState({
      touched: { password : true }
    });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  validate = (password) => {
    return {
      password: password.length === 0
    }
  }

  render() {
    console.log( "USERNAME: %s", this.props.username );

    const { headerLinks } = this.state;
    const errors = this.validate(this.state.password);
    const markError = () => {
      return errors['password'] ? this.state.touched['password'] : false;
    }

    return (
      <div>
      <Header links={headerLinks} isLoggedIn={true} username=""/>

      <div className="container">
        <div className="vert-container">
          <div className="panel">
            <div className="row top">

              <div className="column column-100">
                <h2>Name</h2>
                <h1>Phil Torres</h1>
              </div>
            </div>

            <hr></hr>

            <div className="row">
              <div className="column column-33">
                <h3>Username</h3>
              </div>
              <div className="column column-10"></div>
              <div className="column column-50">
                <p>{this.state.username}</p>
              </div>
            </div>

            <div className="row">
              <div className="column column-33">
                <h3>Password</h3>
              </div>
              <div className="column column-20 column-offset-10 password-info">
                <p className={ this.state.editing ? "hide" : ""}>
                  { this.state.viewing ? this.state.password : '*'.repeat(this.state.password.length) }

                  {/* TODO this is pretty egregiously insecure} */}

                </p>
                <input className={ this.state.editing ? (markError() ? "error" : "") : "hide" } placeholder="" name="password" type="password" onBlur={this.handleBlur} onChange={this.handleInputChange}/>
              </div>

              <div className="column column-30 options">
                <div className="options">
                  <button onClick={this.editPassword}>
                    <span className={ this.state.editing ? "hide" : "" }>EDIT</span>
                    <span className={ this.state.editing ? "" : "hide" }>SUBMIT</span>
                  </button>
                  <button className={ this.state.edited ? "" : "hide" } onClick={ this.toggleViewing }>
                    { this.state.viewing ? "HIDE" : "VIEW" } 
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { username: auth.currentUser.username }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchPassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
