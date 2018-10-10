import React from "react";
import Item from "./Item";

const ItemList = ({ items }) => {
  return (
    <div className="itemList">
      {items.map((item, i) => {
        return (
          <Item key={i} name={item.name} points={item.points} max={item.max} />
        );
      })}
    </div>
  );
};

export default ItemList;
