import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fBase'

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인 한 USER 정보를 받음
      if (user) {
        setUserObj(user)
      } else {
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter userObj={userObj} isLoggedIn={Boolean(userObj)} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} Cwitter</footer>
    </>
  )
}

export default App
