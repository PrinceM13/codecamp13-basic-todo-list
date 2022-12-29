import './App.css';
import InputToDo from './component/InputToDo';
import ListItems from './component/ListItems';
import SearchForm from './component/SearchForm';
import FilterStatus from './component/FilterStatus';

import TodosContextProvider from './context/TodosContext';

function App() {

  return (
    <div className='container' style={{ width: '80%', margin: '50px auto' }}>
      <TodosContextProvider>
        <InputToDo />
        <br />
        <SearchForm />
        <br />
        <FilterStatus />
        <br />
        <br />

        <ListItems />
      </TodosContextProvider>
    </div>
  );
}

export default App;
