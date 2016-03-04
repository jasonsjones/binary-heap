/**
 * @fileoverview Implementation of a heap data structure
 * @author Jason S. Jones
 * @version 0.1.0
 * @license MIT
 */
(function() {
    'use strict';

    // Default scoring function.  This function simply returns the value of the element passed in.
    function defaultScoreFn(x) {
        return x;
    }

    /**
     * Creates a new heap instance utilizing scoreFn as the scoring function to determine
     * the correct placement of each element in the heap.  The scoring function will be used to
     * determine if the instance is a min-heap or a max-heap.  If no scoring function is provided,
     * the heap defaults to a min-heap.
     *
     * If the heap in intended to store complex objects, the scoring function will need to define
     * which property of the object will be used to determine the order of the heap.
     *
     * @constructor
     * @param {Function} scoreFn the function used to determine the correct placement of each
     *                       element in the heap.
     */
    function BinaryHeap(scoreFn) {
        this.content = [];
        this.scoreFunction = scoreFn || defaultScoreFn;
    }

    /**
     * Adds an element to the heap. The element will be added to the bottom of the heap, then it
     * will bubble up to its correct position in the heap.  This determination will be based on
     * the scoring function.
     *
     * @param {Object|string|number} element the element to add to the heap
     */
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

    BinaryHeap.prototype.remove = function (node) {
        var length = this.content.length;

        for (var i = 0; i < length; i++) {
            if (this.content[i] !== node) {
                continue;
            }

            var endElement = this.content.pop();

            if (i === length - 1) {
                break;
            }

            this.content[i] = endElement;
            this.bubbleUp(i);
            this.sinkDown(i);
        }
    };

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
