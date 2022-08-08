import React, { useState } from 'react'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { dbService, storageService } from 'fBase'
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection } from 'firebase/firestore'

const CweetFactory = ({ userObj }) => {
  const [cweet, setCweet] = useState('')

  const [attachment, setAttachment] = useState('')
  const onChange = (event) => {
    const {
      target: { value }
    } = event
    setCweet(value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    let attachmentUrl = ''
    if (attachment !== '') {
      // 사용자의 아이디로 폴더를 만들고 이미지 제목을 설정 -> '사용자id/이미지제목'
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
      const response = await uploadString(attachmentRef, attachment, 'data_url')
      attachmentUrl = await getDownloadURL(response.ref)
    }
    const newCweet = {
      text: cweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await addDoc(collection(dbService, 'cweet'), newCweet)
    setCweet('')
    setAttachment('')
  }

  const onFileChange = (event) => {
    const {
      target: { files }
    } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent)
      const {
        currentTarget: { result }
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachment = () => {
    setAttachment(null)
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={cweet}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Cweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onClearAttachment}>clear</button>
        </div>
      )}
    </form>
  )
}

export default CweetFactory
