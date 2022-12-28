import { useTodos } from "../context/TodosContext";

const FilterStatus = () => {
    const { manageFilter: { filterTerm, updateFilter } } = useTodos();

    const handleChangeFilter = (e) => {
        updateFilter(e.target.value);
    }

    return (
        <div className="btn-group" role="group">
            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                value=''
                checked={filterTerm === ''}
                onChange={handleChangeFilter}
            />
            <label className="btn btn-outline-secondary" htmlFor="btnradio1">
                <i className="fa-solid fa-bars"></i>
            </label>

            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                value='done'
                checked={filterTerm === 'done'}
                onChange={handleChangeFilter}
            />
            <label className="btn btn-outline-success" htmlFor="btnradio2">
                <i className="fa-solid fa-clipboard-check"></i>
            </label>

            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                value='notDone'
                checked={filterTerm === 'notDone'}
                onChange={handleChangeFilter}
            />
            <label className="btn btn-outline-danger" htmlFor="btnradio3">
                <i className="fa-solid fa-clipboard-list"></i>
            </label>
        </div>
    );
}

export default FilterStatus;