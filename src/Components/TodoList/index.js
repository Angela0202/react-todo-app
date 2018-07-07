import React, { Component } from 'react';

import styles from './styles';
import ListItem from './ListItem/index';

import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import memoize from 'memoize-one';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    };
  }

  filterActive = memoize(todos => todos.filter(todo => !todo.isComplete));

  onActiveClick = () => {
    const { onFilterChange } = this.props;
    onFilterChange('active');
  };

  onAllClick = () => {
    const { onFilterChange } = this.props;
    onFilterChange();
  };

  onCompleteClick = () => {
    const { onFilterChange } = this.props;
    onFilterChange('complete');
  };

  onTabChange = (e, tabValue) => {
    this.setState({ tabValue });
  };

  render() {
    const {
      classes,
      todos,
      onTodoCompleteChange,
      onTodoItemRemove
    } = this.props;

    const { tabValue } = this.state;

    const activeTodos = this.filterActive(todos);

    return (
      <div className={classes.root}>
        <List>
          {todos.map(todo => (
            <ListItem
              todo={todo}
              key={todo.id}
              onTodoCompleteChange={onTodoCompleteChange}
              onTodoItemRemove={onTodoItemRemove}
            />
          ))}
        </List>
        <div className={classes.filterBar}>
          <span>{activeTodos.length} Items Left</span>
          <Tabs value={tabValue} onChange={this.onTabChange}>
            <Tab label="All" onClick={this.onAllClick} />
            <Tab label="Active" onClick={this.onActiveClick} />
            <Tab label="Completed" onClick={this.onCompleteClick} />
          </Tabs>
        </div>
        <Button onClick={this.props.onDeleteAll}>
          <span>Delete All</span>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(TodoList);
