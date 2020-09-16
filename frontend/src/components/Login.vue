<template>
        <div class="homeBox">
            <canvas id="canvas"></canvas>
            <!-- <canvas id="canvas" :style="{height: screenHeight+'px'}"></canvas> -->
            <div style="width:32%;height: auto;margin-left: 30%">
                <div class="title0">自动化接口测试平台</div>
                <div class="title1">项目管理、接口管理、用例管理、测试报告、任务设置</div>
                <div class="lun-container">
                    <div class="carouse" id="carouse1">
                        <div class="pic1"><img src="../assets/page1_0.png" alt="pic1"></div>
                        <div class="pic2"><img src="../assets/page1_1.png" alt="pic2"></div>
                        <div class="pic3"><img src="../assets/page1_2.png" alt="pic3"></div>
                    </div>
                </div>
                <!-- <img class="img-login" src="../assets/page1_3.jpg"/> -->
            </div>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm login-container">
                <h3 class="title">系统登录</h3>
                <el-form-item prop="account">
                    <el-input type="text" v-model.trim="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model.trim="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <el-button  type="text" @click.native.prevent="handleReset2">重置</el-button>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </template>
<script>
    
/* eslint-disable */
        import { requestLogin, recordVisitor } from '../api/api';
        export default {
            data () {
                return {
                   

                    logining: false,
                    ruleForm2: {
                        // account: '',
                        // checkPass: ''
                        account: '1008610086',
                        checkPass: 'burnish1234'
                    },
                    rules2: {
                        account: [
                            { required: true, message: '请输入账号', trigger: 'blur' }
                            // { validator: validaePass }
                        ],
                        checkPass: [
                            { required: true, message: '请输入密码', trigger: 'blur' }
                            // { validator: validaePass2 }
                        ]
                    },
                    checked: true
                }
            },
         

            mounted (){

            // this.getVisitor();
            // this.carouselPicture()
                // CANVAS
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var cw = canvas.width = window.innerWidth,
                cx = cw / 2;
            var ch = canvas.height = window.innerHeight,
                cy = ch / 2;
 
            var requestId = null;
 
            var colors = ["#93DFB8", "#FFC8BA", "#E3AAD6", "#B5D8EB", "#FFBDD8"];
 
            function Particle() {
                this.x = Math.random() * cw;
                this.y = Math.random() * ch;
                this.r = 15 + ~~(Math.random() * 20); //radius of the circumcircle
                this.minR = 2 + ~~(Math.random() * 2) ;
                this.maxR = 6 + ~~(Math.random() * 2) ;
                this.l = 3 + ~~(Math.random() * 2); //polygon sides
                this.a = 2 * Math.PI / this.l;      // angle between polygon vertices
                this.rot = Math.random() * Math.PI; // polygon rotation
                this.speed = .05 + Math.random() / 2;
                this.rotSpeed = 0.005 + Math.random() * .005;
                this.color = colors[~~(Math.random() * colors.length)];
            }
            Particle.prototype.update = function() {
                if(this.y < -this.r) {
                    this.y = ch + this.r;
                    this.x = Math.random() * cw;
                }
                this.y -= this.speed;
            }
            Particle.prototype.draw = function() {
                ctx.save();      //多边形
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rot);
                ctx.beginPath();
                for(var i = 0; i < this.l; i++) {
                    var x = this.r * Math.cos(this.a * i);
 
                    var y = this.r * Math.sin(this.a * i);
                    ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = this.color;
                ctx.stroke();
                ctx.restore();
 
                ctx.save();       //星星
                ctx.beginPath();
                ctx.translate(this.x / 1.1, this.y / 2);
                ctx.rotate(this.rot);
                ctx.globalAlpha = light;
                for(var i = 0; i < 5; i ++){
                    var x = 5;
                    var y = 5;
                    ctx.lineTo( Math.cos( (18 + i*72 )/180 * Math.PI) * this.maxR + x,
                                -Math.sin( (18 + i*72 )/180 * Math.PI) * this.maxR + y)
                    ctx.lineTo( Math.cos( (54 + i*72 )/180 * Math.PI) * this.minR + x,
                                -Math.sin( (54 + i*72 )/180 * Math.PI) * this.minR + y)
                }
                ctx.closePath();
                ctx.lineWidth = 1;
                ctx.fillStyle = "#fbd94e";
                ctx.strokeStyle = "#fbd94e";
                ctx.lineJoin = "round";
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
 
            var particles = [];
            for(var i = 0; i < 20; i++) {
                var p = new Particle();
                particles.push(p)
            }
 
            function Draw() {
                requestId = window.requestAnimationFrame(Draw);
                //ctx.globalAlpha=0.65;
                ctx.clearRect(0, 0, cw, ch);
                particles.map((p) => {
                    p.rot += p.rotSpeed;
                    p.update();
                    p.draw();
                })
 
            }
 
            function Init() {
                if(requestId) {
                    window.cancelAnimationFrame(requestId);
                    requestId = null;
                }
 
                cw = canvas.width = window.innerWidth, cx = cw / 2;
                ch = canvas.height = window.innerHeight, cy = ch / 2;
 
                //particles.map((p) => p.update());
                Draw();
            };
 
            setTimeout(function() {
                Init();
                window.addEventListener('resize', Init, false);
            }, 15);
 
            var light = 1;    //透明度
            setInterval(function(){
                if(light == 1){
                    light = .5;
                }else{
                    light = 1;
                }
            },350)
            }  ,      


                        
            methods: {
                
                //重置
                handleReset2 () {
                    this.$refs.ruleForm2.resetFields()
                },
    
                // login(){
                //     var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };

                //     this.$refs.ruleForm2.validate(async valid=>{
                //         if(!valid) return;
                //         const result = await this.$http.post('/api/user/login',loginParams );
                //         console.log(result);


                //     })
                // },
                // 登录校验
                handleSubmit2() {
                    var _this = this;
                    this.$refs.ruleForm2.validate((valid) => {
                        if (valid) {
                            // _this.$router.replace('/table');
                            this.logining = true;
                            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
                            requestLogin(loginParams).then(_data => {
                                _this.logining = false;
                                let { msg, code, data } = _data;
                                console.log(_data);
                                if (code === '201') {
                                    _this.$message.success({
                                        message: msg,
                                        center: true
                                    })
                                    sessionStorage.setItem('username', JSON.stringify(data.first_name));
                                    sessionStorage.setItem('token', 'Token '+data.key);
                                    console.log(_this.$route);
                                    if (_this.$route.query.url) {
                                        _this.$router.push(_this.$route.query.url);
                                    } else {
                                        _this.$router.push('/projectList');
                                    }
                                }
                                else {
                                    _this.$message.error({
                                        message: msg,
                                        center: true
                                    })
                                }
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },
                
              
                
    
            },
         
        }
        
    

      
    </script>
    
    <style lang="scss" scoped>
        .homeBox {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0px;
            background-color: #191c2c;
        }
      .login-container {
    
        position: absolute;
        opacity: .8;

        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
      
        width: 300px;
        
        padding: 35px 35px 15px 35px;
        /* background: #23305a; */
        background: radial-gradient(#374566,#1a1f30);
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        z-index: 1000;
        float: right;
        right: 42%;
        top: 40%;
   
        .title {
          margin: 0px auto 40px auto;
          text-align: center;
          color: #2ec0f6;
        }
        .remember {
          margin: 0px 15px 35px 0px;
            color: #eaeaea;
        }
      }
        .img-login {
            margin-top: -35%;
            width: 100%;
            height: auto;
        }
        .title0 {
            position: absolute;
            top: 10%;
            left: -41px;
            width: 100%;
            text-align: center;
            color: #2ec0f6;
            font-size: 40px;
            height: 70px;
            line-height: 70px;
            /*<!--margin: -300px 0 0 0;-->*/
            z-index: 1000;
        }
        .title1 {
            position: absolute;
         
            top: 16%;
            left: -41px;
            width: 100%;
            text-align: center;
            color: #eaeaea;
            font-size: 20px;
            height: 70px;
            line-height: 70px;
            /*<!--margin: -300px 0 0 0;-->*/
            z-index: 1000;
            margin-top: 25px;
        }
        .tyg-div {
            color: #0ab0ec;
            text-shadow:0 0 10px #FFFFFF;
            z-index: -1000;
            float: left;
            position: absolute;
            left: 5%;
            top: 20%;
            font-size: 30px;
            list-style-type:none
        }
        .lun-container{
            width: 210px;
            height:140px;
            position: relative;
            font-size: 32px;
            color: #FFFFFF;
            text-align: center;
            line-height: 90px;
            margin: 200px auto;
            margin-bottom: 0px;
            margin-top:48%;
            perspective: 1000px;
            z-index: 1000;
        }
        .carouse{
            transform-style:preserve-3d;
    
        }
        .carouse div{
            display: block;
            position: absolute;
            width: 140px;
            height: 90px;
        }
    
        .carouse .pic1{
            transform: rotateY(0deg) translateZ(160px);
        }
        .carouse .pic2{
            transform: rotateY(120deg) translateZ(160px);
        }
        .carouse .pic3{
            transform: rotateY(240deg) translateZ(160px);
        }
    
        /*=== 下一个动画 ===*/
        @keyframes to-scroll1 {
            0%{
                transform: rotateY(0deg);
            }
    
            33%{
                transform: rotateY(-120deg);
    
            }
            66%{
                transform: rotateY(-240deg);
    
            }
            100%{
                transform: rotateY(-360deg);
    
            }
    
        }
        #carouse1{
            animation: to-scroll1  10s ease infinite;
            /*animation-fill-mode: both;*/
        }
        .canvas {
                position: fixed;
                z-index: -1;
                top: 0;
                height: 100%;
                width: 100%;
                background: radial-gradient(#374566, #010203);
            }
        
    </style>
    