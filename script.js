d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', function(e){
  var dataset= e;
  Drawbar(dataset);
})

function Drawbar(dataset){
  const w= 500;
  const h=500;
  padding = 60;
    
  const xScale=d3.scaleLinear()                 .domain([d3.min(dataset, (d)=> d.Year), d3.max(dataset, (d)=> d.Year)])
                 .range([padding,w-padding]);
                 
   let parseTime = (rawTime) => {
            let time = new Date;
            let [mm, ss] = rawTime.split(":");
            time.setMinutes(mm);
            time.setSeconds(ss);
            return time;
          }
  
   const yScale=d3.scaleTime()              .domain([parseTime("40:15"),parseTime("36:30")])
   .range([h-padding,padding]);
  
  
 

  const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
  
   var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip")
                  .attr("id", "tooltip")
                  .style("opacity", 100)
  
    svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx",  (d) => xScale(d.Year))
       .attr("cy", (d)=> yScale(parseTime(d.Time)))
      .attr("r", 5)
  .style("fill", (d) => d.Doping === "" ? "red" : "blue")
  .attr("data-xvalue",(d)=> d.Year)
  .attr("data-yvalue",(d)=> parseTime(d.Time))
  .attr("class","dot")
  .on("mouseover",function(d){
    tooltip.transition()
           .duration(200)
           .style("opacity", 0.9);
     tooltip.html("Year: " + d.Year + "," + " Time: "+ d.Time);
   tooltip.attr("data-year", d.Year)
  })
   .on("mouseout", function(d){
        tooltip.transition()
               .duration(50)
               .style("opacity", 0);
      });
  
  
  const xAxis =d3.axisBottom(xScale)
  .tickFormat(d3.format("d"));
  svg.append("g")
     .attr("id","x-axis")
     .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);
  
   const yAxis = d3.axisLeft(yScale)
  .tickFormat(d3.timeFormat("%M:%S"));
  svg.append("g")
       .attr("id","y-axis") 
      .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
  
  svg.append("rect")
   .attr("x", () => xScale(2007))
        .attr("y", () => yScale(parseTime("37:00")))
        .attr("height", 100)  
        .attr("width", 180)
        .attr("class", "legend")
        .attr("id", "legend")
        .style("fill", "white")
        .style("stroke", "black")
  
   svg.append("text")
        .attr("x", () => xScale(2011))
        .attr("y", () => yScale(parseTime("37:10")))
        .text("Legend")
        .attr("transform", "translate(15, 0)");

  svg.append("text")
        .attr("x", () => xScale(2010))
        .attr("y", () => yScale(parseTime("37:20")))
        .text("With Doping")
        .attr("transform", "translate(15, 0)");

  svg.append("circle")
        .attr("r", 5)
        .attr("cx", () => xScale(2008))
        .attr("cy", () => yScale(parseTime("37:20")))
        .style("fill", "blue")
        .attr("transform", "translate(35, -3)");

  svg.append("text")
        .attr("x", () => xScale(2010))
        .attr("y", () => yScale(parseTime("37:30")))
        .text("No Doping")
        .attr("transform", "translate(15, 0)");

  svg.append("circle")
        .attr("r", 5)
        .attr("cx", () => xScale(2008))
        .attr("cy", () => yScale(parseTime("37:30")))
        .style("fill", "red")
        .attr("transform", "translate(35, -3)");

  
  
}
  