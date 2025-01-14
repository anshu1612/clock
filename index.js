

function init(){
    setInterval(updateTime,1000);
    
}
function updateTime(){
    const date= new Date();
    const currTime=date.toLocaleTimeString();
    const currDate=date.toLocaleDateString('en-GB');
    document.getElementById("time").textContent=currTime;
    document.getElementById("date").textContent=currDate
}
init();