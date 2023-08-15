# 手写Promise

> 通过手写Promise 更深入的了解Promise的执行过程


## 相关代码
:::details const.ts
```typescript
export const PENDING = 'pending';
export const REJECTED = 'rejected';
export const FULFILLED = 'fulfilled';
```
:::

:::details type.ts
```typescript
export type PROMISE_STATUS = 'pending' | 'rejected' | 'fulfilled'

export type Resolve = (data: any) => void;
export type Reject = (data: any) => void
export type Executor = (resolve: Resolve, reject: Reject) => void


export type handleItem = {
    handle: Function | undefined;
    status: PROMISE_STATUS;
    resolve: Resolve;
    reject: Reject;
}

```
:::
:::details index.ts
```typescript
//  手写promise
import runTaskInMacroQueue from '@/utils/microQueue';

// 导入常量声明
import {PENDING, REJECTED, FULFILLED} from "./const";

// 导入类型声明
import type {PROMISE_STATUS, Reject, Resolve, Executor, handleItem} from './type';

import {isPromise} from "@/utils/is";

class EPromise {
    public status: PROMISE_STATUS;
    public value: any;
    private readonly _handleList: handleItem[];

    // 构造函数  执行初始化 状态
    constructor(executor: Executor) {
        this.value = undefined;
        this.status = PENDING;
        this._handleList = [];
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err)
        }
    }


    /**
     * resolve 方法
     * @param data
     */
    _resolve(data: any) {
        this._changeStatus(FULFILLED, data)
    }

    /**
     * reject 方法
     * @param data
     */
    _reject(data: any) {
        this._changeStatus(REJECTED, data)
    }


    /**
     * 改变当前 promise 状态的函数
     * @param status
     * @param value
     */
    _changeStatus(status: PROMISE_STATUS, value: any) {
        if (this.status !== PENDING) {
            //  对于非 pending 状态的 实例 不能再改变 状态
            return
        }

        this.status = status;
        this.value = value
        //   当promise的状态发生改变时 也需要调用 注册的处理函数
        this._callHandle();
    }

    /**
     * 调用then 方法之后 注册处理函数
     * @param handle  处理函数 成功/失败
     * @param status  当前处理函数的 调用状态
     * @param resolve  当前Promise实例的 executor resolve
     * @param reject 当前Promise实例的 executor reject
     */
    _pushHandle(handle: Function | undefined, status: PROMISE_STATUS, resolve: Resolve, reject: Reject) {
        // 首先将 所有的数据封装成一个 object 保存起来
        this._handleList.push({handle, status, resolve, reject})
    }

    /**
     * 根据实际的状态执行一个handle
     * @param handleObj
     */
    _callOneHandle(handleObj: handleItem) {
        // 首先 该函数的执行 需要放在无任务队列中
        runTaskInMacroQueue(() => {
            // 将数据解构出来 是因为 obj.xx 对改变this 指向

            const {handle, status, resolve, reject} = handleObj
            if (this.status !== status) {
                // 当前的状态的处理函数 需要处理的状态不一致
                return
            }
            if (typeof handle !== "function") {
                //    注册的处理函数不是function类型 就意味着找不到相关状态的处理
                //    状态向后传递
                this.status === FULFILLED ? resolve(this.value) : reject(this.value)
                return;
            }

            //    真正执行任务

            try {
                const result = handle(this.value);
                if (isPromise(result)) {
                    // 如果得到的是 promise 那么 当前的 resolve 和 reject 传递下去
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }

            } catch (err) {
                //then 注册的函数 执行过程中出现错误
                reject(err)
            }
        })

    }

    /**
     * 调用该函数 执行后续处理
     */
    _callHandle() {

        if (this.status === PENDING) {
            // 如果当前的状态是PENDING 那就不需要执行后续注册函数
            return
        }

        // 循环遍历  handleList 进行执行
        //  每次执行完之后 需要 删除该处理函数

        while (this._handleList[0]) {
            this._callOneHandle(this._handleList[0])
            //  需要将当前的handle 删除掉
            // 防止 多次注册then 导致 前面注册的函数 多次被调用
            this._handleList.shift();
        }


    }

    /**
     * 实现then实例方法
     * @param onFulfilled
     * @param onReject
     */
    then(onFulfilled: Resolve | undefined, onReject?: Reject) {
        return new EPromise((resolve, reject) => {
            //   注册 后续处理函数  将注册的处理函数保存起来
            // 包括 两种状态的处理函数
            this._pushHandle(onFulfilled, FULFILLED, resolve, reject);
            this._pushHandle(onReject, REJECTED, resolve, reject);
            // 与可能在 调用then方法的时候 状态改变了  这个时候 调用处理函数
            this._callHandle();
        })
    }

    /**
     * 实现catch 实例方法
     * @param onReject
     */
    catch(onReject: Reject) {
        return this.then(undefined, onReject)
    }

    /**
     * 实现 finally 实例方法
     *
     * @param onFinally
     */
    finally(onFinally: Function) {
        return this.then((data) => {
            onFinally();
            return data
        }, (err) => {
            onFinally();
            throw err
        })
    }

    /**
     * 静态方法 直接生成一个 rejected promise
     * @param data
     */
    static reject(data: any) {
        return new EPromise((resolve, reject) => {
            reject(data)
        })
    }

    /**
     * 静态方法 直接生成一个 fulfilled promise
     * resolve 根据传入的data 会有不同的处理方式
     *      1. 如果 data 是 promise （此处用EPromise） 那么直接返回
     *      2. 如果 data 是 promiseLike 那么 返回的 promise 数据 和 状态 与 data 一致
     *      3. 其余 直接resolve(data)
     * @param data
     */
    static resolve(data: any) {
        if (data instanceof EPromise) {
            return data
        }
        return new EPromise((resolve, reject) => {
            if (isPromise(data)) {
                data.then(resolve, reject)
            } else {
                resolve(data)
            }
        })
    }

    /**
     * 实现静态方法 all
     * 将可迭代对象的每一项进行迭代
     *  返回 promise 数据为
     *      如果所有成功 就返回数组
     *      如果有一个失败 就直接返回失败状态
     * @param iterator
     */
    static all(iterator: any) {
        return new EPromise((resolve, reject) => {
            try {
                // 记录所有结果的数据
                const result: any[] = [];
                // 记录当前是第几个迭代数据
                let count = 0;
                //  记录以及 fulfilled 的 promise数量
                let resolvedPromise = 0;
                for (let i of iterator) {
                    // 记录当前的索引 因为count一直在变化
                    const index = count;
                    count++;
                    //    有可能i不是Promise 所以需要使用EPromise.resolve()包装一下
                    EPromise.resolve(i).then((data) => {
                        result[index] = data;
                        if (count === ++resolvedPromise) {
                            // 当前是最后一个promise 被 resolve
                            resolve(result)
                        }
                    }, reject)
                }
                if (count === 0) {
                    //   当前可迭代数据为空  返回空数组
                    resolve(result)
                }
            } catch (err) {
                // 执行过程中 进行了报错
                reject(err)
            }
        })
    }

    /**
     * 返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝
     * @param iterator
     */
    static race(iterator: any) {
        return new EPromise((resolve, reject) => {
            for (let i of  iterator) {
                EPromise.resolve(i).then(resolve, reject)
            }
        })
    }

    /**
     * 返回一个 Promise 实例。当输入的所有 promise 都已敲定时（包括传递空的可迭代类型），返回的 promise 将兑现，
     * 并带有描述每个 promise 结果的对象数组
     * // [
     * //   { status: 'fulfilled', value: ****** },
     * //   { status: 'rejected', reason: Error }
     * // ]
     *
     * @param iterator
     */
    static allSettled(iterator: any){
        const transformP = [];
        //  将所有的 promise 都转换成 fulfilled状态 这样都会得到想要的数据
        for(let p of iterator){
            transformP.push(EPromise.resolve(p).then((value)=>({
                status:FULFILLED,
                value
            }),(reason)=>({
                status:REJECTED,
                reason
            })))
        }
        return EPromise.all(transformP);
    }
}


export default EPromise;
```
:::


