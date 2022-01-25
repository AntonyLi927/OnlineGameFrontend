<template>
    <div class="mainpage-container">
        <div class="game-list-area clearfix">
            <div class="game-list-wrapper">
                <div class="pictionary-wrapper" @click="gotoPictionary">
                    <div class="pictionary-img-wrapper clearfix"  @mouseout="pictionaryInfoFadeOut" @mouseover="pictionaryInfoFadeIn">
                        <div class="pictionary-info"  :class="pictionaryInfoAnimation">
                            <p>Play Pictionary game with your firends!</p>
                        </div>
                    </div>
                    <div class="pictionary-title-wrapper">
                        <span>Pictionary</span>
                    </div>
                </div>
                <div class="tic-tac-toe-wrapper">
                    <div class="tic-tac-toe-img-wrapper clearfix"  @mouseout="ticTacToeInfoFadeOut" @mouseover="ticTacToeInfoFadeIn">
                        <div class="tic-tac-toe-info"  :class="ticTacToeInfoAnimation">
                            <p>Play Pictionary game with your firends!</p>
                        </div>
                    </div>
                    <div class="tic-tac-toe-title-wrapper">
                        <span>Tic Tac Toe</span>
                    </div>
                </div>
                <div class="battleship-wrapper">
                     <div class="battleship-img-wrapper clearfix"  @mouseout="battleshipInfoFadeOut" @mouseover="battleshipInfoFadeIn">
                        <div class="battleship-info"  :class="battleshipInfoAnimation">
                            <p>Play Pictionary game with your firends!</p>
                        </div>
                    </div>
                    <div class="battleship-title-wrapper">
                        <span>Battleship</span>
                    </div>
                </div>
            </div>
        </div>
        <div>22</div>
        <div class="mainpage-footer">33</div>
    </div>
</template>

<script>

    export default {  
        name: 'mainpage',
        data() {
            return {
                pictionaryInfoAnimation: '',
                ticTacToeInfoAnimation: '',
                battleshipInfoAnimation: '',
            }
        },
        methods: {
            pictionaryInfoFadeIn() {
                this.pictionaryInfoAnimation = "info-fade-in";
            },
            pictionaryInfoFadeOut() {
                this.pictionaryInfoAnimation = "info-fade-out";
            },
            ticTacToeInfoFadeIn() {
                this.ticTacToeInfoAnimation = "info-fade-in";
            },
            ticTacToeInfoFadeOut() {
                this.ticTacToeInfoAnimation = "info-fade-out";
            },
            battleshipInfoFadeIn() {
                this.battleshipInfoAnimation = "info-fade-in";
            },
            battleshipInfoFadeOut() {
                this.battleshipInfoAnimation = "info-fade-out";
            },
            gotoPictionary() {
                this.$router.push({
                    path: '/mainpage/pictionary',
                })
            },
        }
    }

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

.mainpage-container .game-list-area {
    height: 700px;
    width: 100%;
    /* background-color: royalblue; */
    
}

.mainpage-container .game-list-area .game-list-wrapper {
    margin-top: 100px;
    height: 500px;
    width: 100%;
    /* background-color: #fff; */
    display: flex;
    justify-content: center;
}

.mainpage-container .game-list-area .game-list-wrapper>div {
    width: 280px;
    height: 280px;
    background-color: rgb(98, 80, 112);
    margin-left: 80px;
    margin-top: 100px;
    border-radius: 20px;
    padding: 10px;
}


/*pictionary */
.mainpage-container .game-list-area .game-list-wrapper .pictionary-wrapper:hover {
   cursor: pointer;
}

.mainpage-container .game-list-area .game-list-wrapper .pictionary-wrapper .pictionary-img-wrapper {
    overflow: hidden;
    width: 280px;
    height: 220px;
    background-color: burlywood;
    border-radius: 20px;
    background-image: url("../assets/pictionary.png");
    
}

.mainpage-container .game-list-area .game-list-wrapper .pictionary-wrapper .pictionary-img-wrapper .pictionary-info {
    width: 260px;
    height: 60px;
    padding: 10px;
    background-color: rgb(30, 42, 121);
    margin-top: 140px;
    position: relative;
    top: 80px;
    color: white;
}

.mainpage-container .game-list-area .game-list-wrapper .pictionary-wrapper .pictionary-title-wrapper {
    width: 280px;
    height: 60px;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    line-height: 60px;
    color: white;
}

/*-------------------------------------------------------------------------------*/
/*tictactoe*/
.mainpage-container .game-list-area .game-list-wrapper .tic-tac-toe-wrapper {
   
}

.mainpage-container .game-list-area .game-list-wrapper .tic-tac-toe-wrapper .tic-tac-toe-img-wrapper {
    overflow: hidden;
    width: 280px;
    height: 220px;
    background-color: burlywood;
    border-radius: 20px;
    background-image: url("../assets/tictactoe.png");
    background-position: center;
    
}

.mainpage-container .game-list-area .game-list-wrapper .tic-tac-toe-wrapper .tic-tac-toe-img-wrapper .tic-tac-toe-info {
    width: 260px;
    height: 60px;
    padding: 10px;
    background-color: rgb(30, 42, 121);
    margin-top: 140px;
    position: relative;
    top: 80px;
    color: white;
}

.mainpage-container .game-list-area .game-list-wrapper .tic-tac-toe-wrapper .tic-tac-toe-title-wrapper {
    width: 280px;
    height: 60px;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    line-height: 60px;
    color: white;
}

/*battleship */
.mainpage-container .game-list-area .game-list-wrapper .battleship-wrapper {
   
}

.mainpage-container .game-list-area .game-list-wrapper .battleship-wrapper .battleship-img-wrapper {
    overflow: hidden;
    width: 280px;
    height: 220px;
    background-color: burlywood;
    border-radius: 20px;
    background-image: url("../assets/pictionary.png");
}

.mainpage-container .game-list-area .game-list-wrapper .battleship-wrapper .battleship-img-wrapper .battleship-info {
    width: 260px;
    height: 60px;
    padding: 10px;
    background-color: rgb(30, 42, 121);
    margin-top: 140px;
    position: relative;
    top: 80px;
    color: white;
}

.mainpage-container .game-list-area .game-list-wrapper .battleship-wrapper .battleship-title-wrapper {
    width: 280px;
    height: 60px;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    line-height: 60px;
    color: white;
}

.info-fade-in {
    animation-name: fadeInFromBottom;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
}

@keyframes fadeInFromBottom {
    from {
        top: 80px;
    }

    to {
        top: 0;
    }
}


.info-fade-out {
    animation-name: infoFadeOut;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
}

@keyframes infoFadeOut {
    from {
        top: 0;
    }

    to {
        top: 80px;
    }
}




.mainpage-container .mainpage-footer {
    height: 400px;
    width: 100%;
    background-color: rgb(23, 36, 47);
}
</style>