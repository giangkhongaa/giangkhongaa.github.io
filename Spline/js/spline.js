/*
*
* author: GiangTT (fresher)
*
* Draw spline chart with data for the previous
*
* Written in the module pattern
*/
var SplineChart = function () {
    var context; //a drawing context on the canvas
    var canvas; // canvas
    var margin = { top: 50, left: 90, right: 40, bottom: 75 };
    var chartHeight; //height of canvas
    var chartWidth; // width of canvas
    var yMax; //the maximum value of the y axis
    var xMax; //the maximum value of the x axis
    var data; //receiving data transmitted from the outside
    var positionXArray = []; //array containing the x coordinate of the data point after switching to coordinate Cavas
    var positionYArray = []; //array containing the Y coordinate of the data point after switching to coordinate Cavas
    var splineStyle; // strokeStyle of spline
    var flag = false; //flag identification point has been executed or not
    var distanceElementY; //distance elements vertical axis
    var distanPointY; //distance elements on horizontal axis
    var hideComment; // display comment value true or false
    var distanceEleOnYAxic; // distance elements 1 or 1.5
    var numberEleOnYAxic; // number element on y axic
    /*
    * container fuctionc and initialization variable, It is called out of use.
    *
    * @param1 : id of canvas, @param2 : data transmitted from the outside
    */
    var draw = function (canvasId, dataObj) {
        data = dataObj;
        canvas = document.getElementById(canvasId);
        chartHeight = canvas.getAttribute('height');
        chartWidth = canvas.getAttribute('width');
        xMax = chartWidth - (margin.left + margin.right);
        yMax = chartHeight - (margin.top / 2 + margin.bottom);
        distanceEleOnYAxic = (data.distanceEleOnYAxic != null) ? data.distanceEleOnYAxic : 1;
        if (distanceEleOnYAxic === 1) {
            numberEleOnYAxic = data.maxNumberYAxic;
            distanceElementY = Math.floor((yMax - margin.top) / numberEleOnYAxic);//distance elements horizontal axis
        } else {
            numberEleOnYAxic = Math.ceil(data.maxNumberYAxic / 1.5);
            distanPointY = Math.floor((yMax - margin.top) / numberEleOnYAxic);//distance elements on horizontal axis
            distanceElementY = Math.floor((yMax - margin.top) / (numberEleOnYAxic * 1.5));//distance elements horizontal axis
        }
        splineStyle = (data.splineStyle != null) ? data.splineStyle : '#019ed5'; //if splineStyle null then receive the defaults       
        context = canvas.getContext("2d");
        hideComment = (data.hideComment != null) ? data.hideComment : 'false';
        //convert data point to the coordinates canvas (my function)
        formatDataPoint();
        //duties painted all on canvas	(my function)
        drawGenerality();
        //attaches event mousemove with showPoint(my fuction) display data point from the outside
        window.addEventListener('mousemove', showPoint, false);
    };

    var drawGenerality = function () {
        // execute function drawText (my function)
        drawText();

        var lineStyle = (data.lineStyle != null) ? data.lineStyle : '#f4f3f1';
        var elementX = margin.left - margin.left / 3; // The distance of the point on the X axis
        var augmentY = 0; // The distance jump of the point on the Y axis
        context.font = (data.axisYFont != null) ? data.axisYFont : "15px Arial";
        context.fillStyle = (data.axisYStyle != null) ? data.axisYStyle : "#000000";

        // the Y axis maximum value = maxNumberYAxis 
        for (var i = 0; i <= numberEleOnYAxic ; i++) {
            // display values on the y axis
            if (distanceEleOnYAxic === 1) {//case : 1
                context.fillText(i, elementX, yMax - augmentY);
                // Draw horizontal lines (my function)
                drawLine(margin.left - 10, yMax - augmentY, xMax, yMax - augmentY, lineStyle, 1);
                //Increase jump
                augmentY += distanceElementY;
            } else { //case: 1.5
                context.fillText(i * 1.5, elementX, yMax - augmentY);
                // Draw horizontal lines (my function)
                drawLine(margin.left - 10, yMax - augmentY, xMax, yMax - augmentY, lineStyle, 1);
                //Increase jump
                augmentY += distanPointY;
            }
            
        }

        // the Y axis dependent data point transmitted from the outside
        for (var i = 0; i < data.dataPoints.length; i++) {
            context.font = (data.axisXFont != null) ? data.axisXFont : "15px Arial";
            context.fillStyle = (data.axisXStyle != null) ? data.axisXStyle : "#000000";
            // display values on the X axis
            context.fillText(data.dataPoints[i].x, positionXArray[i], yMax + 20);
            // Style of Horizontal lines blur (should be fixed)
            context.fillStyle = '#655f5f';
            // display dots on the x axis 
            context.fillRect(positionXArray[i], yMax, 2, 4);
            // display point of data Point (my function)
            drawPoint(positionXArray[i], positionYArray[i], 3);
        }
        if (!hideComment) {
            // display comment (my function)
            drawComment();
        }
        //Vertical line
        //drawLine(margin.left, margin.top, margin.left, yMax, '#000000',1);

        //Horizontal Line (my function)
        drawLine(margin.left - 10, yMax, xMax, yMax, 'black', 1);
        // draw spine (my function)
        drawSpline(data.splineStyle, 3);
    };

    /*
    *
    * Display title, X-axis text, Y-axis text
    *
    */
    var drawText = function () {

        var labelXFont = (data.labelXFont != null) ? data.labelXFont : '15pt Myriad Pro'; // if labelFont  null then receive the defaults(X axic).
        var labelXStyle = (data.labelXStyle != null) ? data.labelXStyle : '#00aeef'; // if labelStyle  null then receive the defaults(X axic).
        var labelYFont = (data.labelYFont != null) ? data.labelYFont : '15pt Myriad Pro'; // if labelFont (outside) null then receive the defaults(Y axic).	   
        var labelYStyle = (data.labelYStyle != null) ? data.labelYStyle : '#00aeef'; // if labelStyle (outside) null then receive the defaults(Y axic).
        var titleFont = (data.titleFont != null) ? data.titleFont : '20pt Myriad Pro'; // if titleFont (outside) null then receive the defaults(title).
        var titleStyle = (data.titleStyle != null) ? data.titleStyle : '#000000'; // if titleStyle (outside) null then receive the defaults(title).
        context.textAlign = "center";

        //Title
        context.font = titleFont; //assigning titleFont give font titile
        context.fillStyle = titleStyle; //assigning titleFont give fillStyle titile
        var textSizeTitile = context.measureText(data.title).width; //width of title
        // display title
        context.fillText(data.title, chartWidth / 2, (margin.top - 22));// write

        //X-axis text
        context.save();
        context.font = labelXFont; //assigning titleFont give font X-axis text
        context.fillStyle = labelXStyle; //assigning titleFont give font X-axis text
        var textSizeYText = context.measureText(data.xLabel).width; //width of X-axis text
        // display title
        context.fillText(data.xLabel, (chartWidth - (margin.left + margin.right)) / 2 + (textSizeYText / 2), yMax + (margin.bottom / 1.3));

        //Y-axis text
        context.save();
        context.rotate(-Math.PI / 2); //rotate Y-axis text
        context.fillStyle = labelYStyle; //assigning titleFont give font Y-axis text
        context.font = labelYFont; //assigning titleFont give font Y-axis text
        // display title
        context.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
        context.restore();
    };

    /*
    *
    * Display comment
    *
    */
    var drawComment = function () {

        var xLableArray = data.yLabel.split(" "); //array conntainer value after cut X-axis text
        var positionXText = xMax + margin.right / 2 + 60; // position comment text
        var commentStyle = (data.commentStyle != null) ? data.commentStyle : '#000000'; // if commentStyle  null then receive the defaults.
        context.fillStyle = splineStyle; // assigning splineStyle
        // display line
        context.fillRect(xMax + margin.right / 2, margin.top, 35, 3);
        context.fillStyle = (data.commentStyle != null) ? data.commentStyle : "#000000";
        context.font = (data.commentFont != null) ? data.commentFont : '15pt Myriad Pro';
        for (var i = 0; i < xLableArray.length; i++) {
            //display value after  cut X-axis text
            context.fillText(xLableArray[i], positionXText, margin.top + i * 20 + 8);
        }
    };

    /*
    *
    * Display line
    *
    * @param1: double @param2: double @param3: double @param4: double @param5: '#xxxxxx'  @param6: double
    */
    var drawLine = function (startX, startY, endX, endY, strokeStyle, lineWidth) {

        context.strokeStyle = strokeStyle; // assigning strokeStyle
        context.lineWidth = lineWidth; //assigning lineWidth
        context.beginPath();
        context.moveTo(Math.round(startX), Math.round(startY));// start point
        context.lineTo(Math.round(endX), Math.round(endY));// end point
        context.stroke();
        context.closePath();
    };

    /*
    *
    * Display point with pointX: coordinates x, pointY: coordinates y, r: radius
    *
    * @param1: double @param2: double @param3: double 
    */
    var drawPoint = function (pointX, pointY, r) {
        context.beginPath();
        context.strokeStyle = splineStyle; //assigning strokeStyle = splineStyle
        context.fillStyle = splineStyle; // assigning  fillStyle = splineStyle
        //draw cricle
        context.arc(pointX, pointY, r, 0, 2 * Math.PI);
        // fill cricle
        context.fill();
        context.stroke();
    };

    /*
     *
    * convert data point to the coordinates canvas
    *
    */
    var formatDataPoint = function () {
        var augmentX = 0;// jumb ponit X-axis
        // compute distance between ponit X-axis
        var distanceX = ((xMax - (margin.left - 10)) / data.dataPoints.length);
        for (var i = 0; i < data.dataPoints.length; i++) {
            // change data point X from outside to X coordinates canvas
            var positionX = margin.left - 10 + augmentX + distanceX / 2;
            // increased jumb
            augmentX += distanceX;
            // change data point Y from outside to Y coordinates canvas
            var positionY = yMax - data.dataPoints[i].y * distanceElementY;
            // add an element to the array container X
            positionXArray.push(positionX);
            //add an element to the array container Y
            positionYArray.push(positionY);
        }
    };

    /*
    *
    * display spline with strokeStyle: color spline and lineWidth: width spline
    *
    * idea: Bezier curves combined together
    *
    * @param1: '#xxxxxx' @param2: double
    */
    var drawSpline = function (strokeStyle, lineWidth) {
        context.lineWidth = lineWidth; //assigning lineWidth = lineWidth(outside)
        context.strokeStyle = splineStyle; //assigning strokeStyle = splineStyle(outside)
        for (var i = 0; i < data.dataPoints.length - 1; i++) {
            context.beginPath();
            // Point start
            context.moveTo(positionXArray[i], positionYArray[i]);
            // Value decide curvature of the spline
            var flexureX = (positionXArray[i + 1] - positionXArray[i]) / 3;
            var flexureY = (positionYArray[i + 1] - positionYArray[i]) / 2;

            if (i === 0) { // draw Bezier curves first
                context.bezierCurveTo(positionXArray[i] + flexureX, positionYArray[i] + flexureY,
                                positionXArray[i + 1] - flexureX, positionYArray[i + 1],
                                positionXArray[i + 1], positionYArray[i + 1]);
            } else if (i === data.dataPoints.length - 2) { // draw Bezier curves end
                context.bezierCurveTo(positionXArray[i] + flexureX, positionYArray[i],
                              positionXArray[i + 1] - flexureX, positionYArray[i + 1] - flexureY,
                              positionXArray[i + 1], positionYArray[i + 1]);
            } else { // draw Bezier curves other
                context.bezierCurveTo(positionXArray[i] + flexureX, positionYArray[i],
                              positionXArray[i + 1] - flexureX, positionYArray[i + 1],
                              positionXArray[i + 1], positionYArray[i + 1]);
            }
            context.stroke();
        }
    };

    /*
    *
    * display value data point when move the mouse to point
    *
    */
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
        draw: draw
    };
}();