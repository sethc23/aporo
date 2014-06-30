$(document).ready(function(){
      $('.imgMarker').live('touchstart',function(){		
		InstaPark.ParkingLocationId=$(this).attr('id');
		Ext.getCmp("TabsView").setActiveItem(Ext.getCmp("SubMainView"));	
		Ext.getCmp("SubMainView").setActiveItem(Ext.getCmp("ConfirmationTab1"));
		InstaPark.ConfirmationController.GetConfirmedParkingData();
		
	  });
	  
	 	  
	   $('.clsSelectField').live('touchstart',function(){
			Ext.getCmp('fldVehicleHeight').blur();
			Ext.getCmp('fldPrice').blur();
			  $('.clsTextinput').blur();
		});
		
		
	  $('.CheckBoxUnCheck').live('click touchstart',function(){
		//   alert(this.id);
		  $('#'+this.id).removeClass("CheckBoxUnCheck").addClass("CheckBoxCheck");
		//  $('.CheckBoxUnCheck').addClass( CheckBoxCheck );
		});
       $('.CheckBoxCheck').live('click touchstart',function(){
		  //alert(this.id);
		  $('#'+this.id).removeClass("CheckBoxCheck").addClass("CheckBoxUnCheck");
		//  $('.CheckBoxUnCheck').addClass( CheckBoxCheck );
		});
		
		///Search Screen Parking Address Textfield/
});

function GetDayName()
{
	var d = new Date();
	var weekday=new Array(7);
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
	return weekday[d.getDay()];
}

function TodayDateTime()
{
	var today=new Date();
	var hh=today.getHours().toString();
	var mm=today.getMinutes().toString();
	
	if(hh.length == 1)
	{
		hh='0'+hh;
	}
	if(mm.length==1)
	{
		mm='0'+mm;
	}
	var time = hh+':'+mm;
	return time;
}

function startTime()
{
	var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	// add a zero in front of numbers<10
	m=checkTime(m);
	s=checkTime(s);
	//document.getElementById('txtClock').innerHTML=h+":"+m+":"+s;
	t=setTimeout(function(){startTime()},500);
}

function checkTime(i)
{
	if (i<10)
	  {
	  i="0" + i;
	  }
	return i;
}

//Timer Functions Start

function CreateTimer(Time) {
	var Start_Date = new Date( InstaPark.StartDate);
	var End_Date = new Date( InstaPark.EndDate);		
	
	ParkingStartDate = new Date(Start_Date.getFullYear()+'/'+ Start_Date.getMonth()+'/'+Start_Date.getDate() +' '+InstaPark.StartTime);	
	ParkingEndDate = new Date(End_Date.getFullYear()+'/'+ End_Date.getMonth()+'/'+End_Date.getDate() +' '+InstaPark.EndTime);
	
	var diff = Math.abs(ParkingStartDate - ParkingEndDate);
	var minutes = Math.floor(diff/1000);
	//alert('minutes       '+ minutes);	
	TotalSeconds = minutes;
	
	Tick();
}

var TotalSeconds;
var Timer=0;
function Tick(){
		if (this.TotalSeconds <= 0) {
				//alert("Time's up!")
				return;
		}
		this.TotalSeconds -= 1;
		this.UpdateTimer()
		window.setTimeout("Tick()", 1000);
}
 function UpdateTimer()
 {
	var Seconds = this.TotalSeconds;					
	var Days = Math.floor(Seconds / 86400);
	Seconds -= Days * 86400;

	var Hours = Math.floor(Seconds / 3600);
	Seconds -= Hours * (3600);

	var Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);

	var TimeStr = ((Days > 0) ? Days + " days " : "") + this.LeadingZero(Hours) + ":" + this.LeadingZero(Minutes) + ":" + this.LeadingZero(Seconds)
	document.getElementById('txtClock').innerHTML = TimeStr;
}
function LeadingZero(Time){	
	return (Time < 10) ? "0" + Time : + Time;
}


//Timer Functions Ends




