"use strict";
function drawCircularArrow(last, first, av, top)
{
    var longArrow = connection(first.element, last.element, av, top);
    longArrow.hide();
    return longArrow;
}
function connection(obj1, obj2, jsav, position) {
    if (obj1 === obj2) { return; }
    var pos1 = obj1.offset();
    var pos2 = obj2.offset();
    var fx = pos1.left + obj1.outerWidth()/2.0 ;
    var tx = pos2.left - obj2.outerWidth()/2.0 ;
    var fy = position.top + obj1.outerHeight()/2.0;
    var ty = position.top + obj2.outerHeight();
    var fx1 = fx,
        fy1 = fy,
        tx1 = tx,
        ty1 = ty;
    var disx = ((fx - tx - 22) > 0) ? 1 : ((fx - tx - 22) === 0) ? 0 : -1;
    var disy = ((fy - ty) > 0) ? 1 : ((fy - ty) === 0) ? 0 : -1;

    var dx = Math.max(Math.abs(fx - tx) / 2, 35);
    var dy = Math.max(Math.abs(fy - ty) / 2, 35);

    if ((fy - ty > -25) && (fy - ty < 25) && ((tx - fx < 36) || (tx - fx > 38))) {
        dx = Math.min(Math.abs(fx - tx), 20);
        dy = Math.min(Math.abs(fx - tx) / 3, 50);
        tx += 22;
        ty -= 15;
        fx1 = fx;
        fy1 = fy - dy;
        tx1 = tx - dx;
        ty1 = ty - dy;
    } else if (disx === 1) {
        tx += 22;
        ty += 15 * disy;
        fx1 = fx + dx;
        fy1 = fy - dy * disy;
        tx1 = tx;
        ty1 = ty + dy * disy;
    } else if (disx === -1) {
        fx1 = fx + dx;
        fy1 = fy;
        tx1 = tx - dx;
        ty1 = ty;
    }

    return jsav.g.path(["M", fx, fy, "C", fx1, fy1, tx1, ty1, tx, ty].join(","),
        {"arrow-end": "classic-wide-long", opacity: 0,
            "stroke-width": 2});
}
var VisualizedLinkedList = new function (){
    this.objectConstructor = function (av) {
        this.av = av;
        this.linkedList = av.ds.list({nodegap: 30, top: 40, left: 400});
    };
    this.LinkedListSteps = [];
    this.linkedListItems = [];
    this.linkedListReferences = [];
    this.linkedItemsNext = [];
    this.circular = false;
    this.head = null;
    this.tail = null;
    this.circularEdge = false;
    this.size = function () {
        return this.linkedListItems.length;
    };
    this.createLinkedList = function () {
        //window.alert(this.LinkedListSteps.toSource());
        for(var j=0; j<this.linkedListItems.length; j+=1)
        {
            this.linkedList.addFirst(this.linkedListItems[j]);
        }
        this.layout();
        this.head = this.av.pointer("p", this.linkedList.get(0));
        this.setTailPointer(this.LinkedListSteps[0].pointers);
        this.drawOtherLinks(0);
    };
    this.getListItemIndexByReference = function (REF) {
        for (var i = 0; i < this.linkedListReferences.length; i++)
        {
            if(this.linkedListReferences[i] == REF)
                return i;
        }
        return -1;
    };
    this.moveHead = function(index){
        var i = index;
        if(this.headPointerPositionChanged(i))
        {
            if( this.linkedListItems.length < this.LinkedListSteps[index - 1].listItems.length) {
                var node = this.linkedList.get(this.findHeadPosition(this.LinkedListSteps[i - 1].pointers));
                node.highlight();
                this.av.step();
                this.setHeadPointer(this.LinkedListSteps[i].pointers);
                this.av.step();
                node.hide();
                node.edgeToNext().hide();
            }
            else
                this.setHeadPointer(this.LinkedListSteps[i].pointers);
        }
    };
    this.showEmptyLinkedList = function (index) {
      if(this.LinkedListSteps[index].listItems.length === 0){

          return true;
      }
      else
          return false;
    };
    this.visualize = function ( ) {
        this.av.displayInit();
        var startIteration = 0;
        while(this.showEmptyLinkedList(startIteration)){
            startIteration += 1;
        }
        //window.alert(startIteration);
        this.linkedListItems = this.LinkedListSteps[startIteration].listItems;
        this.linkedListReferences = this.LinkedListSteps[startIteration].refs;
        this.linkedItemsNext = this.LinkedListSteps[startIteration].nexts;
        this.createLinkedList();
        this.setHeadPointer(this.LinkedListSteps[startIteration].pointers);
        this.setTailPointer(this.LinkedListSteps[startIteration].pointers);
        this.av.step();
        for (var i = startIteration+1; i < this.LinkedListSteps.length; i++){
            this.linkedListItems = this.LinkedListSteps[i].listItems;
            this.linkedListReferences = this.LinkedListSteps[i].refs;
            this.linkedItemsNext = this.LinkedListSteps[i].nexts;
            this.insertNewItemsToList(i);
            if(!this.changeListNexts(i))
                this.changeListValues(i);
            this.drawOtherLinks(i);
            this.linkedListReferences = this.LinkedListSteps[i].refs;
            this.moveHead(i);
            this.setTailPointer(this.LinkedListSteps[i].pointers);
            this.checkIfCircularList(i);
            this.changeListNodesOrder(i);
            if(this.circular)
                this.convertToCircularList();
            this.av.step();
        }
        this.av.recorded();
    };
    this.insertNewItemsToList = function(index){
        var currentListItems = this.LinkedListSteps[index].listItems;
        var previousListItems = this.LinkedListSteps[index - 1].listItems;
        if(currentListItems.length > previousListItems.length) //there is new item added to the list
        {
            var newNodeValue = this.linkedListItems[this.linkedListItems.length - 1];
            var newNodeRef = this.linkedListReferences[this.linkedListReferences.length - 1];
            var newNodeNext = this.LinkedListSteps[index].nexts[this.LinkedListSteps[index].nexts.length - 1];
            window.alert(this.linkedItemsNext.indexOf(parseInt(newNodeRef)));
            if(newNodeNext != null || newNodeNext === null && this.linkedItemsNext.indexOf(parseInt(newNodeRef)) >= 0) {//the new node added directly to the list
                if (this.linkedItemsNext.indexOf(parseInt(newNodeRef)) < 0) {//if not found means that this node is in the head
                    this.linkedList.addFirst(newNodeValue);
                }
                else
                    this.linkedList.addLast(newNodeValue);
                this.layout();
            }
            else{//new node added first then linked to the list
                //first we need to look ahead and see it it will be in the head ot the tail of the list
                var newNodeNextInNextStep = this.LinkedListSteps[index + 1].nexts[this.LinkedListSteps[index + 1].nexts.length - 1];
                var pointers = this.LinkedListSteps[index].pointers;
                if(newNodeNextInNextStep == pointers[0].REF) {//points to the head
                    for(var j = 0; j< pointers.length; j++){
                        if(pointers[j].REF == newNodeRef){
                            var p = pointers[j];
                            var newNode = this.linkedList.newNode(newNodeValue);
                            newNode.css({
                                top: 0,
                                left: -80//first
                            });
                            var newLink = this.av.pointer(p.variable, newNode,{anchor:"center bottom", myAnchor:"right top",top:-5, left:-35, arrowAnchor: "center bottom"});
                            newNode.highlight();
                            this.av.step();
                            this.linkedList.addFirst(newNode);
                            this.layout();
                            this.av.step();
                            this.head.target(newNode);
                            this.layout();
                            newNode.unhighlight();
                            newLink.hide();
                        }
                    }
                }
            }
        }
    };
    this.changeListNodesOrder = function (index) {//the same number of nodes but with different nexts
        var currentListItems = this.LinkedListSteps[index].listItems;
        var previousListItems = this.LinkedListSteps[index - 1].listItems;
        if(currentListItems.length === previousListItems.length){
            var currentListNexts = this.LinkedListSteps[index].nexts;
            var previoustListNexts = this.LinkedListSteps[index - 1].nexts;
            var changed = -1;
            for(var j = 0; j< currentListNexts.length; j++){
                if(currentListNexts[j] != previoustListNexts[j]){
                    changed = j;
                    break;
                }
            }
            if(changed === -1)
                return;//no changes
            else{
                if(currentListNexts[changed] === null) {//remove the next arrow
                    var ref = this.LinkedListSteps[index].refs[changed];
                    var index2 = this.size() - 1 - this.getListItemIndexByReference(ref);
                    this.linkedList.get(index2).edgeToNext().hide();
                    //this.layout();
                }
                else if(previoustListNexts[changed] === null){//it was null but now points to a new node
                    var next = currentListNexts[changed];
                    var indexOfNewNext =  this.size() - 1 - this.getListItemIndexByReference(next);
                    var refOfChangedNode = this.LinkedListSteps[index].refs[changed];
                    var indexOfChangedNode = this.size() - 1 - this.getListItemIndexByReference(refOfChangedNode);
                    //this.linkedList.get(indexOfChangedNode).next(this.linkedList.get(indexOfNewNext));
                    var circularEdge = drawCircularArrow(this.linkedList.get(indexOfNewNext), this.linkedList.get(indexOfChangedNode),
                        this.av, this.linkedList.position());
                    circularEdge.show();
                    this.linkedList.get(indexOfChangedNode).next(this.linkedList.get(indexOfNewNext));
                    this.linkedList.get(indexOfChangedNode).edgeToNext().hide();

                    /*var oldNode = this.linkedList.get(index2)
                    this.linkedList.remove(index2);
                    var newNode = this.linkedList.newNode(oldNode.value());
                    newNode.css({
                        top: 0,
                        left: -80//first
                    });
                    this.listOfOtherLinks[0].target(newNode);//for ex 17
                    this.layout();
                    */
                }
                else
                    window.alert("Another Case");
            }
        }
    };
    this.changeListNexts = function(index){
        var currentListOfRefs = this.LinkedListSteps[index].nexts;
        var previousListOfRefs = this.LinkedListSteps[index - 1].nexts;
        var length  = previousListOfRefs.length;
        var chaged = false;
        if(currentListOfRefs.length < previousListOfRefs.length) //there is a delete in nexts
        {
            chaged = true;
            var i = length - 1;
            while (currentListOfRefs.indexOf(previousListOfRefs[i]) >= 0) //found so not this item
                i--;
            //now i - 1 is removed
            i = i - 1;

            var nodeFrom = this.linkedList.get(i-1);
            var nodeTo = this.linkedList.get(i);
            nodeTo.highlight();
            this.av.step();
            var pos1 = nodeFrom.element.offset();
            var pos2 = nodeTo.element.offset();
            var fx = pos1.left + nodeFrom.element.outerWidth()/2.0 ;
            var tx = pos2.left - nodeTo.element.outerWidth()/2.0 ;
            var fy = this.linkedList.position().top + nodeFrom.element.outerHeight();
            var ty = this.linkedList.position().top + nodeTo.element.outerHeight();
            var leftMargin = fx,
                topMargin = fy;
            var dashline = this.av.g.polyline([[leftMargin, topMargin],
                    [leftMargin + 15, topMargin],
                    [leftMargin + 15, topMargin + 45],
                    [leftMargin + 90, topMargin + 45],
                    [leftMargin + 90, topMargin],
                    [leftMargin + 105, topMargin]],
                {"arrow-end": "classic-wide-long",
                    opacity: 0, "stroke-width": 2,
                    "stroke-dasharray": "-"});
            dashline.show();
            nodeFrom.edgeToNext().hide();
            this.av.step();
            nodeTo.unhighlight();
            nodeTo.edgeToNext().hide();
            nodeTo.hide();
            this.av.step();
            dashline.hide();
            this.linkedList.remove(i);
            this.layout();
        }

        return chaged;
    };
    this.checkIfCircularList = function(index){
          var currentListOfRefs = this.LinkedListSteps[index].nexts;
          var circular = true;
          for(var i = 0; i< currentListOfRefs.length; i++){
              if(currentListOfRefs[i] == null) {
                  circular = false;
                  break;
              }
          }
          if(circular)
              this.circular = true;
    };
    this.changeListValues = function (index) {
        if(this.LinkedListSteps[index-1].listItems.length === this.LinkedListSteps[index].listItems.length) {
            var length = this.LinkedListSteps[index - 1].listItems.length;
            for (var i = 0; i < length; i++) {

                var previous = this.LinkedListSteps[index - 1].listItems[i];
                var current = this.LinkedListSteps[index].listItems[i];
                if (previous != current) {
                    this.linkedList.get(length - i - 1).highlight();
                    this.av.step();
                    this.linkedList.get(length - i - 1).value(current);
                    this.linkedList.get(length - i - 1).unhighlight();
                }
            }
        }
    };
    this.convertToCircularList = function () {
        this.circular = true;
        this.circularEdge = drawCircularArrow(this.linkedList.get(0), this.linkedList.get(2), this.av, this.linkedList.position());
        //this.linkedList.last().next(this.linkedList.first());
        //var edge = this.linkedList.get(this.linkedListItems.length - 1).edgeToNext();
        //edge.hide();
        //window.alert(edge.g.rObj.attrs.path[0]);
        this.circularEdge.show();
    };
    this.layout = function () {
        if(!this.circular)
            this.linkedList.layout();
        else
        {
            this.circularEdge.hide();
            this.linkedList.last().next(null);
            this.linkedList.layout()();
            this.linkedList.last().next(this.linkedList.first());
            this.circularEdge.show();
        }
    };
    this.setHeadPointer = function (listOfVariableNames) {

        var index = this.findHeadPosition(listOfVariableNames)

        this.head.target(this.linkedList.get(index));
        //this.head.show();

    };
    this.setTailPointer = function (listOfVariableNames) {
        var index = -1;
        for(var i =0; i< listOfVariableNames.length; i++)
            if(listOfVariableNames[i].variable == "r")
            {
                index = i;
                break;
            }
        if(index == -1)
            return;
        var ref = listOfVariableNames[index].REF;
        var index2 = this.size() - 1 - this.getListItemIndexByReference(ref);
        if(this.tail == null)
            this.tail = this.av.pointer("r", this.linkedList.get(index2),{left:35});
        else
            this.tail.target(this.linkedList.get(index2));
    };
    this.addNewListItems = function (listOfItems) {
        this.LinkedListSteps.push(listOfItems);
        //window.alert(this.LinkedListSteps.toSource());
    };
    this.getIndexOf = function (item) {

    };
    this.headPointerPositionChanged = function(index)
    {
        if(index == 0)
            return false;
        if(this.findHeadPosition(this.LinkedListSteps[index].pointers) !== this.findHeadPosition(this.LinkedListSteps[index - 1].pointers))
            return true;
        else
            return false;
    };
    this.findHeadPosition = function(listOfVariableNames){
        var index = -1;
        //window.alert(listOfVariableNames.toSource());
        for(var i =0; i< listOfVariableNames.length; i++) {
            if (listOfVariableNames[i].variable === "p") {
                index = i;
                //window.alert(index);
                break;
            }
        }
        var ref = listOfVariableNames[index].REF;
        var index2 = this.size() - 1 - this.getListItemIndexByReference(ref);
        //window.alert(index2);
        return index2;
    };
    this.drawOtherLinks = function(index){
        for( var i = 0; i< this.LinkedListSteps[index].pointers.length; i++)
        {
            var link = this.LinkedListSteps[index].pointers[i];
            var position = -1;
            if(link.variable != "p" && link.variable != "r") {
                var ref = link.REF;
                if (ref != null) {
                    var index2 = this.size() - 1 - this.getListItemIndexByReference(ref);
                    var indexOfPointerInListOfLinks = this.listOfOtherLinksNames.indexOf(link.variable);
                    if (indexOfPointerInListOfLinks >= 0) {
                        this.listOfOtherLinks[indexOfPointerInListOfLinks].target(this.linkedList.get(index2));
                    }
                    else {
                        var other;
                        if (this.tail != null)
                            other = this.av.pointer(link.variable, this.linkedList.get(index2), {
                                anchor: "center bottom",
                                myAnchor: "right top",
                                top: -5,
                                left: +35,
                                arrowAnchor: "center bottom"
                            });
                        else
                            other = this.av.pointer(link.variable, this.linkedList.get(index2), {left: 35});
                        this.listOfOtherLinks.push(other);
                        this.listOfOtherLinksNames.push(link.variable);
                    }
                }
            }
        }
    };
    this.listOfOtherLinks = [];
    this.listOfOtherLinksNames = [];
};


function visualize(testvisualizerTrace) {
    function indexOf(ref, linkedListElements) {
        for (var i=0; i< linkedListElements.length; i++)
        {
            if(linkedListElements[i].address == ref)
                return i;
        }
    }


    var av; // pseudocode display
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig();      // Settings for the AV
    av = new JSAV($('.avcontainer'));
    VisualizedLinkedList.objectConstructor(av);

    var removed = [],
        visualizationCode = testvisualizerTrace.code,
        pseudo = av.code(visualizationCode, {top:40, left: 50}),
        visualizationTrace = testvisualizerTrace.trace,
        codeLines = visualizationCode.replace(/(\r\n|\n|\r)/gm, "<br>").split("<br>"),
        traceObject,
        traceStack,
        traceHeap,
        listOfVariableNames,
        Heap,
        leftMargin = 400,
        topMargin = 40,
        linkedList = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin}),
        i,
        j,
        k,
        ref,
        maxi,
        maxk,
        maxj,
        nodeGap = 30,
        notCircular = false;
    var lineIndex = 1;
    for(i =0, maxi = visualizationTrace.length; i<maxi; i+=1) {
        var linkedListItems = [],
            linkedListReferences = [],
            linkedItemsNext = [];

        notCircular = false;
        linkedList = av.ds.list({nodegap: nodeGap, top: topMargin, left: leftMargin});
        while(codeLines[lineIndex-1]=="")
            lineIndex++;
        if(i != 0) {
            pseudo.setCurrentLine(lineIndex++);
        }
        for(k = 0, maxk = removed.length; k<maxk; k+=1)
            removed[k].hide();
        traceObject = visualizationTrace[i];
        traceStack = traceObject.stack_to_render[0];
        traceHeap = traceObject.heap;
        listOfVariableNames=[];
        //load the variables from ordered_varnames to array listOfVariableNames
        for(j = 0, maxj = traceObject.stack_to_render[0].ordered_varnames.length; j<maxj; j+=1){
            var variable = traceObject.stack_to_render[0].ordered_varnames[j];
            if(traceObject.stack_to_render[0].encoded_locals[variable] != null) {
                var REF = traceObject.stack_to_render[0].encoded_locals[variable][1];
                listOfVariableNames.push({variable: variable, REF: REF});


            }
            else {
                listOfVariableNames.push({variable: variable, REF: null});

            }
        }
        //load heap part
        Heap = traceObject.heap;
        for(ref in Heap)
        {
            var value,
                next;
            if(Heap.hasOwnProperty(ref)) {
                value = Heap[ref];
                if (value.constructor === Array && value.length === 4) {
                    //window.alert(value[3][1].toSource());
                    next = value[2];
                    var storedValue;
                    if (value[3][1].constructor === Array) {//The Array contains the data and its type so take the data only
                        storedValue = value[3][1][1];
                    }
                    else {
                        storedValue = value[3][1];
                    }
                    linkedListItems.push(storedValue);
                    linkedListReferences.push(ref);
                    if (next[1] != null) {
                        linkedItemsNext.push(next[1][1]);
                    }
                    else {
                        linkedItemsNext.push(null);
                    }
                }
            }
        }
        var object = {
            listItems : linkedListItems,
            refs: linkedListReferences,
            nexts: linkedItemsNext,
            pointers: listOfVariableNames
        };
        VisualizedLinkedList.addNewListItems(object);
        window.alert(object.toSource());
    }
    //window.alert(VisualizedLinkedList.LinkedListSteps.toSource());
    VisualizedLinkedList.visualize();

}

