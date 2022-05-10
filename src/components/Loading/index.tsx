import React, { memo } from 'react'
import styled from 'styled-components'

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 1;
  left: 0;
  span {
    margin-left: 0.63rem;
    font-size: 1.13rem;
    font-weight: 600;
  }
  .ant-spin {
    position: absolute;
    display: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 0.88rem;
    font-variant: tabular-nums;
    line-height: 1.5;
    text-align: center;
    list-style: none;
    opacity: 0;
    -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    transition: -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86), -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
  }

  .ant-spin-spinning {
    position: static;
    display: inline-block;
    opacity: 1;
  }

  .ant-spin-dot {
    position: relative;
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1.25rem;
  }

  .ant-spin-dot-item {
    position: absolute;
    display: block;
    width: 0.81rem;
    height: 0.81rem;
    background-color: ${({ theme }) => theme.themeColor};
    border-radius: 100%;
    -webkit-transform: scale(0.75);
    -ms-transform: scale(0.75);
    transform: scale(0.75);
    -webkit-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    opacity: 0.3;
    -webkit-animation: antspinmove 1s infinite linear alternate;
    animation: antSpinMove 1s infinite linear alternate;
  }

  .ant-spin-dot-item:nth-child(1) {
    top: 0;
    left: 0;
  }

  .ant-spin-dot-item:nth-child(2) {
    top: 0;
    right: 0;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .ant-spin-dot-item:nth-child(3) {
    right: 0;
    bottom: 0;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }

  .ant-spin-dot-item:nth-child(4) {
    bottom: 0;
    left: 0;
    -webkit-animation-delay: 1.2s;
    animation-delay: 1.2s;
  }

  .ant-spin-dot-spin {
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: antrotate 1.2s infinite linear;
    animation: antRotate 1.2s infinite linear;
  }

  .ant-spin-lg .ant-spin-dot {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1.5rem;
  }

  .ant-spin-lg .ant-spin-dot i {
    width: 0.63rem;
    height: 0.63rem;
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .ant-spin-blur {
      background: #fff;
      opacity: 0.5;
    }
  }

  @-webkit-keyframes antSpinMove {
    to {
      opacity: 1;
    }
  }

  @keyframes antSpinMove {
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes antRotate {
    to {
      -webkit-transform: rotate(405deg);
      transform: rotate(405deg);
    }
  }

  @keyframes antRotate {
    to {
      -webkit-transform: rotate(405deg);
      transform: rotate(405deg);
    }
  }
`
interface PropsType {
  title?: string
}

export default memo(function LoadingPage(props: PropsType) {
  return (
    <LoadingWrapper>
      <div className="ant-spin ant-spin-lg ant-spin-spinning">
        <span className="ant-spin-dot ant-spin-dot-spin">
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
        </span>
      </div>
      <div className="loading-wrapper"></div>
      <span style={{ color: '#858a89' }}>{props.title ? props.title : 'Loading...'}</span>
    </LoadingWrapper>
  )
})
