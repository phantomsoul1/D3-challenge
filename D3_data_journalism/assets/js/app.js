// @TODO: YOUR CODE HERE!

function bodyLoaded() {
    console.log("bodyLoaded");

    // set dimensions and margins of the graph
    var scatterDiv = d3.select("#scatter");
    console.log(scatterDiv.offsetWidth);

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    

    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("preserveAspectRatio", "xMidyMid meet")
        .attr("viewBox", '0 0 800 600')
        // .attr("width", "100%") //width + margin.left + margin.right)
        // .attr("height", 3 * Number(window.innerWidth) / 4) //height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              `translate(${margin.left}, ${margin.top})`);

    // read the data
    d3.csv("assets/data/data.csv").then(data => {

        var poverty = data.map(d => Number(d.poverty));
        var healthcare = data.map(d => Number(d.healthcare));

        console.log(svg.clientWidth);
        console.log(svg.clientHeight);
        
        // Add X axis
        var x = d3.scaleLinear()
            .domain([d3.min(poverty), d3.max(poverty)])
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([d3.min(healthcare), d3.max(healthcare)])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add dots
        var g = svg.append("g")
            .selectAll("dot")
            .data(data)
            .enter();

        g.append("circle")
            .attr("cx", d => x(d.poverty))
            .attr("cy", d => y(d.healthcare))
            .attr("r", 10)
            .attr("class", "stateCircle")
        
        g.append("text")
            .attr("x", d => x(d.poverty))
            .attr("y", d => y(d.healthcare) + 2)
            .attr("class", "stateText")
            .style("font-size", "10")
            .text(d => d.abbr);
    });
}

