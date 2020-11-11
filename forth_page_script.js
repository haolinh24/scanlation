// Code to draw sankey diagram
// Adapted from example by Fabrício Rodrigues on bl.ocks.org
// Accessed on 11/11/2020
// http://bl.ocks.org/FabricioRHS/80ef58d4390b06305c91fdc831844009

var drag = {};
var svg = {};

function showSankey(energy)
{
  $('.d3-tip-nodes').remove(); //clear olds tips
  var chartBox = d3.select("#sankey").node().getBoundingClientRect();
  var margin = {top: 10, right: 10, bottom: 10, left: 20},
  // width = chartBox.width - chartBox.left - margin.left - margin.right,
  // height = chartBox.height - chartBox.top  - margin.top - margin.bottom;
  width = 960;
  height = 500;

  var linkTooltipOffset = 72,
    nodeTooltipOffset = 130;

  //Tooltip function:
  //D3 sankey diagram with view options (Austin Czarnecki’s Block cc6371af0b726e61b9ab)
  //https://bl.ocks.org/austinczarnecki/cc6371af0b726e61b9ab
  var tipLinks = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10,0]);

  var tipNodes = d3.tip()
    .attr('class', 'd3-tip d3-tip-nodes')
    .offset([-10, 0]);


  function formatAmount(val) {
    //return val.toLocaleString("en-US", {style: 'currency', currency: "USD"}).replace(/\.[0-9]+/, "");
    return parseInt(val).toFixed(0) + " " + "titles";
  };

  // "➡"
  tipLinks.html(function(d) {
    var title, candidate;
    if (energy.links.indexOf(d.source.name) > -1) {
    candidate = d.source.name;
    title = d.target.name;
    } else {
    candidate = d.target.name;
    title = d.source.name;
    }
    var html =  '<div class="table-wrapper">'+
      '<h4>'+title+'</h4>'+
      '<table>'+
        '<tr>'+
          '<td class="col-left">'+candidate+'</td>'+
          '<td align="right">'+formatAmount(d.value)+'</td>'+
        '</tr>'+
      '</table>'+
      '</div>';
    return html;
  });

  tipNodes.html(function(d) {
    var object = d3.entries(d),
      nodeName = object[1].value,
      linksTo = object[3].value,
      linksFrom = object[4].value,
      html;

    html =  '<div class="table-wrapper">'+
        '<h4>'+nodeName+'</h4>'+
        '<table>';
    if (linksFrom.length > 0 & linksTo.length > 0) {
    html+= '<tr><td><h5>Input:</h5></td><td></td></tr>'
    }
    for (i = 0; i < linksFrom.length; ++i) {
    html += '<tr>'+
      '<td class="col-left">'+linksFrom[i].source.name+'</td>'+
      '<td align="right">'+formatAmount(linksFrom[i].value)+'</td>'+
    '</tr>';
    }
    if (linksFrom.length > 0 & linksTo.length > 0) {
    html+= '<tr><td><h5>Output:</h5></td><td></td></tr>'
    }
    for (i = 0; i < linksTo.length; ++i) {
    html += '<tr>'+
          '<td class="col-left">'+linksTo[i].target.name+'</td>'+
          '<td align="right">'+formatAmount(linksTo[i].value)+'</td>'+
        '</tr>';
    }
    html += '</table></div>';
    return html;
  });

  // function zoomed() {
  //   svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  // }

  function dragstarted(d) {
    d3.select(this).classed("dragging", true);
  }

  function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  }

  function dragended(d) {
    d3.select(this).classed("dragging", false);
  }

  drag = d3.behavior.drag()
  .origin(function(d) { return d; })
  .on("dragstart", dragstarted)
  .on("drag", dragged)
  .on("dragend", dragended);



var formatNumber = d3.format(",.0f"),
  format = function(d) { return formatNumber(d) + " $"; },
  color = d3.scale.category20();

svg = d3.select("#sankey").append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "-"
        + (margin.left - 10) + " -"
        + margin.top + " "
        + (width + margin.left) + " "
        + (height + margin.bottom*4))
  // .attr("width", width + chartBox.left + margin.left + margin.right)
  // .attr("height", height + chartBox.top + margin.top + margin.bottom)
  // .call(zoom)
  .call(tipLinks)
  .call(tipNodes)
  .append("g")
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
console.log(width)
console.log(height)
var sankey = d3sankey()
  .nodeWidth(40)
  .nodePadding(15)
  .size([width, height]);

var path = sankey.link();
  sankey
    .nodes(energy.nodes)
    .links(energy.links)
    .layout(32);

var fontScale = d3.scale.linear().domain(d3.extent(energy.nodes, function(d) { return d.value })).range([16, 25]);

  var link = svg.append("g").selectAll(".link")
    .data(energy.links)
  .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke", function(d){ return d.source.color; })
    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    .sort(function(a, b) { return b.dy - a.dy; })
    .on('mousemove', function(event) {
    tipLinks
      .style("top", (d3.event.pageY - linkTooltipOffset) + "px")
      .style("left", function () {
      var left = (Math.max(d3.event.pageX - linkTooltipOffset, 10));
      left = Math.min(left, window.innerWidth - $('.d3-tip').width() - 20)
      return left + "px"; })
    })
    .on('mouseover', tipLinks.show)
    .on('mouseout', tipLinks.hide);

  var node = svg.append("g").selectAll(".node")
    .data(energy.nodes)
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
  .on('mousemove', function(event) {
    tipNodes
      .style("top", (d3.event.pageY - $('.d3-tip-nodes').height() - 20) + "px")
      .style("left", function () {
      var left = (Math.max(d3.event.pageX - nodeTooltipOffset, 10));
      left = Math.min(left, window.innerWidth - $('.d3-tip').width() - 20)
      return left + "px"; })
    })
  .on('mouseover', tipNodes.show)
  .on('mouseout', tipNodes.hide)
  .call(d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", function() {
    d3.event.sourceEvent.stopPropagation();  //Disable drag sankey on node select
    this.parentNode.appendChild(this); })
    .on("drag", dragmove));

  node.append("rect")
    .attr("height", function(d) { return d.dy; })
    .attr("width", sankey.nodeWidth())
    .style("fill", function(d) {
      if (d.color == undefined)
      return d.color = color(d.name.replace(/ .*/, "")); //get new color if node.color is null
      return d.color;
    })
    .style("stroke", function(d) { return d3.rgb(d.color).darker(2); });

  node.append("text")
    .attr("class","nodeValue")
    .text(function(d) { return d.name + "\n" + format(d.value); });

  node.selectAll("text.nodeValue")
    .attr("x", sankey.nodeWidth() / 2)
    .attr("y", function (d) { return (d.dy / 2) })
    .text(function (d) { return formatNumber(d.value); })
    .attr("dy", 5)
    .attr("text-anchor", "middle");

  node.append("text")
    .attr("class","nodeLabel")
    .style("fill", function(d) {
      return d3.rgb(d.color).darker(2.4);
    })
    .style("font-size", function(d) {
      return fontScale(d.value) + "px";
    });

  node.selectAll("text.nodeLabel")
    .attr("x", -6)
    .attr("y", function(d) { return d.dy / 2; })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function(d) { return d.name; })
  .filter(function(d) { return d.x < width / 2; })
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");
  function dragmove(d) {
    d3.select(this)
      .attr("transform", "translate(" + d.x + "," +
         (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  };

  // fitZoom();
}
function getData() {
  return{
    "nodes": [
    {"node":0,"name":"Viz", color:'#edbd00'},
    {"node":1,"name":"Kodansha USA", color: '#be1e2d'},
    {"node":2,"name":"Seven Seas", color: '#2b9cde'},
    {"node":3,"name":"Yen Press", color: '#8cac1d'},
    {"node":4,"name":"Weekly Shonen Jump app", color: '#367d85'},
    {"node":5,"name":"MANGAPlus app", color: '#97ba4c'},
    {"node":6,"name":"Comixology Unlimited", color: '#49b291'},
    {"node":7,"name":"Crunchyroll", color: '#f37521'},
    {"node":8,"name":"Amazon/Comixology", color: '#cccccc'}

    ],
    "links":[
    {"source":7,"target":8,"value":24},
    {"source":0,"target":8,"value":492},
    {"source":0,"target":4,"value":67},
    {"source":0,"target":5,"value":13},
    {"source":4,"target":5,"value":42},
    {"source":6,"target":8,"value":60},
    {"source":2,"target":7,"value":3},
    {"source":3,"target":7,"value":4},
    {"source":5,"target":8,"value":55},
    {"source":4,"target":8,"value":25},
    {"source":2,"target":8,"value":295},
    {"source":3,"target":8,"value":321},
    {"source":1,"target":8,"value":266},
    {"source":1,"target":6,"value":77},
    {"source":6,"target":7,"value":17}

    ]
  };
};



showSankey(getData());
// end of reference code
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
