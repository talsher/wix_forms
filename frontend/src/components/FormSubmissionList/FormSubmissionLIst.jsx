import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

class FormSubmissionList extends Component {
  /*
  component to view list of form submissions
  props: formId: the id of the form
  */
  state = {
    inputList: [], // list of form fields
    submissionList: [] // list of submissions
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
          inputList: res.data.formFields,
          submissionList: res.data.submissions
        });
        this.props.changeTitle(`Form ${res.data.name} submissions`);
      })
      .catch(err => {
        console.log("error fetching data");
      });
  }

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {this.state.inputList.map(field => (
                <TableCell key={`${field.name}_head`} align="center">
                  {field.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.submissionList.map((row, rowNum) => (
              <TableRow>
                {this.state.inputList.map(field => (
                  <TableCell key={`${field.name}_${rowNum}`} align="center">
                    {row[field.name]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default FormSubmissionList;
