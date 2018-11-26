//----------------------------
// Barchart idiom
//----------------------------

function barChartInit() {
    // var margin = {
    //     top: 0,
    //     right: 0,
    //     bottom: 20,
    //     left: 34
    // };

    var barChartType = "province";

    d3.selectAll("#province")
        .on("click", function() {
        barChartType = "province"
        console.log("province tab clicked")
        updateBarchart()
    });

    d3.selectAll("#gender")
        .on("click", function() {
        barChartType = "gender"
        console.log("gender tab clicked")
        updateBarchart()
    });

    d3.selectAll("#status")
        .on("click", function() {
        barChartType = "status"
        console.log("status tab clicked")
        updateBarchart()
    });

    width = (windowWidth / 2) - margin.left - margin.right,
    height = (windowHeight / 2) - margin.top - margin.bottom;

    var xScale = d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.03);

    var yScale = d3
        .scaleLinear()
        .range([height, 0]);

    var xAxis = d3
        .axisBottom(xScale);

    var yAxis = d3
        .axisLeft(yScale);

    var barChartSVG = d3
        .select("#bar_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("style", "margin: 0 auto; display: block;  border: 3px solid black;")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //----------------------------
    // Draw barchart
    //----------------------------

    updateBarchart = function () {
      
        d3.json(`data/${barChartType}.json`).then(function (data) {

            var dataCurrentDate = data[currentDate]
            console.log(dataCurrentDate)

            var min = Infinity, max = -Infinity, x;
            for(x in dataCurrentDate) {
                if( dataCurrentDate[x].quantity < min) min = dataCurrentDate[x].quantity;
                if( dataCurrentDate[x].quantity > max) max = dataCurrentDate[x].quantity;
            };

            xScale.domain(dataCurrentDate.map(function (d) {
            
                return d[barChartType];
            }));

            // yScale.domain([0, d3.max(dataCurrentDate, function (d) {
            //     return d.quantity;
            // })]);
            yScale.domain([0, max])

            if (currentDate === "2013-01") {
                barChartSVG
                    .selectAll("rect")
                    .remove()

                barChartSVG
                    .attr("class", "bar")
                    .selectAll(".bar")
                    .data(dataCurrentDate)
                    .enter()
                    .append("rect")
                    .attr("fill", "darkblue")
                    .attr("x", function (d) {
                        // barChartType cannot be used here?
                        return xScale(d[barChartType]);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("y", function (d) {
                        return yScale(d.quantity);
                    })
                    .attr("height", function (d) {
                        return height - yScale(d.quantity);
                    })

                barChartSVG.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (height) + ")")
                    .call(xAxis)
                    .selectAll("text");

                barChartSVG.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6).attr("dy", ".71em")
                    
            } else {
                console.log(currentDate)

                barChartSVG
                    // .attr("class", "bar")
                    .selectAll("rect")
                    // .data(dataCurrentDate)
                    // .enter()
                    // .append("rect")
                    .remove()
                // .exit()
                // .data(dataCurrentDate)

                barChartSVG
                    .attr("class", "bar")
                    .selectAll(".bar")
                    .data(dataCurrentDate)
                    .enter()
                    .append("rect")
                    .attr("fill", "darkblue")
                    .attr("x", function (d) {
                        // barChartType cannot be used here?
                        return xScale(d[barChartType]);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("y", function (d) {
                        return yScale(d.quantity);
                    })
                    .attr("height", function (d) {
                        return height - yScale(d.quantity);
                    })

                console.log('1das', );

                // bars
                //     .enter()
                //     .append("rect")
                //     .attr("x", function (d) {
                //         // barChartType cannot be used here?
                //         return xScale(d.province);
                //     })
                //     .attr("width", xScale.bandwidth())
                //     .attr("y", function (d) {
                //         return yScale(d.quantity);
                //     })
                //     .attr("height", function (d) {
                //         return height - yScale(d.quantity);
                //     });

            }

        });

    }

    updateBarchart()

}