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

    BinaryHeap.prototype.pop = function () {
        var result = this.content[0];

        var endElement = this.content.pop();

        if (this.content.length > 0) {
            this.content[0] = endElement;
            this.sinkDown(0);
        }

        return result;
    };

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

    BinaryHeap.prototype.sinkDown = function (idx) {
        var length = this.content.length;
        var element = this.content[idx];
        var elementScore = this.scoreFunction(element);

        while (true) {
            var swapIdx = null;
            var leftChildIdx = 2 * idx + 1;
            var rightChildIdx = 2 * idx + 2;
            var leftChildScore;

            if (leftChildIdx < length) {
                var leftChild = this.content[leftChildIdx];
                leftChildScore = this.scoreFunction(leftChild);

                if (leftChildScore < elementScore) {
                    swapIdx = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                var rightChild = this.content[rightChildIdx];
                var rightChildScore = this.scoreFunction(rightChild);

                if (rightChildScore < (swapIdx === null ? elementScore : leftChildScore)) {
                    swapIdx = rightChildIdx;
                }
            }

            if (swapIdx === null) {
                break;
            }

            this.content[idx] = this.content[swapIdx];
            this.content[swapIdx] = element;
            idx = swapIdx;
        }
    };

    module.exports = BinaryHeap;

}());
