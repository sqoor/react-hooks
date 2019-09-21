import React from "react";

export default function List(props) {
    console.log('List rendering...');
  return (
    <div>
      <ul className="mt-4 list-group-flush">
        {props.list.map(item => (
          <li className="list-group-item" key={item.id}>
            {item.name}
            <button
              onClick={props.removeItemHandler.bind(this, item.id)}
              className="btn btn-danger float-right"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
