const git = require('simple-git/promise')
const utils = require('lisa.utils')
const dl = require('retriable-download');
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
                var tempFile=null
                r(dl(src, 3).then((filename) => {
                    return new Promise((r1,j1)=>{
                        //console.log('sdfsdfsdf')
                        //console.log(filename)
                        tempFile = filename
                        unzip(filename, workspace, err => {
                            if(err)
                            {
                                j1(err)
                            }else
                            {
                                r1()
                            }
                          })
                        })
                    //console.log('saved to', filename);
                    }).then(()=>{
                        rimraf(tempFile,()=>{})
                    })
                )
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