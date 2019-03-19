/**
 * class to represent a trace heap element
 */
class TraceHeap{
    /**
     * class constructor
     * @param {reference} key the reference value of the current heap element
     * @param {List} value the list of values of the current heap element
     */
    constructor(key, value) {
    this.reference = key;
    this.value = null;
    if (value[1] === "Link") { //link class value
        this.value = new LinkClassValue(value[2], value[3]);
    } else if (value[1] == "Tree") {
        this.value = new TreeClassValue(value[2], value[3]); //I THINK THIS VALUE[2] AND 3 THING IS FROM THE TRACE BUT I DONT KNOW WHAT THOSE ARE YET CAUSE NO TRACE :'(
    } else { //new classes not implemented yet
        window.alert("Other Classes"); //THIS IS WHERE CAPSTONE GROUP WILL ADD IN VALUE[1] == "TREE" OPTION
    }
}
}