var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

var diameter = 960;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 150])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select(".viscontainer").append("svg")
    .attr("width", diameter)
    .attr("height", diameter - 100)
	.style("cursor", "default")
  	.append("g")
    	.attr("transform", "translate(" + (diameter - 80) / 2 + "," + (diameter - 120) / 2 + ")");

d3.json("sabinbev_en.json", function(error, root) {
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", function(d) { return "node " + d.company; })
      .attr("id", function(d) { return d.img; })
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
      .attr("r", 4);

  node.append("text")
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .text(function(d) { return d.name; })
      .on("mouseover", function(d) {
	  		if (d.company == "SABMiller" || d.company == "ABInBev") {
				 d3.selectAll(".SABMiller text, .ABInBev text").style("opacity", 0.5);
				 var hoveredsel = '#' + d.img ;
				 var logotohide = '#logo' + d.company;
				 d3.select(logotohide).style("opacity", 0.2);

				 d3.select(hoveredsel + ' circle').attr("r", 7);
				 d3.select(hoveredsel + ' text').style("font-size", "14px").style("opacity", 1);
				 div.transition()        
					.duration(200)      
					.style("opacity", .95);      
				 div.html("<img src='http://multimedia.tijd.be/sabinbev/img/" + d.img + ".png' width='100' />")  
					.style("left", "400px")     
					.style("top", "220px");    
            }
  		})                
       .on("mouseout", function(d) {
	  		d3.selectAll(".SABMiller text, .ABInBev text").style("opacity", 1);
	  		var hoveredsel = '#' + d.img ;
	  	 	d3.select(hoveredsel + ' circle').attr("r", 4);
	  	 	d3.select(hoveredsel + ' text').style("font-size", "10px");
	  	  	var logotohide = '#logo' + d.company;
	  	 	d3.select(logotohide).style("opacity", 1);
            div.transition()        
                .duration(500)      
                .style("opacity", 0);
			});
	
	d3.select("svg").append("svg:image")
		.attr("x", 60)
		.attr("y", 20)
		.attr("height", 50)
		.attr("width", 75)
		.attr("id", "logoABInBev")
		.attr("xlink:href", "http://multimedia.tijd.be/sabinbev/sabmiller.svg");
	d3.select("svg").append("svg:image")
		.attr("x", 690)
		.attr("y", 0)
		.attr("height", 80)
		.attr("width", 160)
		.attr("id", "logoSABMiller")
		.attr("xlink:href", "http://multimedia.tijd.be/sabinbev/abinbev.png");
});