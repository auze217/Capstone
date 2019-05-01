
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
    this.isRoot = false; 

    }
    /**
     * get the node value
     */
    getData() {
        return this.nodeData;
    }

    getIsRoot() {
        return this.isRoot;
    }

    setIsRoot(value) {
        this.isRoot = value;
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

function testTree(tracePassed) {


    const trace = [{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{
    "root":["REF",172],"value":4}},"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",
    ["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",
    ["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],
    "175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",
    ["elem",8],["left",null],["right",null]]},"code":"if(root == null)","lineNumber":0},{
    "stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",172],"value":4}}
    ,"heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"        if(root.value() == value)","lineNumber":2},{"stack":{"ordered_variable_names":["this"],"encoded_locals":{"this":["REF",172]}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["this"],"encoded_locals":{"this":["REF",172]}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["this","__return__"],"encoded_locals":{"this":["REF",172],"__return__":4}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":null,"lineNumber":12},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",174],"value":4}},
    "heap":{"172":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"        if(root.value() == value)","lineNumber":2},{"stack":{"ordered_variable_names":["root","value"],"encoded_locals":{"root":["REF",13],"value":4}},
    "heap":{"13":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"            return true;","lineNumber":3},{"stack":{"ordered_variable_names":["root","value","__return__"],"encoded_locals":{"root":["REF",13],"value":4,"__return__":true}},
    "heap":{"13":["INSTANCE","BinNode",["elem",4],["left",["REF",173]],["right",["REF",175]]],"173":["INSTANCE","BinNode",["elem",1],["left",["REF",174]],["right",null]],"174":["INSTANCE","BinNode",["elem",3],["left",null],["right",null]],"175":["INSTANCE","BinNode",["elem",2],["left",null],["right",["REF",176]]],"176":["INSTANCE","BinNode",["elem",8],["left",null],["right",null]]},"code":"            return true;","lineNumber":3},{"stack":{"ordered_variable_names":[],"encoded_locals":{}},
    "heap":{},"code":null,"lineNumber":64},{"stack":{"ordered_variable_names":[],"encoded_locals":{}},
    "heap":{},"code":null,"lineNumber":65},{"stack":{"ordered_variable_names":["__return__"],"encoded_locals":{"__return__":["VOID"]}},
    "heap":{},"code":null,"lineNumber":65}];


/*
    FOR IMPLEMENTING INTO SERVER AND PASSSING IN TRACE UNCOMMENT THIS LINE AND DELETE TRACE VARIABLE ABOVE
    const trace = tracePassed;
*/

/*
  Roots holds the root node of the whole tree
  nodes contains all the nodes that were made to iterate through to create pointers
  the nodeIDs is to check if a node has already been created
  the first is to only run the making of the tree and root node one time
*/
var roots = null;
var nodes = []; 
var nodeIDs = [];
var first = true;

/*
  These variables are used throughout the code, the jsav, bt, and pointer are all objects that are used for visualizing
  the rootPointerID is to check 1) if the root changes and 2) to determine which node the pointer should point to
  the firstPointer is just a boolean to make sure a jsav code snippet only runs the first time
  the valueChanged is a checker that is reset every new stack so that there is not a new step if nothing has changed
*/
var jsav = new JSAV("container");
var bt = jsav.ds.binarytree({left: 270, top: 50});
var pointer = null;
var rootPointerID = null;
var firstPointer = true;
var valueChanged = false; 

for (var step in trace) { //this for loop going through each heap / tree
    valueChanged = false;

    if (trace[step].stack.encoded_locals.root != null) { //this checks if a root node has been established and checks if the pointer should change later
        if (rootPointerID != trace[step].stack.encoded_locals.root[1]) {
            rootPointerID = trace[step].stack.encoded_locals.root[1]
            valueChanged = true;
        }
    }
    

    for (var key in trace[step].heap) { //this for loop goes through each node in a single heap / tree
        var data = trace[step].heap[key][2][1]; //this grabs all the data for a single node and notes is there are any changes to the tree to add a jsav step
        var leftRef = trace[step].heap[key][3][1];
        var rightRef = trace[step].heap[key][4][1];
        if (leftRef != null) {
            leftRef = leftRef[1];
        }
        if (rightRef != null) {
            rightRef = rightRef[1];
        }

        if (nodeIDs.includes(key)) { //this is if the node already exists
            let node = nodes.find(node => node.nodeReference == key);
            if (node.getLeft() != leftRef) {
                node.setLeft(leftRef);
                valueChanged = true;
            }
            if (node.getRight() != rightRef) {
                node.setRight(rightRef);
                valueChanged = true;
            }
            if (node.getData() != data) {
                node.setData(data);
                valueChanged = true;
            }
            
        }
        else { //this is if it is a new node and adds it to the array of nodes
            let treeNode = new TreeNode(data, key, leftRef , rightRef);
            nodes.push(treeNode);
            nodeIDs.push(key);
            if (first) {
                roots = treeNode;
                first = false;
            }
            valueChanged = true;
        }
        
    }

    //connecting nodes with real pointers
    for(let node of nodes) {
        var leftNum = node.getLeft();
        var rightNum = node.getRight();
        if (node.getReference() == rootPointerID) {
            node.setIsRoot(true);
        }
        else {
            node.setIsRoot(false);
        }
        if (leftNum == null && rightNum == null) {
            continue; //skips looking for pointers if both child are should be null
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
    
    if (firstPointer) { //this is making the jsav tree but only the first time
        firstPointer = false;
        bt.root(roots.getData());
        bt.layout();
        pointer = jsav.pointer("Root", bt.root(), {top: -20, arrowAnchor: "center top"});
    }
    if (valueChanged) { //given something has changed on this iteration this adds a jsav step and visualizes it recurssively 
        recursiveJsavVisualize(roots, bt.root(), jsav, pointer);
        bt.layout();
    
        jsav.step();
    }
    
}

jsav.recorded(); // done recording changes, will rewind
}

function recursiveJsavVisualize(node, btnode, jsav, pointer) { //this method creates the jsav tree recurssively and also sets the pointer to the correct node
    var leftNum = node.getLeft();
    var rightNum = node.getRight();
    if (node.getIsRoot() == true) {
        pointer.target(btnode);
    }
 if (leftNum != null) {
    var newBtNode = btnode.left(node.getLeftNode().getData());
    recursiveJsavVisualize(node.getLeftNode(), newBtNode, jsav, pointer);
 }
 if (rightNum != null) {
     var newBtNode = btnode.right(node.getRightNode().getData());
     recursiveJsavVisualize(node.getRightNode(), newBtNode, jsav, pointer);
 }
 return;
}