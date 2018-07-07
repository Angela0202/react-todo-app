import React, {Component} from 'react';

import styles from './styles';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      editing: false,
      value: props.todo.value,
    };
  }

  onChange = (e) => {
    const {
      todo,
      onTodoCompleteChange
    } = this.props;
    onTodoCompleteChange(e.target.checked, todo)
  };

  onInputValueChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  startEditing = () => {
    this.setState({
      editing: true
    });
  };

  endEditing = (e) => this.setState({ editing: false, value: e.target.value });

  onRemove = () => {
    const { todo, onTodoItemRemove } = this.props;
    onTodoItemRemove(todo);
  };

  onInputKeyDown = e => {
    const { todo, onTodoItemRemove } = this.props;
    if (e.keyCode === 13) {
      const { value } = this.state;
      const trimmed = value.trim();
      if (trimmed !== "") {
        this.endEditing(e);
      } else {
        onTodoItemRemove(todo);
      }
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancelClose = () => {
    this.setState({ open: false });
  };

  handleConformationClose = () => {
    this.setState({ open: false }, () => {
      this.onRemove();
    });
  };

  render() {
    const {
      todo,
      classes
    } = this.props;

    const { editing, value } = this.state;
    let deletedTextStyle = classes.deletedText;

    !todo.isComplete ? deletedTextStyle = '' : deletedTextStyle = classes.deletedText;

    return (
      <label>
        <ListItem>
        <Checkbox
          onChange={this.onChange}
          checked={todo.isComplete}
        />
          {
            !editing ? (

              <ListItemText
                primary={`${value}`}
                onDoubleClick={ this.startEditing }
                className={deletedTextStyle}
              />
            ) : (
              <Input
              value={value}
              fullWidth
              disableUnderline
              onBlur={ this.endEditing }
              onKeyDown={ this.onInputKeyDown }
              onChange={ this.onInputValueChange }
              />
            )
          }
          <IconButton onClick={this.handleClickOpen}>
            <DeleteIcon/>
          </IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleCancelClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want permanently delete this todo?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you delete an item, it will be permanently lost.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancelClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleConformationClose} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </ListItem>
      </label>
    );
  }
}

export default withStyles(styles)(TodoListItem);