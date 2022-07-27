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
import Sidebar from '@/components/Vendor/Sidebar'
import Navbar from '@/components/Vendor/Navbar'
import router from "@/router";
import { useRoute } from 'vue-router'
export default {
  components: {
    'navbar-component': Navbar,
    'sidebar-component': Sidebar,
  },
  setup() {
    const path = useRoute()
    const URL = path.path.split("/")

    return{path, URL}
  },
  name: "Vendor-page",
  mounted() {
    if (!localStorage.getItem("trueLogin")){
      localStorage.clear()
      router.push({ name: 'login' })
    }else {
      if (localStorage.getItem('role').toLowerCase() !== 'user') {
        if (!this.URL[2]){
          router.push({path: "/" + localStorage.getItem("role").toLowerCase() + "/dashboard"})
        }else {
          if (!this.URL[3]){
            router.push({path: "/" + localStorage.getItem("role").toLowerCase() + "/" + this.URL[2]})
          }else {
            router.push({path: "/" + localStorage.getItem("role").toLowerCase() + "/" + this.URL[2] + "/" + this.URL[3]})
          }
        }
      } else {
        window.location.href = '/'
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/vendors/chartjs/Chart.min.css";
@import "../assets/css/app.css";
@import "../assets/vendors/perfect-scrollbar/perfect-scrollbar.css";
</style>