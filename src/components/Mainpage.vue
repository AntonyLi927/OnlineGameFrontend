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
                <div class="tic-tac-toe-wrapper" @click="gotoTicTacToe">
                    <div class="tic-tac-toe-img-wrapper clearfix"  @mouseout="ticTacToeInfoFadeOut" @mouseover="ticTacToeInfoFadeIn">
                        <div class="tic-tac-toe-info"  :class="ticTacToeInfoAnimation">
                            <p>Play Tic Tac Toe game with your firends!</p>
                        </div>
                    </div>
                    <div class="tic-tac-toe-title-wrapper">
                        <span>Tic Tac Toe</span>
                    </div>
                </div>
                <div class="battleship-wrapper" @click="gotoBattleship">
                     <div class="battleship-img-wrapper clearfix"  @mouseout="battleshipInfoFadeOut" @mouseover="battleshipInfoFadeIn">
                        <div class="battleship-info"  :class="battleshipInfoAnimation">
                            <p>Play Battleship game with your firends!</p>
                        </div>
                    </div>
                    <div class="battleship-title-wrapper">
                        <span>Battleship</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-page-content">
            <div class="content-left">
                <div class="content-left-title">
                    For Better Socializing Among Friends
                </div>
            </div>
            <div class="content-right">
                <div class="content-right-intro">
                    <p>
                        Play with anyone in the world in real time by sharing a unique room number. 
                        In one click you'll be connected together.
                    </p> 
                    <p>&nbsp;</p>
                    <p>
                        This is some introduction.This is some introduction.
                        This is some introduction.
                        This is some introduction.This is some introduction.
                        This is some introduction.This is some introduction.
                        This is some introduction.This is some introduction.
                        This is some introduction.This is some introduction.
                    </p> 
                    <p>&nbsp;</p>
                    <p>
                        This is some introduction.This is some introduction.
                        This is some introduction.
                        This is some introduction.This is some introduction.
                        This is some introduction.This is some introduction.
                        This is some introduction.This is some introduction.
                        This is some introduction.This is some introduction.
                    </p> 
                </div>
            </div>
        </div>
        <div class="mainpage-footer clearfix">
            <div class="homepage-footer-content-wrapper ">
                <div>
                    <div class="footer-item-title">
                        Contact us
                    </div>
                    <div class="footer-item-content">
                        <p>Twitter</p>
                        <p>&nbsp;</p>
                        <p>Github</p>
                        <p>&nbsp;</p>
                        <p>WeChat</p>
                    </div>
                </div>
                <div>
                    <div class="footer-item-title">
                        Support us
                    </div>
                </div>
                <div>
                    <div class="footer-item-title">
                        About us
                    </div>
                </div>
                <div>
                    <div class="footer-item-title">
                        Join us
                    </div>
                </div>
            </div>
        </div>
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
            gotoTicTacToe() {
                this.$router.push({
                    path: '/mainpage/tictactoe',
                })
            },
            gotoBattleship() {
                this.$router.push({
                    path: '/mainpage/battleship',
                })
            }
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
    background-color: #5a6575;
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
    background-color: white;
    border-radius: 20px;
    background-image: url("../assets/pictionary.png");
    background-repeat: no-repeat;
    background-position: center;

}

.mainpage-container .game-list-area .game-list-wrapper .pictionary-wrapper .pictionary-img-wrapper .pictionary-info {
    width: 260px;
    height: 60px;
    padding: 10px;
    background-color: rgb(41, 63, 82);
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
    background-color: white;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-image: url("../assets/tictactoe.png");
    background-position: center;
    
}

.mainpage-container .game-list-area .game-list-wrapper .tic-tac-toe-wrapper .tic-tac-toe-img-wrapper .tic-tac-toe-info {
    width: 260px;
    height: 60px;
    padding: 10px;
    background-color: rgb(41, 63, 82);
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
    background-color: white;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-image: url("../assets/battleship.png");
    background-size: 220px;
    background-position: center;
}

.mainpage-container .game-list-area .game-list-wrapper .battleship-wrapper .battleship-img-wrapper .battleship-info {
    width: 260px;
    height: 60px;
    padding: 10px;
    background-color: rgb(41, 63, 82);
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

.mainpage-container .home-page-content {
    background-color: #25bea1;
    background-image: url("../assets/home__launch.svg");
    background-repeat: no-repeat;    
    width: 100%;
    height: 760px;
    display: flex
}

.mainpage-container .home-page-content .content-left {
    /* border: 1px solid black; */
    /* background-color: red; */
    width: 45%;
    height: 760px;
}

.mainpage-container .home-page-content .content-left-title {
    margin-top: 20px;
    color: white;
    margin-left: 50px;
    /* background-color: red; */
    font-size: 80px;
}

.mainpage-container .home-page-content .content-right {
    /* border: 1px solid black; */
    width: 55%;
    height: 760px;
}

.mainpage-container .home-page-content .content-right .content-right-intro {
    color: white;
    font-size: 18px;
    margin-left: 300px;
    margin-top: 100px;
    /* border: 1px solid black; */
    width: 400px;
    height: 500px;
}

.mainpage-container .mainpage-footer {
    height: 400px;
    width: 100%;
    background-color: rgb(23, 36, 47);
}

.mainpage-container .mainpage-footer
.homepage-footer-content-wrapper {
    margin: 50px auto;
    width: 1200px;
    height: 300px;
    /* background-color: aliceblue; */
    display: flex;
}
.mainpage-container .mainpage-footer
.homepage-footer-content-wrapper > div {
    width: 300px;
    height: 300px;
    /* background-color: rebeccapurple; */
}

.mainpage-container .mainpage-footer
.homepage-footer-content-wrapper > div .footer-item-title {
    width: 300px;
    height: 50px;
    color: white;
    font-size: 26px;
    font-weight: bold;
}

.mainpage-container .mainpage-footer
.homepage-footer-content-wrapper > div .footer-item-content {
    width: 300px;
    height: 250px;
    color: white;
    
}

</style>