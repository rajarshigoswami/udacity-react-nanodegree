import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'


class Login extends Component {
    state = {
        selectedOption: '',
        toHome: false
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        const { dispatch } = this.props;
        dispatch(setAuthedUser(this.state.selectedOption));
        this.setState(() => ({
            text: '',
            toHome: true,
        }))
    }
    handleChange = (evt) => {
        this.setState({
            selectedOption: evt.target.value
        })
    }
    render() {
        const { users } = this.props
        const { selectedOption, toHome } = this.state

        if (toHome === true) {
            if (this.props.location.state && this.props.location.state.from.pathname) {
                return <Redirect to={this.props.location.state.from.pathname} />
            } else {
                return <Redirect to="/" />
            }
        }
        return (
            <div className='login'>
                <div className='top-header'>
                    <div>Welcome to the would you rather app</div>
                    <div>Please sign in to continue</div>
                </div>
                <label htmlFor="user">Login As:</label>
                <form onSubmit={this.handleSubmit}>
                    <select id="user"
                        value={selectedOption}
                        onChange={this.handleChange} >
                        <option value='' disabled>Select User:</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button type='submit' disabled={this.state.selectedOption.length === 0}>Login</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(Login)
