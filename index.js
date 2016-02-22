(function() {
    'use strict';

    function defaultScoreFn(x) {
        return x;
    }

    function BinaryHeap(scoreFn) {
        this.content = [];
        this.scoreFunction = scoreFn || defaultScoreFn;
    }

    BinaryHeap.prototype.push = function (element) {
        this.content.push(element);
        this.bubbleUp(this.content.length - 1);
    };

    // BinaryHeap.prototype.pop = function () {
    // };

    // BinaryHeap.prototype.remove = function (node) {
    // };

    BinaryHeap.prototype.size = function () {
        return this.content.length;
    };

    BinaryHeap.prototype.bubbleUp = function (idx) {
        var element = this.content[idx];
        var score = this.scoreFunction(element);

        while (idx > 0) {
            var parentIdx = Math.floor((idx - 1) / 2);
            var parent = this.content[parentIdx];

            // if the parent has a "better" score, the heap is in order and we are done
            if (score >= this.scoreFunction(parent)) {
                break;
            }

            // swap the parent with the currrent element, the one that was just added
            this.content[parentIdx] = element;
            this.content[idx] = parent;

            // update idx to the parent's index for the next iteration.  This keeps the
            // current element "bubbling" up to the correct position.
            idx = parentIdx;
        }
    };

    // BinaryHeap.prototype.sinkDown = function (idx) {
    // };

    module.exports = BinaryHeap;

}());
