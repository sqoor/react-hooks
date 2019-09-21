import React, { useContext } from "react";
import authContext from './auth-context';

const Header = props => {
    const auth = useContext(authContext);

    return (
    <div>
      <button
        style={{display: auth.status ? 'inline' : 'none'}}
        onClick={props.onLoadTodo}
        className="m-2 my-2 btn btn-sm btn-outline-primary"
      >
        List
      </button>
      |
      <button
        onClick={props.onLoadAuth}
        className="m-2 my-2 btn btn-sm btn-outline-primary"
      >
        Auth
      </button>
    </div>
  );
};

export default Header;
