import Item from "./Item";

const ListItems = ({ items, onClickDelete, onClickUpdateItem }) => {
    return (
        <div className="list-group">
            {items.map(item => <Item
                key={item.id}
                item={item}
                onClickDelete={onClickDelete}
                onClickUpdateItem={onClickUpdateItem}
            />)}
        </div>
    );
}
export default ListItems;