
'use strict';
/**
 * Function that compares this list of nodes with the otherArray
 * @param {*} otherArray 
 */
function comparer(otherArray) {
    return function(current) {
        return otherArray.filter(function(other) {
            return other.getData() === current.getData() && other.getReference() === current.getReference()
                //no compare for the next to enable detecting the deleted nodes only
        }).length == 0;
    }
}

/**
 * function to create a linked list for each trace
 * @param {List} trace the complete trace
 */
function CreateListOfLinkedLists(trace) {
    var linkLists = [];
    for (var i = 0; i < trace.size(); i++)
        linkLists.push(new LinkedList(trace.getTraceHeap(i)));
    return linkLists;
}

/**
 * Code for the main function
 */
function visualize(testVisualizerTrace) {
    //var traces = new TraceList(testVisualizerTrace.trace);
    //var code = new StudentCode(testVisualizerTrace.code);
    //var vis = new Visualization(traces, code);
    testTree();
}

/**
 * class to initialize a linked list node
 */
class TreeNode{
    constructor(passedInData, passedInReference, passedInLeft, passedInRight) {
    this.nodeData = passedInData;
    this.nodeReference = passedInReference;
    this.leftId = passedInLeft;
    this.rightId = passedInRight;
    this.leftNode = null;
    this.rightNode = null;

    }
    /**
     * get the node value
     */
    getData() {
        return this.nodeData;
    }

    setRightNode(value) {
        this.rightNode = value
    }

    setLeftNode(value) {
        this.leftNode = value
    }

    getRightNode() {
        return this.rightNode;
    }

    getLeftNode() {
        return this.leftNode;
    }
    /**
     * set the value of the node
     * @param {Object} value the node value
     */
    setData(value) {
        this.nodeData = value;
    }
    /**
     * get the reference value for the node
     */
    getReference() {
        return this.nodeReference;
    }
    /**
     * set the reference value for the node
     * @param {reference} value the reference value for the node
     */
    setReference(value) {
        this.nodeReference = value;
    }
    /**
     * get the reference for the left child in the tree
     */
    getLeft() {
        return this.leftId;
    }
    /**
     * get the reference for the right child in the tree
     */
    getRight() {
        return this.rightId;
    }
    /**
     * set the reference for the next node in the chain
     * @param {reference} value the reference value for the left child node in the tree
     */
    setLeft(value) {
        this.leftId = value;
    }
    /**
     * set the reference for the next node in the chain
     * @param {reference} value the reference value for the left child node in the tree
     */
    setRight(value) {
        this.rightId = value;
    }
    /**
     * checks if the current node is equal to the other node
     * @param {TreeNode} OtherNode the other node that will be compared to the current node
     */
    equals(OtherNode) {
        return (this.nodeData === OtherNode.nodeData && this.nodeReference === OtherNode.nodeReference &&
            this.leftId === OtherNode.leftId &&
               this.nodeRight === OtherNode.nodeRight);
    }
    /**
     * 
     * Calculats the difference between this linkedlist node and the other linkedlist node
     * @param {TreeNode} OtherNode The other linked list that will be compared with this linked list
     * @param {Hash} diff Hash table
     * @param {Integer} index the node index
     */
    difference(OtherNode, diff, index) {
        var str = null;
        if (this.nodeData !== OtherNode.nodeData)
            str = { nodeIndex: index, data: this.getData(), To: OtherNode.getData() };
        /*if (this.nodeReference !== OtherNode.nodeReference)
            str += '"reference": ' + this.nodeReference + ', "To": ' + OtherNode.nodeReference + '}';*/
        if (this.nodeNext !== OtherNode.nodeNext)
            str = { nodeIndex: index, next: this.getNext(), To: OtherNode.getNext() };
        diff.linkedListForStep.node = JSON.stringify(str);
        return diff;
    }
};

function testTree() {
    const trace = [{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",172],"value":4}},"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"if(root == null)","lineNumber":0},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",172],"value":4}},"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"        if(root.value() == value)","lineNumber":2},{"stack":{"ordered_variable_names":["this"],"encoded_locals":{"this":["REF",172]}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["this"],"encoded_locals":{"this":["REF",172]}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["this","__return__"],"encoded_locals":{"this":["REF",172],"__return__":4}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",172],"value":4}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"        if(root.value() == value)","lineNumber":2},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",13],"value":4}},
    "heap":{"13":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"            return true;","lineNumber":3},{"stack":{"ordered_variable_names":["root","value","__return__"],"encoded_locals":{"root":["REF",13],"value":4,"__return__":true}},
    "heap":{"13":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"            return true;","lineNumber":3},{"stack":{"ordered_variable_names":[],"encoded_locals":{}},
    "heap":{},"code":null,"lineNumber":64},{"stack":{"ordered_variable_names":[],"encoded_locals":{}},
    "heap":{},"code":null,"lineNumber":65},{"stack":{"ordered_variable_names":["__return__"],"encoded_locals":{"__return__":["VOID"]}},
    "heap":{},"code":null,"lineNumber":65}];


/*
    const trace = [{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",172],"value":4}},"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"if(root == null)","lineNumber":0},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",172],"value":4}},"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"        if(root.value() == value)","lineNumber":2},{"stack":{"ordered_variable_names":["this"],"encoded_locals":{"this":["REF",172]}},
"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["this"],"encoded_locals":{"this":["REF",172]}},
"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["this","__return__"],"encoded_locals":{"this":["REF",172],"__return__":4}},
"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",172],"value":4}},
"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"        if(root.value() == value)","lineNumber":2},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",13],"value":4}},
"heap":{"13":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"            return true;","lineNumber":3},{"stack":{"ordered_variable_names":["root","value","__return__"],"encoded_locals":{"root":["REF",13],"value":4,"__return__":true}},
"heap":{"13":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"            return true;","lineNumber":3},{"stack":{"ordered_variable_names":[],"encoded_locals":{}},
"heap":{},"code":null,"lineNumber":64},{"stack":{"ordered_variable_names":[],"encoded_locals":{}},
"heap":{},"code":null,"lineNumber":65},{"stack":{"ordered_variable_names":["__return__"],"encoded_locals":{"__return__":["VOID"]}},
"heap":{},"code":null,"lineNumber":65}];
*/

var roots = null;
var nodes = []; //THIS IS GONNA HAVE TREE BUILDING TIME OF 3N ISH
var nodeIDs = [];
var count = 0;
var first = true;

var jsav = new JSAV("container");
var bt = jsav.ds.binarytree();

for (var step in trace) {
    
    for (var key in trace[step].heap) {

        
        var data = trace[step].heap[key][2][1];
        var leftRef = trace[step].heap[key][3][1];
        var rightRef = trace[step].heap[key][4][1];
        if (leftRef != null) {
            leftRef = leftRef[1];
        }
        if (rightRef != null) {
            rightRef = rightRef[1];
        }

        if (nodeIDs.includes(key)) {
            let node = nodes.find(node => node.nodeReference == key);
            node.setLeft(leftRef);
            node.setRight(rightRef);
            node.setData(data);
        }
        else {
            let treeNode = new TreeNode(data, key, leftRef , rightRef);
            nodes.push(treeNode);
            nodeIDs.push(key);
            if (first) {
                roots = treeNode;
                first = false;
            }
        }
        
    }

    //connecting nodes with real pointers
    for(let node of nodes) {
        var leftNum = node.getLeft();
        var rightNum = node.getRight();
        if (leftNum == null && rightNum == null) {
            continue; //dont look for pointers if both child nodes should be null
        }
        for (let nodeTwo of nodes) {
            if (leftNum != null && nodeTwo.getReference() == leftNum) {
                node.setLeftNode(nodeTwo);
            }
            if (rightNum != null && nodeTwo.getReference() == rightNum) {
                node.setRightNode(nodeTwo);
            }
        }
    }
    bt.root(roots.getData());
    
    recursiveJsavVisualize(roots, bt.root());
    bt.layout();
    jsav.step();
}

jsav.recorded(); // done recording changes, will rewind


console.log(roots)

}

function recursiveJsavVisualize(node, btnode) {
    var leftNum = node.getLeft();
    var rightNum = node.getRight();
 if (leftNum != null) {
    var newBtNode = btnode.left(node.getLeftNode().getData());
    recursiveJsavVisualize(node.getLeftNode(), newBtNode);
 }
 if (rightNum != null) {
     var newBtNode = btnode.right(node.getRightNode().getData());
     recursiveJsavVisualize(node.getRightNode(), newBtNode);
 }
 return;
}