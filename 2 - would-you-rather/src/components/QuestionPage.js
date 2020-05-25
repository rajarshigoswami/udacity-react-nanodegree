import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionPage extends Component {
    viewQuestion = (id) => {
        this.props.history.push(`/questions/${id}`);
    }
    render() {
        const { question, users } = this.props;
        const { author, id } = question;
        const { name, avatarURL } = users[author];
        return (
            <div className='question-card'>
                <p>{name} asks : </p>
                <div className='row'>
                    <img src={avatarURL} alt={name} className='img-col' />
                    <div className='right-col'>
                        <div>Would your rather</div>
                        <button onClick={() => this.viewQuestion(id)}>View Poll</button>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ users, questions, authedUser }, { id }) {
    const question = questions[id]
    return {
        users,
        question,
        authedUser
    }
}
export default withRouter(connect(mapStateToProps)(QuestionPage))
