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
};



$( document ).ready(function() {
    D3Heatmap();
});
