import React from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
<BrowserRouter>
    <Layout>
        <Switch>
            <Route component={Auth} patch='/auth' />
            <Route component={QuizCreator} patch='/quiz-creator' />
            <Route component={Quiz} patch='/quiz:id' />
            <Route component={Quiz} patch='/' />
        </Switch>
    </Layout>
</BrowserRouter>

  );
}

export default App;
