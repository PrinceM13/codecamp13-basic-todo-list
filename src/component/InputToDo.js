const InputToDo = ({ item, onChange, onClickAdd, onClickReset }) => {
    return (
        <div className="input-group" style={{ margin: '40px 0' }}>
            <input
                type='text'
                className="form-control"
                value={item}
                onChange={onChange}
            />
            <button className="btn btn-outline-secondary" onClick={onClickAdd}>Add</button>
            <button type="reset" className="btn btn-outline-secondary" onClick={onClickReset}>Reset</button>
        </div>
    );
}
export default InputToDo;