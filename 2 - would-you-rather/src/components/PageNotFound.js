import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class PageNotFound extends Component {
    render() {
        return (
            <div>
                Page Not Found. Did you mean to go to <NavLink to='/' exact activeClassName='active' >
                    Home
                        </NavLink>
            </div>
        )
    }
}
