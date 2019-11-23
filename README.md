# lisa.dl.js
downloads 

## how to use
```bash
npm i --save lisa.dl
```
```js

var dl =require('lisa.dl')

// get git
dl.getRepo('https://github.com/apporoad/lisa.dl.js',__dirname + '/temp','git').then(r=>{
    console.log(r || 'hello')
})

//get zip of remote
dl.getRepo('https://github.com/apporoad/aok.js/blob/master/example/example.zip?raw=true',__dirname+'/temp','zip').then(r=>{
         console.log(r || 'hello')
})

// get local zip
dl.getRepo(__dirname+'/example.zip',__dirname+'/temp','zip').then(r=>{
         console.log(r || 'hello')
})

```