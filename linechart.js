document.addEventListener('DOMContentLoaded', function() {
    lineChart();
})


function lineChart(){

    var plotData = [];

    generateRandomDta();

    this.margin = {top: 10, right: 30, bottom: 30, left: 60},
        this.width = 460 - margin.left - margin.right,
        this.height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(".lineChart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    this.parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S%Z');

    // Add X axis --> it is a date format
    this.xAxis = d3.scaleTime()
        .domain(d3.extent(plotData, function(d) { return d.date; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(this.xAxis));

    // Add Y axis
    this.yAxis = d3.scaleLinear()
        .domain([0, d3.max(plotData, function(d) { return +d.value; })])
        .range([ height, 0 ]);
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(this.yAxis));

    // Add the line
    this.dataLine = d3.line()
        .x(function(d) { return this.xAxis(d.date) })
        .y(function(d) { return this.yAxis(d.value) })
    svg.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", this.dataLine(plotData))

    // Add dynamic data
    addDynamicData();

    function generateRandomDta() {
        var initialDate = new Date(2017, 0, 1);
        for (let i = 0; i < 100; i++) {
            plotData.push({
                date: new Date(initialDate.getTime() + (30*i) * 60 * 1000),
                value: Math.random() * 100
            });   
        }
        console.log(plotData);
    }

    function addDynamicData(){
        setInterval(function (){
            var lastDate = plotData[plotData.length - 1].date;
            plotData.shift();
            plotData.push({
                date: new Date(lastDate.getTime() + 30 * 60 * 1000),
                value: Math.random() * 100
            });
            updateLine();
        },1000)
    }

    function updateLine(){
        d3.selectAll(".dot").remove();

        var data = plotData;

        var svg = d3.select(".lineChart").transition();

        this.xAxis.domain(d3.extent(plotData, function(d) { return d.date; }))
        this.yAxis.domain([0, d3.max(data, function(d) { return +d.value; })]);

                // Make the changes
        svg.select(".line") // change the line
                .duration(750)
                .attr("d", this.dataLine(data));
        svg.select(".x.axis") // change the x axis
                .duration(750)
                .transition()
                .call(d3.axisBottom(this.xAxis));
        svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(this.yAxis);


    }

}


