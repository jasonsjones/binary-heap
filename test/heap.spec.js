var expect = require('chai').expect;
var Heap = require('../');

describe('Heap data structure', function () {

    var heap = null;

    beforeEach(function () {
        heap = new Heap();
    });

    it('instantiates an empty heap', function () {
        expect(heap.content).to.be.an.Array;
        expect(heap.size()).to.eql(0);
    });

    it('pushes items onto the heap', function () {
        heap.push(12);
        heap.push(18);
        heap.push(5);
        heap.push(2);

        expect(heap.size()).to.eql(4);
    });

    it('pushes items onto the heap in the correct order', function () {
        heap.push(12);
        heap.push(18);
        heap.push(5);
        heap.push(2);

        expect(heap.size()).to.eql(4);
        expect(heap.content[0]).to.eql(2);
    });

    it('pops the min element (by default) from the heap', function () {
        heap.push(12);
        heap.push(18);
        heap.push(5);
        heap.push(2);
        heap.push(20);
        heap.push(15);
        heap.push(8);

        expect(heap.size()).to.eql(7);
        expect(heap.pop()).to.eql(2);
        expect(heap.size()).to.eql(6);
        expect(heap.content[0]).to.eql(5);
    });

    it('removes an element from the heap', function () {
        heap.push(12);
        heap.push(18);
        heap.push(5);
        heap.push(2);
        heap.push(20);
        heap.push(15);
        heap.push(8);

        heap.remove(12);

        expect(heap.size()).to.eql(6);
        expect(heap.content[0]).to.eql(2);

        heap.remove(18);
        expect(heap.size()).to.eql(5);
    });
});
