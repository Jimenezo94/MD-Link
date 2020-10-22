#!/usr/bin/env node 
const contenido = require('./app.js');
const { mdLinks } = require('./app.js');
//console.log(process.argv)
let h = process.argv 
//console.log(h.length)
//console.log(h[3] + h[4])
//console.log(typeof(process.argv[2]))
//console.log(process.argv)
//console.log(process.argv[2 ])

let revisar = false  //declaran para ser parametros de las funciones --v --s
let medir = false 

if(h.length == 4) {
    if('--validate' == h[3]) {
        revisar = true 
        mdLinks (h[2], revisar, medir).then ((links) => {
            links.forEach(element => {
       console.log(element.file , element.href , element.ok , element.status , element.text)                
            });
        //    console.log(links)
        })
        //console.log('entro a validate')
        //console.log(revisar)

    }   
    else if  ('--stats' == h[3]) {
        medir = true
        mdLinks (h[2], revisar, medir)
    }
       else {console.log ('err')}
    }
    else if (h.length == 5 ) { 
        if('--validate --stats' == h[3] + ' ' + h[4]){ 
        revisar = true
        medir = true
        mdLinks (h[2], revisar, medir) }
    }
else { contenido.mdLinks(h[2], revisar , medir).then (console.log()) ;

}
