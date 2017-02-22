 d3 = require("d3");
const petri = require("./petri/petri.js").petri;
const scrolly = require("./scrolly/scrolly.js");

// // Build scrolly
var sr = new scrolly.root(d3.select("#container"));
var container1 = sr.add_container();
var firstblock = container1.add_block();
firstblock.selection();

var slides = [];

// Add slides
var add_slides = function(n){
    if (n < 0) return;
    slides.push(container1.add_block());
    // slides[slides.length - 1].selection().html("Slide " + slides.length);
    container1.add_block();
    add_slides(n - 1);
}

add_slides(25);

d3.select("#container").style("opacity",0);

fslides = slides;

var scroll_init = function(){
    window.scrollTo(0,0);
    var bbox = slides[0].selection().node().getBoundingClientRect();
    console.log(bbox);
    window.scrollTo(0, bbox.top);

    
}
scroll_init();

// container1.add_block().selection().html("Here's some more text 3")
// container1.add_block().selection().html("Here's some more text 4");
// container1.add_block().selection().html("Here's some more text 5");
// container1.add_block().selection().html("Here's some more text 6");
container1.gs();

// var petri_container = d3.select("#container").append("div")
//     .style("position","absolute")
//     .style("top","0px")
//     .style("left","0px");

// Add petri

var draw = function (){
    var cbbox = container1.graph().node().getBoundingClientRect();
    
    var width = cbbox.width;
    var height = cbbox.height;
    // var width = window.innerWidth;
    // var height = window.innerHeight;
    
    var p = new petri.dish()
	.data(function(){
	    var ret = [];
	    for (var i = 0; i < 310; i++){
		ret.push({"in":true,"in_color":true,"__radius":5});
	    }
	    return ret;
	}())
	.selection(container1.graph())
	.width(width)
	.height(height)
	.set_fill(function(d){
	    if (typeof(d.in_color) == "undefined" || d.in_color == false)
		return "gold";
	    return "lightskyblue";
	});
    
    p.responsive();
    
    p.simulation()

    return p;
};

p = draw();

var arrange = function(){

    p.rearrange(function(n, i){
	if(n.in == false){
	    return [(window.innerWidth / 3) * 2, window.innerHeight / 2];
	}
	else if (n.in == true){
	    return [(window.innerWidth / 3), window.innerHeight / 2];
	}
	// else if (n.in == null){
	else {
	    return [-1 * window.innerWidth, -1 * window.innerHeight];
	}

    });
};

var color_out = function(out){
    console.log("color_out");
    p.simulation().nodes().forEach(function(n, i){
	if (i < out)
	    n.in_color = false;
	else
	    n.in_color = true;
    });
}

var move_out = function(out){
    color_out(out);
    p.simulation().nodes().forEach(function(n, i){
	if (i < out)
	    n.in = false;
	else
	    n.in = true;
    });
    arrange();
}

slides[0].selection().html("").append("span")
    .html("In 2014, police in Connecticut charged people with offenses 310,000 times. Each blue dot represents 1,000 cases.");
firstblock.callback(function(){
    color_out(0);
    move_out(0);
});

slides[1].selection().html("").append("span").html("Most of the time an officer issued a citation or summons, which don't involve detention.");

slides[1].callback(function(){
    color_out(310-77);
});

slides[2].selection().html("").append("span").html("Those issued a citation or summons are the dots that just turned yellow.");

slides[2].callback(function(){
    move_out(310-77);
});

slides[3].selection().html("").append("span").html("The red dots on the left are the custodial arrests. There were 77,000 of those.");


slides[4].selection().html("").append("span").html("Out of those custodial arrests, defendants were let go on  promises to appear in court in 26,000 cases.");

slides[4].callback(function(){
    color_out(310-77+26);
});

slides[5].callback(function(){
    move_out(310-77+26);
});

slides[6].selection().html("").append("span").html("In another 19,000 cases, a financial bond was set and the defendant posted bond.");

slides[6].callback(function(){
    color_out(310-77+26+18);
})

slides[7].selection().html("").append("span")
    .html("That left 33,000 held on bond set by police departments");

slides[7].callback(function(){
    move_out(310-77+26+18);
});


slides[9].selection().html("").append("span")
    .html("Judicial Branch bail staff reviewed 16,000 of those cases and another 5,000 were let go on a promise to appear.")

slides[9].callback(function(){
    color_out(310-77+26+18+5);
})

slides[10].callback(function(){
    move_out(310-77+26+18+5);
})

slides[11].selection().html("").append("span")
    .html("Another 1,200 were able to post bond after the bail staff review.");

slides[11].callback(function(){
    color_out(310-77+26+18+5+1);
})

slides[12].selection().html("").append("span")
    .html("That left 9,000 held on bail after bail staff review.");

slides[12].callback(function(){
    move_out(310-77+26+18+5+1);
})

slides[13].selection().html("").append("span")
    .html("Now it's time for court...");

slides[14].selection().html("").append("span")
    .html("Courts make bail decisions when a defendant can't post bond even after a bail staff review, or if the bail staff review happened during normal business hours when the court is in session.");

slides[15].selection().html("").append("span")
    .html("In court, cases are thrown out, too.");

slides[15].selection().html("").append("span")
    .html("After the first court appearance, 15,000 defendants were still held on bond.");

slides[15].callback(function(){
    color_out(310 - 15);
});

slides[16].callback(function(){
    move_out(310 - 15);
});

slides[17].selection().html("").append("span")
    .html("But that's not the end.");

slides[18].selection().html("").append("span")
    .html("Defendants held on bond after court go into a state correctional facility.");

slides[19].selection().html("").append("span")
    .html("On the inside, their cases are reviewed again.");

slides[20].selection().html("").append("span")
    .html("After 10,000 of these reviews, 1,700 defendants went into a diversionary program.");

slides[19].callback(function(){
    color_out(310-15 + 2);
});

slides[20].callback(function(){
    move_out(310-15 + 2);
});

slides[22].selection().html("").append("span")
    .html("Another 4,800 were released on bond.");

slides[21].callback(function(){
    color_out(310-15 + 5);
});

slides[22].callback(function(){
    move_out(310 - 15 + 5);
});

slides[24].selection().html("").append("span")
    .html("That left 3,593 held on bond all the way through disposition and/or sentencing.");

slides[24].callback(function(){
    color_out(310 - 4);
});

slides[25].callback(function(){
    move_out(310 - 4);
});

d3.select("#container").transition().duration(1000).style("opacity",1);
// setTimeout(scroll_init,2 * 1000);
// scroll_init();
