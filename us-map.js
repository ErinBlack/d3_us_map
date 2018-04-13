var usCities = '/Users/erinblack/Desktop/d3-us-map/us-cities.csv';
var usMap = '/Users/erinblack/Desktop/d3-us-map/us-states.json';

var D3Heatmap = function(){
     var q = d3.queue();
      q.defer(d3.json, usMap)
      q.defer(d3.csv, usCities)
      q.await(analyze);
    function analyze(error, usStates, cities){
        appendSelect(error, usStates, cities);
    }
};

var appendSelect = function(error, usStates, cities){
    var select = d3.select('.c-svgHeatmap__selectSection')
        .append('select')
        .attr('class', 'c-svgHeatmap__dropdown')
        .on('change', onchange);

    var options = select
        .selectAll('option')
        .data(cities).enter()
        .append('option')
        .text(function(d){
            return d.city;
        });
    appendMap(error, usStates, cities);
};

var appendMap = function(error, usStates, cities){
    console.log('in append map');
    var margin = {top: 50, left: 50, right: 50, bottom:50},
     height = 400 - margin.top - margin.bottom,
     width = 800 - margin.left - margin.right;
     var projection = d3.geoAlbersUsa()
         .translate([width / 2, height / 2])
         .scale(700);

     var path = d3.geoPath()
         .projection(projection);
    // Creating SVG to Keep Map in
   var svg = d3.select('.c-svgHeatmap__mapSection')
     .append('svg')
     .attr('class', '.c-svgHeatmap__mapSVG')
     .attr('height', height + margin.top + margin.bottom)
     .attr('width', width + margin.left + margin.right)
     .append('g')
     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    var states = topojson.feature(usStates, usStates.objects.states).features;
    console.log('in appendMap');
    // Appending the US States to the DOM
    svg.selectAll('.c-svgHeatmap__state')
        .data(states)
        .enter().append('path')
        .attr('class', 'c-svgHeatmap__state')
        .attr('d', path);

    // Appending Cities to DOM
    svg.selectAll('.c-svgHeatmap__city')
        .data(cities)
        .enter().append('circle')
        .attr('class', 'c-svgHeatmap__city')
        .attr('r', 2)
        .attr('cx', function(d){
            var coords = projection([d.lng, d.lat]);
            return coords[0];
        })
        .attr('cy', function(d){
            var coords = projection([d.lng, d.lat]);
            return coords[1];
        })

    svg.selectAll('.c-svgHeatmap__cityLabel')
        .data(cities)
        .enter().append('text')
        .attr('class', 'c-svgHeatmap__cityLabel')
        .attr('x', function(d){
            var coords = projection([d.lng, d.lat]);
            return coords[0];
        })
        .attr('y', function(d){
            var coords = projection([d.lng, d.lat]);
            return coords[1];
        })
        .text(function(d){
            return d.city;
        })
        .attr('dx', 5)
        .attr('dy', 4)
        }



$( document ).ready(function() {
    D3Heatmap();
});
