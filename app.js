
const fs = require ('fs')
const path = require('path'); 
const marked = require("marked");

module.exports = {
   mdLinks: (ruta) => {
       
       const rutaconvertida = path.resolve(ruta) //path resolve convierte las rutas relativas en absolutas para poder ser leidas
          
        if (path.isAbsolute(rutaconvertida) == true ) { //deberia preguntar si es absoluta o relativa.
            //let extension = rutaconvertida.substring(rutaconvertida.length - 3, rutaconvertida.length)
            //console.log(extension)

            console.log("esta es la linea 14 ",rutaconvertida) //este console comprueba la validación.
            if (path.extname(rutaconvertida) == '.md') {
                fs.readFile(rutaconvertida, 'utf-8',(err,data) => {
                    if (err) {console.log('error:  ', err);//un if solo se compara con true
                }  else {
                    console.log(data);}
                });
                //console.log(extension)
            } else {console.log('No es un archivo .md es un archivo ', path.extname(rutaconvertida))}
   
        }
        else {console.log('ruta aaa')}
            
    }
}