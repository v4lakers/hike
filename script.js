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

    // Configuration options
    options: {
        responsive: true,
        legend: {
            display: true,
        },

    },
    centerText: {
        display: true,
        text: "280",
        color: "#FFFFFF"
    }
  });

  var chart = document.getElementById('chart3');
  var myChart = new Chart(chart, {
    type: 'line',
    data: {
      labels: ["One", "Two", "Three", "Four", "Five", 'Six', "Seven", "Eight"],
      datasets: [{
        label: "Lost",
        fill: false,
        lineTension: .5,
        pointBorderColor: "transparent",
        pointColor: "white",
        borderColor: '#d9534f',
        borderWidth: 0,
        showLine: true,
        data: [0, 40, 10, 30, 10, 20, 15, 20],
        pointBackgroundColor: 'transparent',
      },{
        label: "Lost",
        fill: false,
        lineTension: .5,
        pointColor: "white",
        borderColor: '#5cb85c',
        borderWidth: 0,
        showLine: true,
        data: [40, 0, 20, 10, 25, 15, 30, 0],
        pointBackgroundColor: 'transparent',
      },
                 {
                   label: "Lost",
                   fill: false,
                   lineTension: .5,
                   pointColor: "white",
                   borderColor: '#f0ad4e',
                   borderWidth: 0,
                   showLine: true,
                   data: [10, 40, 20, 5, 35, 15, 35, 0],
                   pointBackgroundColor: 'transparent',
                 },
                 {
                   label: "Lost",
                   fill: false,
                   lineTension: .5,
                   pointColor: "white",
                   borderColor: '#337ab7',
                   borderWidth: 0,
                   showLine: true,
                   data: [0, 30, 10, 25, 10, 40, 20, 0],
                   pointBackgroundColor: 'transparent',
                 }]
    },
  });

});