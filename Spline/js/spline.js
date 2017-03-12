/*
*
* author: GiangTT (fresher)
*
* Draw spline chart with data for the previous
*
* Written in the module pattern
*/
var SplineChart = function () {
	var canvas;
	var context;
    function create(idCanvas) {
		var canvas = document.getElementById(idCanvas);
		var content = canvas.getContext("2d");
		drawScene();
	}
	function drawScene() {
		
	window.onload = function() {
    var img ="images\Under-The-Sea.jpg";
    contenxt.drawImage(img, 0, 0);
}
	}
    function showPoint(e) {
        var pos = getMousePos(canvas, e); // get mouse coordinates on canvas
        var posX = pos.x; //X coordinates
        var posY = pos.y; //Y coordinates
        for (var i = 0; i < positionXArray.length; i++) {
            //if the mouse is located near by Point and status of the points that have not been selected
            if ((posX <= positionXArray[i] + 15) && (posX >= positionXArray[i] - 15) && (posY <= positionYArray[i] + 15) && (posY >= positionYArray[i] - 15) && !flag) {
                // display value data point from the outside
                var valuePoint = data.dataPoints[i].x + " : " + data.dataPoints[i].y;
                context.beginPath();
                // widh rectangle display container valuePoint
                context.lineWidth = "2";
                // color rectangle
                context.strokeStyle = splineStyle;
                // display rectangle
                context.rect(positionXArray[i] - 25, positionYArray[i] - 40, 50, 30);
                // background rectangle
                context.fillStyle = "#f6f6f6";
                // fill rectangle
                context.fill();
                context.stroke();
                // color text display valuePoint
                context.fillStyle = "#032538";
                // font text display valuePoint
                context.font = "10pt  Myriad Pro";
                // display text
                context.fillText(valuePoint, positionXArray[i], positionYArray[i] - 20);
                // redraw larger radius points
                drawPoint(positionXArray[i], positionYArray[i], 4);
                // have point selected 
                flag = true;
                break;
            }
            else if (flag) { //the mouse beyond point and have point selected
                // no points are selected
                flag = false;
                // redraw canvas with color white
                context.fillStyle = '#FFFFFF';
                // redraw canvas with rectangle width, height by width, height of canvas
                context.fillRect(0, 0, chartWidth, chartHeight);
                // redraw 
                drawGenerality();
            }



        }
    };
    /*
    *
    * get mouse coordinates on canvas
    *
    */
    function getMousePos(canvas, evt) {
        //returns a rectangle which encloses the element. The rectangle is given as an object with properties top, left, right, bottom.
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width, //mouse x coordinates on canvas
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height //mouse y coordinates on canvas
        };
    };
    //All the functions are return then use outside call.
    return {
        create: create
    };
}();