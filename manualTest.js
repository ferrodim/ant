const Desk = require('./desk');

let a = new Desk('8/8/8/8/8/4k3/1r6/4K3 b - - 0 10');

//a.setPiece('b1', 'r');
//a.removePiece('b2');

a.move('b2', 'b1');

console.log(a.drawAscii());

console.log(a.toFEN());