<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Collection</a>
        <!--        <h6 class="m-0 font-weight-bold text-primary">Tabel Data Kategori</h6>-->
        <router-link :to="{ name: 'album'}" class="btn btn-danger float-end ms-2">
          Back
        </router-link>
        <router-link :to="{ name: 'tambahCollection', params: { slug: params } }" class="btn btn-success float-end">
          <i class="fas fa-plus fa-sm"></i>&nbsp;
          <span>Tambah Koleksi</span>
        </router-link>
      </div>
      <div class="card-body">
<!--        <h5 class="text-center">{{ tittle.nama }}</h5>-->
<!--        <h6 class="text-center">{{ tittle.tgl }}</h6>-->
        <div class="row" v-for="kol in koleksi" :key="kol.id_detail">
          <div class="col-sm">
            <img :src="`http://localhost:1000/album/`+ kol.foto" @click.prevent="Hapus(kol.id_detail)" class="mx-auto d-block w-50 mt-3" style="cursor: pointer" alt="" srcset="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import Swal from "sweetalert2";
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
import router from "@/router";
// import $ from "jquery";

export default {
  name: "Collection-page",
  setup() {
    //Get Parameter
    const path = useRoute()
    const params = path.params.slug

    //List Kategori
    const tittle = reactive({nama: "", tgl: ""})
    const koleksi = ref([])
    const getKoleksi = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/koleksi/list/' + params).then(response => {
        tittle.nama = response.data.data[0].albums.nama
        tittle.tgl = ConvertDate(response.data.data[0].albums.tanggal_pelaksanaan)
        koleksi.value = response.data.data
      }).catch((err) => {
        console.log(err);
      })
    }

    //Hapus Koleksi
    const Hapus = (id) => {
      Swal.fire({
        title: 'Hapus data?',
        text: 'Data yang dihapus tidak dapat dikembalikan!',
        showDenyButton: true,
        confirmButtonText: 'Hapus',
        denyButtonText: `Batal`,
        confirmButtonColor: '#d9534f',
        denyButtonColor: '#0275d8'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post(process.env.VUE_APP_ROOT_API + '/api/koleksi/delete/' + id, {}, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then((response) => {
            if (response.data.status) {
              Swal.fire({
                icon: "success",
                title: "Data berhasil dihapus",
                showConfirmButton: false,
                timer: 1500,
              }).then(function () {
                getKoleksi()
              });
            } else {
              Swal.fire('Data gagal dihapus', '', 'error')
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
      })
    }

    return{koleksi, getKoleksi, path, params, Hapus, tittle, ConvertDate}
  },
  mounted() {
    this.getKoleksi()
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
function ConvertDate(value) {
  var date = new Date(value.toString())
  var months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  var days = ['Minggu','Senin','Selasa','Rabu','Kamis',"Jum'at",'Sabtu'];
  return days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}
</script>

<style scoped>
@import "../../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
</style>