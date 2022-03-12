<template>
    <div class="battleship-container clearfix">
        <el-dialog
            title=""
            :visible.sync="enterRoomCodeDialog"
            width="450px"
            >
            <h1>ROOM CODE</h1>
            <span><input type="text" class="room-code-input"  v-model="inputRoomCode"></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="enterRoomCodeDialog = false">Cancel</el-button>
                <el-button type="primary"  @click="joinExisting">Confirm</el-button>
            </span>
        </el-dialog>
        <div class="game-menu" :class="gameMenuClass">
            <div class="game-title">
                <h1>Battleship</h1>
            </div>
            <div class="menu-content">
                <div class="game-logo">
                <img src="https://papergames.io/images/tic-tac-toe/thumbnail.png" width="250px">
                </div>
                <div class="game-actions">
                <div>
                    <button @click="newGame">New Game</button>
                </div>
                <div>
                    <button @click="enterRoomCode">Enter Room Code</button>
                </div>
                <div>
                    <button>About Tic Tac Toe</button>
                </div>
                </div>
            </div>
        </div>

        <div class="battleship-game-wrapper" :class="gameAreaClass">
            <div class="battleship-header" draggable="true">
                <div class="player-wrapper">
                    <button @click="initializeGrid">test</button>
                </div>

                <div class="divider">

                </div>
                <div class="player-wrapper">
                    
                </div>
            </div>

            <div class="game-area">

                <div class="game-info-wrapper">
                    <button @click="getReady()">READY</button>
                    <button @click="initializeGrid()">CONFIRM</button>
                    <button>LEAVE</button>
                </div>

                <div class="grid-wrapper">
                    
                    <div class="my-grid-wrapper" ref="myGrid">
                        <div class="ship1" @mousedown="dragStart($event)" data-length="3" data-dir="hor" ref="ship1" style="top: 80px; left: 0;"></div>
                        <div class="ship2" @mousedown="dragStart($event)" data-length="4" data-dir="hor" ref="ship2" style="top: 162px; left: 82px;"></div>
                        <div class="ship3" @mousedown="dragStart($event)" data-length="3" data-dir="por" ref="ship3" style="top: 244px; left: 0;"></div>
                        <div class="ship4" @mousedown="dragStart($event)" data-length="2" data-dir="hor" ref="ship4" style="top: 80px; left: 205px;"></div>
                        <div class="ship5" @mousedown="dragStart($event)" data-length="5" data-dir="por" ref="ship5" style="top: 285px; left: 123px;"></div>

                        <div class="grid-title">

                        </div>

                        <div class="battleship-grid my-grid">
                            <table>
                                
                                <tr>
                                    <td>
                                        <!-- <div class="shot">
                                            X
                                        </div> -->
                                    </td>
                                    <td>
                                        <!-- <div class="shot">
                                            X
                                        </div> -->
                                    </td>
                                    <td>
                                        <!-- <div class="shot">
                                            X
                                        </div> -->
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>




                    <div class="opponent-grid-wrapper">
                        <div class="grid-title">

                        </div>
                        <div class="battleship-grid opponent-grid">
                            <table>
                                
                                <tr v-for="(i, index) in 10" :key="index">
                                    <td v-for="(i, index) in 10" :key="index" @click="playerAction">
                                        <div class="guessed" style="display: none;">

                                        </div>
                                        <div class="shot" style="display: none;">
                                           <svg t="1646968024721" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7878" width="35" height="40">
                                                <path d="M859.9104 609.92512l0 45.6c-0.67968 2.21952-1.5104 4.4352-1.9648 6.70464-4.66048 24.09984-7.28448 48.82944-14.31552 72.22016-20.84992 69.02016-59.92064 126.53952-114.6944 173.50016-42.24512 36.2496-89.7856 62.36544-144.1344 75.22048-17.87008 4.23552-36.19456 6.73024-54.32064 10.0352l-45.5744 0c-2.21952-0.6848-4.49024-1.72032-6.75456-1.87008-48.12544-2.9952-93.72544-15.52512-136.50048-37.38496-80.86528-41.18528-139.19488-102.5152-165.83552-190.74048-5.67424-18.8544-8.03968-38.62016-11.9744-57.97504l0-43.50976c1.7152-10.69056 3.2-21.47456 5.21984-32.16 8.61952-46.68544 29.36576-88.0256 56.83968-126.19008 25.91488-35.92064 53.44-70.70464 78.016-107.53536 26.56896-39.95008 39.424-84.2944 31.88992-132.9152-1.4848-9.60512-2.87488-19.20896-4.33536-28.76416 0.98048-0.25088 1.9648-0.45056 2.9504-0.73088 59.31008 62.16064 68.96512 138.46528 60.49408 220.92032 2.17088-2.31936 3.98592-3.93472 5.37088-5.79968 50.33984-68.08448 71.96416-143.29984 55.55456-227.54688-10.42944-53.58976-32.99456-101.76512-70.32448-141.81504C369.3056 61.84576 349.69472 47.65568 331.61984 32l18.65472 0c1.536 0.62976 2.976 1.7152 4.53504 1.86496 32.82048 2.81984 63.65056 12.95488 93.02016 27.2 67.17056 32.51584 121.62048 80.58496 167.17056 139.22048 66.9504 86.27968 110.48448 181.99424 119.10528 292.19968 3.30496 42.06976-0.9856 82.95552-12.19968 123.2896-4.23552 15.27552-10.21056 30.04544-15.68 45.94944 21.72544-9.25056 38.24-23.38944 50.9952-41.7152 38.04032-54.77504 48.67456-115.85536 40.05504-183.38048 2.80064 3.24992 4.23552 4.53504 5.21472 6.14528 22.91456 36.19968 40.05504 74.81472 49.0048 116.78464C855.05024 576.17024 857.11488 593.1648 859.9104 609.92512M501.56544 529.61536c-0.85504 0.60544-1.79072 1.2352-2.67008 1.84064-1.18528 16.64-2.06976 33.30048-3.68 49.93536-2.37056 25.38496-8.44544 49.85984-20.32 72.62464-14.52032 27.87968-38.7904 45.21984-65.69088 59.01056-29.00992 14.9696-47.28448 36.34944-49.65504 70.10048-2.46912 34.70976 7.96544 63.86944 35.94496 85.20064 26.21568 19.96032 56.84096 26.4704 89.3056 25.38496 51.82976-1.6896 90.4448-26.32064 105.92512-78.1952 11.11552-37.23008 9.30048-74.71488 1.86496-112.19456-10.16064-51.37536-28.76544-99.26528-60.60032-141.2352C523.04512 550.36032 511.7504 540.40448 501.56544 529.61536" p-id="7879" fill="#d81e06">
                                                </path>
                                            </svg>
                                        </div>
                                        <div class="dead" style="display: none;">
                                            <svg t="1646967839166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2897" width="40" height="40">
                                                <path d="M637.910204 893.387755c-25.077551 0-47.542857-11.493878-62.693877-29.257143-15.15102 17.763265-37.616327 29.257143-62.693878 29.257143s-47.542857-11.493878-62.693878-29.257143c-15.15102 17.763265-37.616327 29.257143-62.693877 29.257143-45.453061 0-82.546939-37.093878-82.546939-82.546939v-34.481632C176.587755 739.787755 114.938776 658.285714 114.938776 527.673469c0-218.906122 178.155102-397.061224 397.061224-397.061224s397.061224 178.155102 397.061224 397.061224c0 130.612245-61.64898 212.114286-188.604081 248.163266v34.481632c0 45.97551-37.093878 83.069388-82.546939 83.069388z" fill="#568289" p-id="2898"></path><path d="M338.546939 415.869388c-57.469388 0-104.489796 46.497959-104.489796 104.489796s46.497959 103.967347 104.489796 103.967347 103.967347-46.497959 103.967347-103.967347-46.497959-104.489796-103.967347-104.489796zM685.97551 415.869388c-57.469388 0-103.967347 46.497959-103.967347 104.489796s46.497959 103.967347 103.967347 103.967347 103.967347-46.497959 103.967347-103.967347-46.497959-104.489796-103.967347-104.489796z" fill="#245156" p-id="2899">
                                                </path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            gameMenuClass: ["active"],
            websocket: null,
            enterRoomCodeDialog: false,
            inputRoomCode: "",
            gameAreaClass: [],
            bPlayer: null,
            opponent: null,
            roomCode: "",
            playerList: [],
        }
    },

    mounted() {
        this.connectWebSocket();
    },

    computed: {
        ...mapState("common", {
        user: "user",
        }),
    },

    watch: {
        readyNum: {
            handler(newValue, oldValue) {
                console.log(oldValue);
                if (newValue == 2) {
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
    },


    methods: {
        enterRoomCode() {
            this.enterRoomCodeDialog = true;
        },

        joinExisting(){
            let data = {
                status: "",
                msg: "",
                msgType: "joinExisting",
                data: {
                    roomCode: this.inputRoomCode,
                    user: this.user,
                },
            };
            this.websocket.send(JSON.stringify(data));
        },

        newGame() {
            let data = {
                status: "",
                msg: "",
                msgType: "newGame",
                data: {
                user: this.user,
                },
            };
            this.websocket.send(JSON.stringify(data));
        },

        dragStart(e) {
            let myGrid = this.$refs.myGrid;
            console.log(myGrid.offsetTop)
            //console.log(e.target)
            let ol = e.clientX - 245 - e.target.offsetLeft;
            let ot = e.clientY - 234 - e.target.offsetTop;
            var ship = e.target;
            let originalTop = ship.style.top;
            let originalLeft = ship.style.left;
            let dir = e.target.getAttribute("data-dir")
            let len = e.target.getAttribute("data-length");
                document.onmousemove = function(event) {
                    //console.log(e)
                    let left = event.clientX;
                    let top = event.clientY;

                    
                    
                    // console.log(ship.offsetLeft)
                    // console.log("event"+event.clientX)


                    var newTop = top - 234 - ot;
                    var newLeft =  left - 245 - ol;
                    // console.log("newTop" + newTop)
            
                    ship.style.top = newTop + "px";
                    ship.style.left = newLeft + "px";
                    

                    // for (let i = 1; i <= 10; i++) {
                    //     console.log("#" + (-5 + (i - 1) * 40 + i * 1 + 80))
                    //     console.log("$" + (5 + (i - 1) * 40 + i* 1 + 80))
                    //     if (newLeft >= (-5 + (i - 1) * 40 + i * 1 + 80) && newTop <= (5 + (i - 1) * 40 + i * 1 + 80)) {
                    //         ship.style.top = (i - 1) * 40 + (i - 1) * 1 + 80 + "px";
                    //         console.log("change" + ((i - 1) * 40 + (i - 1) * 1 + 80))
                    //     }
                    // }
                    
                document.onmouseup = function() {
                    for (let i = 1; i <= 11; i++) {
                        if (newTop >= (-20 + (i - 1) * 40 + i * 1 + 80) && newTop <= (20 + (i - 1) * 40 + i * 1 + 80)) {
                            ship.style.top = (i - 1) * 41 + 80 + "px";
                            //console.log("change" + ((i - 1) * 40 + (i - 1) * 1 + 80))
                        }
                    }
                        
                    for (let i = 1; i <= 11; i++) {
                        if (newLeft >= (-20 + (i - 1) * 40 + i * 1) && newLeft <= (20 + (i - 1) * 40 + i * 1)) {
                            ship.style.left = (i - 1) * 41+ "px";
                            //console.log("change" + ((i - 1) * 40 + (i - 1) * 1 + 80))
                        }
                    }
                        //console.log(ship.style.top)
                    if (newTop >= 490 || newLeft >= 410 || newLeft < -20 || newTop <= 60) {
                        ship.style.top = originalTop;
                        ship.style.left = originalLeft;
                    }

                    if (dir == "hor") {
                        if (newLeft > (10 - len) * 41) {
                            ship.style.top = originalTop;
                            ship.style.left = originalLeft;
                        }
                    } else {
                        if (newTop > 80 + (10 - len) * 41) {
                            ship.style.top = originalTop;
                            ship.style.left = originalLeft;
                        }
                    }

                    document.onmousemove = null;
                    document.onmouseup = null;
                }
                
            }  

            
            return false;
        },

        connectWebSocket() {
            //判断当前浏览器是否支持WebSocket
            if ("WebSocket" in window) {
                this.websocket = new WebSocket("ws://localhost:8081/battleshipServer");
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

                if (receivedData.msgType == "newGame") {
                    this.bPlayer = receivedData.data.bPlayer;
                    console.log(this.bPlayer);
                    this.roomCode = receivedData.data.roomCode;
                    this.gameAreaClass = ["active"];
                    this.gameMenuClass = [];
                }

                if (receivedData.msgType == "getReady") {
                    console.log(receivedData.data.username + " is ready")
                    this.readyNum++;
                }

                if (receivedData.msgType == "joinExisting") {
                    this.roomCode = receivedData.data.roomCode;
                    let playerList = receivedData.data.players;
                    for (let i = 0; i < playerList.length; i++) {
                        if (playerList[i].userId == this.user.userId) {
                            this.bPlayer = playerList[i];
                        } else { 
                            this.opponent = playerList[i]; 
                        }
                    }
                    console.log(this.bPlayer)
                    console.log(this.opponent)
                    this.enterRoomCodeDialog = false;
                    this.gameMenuClass = [""];
                    this.gameAreaClass = ["active"]
                }

                if (receivedData.msgType == "initializeGrid") {
                    
                    console.log("init complete")

                }




                console.log(event)
            };
            this.websocket.onclose = function (e) {
                console.log('websocket 断开：' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                console.log(e)
            };

        },


        initializeGrid() {
            let ship1 = this.$refs.ship1;
            let ship2 = this.$refs.ship2;
            let ship3 = this.$refs.ship3;
            let ship4 = this.$refs.ship4;
            let ship5 = this.$refs.ship5;
            let list = [];
            list.push(ship1)
            list.push(ship2)
            list.push(ship3)
            list.push(ship4)
            list.push(ship5)
            let data = []

            for (let index = 0; index < list.length; index++) {
                let ship = list[index];
                let top = ship.style.top;
                let left = ship.style.left;
                top = top.slice(0, -2);
                left = left.slice(0, -2);
                top = parseInt(top);
                left = parseInt(left);
                //console.log(top, left)
                let obj = {
                    row: (top - 80) / 41,
                    col: left / 41,
                    dir: ship.getAttribute("data-dir"),
                    len: ship.getAttribute("data-length"),
                }
                data.push(obj);
            }

            let msg = {
                status: "",
                msg: "",
                msgType: "initializeGrid",
                data: {
                   ships: data,
                   bPlayer: this.bPlayer,
                   roomCode: this.roomCode,
                },
            }
            this.websocket.send(JSON.stringify(msg))
            console.log("send")
        },


        getReady() {
            if (this.opponent != null) {
                let data = {
                status: "",
                msg: "",
                msgType: "getReady",
                data: {
                    bPlayer: this.bPlayer,
                    roomCode: this.roomCode,
                },
                };
                this.websocket.send(JSON.stringify(data));
                // this.$refs.readyBtn.style.width = "35px";
                // this.$refs.readyBtn.style.marginLeft = "165px";
                // this.$refs.readyBtn.innerHTML = "<i class='el-icon-check'></i>";
            }
        },
        playerAction() {
            
        },


    }

}
</script>

<style>
.battleship-container {
    margin: 0 auto;
    width: 1400px;
    height: 720px;
    /* background-color: brown; */
}
.game-menu {
  display: none;
  margin-left: 400px;
  margin-top: 185px;
  width: 600px;
  height: 350px;
  background-color: white;
  box-shadow: 0 0 10px rgb(155, 155, 155);
  
}

.game-menu .game-title {
  height: 100px;
  width: 590px;
  padding-left: 10px;
  line-height: 100px;
}


.game-menu .menu-content {
  display: flex;
  height: 250px;
  width: 600px;
}

.game-menu .menu-content .game-logo {
  width: 250px;
  height: 250px;
}

.game-menu .menu-content .game-actions {
  /* background-color: blue; */
  margin-top: 35px;
  width: 350px;
  height: 180px;
}

.game-menu .menu-content .game-actions div {
  /* background-color: rebeccapurple; */
  height: 60px;
  width: 350px;
}


.game-menu .menu-content .game-actions > div > button {
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

.game-menu .menu-content .game-actions > div > button:hover {
  cursor: pointer;
  background-color: rgb(255, 203, 0);
}

.battleship-game-wrapper {
    background-color: rgba(106, 170, 255, 0.897);
    display: none;
}


.battleship-header {
  width: 1400px;
  height: 100px;
  /* background-color: black; */
  display: flex;
  justify-content: center;
}

.battleship-header .player-wrapper {
    width: 699px;
    height: 100px;
    display: flex;
    background-color: white;
}

.divider {
    width: 2px;
    height: 80px;
    margin-top: 10px;
    background-color: rgb(155, 155, 155);
}

.game-area {
    display: flex;
    height: 620px;
    width: 1400px;

}


.game-info-wrapper {
    width: 200px;
    height: 620px;
    background-color: burlywood;
}

.grid-wrapper {
    width: 1000px;
    height: 620px;
    background-color: antiquewhite;
    /* margin-left: 200px; */
    display: flex;
    justify-content: space-around;
}

.my-grid-wrapper {
    position: relative;
    margin-top: 70px;
    width: 411px;
    height: 491px;
    /* background-color: aquamarine; */
}

.opponent-grid-wrapper {
    margin-top: 70px;
    width: 411px;
    height: 491px;
    background-color: aquamarine;
}

.grid-title {
    width: 400px;
    height: 80px;
    margin-left: 5.5px;
    background-color:azure;
}

.battleship-grid table {
    border: 1px solid rgba(2, 2, 2, 0.2);
    border-collapse: collapse;
    
}

.battleship-grid table tr td{
    
    background-color: rgb(3, 169, 252);
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 40px;
    height: 40px;
}

.my-grid {
    width: 411px;
    height: 411px;
}

.opponent-grid {
    width: 411px;
    height: 411px;
}

.opponent-grid table td:hover {
    cursor: pointer;
    background-color: rgb(1, 133, 209);
}

.ship1 {
    border-radius: 15px;
    width: 122px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    /* border: 1px red solid; */
    z-index: 99;
}

.ship2 {
    border-radius: 15px;
    width: 165px;
    height: 40px; 
    position: absolute;
    background-color: rgba(2, 2, 2, 0.6);

}

.ship3 {
    border-radius: 15px;
    width: 42px;
    height: 124px;
    position: absolute;
    background-color: rgba(2, 2, 2, 0.6);
   
}

.ship4 {
    border-radius: 15px;
    width: 83px;
    height: 42px;
    position: absolute;
    background-color: rgba(2, 2, 2, 0.6);
    
}

.ship5 {
    border-radius: 15px;
    width: 42px;
    height: 206px;
    position: absolute;
    background-color: rgba(2, 2, 2, 0.6);
    
}


.shot {  
    width: 40px;
    height: 40px;
    position: relative;
    z-index: 99999;
    /* background-color: rgba(255, 0, 0, .8); */
    color: white;
    text-align: center;
    line-height: 30px;
}

.guessed {
    background-color: rgb(1, 133, 209);
    width: 40px;
    height: 40px;
}

.dead {
    width: 40px;
    height: 40px;
    
}



</style>