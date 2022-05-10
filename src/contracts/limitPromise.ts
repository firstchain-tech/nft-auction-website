/** @format */

/**
 * 封装axios并发请求数
 */
export default class LimitPromise {
  private _max: number
  private _count: number
  private _taskQueue: any[]
  private _waitingTime: number

  constructor(max: number, waitingTime: number) {
    this._max = max || 6
    this._count = 0
    this._taskQueue = []
    this._waitingTime = waitingTime || 5000
  }

  /**
   * 调用器，将异步任务函数和它的参数传入
   * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
   * @param args 异步任务函数的参数列表
   * @returns {Promise<unknown>} 返回一个Promise
   */
  call(caller: (...arg: any[]) => any) {
    return new Promise((resolve, reject) => {
      const task = this._createTask(caller, resolve, reject)
      if (this._count >= this._max) {
        this._taskQueue.push(task)
      } else {
        task()
      }
    })
  }

  /**
   * 创建一个任务
   * @param caller 实际执行的函数
   * @param args 执行函数的参数
   * @param resolve
   * @param reject
   * @returns {Function} 返回一个任务函数
   * @private
   */
  _createTask(caller: (...arg: any[]) => any, resolve: (value: any | PromiseLike<any>) => void, reject: (reason?: any) => void) {
    return () => {
      caller()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          setTimeout(() => {
            this._count--
            if (this._taskQueue.length) {
              const task = this._taskQueue.shift()
              task()
            }
          }, this._waitingTime)
        })
      this._count++
    }
  }
}
