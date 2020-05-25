import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared';
import PageNotFound from './PageNotFound'

class Question extends Component {
    state = {
        toHome: false,
        selectedOption: ''
    }
    inputSelected = (evt) => {
        this.setState({
            selectedOption: evt.target.value
        });
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        const { dispatch, question } = this.props;
        const { id } = question;
        dispatch(handleAnswer(id, this.state.selectedOption));

    }
    formatScore = (score) => {
        return Number.parseFloat(score).toFixed(2);
    }
    formatScoreData = (question, currentUserAnswer) => {
        const { optionOne, optionTwo } = question;
        const totalScore = optionOne.votes.length + optionTwo.votes.length;
        const optionOnePercentage = this.formatScore((optionOne.votes.length / totalScore) * 100);
        const optionTwoPercentage = this.formatScore((optionTwo.votes.length / totalScore) * 100);

        return {
            optionOne: {
                percentage: optionOnePercentage,
                votes: optionOne.votes.length,
                totalVotes: totalScore,
                selected: currentUserAnswer === 'optionOne'
            },
            optionTwo: {
                percentage: optionTwoPercentage,
                votes: optionTwo.votes.length,
                totalVotes: totalScore,
                selected: currentUserAnswer === 'optionTwo'
            }
        }
    }

    render() {
        debugger;
        const { question, user, currentUserAnswer } = this.props;
        if (!question) {
            return (<PageNotFound />)
        }
        const { optionOne, optionTwo } = question;
        const { name, avatarURL } = user;
        const formattedScore = this.formatScoreData(question, currentUserAnswer);
        return (
            <React.Fragment>
                {
                    currentUserAnswer ?
                        <div className='question-vote'>
                            <p>Asked by {user.name}</p>
                            <div className='row'>
                                <img src={avatarURL} alt={name} className='img-col' />
                                <div className='right-col'>
                                    <h3>Resuts : </h3>
                                    <div className='optionOne-score'>
                                        {formattedScore.optionOne.selected ? <div className="your-vote"><span >Your Vote</span></div> : ''}
                                        <div>{optionOne.text}</div>
                                        <div className="progressBar">
                                            <div className="optionOne" style={{ width: `${formattedScore.optionOne.percentage}%` }}>{`${formattedScore.optionOne.percentage}%`}</div>
                                            <div className="total" style={{ width: `${100 - formattedScore.optionOne.percentage}%` }}></div>
                                        </div>
                                        <div className='stats'>{`${formattedScore.optionOne.votes} out of ${formattedScore.optionOne.totalVotes} votes `}</div>
                                    </div>
                                    <div className='optionTwo-score'>
                                        {formattedScore.optionTwo.selected ? <div className="your-vote"><span >Your Vote</span></div> : ''}
                                        <div>{optionTwo.text}</div>
                                        <div className="progressBar">
                                            <div className="optionOne" style={{ width: `${formattedScore.optionTwo.percentage}%` }}>{`${formattedScore.optionTwo.percentage}%`}</div>
                                            <div className="total" style={{ width: `${100 - formattedScore.optionTwo.percentage}%` }}></div>
                                        </div>
                                        <div className='stats'>{`${formattedScore.optionOne.votes} out of ${formattedScore.optionTwo.totalVotes} votes `}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='question-vote'>
                            <p>{user.name} asks : </p>
                            <div className='row'>
                                <img src={avatarURL} alt={name} className='img-col' />
                                <div className='right-col'>
                                    <div>Would your rather</div>
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="radio" name="choices" value="optionOne" onChange={this.inputSelected} />
                                        <label htmlFor="optionOne">{optionOne.text}</label><br></br>
                                        <input type="radio" name="choices" value="optionTwo" onChange={this.inputSelected} />
                                        <label htmlFor="optionTwo">{optionTwo.text}</label><br></br>
                                        <button type='submit' disabled={this.state.selectedOption.length === 0}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                }
            </React.Fragment>
        )
    }
}


function mapStateToProps({ users, questions, authedUser }, props) {
    const questionId = props.match.params.id
    let currentUserAnswer, user;
    const question = questions[questionId]

    if (question) {
        const { author } = question
        user = users[author];
        const currentUser = users[authedUser];
        if (currentUser.answers[questionId]) {
            currentUserAnswer = currentUser.answers[questionId];
        }
    }
    return {
        user,
        question,
        authedUser,
        currentUserAnswer
    }
}

export default connect(mapStateToProps)(Question)