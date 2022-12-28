import { createContext, useContext, useReducer, useEffect, useState } from "react";
import axios from 'axios';

const TodosContext = createContext();    // create storage

const FETCH_DATABASED = 'FETCH_DATABASED';
const ADD_DATABASED = 'ADD_DATABASED';
const DELETE_DATABASED = 'DELETE_DATABASED';
const UPDATE_DATABASED = 'DELETE_DATABASED';
const UPDATE_DISPLAY = 'UPDATE_DISPLAY';

const todosReducer = (state, action) => {
    switch (action.type) {
        // for databaseds
        case FETCH_DATABASED: return action.todos;
        case ADD_DATABASED: return action.todos;
        case DELETE_DATABASED: return action.todos;
        case UPDATE_DATABASED: return action.todos;
        // for display
        case UPDATE_DISPLAY: return action.todos;
        default: return state;
    }
}

const UPDATE_SEARCH = 'UPDATE_SEARCH';
const UPDATE_FILTER = 'UPDATE_FILTER';

const displayReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_SEARCH: return action.display;
        case UPDATE_FILTER: return action.display;
        default: return state;
    }
}

const TodosContextProvider = ({ children }) => {
    // useReducer
    const [todos, dispatch] = useReducer(todosReducer, []);
    const [backupTodos, setBackupTodos] = useState([]);

    // get database -------------------------------------------------------------------------------
    const getDataFromDatabased = async () => {
        const res = await axios.get('http://localhost:8080/todos');
        dispatch({ type: FETCH_DATABASED, todos: res.data.todos });
        setBackupTodos(res.data.todos);
    }
    useEffect(() => {
        getDataFromDatabased();
    }, [])
    // --------------------------------------------------------------------------------------------

    // add databased ------------------------------------------------------------------------------
    const addTodo = async (title) => {
        const todo = await axios.post('http://localhost:8080/todos', { title, completed: false });
        dispatch({ type: ADD_DATABASED, todos: [todo.data.todo, ...todos] });
        setBackupTodos([todo.data.todo, ...todos]);
    }
    // --------------------------------------------------------------------------------------------

    // delete databased ---------------------------------------------------------------------------
    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:8080/todos/${id}`);
        const tempTodos = todos.filter((el) => el.id !== id);
        dispatch({ type: DELETE_DATABASED, todos: tempTodos });
        setBackupTodos(tempTodos);
    }
    // --------------------------------------------------------------------------------------------

    // update databased ---------------------------------------------------------------------------
    const updateTodo = async (id, updateValue) => {
        const idx = todos.findIndex((el) => el.id === id)
        const tempTodos = [...todos]
        tempTodos[idx] = { ...tempTodos[idx], ...updateValue }
        await axios.put(`http://localhost:8080/todos/${id}`, tempTodos[idx])
        dispatch({ type: UPDATE_DATABASED, todos: tempTodos })
        setBackupTodos(tempTodos);
    }
    // --------------------------------------------------------------------------------------------

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // useReducer
    const [display, dispatchDisplay] = useReducer(displayReducer, { searchTerm: '', filterTerm: '' })

    // display ------------------------------------------------------------------------------------    

    // to control searchTerm in <SearchForms />
    const updateSearch = searchTerm => {
        const tempObj = { ...display, searchTerm };
        dispatchDisplay({ type: UPDATE_SEARCH, display: tempObj });
    }

    // to control filterTerm in <FilterStatus />
    const updateFilter = filterTerm => {
        const tempObj = { ...display, filterTerm };
        dispatchDisplay({ type: UPDATE_FILTER, display: tempObj });
    }

    // tracking and updating display
    useEffect(() => {
        const lowSearchTerm = display.searchTerm.toLowerCase()
        let completedStatus;
        if (display.filterTerm === 'done') completedStatus = true
        else if (display.filterTerm === 'notDone') completedStatus = false

        const tempArr = backupTodos.filter(el => el.title.toLowerCase().includes(lowSearchTerm)
            && (display.filterTerm === '' || el.completed === completedStatus));
        dispatch({ type: UPDATE_DISPLAY, todos: tempArr });
    }, [display.searchTerm, display.filterTerm]);

    const manageSearch = { searchTerm: display.searchTerm, updateSearch }
    const manageFilter = { filterTerm: display.filterTerm, updateFilter }
    // --------------------------------------------------------------------------------------------

    return (
        <TodosContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo, manageSearch, manageFilter }}>
            {children}
        </TodosContext.Provider>
    );
}

const useTodos = () => useContext(TodosContext); // use

export { useTodos };
export default TodosContextProvider;