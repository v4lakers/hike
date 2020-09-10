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
  Chart.defaults.global.defaultFontSize = 10; // Font size for every label

  // Chart.defaults.global.tooltips.backgroundColor = '#FFF'; // Tooltips background color
  Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
  Chart.defaults.global.legend.labels.padding = 0;
  Chart.defaults.scale.ticks.beginAtZero = true;
  Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
  Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';
  Chart.defaults.global.legend.display = false;

  var myChart = new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [{
        label: "Lost",
        fill: true,
        lineTension: 0,
        data: [50.2, 49.8],
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
          text: "Please Work",
          sidePadding: 60
        }
      }
    }



  });

  // Chart2Here
var labels2 = ['Aug-2019', 'Dec-2019', 'Jun-2020', 'Jul-2020', 'Aug-2020', 'Sep-2020']
var data2 = [0.5, 3.5, 20.2, 10.0, 15.9, 4.1]

  var Chart2 = document.getElementById('myChart2').getContext('2d');
  var chart = new Chart(Chart2, {
    axisY: {
      text: "Miles"
    },
    type: 'line',
    data: {
      labels: labels2 ,
      datasets: [{
        label: "2020",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 79, 116)',
        borderWidth: 2,
        pointBorderColor: false,
        data: data2,
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

var data3 = [{'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 20.0, 'y': 141.0, 'r': 0.5}], 'label': ['Way of the Mono Trail']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 150.0, 'y': 1500.0, 'r': 3.5}], 'label': ['Upper Yosemite Falls (half)']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 180.0, 'y': 1541.0, 'r': 6.1}], 'label': ['Sanborn Trail']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 355.0, 'y': 1260.0, 'r': 14.1}], 'label': ['Bridge Creek Trail to Maple Falls']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 56.0, 'y': 256.0, 'r': 1.8}], 'label': ['Coal Creek Double Loop']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 103.0, 'y': 1204.0, 'r': 3.9}], 'label': ['Bishop Peak ']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 100.0, 'y': 525.0, 'r': 4.3}], 'label': ['Zinfandel Trail']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 128.0, 'y': 771.0, 'r': 3.6}], 'label': ['Saratoga Gap Trail and Ridge Trail Loop']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 143.0, 'y': 1283.0, 'r': 5.0}], 'label': ['San Andreas Trail to Peterson Memorial Trail']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 101.0, 'y': 755.0, 'r': 3.3}], 'label': ['Lookout, Redwood, Orchard, Creek Trails']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 83.0, 'y': 390.0, 'r': 2.3}], 'label': ['Angel Falls via Willow Creek Trail']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 13.0, 'y': 141.0, 'r': 0.5}], 'label': ['Way of the Mono Trail']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 29.0, 'y': 194.0, 'r': 1.2}], 'label': ['Creekside Trail']}, {'backgroundColor': 'rgb(255, 99, 132)', 'data': [{'x': 101.0, 'y': 640.0, 'r': 4.1}], 'label': ['East Avenue and Ward Creek Trail Loop']}]
  var labels3 = ['Way of the Mono Trail', 'Upper Yosemite Falls (half)', 'Sanborn Trail', 'Bridge Creek Trail to Maple Falls', 'Coal Creek Double Loop', 'Bishop Peak ', 'Zinfandel Trail', 'Saratoga Gap Trail and Ridge Trail Loop', 'San Andreas Trail to Peterson Memorial Trail', 'Lookout, Redwood, Orchard, Creek Trails', 'Angel Falls via Willow Creek Trail', 'Way of the Mono Trail', 'Creekside Trail', 'East Avenue and Ward Creek Trail Loop']
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
          labelString: "Time"
        }
      }]
    }
    }

  });

});