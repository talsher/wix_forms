import React, { Component } from "react";
import { Box, Paper } from "@material-ui/core";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Message from "../Message/Message";
import axios from "axios";

class FormSubmission extends Component {
  /*
  component to submit a form
  props: formId: the id number of the form
  */

  state = {
    formFields: [], // the form fields
    submited: false, // was the form submited
    submitErr: "" // submit error if any
  };

  constructor(props) {
    super(props);
    this.formId = this.props.formId;
  }
  componentWillMount() {
    // get form data
    axios
      .get(`/api/form?id=${this.formId}`)
      .then(res => {
        console.log(res);
        this.setState({
          formFields: res.data.formFields,
          submited: false,
          submitErr: ""
        });
        this.props.changeTitle(`Form ${res.data.name} Submission`);
      })
      .catch(err => {
        console.log(err);
        console.log("error fetching data");
      });
  }

  render() {
    return (
      <div align="center">
        <Box width="80%">
          <Paper>
            <Box p={2} m={2}>
              <form onSubmit={event => this.handleSubmit(event)}>
                {this.buildFormFields()}
                <Button type="submit">Submit</Button>
                <Message
                  show={this.state.submited}
                  error={this.state.submitErr !== ""}
                  errorMsg={this.state.submitErr}
                  successMsg="Form submited successfuly"
                />
              </form>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }

  buildInputLabel(field) {
    if (field.type === "date")
      return <InputLabel shrink>{field.label}</InputLabel>;
    else return <InputLabel>{field.label}</InputLabel>;
  }
  buildFormFields() {
    // build the form to submit
    return (
      <Box width="60%" maxWidth="600px">
        {this.state.formFields.map(field => (
          <FormControl key={`${field.name}`} fullWidth={true}>
            {this.buildInputLabel(field)}
            <Input type={field.type} name={field.name} />
          </FormControl>
        ))}
      </Box>
    );
  }

  handleSubmit(event) {
    // handle submission of the form
    event.preventDefault();
    const data = new FormData(event.target);
    let jsonForm = {};
    data.forEach((value, key) => {
      jsonForm[key] = value;
    });

    // post form to server
    axios
      .post("/api/form/submit", {
        id: this.formId,
        submission: jsonForm
      })
      .then(res => this.setState({ submited: true, submitErr: "" }))
      .catch(error => {
        let errorMsg;
        if (error.response)
          errorMsg = "Failed to submit: " + error.response.data;
        else errorMsg = "Failed to submit: unknown error";
        this.setState({ submited: true, submitErr: errorMsg });
      });
  }
}

export default FormSubmission;
