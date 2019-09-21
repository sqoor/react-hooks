import React, {useContext} from 'react';
import authContext from './auth-context';

export default function Auth(props) {
    const auth = useContext(authContext);
    return (
        <div className="container">
            <button onClick={auth.login} className="btn btn-primary">Login</button>
        </div>
    )
}
