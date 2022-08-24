console.log('buenas tardes, soy productos desde handlebars');

let carrito = 0;
let compra = 0;
let producto = 100;


function comprarProducto() {
carrito++;
return carrito;
}


function totalCompra() {
  compra =+ producto;  
  return compra;
  }

// 1 - 100
console.log('los productos son' + comprarProducto());
console.log('tu pago total es de: ' + totalCompra() + 'pesos.');

let total = comprarProducto()
producto = 1000;

let pago = totalCompra()
// 2 - 1100

console.log('los productos son' + total);
console.log('tu pago total es de: ' + pago + 'pesos.');

