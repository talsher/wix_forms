const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  
  const useStyles1 = {
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  };
  
  function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
  
  MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'error']).isRequired,
  };
  
  const useStyles2 = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  
 class CustomizedSnackbars extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            sucess: false,
            error: false,
            message: ""
        }
      }
      setOpen(messageType, message)
      {
        if(messageType === "success"){
            this.setState({sucess: true});
        } else if (messageType === "error"){
            this.setState({error: true})
        }
        this.setState({message: message});
      }

  
    handleClose(event, reason) {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({sucess: false});
    }
  render(){
    return (
      <div>
        <Button variant="outlined" className={this.classes.margin} onClick={()=>this.setOpen("success", "wow!")}>
          Open success snackbar
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={(event, reason) => handleClose(event, reason}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message="This is a success message!"
          />
        </Snackbar>
        <MySnackbarContentWrapper
          variant="error"
          className={this.classes.margin}
          message="This is an error message!"
        />

      </div>
    );}
  }

  export default withStyles(styles)(CustomizedSnackbars);