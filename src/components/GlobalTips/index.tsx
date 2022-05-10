import React, { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { MessageType, AddType } from './data.d'
import { ExclamationCircleFilled, CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons'

const MsgWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 3.75rem;
  transform: translate(-50%);
  z-index: 99999;
  .message {
    padding: 0rem 0.63rem;
    font-size: 0.88rem;
    margin-top: 1.25rem;
    display: flex;
    align-items: center;
    padding: 0.63rem 1rem;
    background: #fff;
    border-radius: 0.13rem;
    box-shadow: 0 0.19rem 0.38rem -0.25rem rgba(0, 0, 0, 0.12), 0 0.38rem 1rem 0 rgba(0, 0, 0, 0.08),
      0 0.56rem 1.75rem 0.5rem rgba(0, 0, 0, 0.05);
    .text {
      color: rgba(0, 0, 0, 0.85);
      width: calc(100% - 1.13rem);
      margin-left: 0.31rem;
    }
  }
`

const Msg: React.FC<AddType> = ({ text, type, i }) => {
  return (
    <MsgWrapper>
      <div className={`message ${type}`}>
        {i === '!' && <ExclamationCircleFilled style={{ color: '#faad14', fontSize: '1rem' }} />}
        {i === 'i' && <InfoCircleFilled style={{ color: '#1890ff', fontSize: '1rem' }} />}
        {i === 'x' && <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '1rem' }} />}
        {i === '√' && <CheckCircleFilled style={{ color: '#52c41a', fontSize: '1rem' }} />}
        <span className="text">{text}</span>
      </div>
    </MsgWrapper>
  )
}

let add: (l: AddType) => void
export const MessageContainer = () => {
  const [lists, setList] = useState<AddType[]>([])
  const remove = (l: AddType) => {
    const { key } = l
    setList((pre: AddType[]) => pre.filter((each: AddType) => key !== each.key))
  }

  add = (options: AddType) => {
    setList((pre: AddType[]) => {
      const obj = [...pre, options]
      setTimeout(() => {
        remove(options)
      }, 3000)
      return obj
    })
  }

  useEffect(() => {
    if (lists.length > 0) {
      lists.shift()
    }
  }, [lists])

  return (
    <>
      {lists.map(({ text, key, type, i }) => (
        <Msg key={key} type={type} text={text} i={i} />
      ))}
    </>
  )
}

const getId = () => (Math.random() * 1000).toFixed()

const message: MessageType = {
  info: (text) => {
    add({
      text,
      type: 'info',
      key: getId(),
      i: 'i',
    })
  },
  success: (text) => {
    add({
      text,
      type: 'success',
      key: getId(),
      i: '√',
    })
  },
  warning: (text) => {
    add({
      text,
      type: 'warning',
      key: getId(),
      i: '!',
    })
  },
  error: (text) => {
    add({
      text,
      type: 'error',
      key: getId(),
      i: 'x',
    })
  },
}

export default message

const createMessage = () => {
  let el = document.getElementById('#message-wrap')
  if (!el) {
    el = document.createElement('div')
    el.className = 'message-wrap'
    el.id = 'message-wrap'
    document.body.append(el)
  }
  ReactDOM.render(<MessageContainer />, el)
}

createMessage()
