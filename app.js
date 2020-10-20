
const fs = require ('fs')
const path = require('path'); 
const marked = require("marked");
const axios = require('axios');
const { set } = require('lodash');
/*const validar = (links) =>{  
    //return (resolve)=> {}
    let nuevoArr=[]
    let c=0
    links.forEach(element => {
        
        axios.get(element.href)
    .then(response => { 
       console.log(links[c].file +" "+ links[c].href +" ok "+ response.status + " "+links[c].text)
        
        //nuevoArr.push({element:element}
            /*file = element.file;
            href = element.href;
            
            //text = element.text; //objeto con los values que nos vamos a traer
        
            c+=1
            resolve(links);
            
    })
    .catch(e => {
        // Capturamos los errores
    })
    })
    
    }*/
const validar = (links) =>{ 
//return (resolve)=> {}
return new Promise((resolve) => {
    const promiseArray = [];
    links.forEach((link) => {
        promiseArray.push(new Promise(resolve => {
            axios.get(link.href).then(response => {
                link.status = response.status;
                link.ok = true;
                resolve();
            }).catch(error => {
                let status = 500; 
                if (error.response) {
                    status = error.response.status;
                }
                if (error.request) {
                    status = 503; 
                }
                link.status = status;
                link.ok = false;
                resolve();
            });
        }));
    });

    //se resuelven todas las promesas al tiempo
    Promise.all(promiseArray).then(() => {
        console.log()
        resolve(links);
    })
});
}

const statsP = (links,roto) =>  {
    
    console.log ('total : ' ,links.length)
    let set = new Set( links.map( JSON.stringify ) ) //linea que manipula los arrays con set
    let Arrayunicos = Array.from( set ).map( JSON.parse ); // nos devuelve el JSON con los arrays unicos
   // console.log(links)
console.log( 'unicos : ' ,Arrayunicos.length );
if (roto == true ){
    
    let Arr = []
    links.forEach(iterador => {
        if (iterador.ok == false) {
            Arr.push(iterador.ok) 
        } 
    })

    console.log('rotos : ' , Arr.length)
    
}

//console.log(links)

}
module.exports = {
         
   mdLinks : (ruta, op1, op2) => {
       
       const rutaconvertida = path.resolve(ruta)
       //console.log(rutaconvertida) //path resolve convierte las rutas relativas en absolutas para poder ser leidas
          
       /* if (path.isAbsolute(rutaconvertida) == true ) { //deberia preguntar si es absoluta o relativa.
            //let extension = rutaconvertida.substring(rutaconvertida.length - 3, rutaconvertida.length)
            //.log(extension)*/

        return new Promise(function(resolve,reject){ //np es retorno de funcion md-link
            const links = [];
            function walkTokens(token) {// verifica el tipo de token, que en este caso es un link, y luego se incluyen links de tipo http para que los tome y tambien los de tipo https
                if (token.type === 'link' && token.href.includes('http')) {
                    links.push({
                        href: token.href,
                        text: token.text, //objeto con los values que nos vamos a traer
                        file: rutaconvertida
                    });
                }

            };
            if (path.extname(rutaconvertida) == '.md') {
                fs.readFile(rutaconvertida, 'utf-8',(err,data) => {
                //console.log(data)
                marked(data, {walkTokens})//
            if (op1 == true && op2==false){
                validar(links).then(() => {
                    resolve(links);
                });                    //console.log(links)
                    
                    //resolve(links)
                } 
           if (op2 == true  && op1==false){
                    resolve (statsP(links ))
                }
            if(op1  == false && op2 == false) {
                    
                links.forEach(let = cadenas => 
                    { //console.log('elemento cadena de indice', cont ,  ' informacion:', cadenas )
                    console.log(cadenas.file , cadenas.href, cadenas.text)})
                                  
                    resolve(links)
            }
           if  (op1 == true && op2==true){
                validar(links).then(()=>{

                    resolve(links) 
                    //console.log(links)
                 statsP(links, true)
                })
           }

            });

            } 
            else {
                reject ('No es un archivo .md')}
        })
        //else {.log('ruta aa a')}
            
    }
}