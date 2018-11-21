# [event-emitter](https://github.com/careteenL/event-emitter)
[![](https://img.shields.io/badge/Powered%20by-eventEmitter-brightgreen.svg)](https://github.com/careteenL/eventEmitter)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/careteenL/eventEmitter/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/careteenL/eventEmitter.svg?branch=master)](https://travis-ci.org/careteenL/eventEmitter)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/@careteen/event-emitter)
[![NPM downloads](http://img.shields.io/npm/dm/@careteen/event-emitter.svg?style=flat-square)](http://www.npmtrends.com/@careteen/event-emitter)

[English Document](./README.en_US.md)

全局通用发布-订阅模式。可支持：

- 1、先发布(or触发事件)后订阅(or注册事件)
- 2、新增命名空间 

## 快速使用

```shell
npm i -D @careteen/event-emitter
```

```js
import EventEmitter from '@careteen/event-emitter'

EventEmitter.on('click', function (data) {
  console.log('_default:' + data)
})
EventEmitter.emit('click', 'careteen')
EventEmitter.emit('click', 'lanlan')
// 输出 -> careteen  & lanlan
```
更详细使用请查看[API](./doc/api.md)

## 兼容性

IE9+

## 使用文档

- [API](./doc/api.md)
- [对该库的源码解析](xxx)

## issue模板

- [Issue Template](./ISSUETEMPLATE.md)

## 贡献者及指南

clone仓库并引入依赖
```shell
git clone git@github.com:careteenL/event-emitter.git
npm install
```
开始开发：）

...

请编写单元测试覆盖所加功能
```shell
npm run test
```
启动本地服务器编写示例
```shell
npm run example
```
修改`package.json README.md CHANGELOG.md`版本号，再发布
```shell
npm run release
```

- [Contributors](https://github.com/careteenL/event-emitter/graphs/contributors)

## 更新日志

- [Changelog](./CHANGELOG.md)

## 计划

- [Todo](./TODO.md)