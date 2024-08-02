var count = 0; 
var hr = 0; 
var min= 0; 
var sec= 0; 

  
function start(){
    timer = true; 
    stopWatch(); 
}

function stop(){
    timer = false;
}

function reset(){
    timer = false; 
    hr = 0; 
    min = 0; 
    sec = 0; 
    count = 0; 
    document.getElementById('hour').innerHTML = "00"; 
    document.getElementById('min').innerHTML = "00"; 
    document.getElementById('sec').innerHTML = "00";
    document.getElementById("lapitems").innerHTML="";
}

var i=1;
function lap(){
    var newele= document.getElementById("lapitems");
    const row1=document.createElement('h3');
    var hr1 = hr; 
        var min1 = min; 
        var sec1= sec; 
  
        if (hr < 10) { 
            hr1 = "0" + hr1; 
        } 
  
        if (min < 10) { 
            min1 = "0" + min1; 
        } 
  
        if (sec < 10) { 
            sec1 = "0" + sec1; 
        } 
    row1.innerHTML=`lap ${i} - ${hr1}:${min1}:${sec1}`;
    newele.appendChild(row1);
    i++;
}


function stopWatch() { 
    if (timer) { 
        count++; 
  
        if (count == 100) { 
            sec++; 
            count = 0; 
        } 
  
        if (sec == 60) { 
            min++; 
            sec = 0; 
        } 
  
        if (min == 60) { 
            hr++; 
            min = 0; 
            sec = 0; 
        } 
  
        var hr1 = hr; 
        var min1 = min; 
        var sec1= sec; 
  
        if (hr < 10) { 
            hr1 = "0" + hr1; 
        } 
  
        if (min < 10) { 
            min1 = "0" + min1; 
        } 
  
        if (sec < 10) { 
            sec1 = "0" + sec1; 
        } 
  
        document.getElementById('hour').innerHTML = hr1; 
        document.getElementById('min').innerHTML = min1; 
        document.getElementById('sec').innerHTML = sec1; 

        setTimeout(stopWatch, 10); 
    } 
}
