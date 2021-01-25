import React, {Component} from "react";
import Habits from "./components/habits";
import "./app.css";
import Nav from "./components/nav"
;

class App extends Component {
  state = {
    habits: [{id: 1, name: "READING", count: 0}, {id: 2, name: "RUNNING", count: 0}, {id: 3, name: "BREATHING", count: 0}],
  };
  handleIncrement= habit => {
    console.log(`handleDecrement ${habit.name}`);
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);

    habits[index].count++;
    this.setState({habits});
  };
  handleDecrement= habit => {
    console.log(`handleDelete ${habit.name}`);
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);
    const count = habits[index].count - 1;

    habits[index].count = count < 0 ? 0 : count;
    this.setState({habits});
  };
  handlDelete= habit => {
    console.log(`handleIncrement ${habit.name}`);
    const habits = this.state.habits.filter(item =>
      item.id !== habit.id);

    this.setState({habits});
  };
  handleAdd = name => {
    const habits = [...this.state.habits, {id: Date.now(), name, count: 0}];

    this.setState({habits});
  }
  handleonReset =() => {
    const habits = [
      ...this.state.habits.map(habit => {
        habit.count = 0;
        return habit;
      }),
    ];

    this.setState({habits});
  }
  render() {
    return (
      <>
        <Nav totalCount={this.state.habits.filter(item => item.count > 0).length}/>
        <div>
          <Habits
            onAdd={this.handleAdd}
            onReset={this.handleonReset}
            habits={this.state.habits}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handlDelete} />
        </div>
      </>
    );
  }
}

export default App;
