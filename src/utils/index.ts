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
