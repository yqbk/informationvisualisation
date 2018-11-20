function barChartInit() {
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };

    var padding = 30;

    w = 960 - margin.left - margin.right,
        h = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y-%m");


    var barChartType = "province"


    // Load the data
    d3.json(`data/${barChartType}.json`).then(function (data) {


        currentDate = "2017-03"

        console.log(data[currentDate])

        var tempdata = data[currentDate]

        // console.log(data[0].provinceDeathcount)

        // const dataForGivenMonth = data[currentDate]

        // console.log(data[0].provinceDeathcount)
        // data.forEach(function (d) {
        //     d.date = parseTime(d.date);

        // })
        // var tempdata = []
        // for (var property in data[0].provinceDeathcount) {
        //     var obj = {
        //         "province": property,
        //         "quantity": data[0].provinceDeathcount[property]
        //     }
        //     tempdata.push(obj)
        // }
        // console.log(tempdata)


        // // var svg = d3.select("#bar_chart")
        // //     .append("svg")
        // //     .attr("width", w + margin.left + margin.right)
        // //     .attr("height", h + margin.top + margin.bottom)
        // //     .attr("transform",
        // //         "translate(" + margin.left + "," + margin.top + ")");

        var svg = d3.select("body").append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleBand().rangeRound([0, w]).padding(0.03);

        var yScale = d3.scaleLinear()
            .range([h, 0]);

        var xAxis = d3.axisBottom(xScale);


        var yAxis = d3.axisLeft(yScale);

        xScale.domain(tempdata.map(function (d) {
            return d.province;
        }));
        yScale.domain([0, d3.max(tempdata, function (d) {
            return d.quantity;
        })]);

        svg.append("g")
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis);

        var yAxis_g = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6).attr("dy", ".71em")
        //.style("text-anchor", "end").text("Number of Applicatons"); 

        svg.selectAll(".bar")
            .data(tempdata)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return xScale(d.province);
            })
            .attr("width", xScale.bandwidth())


            // HERE
            .attr("y", function (d) {
                return yScale(d.quantity);
            })



            .attr("height", function (d) {
                return h - yScale(d.quantity);
            });

        // HERE

        //svg.selectAll("rect")
        //  .data(tempdata)
        //.enter().append("rect")
        //.attr("fill", "darkblue")
        //.attr("y", (tempdata) => yScale(tempdata.quantity))
        //.attr("x", (tempdata) => xScale(tempdata.province))
        //.attr("width", xScale.bandwidth())
        //.attr("height", (tempdata) => h - yScale(tempdata.quantity));
    });
}