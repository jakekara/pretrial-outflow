/** 
 * Some helper functions for use of graph-scroll d3 plugin
 */

var d3 = require("d3");
const graphScroll = require("graph-scroll");
d3.graphScroll = graphScroll.graphScroll;

/** 
 * scrolly root object; holds array of containers;
 */
var root = function(selection){
    this.__selection = selection;
    this.__containers = [];
    return this;
}

exports.root = root;

/**
 * scrolly.root.add_container -- add a container to a root;
 *    returns: container
 */
root.prototype.add_container = function(){

    var selection = this.__selection.append("div")
	.classed("scrolly-container", true);

    var new_container = new container(selection);
    
    this.__containers.push(new_container);

    return new_container;
}

/**
 * scrolly.root.selection -- return the root selection
 */
root.prototype.selection = function(){
    return this.__selection;
}

/** 
 * scrolly.root.containers -- return containers array
 */
root.prototype.containers = function(){
    return this.__containers;
}

/**
 * scrolly.container -- contains one graph and multiple blocks
 */
var container = function(selection){

    this.__selection = selection;

    this.__graph = this.__selection.append("div")
	.classed("scrolly-graph", true);

    this.blocks = [];
    
    return this;
}

exports.container = container;

/**
 * scrolly.container.setsize -- set the graph to fill the window
 */
container.prototype.resize = function(){
    var small = 600;
    if (window.innerWidth < small){
	var height = window.innerHeight;
	var width = window.innerWidth;
	this.selection
    }
    else {
	var height = window.innerHeight;
	var width = window.innerWidth;
    }

    this.__graph
	.style("height", height + "px")
	.style("width", width + "px");
    // console.log("resizing", window.innerWidth, window.innerHeight);
}

/**
 * scrolly.container.selection -- return the container selection
 */
container.prototype.selection = function(){
    return this.__selection;
}

/** 
 * scrolly.container.graph  -- return the graph selection
 */ 
container.prototype.graph = function(){
    return this.__graph;
}

/**
 * scrolly.container.add_block -- add a new block to the container
 *      returns the block object
 */
container.prototype.add_block = function(){
    var selection = this.__selection.append("div")
	.classed("scrolly-block", true);

    var new_block = new block(selection);

    this.blocks.push(new_block);

    var that = this;
    this.__callback = function(i){
	// console.log("==");
	// that.blocks.forEach(function(b){
	//     console.log(b.callback);
	// });
	that.blocks[i].__callback(i);
	// console.log("--");
    }
    
    return new_block;
}

/** 
 * scrolly.container.callback(f)
 */
container.prototype.callback = function(f){
    if (typeof(f) == "undefined") return this.__callback;
    this.__callback = f;
}

/**
 * scrolly.container.gs -- generate a d3.graphScoll object
 */
container.prototype.gs = function(){

    this.resize();
    var that = this;
    d3.select(window).on("resize." + Math.round(Math.random() * 1000 * 1000),
			 function(){
	that.resize.call(that);
    });

    this.graph().style("z-index", 50);
    
    var sels = this.selection().selectAll("div.scrolly-block")
	.style("z-index",100);
    
    this.gs = d3.graphScroll()
	.container(this.selection())
	.graph(this.graph())
	.sections(this.selection().selectAll("div.scrolly-block"))
	.on('active', this.__callback);

    return this.gs;
}


/** 
 * scrolly.block -- the subsections of a container are "blocks"
 */
var block = function(selection){
    this.__selection = selection;

    var that = this;
    this.__callback = function(i){
	console.log("block " + i + " active.");
    }


    return this;
}


exports.block = block;

/**
 * scrolly.block.callback -- set the function that gets called
 *                           when this block becomes active 
 */
block.prototype.callback = function(f){
    if (typeof(f) == "undefined") return this.__callback;

    this.__callback = f;
    return this;
    
}

/** 
 * scrolly.block.selection -- return the block's selection
 */
block.prototype.selection = function(s){
    if (typeof(s) == "undefined") return this.__selection;
    
    this.__selection = s;
    return this;
}
