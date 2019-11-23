var dl =require('./index')


dl.getRepo('https://github.com/apporoad/lisa.dl.js',__dirname + '/temp','git').then(r=>{
    console.log(r || 'hello')
})

// dl.getRepo('https://github.com/apporoad/aok.js/blob/master/example/example.zip?raw=true',__dirname+'/temp','zip').then(r=>{
//          console.log(r || 'hello')
// })


// dl.getRepo(__dirname+'/example.zip',__dirname+'/temp','zip').then(r=>{
//          console.log(r || 'hello')
// })