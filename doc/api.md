# 文档

## 目录

- [描述](#描述)
- 语法
  - [create](#create)
  - [on](#on)
  - [one](#one)
  - [emit](#emit)
  - [remove](#remove)

- [示例](#示例)
  - [先订阅后发布的简单调用](#先订阅后发布的简单调用)
  - [先发布后订阅的简单调用](#先发布后订阅的简单调用)
  - [使用命名空间简单调用](#使用命名空间简单调用)
  - [先发布后订阅读取最新一次发布数据](#先发布后订阅读取最新一次发布数据)      

## 描述

全局通用发布-订阅模式。可支持：

- 1、先发布(or触发事件)后订阅(or注册事件)
- 2、新增命名空间 

## create

创建命名空间

### 参数

- `{String} namespace` 默认值为 _default

### 返回值

- `{EventEmitter}` 返回一个有`on/one/emit/remove`的对象

## on

注册事件

### 参数

- `{String} key` 事件名
- `{Function} fn` 事件函数
- `{String} last` 先调用后注册场景下，注册时只会读取最新一次注册事件 携带的参数

### 返回值

- 无

## one

单例

### 参数

- `{String} key` 事件名
- `{Function} fn` 事件函数
- `{String} last` 先调用后注册场景下，注册时只会读取最新一次注册事件 携带的参数

### 返回值

- 无

## emit

触发事件

### 参数

- `{String} key` 事件名
- `{Arguments} args` 触发时带的参数

### 返回值

- 无

## remove

移除某个事件的某个或所有注册函数

### 参数

- `{String} key` 某个事件
- `{Function} fn` 传则移除某个事件，否则移除所有事件

### 返回值

- 无

### 示例

#### 先订阅后发布的简单调用

先订阅后发布的简单调用
```js
import EventEmitter from '@careteen/eventEmitter'

console.log('先订阅后发布：')
EventEmitter.on('click', function (data) {
  console.log('_default:' + data)
})
EventEmitter.emit('click', 'careteen')
EventEmitter.emit('click', 'lanlan')
// 输出 -> careteen  & lanlan
```

#### 先发布后订阅的简单调用

先发布后订阅的简单调用
```js
import EventEmitter from '@careteen/eventEmitter'

// 先发布后订阅
console.log('先发布后订阅：')
EventEmitter.emit('click', 'careteen')
EventEmitter.emit('click', 'lanlan')
EventEmitter.on('click', function (data) {
  console.log('_default:' + data)
})
// 输出 -> careteen  & lanlan
```

#### 使用命名空间简单调用

使用命名空间简单调用
```js
import EventEmitter from '@careteen/eventEmitter'

console.log('使用命名空间：')
EventEmitter.create('nameOne').on('click', function (data) {
  console.log('nameOne:' + data) // lanlan
})
EventEmitter.create('nameOne').emit('click', 'lanlan')

EventEmitter.create('nameTwo').on('click', function (data) {
  console.log('nameTwo:' + data) // high
})
EventEmitter.create('nameTwo').emit('click', 'high')
```

#### 先发布后订阅读取最新一次发布数据

先发布后订阅 传last时，订阅只会读取最新一次发布的数据
```js
import EventEmitter from '@careteen/eventEmitter'

// 先发布后订阅 传last时，订阅只会读取最新一次发布的数据
console.log('先发布后订阅 传last时，订阅只会读取最新一次发布的数据：')
EventEmitter.create('nameThree').emit('tap', 'letme')
EventEmitter.create('nameThree').emit('tap', 'mlxg')

EventEmitter.create('nameThree').on('tap', function (data) {
  console.log('data is:' + data)
}, 'last')
// 输出 -> data is: mlxg
```