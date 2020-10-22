const { mdLinks } = require('../app.js');
const { validar } = require('../app.js');
//import app from '../app.js' 

/*describe('validar', () => {
  it('deberia ser una funcion', () => {
  expect(typeof validar ). toBe('function');
    });

})
*/

describe('mdLinks', () => {

  it('deberia leer un archivo.md', () => {
   const dir = 'pruebas.md'
   const opcion1 =  false 
   const opcion2 = false 


  return mdLinks(dir, opcion1, opcion2) .then({
  
  string:'C:\Users\USER\Desktop\Proyectos\MD-Link\pruebas.md https://nodejs.org/es/ https://nodejs.org/es/'

    //expect('');
  });

});

it('deberia dar estadisticas', () => {
  const dir = 'pruebas.md'
  const opcion1 =  false
  const opcion2 = true 
 return mdLinks(dir, opcion1, opcion2) .then({
 string: 'total :  1' ,
 string: 'unicos :  1'
   //expect('');
 });
});

it('validar los links', () => {
  const dir = 'pruebas.md'
  const opcion1 =  true
  const opcion2 = false 
 return mdLinks(dir, opcion1, opcion2) .then({
 string:'C:\Users\USER\Desktop\Proyectos\MD-Link\prueorg/es/ true 200 https://nodejs.org/es/'
   //expect('');
 });
});

/*
describe('esto no es un archivo .md', () => {
  it('deberia ser una funcion', () => {
  expect(typeof validar ). toBe('function');
    });
  
  })*/


})