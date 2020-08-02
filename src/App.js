import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

function App(props) {

    const {autoLogin}=props
    useEffect(()=>{
        autoLogin()
    },[autoLogin])

    let routes = (
        <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/quiz/:id' component={Quiz}/>
            <Route path='/' component={QuizList}/>
            <Redirect to='/'/>
        </Switch>
    )

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path='/quiz-creator' component={QuizCreator}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/' exact component={QuizList}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        // <BrowserRouter>
        <Layout>
            {routes}
        </Layout>
        // </BrowserRouter>

    );
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
})

const mapDispatchToProps = dispatch => ({
    autoLogin: () => dispatch(autoLogin())
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
