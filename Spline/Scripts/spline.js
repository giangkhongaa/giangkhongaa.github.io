var CanvasChart = function () {//module pattern
    var ctx;
    var margin = { top: 40, left: 75, right: 0, bottom: 75 };
    var chartHeight, chartWidth, yMax, xMax, data;
    var maxYValue = 0;
    var ratio = 0;
    var renderType = { lines: 'lines', points: 'points' };
	
	
	// khoi tao gia tri, truyen data 
	var render = function(canvasId, dataObj) {
        data = dataObj;
        var canvas = document.getElementById(canvasId);
        chartHeight = canvas.getAttribute('height');
        chartWidth = canvas.getAttribute('width');
        xMax = chartWidth - (margin.left + margin.right);
        yMax = chartHeight - (margin.top + margin.bottom);
        //ratio = yMax / maxYValue;
        ctx = canvas.getContext("2d");
        renderChart(); 
    };
	
	var renderChart = function () {
        renderText(); //su ly Text
        renderLinesAndLabels();//su ly background
		
    };
	// get max data 
	
	
	var renderText = function() {
        var labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';// kiem tra gia tri lable font có bị null		
        ctx.font = labelFont; // gan gia tri ctx bang labelFont
        ctx.textAlign = "center"; // cho cu canh giua

        //Title
        var txtSize = ctx.measureText(data.title); // chieu dai và chieu cong cua chu
		ctx.strokeStyle = "#00aeef";
        ctx.fillText(data.title, (chartWidth / 2), (margin.top / 2));// write

        //X-axis text
        txtSize = ctx.measureText(data.xLabel);
		ctx.strokeStyle = "#00aeef";// chieu dai và chieu cong cua chu
        ctx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));

        //Y-axis text
        ctx.save();
		ctx.strokeStyle = "#00aeef";
        ctx.rotate(-Math.PI / 2); // quay chu
        ctx.font = labelFont;// font chu
        ctx.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
        ctx.restore();
    };
	
	var renderLinesAndLabels = function () {
		
		// hien thi cac quy trong nam 
		var elementX = margin.left - 10; // toa do x  cua nhung con so tren truc Y
		var augmentY = 0; // khoang cach 2 diem tren truc y
		var augmentX = 30; // khoang cach 2 diem tren truc X
		for (var i = 0; i< 5; i++) {
			// in ra ca quy trong nam
			//yMax - augmentY toa y cac so
            ctx.fillText(i, elementX, yMax - augmentY);
			// ve duong ke ngay
			drawLine(margin.left, yMax - augmentY, xMax, yMax - augmentY, '#f4f3f1',1);
			augmentY+= 50;		
		}
		
		for (var j = 0; j < data.dataPoints.length; j++) {
			var txt = data.dataPoints[j].y;
			ctx.fillText(txt, margin.left + augmentX, yMax + 20);
			augmentX += 60;
		}
			
        //Vertical line
        drawLine(margin.left, margin.top, margin.left, yMax, '#00aeef',2);

        //Horizontal Line
        drawLine(margin.left, yMax, xMax, yMax, '#00aeef',2);
    };
		
	var drawLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
		ctx.strokeStyle = strokeStyle; // mau sac
        ctx.lineWidth = lineWidth; //do rong
        ctx.beginPath();
        ctx.moveTo(startX, startY);// start point
        ctx.lineTo(endX, endY);// end point
        ctx.stroke();
        ctx.closePath();
    };
	//test thu duong sin
	var drawSpline= function() {
		var xArray = [100,150,200,250,280,400];
		var yArray = [200,100,200,100,150,100];
		
		
		for (var i= 0;i<data.dataPoints.length - 1; i++) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#00aeef";
		ctx.beginPath();
		//var changeXStart = data.dataPoints[i].y * 50; // doi gia tri thuc sang toa do
		//var changeXEnd = data.dataPoints[i+1].y * 50;
		
		//var changeYEnd = data.dataPoints[i+1].x ;
		//ctx.moveTo(changeXStart, changeYStart);
		//ctx.moveTo(xArray[i], yArray[i]);
		var xBetween = (xArray[i+1] - xArray[i]) / 2; 	// toa do x tao do cong cua duong	
		ctx.bezierCurveTo(xArray[i] + xBetween, yArray[i], xArray[i+1] - xBetween , yArray[i+1], xArray[i+1], yArray[i+1]);
		//var xBetween = (changeXEnd - changeXStart) / 2; 	// toa do x tao do cong cua duong	
		//ctx.bezierCurveTo(changeXStart + xBetween, changeYStart,
						  //changeXEnd - xBetween ,  changeYEnd,
						  //changeXEnd,              changeYEnd);
		ctx.stroke();
		}
	}
	return {
        renderType: renderType,
        render: render,
		drawSpline: drawSpline
    };
}();