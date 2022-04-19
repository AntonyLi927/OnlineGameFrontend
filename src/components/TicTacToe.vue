<template>
  <div class="tictactoe-container clearfix">



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
    <!-- <button @click="startGame">start</button> -->
    <div class="game-menu" :class="gameMenuClass">
      <div class="game-title">
        <h1>Tic Tac Toe</h1>
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
    


    <div class="tictactoe-game-container" :class="gameContainerClass">
      <div class="tictactoe-header">
        <div class="header-content">
          <div class="player-left-wrapper">
            <div class="player-info clearfix">
              <div class="avatar-wrapper" v-if="ticPlayer != null && ticPlayer.type == 'circle'">
                <svg t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="80" height="80">
                  <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                  </path>
                </svg>
              </div>
              <div class="avatar-wrapper" v-else-if="ticPlayer != null">
                <svg t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="80" height="80">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                </svg>
              </div>


              <div class="info-wrapper">
                <div class="username" v-if="ticPlayer != null">{{ticPlayer.username}}</div>
                <div class="userId" v-if="ticPlayer != null"><p>#{{ticPlayer.userId}}</p></div>
              </div>
            </div>
            <div class="points" v-if="ticPlayer != null">
              <h1>{{ticPlayer.points}}</h1>
            </div>
          </div>
          <div class="dividing-line"></div>
          <div class="player-right-wrapper">
            <div class="points">
              <h1 v-if="opponent != null">{{opponent.points}}</h1>
            </div>
            <div class="player-info">
              <div class="info-wrapper">
                <div class="username right-placement" v-if="opponent != null">{{opponent.username}}</div>
                <div class="userId right-placement" v-if="opponent != null"><p>#{{opponent.userId}}</p></div>

              </div>
              <div class="avatar-wrapper" v-if="opponent != null && opponent.type == 'circle'">
                <svg t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="80" height="80">
                  <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                  </path>
                </svg>
              </div>
              <div class="avatar-wrapper" v-else-if="opponent != null">
                <svg t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="80" height="80">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tictactoe-body clearfix">
        <div class="game-info-wrapper">
          <div class="info-screen">{{gameInfo}}</div>
          <div class="btns-wrapper">
            <button @click="getReady" class="readyBtn" ref="readyBtn">READY</button><br>
            <button class="leaveBtn" @click="leaveMethod">LEAVE</button>
            <el-popover
              placement="bottom"
              width="30px"
              trigger="hover"
              :content="'room code: ' + roomCode">
              <el-button slot="reference" class="roominfo-btn">GAME INFO</el-button>
            </el-popover>
          </div>
        </div>

        <div class="grid-wrapper">
          
          <table class="game-grid" ref="gameGrid">
              <tr>
                <td data-row="0" data-col="0" data-occupy="false" @click="playerAction($event)">
                  <!-- X -->
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <!-- O -->
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
                <td data-row="0" data-col="1" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
                <td data-row="0" data-col="2" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
              </tr>
              <tr>
                <td data-row="1" data-col="0" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
                <td data-row="1" data-col="1" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
                <td data-row="1" data-col="2" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
              </tr>
              <tr>
                <td data-row="2" data-col="0" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
                <td data-row="2" data-col="1" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
                <td data-row="2" data-col="2" data-occupy="false" @click="playerAction($event)">
                  <svg style="display: none;" t="1646371164360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2260" width="160" height="160">
                    <path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="2261" fill="#112239">
                    </path>
                  </svg>
                  <svg style="display: none;" t="1646371151296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="160" height="160">
                    <path d="M881.387 297.813c38.08 65.387 57.28 136.747 57.28 214.187s-19.094 148.8-57.28 214.187c-38.187 65.28-89.92 117.12-155.2 155.2S589.44 938.667 512 938.667s-148.8-19.094-214.187-57.28c-65.28-38.08-117.013-89.814-155.306-155.307C104.427 660.8 85.333 589.44 85.333 512c0-77.333 19.094-148.693 57.28-214.187 38.08-65.28 89.814-117.013 155.307-155.306C363.2 104.533 434.56 85.333 512 85.333c77.333 0 148.693 19.094 214.187 57.28 65.28 38.187 117.013 89.92 155.2 155.2z m-217.707-47.36C617.387 223.467 566.827 209.92 512 209.92s-105.387 13.547-151.68 40.533-82.987 63.68-109.973 109.974c-26.987 46.293-40.534 96.853-40.534 151.68s13.547 105.386 40.534 151.68c26.986 46.293 63.68 82.986 109.973 109.973 46.293 26.987 96.853 40.533 151.68 40.533s105.387-13.546 151.68-40.533c46.293-26.987 82.987-63.68 109.973-109.973 26.987-46.294 40.534-96.854 40.534-151.68s-13.547-105.387-40.534-151.68c-27.093-46.294-63.786-82.987-109.973-109.974z" p-id="1951" fill="#d4d3cf">
                    </path>
                  </svg>
                </td>
              </tr>
          </table>
          <div class="mute" :class="muteClass">

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
        
        <div class="chatbox-wrapper">

          <div class="chatbox" ref="chatBox">
            <!-- <div class="chat-row">
              <div class="chat-row-msg">Antony:&nbsp;hellsfsdfffffffffffffffffffffsdffffffffffo</div>
            </div> -->
            
            <!-- <div class="ready-msg">Antony is ready</div> -->

            
            <!-- <div class="leave-msg">Antony has left the room</div> -->
           
            
            <!-- <div class="play-again-msg">Antony wants to play again</div> -->
            
          </div>
          
          <div class="input-box-wrapeer">
            <input type="text" placeholder="Type your message here" v-model="chatMessage">
            <button @click="sendMsg">&nbsp;</button>
          </div>

        </div>
      </div>
      <div class="tictactoe-footer">

      </div>
    </div>
    

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  
  data() {
    return {
      curTurn: "circle", // cross or circle
      websocket: null,
      gameMenuClass: ["active"],
      gameContainerClass: [],
      roomCode: "",
      ticPlayer: null,
      opponent: null,
      inputRoomCode: "",
      enterRoomCodeDialog: false,
      gameOverClass: [],
      muteClass: [],
      readyNum: 0,
      lastRoundFirstType: "",
      gameInfo: "",
      chatMessage: "",
      gameOverContent: "",
    }
  },

  mounted() {
    this.connectWebSocket();
    this.muteClass = ["active"];
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
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              let tableRow = this.$refs.gameGrid.children[i];
              let tableCell = tableRow.children[j];
              tableCell.children[0].style.display = "none";
              tableCell.children[1].style.display = "none";
              tableCell.setAttribute("data-occupy", "false");
            }
          }
          console.log("Start")
          let data = {
            status: "",
            msg: "",
            msgType: "gameStart",
            data: {
              lastRoundFirstType: this.lastRoundFirstType,
              roomCode: this.roomCode,
            },
          };
          this.websocket.send(JSON.stringify(data));
        }
      }
    }
  },

  methods: {
    connectWebSocket() {
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.websocket = new WebSocket("ws://localhost:8081/tictactoeServer");
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
          this.ticPlayer = receivedData.data.ticPlayer;
          this.roomCode = receivedData.data.roomCode;
          console.log(this.roomCode)
          this.gameMenuClass = [];
          this.gameContainerClass = ["active"]
        }

        if (receivedData.msgType == "joinExisting") {
          this.roomCode = receivedData.data.roomCode;
          let playerList = receivedData.data.players;
          for (let i = 0; i < playerList.length; i++) {
            if (playerList[i].userId == this.user.userId) {
              this.ticPlayer = playerList[i];
            } else { 
              this.opponent = playerList[i]; 
            }
          }
          console.log(this.ticPlayer)
          console.log(this.opponent)
          this.enterRoomCodeDialog = false;
          this.gameMenuClass = [""];
          this.gameContainerClass = ["active"]
        }

        if (receivedData.msgType == "playerActions") {
          console.log("playerActions")
          let row = receivedData.data.row;
          let col = receivedData.data.col;
          let tableRow = this.$refs.gameGrid.children[row];
          let tableCell = tableRow.children[col];
          //tableCell.innerText = receivedData.data.type;
          tableCell.setAttribute("data-occupy", "true");
          if (receivedData.data.type == "circle") {
            tableCell.children[1].style.display = "block";
            this.curTurn = "cross";
          } else {
            tableCell.children[0].style.display = "block"
            this.curTurn = "circle";
          }
          this.gameInfo = this.curTurn + "'s turn"

          if (receivedData.data.gameOver != undefined) {
            if (receivedData.data.gameOver == "drew") this.gameOverContent = "DREW";
            else this.gameOverContent = receivedData.data.gameOver + " is the winner"
            this.gameInfo = "GAME OVER!"
            console.log(receivedData.data.gameOver + " is the winner");
            this.muteClass = ["active"];
            this.gameOverClass = ["active"];
            this.readyNum = 0;
          }

        }

        if (receivedData.msgType == "getReady") {
          if (receivedData.data.userId == this.ticPlayer.userId) {
            let chatRow = document.createElement("div");
            chatRow.classList = ["ready-msg"];
            chatRow.innerText =  "You are ready."
            this.$refs.chatBox.appendChild(chatRow);
            this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
          } else if (receivedData.data.userId == this.opponent.userId) {
            let chatRow = document.createElement("div");
            chatRow.classList = ["ready-msg"];
            chatRow.innerText =  "Your opponent is ready."
            this.$refs.chatBox.appendChild(chatRow);
            this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
          }
          console.log(receivedData.data.username + " is ready")
          this.readyNum++;
        }

        if (receivedData.msgType == "gameStart") {
          this.lastRoundFirstType = receivedData.data;
          this.curTurn = receivedData.data;
          this.gameInfo = this.curTurn + "'s turn"
          this.muteClass = [""];
        }

        if (receivedData.msgType == "playAgain") {
          if (receivedData.data.userId == this.ticPlayer.userId) {
            let chatRow = document.createElement("div");
            chatRow.classList = ["play-again-msg"];
            chatRow.innerText =  "You want to play again."
            this.$refs.chatBox.appendChild(chatRow);
            this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
          } else if (receivedData.data.userId == this.opponent.userId) {
            let chatRow = document.createElement("div");
            chatRow.classList = ["play-again-msg"];
            chatRow.innerText =  "Your opponent wants to play again."
            this.$refs.chatBox.appendChild(chatRow);
            this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
          }
          console.log(receivedData.data.username + " want to play again")
          this.readyNum++;
        }

        if (receivedData.msgType == "chatMsg") {
          let chatRow = document.createElement("div");
          chatRow.classList = ["chat-row"];

          let chatRowMsg = document.createElement("div");
          chatRowMsg.classList = ["chat-row-msg"];
          chatRowMsg.innerText = receivedData.data.ticPlayer.username + ": " + receivedData.data.chatMessage;
          chatRow.appendChild(chatRowMsg);
          //console.log(this.$refs.chatBox)
          this.$refs.chatBox.appendChild(chatRow);
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
        }
        if (receivedData.msgType == "leave") {
            this.opponent = null;
            this.readyNum = 0;
            this.curTurn = "";
            this.gameInfo = "";
            this.$refs.chatBox.innerHTML = ""; 
            console.log("leave the game")
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                let tableRow = this.$refs.gameGrid.children[i];
                let tableCell = tableRow.children[j];
                tableCell.children[0].style.display = "none";
                tableCell.children[1].style.display = "none";
                tableCell.setAttribute("data-occupy", "false");
              }
          }
        }

        console.log(event)

      };

      this.websocket.onclose = function () {
        console.log("close success!");
      };
    },

    startGame() {
      let data = {
        status: "",
        msg: "",
        msgType: "gameStart",
        data: {
          roomCode: this.roomCode,
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

    enterRoomCode() {
      this.enterRoomCodeDialog = true;
    },

    joinExisting() {
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

    playerAction(e) {
      console.log(this.ticPlayer.type)
      let row = e.target.getAttribute("data-row");
      let col = e.target.getAttribute("data-col");
      let occupy = e.target.getAttribute("data-occupy");
      console.log(row, col)
      if (this.curTurn == this.ticPlayer.type && occupy == "false") {
        let data = {
          status: "",
          msg: "",
          msgType: "playerActions",
          data: {
            row: row,
            col: col,
            type: this.curTurn,
            roomCode: this.roomCode,
          },
        };
        this.websocket.send(JSON.stringify(data));
      }
    },

    getReady() {
      if (this.opponent != null) {
        let data = {
          status: "",
          msg: "",
          msgType: "getReady",
          data: {
            ticPlayer: this.ticPlayer,
            roomCode: this.roomCode,
          },
        };
        this.websocket.send(JSON.stringify(data));
        this.$refs.readyBtn.style.width = "35px";
        this.$refs.readyBtn.style.marginLeft = "165px";
        this.$refs.readyBtn.innerHTML = "<i class='el-icon-check'></i>";
      }
    },

    playAgainMethod() {
      this.gameOverClass = [];
      let data = {
          status: "",
          msg: "",
          msgType: "playAgain",
          data: {
            ticPlayer: this.ticPlayer,
            roomCode: this.roomCode,
          },
        };
        this.websocket.send(JSON.stringify(data));
    },

    sendMsg() {
      if (this.chatMessage == "") return;
      let data = {
        status: "",
        msg: "",
        msgType: "chatMsg",
        data: {
          chatMessage: this.chatMessage,
          roomCode: this.roomCode,
          ticPlayer: this.ticPlayer,
        },
      };
      this.websocket.send(JSON.stringify(data));
      this.chatMessage = "";  
    },

    leaveMethod() {
      let data = {
          status: "",
          msg: "",
          msgType: "leave",
          data: {
              roomCode: this.roomCode,
              ticPlayer: this.ticPlayer,
          },
      };
      this.websocket.send(JSON.stringify(data));
      
      this.gameMenuClass = ["active"];
      this.gameContainerClass = [""];   
      this.roomCode = "";
      this.opponent = null;
      this.readyNum = 0;
      this.inputRoomCode = "";
      this.curTurn = "";
      this.gameInfo = "";
      for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              let tableRow = this.$refs.gameGrid.children[i];
              let tableCell = tableRow.children[j];
              tableCell.children[0].style.display = "none";
              tableCell.children[1].style.display = "none";
              tableCell.setAttribute("data-occupy", "false");
            }
          }
      this.$refs.chatBox.innerHTML = "";    
    },
    


  }

}
</script>

<style>

.readyBtn {
  width: 330px;
  margin-left: 10px;
  height: 35px;
  border: none;
  background-color: rgb(29, 181, 92);
  color: white;
  font-size: 20px;
  border-radius: 17.5px;
  transition: all 0.4s;
}

.readyBtn:hover {
  cursor: pointer;
  background-color: rgb(34, 202, 104);
  /* width: 35px; */
}

.leaveBtn {
  width: 330px;
  margin-left: 10px;
  margin-top: 10px;
  height: 35px;
  border: none;
  background-color: rgb(217, 60, 71);
  color: white;
  font-size: 20px;
  border-radius: 17.5px;
  transition: all 0.4s;
}

.leaveBtn:hover {
  cursor: pointer;
  background-color: rgb(255, 68, 81);
  /* width: 35px; */
}

.roominfo-btn {
  height: 35px;
  width: 330px !important;
  margin-left: 10px !important;
  margin-top: 10px !important;
  border-radius: 17.5px !important;
  line-height: 0px !important;
  font-size: 20px !important;
}

.room-code-input {
  width: 400px;
  height: 50px;
  font-size: 34px;
  text-align: center;
}

.tictactoe-container {
  /* background-color: antiquewhite; */
    margin: 0 auto;
    width: 1400px;
    height: 720px;
    
}

.active {
  display: block !important;
}

.game-menu {
  display: none;;
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

.tictactoe-game-container {
  display: none;
  
}

.tictactoe-header {
  
  width: 1400px;
  height: 140px;
  /* background-color: black; */
  display: flex;
  justify-content: center;
}

.tictactoe-header .header-content {
  box-shadow: 0 0 10px rgb(155, 155, 155);
  width: 680px;
  height: 140px;
  background-color: rgb(255, 255, 255);
  display: flex;
  
}

.tictactoe-header .header-content .player-left-wrapper {
  height: 140px;
  width: 340px;
  display: flex;
}

.dividing-line {
  width: 1px;
  background-color: rgb(209, 209, 209);
  height: 80px;
  transform: translateY(30px);
}

 .player-info {
  width: 220px;
  /* background-color: red; */
  display: flex;
}

.player-info .avatar-wrapper {
  /* margin-top: 30px; */
  width: 100px;
  /* height: 80px; */
  /* background-color: aliceblue; */
}

.player-info .avatar-wrapper svg {
  margin-top: 30px;
}



.player-info .info-wrapper {
  width: 120px;
}



.player-info .info-wrapper .username {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 35px;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  font-weight: bold;
}

.player-info .info-wrapper .userId {
  height: 30px;
  line-height: 30px;
  color: rgb(177, 177, 177);
  /* background-color: #d7da58; */
}

.right-placement {
  text-align: right;
  float: right;
}

.points {
  font-size: 22px;
  text-align: center;
  line-height: 140px;
  width: 119.5px;
  /* background-color: wheat; */
}

.tictactoe-header .header-content .player-right-wrapper {
  height: 140px;
  width: 340px;
  display: flex;
}

.tictactoe-body {
  box-shadow: 0 0 10px rgb(155, 155, 155);
  width: 1400px;
  height: 580px;
  /* background-color: blueviolet; */
  display: flex;
  background-color: rgb(94, 134, 134);
}

.tictactoe-body .game-info-wrapper {
  border-radius: 20px;
  margin-top: 115px;
  margin-left: 10px;
  height: 350px;
  width: 350px;
  background-color: #f8f4e8;
}

.tictactoe-body .game-info-wrapper .info-screen {
  border-radius: 20px;
  width: 330px;
  margin-left: 10px;
  height: 200px;
  margin-top: 10px;
  background-color: black;
  color: white;
  line-height: 200px;
  font-size: 32px;
  text-align: center;
}

.tictactoe-body .game-info-wrapper .btns-wrapper {
  margin-top: 10px;
  height: 130px;
  /* background-color: red; */
}



.tictactoe-body .grid-wrapper {
  margin-left: 50px;
  width: 580px;
  height: 580px;
  display: block;
  /* background-color: red; */
}

.tictactoe-body .grid-wrapper .mute {
  transform: translateY(-580px);
  background-color: transparent;
  width: 580px;
  height: 580px;
  display: none;
}
.tictactoe-body .grid-wrapper .game-over-wrapper {
  margin-left: 65px;
  width: 450px;
  height: 300px;
  transform: translateY(-1020px);
  background-color: #ff8138;
  color: white;
  border-radius: 20px;
  display: none;
}

.tictactoe-body .grid-wrapper .game-over-wrapper .game-over-title {
  width: 450px;
  height: 100px;
  text-align: center;
  /* background-color: #d4d3cf; */
  line-height: 100px;
}
.tictactoe-body .grid-wrapper .game-over-wrapper .game-over-info {
  width: 450px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 26px;
}

.tictactoe-body .grid-wrapper .game-over-wrapper .play-again-btn-wrapper {
   margin: 0 auto;
    width: 160px;
    /* background-color: antiquewhite; */
    line-height: 45px;
    height: 60px;
}

.tictactoe-body .grid-wrapper .game-over-wrapper .play-again-btn-wrapper button {
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

.tictactoe-body .grid-wrapper .game-over-wrapper .play-again-btn-wrapper button:hover {
  cursor: pointer;
  transform: scale(1.15);
}

.tictactoe-body .grid-wrapper .game-grid {
  width: 580px;
  height: 580px;
  border: none;
  /* border: 10px solid black; */
  border-collapse: collapse;
}

.tictactoe-body .grid-wrapper .game-grid td {
  width: 160px;
  height: 160px;
  padding: 10px;
  border: 10px solid rgba(44, 44, 44, 0.2);
}

.tictactoe-body .grid-wrapper .game-grid td:hover {
  background-clip: content-box;
  cursor: pointer;
  /* background-color: #d4d3cf; #112239 */
  background-color: rgba(44, 44, 44, 0.2);
}

.tictactoe-body .grid-wrapper .game-grid tr:first-child td {
  border-top: 10px solid transparent;
}

.tictactoe-body .grid-wrapper .game-grid tr:last-child td {
  border-bottom: 10px solid transparent;
}

.tictactoe-body .grid-wrapper .game-grid tr td:first-child {
  border-left: 10px solid transparent;
}

.tictactoe-body .grid-wrapper .game-grid tr td:last-child {
  border-right: 10px solid transparent;
}

/* 1400 - 600 - 510 - 300 - 30  */

.tictactoe-body .chatbox-wrapper {
  margin-left: 50px;
  width: 300px;
  height: 580px;
  background-color: rgb(255, 255, 255);
}

.tictactoe-body .chatbox-wrapper .chatbox {
  background-color: #f8f4e8;
  height: 510px;
  padding: 10px 5px;
  width: 290px; 
  overflow-y: auto;
}

.chat-row {
  border-radius: 3px;
  display: flex;
  /* height: 30px; */
  color: white;
  background-color: rgb(76, 125, 254);
  line-height: 30px;
  padding: 0 5px;
  overflow-wrap: break-word;
  margin-top: 2px;
  max-width: 280px;
}


.chat-row .chat-row-msg {
  width: 280px;
  overflow-wrap: break-word;
}

.ready-msg {
  width: 270px;
  border-radius: 3px;
  /* height: 30px; */
  color: white;
  background-color: rgb(29, 181, 92);
  line-height: 30px;
  padding: 0 5px;
  margin-top: 2px;
  overflow-wrap: break-word;
}

.leave-msg {
  width: 270px;
  border-radius: 3px;
  /* height: 30px; */
  color: white;
  background-color: rgb(217, 60, 71);
  line-height: 30px;
  padding: 0 5px;
  margin-top: 2px;
  overflow-wrap: break-word;
}

.play-again-msg {
  width: 270px;
  border-radius: 3px;
  /* height: 30px; */
  color: white;
  background-color: rgb(255, 191, 0);
  line-height: 30px;
  padding: 0 5px;
  margin-top: 2px;
  overflow-wrap: break-word;
}



.chatbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.chatbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(193, 193, 193);
}

.chatbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #f3f2f2;
}

.tictactoe-body .chatbox-wrapper .input-box-wrapeer {
  width: 300px;
  height: 50px;
  /* background-color: antiquewhite; */
  background-color: #f8f4e8;
}

.tictactoe-body .chatbox-wrapper .input-box-wrapeer input {
  margin-left: 5px;
  padding-left: 10px;
  /* background-color: rgba(215, 218, 88, .3); */
  width: 218px;
  height: 40px;
  border: none;
  border-radius: 20px;
  outline: none;
  border: 1px solid rgb(206, 206, 206);
  font-size: 16px;
}

.tictactoe-body .chatbox-wrapper .input-box-wrapeer input:focus {
  border: 1px solid black;
}

.tictactoe-body .chatbox-wrapper .input-box-wrapeer button {
  margin-left: 7px;
  width: 50px;
  height: 50px;
  border: none;
  background-color: #f8f4e8;
  background-image: url("../assets/send.png");
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: 10px;
}

.tictactoe-body .chatbox-wrapper .input-box-wrapeer button:hover {
  cursor: pointer;
}

</style>