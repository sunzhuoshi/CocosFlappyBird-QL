require=function t(e,i,n){function a(r,s){if(!i[r]){if(!e[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(o)return o(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var h=i[r]={exports:{}};e[r][0].call(h.exports,function(t){var i=e[r][1][t];return a(i||t)},h,h.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)a(n[r]);return a}({Benchmark:[function(t,e,i){"use strict";cc._RF.push(e,"8937bpqCsNFipDufOZGF6A3","Benchmark");var n=t("WebUtil"),a=cc.Class({extends:cc.Component,properties:{},statics:{datasetColors:["red","orange","yellow","green","blue","purple","grey"]},ctor:function(){this.enabled=!0,this._index=0},updateData:function(t,e,i){if(this.enabled){var n=t.toString(),o=this.chart.data.datasets.find(function(t){return t.label===n});if(!o){var r=a.datasetColors[this.chart.data.datasets.length%a.datasetColors.length];o={label:n,backgroundColor:r,borderColor:r,data:[],fill:!1,showLine:!0},this.chart.data.datasets.push(o)}o.data.push({x:e.episodes,y:i.getFinalScore()}),this.chart.update()}},onLoad:function(){var t=this;if(cc.sys.isBrowser){var e=document.createElement("DIV"),i=document.createElement("CANVAS"),a=document.querySelector(".contentWrap");a||(a=document.getElementById("Cocos2dGameContainer"));var o=n.getButtonContainer(),r=document.createElement("BUTTON");r.innerHTML="Clear Data",r.style.margin="10px",r.style.flexShrink="0",r.onclick=function(){t.chart.data.datasets=[],t.chart.update()},o.appendChild(r),a.parentNode.appendChild(o),a.style.display="block",a.style.width="auto",a.style.overflow="unset",a.style.position="relative",e.style.display="flex",e.style.width="100%",e.style.maxWidth="640px",e.style.height="480px",e.appendChild(i),a.parentNode.appendChild(e);var s=document.createElement("BUTTON");s.style.width="96px",s.style.height="32px",s.style.position="absolute",s.style.margin="0 -48px",s.style.left="50%",s.style.top="5px",s.onclick=function(){window.scrollTo(0,78)},s.innerHTML="Scroll Down",document.getElementById("Cocos2dGameContainer").appendChild(s),document.body.style.height="fit-content";var c=i.getContext("2d"),d={scales:{xAxes:[{position:"bottom",display:!0,scaleLabel:{display:!0,labelString:"Episode"},ticks:{min:0}}],yAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Score"},ticks:{min:0}}]}};this.chart=new Chart(c,{type:"scatter",data:{datasets:[]},options:d})}},doNextCase:function(){var t=!0;switch(++this._index){case 1:cc.QL.params.alpha+=1e-4;break;default:t=!1}return t}});cc._RF.pop()},{WebUtil:"WebUtil"}],Bird:[function(t,e,i){"use strict";cc._RF.push(e,"21aaeE5QyJLnbT9jtVoxXvz","Bird");var n,a=cc.Class({extends:cc.Component,ctor:function(){this.jumpFrame=-1,this.birdInitY=0,this.distance=0},statics:{jumpVelocity:14,maxFallVelocity:-15,speed:4},properties:function(){return n=t("Game"),{game:{default:null,type:n}}},onLoad:function(){this.node.getBoundingBox();this.birdInitY=this.node.y,this.anim=this.getComponent(cc.Animation)},start:function(){this.anim.playAdditive("BirdSwing")},reborn:function(){this.node.y=this.birdInitY,this.anim.play("BirdFly"),this.anim.playAdditive("BirdSwing"),this.distance=0},free:function(){this.anim.play("BirdSwing")},jump:function(){this.jumpFrame=this.game.getCurrentFrame()},die:function(){this.anim.stop("BirdSwing"),this.jumpFrame=-1},update:function(t){if(this.game.getState()===n.STATE_PLAY){var e=this.node.getBoundingBox();if(this.distance+=a.speed,0<=this.jumpFrame){var i=this.game.getCurrentFrame(),o=Math.max(a.jumpVelocity+n.gravity*(i-this.jumpFrame),a.maxFallVelocity),r=Math.max(this.node.y+o,n.landTop+e.height/2);r=Math.min(r,n.skyBottom-e.height/2),this.node.y=r}}},getDistance:function(){return this.distance}});cc._RF.pop()},{Game:"Game"}],Game:[function(t,e,i){"use strict";cc._RF.push(e,"8cbf1kl6I9BAJRBYeLn97dQ","Game");var n=t("PipePair"),a=cc.Class({extends:cc.Component,ctor:function(){this._state=null,this._currentFrame=0,this._pipePairNodeList=[],this._currentScore=0,this._bestScore=0},properties:{birdNode:{default:null,type:cc.Node},readyNode:{default:null,type:cc.Node},tutorialNode:{default:null,type:cc.Node},landNode:{default:null,type:cc.Node},skyNode:{default:null,type:cc.Node},gameOverNode:{default:null,type:cc.Node},scorePanelNode:{default:null,type:cc.Node},landRootNode:{default:null,type:cc.Node},currentScoreLabel:{default:null,type:cc.Label},templatePipePairNode:{default:null,type:cc.Node},finalScoreLabel:{default:null,type:cc.Label},bestScoreLabel:{default:null,type:cc.Label}},statics:{STATE_TITLE:0,STATE_PLAY:1,STATE_OVER:2,gravity:-1.5,landTop:0,skyBottom:0,pipePairPoolSize:3},onLoad:function(){var t=this;this.anim=this.landRootNode.getComponent(cc.Animation),this.node.on(cc.Node.EventType.TOUCH_START,this.onPlayerAct,this),this.birdScript=this.birdNode.getComponent("Bird");var e=this.landNode.getBoundingBox();a.landTop=e.y+e.height,a.skyBottom=this.skyNode.y;for(var i=0;i<a.pipePairPoolSize-1;i++){var n=cc.instantiate(this.templatePipePairNode);n.parent=this.templatePipePairNode.parent,this._pipePairNodeList.push(n)}this._pipePairNodeList.push(this.templatePipePairNode),this.currentScoreLabel.string=this._currentScore,this.bestScoreLabel.string=this._bestScore,this.finalScoreLabel.string=this._currentScore,this.node.on("current-score-changed",function(e){t.currentScoreLabel.string=e.detail,t.finalScoreLabel.string=e.detail}),this.node.on("best-score-changed",function(e){t.bestScoreLabel.string=e.detail}),cc.view.enableAntiAlias(!1),this._loadAnalysisSDK()},start:function(){this.changeState(a.STATE_TITLE)},onPlayerAct:function(t){switch(this._state){case a.STATE_TITLE:this.changeState(a.STATE_PLAY);break;case a.STATE_PLAY:this.birdScript.jump();break;case a.STATE_OVER:this.changeState(a.STATE_TITLE)}},checkCollision:function(){var t=this;this.birdNode.getBoundingBox().y<=a.landTop&&this.changeState(a.STATE_OVER),this._pipePairNodeList.find(function(e){return e.getComponent("PipePair").checkCollision(t.birdNode.getBoundingBox())})&&this.changeState(a.STATE_OVER)},setCurrentScore:function(t){t!=this._currentScore&&(this._currentScore=t,this.node.emit("current-score-changed",this._currentScore),this._currentScore>this._bestScore&&(this._bestScore=this._currentScore,this.node.emit("best-score-changed",this._bestScore)))},updateScore:function(){var t=this._pipePairNodeList[0].getComponent("PipePair");!t.passed&&t.getBoundingRight()<this.birdNode.getBoundingBox().x&&(t.passed=!0,this.setCurrentScore(this._currentScore+1),this._pipePairNodeList.push(this._pipePairNodeList.shift()))},generateNewPipePair:function(){var t=this._pipePairNodeList.find(function(t){return!t.getComponent("PipePair").inMoving()});t&&t.getComponent("PipePair").setup()},update:function(t){this._currentFrame++,this._state===a.STATE_PLAY&&(this.checkCollision(),this.updateScore(),this.birdScript.getDistance()%n.span==0&&this.generateNewPipePair())},getState:function(){return this._state},inState:function(t){return this._state===t},changeState:function(t){t!==this._state&&(this.onExitState(this._state),this._state=t,this.onEnterState(this._state))},onEnterState:function(t){switch(this._state){case a.STATE_TITLE:this.readyNode.active=!0,this.tutorialNode.active=!0,this.gameOverNode.active=!1,this.scorePanelNode.active=!1,this.currentScoreLabel.node.active=!1,this.anim.resume("LandMove"),this.birdScript.reborn(),this._pipePairNodeList.forEach(function(t){t.getComponent("PipePair").reset()});break;case a.STATE_PLAY:this.birdScript.free(),this.birdScript.jump(),this.readyNode.active=!1,this.tutorialNode.active=!1,this.gameOverNode.active=!1,this.scorePanelNode.active=!1,this.currentScoreLabel.node.active=!0,this.setCurrentScore(0);break;case a.STATE_OVER:this.gameOverNode.active=!0,this.scorePanelNode.active=!0,this.gameOverNode.active=!0,this.scorePanelNode.active=!0,this.currentScoreLabel.node.active=!1,this.birdScript.die(),this.anim.pause("LandMove")}},onExitState:function(t){},getCurrentFrame:function(){return this._currentFrame},getFirstComingPipePairNode:function(){return this._pipePairNodeList[0]},getBestScore:function(){return this._bestScore},getFinalScore:function(){return this._currentScore},_loadScript:function(t,e){var i=document.createElement("script");i.src=t,i.onload=e,document.head.appendChild(i)},_loadAnalysisSDK:function(){this._loadScript("https://jic.talkingdata.com/app/h5/v1?appid=B69267AB1E274FD18327D82EB7FBF0D9&vn=1&vc=1")}});cc._RF.pop()},{PipePair:"PipePair"}],PipePair:[function(t,e,i){"use strict";cc._RF.push(e,"a8779fWqrhHLp43XoyhXtc3","PipePair");var n,a=t("Bird"),o=cc.Class({extends:cc.Component,ctor:function(){this.moving=!1,this.passed=!1},properties:function(){return n=t("Game"),{upNode:{default:null,type:cc.Node},downNode:{default:null,type:cc.Node},game:{default:null,type:n}}},statics:{upInitialPosition:null,downInitialPosition:null,maxDeltaY:200,span:60*a.speed},onLoad:function(){o.upInitialPosition=this.upNode.position,o.downInitialPosition=this.downNode.position},reset:function(){this.upNode.position=o.upInitialPosition,this.downNode.position=o.downInitialPosition,this.moving=!1,this.passed=!1},setup:function(){var t=Math.floor(Math.random()*o.maxDeltaY);this.reset(),this.upNode.y+=t,this.downNode.y+=t,this.moving=!0},update:function(t){if(this.moving&&this.game.inState(n.STATE_PLAY)){this.upNode.x-=a.speed,this.downNode.x-=a.speed;var e=this.upNode.getBoundingBox();e.x+e.width<=-this.upNode.parent.width/2&&this.reset()}},inMoving:function(){return this.moving},getBoundingRight:function(){var t=this.upNode.getBoundingBox();return t.x+t.width},checkCollision:function(t){return cc.Intersection.rectRect(this.upNode.getBoundingBox(),t)||cc.Intersection.rectRect(this.downNode.getBoundingBox(),t)}});cc._RF.pop()},{Bird:"Bird",Game:"Game"}],QL:[function(t,e,i){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}cc._RF.push(e,"75a06C5EF5FM6yosVv9Ibf2","QL");var a=t("Game"),o=t("Benchmark"),r=t("WebUtil"),s=cc.Class({extends:cc.Component,properties:{game:{default:null,type:a},benchmark:{default:null,type:o}},statics:{maxEpisode:200,params:{alpha:.6,gamma:.8,epsilon:0,rewardDead:-100,rewardAlive:1,toString:function(){var t=JSON.stringify(this).replace(/"/g,"").replace(/,/g,", ");return t.substr(1,t.length-2)}},resolution:15},ctor:function(){this.S=null,this.A=null,this.Q=[],this.active=!1,this.train=!0,this.stat={episodes:0,maxScore:0,averageScore:0,_accumalatedScore:0,update:function(t){this._accumalatedScore+=t.getFinalScore(),this.episodes++,this.averageScore=this._accumalatedScore/this.episodes,this.maxScore=t.getBestScore()},toString:function(){var t={};for(var e in this)0>e.indexOf("_")&&(t[e]=this[e]);return JSON.stringify(t)},reset:function(){this.episodes=0,this.maxScore=0,this.averageScore=0,this._accumalatedScore=0}},s.instance=this},onLoad:function(){var t=this;if(cc.sys.isBrowser){var e=r.getButtonContainer(),i=function(){return(t.active?"Disable":"Enable")+"QL"},n=function(){return t.getQString()===s.PRE_TRAINED_Q_STRING?"Reset Q":"Load Q"},a=r.createButton(n(),function(){0<=a.innerHTML.indexOf("Reset")?s.resetQ():s.loadPreTrainedQ(),a.innerHTML=n()});e.appendChild(a);var o=r.createButton(i(),function(){t.setActive(!t.active),o.innerHTML=i()});e.appendChild(o)}},reward:function(t,e){var i=this.S,a=this.A;i&&a in[0,1]&&(this.Q[i][a]=(1-s.params.alpha)*this.Q[i][a]+s.params.alpha*(e+s.params.gamma*Math.max.apply(Math,n(this.Q[t]))))},getState:function(){var t=null,e=this.game.getFirstComingPipePairNode(),i=this.game.birdNode.getBoundingBox();if(e){var n=e.getComponent("PipePair").downNode.getBoundingBox();t=[Math.floor((n.x+144)/s.resolution),Math.floor((n.y+n.height+90-i.y)/s.resolution)].join(",")}return t},update:function(t){if(this.active)if(this.game.inState(a.STATE_TITLE))this.game.changeState(a.STATE_PLAY);else if(this.train)if(!(i=this.getState())||i in this.Q||(this.Q[i]=[0,0]),this.game.inState(a.STATE_PLAY)){var e=0;this.reward(i,s.params.rewardAlive),this.S=i,(e=Math.random()<s.params.epsilon?Math.floor(2*Math.random()):this.Q[i].indexOf(Math.max.apply(Math,n(this.Q[i]))))&&this.game.birdNode.getComponent("Bird").jump(),this.A=e}else this.game.inState(a.STATE_OVER)&&(this.stat.update(this.game),this.benchmark.updateData(s.params,this.stat,this.game),cc.log("current score: "+this.game.getFinalScore()),cc.log(this.stat.toString()),this.reward(i,s.params.rewardDead),this.S=null,this.A=null,this.game.changeState(a.STATE_TITLE),0<s.maxEpisode&&this.stat.episodes>=s.maxEpisode&&(this.benchmark.doNextCase()?this.stat.reset():this.setActive(!1)));else{var i=this.getState();this.Q[i].indexOf(Math.max.apply(Math,n(this.Q[i])))&&this.game.birdNode.getComponent("Bird").jump()}},setActive:function(t){this.active=t,cc.log("QL active: "+this.active),this.active&&cc.log("QL params: "+JSON.stringify(s.params))},getQString:function(){var t=[];for(var e in this.Q)t.push(e+":"+JSON.stringify(this.Q[e]));return t.join(";")}});s.PRE_TRAINED_Q_STRING="19,3:[4.831915224592151,0];18,2:[4.886491692531827,0];18,1:[4.913850152189255,0];18,0:[4.944048151981356,0];17,0:[4.992580441025385,0];16,0:[4.999999999935971,0];15,1:[4.999999999906051,0];15,2:[4.999999999873328,0];14,3:[4.99999999982618,0];14,4:[4.999999999824302,0];14,5:[4.999999999848923,0];14,6:[4.9999999998580975,0];13,7:[4.999999999796092,0];13,8:[-1.2622157776496414,4.999999999732799];13,9:[-55.61602236045352,4.999999999849428];13,10:[-55.82138380963547,4.999999999445732];12,11:[4.989976879483056,-24.422199638089722];12,12:[4.962955230854817,-56.32020412427804];12,13:[4.961275716339615,0];12,14:[4.795330396885419,-22.354972012283017];11,14:[-60,1.979895103318605];19,0:[4.818290262222322,0];18,-1:[4.928684218452201,0];18,-2:[4.539431333163787,0];17,-3:[4.991711282459561,0];16,-3:[4.999999999540177,0];16,-2:[4.999999999914202,0];15,-2:[4.999999999917078,0];15,-1:[4.999999999912584,0];14,0:[4.999999999873984,0];14,1:[4.999999999861963,0];14,2:[4.9999999998706635,0];13,4:[4.999999999838316,0];13,5:[4.999999999838285,0];13,6:[4.999999999857684,0];12,8:[-1.10703367942072,4.999999999743524];12,9:[4.999999998878401,-55.76901776285585];12,10:[4.999999994604473,-10.277305518488792];11,12:[-26.693211648000002,4.365465929054414];11,13:[3.797400584270374,-111.459606528];19,7:[4.509795386881979,0];18,6:[4.732316501191625,0];18,5:[4.795031777622974,0];17,4:[4.738263221489093,0];16,4:[4.99999999992453,0];16,5:[4.999999999946432,0];15,5:[4.999999999922047,0];15,6:[4.9999999999124345,0];15,7:[4.999999999889734,0];14,7:[4.999999999904946,0];14,8:[-6.63577840127833,4.999999999901177];14,9:[-55.601100003604714,4.999999999891628];14,10:[4.999999999373694,-55.62925229881479];13,11:[-6.643078354063659,4.999999999933557];13,12:[-2.6494592901562077,4.999999999740504];13,13:[-58.27983613032511,4.99999998237183];13,14:[-67.06651189906961,4.986599028583541];12,15:[-63.749123033550795,4.548446364805516];12,16:[-56.96520031254103,4.365255698713698];12,17:[3.534670847418978,0];12,18:[-1.6131328122224655,3.481199828441564];11,19:[-27.779519999999998,-5.046793366634498];11,20:[-60,-13.780896260259844];19,1:[4.862655547139472,0];17,-2:[4.998721491238795,0];15,0:[4.999999999816481,0];11,11:[-58.90598399999999,4.966306184829141];10,10:[-22.60710047640493,4.893233700465634];10,9:[4.998192947610266,-109.07012184739021];9,9:[-25.144067411974852,4.836267394487722];8,9:[-5.649837290810998,-55.902224635620485];8,10:[-8.318935883382895,-61.036612099808416];7,11:[-23.659638927931226,-11.936833086291397];7,12:[-73.9550438534794,-14.830732024923286];6,13:[-59.471999999999994,-20.8108394131859];6,12:[-17.963063635134922,-42.22463697961105];6,11:[-83.904,-26.919123496373494];5,11:[0,0];16,-1:[4.999999999915531,0];10,11:[-11.04751065333224,4.441097305826316];8,11:[-18.066963370153196,-4.932426849632051];7,13:[-27.370329599999998,-20.376449643948092];11,15:[-59.471999999999994,-10.259707179309398];19,-4:[3.970076629185754,0];18,-5:[4.795136673196086,0];18,-6:[3.8341243788651935,0];17,-6:[4.961206021346744,0];17,-7:[4.720385853938195,0];16,-7:[4.999999588684733,0];16,-6:[4.999999832240938,0];15,-6:[4.999999760825821,0];15,-5:[4.999999933710615,0];15,-4:[4.999999965367293,0];14,-4:[4.999999999702149,0];14,-3:[4.999999999876862,0];14,-2:[4.9999999999022,0];14,-1:[4.999999999791545,0];13,0:[4.9999999996748645,0];13,1:[4.999999999740311,0];13,2:[4.999999999760396,0];13,3:[4.999999999656224,0];12,4:[4.99999999974826,0];12,5:[4.999999999442131,0];12,6:[4.999999999345256,0];12,7:[4.9999999997628475,0];11,8:[-24.20672264699444,4.999999999552675];11,9:[-60,4.999998896159009];16,1:[4.999999999902003,0];15,3:[4.999999999916621,0];10,13:[3.5100821078571016,0];10,12:[4.0387735233438775,0];9,10:[-10.140545771770423,-60];7,10:[-15.205657295599616,-31.489195026557407];19,5:[4.612584054658994,0];18,4:[4.64145212365281,0];18,3:[4.772862660654118,0];17,2:[4.862729401318906,0];16,2:[4.999999999917406,0];16,3:[4.999999999930514,0];15,4:[4.999999999936438,0];11,17:[-10.102464,3.530812548865782];11,18:[-80.237184,3.1547273736544934];19,-2:[4.517283942064476,0];18,-3:[4.738681376411596,0];18,-4:[4.609767905503163,0];17,-5:[4.862934311296978,0];16,-5:[4.999999939574024,0];16,-4:[4.999999997326645,0];15,-3:[4.999999999849359,0];11,10:[-58.02587792213466,4.999990342804422];17,-4:[4.994671412219409,0];10,8:[-24.755963559734898,4.999999999404535];10,7:[4.999999998725901,0];10,6:[4.99999999818458,0];9,6:[4.999999998389822,0];9,5:[4.9999999973100175,0];8,5:[4.999999995567526,0];8,6:[-5.703106014790166,4.999999997175657];7,6:[-39.048063808328955,4.999999997804794];7,7:[-32.802176157641185,4.998746220800319];6,8:[-16.164794916476502,-97.79361272173655];6,9:[-39.91356665562721,-79.23657597901509];6,10:[-44.39360493142138,-65.58857993366023];5,10:[-60,0];19,8:[3.986308941714956,0];18,7:[4.200745813278166,0];17,5:[4.937698567220511,0];16,6:[4.999999999930252,0];15,8:[-0.8660926728769427,4.999999999935177];14,11:[-55.92787121451656,4.9999999999320845];13,15:[4.9910865779378755,-8.339637889599047];12,19:[1.835494821888,0];10,18:[2.33807737995264,0];10,17:[2.824868748676301,0];9,17:[0.6,0];9,16:[2.318083345195771,0];8,17:[1.5539278848000002,0];8,18:[0.84,0];7,18:[1.1280000000000001,0];7,19:[1.0512000000000001,0];7,20:[0.6,0];6,21:[-59.471999999999994,-60];10,16:[2.7301361145245275,0];8,16:[1.104576,0];6,20:[-59.76,0];5,9:[-60,0];17,3:[4.973643820991381,0];9,8:[-0.9807016712749144,4.999999998826052];9,7:[-0.7878127834432975,4.999999998396566];8,7:[-0.7213874892461076,4.9999999977228];7,8:[-17.182878250301577,-24.59097135192689];7,9:[-30.50792761130783,-38.067549710967306];6,7:[-63.51039721624199,-67.71672578063765];5,7:[0,0];9,15:[2.9165519901374717,0];8,15:[2.39764082957353,0];7,16:[1.9402768588800001,0];7,17:[1.8437914828800004,0];6,17:[-59.30445312,2.27702970335232];6,18:[-59.5488,2.03415717888];6,19:[0.888,0];5,20:[0,0];19,4:[4.634138410340718,0];17,1:[4.921049466880499,0];11,7:[4.99999999950863,0];10,5:[4.999999998967664,0];5,8:[-60,-60];17,-1:[4.9904046572702,0];11,6:[4.999999999523075,0];8,8:[-4.311307833590571,-13.11854320255176];6,14:[-80.79552,-60];19,2:[4.602532705769747,0];6,6:[-89.294208,-22.05485935630349];5,6:[0,0];11,16:[3.3301145017553417,0];10,15:[3.4032928748550297,0];10,14:[3.467151134792026,0];9,13:[3.4410060344493236,0];8,13:[-3.4880020555099267,-5.221795852097905];8,14:[2.632908642857914,0];7,14:[-9.021548341025653,-6.746265804646073];7,15:[-31.718692637736957,1.3701590981038145];6,16:[-27.279755400806398,-19.1315328];5,18:[0,0];19,9:[2.982949902439715,0];18,8:[3.8364298970828887,0];17,6:[4.89948268138215,0];16,7:[4.999999999889515,0];15,9:[-24.110914058468733,4.999999999926653];14,12:[-0.0645675332650606,4.999999999941193];13,16:[-0.7708904202828575,4.981556883907246];12,20:[-58.65795072,0];11,21:[-59.00736,-5.245312880640001];11,22:[-60,0];9,14:[3.2256667221735538,0];6,15:[-37.253568,-83.904];5,15:[0,0];5,17:[0,0];5,14:[0,0];6,5:[-25.240889097580975,4.999999996026851];6,4:[4.999999992947161,0];5,4:[4.99999998847416,0];5,3:[4.999999985288152,0];4,4:[4.999999987592803,0];4,5:[-27.744867839999998,4.99999999231189];3,5:[-27.779519999999998,4.999999987806604];3,6:[-112.8,-60];7,5:[-27.660547698990094,4.999999995434663];6,3:[4.99999998328572,0];4,3:[4.999999987410127,0];2,6:[-112.8,-60];9,12:[-56.9431640490967,0];8,12:[-0.19489727613804764,1.2501152945662308];9,11:[-57.10893661337394,-18.28127337955737];19,6:[4.782032817409332,0];11,5:[4.99999999931731,0];5,2:[4.999999983133884,0];4,2:[4.999999990389119,0];3,2:[4.999999996103467,0];3,3:[4.999999988077984,0];2,4:[4.999999990091101,0];2,5:[-27.81024,4.999999991001019];1,6:[-112.8,-60];3,4:[4.999999987128053,0];2,3:[4.999999989548572,0];2,2:[4.999999995869144,0];1,1:[4.999999995184425,0];0,1:[4.999999999947837,0];7,4:[4.999999991292039,0];0,2:[4.999999995385079,0];6,2:[4.999999983377156,0];2,1:[4.99999999549672,0];5,5:[-26.241334574267242,4.999999987975514];4,6:[-112.8,-112.8];1,2:[4.999999994463884,0];8,4:[4.9999999967989694,0];7,3:[4.99999998735818,0];19,-1:[4.699170480415383,0];0,3:[4.999999978868908,0];0,4:[4.999999985291085,0];8,3:[4.999999988844446,0];7,2:[4.999999975358376,0];16,11:[4.99999999996264,0];15,11:[-3.1787587416692924,4.999999999950356];15,12:[4.999999999963541,0];15,13:[4.999999999970152,0];14,14:[-55.600017636208655,4.9999999999457625];14,15:[-59.399584545518046,4.999999999012934];14,16:[4.999999760200392,-55.6000008514631];14,17:[4.988724795689918,-108.92949394480357];13,18:[3.659773177381675,-60];13,19:[-9.679093247999997,3.726798935651158];13,20:[-59.255424,0];3,1:[4.999999990557473,0];15,10:[-24.09153554104108,4.999999999936366];14,13:[-25.65248477428401,4.999999999837603];13,17:[-27.591359999999998,3.9645027360955103];16,8:[4.9999999999384865,0];8,19:[-60,0];16,9:[4.999999999944645,0];1,4:[4.99999999927773,0];1,3:[4.99999999323672,0];14,-6:[4.999999909580857,0];14,-5:[4.999999986291465,0];13,-4:[4.999999999792209,0];13,-3:[4.999999999750369,0];13,-2:[4.999999999821148,0];13,-1:[4.999999999804402,0];12,0:[4.99999999963579,0];12,1:[4.999999999570056,0];12,2:[4.999999999592982,0];12,3:[4.999999999496776,0];11,4:[4.999999998944578,0];10,4:[4.99999999853754,0];9,4:[4.999999996898429,0];1,5:[-28.2,4.99999996062276];16,10:[4.999999999920198,0];15,-11:[4.999982492565974,0];15,-10:[4.9999952379969335,0];14,-10:[4.999993211004517,0];14,-9:[4.999994873943036,0];13,-8:[4.999999502033372,0];13,-7:[4.999999814433719,0];13,-6:[4.999999931601081,0];13,-5:[4.999999915248866,0];12,-4:[4.999999988344786,0];12,-3:[4.999999995650645,0];12,-2:[4.999999999564101,0];12,-1:[4.999999999688676,0];11,0:[4.999999999283123,0];11,1:[4.999999999176017,0];11,2:[4.999999999283249,0];10,3:[4.999999999041076,0];16,-9:[4.999996510302973,0];15,-9:[4.999998696655806,0];15,-8:[4.999999389936008,0];14,-8:[4.999999525590611,0];14,-7:[4.99999977728309,0];18,9:[3.386237350555028,0];17,7:[3.931487234561363,0];15,-7:[4.999999376148239,0];16,12:[4.999999999937903,0];15,14:[-24.088000000257793,4.999999999823735];11,3:[4.999999999198069,0];15,15:[-9.177066496079712,4.999999999850289];14,18:[-60,4.99471920400993];16,-8:[4.999995660321709,0];15,17:[-26.27493001484914,4.999999214085548];15,18:[4.870188822367302,0];14,19:[-2.733275488271952,4.989952591081619];14,20:[4.534710710574134,0];14,21:[-60,3.8877691785422104];16,-11:[4.999977522994404,0];16,15:[4.999998880819946,0];15,16:[4.999999201808345,-6.813761902439071];16,13:[4.999999999797456,0];16,-10:[4.999989319258362,0];16,14:[4.999999999699753,0];16,16:[4.99999810897031,0];15,19:[4.784120376082418,0];19,-3:[3.8431481712182567,0];4,1:[4.999999987670487,0];13,-9:[4.999990444674339,0];12,-7:[4.9999993911918565,0];12,-6:[4.999996724258061,0];12,-5:[4.999999977294257,0];11,-3:[4.999998672045124,0];11,-2:[4.999999998469114,0];11,-1:[4.999999999062832,0];10,0:[4.999999999135525,0];10,1:[4.999999997405663,0];10,2:[4.999999999236939,0];5,1:[4.999999991580955,0];6,1:[4.999999986811414,0];0,5:[-27.864,4.999999905353685];0,6:[-23.4,-60];16,18:[4.945148774942442,0];15,20:[-59.14289383833599,4.90357086885006];11,-5:[4.999996748979113,0];11,-4:[4.999999427648939,0];10,-2:[4.9999988620299565,0];10,-1:[4.999999957351211,0];9,2:[4.999999996503957,0];9,3:[4.999999996575613,0];14,-12:[4.999935750891038,0];13,-12:[4.999955098626613,0];13,-11:[4.9999851867733796,0];13,-10:[4.999989548983951,0];12,-10:[4.999954132319765,0];12,-9:[4.9999072189358005,0];12,-8:[4.99999440244139,0];11,-7:[4.999671090166013,0];11,-6:[4.999987997458036,0];10,-4:[4.999934027793864,0];10,-3:[4.999992011879312,0];9,0:[4.999947298588784,0];9,1:[4.999999989572278,0];14,-11:[4.999985852670447,0];16,17:[4.996849574935551,0];16,-12:[4.999901137242681,0];15,-12:[4.999940680790248,0];12,-11:[4.999960909773508,0];11,-8:[4.987952771971411,0];10,-5:[4.9999999799905,0];9,-1:[4.9999999715346,0];10,-6:[4.979085576427018,0];9,-2:[4.979119654729359,0];8,2:[4.979519874239664,0];11,-9:[4.676519985733445,0]",s.loadPreTrainedQ=function(){var t={};s.PRE_TRAINED_Q_STRING.split(";").forEach(function(e){var i=e.split(":");t[i[0]]=JSON.parse(i[1])}),s.instance.Q=t},s.resetQ=function(){s.instance.Q={},s.instance.S=null,s.instance.A=null},cc.QL=s,cc._RF.pop()},{Benchmark:"Benchmark",Game:"Game",WebUtil:"WebUtil"}],WebUtil:[function(t,e,i){"use strict";cc._RF.push(e,"c2adeejMJ5JupjOEuFtBcgl","WebUtil");var n={getButtonContainer:function(){var t=null;return cc.sys.isBrowser&&((t=document.getElementById("buttonContainer"))||((t=document.createElement("DIV")).id="buttonContainer",document.getElementById("Cocos2dGameContainer").appendChild(t))),t},createButton:function(t,e){var i=document.createElement("BUTTON");return i.innerHTML=t,i.style.margin="10px",i.style.flexShrink="0",i.onclick=e,i}};e.exports=n,cc._RF.pop()},{}]},{},["Benchmark","Bird","Game","PipePair","QL","WebUtil"]);
//# sourceMappingURL=project.js.map