const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { model } = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},           //внешние ключи прописывать не надо, их sequelize потом проставит при создании связи
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    role:  {type: DataTypes.STRING, defaultValue: "USER"},
    group: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING}
})

const Subject = sequelize.define('subject', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    professor:{type: DataTypes.STRING}
})

const Test = sequelize.define('test', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
})

const TestQuestion = sequelize.define('test_question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const TestAnswer = sequelize.define('test_answer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    is_right: {type: DataTypes.BOOLEAN}
})

const TestSession = sequelize.define('test_session', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    execution_date: {type: DataTypes.DATE}
})

const TestSessionResult = sequelize.define('test_session_result', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const TestQuestionTestSessionResult = sequelize.define('test_question_test_session_result', {   //таблица для связи 5 many-to-many
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const TestAnswerTestSessionResult = sequelize.define('test_answer_test_session_result', {   //таблица для связи 6 many-to-many
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


Subject.hasMany(Test)                           //1
Test.belongsTo(Subject)

Test.hasMany(TestQuestion)                      //2
TestQuestion.belongsTo(Test)

Test.hasMany(TestSession)                       //3
TestSession.belongsTo(Test)

TestQuestion.hasMany(TestAnswer)                //4
TestAnswer.belongsTo(TestQuestion)

TestQuestion.belongsToMany(TestSessionResult, {through: TestQuestionTestSessionResult})         //5
TestSessionResult.belongsToMany(TestQuestion, {through: TestQuestionTestSessionResult})

TestAnswer.belongsToMany(TestSessionResult, {through: TestAnswerTestSessionResult})           //6
TestSessionResult.belongsToMany(TestAnswer, {through: TestAnswerTestSessionResult}) 

User.hasMany(TestSession)                       //7
TestSession.belongsTo(User)

TestSession.hasMany(TestSessionResult)          //8
TestSessionResult.belongsTo(TestSession)

module.exports = {
User,
Subject,
Test,
TestQuestion,
TestAnswer,
TestSession,
TestSessionResult,
TestQuestionTestSessionResult,
TestAnswerTestSessionResult
}
