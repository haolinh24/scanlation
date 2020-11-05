const width = 960;
const height = 500;
const margin = 5;
const padding = 5;
const adj = 30;
// we are appending SVG first
const svg = d3.select("div#container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
          + adj*5 + " -"
          + adj*3 + " "
          + (width + adj *15) + " "
          + (height + adj*5))
    .style("padding", padding)
    .style("margin", margin)
    // .attr("transform","translate(100,0)")
    .classed("svg-content", true);

//-----------------------------DATA-----------------------------//
const timeConv = d3.timeParse("%Y");
const dataset = d3.csv("https://cdn.glitch.com/e1d93241-ead1-4ad9-ae05-0be9be9a2376%2FAll_publishers_delist_request_test2%20(Autosaved).csv?v=1603968192144");
dataset.then(function(data) {
    var slices = data.columns.slice(2).map(function(id) {
        return {
            id: id,
            values: data.map(function(d){
                return {
                    date: timeConv(d.Year),
                    measurement: Math.max(0.3,+d[id])
                };
            })
        };
    });
console.log(slices)
//----------------------------SCALES----------------------------//
const xScale = d3.scaleTime().range([0,width]);
// const yScale = d3.scaleLinear().rangeRound([height, 0]);
const yScale = d3.scaleLog().range([height,0]);

// xScale.domain(d3.extent(data, function(d){
//     return timeConv(d.Year)}));

xScale.domain([timeConv(2008), timeConv(2020)]);


// yScale.domain([(0.1), d3.max(slices, function(c) {
//     return d3.max(c.values, function(d) {
//         return d.measurement + 4; });
//         })
//     ]);
yScale.domain([(0.3), 1e8]);

//-----------------------------AXES-----------------------------//
const yaxis = d3.axisLeft()
    // .tickFormat(function (d) {
    //     return yScale.tickFormat(9, d3.format("d"))(d)
    // })
    .tickFormat(function (d) {
        return yScale.tickFormat(1, d3.format(".0s"))(d)
    })
    .scale(yScale);


const xaxis = d3.axisBottom()
    .tickFormat(d3.timeFormat('%Y'))
    .scale(xScale);


//----------------------------LINES-----------------------------//
const line = d3.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.measurement); });

let id = 0;
const ids = function () {
    return "line-"+id++;
}

//---------------------------TOOLTIP----------------------------//
//**Tooltip_hover with verticle line//
//**This code was adapted from bl.ocks.org post by dianaow 29-6-2019
//**accessed 30-4-2020
//**https://bl.ocks.org/dianaow/0da76b59a7dffe24abcfa55d5b9e163e
tooltip = d3
  .select("#container")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "fixed")
  // .style("background-color", "#D3D3D3")
  .style("background-color", "white")
  .style("padding", "0.5em")
  .style("display", "none");

mouseG = svg.append("g").attr("class", "mouse-over-effects");

mouseG
  .append("path") //vertical line to follow mouse
  .attr("class", "mouse-line")
  .style("stroke", "#A9A9A9")
  .style("stroke-width", "1px")
  .style("opacity", "0");

var mousePerLine = mouseG
  .selectAll(".mouse-per-line")
  .data(slices)
  .enter()
  .append("g")
  .attr("class", "mouse-per-line");

mousePerLine
  .append("circle")
  .attr("r", 4)
  .attr("class",function(d){return "circle"+ " " + d.id})
  .style("fill", "none")
  // .style("stroke", )
  .style("opacity", "0");

const svg_rect = mouseG
  .append("svg:rect")
  .attr("width", width)
  .attr("height", height)
  .attr("fill", "none")
  .attr("pointer-events", "all")
  .on("mouseout", function() {
    // on mouseout hide line
    d3.selectAll(".mouse-line").style("opacity", "0");
    d3.selectAll(".mouse-per-line circle").style("opacity", "0");
    d3.selectAll(".mouse-per-line text").style("opacity", "0");
    d3.selectAll(".tooltip").style("display", "none");
  });

svg_rect
  .on("mouseover", function() {
    //on mouse in show line, circles
    d3.selectAll(".mouse-line").style("opacity", "1");
    d3.selectAll(".circle").style("opacity", "1");
    d3.selectAll(".tooltip").style("display", "block");
  })
  .on("mousemove", function() {
    var mouse = d3.mouse(this);

    d3.selectAll(".mouse-per-line").attr("transform", function(d, i) {
      var xDate = xScale.invert(mouse[0]);
      var bisect = d3.bisector(function(d) {
        return d.date;
      }).left;
      var ofs = d.values[1].date - d.values[0].date;  // rounding to nearest date
      var idx = bisect(d.values, xDate - ofs/2);

      updateTooltipContent(idx);


      d3.select(".mouse-line").attr("d", function() {
        var data =
          "M" + xScale(d.values[idx].date) + "," + height;
        data += " " + xScale(d.values[idx].date) + "," + 0;
        return data;
      });
      return (
        "translate(" +
        xScale(d.values[idx].date) +
        "," +
        yScale(d.values[idx].measurement) +
        ")"
      );
    });
  });
date_display = d3.timeFormat("%Y");
function updateTooltipContent(idx) {
  sortingObj = [];
  for (const d of slices) {
    console.log(d)
    sortingObj.push({
      key: d.id,
      // name: d.id,
      date: date_display(d.values[idx].date),
      number: d.values[idx].measurement})
    // if (d.values.selected) {
    //   sortingObj.push({
    //     key: d.id,
    //     // name: d.id,
    //     date: date_display(d.values[idx].date),
    //     number: d.values[idx].measurement
    //   });
    // }
  }
  console.log(sortingObj)

  if (sortingObj.length == 0) {
    d3.selectAll(".tooltip").style("display", "none");
    return;
  }

  sortingObj.sort(function(x, y) {
    return d3.descending(x.number, y.number);
  });

  tooltip
    .html("<div style='text-align: center' class='tooltip_date'>" + sortingObj[0].date + "</div>")
    // .style("right", (document.body.clientWidth - d3.event.pageX -150) + "px")
    // .style("bottom", (document.body.clientHeight -  d3.event.pageY - 600) + "px")
    .style("top",(event.clientY + 20) + "px")
    .style("left",(event.clientX + 20) + "px")
    .selectAll()
    .data(sortingObj)
    .enter()
    .append("div")
    .attr("class", function(d){return "tooltip_text"+d.key})

    .html(d => {
      return d.key + "&emsp;<span style='float:right'>" + d3.format(',')(Math.floor(d.number)) + "</span>";
    });
}

//-------------------------2. DRAWING---------------------------//

//-----------------------------AXES-----------------------------//
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

svg.append("g")
    .attr("class", "axis")
    // .attr("transform","translate("+ width/3.66 +",0)")
    // .attr("x1", xScale(timeConv("2012")))
    // .attr("x2", xScale(timeConv("2012")))
    .call(yaxis)
    .append("text")
    // .attr("transform", "rotate(-90)")
    .attr("transform","translate(65,0)")
    .attr("dy", ".75em")
    // .attr("y", -6)
    .attr("y", -45)
    .style("text-anchor", "end")
    .text("Number of requests")

//----------------------------LINES-----------------------------//
const lines = svg.selectAll("lines")
    .data(slices)
    .enter()
    .append("g");

    lines.append("path")
    .attr("class", ids)
    .attr("d", function(d) { return line(d.values); });

    lines.append("text")
    .attr("class",function(d){ return "serie_label" + d.id;})
    .datum(function(d) {
        return {
            id: d.id,
            value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) {
            return "translate(" + (xScale(d.value.date) + 10)
            + "," + (yScale(d.value.measurement) + 5 )+ ")"; })
    .attr("x", 5)
    .text(function(d) { return  d.id; });

//---------------------------POINTS-----------------------------//

//---------------------------EVENTS-----------------------------//
//---------------------------DRAWING A LINE -----------------------------//
svg
  .append("line")
  .attr("class","coalition")
  .attr("x1", xScale(timeConv("2009")))
  .attr("y1",-50)
  .attr("x2", xScale(timeConv("2009")))
  .attr("y2", height)
  .style("stroke-width", "0.5")
  .style("stroke","red")
  .style("fill","none");

svg
  .append("text")
  .attr("x", xScale(timeConv("2009")))
  .attr("transform","translate(" + 4 + "," + -30 + ")")
  .attr('text-anchor','start')
  .attr("class","coalition_text")
  .text("42 publishers formed")
  .style("fill","red");

  svg
    .append("text")
    .attr("x", xScale(timeConv("2009")))
    .attr("transform","translate(" + 4 + "," + -5 + ")")
    .attr('text-anchor','start')
    .attr("class","coalition_text")
    .text("manga anti-piracy coalition")
    .style("fill","red");

svg
  .append("circle")
  .attr("cx", xScale(timeConv("2009")))
  .attr("cy",-50)
  .attr("r", 4)
  .style("fill", "red")


svg
  .append("line")
  .attr("class","coalition")
  .attr("x1", xScale(timeConv("2014")))
  .attr("y1",-50)
  .attr("x2", xScale(timeConv("2014")))
  .attr("y2",height)
  .style("stroke-width", "0.5")
  .style("stroke","red")
  .style("fill","none");

svg
  .append("text")
  .attr("x", xScale(timeConv("2014")))
  .attr("transform","translate(" + 4 + "," + -30 + ")")
  .attr('text-anchor','start')
  .attr("class","coalition_text")
  .text("Japanse government launched")
  .style("fill","red");

  svg
    .append("text")
    .attr("x", xScale(timeConv("2014")))
    // .attr("y",-30)
    .attr("transform","translate(" + 4 + "," + -5 + ")")
    .attr('text-anchor','start')
    .attr("class","coalition_text")
    .text("Manga-Anime Guardian project")
    .style("fill","red");

svg
  .append("circle")
  .attr("cx", xScale(timeConv("2014")))
  .attr("cy",-50)
  .attr("r", 4)
  .style("fill", "red")

  //---------------------------GRIDLINES-----------------------------//
  //**add X gridlines
  //**This code was adapted from bl.ocks.org post by d3noob 2-11-2017
  //**Accessed 25-4-2020
  //**https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
  function make_x_grid_line() {
    return d3.axisBottom(xScale).ticks(10);
    // console.log ("make x grid")
  }

  function make_y_grid_line() {
    return d3.axisLeft(yScale).ticks(8);
    // console.log("make y grid")
  }

  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(
      make_x_grid_line()
        .tickSize(-height)
        .tickFormat("")
    );

  svg
    .append("g")
    .attr("class", "grid")
    .call(
      make_y_grid_line()
        .tickSize(-width)
        .tickFormat("")
    );
});

//.......................... PICTOGRAM...........................//
var scan = document.getElementById("scan")
var print_scan = document.getElementById("print_scan")
var print_half = document.getElementById("print_half")
var scan_simulus = document.getElementById("scan_simulus")
var drop = document.getElementById("drop")
var drop_half = document.getElementById("drop_half")

var arrow_print = document.getElementById("arrow_print")
var arrow_scan = document.getElementById("arrow_scan")
var arrow_drop = document.getElementById("arrow_drop")
var arrow_scan_slow = document.getElementById("arrow_scan_slow")

var print_text = document.getElementById("print_text")
var simulus_text = document.getElementById("simulus_text")
var drop_text = document.getElementById("drop_text")
var scan_text = document.getElementById("scan_text")
var scan_slow_text = document.getElementById("scan_slow_text")

function appear(state) {
  print_scan.style.display = state
  print_half.style.display = state
  scan_simulus.style.display = state
  drop.style.display = state
  drop_half.style.display = state

  arrow_print.style.display = state
  arrow_simulus.style.display = state
  arrow_drop.style.display = state
  arrow_scan_slow.style.display = state

  print_text.style.display = state
  simulus_text.style.display = state
  drop_text.style.display = state
  scan_slow_text.style.display = state
}

appear("none")
scan.onmouseover = function() {
appear("block")
arrow_scan.style.display = "none"
scan_text.style.display = "none"
}
scan.onmouseout = function() {
appear("none")
arrow_scan.style.display = "block"
scan_text.style.display = "block"
}
print_scan.onmouseover = function() {
  appear("block")
  arrow_scan.style.display = "none"
  scan_text.style.display = "none"
}
print_scan.onmouseout = function() {
  appear("none")
  arrow_scan.style.display = "block"
  scan_text.style.display = "block"
}
scan_simulus.onmouseover = function() {
  appear("block")
  arrow_scan.style.display = "none"
  scan_text.style.display = "none"
}
scan_simulus.onmouseout = function() {
  appear("none")
  arrow_scan.style.display = "block"
  scan_text.style.display = "block"
}
drop.onmouseover = function() {
  appear("block")
  arrow_scan.style.display = "none"
  scan_text.style.display = "none"
}
drop.onmouseout = function() {
  appear("none")
  arrow_scan.style.display = "block"
  scan_text.style.display = "block"
}
//ScrollMagic
function all_article_button(x) {
  if (x.matches) {

  var controller = new ScrollMagic.Controller()
  var scene = new ScrollMagic.Scene({
    triggerElement: "#trigger1"
  })
              .setClassToggle("#btn-pluss-wrapper", "appear")
              // .addIndicators({name:"1 (duration:0)"})
              .addTo(controller);
  }
}

var x = window.matchMedia("(min-width: 1200px)")
all_article_button(x)
x.addListener(all_article_button)
