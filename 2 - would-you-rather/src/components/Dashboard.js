import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPage from './QuestionPage'

class Dashboard extends Component {
    state = {
        activeTab: '1'
    }
    switchTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab + ""
            })
        }
    }
    render() {
        const { answeredQuestionIds, unansweredQuestionIds } = this.props;
        const { activeTab } = this.state;
        return (
            <div className='dashboard'>
                <div className="tab">
                    <button onClick={() => { this.switchTab('1') }} className={activeTab === '1' ? 'tablinks active' : 'tablinks'}>Unanswered Questions</button>
                    <button onClick={() => { this.switchTab('2') }} className={activeTab === '2' ? 'tablinks active' : 'tablinks'}>Answered Questions</button>
                </div>

                {activeTab === '1' && (<div className="tabcontent">
                    {unansweredQuestionIds.map(id => (<QuestionPage key={id} id={id} />))}
                </div>)}

                {activeTab === '2' && (<div className="tabcontent">
                    {answeredQuestionIds.map(id => (<QuestionPage key={id} id={id} />))}
                </div>)}
            </div>
        )
    }
}
function mapStateToProps({ questions, users, authedUser }) {
    let answeredQuestionIds = [];
    let unansweredQuestionIds = [];
    const user = users[authedUser]
    if (user) {
        answeredQuestionIds = Object.keys(user["answers"])
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
        unansweredQuestionIds = Object.keys(questions)
            .filter((qid) => !answeredQuestionIds.includes(qid))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
    return {
        answeredQuestionIds,
        unansweredQuestionIds
    }
}
export default connect(mapStateToProps)(Dashboard)