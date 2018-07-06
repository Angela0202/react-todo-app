import React, { Component } from 'react';
import memoize from 'memoize-one';

import styles from './styles';

import CreateTodoItem from '../CreateTodoItem/index';
import TodoList from '../TodoList/index';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      selectedFilter: "",
      markedAll: false,
      clicked: false
    };
  }

  static ID = 0;

  static completedTodos(todos) {
    return todos.filter((todo) => todo.isComplete);
  }

  static activeTodos(todos) {
    return todos.filter((todo) => !todo.isComplete);
  }

  markCompleteAll = () => {
    const { todos, markedAll } = this.state;
    if(!markedAll) {
      for(let i =0; i < todos.length; i++) {
        todos[i].isComplete = true;
      }
      this.setState({
        todos,
        markedAll: true,
        clicked: true
      });
    } else {
      for(let i =0; i < todos.length; i++) {
        todos[i].isComplete = false;
      }
      this.setState({
        todos,
        markedAll: false,
        clicked: false
      });
    }
  };

  onTodoItemCreate = (value) => {
    const { todos } = this.state;
    this.setState({
      todos: [{ value, isComplete: false, id: Main.ID++ }, ...todos]
    });
  };

  getVisibleTodos = memoize((todos, selectedFilter) => {
    if(selectedFilter === 'active') {
      return Main.activeTodos(todos);
    } else if(selectedFilter === 'complete') {
      return Main.completedTodos(todos);
    }
    return todos;
  });

  onTodoCompleteChange = (isComplete, todo) => {
    const { todos } = this.state;
    const index = todos.indexOf(todo);

    const newTodos = [
      ...todos.slice(0, index),
      { ...todo, isComplete },
      ...todos.slice(index + 1)
    ];

    this.setState({
      todos: newTodos
    })
  };

  onTodoItemRemove = (todo) => {
    const { todos } = this.state;
    const index = todos.indexOf(todo);

    this.setState({
      todos: todos.filter((todo, current) => index !== current)
    });
  };

  onFilterChange = (selectedFilter) => {
    this.setState({
      selectedFilter
    });
  };

  render() {
    const {
      classes
    } = this.props;

    const {
      todos,
      selectedFilter
    } = this.state;

    const visibleTodos = this.getVisibleTodos(todos, selectedFilter);

    return (
      <Paper className={classes.main}>
        <Typography className={classes.heading} variant="headline" component="h1">todos</Typography>
        <Card>
          <CardContent className={classes.card}>
            <CreateTodoItem
              onTodoItemCreate={this.onTodoItemCreate}
              todos={todos}
              markCompleteAll={this.markCompleteAll}
              clicked={this.state.clicked}
            />
            <TodoList
              todos={visibleTodos}
              selectedFilter={selectedFilter}
              onTodoCompleteChange={this.onTodoCompleteChange}
              onTodoItemRemove={this.onTodoItemRemove}
              onFilterChange={this.onFilterChange}
            />
          </CardContent>
        </Card>
      </Paper>
    );
  }
}

export default withStyles(styles)(Main);