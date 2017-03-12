months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
function loadMonth() {
	var date=new Date();// lay ngay hien tai
	var monthCuren=date.getMonth(); //lay thang hien tai
	for(i = 0;  i < months.length;  i++) {
		if (i==monthCuren) {
			document.getElementById("selectMonth").innerHTML +="<option  selected='selected'  value='"+(i+1)+"' >"+months[i]+"</option>";
		} else {	
		document.getElementById("selectMonth").innerHTML +="<option  value='"+(i+1)+"'>"+months[i]+"</option>";
		} 
	}
}
function loadYear() 
{
	var date=new Date();// lay ngay hien tai
	var yearCuren=date.getFullYear(); //lay nam hien tai
	// duyet nam tu @1990 toi ngay toi thoi h???n
	for(i=1900; i<2031;i++) {
		if (i==yearCuren) {
			document.getElementById("selectYear").innerHTML +="<option  selected='selected'  value='"+i+"' >"+i+"</option>";
		} else {	
		document.getElementById("selectYear").innerHTML +="<option  value='"+i+"'>"+i+"</option>";
		}
	}
		
}
function namNhuan(year)
{
	if(((year %4 == 0)&&(year %100 ==0)) || (year % 400==0)) {
		return true;
	} else {
		return false;
	}		
}
function dayInMonth(month, year)
{
	if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12) {
		return 31;
	}
	if(month==4 || month==6 || month==9 || month==11) {
		return 30;	
	}
	if(month==2) {
		if(namNhuan(year)) {
			return 29;
		} else {
			return 28;
		}
	}
}
function loadDay() 
{
	document.getElementById("days").innerHTML="";
	var month = document.getElementById("selectMonth").value;
	var year=document.getElementById("selectYear").value;
	var date = new Date(year,month,1);// lay ngay dau tien cua thang
	var day=date.getDay()+5;// fomat ngay
	if (day > 8)
		day-=7;
	//tao khoang trong cho ngay khong phai cua thang
	for(i=1;i<day;i++) {
		document.getElementById("days").innerHTML+="<div class='cell color_bg-block'></div>"
	}
	var num_day = dayInMonth(month,year);//so ngay cua thang
	var dayCuren = new Date();// ngay hien tai
	var datecurr = dayCuren.getDate();//lay ngay hien tai
	// ve so ngay cua thang
	for(i= 1;i<num_day+1;i++) {		
		if(i==datecurr) {
			document.getElementById("days").innerHTML+="<div class='cell color_bg-curr' onclick='selectDay("+i+")' id='"+i+"'>"+i+"</div>";
		} else {
			document.getElementById("days").innerHTML+="<div class='cell' onclick='selectDay("+i+") 'id='"+i+"'>"+i+"</div>";
		}
	}
	// ve so ngay thua 
	for(i=day+num_day;i<43;i++) {
		document.getElementById("days").innerHTML+="<div class='cell color_bg-block'></div>"
	}	
}
function prevMonth()
{
	var monthEle = document.getElementById("selectMonth");// nam hien t?i
	var monthIndex = document.getElementById("selectMonth").value-1;// thang tr??c
	if(monthIndex > 0) {		
		monthEle.value=monthIndex;
		loadDay();
	}
}
function nextMonth()
{	
	var next_monthEle=document.getElementById("selectMonth");
	var next_monthIndex=parseInt(document.getElementById("selectMonth").value)+1;
	if(next_monthIndex<13) {		
		next_monthEle.value=next_monthIndex;
		loadDay();
	}
}
function prevYear()
{
	var yearEle=document.getElementById("selectYear");
	var yearIndex=document.getElementById("selectYear").value-1;
	if(yearIndex>1990) {		
		yearEle.value=yearIndex;
		loadDay();
	}
}
function nextYear()
{
	var yearEle=document.getElementById("selectYear");
	var yearIndex=parseInt(document.getElementById("selectYear").value)+1;
	if(yearIndex<2031) {		
		yearEle.value=yearIndex;
		loadDay();
	}
}
function selectDay(id) 
{
	var mon=document.getElementById("selectMonth").value;
	var year=document.getElementById("selectYear").value;
	document.getElementById("date-output").value=id+"/"+mon+"/"+year;
	document.getElementById("calendar").style.display='none';
}
function onClickCalendar() 
{
	loadYear();
	loadMonth();
	loadDay();
	var date= new Date();
	document.getElementById("date-output").value=date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear();
	document.getElementById("calendar").style.display='block';
	
} 