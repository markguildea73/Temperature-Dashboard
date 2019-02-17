    queue()
        .defer(d3.csv, "file.csv")
        .await(makeGraphs);
        
    function makeGraphs(error, data) {
        var ndx = crossfilter(data);
        var parseDate = d3.time.format("%d/%m/%Y %H:%M").parse;
        data.forEach(function(d){
            d.date = parseDate(d.date);
        });
       
        var date_dim = ndx.dimension(dc.pluck('date'));
        var minDate = date_dim.bottom(1)[0].date;
        var maxDate = date_dim.top(1)[0].date;
        
        
        var temp1Data = date_dim.group().reduceSum(dc.pluck("temp1"));
        var temp2Data = date_dim.group().reduceSum(dc.pluck("temp2"));
        var temp3Data = date_dim.group().reduceSum(dc.pluck("temp3"));
        var compositeChart = dc.compositeChart('#chart-here');
        
        compositeChart
            .width(450)
            .height(200)
            .dimension(date_dim)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .yAxisLabel("Temperature")
            .xAxisLabel("Date")
            .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
            .renderHorizontalGridLines(true)
            .elasticX(false)
            .yAxisPadding(5)
            .compose([
                dc.lineChart(compositeChart)
                    .colors('green')
                    .group(temp1Data, "temp1"),
                dc.lineChart(compositeChart)
                    .colors('red')
                    .group(temp2Data, "temp2"),
                dc.lineChart(compositeChart)
                    .colors('blue')
                    .group(temp3Data, "temp3"),
            ])
            .brushOn(false)
            .render()
        
        var temp_dim = ndx.dimension(function (d) {
            return [d.date, d.temp1];
            })
            
            var temp_group = temp_dim.group();
            var temp_chart = dc.scatterPlot("#plot-here");
            
            temp_chart
                .width(450)
                .height(200)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .yAxisLabel("Temperature")
                .xAxisLabel("Date")
                .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
                .renderHorizontalGridLines(true)
                .brushOn(false)
                .symbolSize(2)
                .clipPadding(10)
                .dimension(temp_dim)
                .group(temp_group, "Temp3")
                
                dc.renderAll()
        }
            