    const svg=d3.select("svg"), padding=200;
    const width=svg.attr("width")-padding, height=svg.attr("height")-padding;
    const g=svg.append("g").attr("transform","translate("+ 100 +","+ 100 +")");

     

    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
     .then(response=>response.json())
     .then(response=>{
           const {data}=response;
           const barWidth=width/data.length;

           const xScale = d3.scaleTime()
                            .domain([d3.min(data.map(d=>new Date(d[0]))), d3.max(data.map(d=>new Date(d[0])))])
                            .range([0, width]);
           g.append("g").attr("id","x-axis").attr("transform","translate(0, "+ height +")").call(d3.axisBottom(xScale).ticks(10));
           const yScale=d3.scaleLinear()
                          .domain([0, d3.max(data, d=>d[1])])
                          .range([height, 0]);
           g.append("g").attr("id","y-axis")
                        .call(d3.axisLeft(yScale))
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 95)
                        .attr("dy", "-5.1em")
                        .attr("text-anchor", "end")
                        .attr("stroke", "black")
                        .style("font-size", "15px")
                        .text("Gross Domestic Product")
 
           const tooltip=d3.select("body").append("div").attr("class","tooltip").attr("id", "tooltip").style("opacity", 0);
           g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class","bar")
            .attr("x", (d, i)=>i * barWidth)
            .attr("y", d=>yScale(d[1]))
            .attr("width", barWidth)
            .attr("height", d=>height - yScale(d[1]))
            .attr("data-date",d=>d[0])
            .attr("data-gdp", d=>d[1])
            .on("mouseover", d => { 
             tooltip.style("opacity", .9);
             tooltip.attr("data-date", d[0])
             tooltip.html("Date "+ d[0] + '<br /> ' +"$ "+d[1])
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
      })   
      .on("mouseout", d => {
        tooltip.style("opacity", 0);
      });

      svg.append("text")
        .attr("transform", 'translate(100, 100)')
        .attr("x", 130)
        .attr("y", 0)
        .attr("font-size", "24px")
        .text("United States GPD");

     })