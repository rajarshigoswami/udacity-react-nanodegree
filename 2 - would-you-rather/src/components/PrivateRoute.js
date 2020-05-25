import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class PrivateRoute extends React.Component {
    render() {
        const { component: Component, isAuthenticated, path, ...rest } = this.props;
        return (
            <Route path={path} {...rest} render={props => (
                isAuthenticated
                    ? <Component {...rest} match={props.match} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
        )
    }
}
function mapStateToProps({ authedUser }) {
    return {
        isAuthenticated: authedUser !== null
    }
}
export default connect(mapStateToProps)(PrivateRoute);
