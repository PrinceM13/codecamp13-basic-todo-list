import { useState } from "react";
import { useTodos } from "../context/TodosContext";

const Item = ({ todo }) => {
    // useContext: TodosContext
    const { deleteTodo, updateTodo } = useTodos();

    // internal useState
    const [isEdit, setIsEdit] = useState(false);                        // for toggling between display and edit mode
    const [editItem, setEditItem] = useState(todo.title);               // for edit data

    // set status color due to current 'completed' status
    const statusColor = todo.completed ? 'success' : 'danger';

    const deleteItem = () => {
        deleteTodo(todo.id);
    }

    const updateItemCompleted = () => {
        updateTodo(todo.id, { completed: !todo.completed });
    }

    const updateItemTitle = () => {
        updateTodo(todo.id, { title: editItem });
        setIsEdit(!isEdit);
    }

    const onCancel = () => {
        setIsEdit(!isEdit);
        setEditItem(todo.title);
    }

    const onEditMode = () => {
        setEditItem(todo.title)
        setIsEdit(!isEdit)
    }

    // item: display mode
    const displayItemMode = <div className="d-flex align-items-center">
        <div
            className="flex-fill"
            role='button'
            onClick={onEditMode}
        >
            {todo.title}
        </div>
        <div className="btn-group">
            <button
                className="btn btn-outline-light"
                onClick={updateItemCompleted}
            >
                <i className="fa-solid fa-repeat" />
            </button>
            <button
                className="btn btn-outline-light"
                onClick={deleteItem}
            >
                <i className="fa-regular fa-trash-can" />
            </button>
        </div>
    </div>

    // item: edit mode
    const editItemMode = <div className="input-group list-group-item d-flex">
        <input
            className="form-control"
            onChange={(e) => setEditItem(e.target.value)}
            value={editItem} />
        <button className="btn btn-primary" onClick={updateItemTitle} ><i className="fa-solid fa-check" /></button>
        <button className="btn btn-outline-secondary" onClick={onCancel} ><i className="fa-solid fa-xmark" /></button>
    </div>

    return (
        <div className={`${!isEdit ? 'list-group-item  text-bg-' + statusColor : ''}`}>
            {isEdit ? editItemMode : displayItemMode}
        </div>
    );
}
export default Item;