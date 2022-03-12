<template>
  <div id="root">
    

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <h2>Looks like it's your first time here: </h2>
      <span><input type="text" class="username-input" placeholder="USERNAME" v-model="inputUsername"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Use Default Name</el-button>
        <el-button type="primary"  @click="setName">Confirm</el-button>
      </span>
    </el-dialog>

    <div class="top-nav">
      <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
      <div class="top-nav-left">
        <ul class="top-nav-left-list">
          <li>
            <span>OnlineGames</span>
          </li>
          <li>
            <span>Games</span>
          </li>
          <li>
            <span>FAQ</span>
          </li>
        </ul>
      </div>
      <div class="top-nav-right">
        <div class="top-nav-right-list">
          <button @click="showSignIn">
            <span>Sign in</span>
          </button>
          <button @click="showSignUp">
            <span>Sign up</span>
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>

    <section>
      <div class="side-page-wrapper">
        <div class="side-page" :class="showSidePage">
          <div class="side-page-top-nav">
            <button @click="signInActive">
              <span>Sign in</span>
            </button>
            <button @click="signUpActive">
              <span>Sign up</span>
            </button>
            <button>
              <span>Contact us</span>
            </button>
            <button></button>
            <button></button>
            <button @click="back">
              <span>back</span>
            </button>
          </div>
          <div class="side-page-content">
            <!--用js操作css实现决定哪个选项出现-->
            <div class="sign-in" :class="signInTabActive">sign in</div>
            <div class="sign-up-wrapper clearfix" :class="signUpTabActive">
              <div class="sign-up">
                <div class="sign-up-header">
                  <h2>Sign up</h2>
                </div>
                <div class="sign-up-input">
                  <form>
                    <div class="sign-up-input-name">
                      <input type="text" placeholder="First Name" />
                      <input type="text" placeholder="Last Name" />
                    </div>
                    <div class="sign-up-input-email">
                      <input type="text" placeholder="E-mail" />
                    </div>
                    <div class="sign-up-input-password">
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        @keyup="checkPassword"
                        @focus="checkPassword"
                        v-model="password"
                        @blur="backToDefaultColor"
                      />
                      <p id="lengthReminder" :style="{ color: fontColor }">
                        √ At least 8 characters
                      </p>
                      <p>√ 1 uppercase letter</p>
                    </div>
                    <p class="password-reminder">
                      Password must be at least 8 characters long
                    </p>

                    <div class="sign-up-submit-btn">
                      <button>Sign up</button>
                    </div>
                  </form>
                </div>
                <p class="sign-in-reminder">
                  Already have a member? <a href="#">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import axios from 'axios'
  axios.defaults.withCredentials = true;

  export default {
    name: "App",
    components: {
      
    },

    mounted() {
      let loginTicket = this.getCookie("loginTicket");
      if (loginTicket == null) {
        this.dialogVisible = true;
      }

      axios.get("http://localhost:8081/welcome")
      .then(res => {
        let userRes = res.data
        console.log(res)
        //console.log(this)
        this.$store.dispatch('common/setUser', userRes)
        this.setUser(userRes)
        console.log(this.user)
      })
      .catch(err => {
        console.error(err); 
      });

      this.$router.push({
        path: '/mainpage',
      });
    },

    data() {
      return {
        showSidePage: "",
        password: "",
        fontColor: "black",
        signInTabActive: "",
        signUpTabActive: "",
        dialogVisible: false,
        inputUsername: '',
      };
    },

    computed: {
      ...mapState('common', {
        user: 'user',
      }),
    },

    methods: {
      ...mapActions('common', {
        setUser: 'setUser',
      }),
      showSignIn() {
        this.showSidePage = "side-page-active";
      },
      showSignUp() {
        this.showSidePage = "side-page-active";
      },
      back() {
        this.showSidePage = "";
      },
      checkPassword() {
        console.log("asdasdasdasd");
        console.log(this.password);
        if (this.password.length < 8) {
          this.fontColor = "red";
        } else {
          this.fontColor = "green";
        }
      },

      signInActive() {
        this.signUpTabActive = "";
        this.signInTabActive = "side-page-active-tab";
      },

      signUpActive() {
        this.signInTabActive = "";
        this.signUpTabActive = "side-page-active-tab";
      },

      backToDefaultColor() {
        this.fontColor = "black";
      },

      setName() {
        axios.put("http://localhost:8081/user",{
          userId: this.user.userId,
          username: this.inputUsername,
        })
        .then(res => {
            let userRes = res.data
            console.log(res)
            //console.log(this)
            this.$store.dispatch('common/setUser', userRes)
            this.setUser(userRes)
            console.log(this.user)
        })
        .catch(err => {
          console.error(err);
        });

        this.dialogVisible = false;
      },

      getCookie(name) {
        //获取当前所有cookie
        var strCookies = document.cookie;
        //截取变成cookie数组
        var array = strCookies.split(';');
        //循环每个cookie
        for (var i = 0; i < array.length; i++) {
            //将cookie截取成两部分
            var item = array[i].split("=");
            //判断cookie的name 是否相等
            if (item[0] == name) {
                return item[1];
            }
        }
        return null;
      },

    },
  };
</script>

<style scoped>

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
body {
  overflow-x: hidden;
  font-family: Sans-serif;
  background-image: url("https://papergames.io/images/patterns/style-2-5.png");
  background-attachment: fixed;
  position: relative;
  background-color: #ced4da;
}

li {
  list-style: none;
}

.top-nav-wrapper {
  width: 100%;
  height: 100px;
  background-color: rgb(75, 75, 253);
}

.top-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.625rem;
  font-weight: 300;
  background-color: white;
  height: 64px;
  margin: 0 auto;
  position: fixed;
  top: 0;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
  float: left;
  z-index: 9999;
}

.top-nav-left {
  margin-left: 20px;
  /* background-color: purple; */
  height: 64px;
  line-height: 64px;
}

.top-nav-left .top-nav-left-list li {
  margin-left: 30px;
  float: left;
}

.top-nav-right {
  display: flex;
  flex-direction: row;
  /* background-color: red; */
  justify-content: center;
  width: 250px;
  margin-right: 20px;
  /* background-color: red; */
  height: 64px;
}
.top-nav-right .top-nav-right-list {
  width: 250px;
}

.top-nav-right .top-nav-right-list button {
  line-height: 50px;
  border: 0px;
  outline: 0px;
  background-color: transparent;
  height: 64px;
  width: 120px;
}

.top-nav-right .top-nav-right-list button span {
  height: 50px;
  display: block;
  font-family: Sans-serif;
  font-size: 1.625rem;
  font-weight: 200;
  transition-property: background-color;
  transition-duration: 0.3s;
}

.top-nav-right .top-nav-right-list button:hover span {
  cursor: pointer;
  background-color: #ced4da;
}

.top-nav-left .top-nav-left-list li:hover,
.top-nav-right .top-nav-right-list li:hover {
  text-transform: capitalize;
  cursor: pointer;
  font-weight: 400;
  color: #fc5e03;
}

.side-page-wrapper {
  /* position: fixed; */
  float: right;
  width: 700px;
  height: 100%;
}
.side-page {
  background-color: white;
  width: 700px;
  height: 100%;
  transition-duration: 0.5s;
  transform: translateX(750px);
  transition-timing-function: ease-in-out;
  z-index: 99999;
  position: fixed;
  top: 0rem;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
}
.side-page-active {
  transform: translateX(0);
}
.side-page-wrapper .side-page .side-page-top-nav {
  background-color: white;
  height: 80px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);

  display: flex;
  justify-content: space-between;
}

.side-page-wrapper .side-page .side-page-top-nav button {
  width: 100px;
  border: 0;
  background-color: transparent;
}

.side-page-wrapper .side-page .side-page-top-nav button span:hover {
  cursor: pointer;
}
.side-page-wrapper .side-page .side-page-top-nav button span {
  font-size: 1.25rem;
}

.side-page-content {
  height: 85%;
}
.side-page-content .sign-in {
  display: none;
  height: 100%;
}

.side-page-content .sign-up-wrapper {
  height: 400px;
}

.side-page-content .sign-up-wrapper .sign-up {
  width: 450px;
  margin: 200px auto;
}

.side-page-content .sign-up-wrapper .sign-up .sign-up-header {
  margin-bottom: 15px;
}

.side-page-content .sign-up-wrapper .sign-up div {
  margin-top: 12px;
}

.side-page-content .sign-up .sign-up-input .sign-up-input-name input {
  width: 170px;
  font-size: 16px;
  padding: 0 8px;
  margin-right: 10px;
  border-radius: 8px;
  border: none;
  height: 35px;
  border: 2px solid rgba(64, 64, 64, 0.6);
}

.side-page-content .sign-up .sign-up-input .sign-up-input-name input:focus {
  border: 2px solid #fc5e03;
}

.side-page-content .sign-up .sign-up-input .sign-up-input-email input,
.side-page-content .sign-up .sign-up-input .sign-up-input-password input {
  width: 375px;
  font-size: 16px;
  padding: 0 8px;
  border-radius: 8px;
  border: none;
  height: 35px;
  border: 2px solid rgba(64, 64, 64, 0.6);
  outline: none;
}
.side-page-content .sign-up .sign-up-input .sign-up-input-email input:focus,
.side-page-content .sign-up .sign-up-input .sign-up-input-password input:focus {
  border: 2px solid #fc5e03;
}

.side-page-content .sign-up .sign-up-input .sign-up-input-password input:focus {
  border: 2px solid rgba(255, 0, 0, 0.6);
}

.side-page-content .sign-up .sign-up-input .sign-up-input-name input:focus {
  border: 2px solid rgba(64, 64, 64, 0.6);
  outline: none;
}

.side-page-content .sign-up .sign-up-input .password-reminder {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bolder;
}

.side-page-content .sign-up .sign-up-input .sign-up-submit-btn button {
  width: 389px;
  height: 35px;
  border: none;
  color: white;
  background-color: #fc5e03;
  border-radius: 5px;
  font-size: 16px;
}

.side-page-content .sign-up .sign-in-reminder a {
  font-weight: normal;
  color: black;
}

.side-page-content .sign-up .sign-in-reminder {
  margin-top: 10px;
  font-weight: normal;
}

.side-page-active-tab {
  display: block !important;
}

.content {
  width: 100%;
  height: 729px;
  /* background-color: brown; */
  margin-top: 64px;
  background-color: transparent;
  /* background-image: url("https://papergames.io/images/patterns/style-2-5.png"); */
}


.username-input {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  padding: 0px 10px;
  width: 370px;
  height: 50px;
}

</style>
