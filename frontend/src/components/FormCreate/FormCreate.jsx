import React, { Component } from "react";
import {
  Paper,
  Button,
  ButtonGroup,
  MenuItem,
  Grid,
  Typography,
  Box
} from "@material-ui/core";
import {
  FormControl,
  Select,
  InputLabel,
  Input,
  TextField,
  FormHelperText
} from "@material-ui/core";
import Message from "../Message/Message";
import axios from "axios";

const fieldTypes = ["text", "color", "date", "email", "tel", "number"];

class FormCreate extends Component {
  /*
  A component to create new form
  props: changeTitle: a function that changes the appbar title
  */

  state = {
    hasName: false, // validation on form name
    name: "", // form name
    selectedType: fieldTypes[0], // selected type from select component
    form: [], // list of fields in the form
    submited: false, // was the form submited
    submitErr: "" // error message when submited
  };

  constructor(props) {
    super(props);
    this.fieldItems = this.createMenuItems(fieldTypes);
  }

  componentWillMount() {
    this.props.changeTitle("Form Create");
  }

  render() {
    return (
      <div align="center">
        <Box width="80%">
          <Paper>
            <Box m={2} p={2}>
              <form onSubmit={event => this.addField(event)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth={true} error={!this.state.hasName}>
                      <TextField
                        id="name"
                        name="name"
                        label="Form Name"
                        value={this.state.name}
                        error={!this.state.hasName}
                        required
                        onChange={event => this.handleFormName(event)}
                      />
                      <FormHelperText error={!this.state.hasName} required>
                        Required
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Add fields
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        id="field_name"
                        name="field_name"
                        label="Name"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth={true}>
                      <TextField
                        required
                        id="field_label"
                        name="field_label"
                        label="Label"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth={true}>
                      <InputLabel htmlFor="type">Field type</InputLabel>
                      <Select
                        name="field"
                        id="type"
                        value={this.state.selectedType}
                        onChange={event =>
                          this.handleTypeChange(event.target.value)
                        }
                        autoWidth={true}
                        input={<Input name="type" />}
                      >
                        {this.fieldItems}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" type="submit">
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
          <Paper>{this.buildDemoForm()}</Paper>
          <ButtonGroup
            fullWidth
            aria-label="Full width outlined button group"
            type="button"
          >
            <Button onClick={() => this.createForm()}>Create</Button>
            <Button onClick={() => this.cleanForm()}>Clean</Button>
          </ButtonGroup>
          <Message
            show={this.state.submited}
            error={this.state.submitErr !== ""}
            errorMsg={this.state.submitErr}
            successMsg="Form submited successfuly"
          />
        </Box>
      </div>
    );
  }

  createMenuItems(fieldTypesList) {
    // recive list of types (strings) and return list of Menu components
    return fieldTypesList.map(type => (
      <MenuItem value={type} key={type}>
        {type}
      </MenuItem>
    ));
  }

  addField(event) {
    // add new field to the form
    event.preventDefault();
    const data = new FormData(event.target);
    let { form } = this.state;
    form.push({
      name: data.get("field_name"),
      label: data.get("field_label"),
      type: this.state.selectedType
    });
    this.setState({ form: form });
  }

  buildDemoForm() {
    // create demo of the result form
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Demo Form {this.state.name}
        </Typography>
        <Box width="60%">
          {this.state.form.map(field => {
            return (
              <Box key={`${field.name}`} width="100%" p={2}>
                <InputLabel>{field.label}: </InputLabel>
                <Input fullWidth={true} type={field.type} name={field.name} />
                <br />
              </Box>
            );
          })}
        </Box>
      </div>
    );
  }

  handleTypeChange(value) {
    this.setState({ selectedType: value });
  }

  handleFormName(event) {
    this.setState({
      hasName: event.target.value !== "",
      name: event.target.value
    });
  }

  createForm() {
    // post the new form
    if (!this.state.hasName) return;

    const data = {
      name: this.state.name,
      fields: this.state.form
    };
    axios
      .post("/api/form", data)
      .then(res => {
        this.setState({ submited: true, submitErr: "" });
      })
      .catch(error => {
        let errorMsg;
        if (error.response)
          errorMsg = "Failed to submit: " + error.response.data;
        else errorMsg = "Failed to submit: unknown error";
        this.setState({ submited: true, submitErr: errorMsg });
      });
  }
  cleanForm() {
    // clean form name and fields
    this.setState({ name: "", hasName: false, form: [] });
  }
}

export default FormCreate;
