import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: "5px"
  },
  menuButton: {
    marginRight: 2
  },
  title: {
    flexGrow: 1
  }
};

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

class TitleAppBar extends React.Component {
  /*
  An AppBar component, title recived from 'title' prop
  props: title
  */

  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" className={this.classes.title}>
              {this.props.title}
            </Typography>

            <Button color="default" component={AdapterLink} to="/">
              View Forms
            </Button>

            <Button color="default" component={AdapterLink} to="/create_form">
              Create Form
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TitleAppBar);
