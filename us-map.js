var D3Heatmap = function(){
     console.log('in function');
     var margin = {top: 50, left: 50, right: 50, bottom:50},
      height = 400 - margin.top - margin.bottom,
      width = 800 - margin.left - margin.right;

      // Creating SVG to Keep Map in
     var svg = d3.select('.c-usMap')
       .append('svg')
       .attr('class', 'mapSVG')
       .attr('height', height + margin.top + margin.bottom)
       .attr('width', width + margin.left + margin.right)
       .append('g')
       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

     var usMap = '/Users/erinblack/Desktop/d3-us-map/us-states.json';
     var usCities = '/Users/erinblack/Desktop/d3-us-map/us-cities.csv';

     var q = d3.queue();
      q.defer(d3.json, usMap)
      q.defer(d3.csv, usCities)
      q.await(analyze);

      var projection = d3.geoAlbersUsa()
          .translate([width / 2, height / 2])
          .scale(500);

      var path = d3.geoPath()
          .projection(projection);

    function analyze(error, usStates, cities){
        console.log('in anlayze with states', usStates);
        console.log('in anlayze with cities', cities);
        var states = topojson.feature(usStates, usStates.objects.states).features;

        // Appending the US States to the DOM
        svg.selectAll('.c-svgHeatmap__state')
            .data(states)
            .enter().append('path')
            .attr('class', 'c-svgHeatmap__state')
            .attr('d', path)

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
    }

};



$( document ).ready(function() {
    D3Heatmap();
});
