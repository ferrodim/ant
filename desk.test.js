const Desk = require('./desk');

test('Basics', ()=>{
    let desk = new Desk('8/8/8/8/8/4k3/1r6/4K3 b - - 0 10');
    desk.move('b2', 'b1');
    expect(desk.toFEN()).toBe('8/8/8/8/8/4k3/8/1r2K3 w - - 1 11');
});