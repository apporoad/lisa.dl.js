const git = require('simple-git/promise')
const utils = require('lisa.utils')
const dl = require('retriable-download');
const fs =require('fs')
const rimraf = require('rimraf')
const unzip = require('unzip')

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

                        var streaming =fs.createReadStream(filename)
                        streaming.on('error',err=>{j1(err)})
                        streaming.on('end',()=>{
                                r1()
                            })
                        //console.log(filename)
                        //console.log(workspace)
                        streaming.pipe(unzip.Extract({ path: workspace }))
                        })
                    //console.log('saved to', filename);
                    }).then(()=>{
                        rimraf(tempFile,()=>{})
                    })
                )
            }else{
                var streaming =fs.createReadStream(src)
                streaming.on('error',err=>{j(err)})
                streaming.on('end',()=>{
                        r()
                    })
                streaming.pipe(unzip.Extract({ path: workspace }))
            }
        }
        else{
            j('type not supported')
        }
    })
}