import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewForms from "./components/ViewForms/ViewForms";
import FormCreate from "./components/FormCreate/FormCreate";
import FormSubmission from "./components/FormSubmission/FormSubmission";
import FormSubmissionList from "./components/FormSubmissionList/FormSubmissionLIst";
import AppBar from "./components/AppBar/AppBar";

class App extends React.Component {
  state = {
    title: ""
  };
  render() {
    return (
      <div className="App">
        <Router>
          <AppBar title={this.state.title} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <ViewForms changeTitle={title => this.changeTitle(title)} />
              )}
            />
            <Route
              path="/create_form"
              render={() => (
                <FormCreate changeTitle={title => this.changeTitle(title)} />
              )}
            />
            <Route
              path="/submit_form/:id"
              render={({ match }) => (
                <FormSubmission
                  changeTitle={title => this.changeTitle(title)}
                  formId={match.params.id}
                />
              )}
            />
            <Route
              path="/form_submission_list/:id"
              render={({ match }) => (
                <FormSubmissionList
                  changeTitle={title => this.changeTitle(title)}
                  formId={match.params.id}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }

  changeTitle(title) {
    this.setState({ title: title });
  }
}

export default App;
