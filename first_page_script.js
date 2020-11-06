var button = document.getElementsByClassName("Click Scanning")[0];
var button_redrawing = document.getElementsByClassName("Click Redrawing")[0];
var button_typesetting = document.getElementsByClassName("Click Typesetting")[0];
var button_qualitychecker = document.getElementsByClassName("Click Qualitychecker")[0];
var box_scanning = document.getElementById("box-scanning");
var box_redrawing = document.getElementById("box-redrawing");
var box_typesetting = document.getElementById("box-typesetting");
var box_qualitychecker = document.getElementById("box-qualitychecker");
var close = document.getElementsByClassName("close")[0];
var close_redrawing = document.getElementsByClassName("close_redrawing")[0];
var close_typesetting = document.getElementsByClassName("close_typesetting")[0];
var close_qualitychecker = document.getElementsByClassName("close_qualitychecker")[0];
var arrow_scanning = document.getElementsByClassName("arrow_scanning")[0];
var arrow_redrawing = document.getElementsByClassName("arrow_redrawing")[0];
var arrow_typesetting = document.getElementsByClassName("arrow_typesetting")[0];
var arrow_qualitychecker = document.getElementsByClassName("arrow_qualitychecker")[0];
button.onclick = function (){
  box_scanning.style.display = "grid"
  scrollIt(200)
  arrow_scanning.style.display = "block"
  if (box_redrawing.style.display != "none") {
    box_redrawing.style.display = "none"
    arrow_redrawing.style.display = "none"
  }
  if (box_typesetting.style.display != "none") {
    box_typesetting.style.display = "none"
    arrow_typesetting.style.display = "none"
  }
  if (box_qualitychecker.style.display != "none") {
    box_qualitychecker.style.display = "none"
    arrow_qualitychecker.style.display = "none"
  }
}
button_redrawing.onclick = function (){
  box_redrawing.style.display = "grid"
  scrollIt1(200)
  arrow_redrawing.style.display = "block"
  if (box_scanning.style.display != "none") {
    box_scanning.style.display = "none"
    arrow_scanning.style.display = "none"
  }
  if (box_typesetting.style.display != "none") {
    box_typesetting.style.display = "none"
    arrow_typesetting.style.display = "none"
  }

  if (box_qualitychecker.style.display != "none") {
    box_qualitychecker.style.display = "none"
    arrow_qualitychecker.style.display = "none"
  }
}
button_typesetting.onclick = function() {
  box_typesetting.style.display = "grid"
  arrow_typesetting.style.display = "block"
  if (box_scanning.style.display != "none") {
    box_scanning.style.display = "none"
    arrow_scanning.style.display = "none"
  }
  if (box_redrawing.style.display != "none") {
    box_redrawing.style.display = "none"
    arrow_redrawing.style.display = "none"
  }
  if (box_qualitychecker.style.display != "none") {
    box_qualitychecker.style.display = "none"
    arrow_qualitychecker.style.display = "none"
  }
}

button_qualitychecker.onclick = function() {
  box_qualitychecker.style.display = "grid"
  arrow_qualitychecker.style.display = "block"
  if (box_scanning.style.display != "none") {
    box_scanning.style.display = "none"
    arrow_scanning.style.display = "none"
  }
  if (box_redrawing.style.display != "none") {
    box_redrawing.style.display = "none"
    arrow_redrawing.style.display = "none"
  }
  if (box_typesetting.style.display != "none") {
    box_typesetting.style.display = "none"
    arrow_typesetting.style.display = "none"
  }
}

close.onclick = function(){
  box_scanning.style.display = "none"
  arrow_scanning.style.display = "none"

}

close_redrawing.onclick = function(){
  box_redrawing.style.display = "none"
  arrow_redrawing.style.display = "none"

}
close_typesetting.onclick = function(){
  box_typesetting.style.display = "none"
  arrow_typesetting.style.display = "none"
}

close_qualitychecker.onclick = function(){
  box_qualitychecker.style.display = "none"
  arrow_qualitychecker.style.display = "none"
}
console.log(button);
console.log(button[0]);
console.log(box_scanning);

// I hope this over-commenting helps. Let's do this!
// Let's use the 'active' variable to let us know when we're using it
let active = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector('.scroller').addEventListener('mousedown',function(){
  active = true;
  // Add our scrolling class so the scroller has full opacity while active
  document.querySelector('.scroller').classList.add('scrolling');
});
// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener('mouseup',function(){
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('mouseleave',function(){
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});

// Let's figure out where their mouse is at
document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector('.wrapper').getBoundingClientRect().left;
  wrapper_pos = document.querySelector('.wrapper').getBoundingClientRect().left;
  console.log(wrapper_pos)
  console.log(x)
  // Okay let's change our state
  scrollIt(x);
});

// Let's use this function
function scrollIt(x){
    let transform = Math.max(0,(Math.min(x,document.querySelector('.wrapper').offsetWidth)));
    document.querySelector('.after').style.width = transform+"px";
    document.querySelector('.scroller').style.left = transform-25+"px";
}

// Let's set our opening state based off the width,
// we want to show a bit of both images so the user can see what's going on
scrollIt(150);

// And finally let's repeat the process for touch events
// first our middle scroller...
document.querySelector('.scroller').addEventListener('touchstart',function(){
  active = true;
  document.querySelector('.scroller').classList.add('scrolling');
});
document.body.addEventListener('touchend',function(){
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('touchcancel',function(){
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});


// I hope this over-commenting helps. Let's do this!
// Let's use the 'active' variable to let us know when we're using it
// let active1 = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector('.scroller_redrawing').addEventListener('mousedown',function(){
  active = true;
  // Add our scrolling class so the scroller has full opacity while active
  document.querySelector('.scroller_redrawing').classList.add('scrolling');
});
// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener('mouseup',function(){
  active = false;
  document.querySelector('.scroller_redrawing').classList.remove('scrolling');
});
document.body.addEventListener('mouseleave',function(){
  active = false;
  document.querySelector('.scroller_redrawing').classList.remove('scrolling');
});

// Let's figure out where their mouse is at
document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  // Their mouse is here...
  let x1 = e.pageX;
  // but we want it relative to our wrapper
  x1 -= document.querySelector('.wrapper_redrawing').getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt1(x1);
});

// Let's use this function
function scrollIt1(x1){
    let transform = Math.max(0,(Math.min(x1,document.querySelector('.wrapper_redrawing').offsetWidth)));
    document.querySelector('.after_redrawing').style.width = transform+"px";
    document.querySelector('.scroller_redrawing').style.left = transform-25+"px";

}

// Let's set our opening state based off the width,
// we want to show a bit of both images so the user can see what's going on
scrollIt1(130);

// And finally let's repeat the process for touch events
// first our middle scroller...
document.querySelector('.scroller_redrawing').addEventListener('touchstart',function(){
  active = true;
  document.querySelector('.scroller_redrawing').classList.add('scrolling');
});
document.body.addEventListener('touchend',function(){
  active = false;
  document.querySelector('.scroller_redrawing').classList.remove('scrolling');
});
document.body.addEventListener('touchcancel',function(){
  active = false;
  document.querySelector('.scroller_redrawing').classList.remove('scrolling');
});


// DRAW A LINE GRAPH
const width = 550;
const height = 300;
const margin = 5;
const padding = 5;
const adj = 30;
// we are appending SVG first
const svg = d3.select("div#container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
          + adj + " -"
          + adj + " "
          + (width + adj *10) + " "
          + (height + adj*4))
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);

//-----------------------------DATA-----------------------------//
const timeConv = d3.timeParse("%Y");
const dataset = d3.csv("https://cdn.glitch.com/f2fdde1b-8103-40f1-9f5b-f114ef3681e1%2Fpublishervsscanlator_joseiandseinen.csv?v=1602297621419");
dataset.then(function(data) {
    var slices = data.columns.slice(2).map(function(id) {
        return {
            id: id,
            values: data.map(function(d){
                return {
                    date: timeConv(d.Year),
                    measurement: +d[id]
                };
            })
        };
    });
console.log(slices)
//----------------------------SCALES----------------------------//
const xScale = d3.scaleTime().range([0,width]);
const yScale = d3.scaleLinear().rangeRound([height, 0]);

xScale.domain(d3.extent(data, function(d){
    return timeConv(d.Year)}));

yScale.domain([(0), d3.max(slices, function(c) {
    return d3.max(c.values, function(d) {
        return d.measurement + 4; });
        })
    ]);

//-----------------------------AXES-----------------------------//
const yaxis = d3.axisLeft()
    .ticks((slices[0].values).length - 4)
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
  .style("background-color", "#D3D3D3")
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
  // .style("stroke", "red")
  .attr("stroke-width", 0.5)
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
    // .style("right", (document.body.clientWidth - d3.event.pageX-280) + "px")
    // .style("right", (d3.event.pageX/3) + "px")
    // .style("bottom", (document.body.clientHeight -  d3.event.pageY-1900) + "px")
    // .style("bottom", (d3.event.pageY/2) + "px")
    .style("top",(event.clientY + 20) + "px")
    .style("left",(event.clientX + 20) + "px")
    .selectAll()
    .data(sortingObj)
    .enter()
    .append("div")
    .attr("class", function(d){return "tooltip_text"+d.key})

    .html(d => {
      return d.key.toLowerCase() + "&emsp;<span style='float:right'>" + d.number + "</span>";
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
    .call(yaxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".75em")
    .attr("y", 6)
    .style("text-anchor", "end")
    .text("Number of new titles");


//----------------------------LINES-----------------------------//
const lines = svg.selectAll("lines")
    .data(slices)
    .enter()
    .append("g");

    lines.append("path")
    .attr("class", ids)
    .attr("d", function(d) { return line(d.values); });

    lines.append("text")
    .attr("class",function(d) { return "serie_label" + " " + d.id})
    .datum(function(d) {
        return {
            id: d.id,
            value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) {
            return "translate(" + (xScale(d.value.date))
            + "," + (yScale(d.value.measurement) )+ ")"; })
    .attr("x", 5)
    .text(function(d) { return  d.id; });

//---------------------------POINTS-----------------------------//
//---------------------------GRIDLINES-----------------------------//
//**add X gridlines
//**This code was adapted from bl.ocks.org post by d3noob 2-11-2017
//**Accessed 25-4-2020
//**https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
function make_x_grid_line() {
  return d3.axisBottom(xScale).ticks(13);
  console.log ("make x grid")
}

function make_y_grid_line() {
  return d3.axisLeft(yScale).ticks(10);
  console.log("make y grid")
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


//---------------------------EVENTS-----------------------------//
//---------------------------DRAWING A LINE -----------------------------//
svg
  .append("line")
  .attr("class","VizSig")
  .attr("x1", xScale(timeConv("2009")))
  .attr("y1",0)
  .attr("x2", xScale(timeConv("2009")))
  .attr("y2", height)
  .style("stroke-width", "0.5")
  .style("stroke","#00565f")
  .style("fill","none");

  svg
    .append("text")
    .attr("x", xScale(timeConv("2009")))
    .attr("transform","translate(" + 2 + "," + 10 + ")")
    .attr('text-anchor','start')
    .attr("class","VizSig_firstline")
    .text("Viz introduced")
    .style("fill","#00565f");

svg
  .append("text")
  .attr("x", xScale(timeConv("2009")))
  .attr("transform","translate(" + 2 + "," + 25 + ")")
  .attr('text-anchor','start')
  .attr("class","VizSig_secondline")
  .text("'Viz Signature'")
  .style("fill","#00565f");

  svg
    .append("text")
    .attr("x", xScale(timeConv("2009")))
    .attr("transform","translate(" + 2 + "," + 40 + ")")
    .attr('text-anchor','start')
    .attr("class","VizSig_thirdline")
    .text("- an imprint for literary manga")
    .style("fill","#00565f");

svg
  .append("circle")
  .attr("cx", xScale(timeConv("2009")))
  .attr("r", 2)
  .style("fill", "#00565f")

  svg
    .append("line")
    .attr("class","Kodansha")
    .attr("x1", xScale(timeConv("2008")))
    .attr("y1",0)
    .attr("x2", xScale(timeConv("2008")))
    .attr("y2", height)
    .style("stroke-width", "0.5")
    .style("stroke","#be1e2d")
    .style("fill","none");


  svg
    .append("text")
    .attr("x", xScale(timeConv("2008")))
    .attr("transform","translate(" + -80 + "," + 10 + ")")
    .attr('text-anchor','start')
    .attr("class","Kodansha_founded")
    .text("KodanshaUSA")
    .style("fill","#be1e2d");

  svg
    .append("text")
    .attr("x", xScale(timeConv("2008")))
    .attr("transform","translate(" + -80 + "," + 25 + ")")
    .attr('text-anchor','start')
    .attr("class","Kodansha_founded")
    .text("was founded")
    .style("fill","#be1e2d");

  svg
    .append("circle")
    .attr("cx", xScale(timeConv("2008")))
    .attr("r", 2)
    .style("fill", "#be1e2d")


svg
  .append("line")
  .attr("class","Yen")
  .attr("x1", xScale(timeConv("2006")))
  .attr("y1", height)
  .attr("x2", xScale(timeConv("2006")))
  .attr("y2", 80)
  .style("stroke-width", "0.5")
  .style("stroke","#8cac1d")
  .style("fill","none");


svg
  .append("text")
  .attr("x", xScale(timeConv("2006")))
  .attr("y", 80)
  .attr("transform","translate(" + -70 + "," + 10 + ")")
  .attr('text-anchor','start')
  .attr("class","Yen_founded")
  .text("Yen Press")
  .style("fill","#8cac1d");

svg
  .append("text")
  .attr("x", xScale(timeConv("2006")))
  .attr("y", 80)
  .attr("transform","translate(" + -70 + "," + 25 + ")")
  .attr('text-anchor','start')
  .attr("class","Yen_founded")
  .text("was founded")
  .style("fill","#8cac1d");


svg
  .append("circle")
  .attr("cx", xScale(timeConv("2006")))
  .attr("cy", 80)
  .attr("r", 2)
  .style("fill", "#8cac1d")

  svg
    .append("line")
    .attr("class","SevenSeas")
    .attr("x1", xScale(timeConv("2004")))
    .attr("y1", height)
    .attr("x2", xScale(timeConv("2004")))
    .attr("y2", 140)
    .style("stroke-width", "0.5")
    .style("stroke","#2b9cde")
    .style("fill","none");


  svg
    .append("text")
    .attr("x", xScale(timeConv("2004")))
    .attr("y", 140)
    .attr("transform","translate(" + -70 + "," + 10 + ")")
    .attr('text-anchor','start')
    .attr("class","SevenSeas_founded")
    .text("Seven Seas")
    .style("fill","#2b9cde");

    svg
      .append("text")
      .attr("x", xScale(timeConv("2004")))
      .attr("y", 140)
      .attr("transform","translate(" + -70 + "," + 25 + ")")
      .attr('text-anchor','start')
      .attr("class","SevenSeas_founded")
      .text("was founded")
      .style("fill","#2b9cde");

  svg
    .append("circle")
    .attr("cx", xScale(timeConv("2004")))
    .attr("cy", 140)
    .attr("r", 2)
    .style("fill", "#2b9cde")


});

//HOVER PICTOGRAM
var shounen_publish = document.getElementById("shounen_publish")
var shounen_scan = document.getElementById("shounen_scan")
var shounen_text_scan = document.getElementById("shounen_text_scan")

var shojo_publish = document.getElementById("shojo_publish")
var shojo_scan = document.getElementById("shojo_scan")
var shojo_text_scan = document.getElementById("shojo_text_scan")

var seinen_publish = document.getElementById("seinen_publish")
var seinen_scan = document.getElementById("seinen_scan")
var seinen_text_scan = document.getElementById("seinen_text_scan")

var josei_publish = document.getElementById("josei_publish")
var josei_scan = document.getElementById("josei_scan")
var josei_text_scan = document.getElementById("josei_text_scan")

function normal_state() {
  shounen_publish.style.display = "block"
  shojo_publish.style.display = "block"
  seinen_publish.style.display = "block"
  josei_publish.style.display = "block"

  shounen_scan.style.display = "none"
  shojo_scan.style.display = "none"
  seinen_scan.style.display = "none"
  josei_scan.style.display = "none"

  shounen_text_scan.style.display = "none"
  shojo_text_scan.style.display = "none"
  seinen_text_scan.style.display = "none"
  josei_text_scan.style.display = "none"
}

function shounen_appear () {
  shounen_scan.style.display = "block"
  shounen_text_scan.style.display = "block"
}

function shojo_appear() {
  shojo_scan.style.display = "block"
  shojo_text_scan.style.display = "block"
}

function seinen_appear() {
  seinen_scan.style.display = "block"
  seinen_text_scan.style.display = "block"
}

function josei_appear() {
  josei_scan.style.display = "block"
  josei_text_scan.style.display = "block"
}

normal_state()

shounen_publish.onmouseover = function() {shounen_appear()}
shounen_scan.onmouseover = function() {shounen_appear()}
shounen_publish.onmouseout = function() { normal_state() }
shounen_scan.onmouseout = function() { normal_state() }

shojo_publish.onmouseover = function() {shojo_appear()}
shojo_scan.onmouseover = function() {shojo_appear()}
shojo_publish.onmouseout = function() { normal_state() }
shojo_scan.onmouseout = function() { normal_state() }

seinen_publish.onmouseover = function() {seinen_appear()}
seinen_scan.onmouseover = function() {seinen_appear()}
seinen_publish.onmouseout = function() { normal_state() }
seinen_scan.onmouseout = function() { normal_state() }

josei_publish.onmouseover = function() {josei_appear()}
josei_scan.onmouseover = function() {josei_appear()}
josei_publish.onmouseout = function() { normal_state() }
josei_scan.onmouseout = function() { normal_state() }

// SLIDESHOW SCANNING
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  console.log(n)
  dots[slideIndex-1].className += " active";
}
// SLIDESHOW REDRAWING
showSlides_redrawing(slideIndex);

function plusSlides_redrawing(n) {
  showSlides_redrawing(slideIndex += n);
}

function currentSlide_redrawing(n) {
  showSlides_redrawing(slideIndex = n);
}

function showSlides_redrawing(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides_redrawing");
  var dots = document.getElementsByClassName("dot_redrawing");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  console.log(n)
  dots[slideIndex-1].className += " active";
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
