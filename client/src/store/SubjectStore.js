import {makeAutoObservable} from "mobx"

export default class SubjectStore {
    constructor() {
        
        this._users = [
            {
                id: 14,
                name: 'Жук Александр Андреевич',
                email: "user@mail.ru",             
                group: 1822
            },
            {
                id: 15,
                name: 'Антонов Антон Антонович',
                email: "admin@mail.ru",             
                group: "Преподаватель"
            } 
        ]

        
        this._subjects = [
            {
                id: 11,
                name: 'История',
                description: 'Подробное описание дисциплины',
                professor: 'Наумов Николай Николаевич'
            },
            {
                id: 6,
                name: 'Англ яз',
                description: 'Описание предмета',
                professor: 'Пуговка Дмитрий Иванович'
            },
            {
                id: 4,
                name: 'Компьютерные сети',
                description: 'Описание предмета',
                professor: 'Коваленко Дмитрий Иванович'
            },                
        ]

        this._tests = [
            {
                id: 6,
                name: 'Итоговый тест КС',
                description: 'Тест по всем пройденным темам КС',
                subjectId: 4
            },
            {
                id: 7,
                name: 'English test',
                description: 'Description of the test',
                subjectId: 6
            },
            {
                id: 8,
                name: 'Тест: Раздел РП',
                description: 'Тест по разделу Речи Посполитой',
                subjectId: 11
            },      
        ]

        this._testQuestions = [
            {
                id: 10,
                name: 'В каком году произошел первый раздел Речи Посполитой?',
                testId: 8
            },
            {
                id: 11,
                name: 'В каком году произошел второй раздел Речи Посполитой?',
                testId: 8
            },
            {
                id: 12,
                name: 'В каком году произошел третий раздел Речи Посполитой?',
                testId: 8
            },
        ]

       

        this._testAnswers = [
            {
                id: 21,
                name: 'В 1772 году',
                testQuestionId: 10,              //яхз нужно ли сюда id передавать
                is_right: true
            },
            {
                id: 22,
                name: 'В 1745 году',
                testQuestionId: 10,              
                is_right: false
            },
            {
                id: 23,
                name: 'В 1733 году',
                testQuestionId: 10,              
                is_right: false
            }
        ]

        this._testSessions = [
            {
                id: 16,
                testId: 8,
                userId: 14,              
            }
        ]

        this._testSessionResults = [
            {
                id: 19,
                testQuestionId: 10,
                testAnswerId: 21,  
                testSessionId: 16            
            }
        ]

        makeAutoObservable(this)
    }


    setUsers(users) {
        this._users = users
    }

    setSubjects(subjects) {
        this._subjects = subjects
    }

    setTests(tests) {
        this._tests = tests
    }

    setTestQuestions(testQuestions) {
        this._testQuestions = testQuestions
    }

    setTestAnswers(testAnswers) {
        this._testAnswers = testAnswers
    }

    setTestSessions(testSessions) {
        this._testSessions = testSessions
    }

    setTestSessionResults(testSessionResults) {
        this._testSessionResults = testSessionResults
    }

    get users() {
        return this._users
    }

    get subjects() {
        return this._subjects
    }

    get tests() {
        return this._tests
    }

    get testQuestions() {
        return this._testQuestions 
    }

    get testAnswers() {
        return this._testAnswers
    }

    get testSessions() {
        return this._testSessions
    }

    get testSessionResults() {
        return this._testSessionResults
    }
    
}


