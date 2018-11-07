/**
 * @desc 一键替换仓库名
 *      只需修改 `newName` 为自己的仓库名即可
 */ 
require('shelljs/global')

// todo replace
let oldName = 'jslib-cli'

let replaceReg = new RegExp(`${oldName}`, 'g')

// todo replace
let newName = 'eventEmitter'

// todo add : 待替换的文件
let fileMap = [
  `${__dirname}/package.json`,
  `${__dirname}/README.md`,
  `${__dirname}/README.en_US.md`
]

console.log('[Rename] start replace')

fileMap.forEach(file => {
  console.log(`[Scan] ${file}`)
  sed('-i', replaceReg, `${newName}`, `${file}`)
})

console.log('[Rename] success')
