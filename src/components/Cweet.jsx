import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { dbService } from 'fBase'

const Cweet = ({ cweetObj, isOwner }) => {
  // editing 모드인지에 따라 input 값을 보여줌
  const [editing, setEditing] = useState(false)
  // input에 입력된 text를 업데이트
  const [newCweet, setNewCweet] = useState(cweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm('이 트윗을 삭제 하시겠습니까?!')
    if (ok) {
      await deleteDoc(doc(dbService, 'cweet', cweetObj.id))
    }
  }

  const toggleEditing = () => {
    setEditing((prev) => !prev)
  }

  const onChange = (event) => {
    const {
      target: { value }
    } = event
    setNewCweet(value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    updateDoc(doc(dbService, 'cweet', cweetObj.id), { text: newCweet })
    setEditing(false)
  }

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input type="text" value={newCweet} onChange={onChange} required />
                <input type="submit" value="Update Cweet" />
              </form>
            </>
          )}
        </>
      ) : (
        <h2>{cweetObj.text}</h2>
      )}
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Cweet</button>
          <button onClick={toggleEditing}>Edit Cweet</button>
        </>
      )}
    </div>
  )
}

export default Cweet
