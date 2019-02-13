queue()
    .defer(d3.csv, "file.csv")
    .await(makeGraphs);

function makeGraphs(error, data) {
    var lineGraph = dc.lineChart('#chart-here');

    var parseDate = d3.time.format("%d/%m/%Y %H:%M").parse;
        data.forEach(function(d){
            d.date = parseDate(d.date)
        });
    
      var ndx = crossfilter(data);
        var all = ndx.groupAll()
        var ndxDimension = ndx.dimension((d) => d["date"]);
        var ndxtemp1 = ndxDimension.group().reduceSum((d) => d["temp1"]);
        var ndxtemp2 = ndxDimension.group().reduceSum((d) => d["temp2"]);
        var ndxtemp3 = ndxDimension.group().reduceSum((d) => d["temp3"]);
    
    
        var minDate = ndxDimension.bottom(1)[0].date;
        var maxDate = ndxDimension.top(1)[0].date;

    
    lineGraph
        .height(250)
        .width(700)
        .margins({ top: 10, right: 10, bottom: 20, left: 40 })
        .x(d3.time.scale().domain([minDate,maxDate]))
        .yAxisPadding(10)
        .brushOn(false)
        .xAxisLabel("Date")
        .yAxisLabel("Temperature")
        .dimension(ndxDimension)
        .group(ndxtemp);
    lineGraph.render();
}