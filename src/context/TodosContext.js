import { createContext, useContext, useReducer, useEffect, useState } from "react";
import axios from '../config/axios';
import { todosReducer, INITIAL_TODO, displayReducer, INITIAL_DISPLAY } from "../reducer/TodoReducer";
import { FETCH_DATABASED, ADD_DATABASED, DELETE_DATABASED, UPDATE_DATABASED, UPDATE_DISPLAY } from "../reducer/TodoReducer";
import { UPDATE_SEARCH, UPDATE_FILTER } from "../reducer/TodoReducer";

const TodosContext = createContext();    // create storage

const TodosContextProvider = ({ children }) => {
    // useReducer
    const [todos, dispatch] = useReducer(todosReducer, INITIAL_TODO);
    const [backupTodos, setBackupTodos] = useState([]);

    // get database -------------------------------------------------------------------------------
    const getDataFromDatabased = async () => {
        try {
            const res = await axios.get('/todos');
            dispatch({ type: FETCH_DATABASED, payload: res.data.todos });
            setBackupTodos(res.data.todos);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getDataFromDatabased();
    }, [])
    // --------------------------------------------------------------------------------------------

    // add databased ------------------------------------------------------------------------------
    const addTodo = async (title) => {
        try {
            const res = await axios.post('/todos', { title, completed: false });
            dispatch({ type: ADD_DATABASED, payload: [res.data.todo, ...backupTodos] });
            setBackupTodos([res.data.todo, ...backupTodos]);
        } catch (err) {
            console.log(err);
        }
    }
    // --------------------------------------------------------------------------------------------

    // delete databased ---------------------------------------------------------------------------
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/todos/${id}`);
            const tempTodos = todos.filter((el) => el.id !== id);
            dispatch({ type: DELETE_DATABASED, payload: tempTodos });
            setBackupTodos(tempTodos);
        } catch (err) {
            console.log(err);
        }
    }
    // --------------------------------------------------------------------------------------------

    // update databased ---------------------------------------------------------------------------
    const updateTodo = async (id, updateValue) => {
        const idx = todos.findIndex((el) => el.id === id);
        const tempTodos = [...todos];
        tempTodos[idx] = { ...tempTodos[idx], ...updateValue };
        await axios.put(`/todos/${id}`, tempTodos[idx])
        dispatch({ type: UPDATE_DATABASED, payload: tempTodos })
        setBackupTodos(tempTodos);
    }
    // --------------------------------------------------------------------------------------------

    //////////////////////////////////////// display //////////////////////////////////////////////

    // useReducer
    const [display, dispatchDisplay] = useReducer(displayReducer, INITIAL_DISPLAY)

    // to control searchTerm in <SearchForms /> ---------------------------------------------------
    const updateSearch = searchTerm => {
        const tempObj = { ...display, searchTerm };
        dispatchDisplay({ type: UPDATE_SEARCH, display: tempObj });
    }

    // to control filterTerm in <FilterStatus /> --------------------------------------------------
    const updateFilter = filterTerm => {
        const tempObj = { ...display, filterTerm };
        dispatchDisplay({ type: UPDATE_FILTER, display: tempObj });
    }

    // tracking and updating display --------------------------------------------------------------
    useEffect(() => {
        const lowSearchTerm = display.searchTerm.toLowerCase()
        let completedStatus;
        if (display.filterTerm === 'done') completedStatus = true;
        else if (display.filterTerm === 'notDone') completedStatus = false;

        const tempArr = backupTodos.filter(el => el.title.toLowerCase().includes(lowSearchTerm)
            && (display.filterTerm === '' || el.completed === completedStatus));
        dispatch({ type: UPDATE_DISPLAY, payload: tempArr });
    }, [display.searchTerm, display.filterTerm, backupTodos]);

    const manageSearch = { searchTerm: display.searchTerm, updateSearch };
    const manageFilter = { filterTerm: display.filterTerm, updateFilter };
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