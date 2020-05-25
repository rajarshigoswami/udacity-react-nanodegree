import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {

    render() {
        const { users } = this.props;
        return (
            <div className='leader-board'>
                {users.map(user => (
                    <div key={user.id} className='profile'>
                        <div className='profile-pic'>
                            <img src={user.avatarURL} alt={user.name} />
                        </div>
                        <div className='profile-details'>
                            <h2>{user.name}</h2>
                            <div className='profile-sub'>
                                <div className='ans-ques'>
                                    <div>Answered Questions</div>
                                    <div>{Object.keys(user.answers).length}</div>
                                </div>
                                <div className='cre-ques'>
                                    <div>Created Questions</div>
                                    <div>{user.questions.length}</div>
                                </div>
                            </div>
                        </div>
                        <div className='profile-score'>
                            <div>
                                <div className='score-text'><div>Score</div></div>
                                <div className='score-value'><div>{Object.keys(user.answers).length + user.questions.length}</div></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
function userScore(user) {
    return Object.keys(user.answers).length + user.questions.length
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
    }
}
export default connect(mapStateToProps)(LeaderBoard)