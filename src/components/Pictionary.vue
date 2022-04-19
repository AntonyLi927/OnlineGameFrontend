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
          <input type="text" v-model="enteredRoomCode" @focus="enterRoomCodeFocus"/>
        </div>
        <div class="join-room-wrapper">
          <button class="join-room-btn" @click="joinRoomWithCode">JOIN</button>
        </div>
        <div class="join-err-wrapper" :class="isJoinErrShow">
          {{joinErrMsg}}
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
          <img src="../assets/4296619.png" width="200px" height="200px" />
        </div>
        <div class="pictionary-menu-list">
          <div class="create-room">
            <button class="create-room-btn" @click="showGame">
              New Room !
            </button>
          </div>
          <div class="enter-room-code">
            <button class="enter-room-code-btn" @click="enterRoomId">
              Enter Room Code
            </button>
          </div>
          <div class="pictionary-game-rules">
            <button class="game-rules-btn">About Pictionary</button>
          </div>
        </div>
      </div>
    </div>

    <div class="word-wrapper" :class="isShowWord">
      <h2>{{question}}</h2>
    </div>
    <!-- 游戏页面 -->
    <div class="main-area" :class="isShowMainArea">
      <div class="rank-wrapper">
        <table class="rank-table">
          <tr v-for="(obj, index) in sortedTotalPointsUserList" :key="index">
            <td>
              <div class="player">
                <div class="player-rank">#{{index + 1}}</div>
                <div class="player-avatar">
                  <div class="avatar-wrapper">
                    <img />
                  </div>
                </div>
                <!-- <div class="player-info">  -->
                <div class="player-name">{{ obj.user.username }}</div> 

                <!-- </div> -->
                <div class="player-points">{{obj.points}}</div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="game-screen">
        <div class="game-info">
          <div class="info-container">
            <el-popover
              placement="right-start"
              trigger="hover"
              :content="roomInfoContent"
              >
              <el-button slot="reference" class="info-wrapper-button"><i class="el-icon-info"></i></el-button>
            </el-popover>
            
          </div>
          
          <div class="ready-btn-wrapper">
            <button @click.once="getReady" ref="readyBtn">{{readyBtnContent}}</button>
          </div>

          <div class="toolkit">
            <div class="color-chosen-wrapper">
              <div
                class="color-chosen"
                :style="{ backgroundColor: strokeColor }"
              ></div>
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
                <img src="https://skribbl.io/res/pen.gif" height="50px"/>
              </div>
              <div class="ereaser-wrapper">
                <img src="https://skribbl.io/res/rubber.gif" width="40px"/>
              </div>
            </div>
          </div>
          <!--https://skribbl.io/res/clock.gif-->
          <div class="timer-wrapper">
            <div class="timer">{{ drawTimeSec }}</div>
          </div>
        </div>
        <div class="canvas-wrapper">
          <div class="canvas-container">
            <canvas
              ref="canv"
              id="canv"
              height="546px"
              width="861.3px"
              @mousedown="findxy('down', $event)"
              @mousemove="findxy('move', $event)"
              @mouseup="findxy('up', $event)"
              @mouseout="findxy('out', $event)"
            ></canvas>
          </div>
          <div class="mute clearfix" :class="isMuteActive">
            <div class="process-info">
              <p :class="gameStartInfoShow" class="gameStartInfo">Game will start in {{ gameStartDelay }}s</p>
              <p :class="roundInfoShow" class="roundInfo">This is {{drawer.username}}'s round</p>
              <div class="roundSummary" :class="roundSummaryShow">
                <div class="round-summary-container">
                  <div class="time-is-up-wrapper">
                    <p>Time is up!</p>
                  </div>
                  <div class="display-word-wrapper">
                    <span>The word was {{word}}</span>
                  </div>
                </div>
                <div class="rank-each-round-wrapper">
                  <div v-for="(o, index) in pointsAddEachRound" :key="index" class="rank-each-round-row">
                    <div class="rank-each-round-row-username">{{o.user.username}}</div>
                    <div class="rank-each-round-row-points">+{{o.points}}&nbsp;points</div>       
                  </div>

                </div>
              </div>

              <div class="game-over-container" :class="gameOverShow">
                <div class="game-over-title">
                    <p>GAME OVER</p>
                </div>
                <div class="game-over-rank-wrapper">
                  <div v-for="(o, index) in sortedTotalPointsUserList" :key="index" class="game-over-rank-row">
                    <div class="game-over-rank-row-username">{{o.user.username}}</div>
                    <div class="game-over-rank-row-points">+{{o.points}}&nbsp;points</div>       
                  </div>
                </div>
                <div class="game-over-footer">
                  <div class="play-again-btn-wrapper">
                    <button @click="playAgainMethod">PLAY AGAIN &nbsp;<i class="el-icon-right"></i></button>
                  </div>
                </div>
              </div>



              <div class="chooseWord" :class="chooseWordShow">
                  <div class="chooseWord-title">
                    Please choose a word
                  </div>

                  <div class="word-container">
                    <div class="word-btn-wrapper" @click="chosenWord(w)" v-for="(w, index) in wordList" :key="index">
                      {{w}}
                    </div>
                    <!-- <button v-for="(w, index) in wordList" :key="index" >
                      {{w}}
                    </button> -->
                    
                  </div>
                  <el-progress :percentage="(roundDelay / 5000) * 100" :show-text="false"></el-progress>
              </div>
            </div>
          </div>
        </div>

        <div class="game-footer">
          <div class="leave-wrapper">
            <button @click="leaveGame"><i class="el-icon-close"></i></button>
          </div>
        </div>
      </div>
      <div class="chat-box-wrapper">
        <div class="chat-box" id="chatBox" ref="chatBox">
          <!-- <div class="chat-row">
            <div class="chat-row-user">Antony:</div>
            <div class="chat-row-msg">hello</div>
          </div> -->
          <!-- <div class="answer-correct-row">Li's answer is correct !</div> -->
          <!-- <div class="round-info-row">This is xxx's round</div> -->
        </div>
        <div class="input-box">
          <input type="text" v-model="message" class="input-msg" placeholder="Type your guess/chat here"/>
          <button @click="sendMsg" class="btn-send">Send</button>
        </div>

        <div class="mute-input-box" :class="isMuteInputBoxShow" @click="123">

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import "animate.css";
// import axios from 'axios';
export default {
  name: "Pictionary",
  mounted() {
    this.initCanvas();
    this.connectWebSocket();
    
  },
  computed: {
    ...mapState("common", {
      user: "user",
    }),

    question: {
      get() {
        let res = "";
        let arr = this.word.split(" ");
        for (let i = 0; i < arr.length; i++) {
          let num = arr[i].length;
          for (let a = 1; a<= num; a++) {
            res = res + "_ ";
          }
          res = res + '\xa0';
          console.log(res);
        }
        return res;
      }
    },

    sortedPointsAddEachRound: {
      get() {
        for (let i = 0; i < this.pointsAddEachRound.length; i++) {
            //
        }
        return {};
      }
    },

    sortedTotalPointsUserList: {
      get() {
        let sortedTotalPointsUserList = [];
        for (let i = 0; i < this.totalPointsUserList.length; i++) {
          sortedTotalPointsUserList[i] = this.totalPointsUserList[i];
        }


        for (let i = 1; i <= sortedTotalPointsUserList.length - 1; i++) {
            for (let j = 0; j < sortedTotalPointsUserList.length - i; j++) {
                if (sortedTotalPointsUserList[j].points < sortedTotalPointsUserList[j + 1].points){
                    let temp = sortedTotalPointsUserList[j];
                    sortedTotalPointsUserList[j] = sortedTotalPointsUserList[j + 1];
                    sortedTotalPointsUserList[j + 1] = temp;
                }
            }
        }
        return sortedTotalPointsUserList;
      }
    },

    roomInfoContent: {
      get() {
        return "Room Code: " + this.roomCode;
      }
    }
  },

  data() {
    return {
      message: "",
      drawTimeSec: 40,
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
      isShadow: "",
      isEnterRoomId: [""],
      isMenuShow: "active",
      isShowMainArea: "",
      isShowWord: "",
      playerList: [], // a list of players that current player is in
      roundStart: false, // whether current round starts
      roomCode: "", // room code of current room
      enteredRoomCode: "",
      isMuteActive: "",
      gameStartDelay: 5, // 全局游戏开始前的那段delay
      roundOver: false,
      roundDelay: 5000, // 每轮游戏开始前的delay 单位：ms
      roundSummaryDelay: 6,
      gameStartInfoShow: [],
      roundInfoShow: [],
      roundSummaryShow: [],
      gameOverShow: [],
      word: '',
      wordList: [], // save three words requested from database and showed for player to choose one 
      drawer: {},
      chooseWordShow: [],
      curRound: 1,
      isCurUserAnswerCorrect: false,
      
      pointsAddEachRound: [],
      totalPointsUserList: [],

      readyNums: 0,      //#
      isReady: false,    //#
      readyBtnContent: "READY",

      isDrawing: false,

      isMuteInputBoxShow: [],
      isJoinErrShow: [],
      joinErrMsg: "",

      guessCorrectNum: 0,
    };
  },

  watch: {
    readyNums: {
      handler(newValue, oldValue) {
        console.log(oldValue);
        if (newValue == this.playerList.length) {
          if (this.user.userId == this.playerList[0].userId) {
            console.log("Start")
            let data = {
            status: "",
            msg: "",
            msgType: "gameStart",
            data: {
              roomCode: this.roomCode,
            },
          };
          this.websocket.send(JSON.stringify(data));
          }
        }
      }
    }
  },
  methods: {
    enterRoomCodeFocus() {
      this.isJoinErrShow = [];
    },

    joinRoomWithCode() {
      // todo 关于输入的code合法性判断
      if (this.enteredRoomCode == "") {
        console.log(this.enteredRoomCode)
         this.joinErrMsg = "Code length cannot be 0";
        this.isJoinErrShow = ["active"];
       
        return;
      } else if (this.enteredRoomCode) {
        //
      }
      let data = {
        status: "",
        msg: "",
        msgType: "joinWithRoomCode",
        data: {
          user: this.user,
          roomCode: this.enteredRoomCode,
        },
      };

      console.log(data);

      this.websocket.send(JSON.stringify(data));
     
     
      

     
    },
    enterRoomId() {
      this.isShadow = ["fadeIn", "active"];
      this.isEnterRoomId = ["slideInUp"];
      this.isMenuShow = "";
    },

    closeEnterRoom() {
      this.isEnterRoomId = ["non-active"];
      this.isShadow = "";
      this.isMenuShow = "active";
    },

    showGame() {
      let data = {
        status: "",
        msg: "",
        msgType: "createNewRoom",
        data: {
          user: this.user,
        },
      };

      this.websocket.send(JSON.stringify(data));
    
      this.isMenuShow = "";
      this.isShowWord = "active";
      this.isShowMainArea = "flex-active";
    },

    leaveGame() {

      let data = {
        status: "",
        msg: "",
        msgType: "leaveGame",
        data: {
          roomCode: this.roomCode,
          user: this.user,
        },
      };
      this.roomCode = "";
      this.websocket.send(JSON.stringify(data));
      this.isShowMainArea = "";
      this.isMenuShow = "active";
      this.isShowWord = "";
      
    },

    /*initialize canvas */
    initCanvas() {
      this.canvas = this.$refs.canv;
      console.log(this.canvas);
      this.ctx = this.canvas.getContext("2d");
      console.log(this.ctx);
    },

    findxy(res, e) {
      if (res == "down") {
        console.log("down");
        console.log(e);
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
          let data = {
            status: "",
            msg: "",
            msgType: "syncStroke",
            data: {
              roomCode: this.roomCode,
              action: "down",
              prevX: this.prevX,
              prevY: this.prevY,
              currX: this.currX,
              currY: this.currY,
              strokeColor: this.strokeColor,
            },
          };
          data = JSON.stringify(data);
          this.websocket.send(data);
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
      let data = {
        status: "",
        msg: "",
        msgType: "syncStroke",
        data: {
          roomCode: this.roomCode,
          action: "move",
          prevX: this.prevX,
          prevY: this.prevY,
          currX: this.currX,
          currY: this.currY,
          strokeColor: this.strokeColor,
        },
      };
      data = JSON.stringify(data);
      this.websocket.send(data);
    },

    changeColor(clr) {
      this.strokeColor = clr;
    },

    /*websocket */
    connectWebSocket() {
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.websocket = new WebSocket("ws://localhost:8081/pictionaryServer");
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
        let receivedData = JSON.parse(event.data);

        if (receivedData.msgType == "roomCode") {
          this.roomCode = receivedData.data;
          let data = {
            status: "",
            msg: "",
            msgType: "totalPointsUserList",
            data: {
              roomCode: this.roomCode,
            },
          }
          this.websocket.send(JSON.stringify(data));
          console.log(this.roomCode);
        }

        if (receivedData.msgType == "joinResult") {
          if (receivedData.msg == "err") {
            this.joinErrMsg = "Room doesn't exist"
            this.isJoinErrShow = ["active"];  
          } else if (receivedData.msg == "ok") {
            this.isJoinErrShow = [];
            this.roomCode = receivedData.data;
            this.enterRoomId == "";
            let data = {
              status: "",
              msg: "",
              msgType: "totalPointsUserList",
              data: {
                roomCode: this.roomCode,
              },
            }
            this.websocket.send(JSON.stringify(data));
            this.isEnterRoomId = ["non-active"];
            this.isShadow = "";
            this.isMenuShow = "";
            this.isShowWord = "active";
            this.isShowMainArea = "flex-active";
          } else {
            //todo
          }
        }

        if (receivedData.msgType == "playerList") {
          this.playerList = receivedData.data;
          
          console.log(this.playerList);
        }

        if (receivedData.msgType == "resWords") {
          this.wordList = receivedData.data;
          console.log(this.wordList);
        }

        if (receivedData.msgType == "gameProcess") {
          this.ctx.clearRect(0, 0, 10000, 10000);
          this.isCurUserAnswerCorrect = false
          this.pointsAddEachRound = [];
          this.roundSummaryShow = [];
          this.roundSummaryDelay = 0;
          this.drawTimeSec = 40;
          this.gameStartDelay = 0;
          //this.gameStartInfoShow = [];
          console.log("3--------game process")
          if (this.curRound > this.playerList.length) {
            //todo
            console.log()
          }

          this.drawer = receivedData.data;
          let chatRow = document.createElement("div");
          chatRow.classList = ["round-info-row"];
          let a = receivedData.data.userId == this.user.userId ? "your" : receivedData.data.username + "'s"
          chatRow.innerText = "This is " + a + " round";
          this.$refs.chatBox.appendChild(chatRow);
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
          if (this.user.userId == this.drawer.userId) {
            this.isMuteInputBoxShow = ["flex-active"]
            let req = {
              status: "",
              msg: "",
              msgType: "requestWords",
              data: {
              },
            };
            this.websocket.send(JSON.stringify(req));
          }
          
          console.log(this.user)
          console.log(this.drawer)
          if(this.user.userId == this.drawer.userId) {
            this.gameStartInfoShow = []
            this.isMuteActive = "flex-active";
            this.chooseWordShow = ["active", "slideInUp"];
            this.chooseWordMethod(this.curRound);
          } else {
            this.gameStartInfoShow = []
            this.isMuteActive = "flex-active";
            this.roundInfoShow = ["active", "slideInUp"];
            this.roundInfo(this.curRound);
          }
          console.log(receivedData.data)
        }

        if (receivedData.msgType == "timeIsUp") {
          //this.drawTimeSec = 0;
          console.log("7--------time is up")
          this.isMuteInputBoxShow = [];
          if (this.isCurUserAnswerCorrect == false) {
            if (this.user.userId != this.drawer.userId) {
              console.log(this.user.userId + "send add points to server to add 0")
              let data = {
                status: "",
                msg: "",
                msgType: "addPoints",
                data: {
                  user: this.user,
                  roomCode: this.roomCode,
                  points: 0.0,
                },
              };
              this.websocket.send(JSON.stringify(data));
            } else {
              let data = {
                status: "",
                msg: "",
                msgType: "addPoints",
                data: {
                  user: this.user,
                  roomCode: this.roomCode,
                  points: this.guessCorrectNum * 7.5 * (9 - this.playerList.length),
                },
              };
              this.websocket.send(JSON.stringify(data));
            } 
          }
          setTimeout(() => {
            this.roundSummaryShow = ["active", "slideInUp"];
            if (this.drawer.userId == this.user.userId) this.roundSummary();
          }, 1000);
        }

        if (receivedData.msgType == "wordChosen") {
          this.roundDelay = 0;
          this.word = receivedData.data;
          console.log(receivedData.data)
        }

        if (receivedData.msgType == "round") {
          this.curRound = receivedData.data;
        }

        if (receivedData.msgType == "gameStart") {
          console.log("game start")
          this.gameStart();
        }


        if (receivedData.msgType == "startDrawing") {
          console.log("5--------start drawing")
          this.isDrawing = true;
          if (this.drawer.userId == this.user.userId) {
            this.isMuteActive = "";
            console.log("mute delete")
            this.chooseWordShow = [];
            this.roundDelay = 5000;
            this.countDown(this.curRound);
          } else {
            this.roundInfoShow = [];
            this.roundDelay = 5000;
            this.countDown(this.curRound)
          }
        }

        if (receivedData.msgType == "addPoints") {
          console.log("add points received")
          console.log(receivedData.data);
          this.pointsAddEachRound.push(receivedData.data);
          console.log(this.pointsAddEachRound);
        }

        if (receivedData.msgType == "totalPointsUserList") {
          this.totalPointsUserList = receivedData.data;
          console.log(receivedData.data)
        }

        if (receivedData.msgType == "leaveGame") {
          console.log("leave game")
          this.playerList = receivedData.data.playerList;
          if (this.playerList.length != 0) {
            let data = {
              status: "",
              msg: "",
              msgType: "totalPointsUserList",
              data: {
                roomCode: this.roomCode,
              },
            }
            this.websocket.send(JSON.stringify(data));
          }
          console.log(receivedData.data.playerList)
        }

        if (receivedData.msgType == "chatMsg") {
          let chatRow = document.createElement("div");
          chatRow.classList = ["chat-row"];

          let chatRowUser = document.createElement("div");
          chatRowUser.classList = ["chat-row-user"];
          chatRowUser.innerText = receivedData.data.user.username + ": ";

          let chatRowMsg = document.createElement("div");
          chatRowMsg.classList = ["chat-row-msg"];
          chatRowMsg.innerText = receivedData.data.chatMessage;
          chatRow.appendChild(chatRowUser);
          chatRow.appendChild(chatRowMsg);
          //console.log(this.$refs.chatBox)
          this.$refs.chatBox.appendChild(chatRow);
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
        }

        if (receivedData.msgType == "rightMsg") {
          this.guessCorrectNum++;
          //<div class="answer-correct-row">Li's answer is correct !</div>
          let chatRow = document.createElement("div");
          chatRow.classList = ["answer-correct-row"];
          let a = receivedData.data.userId == this.user.userId ? "Your" : receivedData.data.username + "'s"
          chatRow.innerText =  a + " answer is correct!";
          this.$refs.chatBox.appendChild(chatRow);
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
        }

        if (receivedData.msgType == "getReady") {
          this.readyNums++;

          let chatRow = document.createElement("div");
          chatRow.classList = ["get-ready-row"];
          chatRow.innerText =  receivedData.data.username + " is ready (" + this.readyNums + "/" + this.playerList.length + ")";
          this.$refs.chatBox.appendChild(chatRow);
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
          
        }

        if (receivedData.msgType == "gameOver") {
          this.roundSummaryShow = [];
          this.curRound = 1;
          console.log("game over")
          let data = {
            status: "",
            msg: "",
            msgType: "totalPointsUserList",
            data: {
              roomCode: this.roomCode,
            },
          }
          this.websocket.send(JSON.stringify(data));
          
          setTimeout(() => {
            this.gameOverShow = ["active", "slideInUp"];
            this.readyNums = 0;
          }, 2000);
        }

        if (receivedData.msgType == "playAgain") {
          this.readyNums++;
          let chatRow = document.createElement("div");
          chatRow.classList = ["play-again-row"];
          chatRow.innerText =  receivedData.data.username + " wants to play again (" + this.readyNums + "/" + this.playerList.length + ")";
          this.$refs.chatBox.appendChild(chatRow);
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
        }

        //console.log(event.data);
        if (receivedData.msgType == "syncStroke") {
          if (receivedData.data.action == "down") {
            this.ctx.beginPath();
            this.ctx.fillStyle = receivedData.data.strokeColor;
            this.ctx.fillRect(
              receivedData.data.currX,
              receivedData.data.currY,
              2,
              2
            );
            this.ctx.closePath();
          } else if (receivedData.data.action == "move") {
            this.ctx.beginPath();
            this.ctx.moveTo(receivedData.data.prevX, receivedData.data.prevY);
            this.ctx.lineTo(receivedData.data.currX, receivedData.data.currY);
            this.ctx.strokeStyle = receivedData.data.strokeColor;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.ctx.closePath();
          }
        }
      };
      //连接关闭的回调方法
      this.websocket.onclose = function () {
        console.log("close success!");
      };
      // //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      // window.onbeforeunload = function () {
      //   websocket.close();
      // }
    },

    sendMsg() {
      if (this.message == this.word.toLowerCase() && this.isCurUserAnswerCorrect == false && this.drawTimeSec >= 0 && this.word != "") {
        let data = {
          status: "",
          msg: "",
          msgType: "rightMsg",
          data: {
            user: this.user,
            roomCode: this.roomCode,
          },
        };
        this.websocket.send(JSON.stringify(data));
        this.message = "";  
        this.isCurUserAnswerCorrect = true;

        data = {
          status: "",
          msg: "",
          msgType: "addPoints",
          data: {
            user: this.user,
            roomCode: this.roomCode,
            points: this.drawTimeSec * 1.5,
          },
        };
        this.websocket.send(JSON.stringify(data));

      } else {
        // 如果当前用户已经回答对了，则不能再发这个单词了
        if (this.message == this.word && this.isCurUserAnswerCorrect == true) {
          return;
        }
        let data = {
          status: "",
          msg: "",
          msgType: "chatMsg",
          data: {
            chatMessage: this.message,
            roomCode: this.roomCode,
            user: this.user,
          },
        };
        this.websocket.send(JSON.stringify(data));
        this.message = "";  
      }
      
    },

    // 这个方法要由服务器通知执行 
    gameStart() {
      console.log("1--------game start")
      this.isMuteActive = "flex-active";
      this.gameStartInfoShow = ["active"];
      this.gameStartTimer();
    },
    
    // after all users are ready, this timer will start and a line of sentence will show on the screen
    gameStartTimer() {
      console.log("2--------game start timer")
      if (this.gameStartDelay <= 0) {
        if(this.playerList[0].userId == this.user.userId) {
          let data = {
            status: "",
            msg: "",
            msgType: "gameProcess",
            data: {
              roomCode: this.roomCode,
              round: 1,
            },
          }
          this.websocket.send(JSON.stringify(data));
        }
        this.isMuteActive = "";
        this.gameStartInfoShow = [];
        this.gameStartDelay = 5;
        //this.gameProccess(1);
        return;
      }
      setTimeout(() => {
        this.gameStartDelay = this.gameStartDelay - 1;
        this.gameStartTimer();
      }, 1000);
    },

    chooseWordMethod(round) {
      console.log("4--------choose word")
      if (this.roundDelay <= 0) { 
        
        if (this.isDrawing == false) {
          // console.log("round info call back");
          this.isMuteActive = "";
          this.chooseWordShow = [];
          if (this.word == '') {
            this.word = this.wordList[1];
            let data = {
              status: "",
              msg: "",
              msgType: "wordChosen",
              data: {
                word: this.word,
                roomCode: this.roomCode,
              },
            };
            this.websocket.send(JSON.stringify(data));
          }

          let data = {
            status: "",
            msg: "",
            msgType: "startDrawing",
            data: {
              roomCode: this.roomCode,
            },
          };
          this.websocket.send(JSON.stringify(data));
          //this.countDown(round);  
        }
        this.roundDelay = 5000;
        return;
      }
      setTimeout(() => {
        console.log(this.roundDelay)
        this.roundDelay = this.roundDelay - 100;
        this.chooseWordMethod(round);
      }, 100);
    },

    //this method is related to round info count down 
    roundInfo(round) {
      console.log("4-1---------------round info")
      if (this.roundDelay <= 0) {
        this.roundDelay = 5000;
        // if ( this.isDrawing == false) {
        //   console.log("round info call back");
        //   this.roundInfoShow = [];
        //   this.countDown(this.curRound)
        // }
        return;
      } 
      setTimeout(() => {
        this.roundDelay = this.roundDelay - 1000;
        this.roundInfo(round);
      }, 1000);
    },
    

    //this method is related to the count down of the drawing process for 90s
    countDown() {
      console.log("6--------count down")
      if (this.drawTimeSec <= 0) {
        this.roundSummaryDelay = 6;
        this.isDrawing = false;
        if (this.drawer.userId == this.user.userId) {
          console.log("count down call back");
          //this.drawTimeSec = 40;
          this.isMuteActive = "flex-active";
          let data = {
            status: "",
            msg: "",
            msgType: "timeIsUp",
            data: {
              roomCode: this.roomCode,
            },
          }
          this.websocket.send(JSON.stringify(data));
          //this.roundSummaryShow = ["active", "slideInUp"];
          //this.roundSummary(); 
 
        } else {
          //this.drawTimeSec = 40;
          this.isMuteActive = "flex-active";     
        }
        return;
      }
      setTimeout(() => {
        this.drawTimeSec = this.drawTimeSec - 1;
        this.countDown();
      }, 1000);
    },
    

    // after drawing and guessing, a summary of this round will appear
    roundSummary() {
      console.log("8--------round summary")
      // if (this.roundSummaryDelay <= 1) {
      //   this.roundSummaryShow = [];
      // }
      if (this.roundSummaryDelay <= 0) {
        this.ctx.clearRect(0, 0, 10000, 10000);
        console.log("round summary call back");
        this.roundSummaryDelay = 6;
        this.roundSummaryShow = [];
        this.isCurUserAnswerCorrect = false;
        this.pointsAddEachRound = [];
        // 给服务器发送this.curRound + 1, msgType 是gameProcess 来开启下一轮
        //this.gameProccess(round + 1); 
        if (this.user.userId == this.drawer.userId) {
          let data = {
            status: "",
            msg: "",
            msgType: "totalPointsUserList",
            data: {
              roomCode: this.roomCode,
            },
          }

          this.websocket.send(JSON.stringify(data));

          data = {
            status: "",
            msg: "",
            msgType: "gameProcess",
            data: {
              roomCode: this.roomCode,
              round: this.curRound + 1,
            },
          }
          this.websocket.send(JSON.stringify(data));
        }
        return;
      }
      setTimeout(() => {
        this.roundSummaryDelay = this.roundSummaryDelay - 1;
        this.roundSummary();
      }, 1000);
    },

    chosenWord(w) {
      this.word = w;
      let data = {
        status: "",
        msg: "",
        msgType: "wordChosen",
        data: {
           word: this.word,
           roomCode: this.roomCode,
        },
      };

      this.websocket.send(JSON.stringify(data));
      this.chooseWordShow = [];

      data = {
        status: "",
        msg: "",
        msgType: "startDrawing",
        data: {
          roomCode: this.roomCode,
        },
      };
      this.websocket.send(JSON.stringify(data));
      

    },
    getReady() {
      // 给服务器发送当前用户准备了，服务器再发给这个房间中的所有人
      let data = {
        status: "",
        msg: "",
        msgType: "getReady",
        data: {
           user: this.user,
           roomCode: this.roomCode,
        },
      };

      this.websocket.send(JSON.stringify(data));
      this.$refs.readyBtn.style.width = "30px";
      this.$refs.readyBtn.innerHTML = "<i class='el-icon-check'></i>"
    },
    playAgainMethod() {
      // let data = {
      //   status: "",
      //   msg: "",
      //   msgType: "getReady",
      //   data: {
      //      user: this.user,
      //      roomCode: this.roomCode,
      //   },
      // };

      // this.websocket.send(JSON.stringify(data));

      this.gameOverShow = [];
      let data = {
        status: "",
        msg: "",
        msgType: "playAgain",
        data: {
           user: this.user,
           roomCode: this.roomCode,
        },
      };
      this.websocket.send(JSON.stringify(data));
      // let chatRow = document.createElement("div");
      // chatRow.classList = ["play-again-row"];
      // chatRow.innerText =  this.user.username + " want to play again (" + this.readyNums + "/" + this.playerList.length + ")";
      // this.$refs.chatBox.appendChild(chatRow);
      // this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
    },

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
  background-color: rgb(10, 94, 251);
  background-image: url("https://papergames.io/images/patterns/style-2-5.png");
}

.pictionary-container .shadow {
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 3, 3, 0.3);
  float: left;
  z-index: 999;
  animation-duration: 0.5s;
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
    visibility: visible;
  }

  to {
    
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

.pictionary-container
  .shadow
  .enter-room-id-wrapper
  .close-wrapper
  button:hover {
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

.pictionary-container
  .shadow
  .enter-room-id-wrapper
  .room-code-input-box
  input {
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

.pictionary-container
  .shadow
  .enter-room-id-wrapper
  .join-room-wrapper
  button:hover {
  cursor: pointer;
  background-color: rgb(73, 113, 136);
}
.pictionary-container
  .shadow
  .enter-room-id-wrapper
  .join-room-wrapper
  button:active {
  border: 3px black solid;
}

.pictionary-container
  .shadow
  .enter-room-id-wrapper
  .join-err-wrapper {
    display: none;
    line-height: 30px;
    height: 30px;
    width: 600px;
    text-align: center;
    font-size: 20px;
    color: red;
    font-weight: bold;
}

.pictionary-container .pictionary-menu-wrapper {
  display: none;
  width: 600px;
  height: 350px;
  background-color: white;
  margin: 150px auto;
  border-radius: 10px;
}

.pictionary-container .pictionary-menu-wrapper .pictionary-title-wrapper {
  padding-left: 10px;
  line-height: 100px;
  height: 98px;
  width: 590px;
  border-bottom: 2px solid rgb(196, 197, 198);
  color: rgb(253, 92, 32);
  /* background-color: blueviolet; */
}

.pictionary-container .pictionary-menu-wrapper .pictionary-menu-content {
  display: flex;
}

.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-image-wrapper {
  /* background-color: rgb(255, 0, 0); */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
}

.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list {
  margin-top: 35px;
  width: 350px;
  height: 180px;
}
.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list
  div {
  height: 60px;
  width: 350px;
}

.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list
  .create-room
  button {
  font-weight: bold;
  font-size: 20px;
  border: 4px solid black;
  outline: none;
  border-radius: 20px;
  height: 40px;
  width: 250px;
  margin: 2px 42px;
  background-color: rgb(255, 191, 0);
}

.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list
  .enter-room-code
  button {
  font-weight: bold;
  font-size: 20px;
  border: 4px solid black;
  outline: none;
  border-radius: 20px;
  height: 40px;
  width: 250px;
  margin: 2px 42px;
  background-color: rgb(255, 191, 0);
}
.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list
  .pictionary-game-rules
  button {
  font-weight: bold;
  font-size: 20px;
  border: 4px solid black;
  outline: none;
  border-radius: 20px;
  height: 40px;
  width: 250px;
  margin: 2px 42px;
  background-color: rgb(255, 191, 0);
}

.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list
  .create-room
  button:hover,
.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list
  .enter-room-code
  button:hover,
.pictionary-container
  .pictionary-menu-wrapper
  .pictionary-menu-content
  .pictionary-menu-list
  .pictionary-game-rules
  button:hover {
  cursor: pointer;
  background-color: rgb(255, 203, 0);
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
  background-color: rgba(0, 0, 0, 0.25);
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

.pictionary-container
  .main-area
  .rank-wrapper
  .rank-table
  tr
  td
  .player
  .player-rank {
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
.pictionary-container
  .main-area
  .rank-wrapper
  .rank-table
  tr
  td
  .player
  .player-avatar {
  height: 60px;
  line-height: 60px;
  width: 55px;
  text-align: center;
  border-radius: 50%;
}

.pictionary-container
  .main-area
  .rank-wrapper
  .rank-table
  tr
  td
  .player
  .player-avatar
  .avatar-wrapper {
  margin: 5px auto;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: hotpink;
}

.pictionary-container
  .main-area
  .rank-wrapper
  .rank-table
  tr
  td
  .player
  .player-name {
    overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  margin-left: 10px;
  height: 60px;
  line-height: 60px;
}

.pictionary-container
  .main-area
  .rank-wrapper
  .rank-table
  tr
  td
  .player
  .player-points {
  text-align: center;
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
  width: 862px;
  display: flex;
}

.pictionary-container .main-area .game-screen .game-info .info-container {
  height: 100%;
  /* background-color: aliceblue; */
  width: 70px;
}

.pictionary-container .main-area .game-screen .game-info .ready-btn-wrapper {
  margin-left: 10px;
  width: 100px;
  height: 100%;
  /* background-color: aliceblue; */
}

.pictionary-container .main-area .game-screen .game-info .ready-btn-wrapper button {
  font-weight: bold;
  color: white;
  font-size: 16px;
  border-radius: 20px;
  background-color: rgb(91, 175, 0);
  border: 2px solid transparent;
  background-clip: border-box;
  margin: 20px 0px;
  width: 90px;
  height: 30px;
  transition: all 0.3s;
}


.pictionary-container .main-area .game-screen .game-info .ready-btn-wrapper button:hover {
  cursor: pointer;
  border: 2px solid rgb(226, 226, 226);
}


.pictionary-container .main-area .game-screen .game-info .toolkit {
  /* background-color: rgb(36, 81, 149); */
  /* background-image: url("https://papergames.io/images/patterns/style-2-5.png"); */
  width: 380px;
  
  margin: 0 168px 0 70px;
  display: flex;
  align-items: center;
}

.pictionary-container .main-area .game-screen .game-info .toolkit .palette {
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

.pictionary-container .main-area .game-screen .game-info .toolkit .stroke-type {
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
  .pen-wrapper {
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
  .pen-wrapper
  img {
  transform: translateX(10px);
}

.pictionary-container
  .main-area
  .game-screen
  .game-info
  .toolkit
  .stroke-type
  .ereaser-wrapper {
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
  .ereaser-wrapper
  img {
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

.pictionary-container .main-area .game-screen .game-info .timer-wrapper {
  height: 64px;
  /* background-color: white; */
  width: 64px;
}

.pictionary-container .main-area .game-screen .game-info .timer-wrapper .timer {
  font-size: 18px;
  width: 64px;
  height: 64px;
  line-height: 71px;
  text-align: center;
  background-image: url("https://skribbl.io/res/clock.gif");
}

.pictionary-container .main-area .game-screen .canvas-wrapper {
  background-color: white;
  height: 84%;
  width: 100%;
}

#canv {
  background-color: rgb(255, 247, 235);
}

.pictionary-container .main-area .game-screen .canvas-wrapper .mute {
  height: 546px;
  width: 861.3px;
  background-color: transparent;
  position: relative;
  top: -550px;
  display: none;  /*to be changed*/
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info {
    line-height: 150px;
    width: 600px;
    height: 500px;
    /* background-color: tomato; */
    text-align: center;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items:center;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .gameStartInfo {
    animation-duration: 0.5s;
    display: none;
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundInfo {
    display: none;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container {
    display: none; /*to be deleted */
    background-color: rgb(255, 207, 45);
    width: 350px;
    height: 480px;
}


.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .game-over-container
  .game-over-title {
    color: rgb(255, 255, 255) !important;
    line-height: 100px;
    height: 100px;
    width: 350px;
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-rank-wrapper {
    height: 320px;
    /* margin-top: 20px; */
    /* background-color: aqua; */
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-rank-wrapper
  .game-over-rank-row {
    color: rgb(109, 78, 123);
    display: flex;
    justify-content: center;
    height: 40px;
    /* background-color: antiquewhite; */
    line-height: 40px;
    font-size: 20px;
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-rank-wrapper
  .game-over-rank-row-username {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 140px;
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-rank-wrapper
  .game-over-rank-row-points {
    width: 140px;
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-footer {
    justify-content: center;
    display: flex;
    line-height: 60px;
    height: 60px;
}
.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-footer
  .play-again-btn-wrapper {
    width: 160px;
    /* background-color: antiquewhite; */
    line-height: 45px;
    height: 60px;
}


.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-footer
  .play-again-btn-wrapper button {
    transition: all 0.5s;
    font-size: 14px;
    font-weight: bold;
    border-radius: 20px;
    color: white;
    background-color: rgb(100, 73, 145);
    border: none;
    width: 160px;
    height: 40px;
  }
.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-footer
  .play-again-btn-wrapper button
  .el-icon-right {
    font-weight: bold;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info
  .game-over-container
  .game-over-footer
  .play-again-btn-wrapper button:hover {
    cursor: pointer;
    transform: scale(1.15);
  }






.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary {
    display: none;
    background-color: rgb(52, 81, 98);
    width: 350px;
    height: 480px;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary
  .round-summary-container {
    width: 350px;
    height: 120px;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary
  .round-summary-container
  .time-is-up-wrapper {
    color: white;
    line-height: 70px;
    height: 60px;
    width: 350px;
    /* background-color: aqua; */
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary
  .round-summary-container
  .display-word-wrapper {
    font-size: 22px;
    line-height: 50px;
    height: 60px;
    width: 350px;
    /* background-color: wheat; */
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary
  .rank-each-round-wrapper {
    height: 320px;
    margin-top: 20px;
    /* background-color: aqua; */
}

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary
  .rank-each-round-row {
    display: flex;
    justify-content: center;
    height: 40px;
    background-color: antiquewhite;
    line-height: 40px;
    font-size: 20px;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary
  .rank-each-round-row
  .rank-each-round-row-username {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 140px;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .roundSummary
  .rank-each-round-row
  .rank-each-round-row-points {
    width: 140px;
  }
  
.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .chooseWord {
    display: none;
    width: 500px;
    height: 250px;
    background-color: rgb(52, 81, 98);
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .chooseWord 
  .chooseWord-title {
    width: 500px;
    height: 100px;
    /* background-color: red; */
    line-height: 100px;
    color: white;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .chooseWord
  .word-container {
    width: 500px;
    height: 150px;
    /* background-color: aqua; */
    display: flex;
    justify-content: start;
    align-items: center;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .chooseWord
  .word-container
  .word-btn-wrapper {
    border-radius: 20px;
    border: 2px transparent solid;
    background-clip: border-box;
    color: white;
    line-height: 46px;
    width: 96px;
    height: 46px;
    background-color: rgb(128, 205, 181);
    margin-left: 50px;
    font-size: 18px;
    transition: all 0.2s;
  }

.pictionary-container
  .main-area
  .game-screen
  .canvas-wrapper
  .mute
  .process-info 
  .chooseWord
  .word-container
  .word-btn-wrapper:hover {
    transform: scale(1.05);
    border: 2px solid rgb(226, 226, 226);
    cursor: pointer;
  }

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

.pictionary-container
  .main-area
  .game-screen
  .game-footer
  .leave-wrapper
  button {
  border-radius: 50%;
  margin-top: 2.5px;
  font-size: 16px;
  width: 25px;
  height: 25px;
  background-color: rgb(255, 0, 0);
  border: none;
  color: white;
}

.pictionary-container
  .main-area
  .game-screen
  .game-footer
  .leave-wrapper
  button:hover {
  cursor: pointer;
}

.pictionary-container .main-area .chat-box-wrapper {
  padding: 10px 5px;
  background-color: rgba(0, 0, 0, 0.25);
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

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(193, 193, 193);
}

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #f3f2f2;
}

.pictionary-container .main-area .chat-box-wrapper .chat-box .chat-row {
  border-radius: 3px;
  display: flex;
  /* height: 30px; */
  background-color: rgb(144, 188, 255);
  line-height: 30px;
  padding: 0 5px;
  overflow-wrap: break-word;
  margin-top: 2px;
  width: 240px;
}

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box
  .chat-row
  .chat-row-user {
  font-weight: bold;
  /* height: 30px; */
}

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box
  .chat-row
  .chat-row-msg {
  margin-left: 5px;
  overflow-wrap: break-word;
  
  /* height: 30px; */
}

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box
  .answer-correct-row {
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

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box
  .play-again-row {
  color: white;
  border-radius: 3px;
  display: flex;
  /* height: 30px; */
  background-color: rgb(255, 207, 45);
  line-height: 30px;
  padding: 0 5px;
  overflow-wrap: break-word;
  margin-top: 2px;
  width: 240px;
}

.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box
  .get-ready-row {
    color: white;
    border-radius: 3px;
    /* height: 30px; */
    background-color: rgb(37, 190, 161);
    line-height: 30px;
    padding: 0 5px;
    overflow-wrap: break-word;
    margin-top: 2px;
    width: 240px;
}
.pictionary-container
  .main-area
  .chat-box-wrapper
  .chat-box
.round-info-row {
    color: black;
    border-radius: 3px;
    display: flex;
    /* height: 30px; */
    background-color: rgb(255, 247, 235);
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
  background-color: rgba(0, 0, 0, 0.2);
  height: 40px;
  width: 255px;
}

.pictionary-container .main-area .chat-box-wrapper .mute-input-box {
  display: none;
  margin: 0 auto 0 5px;
  background-color: transparent;
  /* height: 40px;
  width: 255px; */
  height: 0px;
  width: 0px;
  transform: translateY(-40px);
}

.pictionary-container .main-area .chat-box-wrapper .input-box .input-msg {
  font-size: 16px;
  padding: 0 5px;
  border: none;
  outline: none;
  width: 200px;
  height: 40px;
}

.pictionary-container .main-area .chat-box-wrapper .input-box .btn-send {
  border: none;
  width: 45px;
  height: 40px;
}

.pictionary-container .main-area .chat-box-wrapper .input-box .btn-send:hover {
  cursor: pointer;
}

.info-wrapper-button {
  background-color: transparent !important;
  border: none !important;
  margin-top: 10px !important;
}

.el-icon-info {
  color: rgb(230, 230, 230);
  display: block;
  font-size: 26px;
}

.el-icon-info:hover {
  color: rgb(196, 196, 196);
  cursor: pointer;
}

.el-icon-check {
  font-weight: bold;
}

.el-icon-close {
  font-weight: 1000 !important;
}
</style>

