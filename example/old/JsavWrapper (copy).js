"use strict";
var VisualizedLinkedList = new function (){
    this.objectConstructor = function (av, linkedListItems, linkedListReferences) {
        this.av = av;
        this.linkedList = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
        this.linkedListItems = linkedListItems;
        this.linkedListReferences = linkedListReferences;
    }
    this.circular = false;
    this.head = null;
    this.tail = null;
    this.circularEdge = null;
    this.createLinkedList = function () {
        for(var j=0; j<this.linkedListItems.length; j+=1)
        {
            this.linkedList.addFirst(this.linkedListItems[j]);
        }
    }
    this.getListItemByReference = function (REF) {
        for (var i = 0; i < linkedListReferences.length; i++)
        {
            if(linkedListReferences[i] == REF)
                return linkedListItems[i];
        }
        return -1;
    }
    this.visualize = function ( ) {

    }
    this.convertToCircularList = function () {
        this.circular = true;
        this.circularEdge = drawCircularArrow(this.linkedList.get(0), this.linkedList.get(2), this.av, this.linkedList.position());
        this.linkedList.last().next(this.linkedList.first());
        var edge = this.linkedList.get(this.linkedListItems.length - 1).edgeToNext();
        edge.hide();
        //window.alert(edge.g.rObj.attrs.path[0]);
        this.circularEdge.show();
    }
}


function visualize(testvisualizerTrace) {
    function indexOf(ref, linkedListElements) {
        for (var i=0; i< linkedListElements.length; i++)
        {
            if(linkedListElements[i].address == ref)
                return i;
        }
    }
    function connection(obj1, obj2, jsav, position) {
    if (obj1 === obj2) { return; }
    var pos1 = obj1.offset() ;
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
    function drawCircularArrow(last, first, av, top)
    {


      var longArrow = connection(first.element, last.element, av, top);
      longArrow.hide();
      return longArrow;
    }
    var av,     // JSAV library object
        arr,    // JSAV array
        pseudo; // pseudocode display
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter,       // get the interpreter
        code = config.code,                   // get the code object
        settings = config.getSettings();      // Settings for the AV
    av = new JSAV($('.avcontainer'));


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
        linkedListElements,
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
    av.displayInit();
    av.step();
    var lineIndex = 1;
    for(i =0, maxi = visualizationTrace.length; i<maxi; i+=1) {
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
            else
                listOfVariableNames.push({variable: variable, REF: null});
        }
        //load heap part
        Heap = traceObject.heap;
        linkedListElements = [];
        for(ref in Heap)
        {
            var value,
                next;
            if(Heap.hasOwnProperty(ref)) {
                value = Heap[ref];
                if (value.constructor === Array) {
                    next = value[2];

                    if (next[1] != null) {
                        linkedListElements.push({address: ref, data: value[3][1], next: next[1][1]});
                    }
                    else {
                        linkedListElements.push({address: ref, data: value[3][1], next: next[1]});
                        notCircular = true;
                    }
                }
            }
        }
        for(j=0, maxj = linkedListElements.length; j<maxj; j+=1)
        {
            linkedList.addFirst(linkedListElements[j].data);
        }
        removed.push(linkedList);
        linkedList.layout();
        if(notCircular == false)
        {
            var e = drawCircularArrow(linkedList.get(0), linkedList.get(2), av, linkedList.position());
            linkedList.last().next(linkedList.first());
            var edge = linkedList.get(linkedListElements.length - 1).edgeToNext();
            edge.hide();
            //window.alert(edge.g.rObj.attrs.path[0]);
            e.show();
        }
        //linkedList.layout({updateTop: false});
        for(j=0, maxj = listOfVariableNames.length; j<maxj; j+=1)
        {
            var indexOfHead = linkedListElements.length - 1- indexOf(listOfVariableNames[j].REF,linkedListElements),
                head = av.pointer(listOfVariableNames[j].variable,
                linkedList.get(indexOfHead), {left:40*j});
            removed.push(head);
        }

        av.step();
    }
    av.recorded();
}
