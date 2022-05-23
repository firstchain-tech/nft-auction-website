import type { AuctionListType } from '@/common/data.d'
/** address interception */
export const formatStrAddress = (a: number, b: number, str: string) =>
  str.substring(0, a) + new Array(4).join('.') + str.substring(str.length - b, str.length)

/** scroll throttle */
export const throttle = (fn: Function, rateTime: number) => {
  let timer: any = null
  return (...args: any[]) => {
    if (!timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, rateTime)
  }
}

/** Anti-Shake Search */
export const debounced = (fn: any, debTime: number) => {
  let timer: any = null
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, debTime)
  }
}

/** Anchor */
export const scrollToAnchor = (anchorName: string) => {
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName)
    if (anchorElement) anchorElement.scrollIntoView()
  }
}

/** Validation retains 6 decimal places */
export const validateValue = (value: any) => {
  let rs = /^[0-9]+(\.[0-9]{1,6})?$/
  if (!rs.test(value)) return false
  else return true
}

export const Adapth5 = 768
export const AdaptFontSize = 992

/** 接口地址前缀 */
export const baseURL = '/api'

/** The array of cartype objects has tokenid de duplication */
export const objArrayDuplicateRemoval = (oldArr: AuctionListType[]) => {
  let obj: { [key: string]: boolean } = {}
  let arr_new: AuctionListType[] = oldArr.reduce<AuctionListType[]>((cur: any, next: any) => {
    if (!obj[next.tokenId]) {
      cur.push(next)
      obj[next.tokenId] = true
    }
    return cur
  }, [])

  return arr_new
}

export const objArrayDuplicateRemovalHash = (oldArr: AuctionListType[]) => {
  let obj: { [key: string]: boolean } = {}
  let arr_new: AuctionListType[] = oldArr.reduce<AuctionListType[]>((cur: any, next: any) => {
    if (!obj[next.collectibleHash]) {
      cur.push(next)
      obj[next.collectibleHash] = true
    }
    return cur
  }, [])

  return arr_new
}

export const formatMsgTime = (timespan: any) => {
  var result
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  // var halfamonth = day * 15;
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - timespan * 1000
  if (diffValue < 0) {
    return
  }
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if (monthC >= 1) {
    if (monthC <= 12) result = '' + Math.round(monthC) + ' month ago'
    else {
      result = '' + Math.round(monthC / 12) + ' years ago'
    }
  } else if (weekC >= 1) {
    result = '' + Math.round(weekC) + ' week ago'
  } else if (dayC >= 1) {
    result = '' + Math.round(dayC) + ' days ago'
  } else if (hourC >= 1) {
    result = '' + Math.round(hourC) + ' hours ago'
  } else if (minC >= 1) {
    result = '' + Math.round(minC) + ' minutes ago'
  } else {
    result = 'just'
  }
  return result
}
