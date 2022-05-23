import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import TIME_ICON1_IMG from '@/assets/time-icon1.png'
import TIME_ICON2_IMG from '@/assets/time-icon2.png'
import BigNumber from 'bignumber.js'

const AuctionTime = styled.div<{ active: boolean }>`
  width: 28.44rem;
  height: 9.19rem;
  background: ${({ active }) => (active ? `url(${TIME_ICON2_IMG}) no-repeat` : `url(${TIME_ICON1_IMG}) no-repeat`)};
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 3.75rem;
  span {
    width: 6.92rem;
    font-size: 4.38rem;
    text-align: center;
    font-family: 'DIN-Alternate-Bold';
    font-weight: bold;
    color: ${(props) => props.theme.black2};
    line-height: 5.13rem;
    position: absolute;
    top: calc(33% - 2.19rem);
    &:nth-child(1) {
      left: 0;
    }
    &:nth-child(2) {
      left: calc(50% - 3.55rem);
    }
    &:nth-child(3) {
      left: auto;
      right: 0.06rem;
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
          width: calc(6.89rem * 0.8);
          &:nth-child(2) {
            left: calc(50% - 2.756rem);
          }
          &:nth-child(3) {
            left: auto;
          }
        }
      `,
    )}
`

interface IProps {
  timeStamp: any
  returnClick: () => void
  returnClickIsData: () => void
}

const CountDown = (props: IProps) => {
  const { timeStamp, returnClick, returnClickIsData } = props
  const intervalRef = useRef<any>(null)

  const now: any = Math.round(new Date().getTime() / 1000).toString()
  const end: any = timeStamp

  const [leftTime, setLeftTime] = useState(end - now)
  const [h, setHours] = useState<any>('')
  const [m, setMinutes] = useState<any>('')
  const [s, setSeconds] = useState<any>('')

  useEffect(() => {
    setLeftTime(() => {
      let new_now: any = Math.round(new Date().getTime() / 1000).toString()
      let timeStampnumber = new BigNumber(timeStamp).minus(new_now)
      console.log('timeStampnumber', Number(timeStampnumber))
      return Number(timeStampnumber)
    })
  }, [timeStamp])

  useEffect(() => {
    if (leftTime === 0) {
      returnClickIsData()
      returnClick()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftTime])

  useEffect(() => {
    if (leftTime > 0) {
      intervalRef.current = setInterval(() => {
        const newNow: any = Math.round(new Date().getTime() / 1000).toString()

        let newLeftTime = timeStamp - newNow
        setLeftTime(() => newLeftTime)

        let hours = Math.floor(newLeftTime / 60 / 60) < 10 ? `0${Math.floor(newLeftTime / 60 / 60)}` : Math.floor(newLeftTime / 60 / 60)
        let minutes =
          Math.floor((newLeftTime / 60) % 60) < 10 ? `0${Math.floor((newLeftTime / 60) % 60)}` : Math.floor((newLeftTime / 60) % 60)
        let seconds = Math.floor(newLeftTime % 60) < 10 ? `0${Math.floor(newLeftTime % 60)}` : Math.floor(newLeftTime % 60)
        setHours(() => hours)
        setMinutes(() => minutes)
        setSeconds(() => seconds)
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
  }, [leftTime])

  return (
    <>
      {leftTime <= 0 && (
        <AuctionTime active={leftTime < 600}>
          <span>00</span>
          <span>00</span>
          <span>00</span>
        </AuctionTime>
      )}
      {leftTime > 0 && (
        <AuctionTime active={leftTime < 600}>
          <span>{h}</span>
          <span>{m}</span>
          <span>{s}</span>
        </AuctionTime>
      )}
    </>
  )
}

export default CountDown
