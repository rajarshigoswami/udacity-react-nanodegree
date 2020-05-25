import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser';

class Nav extends Component {
    logout = (evt) => {
        evt.preventDefault();
        this.props.dispatch(unsetAuthedUser());

    }
    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <nav className='nav'>
                    <ul className='topnav'>
                        <li>
                            <NavLink to='/' exact activeClassName='active' >
                                Home
                        </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' activeClassName='active'>
                                New Question
                        </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                Leader Board
                        </NavLink>
                        </li>
                        {user && (
                            <React.Fragment>
                                <li className="right">
                                    <NavLink to='/logout' activeClassName='active' onClick={this.logout}>
                                        Logout
                        </NavLink>
                                </li>
                                <li className="right user-name">
                                    <p>Hello,  {user.name}</p>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav)