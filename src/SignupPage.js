import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import Dropdown from 'react-dropdown'
import moment from 'moment'
import 'react-dropdown/style.css'
import './style/styles.scss';
import './style/SignupPage.scss'

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment().month(),
      year: moment().year() // defaults; will be updated by user later
    };
  }

  login = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.dispatchLogin(
      username,
      password
    )
  }

  getUsernameData = e => {
    const username = e.target.value;
    this.setState({ username });
  }

  getPasswordData = e => {
    const password = e.target.value;
    this.setState({ password });
  }

  setMonth = e => {
    const month = e.value;
    this.setState({ month });
    this.refs.dropdown_days.forceUpdate();
  }

  setYear = e => {
    const year = e.value;
    this.setState({ year });
    this.refs.dropdown_days.forceUpdate();
  }

  getDays = (m, y) => {
    var days = [];
    var daysInMonth = moment(y + "-" + m, "YYYY-MM").daysInMonth();
    while(daysInMonth) {
      days.push(daysInMonth);
      daysInMonth--;
    }
    console.log(days);
    return days;
  }

  render() {
    const { isLoggedIn } = this.props;
    var months = moment.monthsShort();
    var selectedMonth = months[0];
    var years = Array.apply(null, {length: 50}).map(
          function(_, index) {
            return index + (moment().year()-50);
          }).reverse();
    var days = this.getDays(this.state.month, this.state.year);
    const defaultOption = 0;

    if(isLoggedIn) {
        return <Redirect to="/home"/>
    }

    return (
        <div>
        <Header links={[]}/>
       
        <div className="container">
            <div className="row" id="container">
                <div className="column column-40">
                    <div className="left-panel">
                        <h1 className="title">Sign up - It's free!</h1>
                        <p>Join TypePhil to get personalized help with your typing education, whether you're already studying or starting anew. We'll save all of your progress.</p>
                        <p>By signing up for TypePhil, you agree to our Terms of Use and Privacy Notice.</p>

                        <div className="void">
                        </div>
                    </div>
                </div>

                <div className="column column-10">
                </div>

                <div className="vertical-line">
                </div>

                <div className="column column-10">
                </div>

                <div className="column column-40">
                    <div className="right-panel">
                        <div className="row">
                            <div className="column column-50">
                                <h2>FIRST NAME</h2>
                                <input placeholder=""/>
                            </div>
                            <div className="column column-50">
                                <h2>LAST NAME</h2>
                                <input placeholder=""/>
                            </div>
                        </div>
                        <div className="row username">
                            <div className="column column-50">
                                <h2>USERNAME</h2>
                                <input placeholder=""/>
                            </div>
                            <div className="column column-50">
                                <h2>BIRTHDATE</h2>
                                <div className="row dropdowns">
                                    <Dropdown options={months} onChange={this.updateMonth} value={defaultOption} placeholder="Month"/>
                                    <Dropdown options={days} onChange={this._onSelect} value={defaultOption} placeholder="Day" id="dropdown_days"/>
                                    <Dropdown options={years} onChange={this.updateYear} value={defaultOption} placeholder="Year"/>
                                </div>
                            </div>
                        </div>

                        <div className="row password">
                            <div className="column column-50">
                                <h2>PASSWORD</h2>
                                <input placeholder=""/>
                            </div>
                            <div className="column column-50">
                                <h2>RE-TYPE PASSWORD</h2>
                                <input placeholder=""/>
                            </div>
                        </div>

                        <div className="row gender">
                            <h2>GENDER</h2>
                        </div>
                        <div className="row gender-radios">
                                <div className="column column-20"><input type="radio" name="gender" value="male"></input>Male</div>
                                <div className="column column-20"><input type="radio" name="gender" value="female"></input>Female</div>
                                <div className="column column-20"><input type="radio" name="gender" value="other"></input>Other</div>
                        </div>

                        <div className="row occupation">
                            <h2>I AM CURRENTLY...</h2>
                        </div>
                        <div className="row occupation-radios">
                            <div className="column column-50">
                                <span>
                                  <div className="row"><input type="radio" name="occupation" value="student"></input>A student</div>
                                </span>
                                <span>
                                  <div className="row"><input type="radio" name="occupation" value="employed"></input>Employed</div>
                                </span>
                                <span>
                                  <div className="row"><input type="radio" name="occupation" value="unemployed"></input>Unemployed</div>
                                </span>
                            </div>
                        </div>

                        <div className="row next">
                            <div className="column column-50 column-offset-25">
                                <button id="btn-next">SIGN UP</button>
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
