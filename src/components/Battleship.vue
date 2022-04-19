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

        <el-dialog
            title="BATTLESHIP"
            :visible.sync="aboutBattleship"
            width="450px"
            >
            <p>The two players should be positioned so they face each other across a game table. Their target grids back up to one another vertically so that neither player can see his opponent's ocean grid and ship locations.</p>
            <br>
            <p>Before the game starts, each opponent secretly places their own five ships on the ocean grid (lower part of the board) by laying out their ships and anchoring them into the holes on the grid. Each ship must be placed horizontally or vertically across grid spaces—not diagonally—and the ships can't hang off the grid. Ships can touch each other, but they can't occupy the same grid space. You cannot change the position of the ships after the game begins.</p>
            <br>
            <p>Players take turns firing shots (by calling out a grid coordinate) to attempt to hit the opponent's enemy ships.</p>
            <br>
            <p>On your turn, call out a letter and a number that identifies a row and column on your target grid. Your opponent checks that coordinate on their ocean grid and verbally responds "miss" if there is no ship there, or "hit" if you have correctly guessed a space that is occupied by a ship.</p>
            <br>
            <p>Mark each of your shots or attempts to fire on the enemy using your target grid (upper part of the board) by using white pegs to document your misses and red pegs to register your hits. As the game proceeds, the red pegs will gradually identify the size and location of your opponent's ships.</p>
            <br>
            <p>When it is your opponent's turn to fire shots at you, each time one of your ships receives a hit, put a red peg into the hole on the ship corresponding to the grid space. When one of your ships has every slot filled with red pegs, you must announce to your opponent when your ship is sunk. In classic play, the phrase is "You sunk my battleship!"</p>
            <br>
            <p>The first player to sink all five of their opponent's ships wins the game.</p>
            
            
            
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="aboutBattleship = false">Cancel</el-button>
                <el-button type="primary" @click="aboutBattleship = false">Confirm</el-button>
            </span>
        </el-dialog>

        <!-- <el-alert
            title="It's not your turn!"
            type="error"
            effect="dark"
            center
            style="position: absolute; width: 400px; left: 720px; display: none;"
            :class="notYourTurnAlert"
            close="closeNotYourTurnAlert"
            >
        </el-alert> -->

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
                    <button @click="aboutBattleship = true">About Battleship</button>
                </div>
                </div>
            </div>
        </div>

        <div class="battleship-game-wrapper" :class="gameAreaClass">
            <div class="battleship-header" draggable="true">
                <div class="player-wrapper">
                    <div class="player-info clearfix">
                        <div class="avatar-wrapper" v-if="bPlayer != null">
                            
                        </div>
                        <div class="info-wrapper">
                            <div class="username" v-if="bPlayer != null">{{bPlayer.username}}</div>
                            <div class="userId" v-if="bPlayer != null"><p>#{{bPlayer.userId}}</p></div>
                        </div>
                    </div>
                    <div class="points" v-if="bPlayer != null">
                        <h1>{{bPlayer.points}}</h1>
                    </div>
                </div>

                <div class="divider">

                </div>
                <div class="player-wrapper">
                    
                    <div class="points" v-if="opponent != null" style="marginLeft: 0;">
                        <h1>{{opponent.points}}</h1>
                    </div>

                    <div class="player-info clearfix" style="marginLeft: 199px;">
                        <div class="info-wrapper" style="width: 290px;">
                            <div class="username" v-if="opponent != null">{{opponent.username}}</div>
                            <div class="userId" v-if="opponent != null"><p>#{{opponent.userId}}</p></div>
                        </div>
                        <div class="avatar-wrapper" v-if="opponent != null">
                            
                        </div>
                    </div>

                </div>
            </div>

            <div class="battleship-game-area">

                <div class="battleship-game-info-wrapper clearfix" >
                    <button @click.once="getReady()" class="readyBtn-b">READY</button>
                    <button @click="initializeGrid()" class="confirmBtn-b">CONFIRM</button>
                    <button class="leaveBtn-b" @click="leaveMethod">LEAVE</button>
                    <el-popover
                        placement="bottom"
                        width="30px"
                        trigger="hover"
                        :content="'room code: ' + roomCode">
                        <el-button slot="reference" class="roominfo-btn-b">GAME INFO</el-button>
                    </el-popover>
                </div>

                <div class="grid-wrapper">
                    
                    <div class="my-grid-wrapper" ref="myGrid">
                        <div class="ship1" @mousedown="dragStart($event)" data-length="3" data-dir="hor" ref="ship1" style="top: 81px; left: 0; width: 122px; height: 40px;">
                            <svg t="1647484639562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2238" width="30" height="30" @click="rotateShip($event)">
                                <path d="M941.728 137.152C941.728 122.304 932.576 109.152 919.456 103.424 905.728 97.728 889.728 100.576 879.456 111.424L805.152 185.152C724.576 109.152 615.456 64 502.88 64 261.152 64 64 261.152 64 502.88 64 744.576 261.152 941.728 502.88 941.728 633.728 941.728 757.152 884 840.576 783.424 846.304 776 846.304 765.152 839.456 758.88L761.152 680C757.152 676.576 752 674.88 746.88 674.88 741.728 675.424 736.576 677.728 733.728 681.728 677.728 754.304 593.728 795.424 502.88 795.424 341.728 795.424 210.304 664 210.304 502.88 210.304 341.728 341.728 210.304 502.88 210.304 577.728 210.304 648.576 238.88 702.304 288.576L623.456 367.424C612.576 377.728 609.728 393.728 615.456 406.88 621.152 420.576 634.304 429.728 649.152 429.728L905.152 429.728C925.152 429.728 941.728 413.152 941.728 393.152L941.728 137.152Z" p-id="2239" fill="#e6e6e6">
                                </path>
                            </svg>
                        </div> <!--@click="rotateShip($event)"-->
                        <div class="ship2" @mousedown="dragStart($event)" data-length="4" data-dir="hor" ref="ship2" style="top: 163px; left: 82px; width: 165px; height: 40px;">
                            <svg t="1647484639562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2238" width="30" height="30" @click="rotateShip($event)">
                                <path d="M941.728 137.152C941.728 122.304 932.576 109.152 919.456 103.424 905.728 97.728 889.728 100.576 879.456 111.424L805.152 185.152C724.576 109.152 615.456 64 502.88 64 261.152 64 64 261.152 64 502.88 64 744.576 261.152 941.728 502.88 941.728 633.728 941.728 757.152 884 840.576 783.424 846.304 776 846.304 765.152 839.456 758.88L761.152 680C757.152 676.576 752 674.88 746.88 674.88 741.728 675.424 736.576 677.728 733.728 681.728 677.728 754.304 593.728 795.424 502.88 795.424 341.728 795.424 210.304 664 210.304 502.88 210.304 341.728 341.728 210.304 502.88 210.304 577.728 210.304 648.576 238.88 702.304 288.576L623.456 367.424C612.576 377.728 609.728 393.728 615.456 406.88 621.152 420.576 634.304 429.728 649.152 429.728L905.152 429.728C925.152 429.728 941.728 413.152 941.728 393.152L941.728 137.152Z" p-id="2239" fill="#e6e6e6">
                                </path>
                            </svg>
                        </div>
                        <div class="ship3" @mousedown="dragStart($event)" data-length="3" data-dir="por" ref="ship3" style="top: 245px; left: 0; width: 42px; height: 124px;">
                            <svg t="1647484639562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2238" width="30" height="30" @click="rotateShip($event)">
                                <path d="M941.728 137.152C941.728 122.304 932.576 109.152 919.456 103.424 905.728 97.728 889.728 100.576 879.456 111.424L805.152 185.152C724.576 109.152 615.456 64 502.88 64 261.152 64 64 261.152 64 502.88 64 744.576 261.152 941.728 502.88 941.728 633.728 941.728 757.152 884 840.576 783.424 846.304 776 846.304 765.152 839.456 758.88L761.152 680C757.152 676.576 752 674.88 746.88 674.88 741.728 675.424 736.576 677.728 733.728 681.728 677.728 754.304 593.728 795.424 502.88 795.424 341.728 795.424 210.304 664 210.304 502.88 210.304 341.728 341.728 210.304 502.88 210.304 577.728 210.304 648.576 238.88 702.304 288.576L623.456 367.424C612.576 377.728 609.728 393.728 615.456 406.88 621.152 420.576 634.304 429.728 649.152 429.728L905.152 429.728C925.152 429.728 941.728 413.152 941.728 393.152L941.728 137.152Z" p-id="2239" fill="#e6e6e6">
                                </path>
                            </svg>
                        </div>
                        <div class="ship4" @mousedown="dragStart($event)" data-length="2" data-dir="hor" ref="ship4" style="top: 81px; left: 205px; width: 83px; height: 40px;">
                            <svg t="1647484639562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2238" width="30" height="30" @click="rotateShip($event)">
                                <path d="M941.728 137.152C941.728 122.304 932.576 109.152 919.456 103.424 905.728 97.728 889.728 100.576 879.456 111.424L805.152 185.152C724.576 109.152 615.456 64 502.88 64 261.152 64 64 261.152 64 502.88 64 744.576 261.152 941.728 502.88 941.728 633.728 941.728 757.152 884 840.576 783.424 846.304 776 846.304 765.152 839.456 758.88L761.152 680C757.152 676.576 752 674.88 746.88 674.88 741.728 675.424 736.576 677.728 733.728 681.728 677.728 754.304 593.728 795.424 502.88 795.424 341.728 795.424 210.304 664 210.304 502.88 210.304 341.728 341.728 210.304 502.88 210.304 577.728 210.304 648.576 238.88 702.304 288.576L623.456 367.424C612.576 377.728 609.728 393.728 615.456 406.88 621.152 420.576 634.304 429.728 649.152 429.728L905.152 429.728C925.152 429.728 941.728 413.152 941.728 393.152L941.728 137.152Z" p-id="2239" fill="#e6e6e6">
                                </path>
                            </svg>
                        </div>
                        <div class="ship5" @mousedown="dragStart($event)" data-length="5" data-dir="por" ref="ship5" style="top: 286px; left: 123px; width: 42px; height: 206px;">
                            <svg t="1647484639562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2238" width="30" height="30" @click="rotateShip($event)">
                                <path d="M941.728 137.152C941.728 122.304 932.576 109.152 919.456 103.424 905.728 97.728 889.728 100.576 879.456 111.424L805.152 185.152C724.576 109.152 615.456 64 502.88 64 261.152 64 64 261.152 64 502.88 64 744.576 261.152 941.728 502.88 941.728 633.728 941.728 757.152 884 840.576 783.424 846.304 776 846.304 765.152 839.456 758.88L761.152 680C757.152 676.576 752 674.88 746.88 674.88 741.728 675.424 736.576 677.728 733.728 681.728 677.728 754.304 593.728 795.424 502.88 795.424 341.728 795.424 210.304 664 210.304 502.88 210.304 341.728 341.728 210.304 502.88 210.304 577.728 210.304 648.576 238.88 702.304 288.576L623.456 367.424C612.576 377.728 609.728 393.728 615.456 406.88 621.152 420.576 634.304 429.728 649.152 429.728L905.152 429.728C925.152 429.728 941.728 413.152 941.728 393.152L941.728 137.152Z" p-id="2239" fill="#e6e6e6">
                                </path>
                            </svg>
                        </div>

                        <div class="grid-title">
                            {{myReminder}}
                        </div>

                        <div class="battleship-grid my-grid">
                            <table ref="myGridTable">
                                <tr v-for="(i, index) in 10" :key="index">
                                    <td v-for="(j, index) in 10" :key="index">
                                        <div class="ship-cell" style="display: none;">

                                        </div>
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


                    <div class="opponent-grid-wrapper">
                        <div class="grid-title" :class="opponentTitleClass">
                            {{opponentReminder}}
                        </div>
                        <div class="battleship-grid opponent-grid">
                            <table ref="opponentGrid">
                                <tr v-for="(i, index) in 10" :key="index">
                                    <td v-for="(j, index) in 10" :key="index" @click="playerAction($event)" :data-row="i" :data-col="j">
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
        <div class="game-over-wrapper" :class="gameOverClass">
            <div class="game-over-title">
                <h1>GAME OVER</h1>
            </div>
            <div class="game-over-info">
                <p> {{gameOverContent}}</p>
            </div>
            <div class="play-again-btn-wrapper">
                <button @click="playAgainMethod">PLAY AGAIN &nbsp;<i class="el-icon-right"></i></button>
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
            gridConfirmNum: 0,
            curTurn: "", // userId
            opponentReminder: "Your opponent's boats",
            opponentTitleClass: [],
            gameOverContent: "",
            gameOverClass: [],
            myReminder: "Your boats",
            readyNum: 0,
            aboutBattleship: false,
            //notYourTurnAlert: [],
        }
    },

    mounted() {
        this.connectWebSocket();
    },

    beforeDestroy() {
        //leave
        let data = {
            status: "",
            msg: "",
            msgType: "leave",
            data: {
                roomCode: this.roomCode,
                bPlayer: this.bPlayer,
            },
        };
        this.websocket.send(JSON.stringify(data));
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
                    this.myReminder = "Please select boats' positions"
                    console.log("ready")
                    let data = {
                            status: "",
                            msg: "",
                            msgType: "gameReady",
                            data: {
                                roomCode: this.roomCode,
                        },
                    };
                    this.websocket.send(JSON.stringify(data));
                }
            }
        },

        gridConfirmNum: {
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
                    this.opponentReminder = "Your opponent's boats";
                }
            }
        },

    },


    methods: {
        // closeNotYourTurnAlert() {
        //     this.notYourTurnAlert = [];
        // },
        rotateShip(e) {
            if (this.readyNum != 2) return;
            let ship = e.currentTarget.parentElement;
            let dir = ship.getAttribute("data-dir");
            dir = dir == "hor" ? "por" : "hor";
            ship.setAttribute("data-dir", dir);
            let width = ship.style.width;
            let height = ship.style.height;
            ship.style.width = height;
            ship.style.height = width;
        },

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
            if (this.readyNum != 2) return;
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
                            ship.style.top = (i - 1) * 41 + 81 + "px";
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
                    // if (this.bPlayer.userId == receivedData.data.userId) {

                    // }
                    if (receivedData.data.userId == this.opponent.userId) {
                        this.opponentReminder = "Your opponent is ready!";
                    }
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
                    this.opponentReminder = "Your opponent's boats"
                }

                if (receivedData.msgType == "initializeGrid") {
                    this.gridConfirmNum++;
                    console.log("init complete")
                    if (receivedData.data == this.bPlayer.userId) {
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
                        console.log(list)
                        for (let index = 0; index < list.length; index++) {
                            console.log(index)
                            let ship = list[index];
                            console.log(ship)
                            let top = ship.style.top;
                            let left = ship.style.left;
                            let table  = this.$refs.myGridTable;
                            top = top.slice(0, -2);
                            left = left.slice(0, -2);
                            top = parseInt(top);
                            left = parseInt(left);
                            let len = ship.getAttribute("data-length");
                            let dir = ship.getAttribute("data-dir");
                            let col = left / 41;
                            let row = (top - 81) / 41;
                            
                            //console.log(top, left)
                            // let obj = {
                            //     row: (top - 80) / 41,
                            //     col: left / 41,
                            //     dir: ship.getAttribute("data-dir"),
                            //     len: ship.getAttribute("data-length"),
                            // }
                            ship.style.display = "none";
                            parseInt
                            if (dir == "hor") {
                                for (let i = col; i < parseInt(col) + parseInt(len); i++) {
                                    // console.log("t"+ table.children[row])
                                    // console.log(row)
                                    table.children[row].children[i].children[0].style.display = "block";
                                    
                                
                                    //table.children[row].children[i].children[2].style.display = "block";
                                }
                            } else {
                                for (let i = row; i < parseInt(row) + parseInt(len); i++) {
                                    table.children[i].children[col].children[0].style.display = "block";
                                    //table.children[i].children[col].children[2].style.display = "block";
                                }
                            }
                        }
                    }

                }

                if (receivedData.msgType == "playerAction") {
                    let targetPlayerId = receivedData.data.targetPlayerId;
                    let res = receivedData.data.res;
                    this.curTurn = receivedData.data.curTurn;
                    if (this.curTurn == this.bPlayer.userId) {
                        this.opponentReminder = "Attack your opponent!"
                        this.opponentTitleClass = ["attack-title"]
                    }
                    else {
                        this.opponentReminder = "Your opponent's boats";
                        this.opponentTitleClass = [];
                    }

                    if (targetPlayerId == this.opponent.userId) {
                        let table  = this.$refs.opponentGrid;
                        let row = receivedData.data.row;
                        let col = receivedData.data.col;
                        let cell  = table.children[row].children[col];
                        

                        if (res == "missed") {
                            cell.children[0].style.display = "block";
                        } else if (res == "hit") {
                            cell.children[1].style.display = "block";
                        } else {
                            let dir = receivedData.data.dir;
                            let len = receivedData.data.len;
                            let headRow = receivedData.data.headRow;
                            let headCol = receivedData.data.headCol;
                            
                            if (dir == "hor") {
                                for (let i = headCol; i < headCol + len; i++) {
                                    table.children[headRow].children[i].children[1].style.display = "none"
                                    table.children[headRow].children[i].children[2].style.display = "block";
                                }
                            } else {
                                for (let i = headRow; i < headRow + len; i++) {
                                    table.children[i].children[headCol].children[1].style.display = "none"
                                    table.children[i].children[headCol].children[2].style.display = "block";
                                }
                            }
                            
                        }
                    } else {
                        let row = receivedData.data.row;
                        let col = receivedData.data.col;
                        let myGrid = this.$refs.myGridTable;
                        let myCell = myGrid.children[row].children[col];
                        if (res == "missed") {
                            myCell.children[1].style.display = "block";
                        } else if (res == "hit") {
                            myCell.children[0].style.display = "none";
                            myCell.children[2].style.display = "block";
                        } else {
                            let dir = receivedData.data.dir;
                            let len = receivedData.data.len;
                            let headRow = receivedData.data.headRow;
                            let headCol = receivedData.data.headCol;
                            
                            if (dir == "hor") {
                                for (let i = headCol; i < headCol + len; i++) {
                                    myGrid.children[headRow].children[i].children[0].style.display = "none"
                                    myGrid.children[headRow].children[i].children[2].style.display = "none"
                                    myGrid.children[headRow].children[i].children[3].style.display = "block";
                                }
                            } else {
                                for (let i = headRow; i < headRow + len; i++) {
                                    myGrid.children[i].children[headCol].children[0].style.display = "none"
                                    myGrid.children[i].children[headCol].children[2].style.display = "none"
                                    myGrid.children[i].children[headCol].children[3].style.display = "block";
                                }
                            }
                        }
                    }

                    if (receivedData.data.gameOver != undefined) {
                        let winnerId = receivedData.data.gameOver;
                        if (winnerId == this.bPlayer.userId) {
                            this.gameOverContent = this.bPlayer.username + " wins the game!"
                        } else{
                            this.gameOverContent = this.opponent.username + " wins the game!"
                        }
                        this.gameOverClass = ["active"];
                        this.readyNum = 0;
                        this.gridConfirmNum = 0;
                    }

                }

                if (receivedData.msgType == "gameStart") {
                    this.curTurn = receivedData.data;
                    if (this.curTurn == this.bPlayer.userId) {
                        this.opponentReminder = "Attack your opponent!";
                        this.opponentTitleClass = ["attack-title"];
                    }
                    else {
                        this.opponentReminder = "Your opponent's boats"
                        this.opponentTitleClass = [];
                    }
                }


                if (receivedData.msgType == "playAgain") {
                    this.readyNum++;                    
                    if (receivedData.data == this.bPlayer.userId) {
                        // window.alert("Your opponent has left the game!")
                        this.resetBoard();
                        // this.opponentReminder = "Your opponent's boats";
                        // this.opponentTitleClass = [];
                        // this.curTurn = "";
                        // this.gameOverClass = []
                        // let ship1 = this.$refs.ship1;
                        // let ship2 = this.$refs.ship2;
                        // let ship3 = this.$refs.ship3;
                        // let ship4 = this.$refs.ship4;
                        // let ship5 = this.$refs.ship5;
                        
                        // ship1.style.display = "block";
                        // ship2.style.display = "block";
                        // ship3.style.display = "block";
                        // ship4.style.display = "block";
                        // ship5.style.display = "block";

                        // let myGrid = this.$refs.myGridTable; 
                        // let opponentGrid  = this.$refs.opponentGrid;
                        // for (let row = 0; row < 10; row++) {
                        //     for (let col = 0; col < 10; col++) {
                        //         let myCell = myGrid.children[row].children[col];
                        //         let opponentCell = opponentGrid.children[row].children[col];
                        //         myCell.children[0].style.display = "none";
                        //         myCell.children[1].style.display = "none";
                        //         myCell.children[2].style.display = "none";
                        //         myCell.children[3].style.display = "none";
                        //         opponentCell.children[0].style.display = "none";
                        //         opponentCell.children[1].style.display = "none";
                        //         opponentCell.children[2].style.display = "none";
                        //     }
                        // }
                    
                    }
                }

                if (receivedData.msgType == "leave") {
                    this.opponent = null;
                    this.opponentReminder = "Your opponent left the game"
                    this.readyNum = 0;
                    this.gridConfirmNum = 0;
                    console.log("leave the game")
                    this.resetBoard();
                }




                console.log(event)
            };
            this.websocket.onclose = function (e) {
                console.log('websocket 断开：' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                console.log(e)
            };

        },

        resetBoard() {
                this.opponentReminder = "Your opponent's boats";
                        this.opponentTitleClass = [];
                        this.curTurn = "";
                        this.gameOverClass = []
                        let ship1 = this.$refs.ship1;
                        let ship2 = this.$refs.ship2;
                        let ship3 = this.$refs.ship3;
                        let ship4 = this.$refs.ship4;
                        let ship5 = this.$refs.ship5;
                        
                        ship1.style.display = "block";
                        ship2.style.display = "block";
                        ship3.style.display = "block";
                        ship4.style.display = "block";
                        ship5.style.display = "block";

                        let myGrid = this.$refs.myGridTable; 
                        let opponentGrid  = this.$refs.opponentGrid;
                        for (let row = 0; row < 10; row++) {
                            for (let col = 0; col < 10; col++) {
                                let myCell = myGrid.children[row].children[col];
                                let opponentCell = opponentGrid.children[row].children[col];
                                myCell.children[0].style.display = "none";
                                myCell.children[1].style.display = "none";
                                myCell.children[2].style.display = "none";
                                myCell.children[3].style.display = "none";
                                opponentCell.children[0].style.display = "none";
                                opponentCell.children[1].style.display = "none";
                                opponentCell.children[2].style.display = "none";
                            }
                        }
                    
        },


        initializeGrid() {
            if (this.readyNum != 2) return;
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
            this.myReminder = "Your boats"
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
            } else {
                alert("Please wait for you opponent")
            }
        },

        playerAction(e) {
            if (this.curTurn != this.bPlayer.userId){
                alert("It's not yout turn!")
                //this.notYourTurnAlert = ["active"];
                return;
            } 
            if (e.target.children[0].style.display == "block" || e.target.children[1].style.display  == "block" || e.target.children[2].style.display  == "block") return;
            let row = e.target.getAttribute("data-row");
            let col = e.target.getAttribute("data-col");
            let data = {
                status: "",
                msg: "",
                msgType: "playerAction",
                data: {
                    row: row,
                    col: col,
                    roomCode: this.roomCode,
                    targetPlayerId: this.opponent.userId,
                },
            };
            this.websocket.send(JSON.stringify(data));
        },

        playAgainMethod() {
            if (this.opponent != null) {
                let data = {
                    status: "",
                    msg: "",
                    msgType: "playAgain",
                    data: {
                        bPlayer: this.bPlayer,
                        roomCode: this.roomCode,
                    },
                };
                this.websocket.send(JSON.stringify(data));
            }
        },

        leaveMethod() {
            let data = {
                status: "",
                msg: "",
                msgType: "leave",
                data: {
                    roomCode: this.roomCode,
                    bPlayer: this.bPlayer,
                },
            };
            this.websocket.send(JSON.stringify(data));
            this.gameMenuClass = ["active"];
            this.gameAreaClass = [""];   
            this.roomCode = "";
            this.opponent = null;
            this.readyNum = 0;
            this.gridConfirmNum = 0;
            this.inputRoomCode = "";
            this.curTurn = "";
            this.resetBoard();
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
    /* background-color: rgba(106, 170, 255, 0.897); */
    display: none;
    box-shadow: 0 0 10px rgb(155, 155, 155);
}


.battleship-header {
  width: 1400px;
  height: 100px;
  /* background-color: black; */
  display: flex;
  justify-content: center;
  background-color:rgb(243, 245, 246);
}

.battleship-header .player-wrapper {
    width: 699px;
    height: 100px;
    display: flex;
    background-color:rgb(243, 245, 246);
}

.player-info {
    width: 400px;
    /* background-color: red; */
}

.avatar-wrapper {
    width: 100px;
    /* background-color: blanchedalmond; */
}


.info-wrapper {
    padding-left: 10px;
    width: 290px;

}
.player-info .info-wrapper .username {
    width: 290px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    line-height: 40px;
    font-size: 22px;
    font-weight: bold;
    margin-top: 20px;
}

.player-wrapper .points {
    width: 100px;
    line-height: 100px;
    margin-left: 199px;
}

.rightside {
    float: right;
}


.divider {
    width: 2px;
    height: 80px;
    margin-top: 10px;
    background-color: rgb(155, 155, 155);
}

.battleship-game-area {
    display: flex;
    height: 620px;
    width: 1400px;
    background-color: white;
}


.battleship-game-info-wrapper {
    width: 200px;
    height: 620px;
    /* background-color: burlywood; */
}

.battleship-game-info-wrapper button {
    width: 150px;
    height: 40px;
    margin-left: 25px;
    display: block;
    color: white;
    background-color: rgb(40, 44, 59);
    outline: none;
    border: none;
    border-radius: 30px;
    margin-top: 10px;
    font-size: 16px;
    transition: all 0.4s;
}


.battleship-game-info-wrapper button:hover {
    cursor: pointer;
}

.battleship-game-info-wrapper button:first-child {
    margin-top: 72px;
}

.roominfo-btn-b {
  width: 150px !important;
  height: 40px;
  margin-left: 25px !important;
  /* margin-top: 10px !important; */
  /* border-radius: 17.5px !important; */
  /* line-height: 0px !important; */
  font-size: 16px !important;
}

.readyBtn-b:hover {
     cursor: pointer;
     background-color: rgb(34, 202, 104);
}

.leaveBtn-b:hover {
    background-color: rgb(202, 19, 63);
}

.confirmBtn-b:hover {
    background-color: rgb(41, 75, 242);
}

.grid-wrapper {
    width: 1000px;
    height: 620px;
    /* background-color: antiquewhite; */
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
    width: 411px;
    height: 80px;
    background-color:rgb(243, 245, 246);
    font-size: 24px;
    line-height: 80px;
    text-align: center;
    font-weight: 600;
}

.attack-title {
    background-color: rgb(202, 19, 63);
    color: white;
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

.my-grid table tr td {
    transition: all .5s;
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
    background-color: rgb(76, 171, 162);
    position: absolute;
    /* border: 1px red solid; */
    z-index: 99;
    transition: al .3s;
}

.ship1 svg {
    margin: 5px;
}

.ship1 svg:hover {
    cursor: pointer;
}

.ship2 {
    border-radius: 15px;
    width: 165px;
    height: 40px; 
    position: absolute;
    background-color: rgb(235, 113, 115);

}
.ship2 svg {
    margin: 5px;
}

.ship2 svg:hover {
    cursor: pointer;
}


.ship3 {
    border-radius: 15px;
    width: 42px;
    height: 124px;
    position: absolute;
    background-color: rgb(58, 74, 171);
   
}
.ship3 svg {
    margin: 5px;
}

.ship3 svg:hover {
    cursor: pointer;
}


.ship4 {
    border-radius: 15px;
    width: 83px;
    height: 42px;
    position: absolute;
    background-color: rgb(211, 124, 170);
    
}

.ship4 svg {
    margin: 5px;
}

.ship4 svg:hover {
    cursor: pointer;
}

.ship5 {
    border-radius: 15px;
    width: 42px;
    height: 206px;
    position: absolute;
    background-color: rgba(2, 2, 2, 0.6);
    
}

.ship5 svg {
    margin: 5px;
}

.ship5 svg:hover {
    cursor: pointer;
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

.ship-cell {
    background-color: rgb(27, 94, 133);
    width: 40px;
    height: 40px;
    border-radius: 10px;
    transition: all 2s;
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

.game-over-wrapper {
  width: 450px;
  height: 300px;
  background-color: #ff8138;
  color: white;
  border-radius: 20px;
  display: none;
  margin-left: 475px;
  transform: translateY(-400px);
  
}

.game-over-wrapper .game-over-title {
  width: 450px;
  height: 100px;
  text-align: center;
  /* background-color: #d4d3cf; */
  line-height: 100px;
}

.game-over-wrapper .game-over-info {
  width: 450px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 26px;
}

.game-over-wrapper .play-again-btn-wrapper {
   margin: 0 auto;
    width: 160px;
    /* background-color: antiquewhite; */
    line-height: 45px;
    height: 60px;
}

.game-over-wrapper .play-again-btn-wrapper button {
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

.game-over-wrapper .play-again-btn-wrapper button:hover {
  cursor: pointer;
  transform: scale(1.15);
}


</style>