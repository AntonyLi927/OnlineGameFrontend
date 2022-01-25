<template>
  <div class="pictionary-container clearfix">
    

    <!-- 输入room code的地方 -->
    <div class="shadow" :class="isShadow">
      <div class="enter-room-id-wrapper" :class="isEnterRoomId">
        <div class="close-wrapper">
          <button class="close-btn" @click="closeEnterRoom">X</button>
        </div>
        <div class="enter-room-code-title">
          <h1>ROOM CODE</h1>
        </div>
        <div class="room-code-input-box">
          <input type="text">
        </div>
        <div class="join-room-wrapper">
          <button class="join-room-btn">JOIN</button>
        </div>
      </div>
    </div>

    <!-- 一进来pictionary游戏显示的 -->
    <div class="pictionary-menu-wrapper" :class="isMenuShow">
      <div class="pictionary-title-wrapper">
          <h1>Pictionary</h1>
      </div>
      <div class="pictionary-menu-content">
          <div class="pictionary-image-wrapper">

          </div>
          <div class="pictionary-menu-list">
            <div class="create-room">
              <button class="create-room-btn" @click="showGame">Create New Room</button>
            </div>
            <div class="enter-room-code">
              <button class="enter-room-code-btn"  @click="enterRoomId">Enter Room Code</button>
            </div>
            <div class="pictionary-game-rules">
              <button class="game-rules-btn">
                About Pictionary
              </button>
            </div>
          </div>
      </div>
    </div>
    
    <div class="word-wrapper" :class="isShowWord">
        <h2>_ _ _ _ _</h2>
    </div>
    <!-- 游戏页面 -->
    <div class="main-area" :class="isShowMainArea">
      <div class="rank-wrapper">
        <table class="rank-table">
          <tr>
            <td>
              <div class="player">
                <div class="player-rank">
                    #4
                </div>
                <div class="player-avatar">
                  <div class="avatar-wrapper">
                    <img>
                  </div>   
                </div>
                <!-- <div class="player-info"> -->
                <div class="player-name"></div>
                  
                <!-- </div> -->
                <div class="player-points">2000</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="player">
                <div class="player-rank">
                    #4
                </div>
                <div class="player-avatar">
                  <div class="avatar-wrapper">
                    <img>
                  </div>   
                </div>
                <!-- <div class="player-info"> -->
                <div class="player-name">Antony</div>
                  
                <!-- </div> -->
                <div class="player-points">2000</div>
              </div>
            </td>
          </tr>
        </table>
      </div>     
      <div class="game-screen">
        <div class="game-info">
          <div>asd</div>

          <div class="toolkit">
            <div class="color-chosen-wrapper">
              <div class="color-chosen" :style="{backgroundColor: strokeColor}">
                
              </div>
            </div>
            <div class="palette">
              <div class="palette-row">
                <div
                  class="color-option"
                  style="background: rgb(255, 255, 255)"
                  @click="changeColor('rgb(255, 255, 255)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(193, 193, 193)"
                  @click="changeColor('rgb(193, 193, 193)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(239, 19, 11)"
                  @click="changeColor('rgb(239, 19, 11)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(255, 113, 0)"
                  @click="changeColor('rgb(255, 113, 0)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(225, 228, 0)"
                  @click="changeColor('rgb(225, 228, 0)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(0, 204, 0)"
                  @click="changeColor('rgb(0, 204, 0)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(0, 178, 255)"
                  @click="changeColor('rgb(0, 178, 255)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(211, 124, 170)"
                  @click="changeColor('rgb(211, 124, 170)')"
                ></div>
              </div>
              <div class="palette-row">
                  <div
                  class="color-option"
                  style="background: rgb(0, 0, 0)"
                  @click="changeColor('rgb(0, 0, 0)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(76, 76, 76)"
                  @click="changeColor('rgb(76, 76, 76)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(116, 11, 7)"
                  @click="changeColor('rgb(116, 11, 7)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(194, 56, 0)"
                  @click="changeColor('rgb(194, 56, 0)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(232, 162, 0)"
                  @click="changeColor('rgb(232, 162, 0)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(0, 85, 16)"
                  @click="changeColor('rgb(0, 85, 16)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(35, 31, 211)"
                  @click="changeColor('rgb(35, 31, 211)')"
                ></div>
                <div
                  class="color-option"
                  style="background: rgb(167, 85, 116)"
                  @click="changeColor('rgb(167, 85, 116)')"
                ></div>
              </div>
            </div>

            <div class="stroke-width"></div>

            <div class="stroke-type">
              <div class="pen-wrapper">
                <img src="https://skribbl.io/res/pen.gif" height="50px">
              </div>
              <div class="ereaser-wrapper"> 
                <img src="https://skribbl.io/res/rubber.gif" width="40px">   
              </div>
            </div>
          </div>
          <!--https://skribbl.io/res/clock.gif-->
          <div class="timer-wrapper">
            <div class="timer">{{drawTimeSec}}</div>
          </div>
        </div>
        <div class="canvas-wrapper">
          <canvas ref="canv" id="canv" height="548px" width="852px" 
          @mousedown="findxy('down', $event)" 
          @mousemove="findxy('move', $event)"
          @mouseup="findxy('up', $event)"
          @mouseout="findxy('out', $event)"></canvas>
          <!-- <div class="mute"></div> -->
        </div>
        <div class="game-footer">
          <div class="leave-wrapper">
            <button @click="leaveGame">Leave</button>
          </div>
        </div>
      </div>
      <div class="chat-box-wrapper">
        <div class="chat-box" id="chatBox" ref="chatBox">
          <div class="chat-row">
            <div class="chat-row-user">
              Antony:
            </div>
            <div class="chat-row-msg">
              hello
            </div>
          </div>
          <div class="answer-correct-row">
            Li's answer is correct !
          </div>
        </div>
        <div class="input-box">
          <input type="text" v-model="message" class="input-msg"/> 
          <button @click="sendMsg" class="btn-send">Send</button>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
//     import {mapState} from 'vuex'
    import 'animate.css';
    // import axios from 'axios';
    export default {
      name: "Pictionary",
      mounted() {
        this.initCanvas();
        this.connectWebSocket();
      },
      computed: {
        // ...mapState('common', {
        //   user: 'user',
        // }),
      },
      data() {
          return {
            message: '',
            drawTimeSec: 90, 
            canvas: null,
            ctx: null,
            prevX: 0,
            prevY: 0,
            currX: 0,
            currY: 0,
            flag: false,
            dot_flag: false,
            strokeColor: "black",
            strokeWidth: 2,
            websocket: null,
            isShadow: '',
            isEnterRoomId: [''],
            isMenuShow: 'active',
            isShowMainArea: '',
            isShowWord: '',
            playerList: [],
          };
      },
      methods: {
        enterRoomId() {
          this.isShadow = ['fadeIn', 'active'];
          this.isEnterRoomId = ['slideInUp'];
          this.isMenuShow = '';
        },

        closeEnterRoom() {
          this.isEnterRoomId = ['non-active'];
          this.isShadow = '';
          this.isMenuShow = 'active';
        },

        showGame() {
          
          
          this.isMenuShow = '';
          this.isShowWord = 'active';
          this.isShowMainArea = 'flex-active';

        },

        leaveGame() {
          this.isShowMainArea = '';
          this.isMenuShow = 'active';
          this.isShowWord = '';
        },

        
        /*initialize canvas */
        initCanvas() {
          this.canvas = this.$refs.canv;
          console.log(this.canvas)
          this.ctx = this.canvas.getContext("2d");
          console.log(this.ctx)
        },

        findxy(res, e) {
          if (res == "down") {
            console.log("down")
            console.log(e)
              this.prevX = this.currX;
              this.prevY = this.currY;
              this.currX = e.clientX - this.canvas.offsetLeft;
              this.currY = e.clientY - this.canvas.offsetTop;

              this.flag = true;
              this.dot_flag = true;
              if (this.dot_flag) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.strokeColor;
                this.ctx.fillRect(this.currX, this.currY, 2, 2);
                this.ctx.closePath();
                let msg = {
                  action: 'down',
                  prevX: this.prevX,
                  prevY: this.prevY,
                  currX: this.currX,
                  currY: this.currY,
                  strokeColor: this.strokeColor,
                }
                msg = JSON.stringify(msg)
                this.websocket.send(msg)
                this.dot_flag = false;
            }
          }
          if (res == "up" || res == "out") {
            this.flag = false;
          }
          if (res == "move") {
            if (this.flag) {
              this.prevX = this.currX;
              this.prevY = this.currY;
              this.currX = e.clientX - this.canvas.offsetLeft;
              this.currY = e.clientY - this.canvas.offsetTop;
              this.draw();
            }
          }
        },

        draw() {
            this.ctx.beginPath();
            this.ctx.moveTo(this.prevX, this.prevY);
            this.ctx.lineTo(this.currX, this.currY);
            this.ctx.strokeStyle = this.strokeColor;
            this.ctx.lineWidth = this.strokeWidth;
            this.ctx.stroke();
            this.ctx.closePath();
            let msg = {
                action: 'move',
                prevX: this.prevX,
                prevY: this.prevY,
                currX: this.currX,
                currY: this.currY,
                strokeColor: this.strokeColor,
            }
            msg = JSON.stringify(msg)
            this.websocket.send(msg)
        },

        changeColor(clr) {
          this.strokeColor = clr;
        },


        /*websocket */
        connectWebSocket(){
          //判断当前浏览器是否支持WebSocket
            if ("WebSocket" in window) {
                this.websocket = new WebSocket("ws://localhost:8081/websocketDemo");
            } else {
                alert("Not support websocket");
            }

            //连接发生错误的回调方法
            // this.websocket.onerror = function () {
            //     setMessageInnerHTML("error");
            // };
            // //连接成功建立的回调方法
            this.websocket.onopen = function () {
                //setMessageInnerHTML("Loc MSG: 成功建立连接");
                console.log("vue connect success!");
            };
            //接收到消息的回调方法
            this.websocket.onmessage = (event) => {
                
                let chatRow = document.createElement("div");
                chatRow.classList = ["chat-row"];

                let chatRowUser = document.createElement("div");
                chatRowUser.classList = ["chat-row-user"];
                chatRowUser.innerText = "Antony:"

                let chatRowMsg = document.createElement("div");
                chatRowMsg.classList = ["chat-row-msg"]
                chatRowMsg.innerText = event.data;
                chatRow.appendChild(chatRowUser);
                chatRow.appendChild(chatRowMsg);
                console.log(this.$refs.chatBox)
                this.$refs.chatBox.appendChild(chatRow);
                this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;

                console.log(event.data);
                let msg = JSON.parse(event.data)
                if(msg.action == 'down') {
                  this.ctx.beginPath();
                  this.ctx.fillStyle = msg.strokeColor;
                  this.ctx.fillRect(msg.currX, msg.currY, 2, 2);
                  this.ctx.closePath();
                } else if (msg.action == 'move') {
                  this.ctx.beginPath();
                  this.ctx.moveTo(msg.prevX, msg.prevY);
                  this.ctx.lineTo(msg.currX, msg.currY);
                  this.ctx.strokeStyle = msg.strokeColor;
                  this.ctx.lineWidth = 2;
                  this.ctx.stroke();
                  this.ctx.closePath();
                } 
              };
            //连接关闭的回调方法
            this.websocket.onclose = function () {
              console.log("close success!");
            };
            // //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            // window.onbeforeunload = function () {
            //     websocket.close();
            // }
        },
        
        sendMsg() {
          this.websocket.send(this.message);
          this.message = '';
        },
        countDown() {
          if(this.drawTimeSec <= 0){
            /**
             * 在这里处理一轮结束之后的逻辑
             */
            return;
          } 
          setTimeout(() => {
            this.drawTimeSec = this.drawTimeSec - 1;
            this.countDown();
          }, 1000)
        }
      },
    };

    // function erase() {
    //     var m = confirm("Want to clear");
    //     if (m) {
    //         ctx.clearRect(0, 0, w, h);
    //         document.getElementById("canvasimg").style.display = "none";
    //     }
    // }

    // function save() {
    //     document.getElementById("canvasimg").style.border = "2px solid";
    //     var dataURL = canvas.toDataURL();
    //     document.getElementById("canvasimg").src = dataURL;
    //     document.getElementById("canvasimg").style.display = "inline";
    // }
</script>


<style>
.clearfix::before,
.clearfix::after {
  display: table;
  content: "";
  clear: both;
}
* {
  padding: 0;
  margin: 0;
}

.active {
  display: block !important;
}

.flex-active {
  display: flex !important;
}

.non-active {
  display: none;
}

.pictionary-container {
  width: 100%;
  height: 100%;
  background-color: rgb(102, 83, 116);
  background-image: url("https://papergames.io/images/patterns/style-2-5.png");
}

.pictionary-container .shadow {
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 3, 3, 0.3);
  float: left;
  z-index: 999;
  animation-duration: .5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
}

@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    visibility: hidden;
  }

  to {
    visibility:visible;
    transform: translate3d(0, 0, 0);
  }
}

.slideInUp {
  animation-duration: 0.3s;
  animation-name: slideInUp !important;
}

@keyframes slideOutDown {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}

.slideOutDown {
  animation-duration: 0.5s;
  animation-name: slideOutDown !important;
}


.pictionary-container .shadow .enter-room-id-wrapper {
  /* display: none; */
  width: 600px;
  height: 350px;
  background-color: white;
  margin: 150px auto;
 
}
.pictionary-container .shadow .enter-room-id-wrapper .close-wrapper {
  width: 50px;
  height: 50px;
  float: right;
}

.pictionary-container .shadow .enter-room-id-wrapper .close-wrapper button {
  width: 50px;
  height: 50px;
  font-size: 30px;
  border: none;
  background-color: transparent;
}

.pictionary-container .shadow .enter-room-id-wrapper .close-wrapper button:hover {
  cursor: pointer;
}


.pictionary-container .shadow .enter-room-id-wrapper .enter-room-code-title {
  height: 100px;
  width: 100%;
  line-height: 100px;
  text-align: center;
  /* background-color: thistle; */
}

.pictionary-container .shadow .enter-room-id-wrapper .room-code-input-box {
  height: 100px;
  width: 100%;
}

.pictionary-container .shadow .enter-room-id-wrapper .room-code-input-box input {
  margin: 0 30px;
  height: 80px;
  width: 500px;
  font-size: 40px;
  padding: 0 20px;
  text-align: center;
}

.pictionary-container .shadow .enter-room-id-wrapper .join-room-wrapper {
  height: 100px;
  width: 600px;
}

.pictionary-container .shadow .enter-room-id-wrapper .join-room-wrapper button {
  border: 3px transparent solid;
  background-color: rgb(52, 81, 98);
  color: white;
  margin-left: 250px;
  font-size: 20px;
  width: 94px;
  height: 44px;
  border: none;
  background-origin: border-box;
}

.pictionary-container .shadow .enter-room-id-wrapper .join-room-wrapper button:hover {
  cursor: pointer;
  background-color: rgb(73, 113, 136);
}
.pictionary-container .shadow .enter-room-id-wrapper .join-room-wrapper button:active {
  border: 3px black solid;
}


.pictionary-container .pictionary-menu-wrapper {
  display: none;
  width: 600px;
  height: 350px;
  background-color: blanchedalmond;
  margin: 150px auto;
  border-radius: 10px;
}

.pictionary-container .pictionary-menu-wrapper .pictionary-title-wrapper {
  padding-left: 10px;
  line-height: 100px;
  height: 98px;
  width: 590px;
  border-bottom: 2px solid rgb(59, 59, 59);
  /* background-color: blueviolet; */
}

.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content {
  display: flex;
}

.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-image-wrapper {
  /* background-color: brown; */
  width: 300px;
  height: 250px;
}

.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list {
  margin-top: 35px;
  width: 400px;
  height: 180px;
}
.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list div {
  height: 60px;
  width: 400px;
  
}

.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list .create-room button{
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 5px;
  height: 40px;
  width: 250px;
  margin: 10px 75px;
  background-color:coral;
}




.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list .enter-room-code button{
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 5px;
  height: 40px;
  width: 250px;
  margin: 10px 75px;
  background-color:coral;
}
.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list .pictionary-game-rules button{
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 5px;
  height: 40px;
  width: 250px;
  margin: 10px 75px;
  background-color:coral;

}

.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list .create-room button:hover, 
.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list .enter-room-code button:hover, 
.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content .pictionary-menu-list .pictionary-game-rules button:hover {
  cursor: pointer;
  background-color: rgb(255, 104, 50);
}



.pictionary-container .word-wrapper {
  display: none;
  height: 40px;
  width: 200px;
  background-color: rgb(255, 255, 136);
  border-radius: 10px;
  font-weight: bold;
  margin: 20px auto 10px auto;
  text-align: center;
}

.pictionary-container .main-area {
  /* margin: 70px 0 auto auto; */
  height: 650px;
  width: 100%;
  display: none;
}

.pictionary-container .main-area .rank-wrapper {
  background-color: rgba(0, 0, 0, .25);
  height: 550px;
  width: 20%;
}

.pictionary-container .main-area .rank-wrapper .rank-table {
  z-index: 9999;
  float: left;
  width: 275px; /* 260px */
  background-color: whitesmoke;
  margin: 10px auto;
}

.pictionary-container .main-area .rank-wrapper .rank-table tr {
  height: 60px;
}

.pictionary-container .main-area .rank-wrapper .rank-table tr:nth-child(odd) {
  background-color: whitesmoke;
}

.pictionary-container .main-area .rank-wrapper .rank-table tr:nth-child(even) {
  background-color: rgb(238, 238, 238);
}

.pictionary-container .main-area .rank-wrapper .rank-table tr td .player {
  height: 60px;
  width: 275px;
  display: flex;
}

.pictionary-container .main-area .rank-wrapper .rank-table tr td .player .player-rank {
  font-size: 24px;
  height: 60px;
  line-height: 60px;
  width: 45px;
  text-align: center;
 
}
/* .pictionary-container .main-area .rank-wrapper .rank-table tr td .player .player-info {
  height: 60px;
  width: 55%;
  text-align: center;
  
} */
.pictionary-container .main-area .rank-wrapper .rank-table tr td .player .player-avatar {
  height: 60px;
  line-height: 60px;
  width: 55px;
  text-align: center;
  border-radius: 50%;
}
.pictionary-container .main-area .rank-wrapper .rank-table tr td .player .player-avatar .avatar-wrapper {
  margin: 5px auto;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: hotpink;
}

.pictionary-container .main-area .rank-wrapper .rank-table tr td .player .player-name {
  width: 100px;
  margin-left: 10px;
  height: 60px;
  line-height: 60px;
}

.pictionary-container .main-area .rank-wrapper .rank-table tr td .player .player-points {
  height: 60px;
  line-height: 60px;
  width: 65px;
}





.pictionary-container .main-area .game-screen {
  background-color: green;
  height: 650px;
  width: 60%;
}

.pictionary-container .main-area .game-screen .game-info {
  /* background-color: yellow; */
  background-color: rgb(52, 81, 98);
  background-image: url("https://papergames.io/images/patterns/style-2-5.png");
  height: 10%;
  width: 100%;
  display: flex;
}

.pictionary-container .main-area .game-screen .game-info .toolkit {
  /* background-color: rgb(36, 81, 149); */
  /* background-image: url("https://papergames.io/images/patterns/style-2-5.png"); */
  width: 380px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .palette {
  /* background-color: cadetblue; */
  margin-right: 5px;
  margin-left: 5px;
  width: 200px;
}

.pictionary-container
  .main-area
  .game-screen9
  .game-info
  .toolkit 
  .color-chosen-wrapper {
    /*不知道为什么这里面的样式都没有起作用？ */
    width: 90px;
    /* background-color: yellowgreen; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit 
  .color-chosen-wrapper
  .color-chosen {
    width: 50px;
    height: 50px;
    background-color: rebeccapurple;
  }

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .palette
  .palette-row {
  /* background-color: olive; */
  height: 25px;
  display: flex;
  justify-content: center;
}

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-width {
  /* background-color: royalblue; */
  height: 36px;
  display: flex;
}

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type {
  width: 110px;
  /* background-color: royalblue; */
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type 
  .pen-wrapper{
    border: 2px transparent solid;
    background-color: rgb(230, 230, 230);
    width: 46px;
    height: 46px;
    padding: 0 auto;
    background-clip: border-box;
}
.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type 
  .pen-wrapper img{
    transform: translateX(10px);
}


.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type 
  .ereaser-wrapper{
    border: 2px transparent solid;
  background-color: rgb(230, 230, 230);
  width: 46px;
  height: 46px;
  background-clip: border-box;
}

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type 
  .ereaser-wrapper img{
    transform: translateX(5px) translateY(6.25px);
    
}


.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type 
  .pen-wrapper:hover, 
  .pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type 
  .ereaser-wrapper:hover {
    border: 2px rgb(63, 63, 63) solid;
    cursor: pointer;
  }


.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .palette
  .palette-row
  .color-option {
  border: 2px transparent solid;
  /* border-radius: 2px; */
  width: 21px;
  height: 21px;
  /* margin-left: 10px; */
  background-clip: border-box;
}

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .palette
  .palette-row
  .color-option:hover {
    border: 2px rgb(226, 226, 226) solid;
    cursor: pointer;
  }


.pictionary-container
  .main-area
  .game-screen
  .game-info
  .timer-wrapper {
    height: 64px;
    /* background-color: white; */
    width: 64px;
  }

  .pictionary-container
  .main-area
  .game-screen
  .game-info
  .timer-wrapper
  .timer {
    font-size: 18px;
    width: 64px;
    height: 64px;
    line-height: 71px;
    text-align:center;
    background-image: url("https://skribbl.io/res/clock.gif");
  }


.pictionary-container .main-area .game-screen .canvas-wrapper {
  background-color: white;
  height: 84%;
  width: 100%;
}

/* .pictionary-container .main-area .game-screen .canvas-wrapper .mute {
  height: 630px;
  width: 1087;
  background-color: transparent;
  float: left;
  transform: translateY(-634px);
} */

.pictionary-container .main-area .game-screen .game-footer {
  background-color: rgb(52, 81, 98);
  background-image: url("https://papergames.io/images/patterns/style-2-5.png");
  height: 6%;
  width: 100%;
  display: flex;
  align-items: center;
}

.pictionary-container .main-area .game-screen .game-footer .leave-wrapper {
  margin-left: 10px;
  width: 50px;
  height: 30px;
  
}

.pictionary-container .main-area .game-screen .game-footer .leave-wrapper button{
  border-radius: 5px;
  margin-top: 2.5px;
  font-size: 16px;
  width: 50px;
  height: 25px;
  background-color: rgb(255, 0, 0);
  border: none;
  color: white;
}

.pictionary-container .main-area .game-screen .game-footer .leave-wrapper button:hover {
  cursor: pointer;
}


.pictionary-container .main-area .chat-box-wrapper {
  padding: 10px 5px;
  background-color: rgba(0, 0, 0, .25);
  height: 455px;
  width: 20%;
}

.pictionary-container .main-area .chat-box-wrapper .chat-box {
  margin: 0 auto;
  /* background-color: turquoise; */
  height: 400px;
  width: 96%;
  overflow-y: auto;
}

.pictionary-container .main-area .chat-box-wrapper .chat-box::-webkit-scrollbar {/*滚动条整体样式*/
  width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.pictionary-container .main-area .chat-box-wrapper .chat-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgb(193, 193, 193);
}

.pictionary-container .main-area .chat-box-wrapper .chat-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 10px;
  background: #f3f2f2;
}

.pictionary-container .main-area .chat-box-wrapper .chat-box .chat-row {
  border-radius: 3px;
  display: flex;
  /* height: 30px; */
  background-color: rgb(63, 138, 252);
  line-height: 30px;
  padding: 0 5px;
  overflow-wrap: break-word;
  margin-top: 2px;
  width: 240px;
}


.pictionary-container .main-area .chat-box-wrapper .chat-box .chat-row .chat-row-user {
  font-weight: bold;
  /* height: 30px; */
}

.pictionary-container .main-area .chat-box-wrapper .chat-box .chat-row .chat-row-msg {
  margin-left: 5px;
  overflow-wrap: break-word;
  /* height: 30px; */
}


.pictionary-container .main-area .chat-box-wrapper .chat-box .answer-correct-row {
  color: white;
  border-radius: 3px;
  display: flex;
  /* height: 30px; */
  background-color: rgb(127, 208, 40);
  line-height: 30px;
  padding: 0 5px;
  overflow-wrap: break-word;
  margin-top: 2px;
  width: 240px;
}


.pictionary-container .main-area .chat-box-wrapper .input-box { 
  /* outline: 2px rgb(255, 65, 65) solid; */
  display: flex;
  margin: 0 auto 0 5px;
  background-color:rgba(0, 0, 0, .2);
  height: 50px;
  width: 255px;
}

.pictionary-container .main-area .chat-box-wrapper .input-box .input-msg {
  font-size: 16px;
  padding: 0 5px;
  border: none;
  outline: none;
  width: 210px;
  height: 50px;
  
}
.pictionary-container .main-area .chat-box-wrapper .input-box .btn-send {
  border: none;
  width: 35px;
  height: 50px;
}

</style>

