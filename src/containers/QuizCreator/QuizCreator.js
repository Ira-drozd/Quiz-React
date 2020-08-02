import React, {useState} from 'react';
import classes from './QuizCreator.module.scss'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from '../../form/formFramework'
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";


const createOptionControl = (number) => {
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Answer can\'t be empty',
        id: number
    }, {required: true})
}

const createFormControls = () => {
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'Question can\'t be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

const QuizCreator = (props) => {

    const [formControls, setFormControls] = useState(createFormControls())
    const [rightAnswerId, setRightAnswerId] = useState(1)
    const [isFormValid, setIsFormValid] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
    }

    const addQuestionHandler = (event) => {
        event.preventDefault()


        const {question, option1, option2, option3, option4} = formControls;

        const questionItem = {
            question: question.value,
            id: props.quiz.length + 1,
            rightAnswerId: rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        //redux
        props.createQuizQuestion(questionItem)

        //reset
        setFormControls(createFormControls())
        setRightAnswerId(1)
        setIsFormValid(false)
    }

    const createQuizHandler = event => {
        event.preventDefault()
        //reset
        setIsFormValid(false)
        setRightAnswerId(1)
        setFormControls(createFormControls())
        //redux
        props.finishCreateQuiz()
    }

    const changeHandler = (value, controlName) => {
        const newFormControls = {...formControls}
        const control = {...newFormControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
        newFormControls[controlName] = control

        //can submit
        setFormControls(newFormControls)
        setIsFormValid(validateForm(newFormControls))
    }

    const renderControls = Object.keys(formControls).map((controlName, index) => {
        const control = formControls[controlName]
        return (<React.Fragment
                key={controlName + index}
            >
                <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => changeHandler(event.target.value, controlName)}
                />
                {index === 0 ? <br/> : null}
            </React.Fragment>
        )
    })

    const selectChangeHandler = (event) => {
        setRightAnswerId(+event.target.value)
    }

    const select = <Select
        label='Choose right answer'
        value={rightAnswerId}
        onChange={selectChangeHandler}
        options={
            [
                {text: '1', value: 1},
                {text: '2', value: 2},
                {text: '3', value: 3},
                {text: '4', value: 4},
            ]
        }
    />
    return (
        <div className={classes.QuizCreator}>
            <div>
                <h1>Create test</h1>
                <form onSubmit={submitHandler}>


                    {renderControls}

                    {select}

                    <div className={classes.ButtonWrapper}><Button
                        type='primary'
                        onClick={addQuestionHandler}
                        disabled={!isFormValid}
                    >
                        Add question</Button>
                        <Button
                            type='success'
                            onClick={createQuizHandler}
                            disabled={props.quiz.length === 0}
                        >
                            Create test</Button></div>
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    quiz: state.create.quiz
})

const mapDispatchToProps = dispatch => ({
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
