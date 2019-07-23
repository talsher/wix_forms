import React from "react";
import Typography from "@material-ui/core/Typography";

class Message extends React.Component {
  /*
  component to show message
  props:
    show: show component or not
    error: show error message if true otherwise show success message
    errorMsg: the error message
    successMsg: the success message
  */
  render() {
    if (this.props.show) {
      if (this.props.error)
        return (
          <Typography color="error" variant="body1">
            {this.props.errorMsg}
          </Typography>
        );
      else {
        return (
          <Typography color="primary" variant="body1">
            {this.props.successMsg}
          </Typography>
        );
      }
    } else {
      return <Typography />;
    }
  }
}

export default Message;
