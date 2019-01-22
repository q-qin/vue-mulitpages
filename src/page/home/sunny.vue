<template>
    <div >
    	<!-- 全局header -->
	    <nv-head ref="head"
	            :show-head="false"
	            :fix-head="true"
	            :show-back="true"
	            :show-menu="false"
	            :page-name="$route.meta.title" >
	    </nv-head>
        <div class="main" :class="{'fix-head':true}">
        	<div style="position:relative;">
				<canvas id="doraemon" width="400" height="600"></canvas>
				<div style="position:absolute;top:40px;left:80px;">
					<canvas id="lefteye" width="200" height="200"></canvas>
				</div>
				<div style="position:absolute;top:40px;left:170px;">
					<canvas id="righteye" width="200" height="200"></canvas>
				</div>
			</div>
        </div>
    </div>
</template>
<script>
    import nvHead from '@/components/header.vue';
    export default {
        components: {
            nvHead
        }
    };
    window.onload = function () {
    	var cxt = document.getElementById('doraemon').getContext('2d');
        /* 头部*/
        cxt.beginPath();//起始路径
        cxt.lineWidth = 1;//线宽度为1
        cxt.strokeStyle = '#000';//笔触的颜色
        cxt.arc(200, 175, 175, 0.7 * Math.PI, 0.3 * Math.PI);//绘制弧，中心点（200，175），半径175
        cxt.fillStyle = '#0bb0da';//设置填充时的颜色
        cxt.fill();//填充颜色
        cxt.stroke();//绘制路径
        /*脸部*/
        cxt.beginPath();
        cxt.fillStyle = '#fff';
        cxt.moveTo(110, 110);//将路径移到点（110，110），不创建线条
        cxt.quadraticCurveTo(-10, 200, 120, 315);//创建二次贝塞尔曲线,控制点(-10,200),结束点(120,315)
        cxt.lineTo(280, 315);//添加一个新点，然后在画布中创建从（110，110）到（280，315）的线条
        cxt.quadraticCurveTo(410, 210, 290, 110);
        cxt.lineTo(110, 110);
        cxt.fill();
        cxt.stroke();
        /*眼睛*/
        cxt.beginPath();
        cxt.lineWidth = 1;
        cxt.fillStyle = '#fff';
        cxt.moveTo(110, 110);
        cxt.bezierCurveTo(110, 25, 200, 25, 200, 100);//创建三次贝塞尔曲线,控制点1(110,25),控制点2(200,25),结束点(200,100)，也就是画左上半椭圆
        cxt.bezierCurveTo(200, 175, 110, 175, 110, 100);//画左下半椭圆
        cxt.moveTo(200, 100);
        cxt.bezierCurveTo(200, 25, 290, 25, 290, 100);
        cxt.bezierCurveTo(290, 175, 200, 175, 200, 100);
        cxt.fill();
        cxt.stroke();
        /*右眼球*/
        cxt.beginPath();
        cxt.fillStyle = '#000';
        cxt.arc(230, 130, 12, 0, 2 * Math.PI);
        cxt.fill();
        cxt.stroke();
        /*左眼球*/
        cxt.beginPath();
        cxt.fillStyle = '#000';
        cxt.arc(170, 130, 12, 0, 2 * Math.PI);
        cxt.fill();
        cxt.stroke();
        /* 鼻子*/
        cxt.beginPath();
        cxt.arc(200, 165, 25, 0, 2 * Math.PI);
        cxt.fillStyle = '#b13209';
        cxt.fill();
        cxt.stroke();
        /*胡须*/
        //左胡须
        cxt.beginPath();
        cxt.moveTo(80, 175);
        cxt.lineTo(150, 195);
        cxt.moveTo(80, 200);
        cxt.lineTo(150, 205);
        cxt.moveTo(80, 225);
        cxt.lineTo(150, 215);
        //中部胡须
        cxt.moveTo(200, 195);
        cxt.lineTo(200, 290);
        //右胡须
        cxt.moveTo(250, 195);
        cxt.lineTo(320, 175);
        cxt.moveTo(250, 205);
        cxt.lineTo(320, 200);
        cxt.moveTo(250, 215);
        cxt.lineTo(320, 225);
        cxt.stroke();
        /*嘴*/
        cxt.moveTo(80, 240);
        cxt.quadraticCurveTo(200, 350, 320, 240);
        cxt.stroke();
        /*围巾*/
        cxt.beginPath();
        cxt.moveTo(96, 316);
        cxt.lineTo(305, 316);
        cxt.lineTo(320, 316);
        cxt.arcTo(330, 316, 330, 326, 10);//在画布上创建介于两个切线之间的弧，起点坐标为(330,316),终点坐标为(330,326),半径为10
        cxt.lineTo(330, 336);
        cxt.arcTo(330, 346, 305, 346, 10);
        cxt.lineTo(81, 346);
        cxt.arcTo(71, 346, 71, 336, 10);
        cxt.lineTo(71, 326);
        cxt.arcTo(71, 316, 81, 316, 10);
        cxt.lineTo(96, 316);
        cxt.fillStyle = '#b13209';
        cxt.fill();
        cxt.stroke();
        /*下半身*/
        cxt.beginPath();
        cxt.fillStyle = '#0bb0da';
        cxt.moveTo(80, 346);
        //左衣服
        cxt.lineTo(26, 406);
        cxt.lineTo(65, 440);
        cxt.lineTo(85, 418);
        cxt.lineTo(85, 528);
        cxt.lineTo(185, 528);
        //右衣服
        cxt.lineTo(315, 528);
        cxt.lineTo(315, 418);
        cxt.lineTo(337, 440);
        cxt.lineTo(374, 406);
        cxt.lineTo(320, 346);
        cxt.fill();
        cxt.stroke();    

        var ctx1 = document.getElementById('lefteye').getContext('2d');
        ctx1.beginPath();
		ctx1.moveTo(75,40);
		ctx1.bezierCurveTo(75,37,70,25,50,25);
		ctx1.bezierCurveTo(20,25,22,62.5,22,55);
		ctx1.bezierCurveTo(20,80,40,102,75,120);
		ctx1.bezierCurveTo(110,102,130,80,128,55);
		ctx1.bezierCurveTo(128,55,130,25,100,25);
		ctx1.bezierCurveTo(85,25,75,37,75,40);
		var gradient=ctx1.createRadialGradient(0,0,0,0,0,150);
		gradient.addColorStop(0,"rgba(255,0,0,1)");
		gradient.addColorStop(1,"rgba(255,255,255,1)");
		ctx1.fillStyle=gradient;
		ctx1.fill();

        var ctx1 = document.getElementById('righteye').getContext('2d');
        ctx1.beginPath();
		ctx1.moveTo(75,40);
		ctx1.bezierCurveTo(75,37,70,25,50,25);
		ctx1.bezierCurveTo(20,25,22,62.5,22,55);
		ctx1.bezierCurveTo(20,80,40,102,75,120);
		ctx1.bezierCurveTo(110,102,130,80,128,55);
		ctx1.bezierCurveTo(128,55,130,25,100,25);
		ctx1.bezierCurveTo(85,25,75,37,75,40);
		var gradient=ctx1.createRadialGradient(0,0,0,0,0,150);
		gradient.addColorStop(1,"rgba(255,255,255,1)");
		gradient.addColorStop(0,"rgba(255,0,0,1)");
		ctx1.fillStyle=gradient;
		ctx1.fill();
    }
</script>
<style lang="less" scoped>
	@import '../colors.less';
	.main{
		width: 100vw;
		height: 100vh;
		&.fix-head{
			margin-top: 2.2rem;
		}
	}
	#doraemon {
        background-color: #fff;
        display: block;
    }
</style>