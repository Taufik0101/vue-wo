<template>
  <h1>Tambah Kategori</h1>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
      </div>
      <div class="card-body">
        <form @submit.prevent="Submit">
          <div class="mb-3">
            <label for="nama_kamar">Nama Kategori</label>
            <input
                class="form-control mt-2"
                id="nama_kamar"
                type="text"
                placeholder="Masukkan nama kategori"
                v-model="tambah.nama_kategori"
            />
          </div>
          <button class="btn btn-primary" type="submit">Submit Data</button>
<!--          <button class="btn btn-danger ms-2">Cancel</button>-->
          <router-link :to="{ name: 'kategori' }" class="btn btn-danger ms-2">
            Cancel
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import Swal from 'sweetalert2'
import router from "@/router";

export default {
  name: "Tambah-Kategori",
  setup() {
    //Tambah Kategori
    const tambah = reactive({nama_kategori: ""})
    const Submit = () => {
      if (tambah.nama_kategori !== "") {
        axios.post(process.env.VUE_APP_ROOT_API +'/api/kategori/add', {
              nama_kategori: tambah.nama_kategori},{
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
        ).then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Data berhasil ditambahkan",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              router.push({ name: 'kategori' })
            });
          } else {
            Swal.fire('Data gagal ditambahkan', '', 'error')
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
              title: 'Tambah Data Gagal',
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
              title: 'Tambah Data Gagal',
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

    return{tambah, Submit}
  }
}
</script>

<style scoped>

</style>