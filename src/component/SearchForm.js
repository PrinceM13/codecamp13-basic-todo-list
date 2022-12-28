import { useTodos } from "../context/TodosContext";

const SearchForm = () => {
    const { manageSearch: { searchTerm, updateSearch } } = useTodos();

    const handleChange = (e) => {
        const currentSearch = e.target.value.trim();
        updateSearch(currentSearch);
    }

    const handleCancel = () => {
        updateSearch('');
    }

    return (
        <div className="input-group">
            <input
                className={`form-control`}
                value={searchTerm}
                onChange={handleChange}
                placeholder='Search'
            />

            <button className="btn btn-warning" onClick={handleCancel}>
                <i className="fa-solid fa-xmark" />
            </button>
        </div>
    );
}

export default SearchForm;