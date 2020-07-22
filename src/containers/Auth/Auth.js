import React, {useState} from "react";
import classes from './Auth.module.scss'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'

const Auth = (props) => {

    const [isFormValid, setIsFormValid] = useState(false)

    const [formControls, setFormControls] = useState({
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Enter valid email',
            valid: false,
            touched: false,
            validation: {
                required: true,
                email: true
            }
        },
        password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'Enter valid password',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 6
            }
        }
    })

    const validateControl = (value, validation) => {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.require) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {

        const newFormControls = {...formControls}
        const control = {...newFormControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)
        newFormControls[controlName] = control

        //no null submit
        let newIsFormValid = true
        Object.keys(newFormControls).forEach(name => {
            newIsFormValid = newFormControls[name].valid && newIsFormValid
        })

        setFormControls(newFormControls)
        setIsFormValid(newIsFormValid)

    }

    const renderInputs = Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName]
            return <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                shouldValidate={!!control.validation}
                errorMessage={control.errorMessage}
                onChange={event => onChangeHandler(event, controlName)}
            />
        }
    )


    const loginHandler = async () => {
        const authData = {
            email: formControls.email.value,
            password: formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGTj8BdQrD8tAzNpt4BAm_mi7YY43FV8A', authData)
            console.log(response.data)

        } catch (e) {
            console.log(e)
        }
    }

    const registerHandler = async () => {
        const authData = {
            email: formControls.email.value,
            password: formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGTj8BdQrD8tAzNpt4BAm_mi7YY43FV8A', authData)
            console.log(response.data)

        } catch (e) {
            console.log(e)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
    }

    return (
        <div className={classes.Auth}>
            <div>
                <h1>Authorization</h1>
                <form onSubmit={submitHandler} className={classes.AuthForm}>

                    {
                        renderInputs
                    }

                    <Button
                        type='success'
                        onClick={loginHandler}
                        disabled={!isFormValid}
                    >
                        Sing in
                    </Button>

                    <Button
                        type='primary'
                        onClick={registerHandler}
                        disabled={!isFormValid}
                    >
                        Sing up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Auth
