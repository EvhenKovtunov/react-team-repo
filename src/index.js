import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import TodoList from './components/todo-list';
import ItemStatusFilter from './components/item-status-filter';

import './index.css';
import TodoListItemAdd from "./components/todo-list-item-add";

export default class App extends React.Component {
    maxId = 100;
    state = {
        todoData: [
            {label: 'Working Like this Coffee', important: false, done: false, id: 1},
            {label: 'Make Awesome App', important: true, done: false, id: 2},
            {label: 'Have a lunch', important: true, done: false, id: 3}
        ],
        term: '',
        status: {
            active: false,
            done: false,
            all: true
        },
        filter : 'all'
    };

    onToggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id == id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];


    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id == id)
            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            return {
                todoData: newArray
            }
        })
    };
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {

            return {
                todoData: this.onToggleProperty(todoData, id, 'important')
            }
        });
    };
    onToggleDone = (id) => {
        this.setState(({todoData}) => {

            return {
                todoData: this.onToggleProperty(todoData, id, 'done')
            }
        });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };


    filterItems(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }

    addItem = (data) => {
        this.setState(({todoData}) => {

            const newItem =
                {
                    label: data,
                    important: false,
                    done: false,
                    id: this.maxId++
                };

            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            }
        })
    };
    onSearch = (data, term) => {
        if (term.length == 0) {
            return data;
        }

        return data.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };
    onSearchSet = (term) => {
        this.setState(({state}) => {
            return {
                term: term
            }
        })
    };


    render() {
        const visibleitems = this.onSearch(this.state.todoData, this.state.term);

        const vs = this.filterItems(visibleitems, this.state.filter);

        const doneCount = visibleitems
            .filter((el) => el.done === false);
        const notDoneCount = visibleitems
            .filter((el) => el.done === true);
        return (
            <div className="todo-app">
                <AppHeader toDo={doneCount.length} done={notDoneCount.length}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchFilter={this.onSearchSet}/>
                    <ItemStatusFilter
                        filter={this.state.filter}
                        onFilterChange={this.onFilterChange}
                        filterstatus={this.state.status}/>

                </div>

                <TodoList
                    onDone={this.onToggleDone}
                    onImportant={this.onToggleImportant}
                    todos={vs}
                    onDelete={this.deleteItem}
                />
                <TodoListItemAdd onAdd={this.addItem}/>

            </div>
        );
    }
};

ReactDOM.render(<App/>,
    document.getElementById('root'));