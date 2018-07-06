import React, { Component } from 'react';

import styles from './styles';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


class CreateTodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  createTodo = () => {
    const { value } = this.state;
    const trimmedValue = value.trim();

    if(trimmedValue !== '') {
      this.setState({
        value: '',
      });
      this.props.onTodoItemCreate(trimmedValue)
    }
  };

  onKeyDown = (e) => {
    if(e.keyCode === 13) {
      this.createTodo();
    }
  };

  onClick = () => {
    this.createTodo();
  };

  onToggleClick = () => {
    this.props.markCompleteAll();
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Input
        id="input-with-icon-adornment"
        placeholder="What needs to be done?"
        disableUnderline
        startAdornment={
          <InputAdornment
            position="start"
            onClick={this.onToggleClick}
          >
            {
              !this.props.clicked ? (
                <i className="material-icons size">
                  keyboard_arrow_right
                </i>
              ): (
                <i className="material-icons size">
                  keyboard_arrow_down
                </i>
              )
            }


          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="fab"
              color="primary"
              aria-label="add"
              className={classes.button}
              onClick={this.onClick}
              disabled={value.trim() === ''}
            >
              <AddIcon />
            </Button>
          </InputAdornment>
        }
        className={classes.input}
        value={value}
        onChange={this.onInputChange}
        onKeyDown={this.onKeyDown}
      />
    );
  }
}

export default withStyles(styles)(CreateTodoItem);