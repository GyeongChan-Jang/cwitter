import React, { useEffect, useState } from 'react'
import { authService, dbService } from 'fBase'
import { signOut, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore'

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate()
  const [newDisplayName, setnewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = () => {
    signOut(authService)
    navigate('/')
  }

  const getCweet = async () => {
    const q = query(
      collection(dbService, 'cweet'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc')
    )
    // 쿼리 스냅샷을 미리 만들고 쿼리 조건문 돌리기
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  }

  const onChange = (event) => {
    event.preventDefault()
    const { target: value } = event
    setnewDisplayName(value.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, { displayName: newDisplayName })
      console.log('Update Profile')
      refreshUser()
    }
  }

  useEffect(() => {
    getCweet()
  }, [])

  return (
    <>
      <div>{}</div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="업데이트 할 프로필명" />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile
