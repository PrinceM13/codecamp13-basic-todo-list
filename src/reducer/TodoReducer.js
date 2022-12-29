// for TODOS REDECER
export const FETCH_DATABASED = 'FETCH_DATABASED';
export const ADD_DATABASED = 'ADD_DATABASED';
export const DELETE_DATABASED = 'DELETE_DATABASED';
export const UPDATE_DATABASED = 'DELETE_DATABASED';
export const UPDATE_DISPLAY = 'UPDATE_DISPLAY';

export const INITIAL_TODO = [];

export const todosReducer = (state, action) => {
    switch (action.type) {
        // for databaseds
        case FETCH_DATABASED: return action.payload;
        case ADD_DATABASED: return action.payload;
        case DELETE_DATABASED: return action.payload;
        case UPDATE_DATABASED: return action.payload;
        // for display
        case UPDATE_DISPLAY: return action.payload;
        default: return state;
    }
}

// for DISPLAY REDUCER
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const UPDATE_FILTER = 'UPDATE_FILTER';

export const INITIAL_DISPLAY = { searchTerm: '', filterTerm: '' };

export const displayReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_SEARCH: return action.display;
        case UPDATE_FILTER: return action.display;
        default: return state;
    }
}