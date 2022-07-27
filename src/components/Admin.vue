<template>
  <div id="app">
    <div id="sidebar" class='active'>
      <sidebar-component></sidebar-component>
    </div>
    <div id="main">
      <navbar-component></navbar-component>
      <div class="main-content container-fluid">
        <router-view></router-view>
      </div>
      <footer>
        <div class="footer clearfix mb-0 text-muted">
          <div class="float-start">
            <p>2020 &copy; Voler</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Navbar from '@/components/Admin/Navbar'
import $ from 'jquery';
import {reactive} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
export default {
  components: {
    'navbar-component': Navbar,
    'sidebar-component': Sidebar,
  },
  setup(){
    const local = reactive({
      trueLogin: localStorage.getItem("trueLogin"),
      token: localStorage.getItem("token"),
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      profile: localStorage.getItem('profil'),
      email: localStorage.getItem('email'),
    })

    const path = useRoute()
    const URL = path.path.split("/")

    return{local, path, URL}
  },
  name: "Admin-page",
  mounted() {
    if (!localStorage.getItem("trueLogin")){
      localStorage.clear()
      router.push({ name: 'login' })
    }else {
      if (localStorage.getItem('role').toLowerCase() !== 'user') {
        if (!this.URL[2]){
          router.push({path: "/" + localStorage.getItem("role").toLowerCase() + "/dashboard"})
        }else {
          router.push({path: "/" + localStorage.getItem("role").toLowerCase() + "/" + this.URL[2]})
        }
      } else {
        window.location.href = '/'
      }
    }
    $(window).resize(function () {
      if (window.screen.width <= 800) {
        document.getElementById('sidebar').classList.remove("active")
      }else {
        document.getElementById('sidebar').classList.add("active")
      }
    })
  },
}
</script>

<style scoped>
@import "../assets/vendors/chartjs/Chart.min.css";
@import "../assets/css/app.css";
@import "../assets/vendors/perfect-scrollbar/perfect-scrollbar.css";
</style>