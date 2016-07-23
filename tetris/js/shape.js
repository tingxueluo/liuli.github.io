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


	//���������������Ͷ���Ĺ��캯��Cell
  //��������: r,c,src
function Cell(r,c,src){
  this.r=r;
  this.c=c;
  this.src=src;
}
//��������ͼ����һ��״̬������State,8������:
function State(r0,c0,r1,c1,r2,c2,r3,c3){
  this.r0=r0; this.c0=c0;
  this.r1=r1; this.c1=c1;
  this.r2=r2; this.c2=c2;
  this.r3=r3; this.c3=c3;
};
//������������ͼ�ι������Եĸ�����Shape������Ϊcells
//Ϊ�����͹��캯����ӹ�������:
  //orgi: ���ո���±�
  //states: ����һ��ͼ��������ת״̬������
  //statei: ���浱ǰͼ�ε�״̬���,Ĭ��Ϊ0
function Shape(cells,orgi,states){
  this.cells=cells;//һ������: cells:ֵΪcells
  this.orgi=orgi;
  this.states=states;
  this.statei=0;
}
//��Shape���͵�ԭ�Ͷ����ж���һ����������IMGS:
Shape.prototype.IMGS={
  T:"https://oarbgtisq.qnssl.com/tetris/img/T.png", I:"https://oarbgtisq.qnssl.com/tetris/img/I.png", O:"https://oarbgtisq.qnssl.com/tetris/img/O.png",};
//��Shape���͵�ԭ�Ͷ����ж���moveDown����
Shape.prototype.moveDown=function(){//this->shape
  //������ǰͼ�ζ����е�cells������ÿ��cell����
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].r++;//����ǰcell�����r+1
  }
}
//��Shape���͵�ԭ�Ͷ����ж���moveLeft����
Shape.prototype.moveLeft=function(){
  //������ǰͼ�ζ����е�cells�����е�ÿ��cell����
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c--;//����ǰcell�����c--;
  }
}
//��Shape���͵�ԭ�Ͷ����ж���moveRight����
Shape.prototype.moveRight=function(){
  //������ǰͼ�ζ����е�cells�����е�ÿ��cell����
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c++;//����ǰcell�����c++;
  }
}
//��Shape���͵�ԭ�Ͷ����ж���rotateR����
Shape.prototype.rotateR=function(){
  this.statei++;//����ǰ�����statei+1
  //���statei==��ǰ�����states��Ԫ�ظ������ͽ�statei��Ϊ0
  this.statei==this.states.length&&(this.statei=0);
  this.rotate();//��ת��ǰͼ��
}
//ר�Ÿ��ݵ�ǰ��״̬��תͼ��
Shape.prototype.rotate=function(){
  //��õ�ǰ�����cells��orgiλ�õĸ񣬱�����orgCell��
  var orgCell=this.cells[this.orgi];
  //��õ�ǰ�����states��stateiλ�õ�state����
  var state=this.states[this.statei];
  //������ǰͼ�ε�cells��ÿ��cell
  for(var i=0;i<this.cells.length;i++){
    //���i������orgiʱ(˵����ǰ���ǲ��ո�)
    if(i!=this.orgi){
      //�����õ�ǰ���r����orgCell��r+state������"r"+i���Ե�ֵ
      this.cells[i].r=orgCell.r+state["r"+i];
      //�����õ�ǰ���c����orgCell��c+state������"c"+i���Ե�ֵ
      this.cells[i].c=orgCell.c+state["c"+i];
    }
  }
}
//��Shape���͵�ԭ�Ͷ����ж���rotateL����
Shape.prototype.rotateL=function(){
  this.statei--;//��statei-1
  //���statei����-1,�͸Ļ�states��Ԫ�ظ���-1
  this.statei==-1&&(this.statei=this.states.length-1);
  //���õ�ǰ�����rotate��������ת��ǰͼ��
  this.rotate();
}

//��������Tͼ�εĹ��캯��T
function T(){
  //����ǰ�����IMGS���Ե�T�������ڱ���src��
  var src=this.IMGS.T;
  //���ù��캯��Shape������һ�����飬����4��cell����
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
//����T���͵�ԭ�Ͷ���̳�Shape���͵�ԭ�Ͷ���
Object.setPrototypeOf(T.prototype,Shape.prototype);

//��������Iͼ�εĹ��캯��I
function I(){
  //����ǰ�����IMGS���Ե�T�������ڱ���src��
  var src=this.IMGS.I;
  //���ù��캯��Shape������һ�����飬����4��cell����
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
//����T���͵�ԭ�Ͷ���̳�Shape���͵�ԭ�Ͷ���
Object.setPrototypeOf(I.prototype,Shape.prototype);

//��������Oͼ�εĹ��캯��O
function O(){
  //����ǰ�����IMGS���Ե�T�������ڱ���src��
  var src=this.IMGS.O;
  //���ù��캯��Shape������һ�����飬����4��cell����
  Shape.call(this,[
    new Cell(0,4,src),
    new Cell(0,5,src),
    new Cell(1,4,src),
    new Cell(1,5,src),
  ],1,[
    new State(0,-1, 0,0, 1,-1, 1,0)  
  ]);
}
//����T���͵�ԭ�Ͷ���̳�Shape���͵�ԭ�Ͷ���
Object.setPrototypeOf(O.prototype,Shape.prototype);

//S  04,05,13,14  orgi:3   ״̬:2��
//Z  03,04,14,15  orgi:2   ״̬:2��
//L  03,04,05,13  orgi:1   ״̬:4��
//J  03,04,05,15  orgi:1   ״̬:4��*/