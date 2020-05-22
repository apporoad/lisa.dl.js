#! /usr/bin/env node

const path = require('path')
const program = require('commander')
const dl = require('./index')
const uitls = require('lisa.utils')

program.version(require('./package.json').version)
    .usage(' [srcPath] [tgtPath]  path可以为本地路径（本地目录时为工作目录）、可以为远程或本地zip文件，可以是git路径')
    .option('--type <type>', '资源类型，local代表本地路径', 'local', 'zip', 'git')
    .parse(process.argv)

if (program.args.length < 2) {
    console.log('参数必须包含 srcPath 和 tgtPath')
} else {
    var path1 = program.args[0]
    var path2 = path.resolve(process.cwd(), program.args[1])
    var type = program.type
    if (type != 'zip' && type != 'git') {
        type = uitls.endWith(path1, '.zip') ? 'zip' : 'git'
    }
    dl.getRepo(path1, path2, type).then(() => {
        console.log('下载资源成功')
    }).catch(ex =>{
        console.log('下载失败: ' + ex.toString())
    })
}