<template>
  <div id="auth">
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-sm-12 mx-auto">
          <div class="card pt-1" style="margin-top: -45px">
            <div class="card-body">
              <div class="text-center mb-4">
                <img style="cursor: pointer" @click="toLanding" src="@/assets/images/Wedding-logos_transparent.png" class='mb-2 w-75'>
                <h3>Sign Up</h3>
                <p>Please fill the form to register as <span class="font-bold" style="color: #f366a3 !important">Vendor.</span></p>
              </div>
              <form @submit.prevent="Register">
                <div class="row">
                  <div class="col-md-6 col-12">
                    <div class="form-group">
                      <label for="first-name-column">Nama</label>
                      <input
                          type="text"
                          id="first-name-column"
                          class="form-control"
                          name="fname-column"
                          placeholder="Masukkan nama anda"
                          v-model="register.nama"
                      >
                      <span class="text-xxs font-bold" style="color: red">*Nama di KTP</span>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group">
                      <label for="email-id-column">Email</label>
                      <input type="email" id="email-id-column" class="form-control"
                             name="email-id-column" placeholder="Masukkan email anda" v-model="register.email">
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group">
                      <label for="first-name-column">No HP</label>
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">+62</span>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="masukkan no hp"
                            aria-label="masukkan no hp"
                            aria-describedby="basic-addon1"
                            v-model="register.no_hp"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group">
                      <label for="email-id-column">NIK</label>
                      <input type="number" class="form-control"
                             name="email-id-column" placeholder="Masukkan nik anda" v-model="register.nik">
                    </div>
                  </div>
                  <div class="col-md-12 col-12">
                    <div class="form-group">
                      <label>Kategori</label>
                      <select
                          class="custom-select input-form form-control"
                          v-model="register.id_kategori"
                      >
                        <option value="" selected disabled>Pilih Kategori</option>
                        <option
                            v-for="kat in category"
                            :key="kat.id_kategori"
                            :value="kat.id_kategori"
                        >
                          {{ kat.nama_kategori }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group">
                      <label for="email-id-column">KTP</label>
                      <input type="file" @change="UploadKTP" ref="KTP" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group">
                      <label for="email-id-column">Selfie</label>
                      <input type="file" @change="UploadSelfie" ref="Selfie" class="form-control">
                      <span class="text-xxs font-bold" style="color: red">*Selfie dengan KTP</span>
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
import {ref} from "vue";
import axios from "axios";
import Form from 'vform'
import Swal from "sweetalert2";
import router from "@/router";
export default {
  name: "Register-vendor",
  setup() {
    //List Category
    const category = ref([])
    const getKategori = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/kategori/list').then(response => {
        category.value = response.data.data
      })
    }

    const toLanding = () => {
      window.location.href = '/'
    }

    //Register
    const register = new Form({nama: "", email: "", no_hp: "", nik: "", id_kategori: "", file_ktp: [], file_selfie: []})
    const UploadKTP = () => {register.file_ktp = KTP.value.files[0]}
    const UploadSelfie = () => {register.file_selfie = Selfie.value.files[0]}
    const KTP = ref(null)
    const Selfie = ref(null)
    const Register = () => {
      let beforeSubmit = Object.values(register.data())
      let countError = 0
      beforeSubmit.map(items => {
        if (items === "" || items.length === 0) {
          countError++
        }
      })
      if (countError === 0) {
        register.post(process.env.VUE_APP_ROOT_API +'/api/vendor/register'
        ).then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Register Berhasil",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              window.location.href = '/'
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

    return{category, getKategori, register, Register, UploadKTP, UploadSelfie, KTP, Selfie, toLanding}
  },
  mounted() {
    if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Admin') {
      router.push({ name: "admin" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Vendor') {
      router.push({ name: "vendor" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'User') {
      router.push({ name: "guest.page" })
    }
    this.getKategori()
    feather.replace()
  }
}
</script>

<style scoped>
@import "../assets/css/app.css";
</style>