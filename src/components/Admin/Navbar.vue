<template>
  <nav class="navbar navbar-header navbar-expand navbar-light">
    <a class="sidebar-toggler" @click="HideSideBar" href="#"><span class="navbar-toggler-icon"></span></a>
    <button class="btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav d-flex align-items-center navbar-light ms-auto">
        <li class="dropdown">
          <a href="#" data-bs-toggle="dropdown"
             class="nav-link dropdown-toggle nav-link-lg nav-link-user">
            <div class="avatar me-1">
              <img src="@/assets/images/avatar/avatar-s-1.png" alt="" srcset="">
            </div>
            <div class="d-none d-md-block d-lg-inline-block">Hi, {{ local.name }}</div>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <router-link :to="{ name: 'profile' }" class="dropdown-item">
              <i data-feather="user"></i>Profile
            </router-link>
            <router-link :to="{ name: 'ubahPassword' }" class="dropdown-item">
              <i data-feather="key"></i>Ubah Password
            </router-link>
            <div class="dropdown-divider"></div>
            <a @click="Logout" class="dropdown-item" href="#"><i data-feather="log-out"></i> Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "Navbar-page",
  setup() {
    //SideBar Control
    const HideSideBar = () => {
      if (document.getElementById('sidebar').className === 'active') {
        document.getElementById('sidebar').classList.remove("active")
      }else if (document.getElementById('sidebar').className === '') {
        document.getElementById('sidebar').classList.add("active")
      }
    }

    //LocalStorage
    const local = reactive({
      trueLogin: localStorage.getItem("trueLogin"),
      token: localStorage.getItem("token"),
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      profile: localStorage.getItem('profil'),
    })

    //Logout
    const Logout = () => {
      axios.post(process.env.VUE_APP_ROOT_API +'/api/auth/logout', {},{
            headers: {
              Authorization: "Bearer " + local.token,
            },
          }
      ).then((response) => {
        if (response.data.status) {
          // Swal.fire({
          //   icon: "success",
          //   title: "Logout Berhasil",
          //   showConfirmButton: false,
          //   timer: 1500,
          // }).then(function () {
            localStorage.clear()
            router.push({ name: 'login' })
          // });
        } else {
          Swal.fire('Logout Gagal', '', 'error')
        }
      }).catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Terjadi kesalahan',
            text: 'Akun Akan Logout',
            toast: true,
            timer: 3000
          })
          localStorage.clear()
          router.push({ name: 'login' })
        }
      })
    }

    return{HideSideBar, local, Logout}
  }
}
</script>

<style scoped>
@import "../../assets/css/bootstrap.css";
</style>