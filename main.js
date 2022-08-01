objects=[];
status="";
function setup()
{
canvas=createCanvas(480,380);
canvas.center();
video=createCapture(VIDEO);
video.size(480,380);
video.hide();
}
function start()
{
objectDetector=ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
objectName=document.getElementById("object_name").value;
}
function modelloaded()
{
console.log("Model is Loaded");
status=true;
}
function gotresults(error,results)
{
if(error)
{
console.error(error);
}
console.log(results);
objects=results;
}
function draw()
{
image(video,0,0,480,380);
if(status!="")
{
objectDetector.detect(video,gotresults);
for(i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="Status: Objects Detected";
fill(255,0,0);
percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
noFill();
stroke(255,0,0);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label==objectName)
{
objectDetector.detect(gotresults);
document.getElementById("status").innerHTML=objectName+" Found";
synth=window.speechSynthesis;
utterThis=new SpeechSynthesisUtterance(objectName+"Found");
synth.speak(utterThis);
}
else
{
document.getElementById("status").innerHTML=objectName+" Not Found";
}
}
}
}