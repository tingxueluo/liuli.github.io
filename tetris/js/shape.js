function Cell(r,c,src){
	this.r=r;
	this.c=c;
	this.src=src;
};

function State(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0=r0;this.c0=c0;
	this.r1=r1;this.c1=c1;
	this.r2=r2;this.c2=c2;
	this.r3=r3;this.c3=c3;
	
};
function Shape (cells,orgi,states){
	this.cells=cells;
	this.orgi=orgi;

	this.states=states;
	this.statei=0;
};
Shape.prototype.IMGS={
	T:"https://oarbgtisq.qnssl.com/tetris/img/T.png",
	I:"https://oarbgtisq.qnssl.com/tetris/img/I.png",
	O:"https://oarbgtisq.qnssl.com/tetris/img/O.png",
	S:"https://oarbgtisq.qnssl.com/tetris/img/S.png",
	Z:"https://oarbgtisq.qnssl.com/tetris/img/Z.png",
	L:"https://oarbgtisq.qnssl.com/tetris/img/L.png",
	J:"https://oarbgtisq.qnssl.com/tetris/img/J.png",
};
Shape.prototype.moveDown=function(){
	for(var i=0;i<this.cells.length;i++ ){
		this.cells[i].r+=1;
	}
};
Shape.prototype.moveLeft=function(){
	for(var i=0;i<this.cells.length;i++ ){
		this.cells[i].c-=1;
	}
};
 Shape.prototype.moveRight=function(){
	for(var i=0;i<this.cells.length;i++ ){
		this.cells[i].c+=1;
	}
};

Shape.prototype.rotate=function(){

	var orgCell=this.cells[this.orgi];
	var state=this.states[this.statei];
	for(var i=0;i<this.cells.length;i++){
		if(i!=this.orgi){
			this.cells[i].r=orgCell.r+state["r"+i];
			this.cells[i].c=orgCell.c+state["c"+i];
		}
	}
}
Shape.prototype.rotateR=function(){
	this.statei++;
	this.statei==this.states.length&&(this.statei=0);
	this.rotate();
};
Shape.prototype.rotateL=function(){
	this.statei--;
	this.statei==-1&&(this.statei=this.states.length-1);
	
	this.rotate();
	};


	
	
	//var orgCell=this.cells[this.orgi];
	//var state=this.states[this.statei];
	
	//for(var i=0;i<this.cells.length;i++){
	//	if(i!=this.orgi){
	//		this.cells[i].r=orgCell.r+state["r"+i];
	//		this.cells[i].c=orgCell.c+state["c"+i];
	//	}
	//}
	


function T(){
	var src=this.IMGS.T;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),	
	],1,[
		new State(0,-1,0,0,0,+1,+1,0),
		new State(-1,0,0,0,+1,0,0,-1),
		new State(0,+1,0,0,0,-1,-1,0),
		new State(+1,0,0,0,-1,0,0,+1),
	
	]);
}
	Object.setPrototypeOf(T.prototype,Shape.prototype);
function I(){
	var src=this.IMGS.I;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(0,6,src),
	],1,[
		new State(0,-1,0,0,0,+1,0,2),
		new State(-1,0,0,0,1,0,2,0),
	]);
}
	Object.setPrototypeOf(I.prototype,Shape.prototype);
function O(){
	var src=this.IMGS.O;
	Shape.call(this,[
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,4,src),
		new Cell(1,5,src),
	],1,[
		new State(0,-1,0,0,+1,-1,+1,0),
	]);
}
	Object.setPrototypeOf(O.prototype,Shape.prototype);
function S(){
	var src=this.IMGS.S;
	Shape.call(this,[
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,3,src),
		new Cell(1,4,src),	
	],3,[
		new State(-1,0,-1,+1,0,-1,0,0 ),
		new State(0,+1,+1,+1,-1,0,0,0),
	
	]);
}
	Object.setPrototypeOf(S.prototype,Shape.prototype);
function Z(){
	var src=this.IMGS.Z;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(1,4,src),
		new Cell(1,5,src),	
	],2,[
		new State(-1,-1,-1,0,0,0,0,+1),
		new State(-1,+1,0,+1,0,0,+1,0),
	]);
}
	Object.setPrototypeOf(Z.prototype,Shape.prototype);
function L(){
	var src=this.IMGS.L;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,3,src),	
	],1,[
		new State(0,-1,0,0,0,+1,+1,-1),
		new State(-1,0,0,0,+1,0,-1,-1),
		new State(0,+1,0,0,0,-1,-1,+1),
		new State(+1,0,0,0,-1,0,+1,+1),
	
	]);
}
	Object.setPrototypeOf(L.prototype,Shape.prototype);
function J(){
	var src=this.IMGS.J;
	Shape.call(this,[
		new Cell(0,3,src),
		new Cell(0,4,src),
		new Cell(0,5,src),
		new Cell(1,5,src),	
	],1,[
		new State(0,-1,0,0,0,+1,+1,+1),
		new State(-1,0,0,0,+1,0,+1,-1),
		new State(0,+1,0,0,0,-1,-1,-1),
		new State(+1,0,0,0,-1,0,-1,+1),
	
	]);
}
	Object.setPrototypeOf(J.prototype,Shape.prototype);


	

/*


	//定义描述格子类型对象的构造函数Cell
  //三个属性: r,c,src
function Cell(r,c,src){
  this.r=r;
  this.c=c;
  this.src=src;
}
//定义描述图形中一个状态的类型State,8个参数:
function State(r0,c0,r1,c1,r2,c2,r3,c3){
  this.r0=r0; this.c0=c0;
  this.r1=r1; this.c1=c1;
  this.r2=r2; this.c2=c2;
  this.r3=r3; this.c3=c3;
};
//定义描述所有图形公共属性的父类型Shape，参数为cells
//为父类型构造函数添加公共属性:
  //orgi: 参照格的下标
  //states: 保存一个图形所有旋转状态的数组
  //statei: 保存当前图形的状态序号,默认为0
function Shape(cells,orgi,states){
  this.cells=cells;//一个属性: cells:值为cells
  this.orgi=orgi;
  this.states=states;
  this.statei=0;
}
//在Shape类型的原型对象中定义一个共有属性IMGS:
Shape.prototype.IMGS={
  T:"https://oarbgtisq.qnssl.com/tetris/img/T.png", I:"https://oarbgtisq.qnssl.com/tetris/img/I.png", O:"https://oarbgtisq.qnssl.com/tetris/img/O.png",};
//在Shape类型的原型对象中定义moveDown方法
Shape.prototype.moveDown=function(){//this->shape
  //遍历当前图形对象中的cells数组中每个cell对象
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].r++;//将当前cell对象的r+1
  }
}
//在Shape类型的原型对象中定义moveLeft方法
Shape.prototype.moveLeft=function(){
  //遍历当前图形对象中的cells数组中的每个cell对象
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c--;//将当前cell对象的c--;
  }
}
//在Shape类型的原型对象中定义moveRight方法
Shape.prototype.moveRight=function(){
  //遍历当前图形对象中的cells数组中的每个cell对象
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c++;//将当前cell对象的c++;
  }
}
//在Shape类型的原型对象中定义rotateR方法
Shape.prototype.rotateR=function(){
  this.statei++;//将当前对象的statei+1
  //如果statei==当前对象的states的元素个数，就将statei改为0
  this.statei==this.states.length&&(this.statei=0);
  this.rotate();//旋转当前图形
}
//专门根据当前的状态旋转图形
Shape.prototype.rotate=function(){
  //获得当前对象的cells中orgi位置的格，保存在orgCell中
  var orgCell=this.cells[this.orgi];
  //获得当前对象得states中statei位置的state对象
  var state=this.states[this.statei];
  //遍历当前图形的cells中每个cell
  for(var i=0;i<this.cells.length;i++){
    //如果i不等于orgi时(说明当前格不是参照格)
    if(i!=this.orgi){
      //就设置当前格的r等于orgCell的r+state对象中"r"+i属性的值
      this.cells[i].r=orgCell.r+state["r"+i];
      //就设置当前格的c等于orgCell的c+state对象中"c"+i属性的值
      this.cells[i].c=orgCell.c+state["c"+i];
    }
  }
}
//在Shape类型的原型对象中定义rotateL方法
Shape.prototype.rotateL=function(){
  this.statei--;//将statei-1
  //如果statei等于-1,就改回states的元素个数-1
  this.statei==-1&&(this.statei=this.states.length-1);
  //调用当前对象的rotate方法，旋转当前图形
  this.rotate();
}

//定义描述T图形的构造函数T
function T(){
  //将当前对象的IMGS属性的T，保存在变量src中
  var src=this.IMGS.T;
  //借用构造函数Shape，传入一个数组，包含4个cell对象
  Shape.call(this,[
    new Cell(0,3,src),
    new Cell(0,4,src),
    new Cell(0,5,src),
    new Cell(1,4,src),
  ],1,[
    new State(0,-1,  0,0,  0,+1,  +1,0),
    new State(-1,0,  0,0,  1,0,    0,-1),
    new State(0,+1,  0,0,  0,-1,   -1,0),
    new State(+1,0,  0,0,  -1,0,   0,+1),
  ]);
}
//设置T类型的原型对象继承Shape类型的原型对象
Object.setPrototypeOf(T.prototype,Shape.prototype);

//定义描述I图形的构造函数I
function I(){
  //将当前对象的IMGS属性的T，保存在变量src中
  var src=this.IMGS.I;
  //借用构造函数Shape，传入一个数组，包含4个cell对象
  Shape.call(this,[
    new Cell(0,3,src),
    new Cell(0,4,src),
    new Cell(0,5,src),
    new Cell(0,6,src),
  ],1,[
    new State(0,-1, 0,0, 0,1, 0,2),
    new State(-1,0, 0,0, 1,0, 2,0),  
  ]);
}
//设置T类型的原型对象继承Shape类型的原型对象
Object.setPrototypeOf(I.prototype,Shape.prototype);

//定义描述O图形的构造函数O
function O(){
  //将当前对象的IMGS属性的T，保存在变量src中
  var src=this.IMGS.O;
  //借用构造函数Shape，传入一个数组，包含4个cell对象
  Shape.call(this,[
    new Cell(0,4,src),
    new Cell(0,5,src),
    new Cell(1,4,src),
    new Cell(1,5,src),
  ],1,[
    new State(0,-1, 0,0, 1,-1, 1,0)  
  ]);
}
//设置T类型的原型对象继承Shape类型的原型对象
Object.setPrototypeOf(O.prototype,Shape.prototype);

//S  04,05,13,14  orgi:3   状态:2个
//Z  03,04,14,15  orgi:2   状态:2个
//L  03,04,05,13  orgi:1   状态:4个
//J  03,04,05,15  orgi:1   状态:4个*/