// Other important pens.
// Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

$(function () {

  'use strict';

  var aside = $('.side-nav'),
      showAsideBtn = $('.show-side-btn'),
      contents = $('#contents'),
      _window = $(window)

  showAsideBtn.on("click", function () {
    $("#" + $(this).data('show')).toggleClass('show-side-nav');
    contents.toggleClass('margin');
  });

  if (_window.width() <= 767) {
    aside.addClass('show-side-nav');
  }

  _window.on('resize', function () {
    if ($(window).width() > 767) {
      aside.removeClass('show-side-nav');
    }
  });

  // dropdown menu in the side nav
  var slideNavDropdown = $('.side-nav-dropdown');

  $('.side-nav .categories li').on('click', function () {

    var $this = $(this)

    $this.toggleClass('opend').siblings().removeClass('opend');

    if ($this.hasClass('opend')) {
      $this.find('.side-nav-dropdown').slideToggle('fast');
      $this.siblings().find('.side-nav-dropdown').slideUp('fast');
    } else {
      $this.find('.side-nav-dropdown').slideUp('fast');
    }
  });

  $('.side-nav .close-aside').on('click', function () {
    $('#' + $(this).data('close')).addClass('show-side-nav');
    contents.removeClass('margin');
  });


  // Start chart
  var chart = document.getElementById('myChart');
  Chart.defaults.global.animation.duration = 2000; // Animation duration
  Chart.defaults.global.title.display = false; // Remove title
  Chart.defaults.global.title.text = "Chart"; // Title
  Chart.defaults.global.title.position = 'bottom'; // Title position
  Chart.defaults.global.defaultFontColor = '#999'; // Font color
  Chart.defaults.global.defaultFontSize = 14; // Font size for every label

  // Chart.defaults.global.tooltips.backgroundColor = '#FFF'; // Tooltips background color
  Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
  Chart.defaults.global.legend.labels.padding = 0;
  Chart.defaults.scale.ticks.beginAtZero = true;
  Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
  Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';
  Chart.defaults.global.legend.display = false;

   Chart.pluginService.register({
      beforeDraw: function(chart) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          var ctx = chart.chart.ctx;

          // Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var maxFontSize = centerConfig.maxFontSize || 75;
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          // Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHeight = centerConfig.lineHeight || 25;
          var wrapText = false;

          if (minFontSize === undefined) {
            minFontSize = 20;
          }

          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
          }

          var words = txt.split(' ');
          var line = '';
          var lines = [];

          // Break words up into multiple lines if necessary
          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }

          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;

          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      }
    });




var data1 = [111.9, 88.1]
  var myChart = new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [{
        label: "Lost",
        fill: true,
        lineTension: 0,
        data: data1,
        backgroundColor: ["#FF6384", "#313448"],
        pointBorderColor: "#4bc0c0",
        borderColor: '#4bc0c0',
        borderWidth: 2,
        showLine: true,
      }]
    },
    options: {
      elements: {
        center: {
          text: Math.round((data1[0]/200)*100)+"%",
          color: '#5cb85c',
          sidePadding: 60
        }
      }
    }

  });



  // Chart2Here
var data2 = [27, 23]
  var Chart2 = document.getElementById('myChart2').getContext('2d');
  var myChart = new Chart(Chart2, {
    type: 'doughnut',
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [{
        label: "Lost",
        fill: true,
        lineTension: 0,
        data: data2,
        backgroundColor: ["#FF6384", "#313448"],
        pointBorderColor: "#4bc0c0",
        borderColor: '#4bc0c0',
        borderWidth: 2,
        showLine: true,
      }]
    },
    options: {
      elements: {
        center: {
          text: 100*(data2[0]/(data2[1]+data2[0]))+"%",
          sidePadding: 60,
          color: '#5cb85c'
        }
      }
    }



  });

var data3 = [{'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 1.0, 'y': 141.0, 'x': 0.5}], 'label': ['Way of the Mono Trail 2019-08-10']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 7.5, 'y': 948.0, 'x': 2.1}], 'label': ['Columbia Rock Trail 2019-12-28']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 9.0, 'y': 1541.0, 'x': 6.1}], 'label': ['Sanborn Trail 2020-06-20']}, {'backgroundColor': 'rgb(75, 192, 192)', 'data': [{'r': 17.75, 'y': 1260.0, 'x': 14.1}], 'label': ['Bridge Creek Trail to Maple Falls 2020-06-27']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 2.8, 'y': 256.0, 'x': 1.8}], 'label': ['Coal Creek Double Loop 2020-07-11']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 5.15, 'y': 1204.0, 'x': 3.9}], 'label': ['Bishop Peak 2020-07-18']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 5.0, 'y': 525.0, 'x': 4.3}], 'label': ['Zinfandel Trail 2020-07-25']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 7.15, 'y': 1283.0, 'x': 5.0}], 'label': ['San Andreas Trail to Peterson Memorial Trail 2020-08-08']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 5.05, 'y': 755.0, 'x': 3.3}], 'label': ['Lookout, Redwood, Orchard, Creek Trails 2020-08-15']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 4.15, 'y': 390.0, 'x': 2.3}], 'label': ['Angel Falls via Willow Creek Trail 2020-08-21']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 0.65, 'y': 141.0, 'x': 0.5}], 'label': ['Way of the Mono Trail 2020-08-22']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 1.45, 'y': 194.0, 'x': 1.2}], 'label': ['Creekside Trail 2020-08-30']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 5.05, 'y': 640.0, 'x': 4.1}], 'label': ['East Avenue and Ward Creek Trail Loop 2020-09-07']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 4.65, 'y': 486.0, 'x': 3.7}], 'label': ['The Chris Loop @ Mt. Madonna County Park 2020-09-19']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 5.5, 'y': 633.0, 'x': 5.2}], 'label': ['High Meadow Loop via Lower Meadow Trail 2020-09-26']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 7.3, 'y': 810.0, 'x': 6.6}], 'label': ['Bridge Creek Trail to Maple Falls 2020-10-03']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 4.7, 'y': 781.0, 'x': 4.7}], 'label': ['Alum Rock South Rim Trail 2020-10-11']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 2.8, 'y': 634.0, 'x': 2.8}], 'label': ['Summit Rock Loop Trail 2020-10-18']}, {'backgroundColor': 'rgb(75, 192, 192)', 'data': [{'r': 8.25, 'y': 1860.0, 'x': 7.8}], 'label': ['Sanborn Trail 2020-10-24']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 3.15, 'y': 614.0, 'x': 3.3}], 'label': ['Alum Rock South Rim Trail Reduced 2020-11-01']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 6.2, 'y': 866.0, 'x': 5.9}], 'label': ['Senador Mine to Mine Hill Loop 2020-11-08']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 3.8, 'y': 623.0, 'x': 3.7}], 'label': ['Hacienda, Randol, and Buena Vista Trail Loop 2020-11-14']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 3.65, 'y': 692.0, 'x': 3.2}], 'label': ['Ridge Trail to Goat Rock Overlook, Emily Smith Observation Point, and Saratoga Gap Trail 2020-12-05']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 4.4, 'y': 659.0, 'x': 3.1}], 'label': ['Tahoe Rim Trail to Picnic Rock Viewpoint 2020-12-19']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 2.9, 'y': 449.0, 'x': 2.2}], 'label': ['Three Mile Trail Loop 2021-01-01']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 4.55, 'y': 509.0, 'x': 4.1}], 'label': ['Los Gatos Creek Trail to Jones Trail Loop 2021-01-16']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'r': 7.5, 'y': 550.0, 'x': 6.4}], 'label': ['Aptos Rancho Trail 2021-01-31']}]
  var labels3 = ['Way of the Mono Trail', 'Upper Yosemite Falls (half)', 'Sanborn Trail', 'Bridge Creek Trail to Maple Falls', 'Coal Creek Double Loop', 'Bishop Peak ', 'Zinfandel Trail', 'Saratoga Gap Trail and Ridge Trail Loop', 'San Andreas Trail to Peterson Memorial Trail', 'Lookout, Redwood, Orchard, Creek Trails', 'Angel Falls via Willow Creek Trail', 'Way of the Mono Trail', 'Creekside Trail', 'East Avenue and Ward Creek Trail Loop'];
  var Chart3 = document.getElementById('myChart3').getContext('2d');
  var chart = new Chart(Chart3, {
    axisY: {
      text: "Miles"
    },
    type: 'bubble',
    data: {
      datasets: data3
    },
    options: {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Elevation Gain"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Miles"
        }
      }]
    }
    }

  });

var labels5 = ['Aug-2019', 'Dec-2019', 'Jun-2020', 'Jul-2020', 'Aug-2020', 'Sep-2020', 'Oct-2020', 'Nov-2020', 'Dec-2020', 'Jan-2021']
var data5 = [0.5, 2.1, 20.2, 10.0, 12.3, 13.0, 21.9, 12.9, 6.3, 12.7]

  var Chart5 = document.getElementById('myChart5').getContext('2d');
  var chart = new Chart(Chart5, {
    axisY: {
      text: "Miles"
    },
    type: 'line',
    data: {
      labels: labels5 ,
      datasets: [{
        backgroundColor: '#4bc0c0',
        borderColor: 'rgb(255, 79, 116)',
        borderWidth: 2,
        pointBorderColor: false,
        data: data5,
        fill: false,
        lineTension: .4,
      }]
    },

   options: {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Miles"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Month"
        }
      }]
    }
    }
  });
var labels6 = ['Aug-2019', 'Dec-2019', 'Jun-2020', 'Jul-2020', 'Aug-2020', 'Sep-2020', 'Oct-2020', 'Nov-2020', 'Dec-2020', 'Jan-2021']
var data6 = [0.83, 0.81, 0.78, 0.77, 0.84, 0.79, 0.9, 0.86, 0.865, 0.78]

  var Chart6 = document.getElementById('myChart6').getContext('2d');
  var chart = new Chart(Chart6, {
    axisY: {
      text: "Output (Miles*Elevation Gain)"
    },
    type: 'bar',
    data: {
      labels: labels6 ,
      datasets: [{
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: '#4bc0c0',
        borderWidth: 2,
        pointBorderColor: false,
        data: data6,
        fill: false,
        lineTension: .4,
      }]
    },

   options: {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Efficiency"
        },
        ticks: {
                suggestedMin: 0.5
            }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Month"
        }
      }]
    }
    }
  });



});