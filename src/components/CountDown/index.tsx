import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import TIME_ICON1_IMG from '@/assets/time-icon1.png'
import TIME_ICON2_IMG from '@/assets/time-icon2.png'

const AuctionTime = styled.div<{ active: boolean }>`
  width: 28.44rem;
  height: 9.19rem;
  background: ${({ active }) => (active ? `url(${TIME_ICON2_IMG}) no-repeat` : `url(${TIME_ICON1_IMG}) no-repeat`)};
  background-size: 100% 100%;
  position: relative;
  span {
    font-size: 4.38rem;
    font-family: 'DIN-Alternate-Bold';
    font-weight: bold;
    color: ${(props) => props.theme.black2};
    line-height: 5.13rem;
    position: absolute;
    top: calc(33% - 2.19rem);
    &:nth-child(1) {
      left: 1.31rem;
    }
    &:nth-child(2) {
      left: calc(50% - 2.19rem + 0.3rem);
    }
    &:nth-child(3) {
      left: auto;
      right: 1.31rem;
    }
  }
  ${(props) =>
    props.theme.mediaWidth.screenMd(
      () => css`
        width: calc(28.44rem * 0.8);
        height: calc(9.19rem * 0.8);
        margin-bottom: 2.88rem;
        span {
          font-size: 3.5rem;
          &:nth-child(1) {
            left: 1.06rem;
          }
          &:nth-child(2) {
            left: calc(50% - 2.19rem + 0.3rem);
          }
          &:nth-child(3) {
            left: auto;
            right: 1.06rem;
          }
        }
      `,
    )}
`

interface IProps {
  timeStamp: any
  returnClick: () => void
}

const CountDown = (props: IProps) => {
  const { timeStamp, returnClick } = props
  const intervalRef = useRef<any>(null)

  const now: any = Math.round(new Date().getTime() / 1000).toString() //获取当前时间
  const end: any = timeStamp //设置截止时间

  const [leftTime, setLeftTime] = useState(end - now) //时间间隔
  const [h, setHours] = useState<any>('') //小时
  const [m, setMinutes] = useState<any>('') //分钟
  const [s, setSeconds] = useState<any>('') //秒

  useEffect(() => {
    if (leftTime === 0) returnClick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftTime])

  useEffect(() => {
    if (leftTime > 0) {
      intervalRef.current = setInterval(() => {
        const newNow: any = Math.round(new Date().getTime() / 1000).toString() // 重新获取当前时间

        let newLeftTime = timeStamp - newNow
        setLeftTime(() => newLeftTime) //计算新的时间间隔数值

        let hours =
          Math.floor((newLeftTime / 60 / 60) % 24) < 10
            ? `0${Math.floor((newLeftTime / 60 / 60) % 24)}`
            : Math.floor((newLeftTime / 60 / 60) % 24)
        let minutes =
          Math.floor((newLeftTime / 60) % 60) < 10 ? `0${Math.floor((newLeftTime / 60) % 60)}` : Math.floor((newLeftTime / 60) % 60)
        let seconds = Math.floor(newLeftTime % 60) < 10 ? `0${Math.floor(newLeftTime % 60)}` : Math.floor(newLeftTime % 60)
        setHours(() => hours) //函数写法 设置小时
        setMinutes(() => minutes) //函数写法 设置分钟
        setSeconds(() => seconds) //函数写法保证值在setInterval里更新，避免useEffect的bug
      }, 1000)
    } else {
      setLeftTime(0)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //不传依赖

  return (
    <>
      {leftTime <= 0 && (
        <AuctionTime active={leftTime < 60}>
          <span>00</span>
          <span>00</span>
          <span>00</span>
        </AuctionTime>
      )}
      {leftTime > 0 && (
        <AuctionTime active={leftTime < 60}>
          <span>{h}</span>
          <span>{m}</span>
          <span>{s}</span>
        </AuctionTime>
      )}
    </>
  )
}

export default CountDown
