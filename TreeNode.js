/**
    class to initialize tree node
*/
class TreeNode {
    /**
     * constructor
     * @param {Object} nodeData data
     * @param {reference} nodeReference reference value to the pointer
     * @param {reference} nodeLeft left child
     * @param {reference} nodeRight right child
     */
    constructor(data, reference, left, right) {
        this.nodeData = data
        this.nodeReference = reference
        this.nodeLeft = left
        this.nodeRight = right

    }
    /**
     * GETTER METHODS
     */
    //get the data of the node
    getData() {
        return nodeData
    }
    //left
    getLeft() {
        return nodeLeft
    }
    //right
    getRight() {
        return nodeRight
    }
    //reference
    getReference() {
        return nodeReference
    }
    /**
     * SETTER METHODS
     */
    
    /**
     * 
     * @param {Object} value 
     */
    setData(value) {
        this.nodeData = value
    }
    /**
     * 
     * @param {reference} value 
     */
    setLeft(value) {
        this.nodeLeft = value
    }
    /**
     * 
     * @param {reference} value 
     */
    setRight(value) {
        this.nodeRight = value
    }
    //reference
    setReference(value) {
        this.nodeReference = value
    }
    /**
     * 
     * @param {TreeNode} other 
     */
    equals(other) {
        return (this.nodeData == other.nodeData && this.nodeReference == other.nodeReference 
            && this.nodeLeft == other.nodeLeft && this.nodeRight == other.nodeRight)
    }
    /**
     * 
     * @param {TreeNode} other 
     * @param {Hash} diff 
     * @param {Integer} index 
     */
    difference(other, diff, index) {
        var str = null
        if (this.nodeData !== other.nodeData) {
            str = {nodeIndex: index, data: this.getData(), To: other.getData() }
        }
        //might need to change the word next to left and right
        if (this.nodeLeft !== other.nodeLeft) {
            str = {nodeIndex: index, next: this.getLeft(), To: other.getLeft()}
        }
        if (this.nodeRight !== other.nodeRight) {
            str = {nodeIndex: index, next: this.getRight(), To: other.getRight()}
        }
        //diff.
    }

}