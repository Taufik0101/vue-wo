<template>
  <div id="auth">
    <div class="container">
      <div class="row">
        <div class="col-md-5 col-sm-12 mx-auto">
          <div class="card pt-1" style="margin-top: -30px">
            <div class="card-body">
              <div class="text-center mb-4">
                <img @click="BackToLanding" style="cursor: pointer" src="@/assets/images/Wedding-logos_transparent.png" class='mb-2 w-75'>
                <h3>Sign Up</h3>
                <p>Please fill the form to register as <span class="font-bold" style="color: #f366a3 !important">User.</span></p>
              </div>
              <form @submit.prevent="Register">
                <div class="row">
                  <div class="col-md-12 col-12">
                    <div class="form-group">
                      <label for="first-name-column">Nama</label>
                      <input
                          type="text"
                          id="first-name-column"
                          class="form-control"
                          name="fname-column"
                          v-model="register.nama"
                      >
                    </div>
                  </div>
                  <div class="col-md-12 col-12">
                    <div class="form-group">
                      <label for="email-id-column">Email</label>
                      <input type="email" id="email-id-column" class="form-control"
                             name="email-id-column" v-model="register.email">
                    </div>
                  </div>
                  <div class="col-md-12 col-12">
                    <div class="form-group">
                      <label for="company-column">Password</label>
                      <input type="password" id="company-column" class="form-control"
                             name="company-column" v-model="register.password">
                    </div>
                  </div>
                </diV>

                <router-link style="color: #0d6efd" :to="{ name: 'login' }">
                  Have an account? Login
                </router-link>
                <div class="clearfix mt-2">
                  <button class="btn btn-primary btn-block">Sign Up</button>
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
  name: "Register-user",
  setup() {
    //Back To Landing
    const BackToLanding = () => {
      window.location.href = '/'
    }

    //Register
    const register = reactive({nama: "", email: "", password: ""})
    const Register = () => {
      if (!!register.email && !!register.password && !!register.nama) {
        axios.post(process.env.VUE_APP_ROOT_API +'/api/auth/register', {
              name: register.nama,
              email: register.email,
              password: register.password
            }
        ).then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Register Berhasil",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              router.push({ name: 'login' })
            });
          } else {
            Swal.fire('Register Gagal', '', 'error')
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
              title: 'Register Gagal',
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
              title: 'Register Gagal',
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
          text: 'Data Belum Lengkap'
        })
      }
    }

    return{register, Register, BackToLanding}
  },
  mounted() {
    if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Admin') {
      router.push({ name: "admin" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Vendor') {
      router.push({ name: "vendor" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'User') {
      router.push({ name: "guest.page" })
    }
    feather.replace()
  }
}
</script>

<style scoped>
@import "../assets/css/app.css";
</style>