# Would You Rather Project

'Would You Rather' is a game app that presents users with questions in the form of 

* Would You Rather
    * Option 1
    * Option 2

The user will be able to answer questions and see the polling result. 
The app will also allow the user to :

* View Questions
* Answer Questions
* See Answered Questions 
* See how other people have answered
* Create own questions
* See the ranking of all users in a dashboard 


This is a project built for the Udacity React Nanodegree Program. The purpose of this project is to demonstrate understanding and operational architecture of a typical React App

## Getting Started

The project uses Node.js(or Yarn) and the Create-React-App starter. If you do not have Node >= 13.x (or yarn >=1.22.x) installed, you can download it from the official website
Or

Once Node (or Yarn) is installed, navigate to the directory where you want to start the development.
```
git clone https://github.com/rajarshigoswami/reactnd-project-myreads-starter.git
npm install (or yarn install)

```

once the dependencies has been installed, you can launch the app with 

```
npm run start
or
yarn start

```
A new browser window should launch automatically with the appropiate URL. If that doesnt happen, you can manually navigate to 
[http://localhost:3000/](http://localhost:3000/) in your preferred browser.

## Using the app

Home : Is a tabbed page which will show both answered and unanswered questions
New Question : Ability to add a new question
LeaderBoard : Score for all the users


## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

### Resources and Documentation:

- [Create-react-app Documentation](https://github.com/facebook/create-react-app)
- [React Router Documentation](https://github.com/ReactTraining/react-router/tree/v3/docs)
- [React API](https://reactjs.org/docs/react-api.html)

### Udacity Resources:

- [Project starter template](https://github.com/udacity/reactnd-project-myreads-starter)
- [Project Rubric](https://review.udacity.com/#!/rubrics/918/view)
- [Udacity CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
- [Udacity HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
- [Udacity JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)

### Other Extra Resources
 - [Protected Route] (https://tylermcginnis.com/react-router-protected-routes-authentication/)
 - [Tabs and Nav] (http://www.w3schools.com/)
