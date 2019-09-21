import React, {useState} from 'react'
import Todo from './components/Todo'
import Header from './components/Header'
import Auth from './components/Auth'
import authContext from './components/auth-context'

export default function App() {
  const [showPage, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = (page) => {
    setPage(page);
  }

  const login = () => {
    setAuthStatus(true);
  }

  return (
    <div style={{width: '600px', margin: 'auto'}}>
      <authContext.Provider value={{status: authStatus, login: login}}>
      <Header 
        onLoadTodo={switchPage.bind(this, 'todo')}
        onLoadAuth={switchPage.bind(this, 'auth')}
      />
      <hr/>
      {showPage === 'auth' ? <Auth /> : <Todo />}
      </authContext.Provider>
    </div>
  )
}
