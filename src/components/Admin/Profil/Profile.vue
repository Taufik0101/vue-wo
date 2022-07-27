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
          <div class="row mt-3 mb-3">
            <div class="col-sm-11">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Nama</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama profil"
                    v-model="update.name"
                />
              </div>
              <div class="row mt-3">
                <small>
                  <label class="mb-2 pb-0">Email</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama profil"
                    readonly
                    v-model="local.email"
                />
              </div>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Update</button>
          <router-link :to="{ name: 'admin' }" class="btn btn-danger ms-2">
            Cancel
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {reactive, ref} from "vue";
import Form from "vform";
import Swal from "sweetalert2";
import axios from "axios";
import router from "@/router";

export default {
  name: "Profile-page",
  setup(){
    //LocalStorager
    const local = reactive({
      trueLogin: localStorage.getItem("trueLogin"),
      token: localStorage.getItem("token"),
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      profile: localStorage.getItem('profil'),
      email: localStorage.getItem('email'),
    })

    //
    const GetUser = () => {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/user/'+ local.id).then(response => {
        localStorage.setItem("name", response.data.data.name), localStorage.setItem("profil", response.data.data.profil)
      })
    }

    //Update
    // const update = reactive({name: local.name, profile: [], preview: null})
    const preview = ref(null)
    const update = new Form({name: local.name, profile: []})
    const UploadProfile = () => {
      update.profile = Profile.value.files[0]
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
      update.post(process.env.VUE_APP_ROOT_API +'/api/user/update/'+ local.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "Update Berhasil",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            localStorage.setItem('name', response.data.data.name)
            localStorage.setItem('profil', response.data.data.profil)
            router.push({ name: 'admin' })
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

    return{local, update, UploadProfile, Profile, Update, GetUser, preview}
  }
}
</script>

<style scoped>

</style>