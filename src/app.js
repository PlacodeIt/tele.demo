import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/auth/signin';
import LogIn from './components/auth/login';
import TextAnalysis from './components/analysis/textanalysis';
import RadicalMessages from './components/analysis/radicalmessages';
import RadicalUsers from './components/analysis/RadicalUsers';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/login" component={LogIn} />
        <Route path="/analyze" component={TextAnalysis} />
        <Route path="/radical-messages" component={RadicalMessages} />
        <Route path="/radical-users" component={RadicalUsers} />
      </Switch>
    </Router>
  );
};

export default App;
