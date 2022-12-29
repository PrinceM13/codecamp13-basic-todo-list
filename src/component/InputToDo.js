import { useState } from 'react';
import validator from 'validator';
import { useTodos } from '../context/TodosContext';

const InputToDo = () => {
    // useContext: TodosContext
    const { addTodo } = useTodos();

    // internal useState
    const [error, setError] = useState('');
    const [newItem, setNewItem] = useState('');     // for input data

    // action when submit (both click on 'Add' and press 'Enter')
    // ---> use [form + submit] instead of [onClick]
    const handleSubmit = (e) => {
        e.preventDefault();     // avoid refesh page after submitting
        if (validator.isEmpty(newItem, { ignore_whitespace: true })) {
            setError('To-Do List is required');
        } else {
            addTodo(newItem);
            setNewItem('');
            setError('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder='Enter your To-Do List'
                />

                <button className="btn btn-primary" >
                    <i className="fa-solid fa-check" />
                </button>

                <button
                    type='button'
                    className="btn btn-outline-secondary"
                    onClick={() => setNewItem('')}
                >
                    <i className="fa-solid fa-xmark" />
                </button>
            </div>
            {error && <small className='text-danger'>{error}</small>}
        </form>
    );
}
export default InputToDo;