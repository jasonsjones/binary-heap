var expect = require('chai').expect;
var Heap = require('../');

describe('Heap data structure', function () {
    it('instantiates an empty heap', function () {
        var heap = new Heap();
        expect(heap.content).to.be.an.Array;
        expect(heap.size()).to.eql(0);
    });

    it('pushes items onto the heap in the correct order', function () {
        var heap = new Heap();
        heap.push(12);
        heap.push(18);
        heap.push(5);
        heap.push(2);

        expect(heap.size()).to.eql(4);
        expect(heap.content[0]).to.eql(2);
    });
});
