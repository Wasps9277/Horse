var interval;
var initialPosition;
var position;
var amount;
var fund;
var bet;
var pos;
var enter;
//generates random number
function drawRandom(max){
	var random=Math.ceil(Math.random()*max);
	return random;//returns the generated random number
}
function gamble(){
	
	var horse=[];
	fund=parseInt(document.getElementById('funds').innerHTML);//gets the value of the funds and converts into the value to integer
	amount=document.getElementById('amount').value;//gets the input value of the amount
	bet=document.getElementById('bethorse').value;//gets the selected value of the bet horse
	var element=document.getElementsByClassName('horse standRight');
	/*for(var i=0;i<element.length;i++){
		var odds=drawRandom(5);
		horse[i+1]=odds;
	}*/
	if(bet===pos){
		document.getElementById('funds').innerHTML=fund+(parseInt(amount)*enter);//if the bet horse wins the race the bet amount is added to the fund
	}
	else{
		document.getElementById('funds').innerHTML=fund-(amount*enter);//if the bet horse lose the race the bet amount is subtracted from the funds
	}
}
//function to declare the final result of the race
function declareResult(){
	position=1;
	var result=document.getElementsByClassName('horse standRight');
	var greatest=result[0].offsetLeft;
	for(var i=0;i<result.length;++i){
			if(result[i].offsetLeft>greatest){
				greatest=result[i].offsetLeft;
				position=i+1;	
			}		
	}
	pos="horse"+position;
	var wins=" wins";
	alert(pos+wins);
	gamble();

}
//function to move the horse in upward direction
function moveUp(){
	var element=document.getElementsByClassName('horse standRight');// gets the class name
	var height=window.innerHeight;//calculates the height of the window and assigns it to the variable height
	for(var i=0;i<element.length;i++){
		var up=element[i].offsetTop;//calculates the position of the horse from the top of the window
		element[i].className='horse standRight runUp';//adds the animation to the horse in the direction it is moving
		var random=drawRandom(5);//calls the random generating function
		element[i].style.top=up-random+'px';//allows the horse to move in upward direction
		if(up>(height*0.008)&&up<(height*0.018)){//condition check for the turning of the horse
			var randomNum=Math.floor(Math.random() * 5)+2;//generates random number between 2 and 5
			element[i].style.top=up-randomNum+'px';
			clearInterval(interval);//clears the previous set interval
			interval=setInterval(function(){//sets the interval and passes the control to move the horse in east direction
				var element=document.getElementsByClassName('horse standRight');
		var width=window.innerWidth;
		for(var i=0;i<element.length;i++){
		 	right=element[i].offsetLeft;//gets the position of the horse from the left of the window
			element[i].className='horse standRight runRight';//adds the animation to the horse in the direction it is moving
			var random=drawRandom(5);
			element[i].style.left=right+random+'px';
			if(right==initialPosition){
				element[i].style.left+=random+'px';
				element[i].className='horse standRight';
				clearInterval(interval);
				declareResult();
			}
	}},20);
		}
	}
}
function moveLeft(){
	var element=document.getElementsByClassName('horse standRight');
	var width=window.innerWidth;
	for(var i=0;i<element.length;i++){
		var left=element[i].offsetLeft;
		element[i].className='horse standRight runLeft';
		var random=drawRandom(5);
		element[i].style.left=left-random+'px';
		if(left>(width*0.008)&&left<(width*0.018)){
			var randomNum=Math.floor(Math.random() * 5)+2;
			element[i].style.left=left-randomNum+'px';
			clearInterval(interval);
			interval=setInterval(moveUp,20);
		}
	}
}
function moveDown(){
	var element=document.getElementsByClassName('horse standRight');
	var height=window.innerHeight;
	for(var i=0;i<element.length;i++){
		var down=element[i].offsetTop;
		element[i].className='horse standRight runDown';
		var random=drawRandom(5);
		element[i].style.top=down+random+'px';
		if(down>(height*0.78)&&down<(height*0.88)){
			var randomNum=Math.floor(Math.random() * 3)+2;
			element[i].style.top=down+randomNum+'px';
			clearInterval(interval);
			interval=setInterval(moveLeft,20);
		}
	}
}
function moveHorse(){
	var element=document.getElementsByClassName('horse standRight');
	var width=window.innerWidth;
	for(var i=0;i<element.length;i++){
		 right=element[i].offsetLeft;
		element[i].className='horse standRight runRight';
		var random=drawRandom(5);
		element[i].style.left=right+random+'px';
		if(element[i].offsetLeft>(width*0.78)&&element[i].offsetLeft<(width*0.88)){
			var randomNum=Math.floor(Math.random() * 3)+2;
			element[i].style.left+=randomNum+'px';
			clearInterval(interval);
			interval=setInterval(moveDown,20);
		}
	}
}
function initiateInterval(){
	var element=document.getElementsByClassName('horse standRight');
	var start=document.getElementById('startline');
	initialPosition=start.offsetLeft;
	interval=setInterval(moveHorse,20);
}
function check(){
	fund=parseInt(document.getElementById('funds').innerHTML);
	amount=document.getElementById('amount').value;
	bet=document.getElementById('bethorse').value;
	if(amount<=fund && amount!=0){
	enter=parseInt(prompt('Enter the odds'));
	if((enter*amount)>fund){
		alert('Enter valid odds value');	
}
else{
	initiateInterval();
}
}
else{
	alert('Please enter valid bet amount');
}
}
function callMain(){
	var element=document.getElementById('start');
	element.addEventListener('click',check);
}
document.addEventListener('DOMContentLoaded',callMain);