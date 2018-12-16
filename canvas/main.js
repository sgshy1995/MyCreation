var yyy = document.getElementById("xxx");
var context = yyy.getContext("2d");
var lineWidth = 3;

autoSetCanvasSize(yyy);

listenToUser(yyy);

var eraserEnabled = false;
pen.onclick = function() {
  eraserEnabled = false;
  pen.classList.add("active");
  eraser.classList.remove("active");
};
eraser.onclick = function() {
  eraserEnabled = true;
  eraser.classList.add("active");
  pen.classList.remove("active");
};

red.onclick = function() {
  context.fillStyle = "red";
  context.strokeStyle = "red";
  red.classList.add("active");
  wheat.classList.remove("active");
  blue.classList.remove("active");
  yellow.classList.remove("active");
  green.classList.remove("active");
  pink.classList.remove("active");
  purple.classList.remove("active");
  black.classList.remove("active");
};
wheat.onclick = function() {
  context.fillStyle = "wheat";
  context.strokeStyle = "wheat";
  wheat.classList.add("active");
  red.classList.remove("active");
  blue.classList.remove("active");
  yellow.classList.remove("active");
  green.classList.remove("active");
  pink.classList.remove("active");
  purple.classList.remove("active");
  black.classList.remove("active");
};
blue.onclick = function() {
  context.fillStyle = "blue";
  context.strokeStyle = "blue";
  blue.classList.add("active");
  wheat.classList.remove("active");
  red.classList.remove("active");
  yellow.classList.remove("active");
  green.classList.remove("active");
  pink.classList.remove("active");
  purple.classList.remove("active");
  black.classList.remove("active");
};
yellow.onclick = function() {
  context.fillStyle = "yellow";
  context.strokeStyle = "yellow";
  yellow.classList.add("active");
  wheat.classList.remove("active");
  blue.classList.remove("active");
  red.classList.remove("active");
  green.classList.remove("active");
  pink.classList.remove("active");
  purple.classList.remove("active");
  black.classList.remove("active");
};
green.onclick = function() {
  context.fillStyle = "green";
  context.strokeStyle = "green";
  green.classList.add("active");
  wheat.classList.remove("active");
  blue.classList.remove("active");
  yellow.classList.remove("active");
  red.classList.remove("active");
  pink.classList.remove("active");
  purple.classList.remove("active");
  black.classList.remove("active");
};
pink.onclick = function() {
  context.fillStyle = "pink";
  context.strokeStyle = "pink";
  pink.classList.add("active");
  wheat.classList.remove("active");
  blue.classList.remove("active");
  yellow.classList.remove("active");
  green.classList.remove("active");
  red.classList.remove("active");
  purple.classList.remove("active");
  black.classList.remove("active");
};
purple.onclick = function() {
  context.fillStyle = "purple";
  context.strokeStyle = "purple";
  purple.classList.add("active");
  wheat.classList.remove("active");
  blue.classList.remove("active");
  yellow.classList.remove("active");
  green.classList.remove("active");
  pink.classList.remove("active");
  red.classList.remove("active");
  black.classList.remove("active");
};
black.onclick = function() {
  context.fillStyle = "black";
  context.strokeStyle = "black";
  black.classList.add("active");
  wheat.classList.remove("active");
  blue.classList.remove("active");
  yellow.classList.remove("active");
  green.classList.remove("active");
  pink.classList.remove("active");
  red.classList.remove("active");
  purple.classList.remove("active");
};

weightOne.onclick = function() {
  lineWidth = 1;
  weightOne.classList.add("active");
  weightTwo.classList.remove("active");
  weightThree.classList.remove("active");
  weightFour.classList.remove("active");
  weightFive.classList.remove("active");
};
weightTwo.onclick = function() {
  lineWidth = 2;
  weightTwo.classList.add("active");
  weightOne.classList.remove("active");
  weightThree.classList.remove("active");
  weightFour.classList.remove("active");
  weightFive.classList.remove("active");
};
weightThree.onclick = function() {
  lineWidth = 3;
  weightThree.classList.add("active");
  weightTwo.classList.remove("active");
  weightOne.classList.remove("active");
  weightFour.classList.remove("active");
  weightFive.classList.remove("active");
};
weightFour.onclick = function() {
  lineWidth = 4;
  weightFour.classList.add("active");
  weightTwo.classList.remove("active");
  weightThree.classList.remove("active");
  weightOne.classList.remove("active");
  weightFive.classList.remove("active");
};
weightFive.onclick = function() {
  lineWidth = 5;
  weightFive.classList.add("active");
  weightTwo.classList.remove("active");
  weightThree.classList.remove("active");
  weightFour.classList.remove("active");
  weightOne.classList.remove("active");
};

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = function() {
    setCanvasSize();
  };

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function drawCircle(x, y, radius) {
  context.beginPath();
  //context.fillStyle = "black";
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  //context.strokeStyle = "black";
  context.moveTo(x1, y1); // 起点
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2); // 终点
  context.stroke();
  context.closePath();
}

function listenToUser(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };

  if (document.body.ontouchstart !== undefined) {
    //说明是触屏设备

    canvas.ontouchstart = function(aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };

    canvas.ontouchmove = function(aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = {
          x: x,
          y: y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };

    canvas.ontouchend = function(aaa) {
      using = false;
    };
  } else {
    //说明是非触屏设备

    canvas.onmousedown = function(aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };

    canvas.onmousemove = function(aaa) {
      var x = aaa.clientX;
      var y = aaa.clientY;

      if (!using) {
        return;
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        var newPoint = {
          x: x,
          y: y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };

    canvas.onmouseup = function(aaa) {
      using = false;
    };
  }
}
