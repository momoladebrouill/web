let canvas = document.getElementById("can");
let context = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
let ratio = window.devicePixelRatio;
canvas.width = W*ratio;
canvas.height = H*ratio;
canvas.style.width = W + "px";
canvas.style.height = H + "px";
context.scale(ratio,ratio);
context.shadowBlur=50

document.addEventListener("wheel",scroll,false);
function scroll(e) {
	let val=Math.sign(e.deltaY)
	for (var i = bulles.length - 1; i >= 0; i--) {
		bulles[i].vec[1]-=val
	}
	bulles.push(new Circle(indexBul))
	indexBul++
}
class Circle{
	constructor(ind){
		this.pos=ind
		this.x=Math.random()*W
		this.y=Math.random()*H
		this.vec=[(Math.random()-.5)*2*10,(Math.random()-.5)*2*10]
		this.ray=Math.random()*50
		this.color="hsl("+Math.random()*360+",100%,50%)"
	}
	move(){
		this.x+=this.vec[0]
		if(this.x>W || this.x<0){
			this.vec[0]*=-1
			this.x+=this.vec[0]
			if(this.x>W || this.x<0){
				this.remove()
			}
		}
		this.y+=this.vec[1]
		if(this.y>H || this.y<0){
			this.vec[1]*=-1
			this.y+=this.vec[1]
			if(this.y>H || this.y<0){
				this.remove()
			}
		}
		this.vec[1]+=1

	}
	draw(){
		this.move()
		context.shadowColor=this.color
		context.fillStyle=this.color
		context.beginPath()
		context.arc(this.x,this.y,this.ray,0,2*Math.PI)
		//context.fillRect(t,this.ray,this.ray)
		
		context.closePath()
		context.fill()
	}
	remove(){
		bulles.splice(this.pos,1)
		for (var i = bulles.length - 1; i > this.pos; i--) {
			bulles[i].pos--
		}
	}
}
let bulles=[]
let indexBul=0
function Bloop() {
	context.fillStyle="black"
	context.fillRect(0,0,W,H)
	for (var i = bulles.length - 1; i >= 0; i--) {
		bulles[i].draw()
	}
	requestAnimationFrame(Bloop)
}
Bloop()