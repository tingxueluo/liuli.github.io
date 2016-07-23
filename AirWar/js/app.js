//游戏中的全局变量
var canvasWidth=480;//获得当前手机屏幕的宽---$(window).width
var canvasHeight=650;
var score=0;
var lives=3;//3条命
var canvas=document.getElementById('gameCanvas');
canvas.width=canvasWidth;
canvas.height=canvasHeight;
var ctx=canvas.getContext('2d');//绘图上下文
	ctx.lineWidth=30;
	ctx.strokeStyle="#bbb";
	ctx.font='60px SimHei';
const PHASE_DOWNLOADING=1;
const PHASE_READY=2;
const PHASE_STARTING=3;
const PHASE_PLAY=4;
const PHASE_PAUSE=5;
const PHASE_GAMEOVER=6;

var cur_phase=PHASE_DOWNLOADING;//当前所处阶段

//----------------------------------阶段1：游戏下载阶段怕phase_downloading阶段
var progress=0;//当前加载进度
function drawProgress(){//绘图函数
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	ctx.beginPath();
	var startAngle=-90*Math.PI/180;
	var endAngle=(-90+progress*3.6)*Math.PI/180;
	ctx.arc(canvasWidth/2,canvasHeight/2,100,startAngle,endAngle);
	ctx.stroke();
	var txt=progress+'%';
	var txtWidth=ctx.measureText(txt).width;
	ctx.fillText(txt,canvasWidth/2-txtWidth/2,canvasHeight/2+25);
	if(progress>=100){//加载完成
		cur_phase=PHASE_READY;//进入就绪阶段
		sky=new Sky(imgBackground);//加载完成，绘制天空
		startEngine();//启动动画引擎
		
	}
}
var imgBackground=new Image();
var imgBullet1=new Image();
var imgsEnemy1=[new Image(),new Image(),new Image(),new Image(),new Image()];
var imgsEnemy2=[new Image(),new Image(),new Image(),new Image(),new Image()];
var imgsEnemy3=[new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
var imgsGameLoading=[new Image(),new Image(),new Image(),new Image()];
var imgGamePause=new Image();
var imgsHero=[new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
var imgStart=new Image();

downloadResource();
function downloadResource(){
	imgBackground.src="https://oarbgtisq.qnssl.com/AirWar/img/background.png";
	imgBackground.onload=function(){
		progress+=4;
		drawProgress();
	}
	imgBullet1.src="https://oarbgtisq.qnssl.com/AirWar/img/bullet1.png";
	imgBullet1.onload=function(){
		progress+=3;
		drawProgress();
	}
	//敌1
	imgsEnemy1[0].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy1.png";
	imgsEnemy1[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[1].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy1_down1.png";
	imgsEnemy1[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[2].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy1_down2.png";
	imgsEnemy1[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[3].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy1_down3.png";
	imgsEnemy1[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[4].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy1_down4.png";
	imgsEnemy1[4].onload=function(){
		progress+=3;
		drawProgress();
	}

	//敌2
	imgsEnemy2[0].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy2.png";
	imgsEnemy2[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[1].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy2_down1.png";
	imgsEnemy2[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[2].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy2_down2.png";
	imgsEnemy2[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[3].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy2_down3.png";
	imgsEnemy2[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[4].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy2_down4.png";
	imgsEnemy2[4].onload=function(){
		progress+=3;
		drawProgress();
	}

	//敌三

	imgsEnemy3[0].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_n1.png";
	imgsEnemy3[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[1].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_n2.png";
	imgsEnemy3[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[2].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_hit.png";
	imgsEnemy3[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[3].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_down1.png";
	imgsEnemy3[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[4].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_down2.png";
	imgsEnemy3[4].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[5].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_down3.png";
	imgsEnemy3[5].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[6].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_down4.png";
	imgsEnemy3[6].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[7].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_down5.png";
	imgsEnemy3[7].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[8].src="https://oarbgtisq.qnssl.com/AirWar/img/enemy3_down6.png";
	imgsEnemy3[8].onload=function(){
		progress+=3;
		drawProgress();
	}
	//加载
	imgsGameLoading[0].src="https://oarbgtisq.qnssl.com/AirWar/img/game_loading1.png";
	imgsGameLoading[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[1].src="https://oarbgtisq.qnssl.com/AirWar/img/game_loading2.png";
	imgsGameLoading[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[2].src="https://oarbgtisq.qnssl.com/AirWar/img/game_loading3.png";
	imgsGameLoading[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[3].src="https://oarbgtisq.qnssl.com/AirWar/img/game_loading4.png";
	imgsGameLoading[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	//暂停
	imgGamePause.src="https://oarbgtisq.qnssl.com/AirWar/img/game_pause_nor.png";
	imgGamePause.onload=function(){
		progress+=3;
		drawProgress();
	}
	//英雄
	imgsHero[0].src="https://oarbgtisq.qnssl.com/AirWar/img/hero1.png";
	imgsHero[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[1].src="https://oarbgtisq.qnssl.com/AirWar/img/hero2.png";
	imgsHero[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[2].src="https://oarbgtisq.qnssl.com/AirWar/img/hero_blowup_n1.png";
	imgsHero[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[3].src="https://oarbgtisq.qnssl.com/AirWar/img/hero_blowup_n2.png";
	imgsHero[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[4].src="https://oarbgtisq.qnssl.com/AirWar/img/hero_blowup_n3.png";
	imgsHero[4].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[5].src="https://oarbgtisq.qnssl.com/AirWar/img/hero_blowup_n4.png";
	imgsHero[5].onload=function(){
		progress+=3;
		drawProgress();
	}
	//开始
	imgStart.src="https://oarbgtisq.qnssl.com/AirWar/img/start.png";
	imgStart.onload=function(){
		progress+=3;
		drawProgress();
	}
}
//----------------------------------阶段2：游戏就绪阶段phase_ready阶段
	var sky=null;
	function Sky(img){//绘制2份背景图
		this.x1=0;
		this.y1=0;
		this.x2=0;
		this.y2=-img.height;
		this.draw=function(){//绘制天空
			ctx.drawImage(img,this.x1,this.y1);
			ctx.drawImage(img,this.x2,this.y2);
		}
		this.move=function(){//移动一次
			this.y1++;
			this.y2++;
			if(this.y1>=canvasHeight){
				this.y1=this.y2-img.height;
			}
			if(this.y2>=canvasHeight){
				this.y2=this.y1-img.height;
			}
		}
	}

	function drawLogo(){
		ctx.drawImage(imgStart,canvasWidth/2-imgStart.width/2,canvasHeight/2-imgStart.height/2);
	}
	canvas.addEventListener('click',function(){
		if(cur_phase===PHASE_READY){
			cur_phase=PHASE_STARTING;
			runningPlane=new RunningPlane(imgsGameLoading);
		}
	},false)


//----------------------------------阶段3：游戏开始阶段phase_starting阶段
	var runningPlane=null; 
	function RunningPlane(imgsGameLoading){
		this.x=0;
		this.y=canvasHeight-imgsGameLoading[0].height;
		this.index=0;//当前要绘制的下标
		this.draw=function(){
			ctx.drawImage(imgsGameLoading[this.index],this.x,this.y);
		}
		this.moveCount=0;
		this.move=function(){
			this.moveCount++;
			if(this.moveCount%8==0){
				this.index++;
			}
			if(this.index===imgsGameLoading.length-1){
				cur_phase=PHASE_PLAY;
				hero=new Hero(imgsHero);
				bulletList=new BulletList();
				enemyList=new EnemyList();
			}
		}
	}
//----------------------------------阶段4：游戏进行阶段phase_play阶段
	//	我方
		var hero=null;
		var bulletList=null;
		function Hero(imgs){
			this.width=imgs[0].width;
			this.height=imgs[0].height;
			this.x=canvasWidth/2-imgs[0].width/2;
			this.y=canvasHeight-imgs[0].height;
			this.index=0;//当前绘制的哪张
			this.crashed=false;//当前是否被撞毁
			this.draw=function(){
				ctx.drawImage(imgs[this.index],this.x,this.y);
			}
			this.moveCount=0;
			this.move=function(){
				if(!this.crashed){
					if(this.index==0){
						this.index=1;
					}else{
						this.index=0;
					}
				}else if(this.crashed){
					this.moveCount++;
					if(this.moveCount%3==0){
						this.index++;
						if(this.index==imgs.length){//绘制完所有坠毁图片
							lives--;//剩余命数-1
							if(lives>0){
								this.x=canvasWidth/2-this.width/2;
								this.y=canvasHeight-this.height;
								this.index=0;//重新播放第0张图片
								this.crashed=false;//未撞毁状态
							}else{//剩余命数为0，GAMEOVER
								cur_phase=PHASE_GAMEOVER;
							}
						}
					}
				}
				this.moveCount++;
				if(this.moveCount%5==0){
					var bullet=new Bullet(imgBullet1);
					bulletList.add(bullet);
					
					  var bullet0 = new Bullet(imgBullet1);
					  bullet0.x -= 25;
					  var bullet1 = new Bullet(imgBullet1);
					  var bullet2 = new Bullet(imgBullet1);
					  bullet2.x += 25;
					  bulletList.add(bullet0);
					  bulletList.add(bullet1);
					  bulletList.add(bullet2);
					  
				}
			}
			canvas.addEventListener('mousemove',function(event){
				var x=event.offsetX-imgs[0].width/2;
				var y=event.offsetY-imgs[0].height/2;
				hero.x=x;
				hero.y=y;
			},false)
		}
		function Bullet(img){
			this.x=hero.x+(imgsHero[0].width/2-img.width/2);
			this.y=hero.y-img.height/2;
			this.width=img.width;
			this.height=img.height;
			this.removable=false;//子弹可以删除状态
			this.draw=function(){
				ctx.drawImage(img,this.x,this.y);
			}
			this.move=function(){
				this.y-=7;
				if(this.y<=-img.height){
					this.removable=true;
				}
			}
		}
		function BulletList(){
			this.list=[];//保存页面需绘制的所有子弹
			this.add=function(bullet){
				this.list.push(bullet);
			}
			this.draw=function(){
				for(var i=0;i<this.list.length;i++){
					this.list[i].draw();
				}
			};
			this.move=function(){
				for(var i=0;i<this.list.length;i++){
					this.list[i].move();
					if(this.list[i].removable){
						this.list.splice(i,1);
						i--;//删除之后后面的坐标前移，所以坐标--，对应前移
					}
				}
			};

		}
	//敌方
		var enemyList=null;
		function Enemy1(imgs){
			this.width=imgs[0].width;
			this.height=imgs[0].height;
			this.x=Math.random()*(canvasWidth-this.width);
			this.y=-this.height;
			this.index=0;
			this.blood=1;//敌机生命值
			this.removable=false;
			this.score=10;//小敌机积分
			this.crashed=false;//撞毁状态
			this.draw=function(){
				ctx.drawImage(imgs[this.index],this.x,this.y);
			}
			this.moveCount=0;
			this.move=function(){
				this.y+=8;
				if(this.y>=canvasHeight){
					this.removable=true;
				}
				if(this.crashed){
					this.moveCount++;
					if(this.moveCount%3==0){
						this.index++;
					}
					if(this.index==imgs.length){
						this.removable=true;
					}
				};
				/*
				for(var i=0;i<bulletList.list.length;i++){
					var bx=bulletList.list[i].x;
					var by=bulletList.list[i].y;
					var bw=imgBullet1.width;
					if(by<=(this.y+imgs[0].height) && (bx+bw)>=this.x && bx<=(this.x+imgs[0].width)){
						//debugger;
						this.blood--;
						if(this.blood==0){
							this.crashed=true;
							this.index=1;
						}
					}
				}
				*/
			}
			
		};
		function Enemy2(imgs){
			this.width=imgs[0].width;
			this.height=imgs[0].height;
			this.x=Math.random()*(canvasWidth-this.width);
			this.y=-this.height;
			this.index=0;
			this.blood=4;//敌机生命值
			this.removable=false;
			this.score=50;
			this.crashed=false;//撞毁状态
			this.draw=function(){
				ctx.drawImage(imgs[this.index],this.x,this.y);
			}
			this.moveCount=0;
			this.move=function(){
				this.y+=5;
				if(this.y>=canvasHeight){
					this.removable=true;
				}
				if(this.crashed){
					this.moveCount++;
					if(this.moveCount%3==0){
						this.index++;
					}
					if(this.index==imgs.length){
						this.removable=true;
					}
				};
			}
			
		};
		function Enemy3(imgs){
			this.width=imgs[0].width;
			this.height=imgs[0].height;
			this.x=Math.random()*(canvasWidth-this.width);
			this.y=-this.height;
			this.index=0;
			this.blood=10;//敌机生命值
			this.removable=false;
			this.score=150;
			this.crashed=false;//撞毁状态
			this.draw=function(){
				ctx.drawImage(imgs[this.index],this.x,this.y);
			}
			this.moveCount=0;
			this.move=function(){
				this.y+=3;
				if(this.y>=canvasHeight){
					this.removable=true;
				}
				if(!this.crashed){
					if(this.index==0){
						this.index=1;
					}else{
						this.index=0;
					}
				}else if(this.crashed){
					this.moveCount++;
					if(this.moveCount%3==0){
						if(this.index==0||this.index==1){this.index=3;}
						this.index++;
					}
					if(this.index==imgs.length){
						this.removable=true;
					}
				};
			}
		};
		function EnemyList(){
			this.list=[];
			this.add=function(enemy){
				this.list.push(enemy);
			}
			this.draw=function(){
				for(var i=0;i<this.list.length;i++){
					this.list[i].draw();
				}
			}
			this.move=function(){
				//随机生成敌机
				var num=Math.floor(Math.random()*200);
				//debugger;
				if(num<6){
					this.add(new Enemy1(imgsEnemy1));
				}else if(num<9){
					this.add(new Enemy2(imgsEnemy2));
				}else if(num<10){
					this.add(new Enemy3(imgsEnemy3));
				}
				//敌机子弹碰撞检验
				for(var i=0;i<this.list.length;i++){
					var enemy=this.list[i];
					for(var j=0;j<bulletList.list.length;j++){
						var bullet=bulletList.list[j]
						if(
							enemy.x+enemy.width>=bullet.x
							&&bullet.x+bullet.width>=enemy.x
							&&enemy.y+enemy.height>=bullet.y
							&&bullet.y+bullet.height>=enemy.y
							){
							bullet.removable=true;
							enemy.blood--;
							if(enemy.blood==0){
								enemy.crashed=true;
								score+=enemy.score;
							}
						}
					}
				}
				//敌机英雄碰撞检验
				for(var i=0;i<this.list.length;i++){
					var enemy=this.list[i];
					if(
						enemy.x+enemy.width>=hero.x
						&&hero.x+hero.width>=enemy.x
						&&enemy.y+enemy.height>=hero.y
						&&hero.y+hero.height>=enemy.y
						){
						enemy.blood--;
						if(enemy.blood<=0){
							enemy.crashed=true;
						}
						hero.crashed=true;
					}
					
				}

				//移动已有敌机
				for(var i=0;i<this.list.length;i++){
					this.list[i].move();
					if(this.list[i].removable){
						this.list.splice(i,1);
						i--;
					}
				}

			}
		};


	//绘制得到命数的统计
	function drawStat(){
		ctx.fillStyle="#333";
		ctx.font="20px SimHei";
		var txtScore='SCORE:'+score;
		ctx.fillText(txtScore,5,25);

		var txtLives="LIVES:"+lives;
		var w=ctx.measureText(txtLives).width;
		ctx.fillText(txtLives,canvasWidth-w-5,25);
	}

//----------------------------------阶段5：游戏暂停阶段phase_pause阶段
	//若鼠标离开画布，则游戏暂停
	canvas.addEventListener('mouseout',function(){
		if(cur_phase===PHASE_PLAY){
			cur_phase=PHASE_PAUSE;
		}
	},false);
	//若鼠标移入画布，则继续游戏
	canvas.addEventListener('mouseover',function(){
		if(cur_phase===PHASE_PAUSE){
			cur_phase=PHASE_PLAY;
		}
	},false);
	function drawPause(){
		ctx.drawImage(imgGamePause,canvasWidth/2-imgGamePause.width/2,canvasHeight/2-imgGamePause.height/2)
	}

//----------------------------------阶段6：游戏结束阶段phase_gameover阶段
	function drawGameOver(){
		ctx.font='90px SimHei';
		var txt='GAME OVER';
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillText(txt,canvasWidth/2-txtWidth/2,canvasHeight/2+30)
	}


//游戏的主引擎---周期固定的定时器
	function startEngine(){
		setInterval(function(){
			sky.draw();
			sky.move();
			switch(cur_phase){
				case PHASE_READY:
					drawLogo();//ready阶段绘制logo
					break;
				case PHASE_STARTING:
					runningPlane.draw();
					runningPlane.move();
					break;
				case PHASE_PLAY:
					hero.draw();
					hero.move();
					bulletList.draw();
					bulletList.move();
					enemyList.draw();
					enemyList.move();
					drawStat();
					break;
				case PHASE_PAUSE:
					drawPause();
					drawStat();
					break;
				case PHASE_GAMEOVER:
					drawGameOver();
					drawStat();
					break;
			}
			
		},42);
	}