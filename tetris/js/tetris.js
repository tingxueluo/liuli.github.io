/*window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}*/

  

var tetris={
	CSIZE:26,//每个格子大小
	OFFSET:15,//内边距
	pg:null,//保存的容器
	shape:null,//正在下落的图性
	nextShape:null,
	interval:300,//游戏刷屏的时间间隔
	timer:null,
	wall:[],//保存下到底的墙
	RN:20,
	CN:10,
	score:0,
	lines:0,
	level:1,//游戏等级
	SCORES:[0,10,30,60,150],
	state:1,
	RUNNING:1,
	GAMEOVER:0,
	PAUAE:2,
	start:function(){
		this.state=this.RUNNING;
		this.score=0;
		this.lines=0;
		for(var r=0;r<this.RN;r++){
			this.wall[r]=new Array(this.CN);
		};

		this.pg=document.getElementsByClassName("playground")[0];
		this.shape=this.randomShape();
		this.nextShape=this.randomShape();
				this.paint();

		var me=this;
		document.onkeydown=function(e){
			switch(e.keyCode){
				case 37:me.state==me.RUNNING&&me.moveLeft();break;
				case 39:me.state==me.RUNNING&&me.moveRight();break;
				case 38:me.state==me.RUNNING&&me.rotateR();break;
				case 40:me.state==me.RUNNING&&me.moveDown();break;
				
				case 90:me.state==me.RUNNING&&me.rotateL();break;
				case 32:me.state==me.RUNNING&&me.hardDrop();break;

				case 80:me.state==me.RUNNING&&me.pause();break;//暂停p
				case 67:me.state==me.PAUSE&&me.myContinue();break;//C
				case 81:me.state!=me.GAMEOVER&&me.quit();break;//Q
				case 83:me.state==me.GAMEOVER&&me.start();break;//s
				
			}
		}
		this.timer=setInterval(this.moveDown.bind(this),this.interval);	
	},
	quit:function(){
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		this.paint();
	},
	myContinue:function(){
		this.state=this.RUNNING;
		this.timer=setInterval(this.moveDown.bind(this),this.interval);	
		this.paint();
	},
	pause:function(){
		this.state=this.PAUSE;
		clearInterval(this.timer);
		this.paint();
	},
	paintNext:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			var img=new Image();
			img.src=cell.src;
			img.style.top=(cell.r+1)*this.CSIZE+this.OFFSET+"px";
			img.style.left=(cell.c+10)*this.CSIZE+this.OFFSET+"px";
			frag.appendChild(img);
		}
		this.pg.appendChild(frag)
	},
	hardDrop:function(){
		while(this.canDown()){
			this.shape.moveDown();
		};
	},
	
	isFull:function(r){
		var reg=/^,|,,|,$/g
		return String(this.wall[r]).search(reg)==-1;
	},
	deleteRows:function(){
		for(var r=this.RN-1,lines=0;r>=0;r--){
			if(this.isFull(r)){
				this.deleteRow(r);
				lines++;
				r++;
				if(lines==4||this.wall[r-1].join("")==""){
					break
				}
			}
		}
		return lines;
	},
	deleteRow:function(r){
		for(;r>=0;r--){
			this.wall[r]=this.wall[r-1];
			for(var c=0;c<this.CN;c++){
				if(this.wall[r][c]){
					this.wall[r][c].r++;
				};
			};
			if(this.wall[r-2].join("")==""){
				this.wall[r-1]=new Array(this.CN);
				break;
			}
		}
	},

	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r<0||cell.r>=this.RN||cell.c<0||cell.c>=this.CN||
				this.wall[cell.r][cell.c]){
				return false;
			}
		}
		return true;
	},
	rotateR:function(){
		this.shape.rotateR();
		if(!this.canRotate()){
			this.shape.rotateL();
		}else{
			this.paint();
		}
	},
	
	rotateL:function(){
		this.shape.rotateL();
		if(!this.canRotate()){
			this.shape.rotateR();
		}else{
			this.paint();
		}
	},

	randomShape:function(){
		var r=Math.floor(Math.random()*7);
		switch(r){
			case 0:return new O();
			case 1:return new I();
			case 2:return new T();
			case 3:return new S();
			case 4:return new Z();
			case 5:return new L();
			case 6:return new J();
		}
	},
	canLeft:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==0||this.wall[cell.r][cell.c-1]!==undefined){
				return false;
			}
		}
		return true;
	},
	moveLeft:function(){
		if(this.canLeft()){
			this.shape.moveLeft();
		}
	},
	canRight:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==9||this.wall[cell.r][cell.c+1]!==undefined){
				return false;
			}
		}
		return true;
	},	
	moveRight:function(){
		if(this.canRight()){
			this.shape.moveRight();
		}
	},
	canDown:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]!==undefined){
				return false;
			};
		}
		return true;

	},
	moveDown:function(){
		if(this.canDown()){
			this.shape.moveDown();
		}else{
			this.landIntoWall();
			var lines=this.deleteRows();
			this.lines+=lines;
			if(this.lines>=5){
				clearInterval(this.timer);
				this.interval=200;
				this.timer=setInterval(this.moveDown.bind(this),this.interval);
				this.level=2;
				level.innerHTML=this.level;
			};
			if(this.lines>=10){
				clearInterval(this.timer);
				this.interval=150;
				this.timer=setInterval(this.moveDown.bind(this),this.interval);
				this.level=3;
				level.innerHTML=this.level;
			};
			this.score+=this.SCORES[lines];
			if(!this.isGAMEOVER()){
				this.shape=this.nextShape;
				this.nextShape=this.randomShape();
			}else{
				this.state=this.GAMEOVER;
				clearInterval(this.timer);
				this.timer=null;
			}
		}
		this.paint();
	},
	isGAMEOVER:function(){
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]){
				return true;
			};
		}
		return false;
	},
	paintState:function(){
		if(this.state!=this.RUNNING){
			var img=new Image();
			if(this.state==this.GAMEOVER){
				img.src="http://oaqxfh6q3.bkt.clouddn.com/tetris/img/game-over.png";
			}else if(this.state==this.PAUSE){
				img.src="http://oaqxfh6q3.bkt.clouddn.com/tetris/img/pause.png";
			}
			this.pg.appendChild(img);
		};
	},
	paintScore:function(){
		score.innerHTML=this.score;
		lines.innerHTML=this.lines;
	},
	paint:function(){
		var reg=/<img\ssrc="[^"]+"[^>]*>/g;
		this.pg.innerHTML=this.pg.innerHTML.replace(reg,"");
		this.paintShape();
		this.paintWall();
		this.paintScore();
		this.paintNext();
		this.paintState();
	},
	
	paintWall:function(){
		var frag=document.createDocumentFragment();
		for(var r=this.RN-1;r>=0&&this.wall[r].join("")!="";r--){
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c];
				if(cell!==undefined){
					this.addImg(frag,cell);
				}
			} 
		
		}
		this.pg.appendChild(frag);
	},

	paintShape:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.addImg(frag,cell);
			//var img=new Image();
			//img.src=cell.src;
			//img.style.top=cell.r*this.CSIZE+this.OFFSET+"px";
			//img.style.left=cell.c*this.CSIZE+this.OFFSET+"px";
			//frag.appendChild(img);
			
		}
		this.pg.appendChild(frag);
	},


	addImg:function(frag,cell){
		var img=new Image();
		img.src=cell.src;
		img.style.top=cell.r*this.CSIZE+this.OFFSET+"px";
		img.style.left=cell.c*this.CSIZE+this.OFFSET+"px";
		frag.appendChild(img);
	},
	
	landIntoWall:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.wall[cell.r][cell.c]=cell;
		}
	},
}
window.onload=function(){
	tetris.start();
}


































