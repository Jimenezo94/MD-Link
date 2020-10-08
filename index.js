#!/usr/bin/env node 
const contenido = require('./app.js');
let h = process.argv[2]
//console.log(h)
//console.log(typeof(process.argv[2]))
/*console.log(process.argv)*/
//console.log(process.argv[2 ])
contenido.mdLinks(h);