import React, {useState} from "react";
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Context from "../../context";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

const Quiz = (props) => {

    const [activeQuestion, setActiveQuestion] = useState(0)

    const [answerState, setAnswerState] = useState(null)

    const [isFinished, setIsFinished] = useState(false)

    const [results, setResults] = useState({})

    const [quiz, setQuiz] = useState(
        [
            {
                id: 1,
                question: 'What color is the sky?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Red', id: 3},
                    {text: 'Green', id: 4}
                ]
            },
            {
                id: 2,
                question: 'Who wrote the book Moby-Dick?',
                rightAnswerId: 4,
                answers: [
                    {text: 'Edgar Allan Poe', id: 1},
                    {text: 'William Sydney Porter', id: 2},
                    {text: 'Jack London', id: 3},
                    {text: 'Herman Melville', id: 4}
                ]
            }
        ]
    )

    const isQuizFinished = () => {
        return activeQuestion + 1 === quiz.length
    }

    const onAnswerClickHandler = (answerId) => {

        // const subRes = results

        if (answerState) {
            const key = Object.keys(answerState)[0]
            if (answerState[key] === 'success') {
                return
            }
        }

        if (quiz[activeQuestion].rightAnswerId === answerId) {

            if (!results[activeQuestion + 1]) {
                setResults(prevState => Object.assign(prevState, {[activeQuestion + 1]: 'success'}))
            }

            setAnswerState({[answerId]: 'success'})

            /*const timeout = setTimeout(() => {
                if (isQuizFinished()) {
                    setIsFinished(true)
                } else {
                     setActiveQuestion(prevState => prevState + 1)
                    setAnswerState(null)
                }
                clearTimeout(timeout)
            }, 800)*/

        } else {
            setResults(prevState => Object.assign(prevState, {[activeQuestion + 1]: 'error'}))
            setAnswerState({[answerId]: 'error'})
        }

        const timeout = setTimeout(() => {
            if (isQuizFinished()) {
                setIsFinished(true)
            } else {
                setActiveQuestion(prevState => prevState + 1)
                setAnswerState(null)
            }
            clearTimeout(timeout)
        }, 800)

    }

    const onRetry = () => {
        setActiveQuestion(0)
        setAnswerState(null)
        setIsFinished(false)
        setResults({})
    }


    return (
        <Context.Provider value={{
            onAnswerClickHandler,
            onRetry
        }}>
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions
                    </h1>
                    {
                        isFinished
                            ? <FinishedQuiz
                                results={results}
                                quiz={quiz}
                            />
                            : <ActiveQuiz
                                answers={quiz[activeQuestion].answers}
                                question={quiz[activeQuestion].question}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                state={answerState}
                            />
                    }
                </div>
            </div>
        </Context.Provider>
    )
}

export default Quiz