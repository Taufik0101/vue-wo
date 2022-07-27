<template>
  <h1>Tambah Album</h1>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
      </div>
      <div class="card-body">
        <form @submit.prevent="Submit">
          <div class="row">
            <div class="col-md-6 col-12">
              <div class="form-group">
                <label for="first-name-column">Nama Album</label>
                <input
                    type="text"
                    id="first-name-column"
                    class="form-control"
                    name="fname-column"
                    placeholder="Masukkan nama album"
                    v-model="tambah.nama"
                >
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="form-group">
                <label for="email-id-column">Tanggal Pelaksanaan</label>
                <input type="date" id="email-id-column" class="form-control"
                       name="email-id-column" placeholder="Masukkan tanggal pelaksanaan" v-model="tambah.tanggal_pelaksanaan">
              </div>
            </div>
          </diV>
          <button class="btn btn-primary" type="submit">Submit Data</button>
          <!--          <button class="btn btn-danger ms-2">Cancel</button>-->
          <router-link :to="{ name: 'album' }" class="btn btn-danger ms-2">
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
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "TambahAlbum",
  setup() {
    //Tambah Kategori
    const tambah = reactive({nama: "", tanggal_pelaksanaan: ""})
    const Submit = () => {
      if (!!tambah.nama || !!tambah.tanggal_pelaksanaan) {
        axios.post(process.env.VUE_APP_ROOT_API +'/api/album/add', {
              id_vendor: parseInt(localStorage.getItem("id")),
              nama: tambah.nama,
              tanggal_pelaksanaan: tambah.tanggal_pelaksanaan
            },{
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
              router.push({ name: 'album' })
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
              title: 'Tambah Data Album Gagal',
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
              title: 'Tambah Data Album Gagal',
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
  },
  beforeMount() {
    if (
        localStorage.getItem("hp") === "0" ||
        localStorage.getItem("alamat") === "" ||
        localStorage.getItem("toko") === "" ||
        localStorage.getItem("id_kota") === "0" ||
        localStorage.getItem("bank1") === "0" ||
        localStorage.getItem("rekening1") === ""
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Data Belum Lengkap',
        text: 'Silahkan Lengkapi Data',
        confirmButtonText: 'OK',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          router.push({ name: "profileVendor" })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>