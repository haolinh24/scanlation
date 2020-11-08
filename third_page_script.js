var parseTime = d3.timeParse("%Y");
//format the data
d3.csv("https://cdn.glitch.com/e1d93241-ead1-4ad9-ae05-0be9be9a2376%2Fnew_group_chapter_each_year.csv?v=1603182275222", function(error, data) {
data.forEach(function(d) {
  d.date = parseTime(d.Year);
  d.Chapters = +d.Chapters;
  d.Group = +d.Group;
})
var slices = data.columns.slice(1).map(function(id) {
    return {

        id: id,
        values: data.map(function(d){
            return {
                date: parseTime(d.Year),
                measurement: +d[id]
            };
        })
    };
});

console.log(slices);
console.log(data);
// });
// set the dimensions and margins of the graph
var margin = {top: 20, right: 40, bottom: 30, left: 70},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// const width = 550;
// const height = 300;
// const margin = 5;
// const padding = 5;
// const adj = 30;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y0 = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);
var y01 = {};
y01['Chapters'] = y0;
y01['Group'] = y1;


// define the 1st line
var valueline = d3.line()
.x(function(d) {
  // console.log(d)
  return x(d.date); })
.y(function(d) {return y0(d.Chapters); });
// define the 2nd line
var valueline2 = d3.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y1(d.Group); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#container").append("svg")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "-" + margin.left + " " + " -" + (margin.top + margin.bottom) + " " + " " + (width + margin.right + margin.left *1.5) + " " + (height + margin.top + margin.bottom*2.5))
// .attr("width", width + margin.left + margin.right + 40)
// .attr("height", height + margin.top + margin.bottom + 40)
.append("g");
// .attr("transform",
//       "translate(" + margin.left + "," + margin.top + ")")
// .attr("transform",
//     "translate(" + margin.left + "," + "40)");




// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.date; }));
// y0.domain([0, d3.max(data, function(d) {return Math.max(d.Chapters);})]);
// y1.domain([0, d3.max(data, function(d) {return Math.max(d.Group); })]);
y0.domain([0, 75000]);
y1.domain([0, 3000]);

// y0.domain([0, 130000]);
// y1.domain([0, 1100]);

// Add the valueline path.
svg.append("path")
  .data([data])
  .attr("class", "line-chapter")
  .attr("d", valueline);

// svg.append("text")
// .attr("transform", "translate(" + (width+5) + "," + y0(data[20].Chapters) + ")")
// .attr("dy", "1em")
// .attr("text-anchor", "start")
// .style("fill", "steelblue")
// .text("Chapter");
//
// svg.append("text")
// .attr("transform", "translate(" + (width+5) + "," + y1(data[20].Group) + ")")
// .attr("dy", "1.6em")
// .attr("text-anchor", "start")
// .style("fill", "red")
// .text("Group");
//Add the text to the line

// Add the valueline2 path.
svg.append("path")
  .data([data])
  .attr("class", "line-group")
  // .style("stroke", "red")
  .attr("d", valueline2);

// Add the X Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add the Y0 Axis
svg.append("g")
  .attr("class", "axisSteelBlue")
  .call(d3.axisLeft(y0).ticks(8))
  .append("text")
  .attr("class","axisSteelBlue_text")
  // .attr("transform", "rotate(-90)")
  .attr("transform", "translate (-50, 0)")
  .attr("dy", "-1.5em")
  .attr("y", 6)
  .style("text-anchor", "start")
  .text("Number of new chapters");

// Add the Y1 Axis
svg.append("g")
  .attr("class", "axisRed")
  .attr("transform", "translate( " + width + ", 0 )")
  .call(d3.axisRight(y1))
  .append("text")
  .attr("class","axisRed_text")
  // .attr("transform", "translate (0, 120) rotate(-90)")
  .attr("transform", "translate (50, 0)")
  .attr("dy", "-1.5em")
  .attr("y", 6)
  .style("text-anchor", "end")
  .text("Number of new groups");



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
    // .style("border","black 1px solid")
    // .style("background-color", "#D3D3D3")
    .style("background-color","white")
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

  var color =  {
    Chapters: "black",
    Group: "#b2b1ad"
  }
  mousePerLine
    .append("circle")
    .attr("r", 4)
    .attr("class",function(d){return "circle"+ " " + d.id})
    .style("fill", "none")
    // .style("stroke", "red")
    .style("stroke", function(d){return color[d.id]})
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
        console.log(d);
        var xDate = x.invert(mouse[0]);
        console.log(xDate);
        var bisect = d3.bisector(function(d) {
          return d.date;
        }).left;
        console.log(d)
        var ofs = d.values[1].date - d.values[0].date;  // rounding to nearest date
        var idx = bisect(d.values, xDate - ofs/2);
        console.log(ofs);
        console.log(idx);
        updateTooltipContent(idx);


        d3.select(".mouse-line").attr("d", function() {
          var data =
            "M" + x(d.values[idx].date) + "," + height;
          data += " " + x(d.values[idx].date) + "," + 0;
          return data;
        });
        console.log(y01);
        console.log(y01[d.id]);
        return (
          "translate(" +
          x(d.values[idx].date) +
          "," +
          y01[d.id](d.values[idx].measurement) +
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
      .html("<div style='text-align: center' class='date_tooltip'>" + sortingObj[0].date + "</div>")
      // .style("right", (document.body.clientWidth - d3.event.pageX + 25) + "px")
      // .style("bottom", (document.body.clientHeight -  d3.event.pageY + 200) + "px")
      .style("top",(event.clientY + 20) + "px")
      .style("left",(event.clientX + 20) + "px")
      .selectAll()
      .data(sortingObj)
      .enter()
      .append("div")
      .attr("class", function(d){return "tooltip_text"+d.key})

      .html(d => {
        return d.key + "&emsp;<span style='float:right'>" + d.number + "</span>";
      });
  }
  //---------------------MAKING GRIDLINES..........................//
  function make_x_grid_line() {
    return d3.axisBottom(x).ticks(9);
    console.log ("make x grid")
  }

  function make_y_grid_line() {
    return d3.axisLeft(y1).ticks(15);
    console.log("make y grid")
  }

  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(
      make_x_grid_line()
        .tickSize(-height)
        .tickFormat("")
    );

  svg.append("g")
    .attr("class", "grid")
    .call(
      make_y_grid_line()
        .tickSize(-width)
        .tickFormat("")
    );
    //---------------------------DRAWING A LINE -----------------------------//
    svg
      .append("line")
      .attr("class","coalition")
      .attr("x1", x(parseTime("2009")))
      .attr("y1",0)
      .attr("x2", x(parseTime("2009")))
      .attr("y2", height)
      .style("stroke-width", "0.5")
      .style("stroke","red")
      .style("fill","none");

    svg
      .append("text")
      .attr("x", x(parseTime("2009")))
      .attr("transform","translate(" + 4 + "," + 10 + ")")
      .attr('text-anchor','start')
      .attr("class","coalition_text")
      .text("42 publishers formed")
      .style("fill","red");

      svg
        .append("text")
        .attr("x", x(parseTime("2009")))
        .attr("transform","translate(" + 4 + "," + 32 + ")")
        .attr('text-anchor','start')
        .attr("class","coalition_text")
        .text("manga anti-piracy coalition")
        .style("fill","red");

    svg
      .append("circle")
      .attr("cx", x(parseTime("2009")))
      .attr("r", 4)
      .style("fill", "red")


    svg
      .append("line")
      .attr("class","coalition")
      .attr("x1", x(parseTime("2014")))
      .attr("y1",0)
      .attr("x2", x(parseTime("2014")))
      .attr("y2", height)
      .style("stroke-width", "0.5")
      .style("stroke","red")
      .style("fill","none");

    svg
      .append("text")
      .attr("x", x(parseTime("2014")))
      .attr("transform","translate(" + 4 + "," + 10 + ")")
      .attr('text-anchor','start')
      .attr("class","coalition_text")
      .text("Japanse government launched")
      .style("fill","red");

      svg
        .append("text")
        .attr("x", x(parseTime("2014")))
        .attr("transform","translate(" + 4 + "," + 32 + ")")
        .attr('text-anchor','start')
        .attr("class","coalition_text")
        .text("Manga-Anime Guardian project")
        .style("fill","red");

    svg
      .append("circle")
      .attr("cx", x(parseTime("2014")))
      .attr("r", 4)
      .style("fill", "red")

    svg
      .append("line")
      .attr("class","Viz_delist")
      .attr("x1", x(parseTime("2016")))
      .attr("y1",height)
      .attr("x2", x(parseTime("2016")))
      .attr("y2", 250)
      .style("stroke-width", "0.5")
      .style("stroke","red")
      .style("fill","none");

    svg
      .append("text")
      .attr("y",250)
      .attr("x", x(parseTime("2016")))
      .attr("transform","translate(" + 5 + "," + 10 + ")")
      .attr('text-anchor','start')
      .attr("class","Viz_delist_text")
      .text("> 150.000 requests/day")
      .style("fill","red");

      svg
        .append("text")
        .attr("y",250)
        .attr("x", x(parseTime("2016")))
        .attr("transform","translate(" + 4 + "," + 32 + ")")
        .attr('text-anchor','start')
        .attr("class","Viz_delist_text")
        .text("sent to Google")
        .style("fill","red");

        svg
          .append("text")
          .attr("y",250)
          .attr("x", x(parseTime("2016")))
          .attr("transform","translate(" + 4 + "," + 54 + ")")
          .attr('text-anchor','start')
          .attr("class","Viz_delist_text")
          .text("to delist pirated")
          .style("fill","red");
        svg
          .append("text")
          .attr("y",250)
          .attr("x", x(parseTime("2016")))
          .attr("transform","translate(" + 4 + "," + 76 + ")")
          .attr('text-anchor','start')
          .attr("class","Viz_delist_text")
          .text("manga hosts")
          .style("fill","red");

    svg
      .append("circle")
      .attr("cy",250)
      .attr("cx", x(parseTime("2016")))
      .attr("r", 4)
      .style("fill", "red")

      svg
        .append("line")
        .attr("class","Discord")
        .attr("x1", x(parseTime("2015")))
        .attr("y1",height)
        .attr("x2", x(parseTime("2015")))
        .attr("y2", 190)
        .style("stroke-width", "0.5")
        .style("stroke","red")
        .style("fill","none");

      svg
        .append("text")
        .attr("y",190)
        .attr("x", x(parseTime("2015")))
        .attr("transform","translate(" + 4 + "," + 10 + ")")
        .attr('text-anchor','start')
        .attr("class","Viz_delist_text")
        .text("Discord")
        .style("fill","red");

        svg
          .append("text")
          .attr("y",190)
          .attr("x", x(parseTime("2015")))
          .attr("transform","translate(" + 4 + "," + 32 + ")")
          .attr('text-anchor','start')
          .attr("class","Viz_delist_text")
          .text("was launched")
          .style("fill","red");

          // svg
          //   .append("text")
          //   .attr("y",250)
          //   .attr("x", x(parseTime("2015")))
          //   .attr("transform","translate(" + 2 + "," + 54 + ")")
          //   .attr('text-anchor','start')
          //   .attr("class","Viz_delist_text")
          //   .text("to delist pirated")
          //   .style("fill","red");
          // svg
          //   .append("text")
          //   .attr("y",250)
          //   .attr("x", x(parseTime("2015")))
          //   .attr("transform","translate(" + 2 + "," + 76 + ")")
          //   .attr('text-anchor','start')
          //   .attr("class","discord")
          //   .text("content/day")
          //   .style("fill","red");

      svg
        .append("circle")
        .attr("cy",190)
        .attr("cx", x(parseTime("2015")))
        .attr("r", 4)
        .style("fill", "red")
});

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

//PICTURE

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
