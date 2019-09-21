import React, { useState, useEffect, useReducer, useRef, useMemo } from "react";
import Axios from "axios";
import List from "./List";
import { useFormInput } from "./hooks/forms";

const Todo = props => {
  const [inputIsValid, setInputIsValid] = useState(false);
  // const [item, setItem] = useState("");
  // const [submittedItem, setSubmittedItem] = useState(null);
  // const [list, setList] = useState([]);

  const itemInputRef = useRef();
  const itemInput = useFormInput();

  const listReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(item => item.id !== action.payload);
      default:
        return state;
    }
  };

  const [list, dispatch] = useReducer(listReducer, []);

  useEffect(() => {
    Axios.get("https://test-f9e01.firebaseio.com/todo-list.json")
      .then(res => {
        console.log(res);
        const dbList = [];
        for (const key in res.data) {
          dbList.push({ id: key, name: res.data[key].name });
        }
        // setList(dbList);
        dispatch({ type: "SET", payload: dbList });
      })
      .catch(err => console.log(err));

    return () => {
      console.log("do clean up");
    };
  }, []);

  /* 
  useEffect(() => {
    if (submittedItem) dispatch({ type: "ADD", payload: submittedItem });
    // setList(list.concat(submittedItem));
  }, [submittedItem]);
 */

  /* 
  const mouseMoveHandler = (e) => {
      console.log(e.clientX, e.clientY)
      // youll keep adding vent listener which is bad for performance, so we need to clean older listener before attach new one.
  }

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler)
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])
 */

  /* 
  const changeHandler = e => {
    setItem(e.target.value);
  }; */

  const submitHandler = e => {
    e.preventDefault();

    // const item = itemInputRef.current.value;
    const item = itemInput.value;

    Axios.post("https://test-f9e01.firebaseio.com/todo-list.json", {
      name: item
    })
      .then(res => {
        setTimeout(() => {
          const newItem = { id: res.data.name, name: item };
          // setSubmittedItem(newItem);
          dispatch({ type: "ADD", payload: newItem });
        }, 2000);
      })
      .catch(err => console.log(err));

    e.target.children[0].value = "";
  };

  const removeItemHandler = itemId => {
    Axios.delete(`https://test-f9e01.firebaseio.com/todo-list/${itemId}.json`)
      .then(res => {
        console.log(res);
        dispatch({ type: "REMOVE", payload: itemId });
      })
      .catch(err => console.log(err));
  };

  /* 
  const inputValidHandler = e => {
    if (e.target.value === "") {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }

    console.log(e.target.value);
  };
 */

  return (
    <div className="container-fluid mt-3">
      <form className="form-inline" onSubmit={submitHandler}>
        <input
          // onChange={inputValidHandler}
          // ref={itemInputRef}
          onChange={itemInput.onChange}
          value={itemInput.value}
          className="form-control"
          type="text"
          placeholder="Enter a task..."
          // style={{ border: inputIsValid ? "" : "red 1px solid" }}
          style={{ border: itemInput.validity === true ? "" : "red 1px solid" }}
        />
        <button className="btn btn-primary">Add</button>
      </form>
      {useMemo(
        () => (
          <List list={list} removeItemHandler={removeItemHandler} />
        ),
        [list]
      )}
    </div>
  );
};

export default Todo;
