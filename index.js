const git = require('simple-git/promise')
const utils = require('lisa.utils')
const download = require('download')
const fs =require('fs')
let { zip, unzip } = require('cross-unzip')
const rimraf = require('rimraf')


exports.getRepo= (src,workspace,type)=>{
    return new Promise((r,j)=>{
        if(fs.existsSync(workspace))
        {
            r('workspace already exists ：' + workspace)
            return
        }
        if(type == 'git'){
            r(git().silent(true).clone(src,workspace,['--depth=1']))
        }else if(type == 'zip'){
            if(utils.startWith(src,'http')){
                r(download(src, process.cwd() + '/dlTemp.zip').then(() => {
                    return new Promise((r1,j1)=>{
                        unzip(process.cwd() + '/dlTemp.zip', workspace, err => {
                            if(err)
                            {
                                j1('something wrong with your zip')
                            }else
                            {
                                r1()
                            }
                          })
                    })
                }).then(()=>{
                    rimraf(process.cwd() + '/dlTemp.zip',()=>{})
                }))
            }else{
                unzip(src, workspace, err => {
                    if(err)
                    {
                        j('something wrong with your zip')
                    }else
                    {
                        r()
                    }
                  })
            }
        }
        else{
            j('type not supported')
        }
    })
}