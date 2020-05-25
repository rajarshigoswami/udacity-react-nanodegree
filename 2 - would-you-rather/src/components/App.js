import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialDataAction } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import Nav from './Nav'
import AddQuestion from './AddQuestion'
import Question from './Question'
import Logout from './Logout'
import PrivateRoute from './PrivateRoute'
import PageNotFound from './PageNotFound'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialDataAction())
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <Nav />
                    <div className='container'>
                        <Switch>
                            <Route path='/login' exact component={Login} />
                            <PrivateRoute exact path='/' component={Dashboard} />
                            <PrivateRoute path='/leaderboard' component={LeaderBoard} />
                            <PrivateRoute path='/add' component={AddQuestion} />
                            <PrivateRoute path='/questions/:id' component={Question} />
                            <PrivateRoute path='/logout' component={Logout} />
                            <PrivateRoute component={PageNotFound} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        isAuthenticated: authedUser !== null
    }
}
export default connect(mapStateToProps)(App);
