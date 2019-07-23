import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { Link } from "react-router-dom";

class ViewForm extends Component {
  /*
  a component to show list of forms
  props: none
  */
  state = {
    formList: [] // list of forms
  };

  componentWillMount() {
    this.props.changeTitle("View Forms");
    // get form list
    axios
      .get("/api/form/list")
      .then(res => {
        console.log(res);
        this.setState({ formList: res.data });
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
              <TableCell align="center">Form ID</TableCell>
              <TableCell align="center">Form name</TableCell>
              <TableCell align="center"># Submissions</TableCell>
              <TableCell align="center"> Submit Page</TableCell>
              <TableCell align="center">Submissions Page</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.formList.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" align="center">
                  {row._id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.numSubmissions}</TableCell>
                <TableCell align="center">
                  <Link to={"/submit_form/" + row._id}>View</Link>
                </TableCell>
                <TableCell align="center">
                  <Link to={"/form_submission_list/" + row._id}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ViewForm;
