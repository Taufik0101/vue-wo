<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Profile</a>
      </div>
      <div class="card-body">
        <form @submit.prevent="Update">
          <!--          <div class="avatar me-1">-->
          <img :src="`http://localhost:1000/profil/`+ local.profile" v-if="local.profile != '' && preview === null" class="mx-auto d-block w-25" alt="" srcset="">
          <img src="@/assets/images/undraw_profile.svg" v-if="local.profile === '' && preview === null" class="mx-auto d-block w-25 rounded-full" alt="" srcset="">
          <img :src="preview" v-if="preview != null" class="mx-auto d-block w-25 rounded-full" alt="" srcset="">
          <div class="text-center mt-2">
            <input type="file" @change="UploadProfile" id="userProfile" style="display: none" ref="Profile" class="w-25 form-control mt-2 mx-auto">
            <label for="userProfile">
              <a class="btn btn-warning btn-sm mx-auto">Ubah Gambar</a>
            </label>
          </div>
          <!--          </div>-->
          <h6 class="mt-2 font-weight-bolder">Informasi Pribadi</h6>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label for="basicInput">Nama</label>
                <input type="text" class="form-control" id="basicInput" placeholder="Masukkan Nama Anda" v-model="update.name">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label >Email</label>
                <input type="text" class="form-control" v-model="update.email" disabled>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="helpInputTop">No HP</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">+62</span>
                  <input type="text" class="form-control" id="helpInputTop" aria-describedby="basic-addon1" v-model="update.no_hp">
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group" v-if="local.id_kota != '0'">
                <label>Kota</label>
                <input type="text" class="form-control" readonly="readonly" v-model="update.nama_kota">
              </div>
              <div class="form-group" v-if="local.id_kota === '0'">
                <label>Kota</label>
                <div class="input-group">
                  <select
                      class="custom-select input-form form-control"
                      aria-describedby="button-addon2"
                      v-model="update.kota"
                      id="PilihKota"
                  >
                    <option value="" selected disabled>Pilih Kota</option>
                    <option
                        v-for="kot in kota"
                        :key="kot.id_kota"
                        :value="kot.id_kota"
                    >
                      {{ kot.nama_kota }}
                    </option>
                  </select>
                  <input type="text" id="NewKota" class="form-control" v-model="update.kota_baru">
<!--                  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">-->
                  <button class="btn btn-primary" @click.prevent="Swap" type="button" id="button-addon2 new">Tambah Kota Baru</button>
                  <button class="btn btn-danger" @click.prevent="Swap" type="button" id="button-addon2 cancel">Cancel</button>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label >Nama Toko</label>
                <input type="text" class="form-control" v-model="update.toko" placeholder="Masukkan nama toko Anda">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label >Alamat</label>
                <textarea class="form-control" v-model="update.alamat" placeholder="Masukkan alamat toko Anda"></textarea>
              </div>
            </div>
            <hr/>
            <h6 class="mt-2 font-weight-bolder">Informasi Pembayaran</h6>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="basicInput">Bank 1</label>
                  <select
                      class="custom-select input-form form-control"
                      aria-describedby="button-addon2"
                      v-model="update.bank_1"
                      id="PilihKota"
                  >
                    <option value="" selected disabled>Pilih Bank 1</option>
                    <option
                        v-for="kot in VA"
                        :key="kot.code"
                        :value="kot.code"
                    >
                      {{ kot.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label >Rekening Bank 1</label>
                  <input type="text" class="form-control" v-model="update.rekening_1">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="basicInput">Bank 2</label>
                  <select
                      class="custom-select input-form form-control"
                      aria-describedby="button-addon2"
                      v-model="update.bank_2"
                      id="PilihKota"
                  >
                    <option value="" selected disabled>Pilih Bank 2</option>
                    <option
                        v-for="kot in VA"
                        :key="kot.code"
                        :value="kot.code"
                    >
                      {{ kot.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label >Rekening Bank 2</label>
                  <input type="text" class="form-control" v-model="update.rekening_2">
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Update</button>
          <router-link :to="{ name: 'vendor' }" class="btn btn-danger ms-2">
            Cancel
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import Form from "vform";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "Profile-page",
  data() {
    return {
      VA: []
    }
  },
  setup() {
    //LocalStorager
    const local = reactive({
      trueLogin: localStorage.getItem('trueLogin'),
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      hp: localStorage.getItem('hp'),
      alamat: localStorage.getItem('alamat'),
      toko: localStorage.getItem('toko'),
      profile: localStorage.getItem('profil'),
      rating: localStorage.getItem('rating'),
      bank1: localStorage.getItem('bank1'),
      bank2: localStorage.getItem('bank2'),
      rekening1: localStorage.getItem('rekening1'),
      rekening2: localStorage.getItem('rekening2'),
      kategori: localStorage.getItem('kategori'),
      nama_kota: localStorage.getItem('kota'),
      id_kota: localStorage.getItem('id_kota')
    })

    //GetKota
    const kota = ref([])
    const getKota = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/kota/list').then(response => {
        kota.value = response.data.data
      })
    }

    //Update
    const update = reactive({
      name: local.name,
      email: local.email,
      no_hp: local.hp,
      alamat: local.alamat,
      toko: local.toko,
      nama_kota: local.nama_kota,
      kota: "",
      kota_baru: "",
      bank_1: local.bank1,
      rekening_1: local.rekening1,
      bank_2: local.bank2,
      rekening_2: local.rekening2,
    })
    const preview = ref(null)
    const updates = new Form({
      name: "",
      email: "",
      no_hp: "",
      alamat: "",
      toko: "",
      kota: "",
      kota_baru: "",
      bank_1: "",
      rekening_1: "",
      bank_2: "",
      rekening_2: "",
      profile: []
    })
    const UploadProfile = () => {
      updates.profile = Profile.value.files[0]
      if (Profile.value && Profile.value.files[0]){
        let reader = new FileReader()
        reader.onload = e => {
          preview.value = e.target.result
        }
        reader.readAsDataURL(Profile.value.files[0])
      }
    }
    const Profile = ref(null)
    const Update = () => {
        var kota
        if (update.kota){
          kota = parseInt(update.kota)
        }else if (local.id_kota != '') {
          kota = local.id_kota
        }else {
          kota = 0
        }
        updates.fill({
          name: update.name,
          email: update.email,
          no_hp: parseInt(update.no_hp),
          alamat: update.alamat,
          toko: update.toko,
          kota: parseInt(kota),
          kota_baru: update.kota_baru,
          bank_1: update.bank_1,
          rekening_1: parseInt(update.rekening_1),
          bank_2: update.bank_2,
          rekening_2: parseInt(update.rekening_2),
          profile: Profile.value.files[0]
        })
      updates.post(process.env.VUE_APP_ROOT_API +'/api/user/update/'+ local.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response)
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "Update Berhasil",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            localStorage.setItem('name', response.data.data.name)
            localStorage.setItem('email', response.data.data.email)
            localStorage.setItem('hp', response.data.data.no_hp)
            localStorage.setItem('alamat', response.data.data.alamat)
            localStorage.setItem('toko', response.data.data.toko)
            localStorage.setItem('profil', response.data.data.profil)
            localStorage.setItem('bank1', response.data.data.bank_1)
            localStorage.setItem('bank2', response.data.data.bank_2)
            localStorage.setItem('rekening1', response.data.data.rekening_1)
            localStorage.setItem('rekening2', response.data.data.rekening_2)
            localStorage.setItem('id_kota', response.data.data.kota)
            localStorage.setItem('kota', response.data.data.kot.nama_kota)
            router.push({ name: 'vendor' })
          });
        } else {
          Swal.fire('Update Gagal', '', 'error')
        }
      }).catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Token Invalid',
            text: 'Akun Akan Logout',
            toast: true,
            timer: 1500,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              localStorage.clear()
              router.push({ name: 'login' })
            }
          })
        } else if (err.response.data.status === false) {
          Swal.fire({
            icon: 'error',
            toast: true,
            timer: 2500,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            title: 'Update Data Gagal',
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
            title: 'Update Data Gagal',
            text: 'Terjadi Kesalahan'
          })
        }
      })
    }

    //Swap
    const Swap = () => {
      if (document.getElementById('PilihKota').style.display === '') {
        update.kota = ''
        document.getElementById('PilihKota').style.display = 'none'
        document.getElementById('NewKota').style.display = ''
        document.getElementById('button-addon2 cancel').style.display = ''
        document.getElementById('button-addon2 new').style.display = 'none'
      }else if (document.getElementById('PilihKota').style.display === 'none') {
        update.kota_baru = ''
        document.getElementById('PilihKota').style.display = ''
        document.getElementById('NewKota').style.display = 'none'
        document.getElementById('button-addon2 cancel').style.display = 'none'
        document.getElementById('button-addon2 new').style.display = ''
      }
    }

    return{local, preview, kota, getKota, Swap, Update, UploadProfile, update, Profile}
  },
  methods: {
    getVa() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/va/list').then(response => {
        console.log(response.data.data)
        this.VA = response.data.data
      })
    }
  },
  mounted() {
    if (this.local.id_kota === '0'){
      document.getElementById('NewKota').style.display = 'none'
      document.getElementById('button-addon2 cancel').style.display = 'none'
    }
    if (this.local.id_kota === '0'){
      this.getKota()
    }
    this.getVa()
  }
}
</script>

<style scoped>

</style>