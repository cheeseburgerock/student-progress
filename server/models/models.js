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

Subject.hasMany(Test)                           //1
Test.belongsTo(Subject)

Test.hasMany(TestQuestion)                      //2
TestQuestion.belongsTo(Test)

Test.hasMany(TestSession)                       //3
TestSession.belongsTo(Test)

TestQuestion.hasMany(TestAnswer)                //4
TestAnswer.belongsTo(TestQuestion)

TestQuestion.hasMany(TestSessionResult)         //5
TestSessionResult.belongsTo(TestQuestion)

TestAnswer.hasMany(TestSessionResult)           //6
TestSessionResult.belongsTo(TestAnswer)

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
TestSessionResult
}
