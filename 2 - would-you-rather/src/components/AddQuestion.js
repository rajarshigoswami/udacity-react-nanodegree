import React, { Component } from 'react'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

export default class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props
        dispatch(handleSaveQuestion({ optionOne, optionTwo }))

        this.setState({
            optionOne: '',
            optionTwo: '',
            toHome: true
        })
    }
    render() {
        const { optionOne, optionTwo, toHome } = this.state;
        const isSubmitDisabled = optionOne.length === 0 || optionTwo.length === 0
        if (toHome) {
            return <Redirect to='/' />
        }
        return (
            <div className='new-question'>
                <div className='new-question--header'>
                    <p>Create a new Question</p>
                </div>
                <div className='new-question--contents'>
                    <p className='new-question--h2'>Complete the question</p>
                    <p className='new-question--h3'><strong>Would you rather</strong></p>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="optionOne"
                            placeholder="Enter Option One Text Here"
                            value={optionOne}
                            onChange={this.handleChange} />
                        <div className='centered-text'>OR</div>
                        <input
                            type="text"
                            name="optionTwo"
                            placeholder="Enter Option Two Text Here"
                            value={optionTwo}
                            onChange={this.handleChange} />
                        <button type='submit' disabled={isSubmitDisabled}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
