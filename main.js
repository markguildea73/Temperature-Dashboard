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
        var ndxDimension = ndx.dimension((d) => d["date"]);
        var ndxtemp1 = ndxDimension.group().reduceSum((d) => d["temp1"]);
        var ndxtemp2 = ndxDimension.group().reduceSum((d) => d["temp2"]);
        var ndxtemp3 = ndxDimension.group().reduceSum((d) => d["temp3"]);


        var minDate = ndxDimension.bottom(1)[0].date;
        var maxDate = ndxDimension.top(1)[0].date;


    lineGraph
        .height(250)
        .width(700)
        .margins({ top: 10, right: 10, bottom: 60, left: 40 })
        .x(d3.time.scale().domain([minDate,maxDate]))
        .elasticX(false)
        .yAxisPadding(5)
        .brushOn(false)
        .xAxisLabel("Date")
        .yAxisLabel("Temperature")
        .dimension(ndxDimension)
        .group(ndxtemp3);
    lineGraph.render();
} 

// new attempts at solution 
// Review lessons on composite charts CodeInstitute
// //try one
// queue()
//     .defer(d3.csv, "file.csv")
//     .await(makeGraphs);

// function makeGraphs(error, data) {
//     var lineGraph = dc.compositeChart('#chart-here');

//     var parseDate = d3.time.format("%d/%m/%Y %H:%M").parse;
//         data.forEach(function(d){
//             d.date = parseDate(d.date)
//         });
    
//       var ndx = crossfilter(data);
//         var ndxDimension = ndx.dimension((d) => d["date"]);
//         var ndxtemp1 = ndxDimension.group().reduceSum((d) => d["temp1"]);
//         var ndxtemp2 = ndxDimension.group().reduceSum((d) => d["temp2"]);
//         var ndxtemp3 = ndxDimension.group().reduceSum((d) => d["temp3"]);
       
//         var minDate = ndxDimension.bottom(1)[0].date;
//         var maxDate = ndxDimension.top(1)[0].date;

//     compositeChart
//         .height(250)
//         .width(700)
//         .margins({ top: 10, right: 10, bottom: 20, left: 40 })
//         .x(d3.time.scale().domain([minDate,maxDate]))
//         .yAxisPadding(10)
//         .brushOn(false)
//         .xAxisLabel("Date")
//         .yAxisLabel("Temperature")
//         .dimension(ndxDimension)
//             .compose([
//                 dc.lineChart(compositeChart)
//                 .group(ndxtemp1),
//                 dc.lineChart(compositeChart)
//                 .group(ndxtemp2),
//                 dc.lineChart(compositeChart)
//                 .group(ndxtemp3),
//             ])
//             .render();
//         compositeChart.renderAll();
        // used dc.renderAll(); no use
    

// removed this from orignal 
//         .group(ndxtemp1),
 
//     lineGraph.render();
// }

//Try 2
// queue()
//     .defer(d3.csv, "file.csv")
//     .await(makeGraphs);

// function makeGraphs(error, data) {


//     var parseDate = d3.time.format("%d/%m/%Y %H:%M").parse;
//         data.forEach(function(d){
//             d.date = parseDate(d.date);
//         });
//         var minDate = ndxDimension.bottom(1)[0].date;
//         var maxDate = ndxDimension.top(1)[0].date;
    
//         var ndx = crossfilter(data);
        
//         var ndxDimension = ndx.dimensionndx.dimension((d) => d["date"]);
        
//         var ndxtemp1 = ndxDimension.group().reduceSum((d) => d["temp1"]);
            
//         var ndxtemp2 = ndxDimension.group().reduceSum((d) => d["temp2"]);
            
//         var ndxtemp3 = ndxDimension.group().reduceSum((d) => d["temp3"]);
            
//         var compositeChart = dc.compositeChart('#chart-here');

//         compositeChart
//             .height(250)
//             .width(700)
//             .margins({ top: 10, right: 10, bottom: 20, left: 40 })
//             .x(d3.time.scale().domain([minDate,maxDate]))
//             .yAxisPadding(10)
//             .brushOn(false)
//             .xAxisLabel("Date")
//             .yAxisLabel("Temperature")
//             .dimension(ndxDimension)
//             .compose([
//                 dc.lineChart(compositeChart)
//                 .group(ndxtemp1),
//                 dc.lineChart(compositeChart)
//                 .group(ndxtemp2),
//                 dc.lineChart(compositeChart)
//                 .group(ndxtemp3),
//             ])
//             .render();
//         dc.renderAll();
//     }

//try three



    // queue()
    //     .defer(d3.csv, "file.csv")
    //     .await(makeGraphs);
    // function makeGraphs(error, data) {
    //     var ndx = crossfilter(data);
    //     var parseDate = d3.time.format("%d/%m/%Y").parse;
    //     data.forEach(function(d){
    //         d.date = parseDate(d.date);
    //     });
    //     var date_dim = ndx.dimension(dc.pluck('date'));
    //     var minDate = date_dim.bottom(1)[0].date;
    //     var maxDate = date_dim.top(1)[0].date;
        
    //     //dont know if tis is even a thing, no peer code to look up
    //     function temperature_logger_data(temp1,temp2,temp3) {
    //         return function(d) {
    //             if (d.temp1 === "temp1" ) {
    //                 return +d.temp1;
    //             } if(d.temp2 === "temp2" ) {
    //                 return +d.temp2;
    //             } if (d.temp1 === "temp3") {
    //                 return +d.temp1;
    //             } else {
    //                 return 0;
    //             }
    //         };
    //     }
    //     var temp1Data = date_dim.group().reduceSum(temperature_logger_data('temp1'));
    //     var temp2Data = date_dim.group().reduceSum(temperature_logger_data('temp2'));
    //     var temp3Data = date_dim.group().reduceSum(temperature_logger_data('temp3'));
    //     var compositeChart = dc.compositeChart('#composite-chart');
        
    //     compositeChart
    //         .width(990)
    //         .height(200)
    //         .dimension(date_dim)
    //         .x(d3.time.scale().domain([minDate, maxDate]))
    //         .yAxisLabel("Spend")
    //         .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    //         .renderHorizontalGridLines(true)
    //         .compose([
    //             dc.lineChart(compositeChart)
    //                 .colors('green')
    //                 .group(temp1Data),
    //             dc.lineChart(compositeChart)
    //                 .colors('red')
    //                 .group(temp2Data),
    //             dc.lineChart(compositeChart)
    //                 .colors('blue')
    //                 .group(temp3Data),
    //         ])
    //         .brushOn(false)
    //         .render();
    //     dc.renderAll();
    // }