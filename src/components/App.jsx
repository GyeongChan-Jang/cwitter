import React, { useState, useEffect } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fBase'
import { updateCurrentUser } from 'firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인 한 USER 정보를 받음
      if (user) {
        setUserObj(user)
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])

  const refreshUser = async () => {
    const user = await authService.currentUser
    console.log(user)
    setUserObj({ ...user })
  }

  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} userObj={userObj} isLoggedIn={Boolean(userObj)} />
      ) : (
        'Initializing...'
      )}
      <footer>&copy; {new Date().getFullYear()} Cwitter</footer>
    </>
  )
}

export default App
