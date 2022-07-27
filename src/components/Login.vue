<template>
  <div id="auth">
    <div class="container">
      <div class="row">
        <div class="col-md-5 col-sm-12 mx-auto">
          <div class="card pt-1">
            <div class="card-body">
              <div class="text-center mb-4">
                <img style="cursor: pointer" src="@/assets/images/Wedding-logos_transparent.png" @click="BackToLanding" class='mb-2 w-75'>
                <h3>Sign In</h3>
                <p>Please sign in to continue to <span class="font-bold" style="color: #f366a3 !important">Dream Weddings.</span></p>
              </div>
              <form @submit.prevent="Login">
                <div class="form-group position-relative has-icon-left">
                  <label for="email">Username</label>
                  <div class="position-relative">
                    <input type="email" class="form-control" id="email" placeholder="Masukkan email anda" v-model="login.email">
                    <div class="form-control-icon">
                      <i data-feather="user"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group position-relative has-icon-left">
                  <div class="clearfix">
                    <label for="password">Password</label>
<!--                    <a href="auth-forgot-password.html" class='float-end'>-->
<!--                      <small>Forgot password?</small>-->
<!--                    </a>-->
                  </div>
                  <div class="position-relative">
                    <input type="password" class="form-control" id="password" placeholder="Masukkan password anda" v-model="login.password">
                    <div class="form-control-icon">
                      <i data-feather="lock"></i>
                    </div>
                  </div>
                </div>
                <div class='form-check clearfix my-4'>
                  <div class="checkbox float-start">
                    <input type="checkbox" id="checkbox1" class='form-check-input' v-model="login.remember_me">
                    <label for="checkbox1">Remember me</label>
                  </div>
                  <div class="float-end">
                    <router-link style="color: #0d6efd" :to="{ name: 'registerUser' }">
                      Don't have an account?
                    </router-link>
                  </div>
                </div>
                <div class="clearfix">
                  <button class="btn btn-primary btn-block">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons'
import {reactive} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
export default {
  name: "Login-page",
  setup() {
    //Back To Landing
    const BackToLanding = () => {
      window.location.href = '/'
    }

    //Login
    const login = reactive({email: "", password: "", remember_me: ""})
    const Login = () => {
      if (!!login.email && !!login.password) {
        axios.post(process.env.VUE_APP_ROOT_API +'/api/auth/login', {
              email: login.email,
              password: login.password
            }
        ).then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              toast: true,
              position: 'top-end',
              timerProgressBar: true,
              title: "Login Berhasil",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              localStorage.setItem('trueLogin', true)
              localStorage.setItem('token', response.data.data.token)
              localStorage.setItem('id', response.data.data.id)
              localStorage.setItem('name', response.data.data.name)
              localStorage.setItem('email', response.data.data.email)
              localStorage.setItem('role', response.data.data.role)
              localStorage.setItem('hp', response.data.data.no_hp)
              localStorage.setItem('alamat', response.data.data.alamat)
              localStorage.setItem('toko', response.data.data.toko)
              localStorage.setItem('profil', response.data.data.profil)
              localStorage.setItem('rating', response.data.data.rating)
              localStorage.setItem('bank1', response.data.data.bank_1)
              localStorage.setItem('bank2', response.data.data.bank_2)
              localStorage.setItem('rekening1', response.data.data.rekening_1)
              localStorage.setItem('rekening2', response.data.data.rekening_2)
              localStorage.setItem('id_kategori', response.data.data.category)
              localStorage.setItem('id_kota', response.data.data.kota)
              localStorage.setItem('kategori', response.data.data.cat.nama_kategori)
              localStorage.setItem('kota', response.data.data.kot.nama_kota)

              // console.log(response.data.data)
              if (response.data.data.role === 'Admin') {
                window.location.href = "/admin/dashboard"
              } else if (response.data.data.role === 'Vendor') {
                if (response.data.data.no_hp === 0 ||
                    response.data.data.alamat === "" ||
                    response.data.data.kota === 0 ||
                    response.data.data.toko === "" ||
                    response.data.data.kota === 0 ||
                    response.data.data.bank_1 === 0 ||
                    response.data.data.rekening_1 === "") {
                  window.location.href = "/vendor/profile"
                } else {
                  window.location.href = "/vendor/dashboard"
                }
              } else {
                if (response.data.data.no_hp === 0 || response.data.data.alamat === "") {
                  window.location.href = "/user/profile"
                } else {
                  window.location.href = "/"
                }
                // router.push({ name: "landing.page" })
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              toast: true,
              timer: 2500,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              title: 'Login Gagal',
              text: 'Email atau Password Salah'
            })
          }
        }).catch((err) => {
          if (err.response. data.status === false) {
            Swal.fire({
              icon: 'error',
              toast: true,
              timer: 2500,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              title: 'Login Gagal',
              text: err.response.data.error[0]
            })
          } else {
            Swal.fire({
              icon: 'error',
              toast: true,
              timer: 2500,
              position: 'top-end',
              showConfirmButton: false,
              timerProgressBar: true,
              title: 'Login Gagal',
              text: 'Terjadi Kesalahan'
            })
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          toast: true,
          timer: 3000,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          title: 'Terjadi kesalahan',
          text: 'Email atau Password Belum Lengkap'
        })
      }
    }

    return{BackToLanding, login, Login}
  },
  mounted() {
    if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Admin') {
      router.push({ name: "admin" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Vendor') {
      router.push({ name: "vendor" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'User') {
      router.push({ name: "landing.page" })
    }
    feather.replace()
  }
}
</script>

<style scoped>
@import "../assets/css/app.css";
</style>