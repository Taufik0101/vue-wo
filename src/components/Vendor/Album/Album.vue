<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Album</a>
        <!--        <h6 class="m-0 font-weight-bold text-primary">Tabel Data Kategori</h6>-->
        <router-link :to="{ name: 'tambahAlbum' }" class="btn btn-success float-end">
          <i class="fas fa-plus fa-sm"></i>&nbsp;
          <span>Tambah Album</span>
        </router-link>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTableAlbum" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>No</th>
              <th>Nama Album</th>
              <th>Tanggal Pelaksanaan</th>
              <th>Collection</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(al, index) in album" :key="al.id_album">
              <td>{{ ++index }}</td>
              <td>{{ al.nama }}</td>
              <td>{{ ConvertDate(al.tanggal_pelaksanaan) }}</td>
              <td>{{ al.Detail.length }} Collection</td>
              <td>
                <router-link :to="{ name: 'collection', params: { slug: al.id_album } }" style="color: #5bc0de; cursor: pointer">
                  <i class="fas fa-info-circle fa-sm"></i>&nbsp;
                </router-link>
                <a @click="Edit(al)" style="color: lightseagreen; cursor: pointer">
                  <i class="fas fa-edit fa-sm"></i>
                </a>
<!--                <a @click="Delete(al.id_album)" class="ms-2" style="color: red; cursor: pointer">-->
<!--                  <i class="fas fa-trash-alt fa-sm"></i>-->
<!--                </a>-->
<!--                <a @click="Detail(al)" style="color: cornflowerblue; cursor: pointer">-->
<!--                  <i class="fas fa-info-circle fa-sm"></i>-->
<!--                </a>-->
<!--                <a @click="Edit(al)" class="btn btn-success ms-2">-->
<!--                  Edit-->
<!--                </a>-->
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="EditAlbum" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <form @submit.prevent="SaveEdit">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ edit.namaAwal }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
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
                      v-model="edit.nama_project"
                  >
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label for="email-id-column">Tanggal Pelaksanaan</label>
                  <input type="date" id="email-id-column" class="form-control"
                         name="email-id-column" placeholder="Masukkan tanggal pelaksanaan" v-model="edit.tanggal">
                </div>
              </div>
            </diV>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
import router from "@/router";

export default {
  name: "Album-page",
  setup() {
    //List Kategori
    const album = ref([])
    const getAlbum = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/album/list/' + localStorage.getItem('id')).then(response => {
        album.value = response.data.data
      }).then(() => {
        $('#dataTableAlbum').DataTable({
          "columnDefs": [
            { "orderable": false, "targets": 2,}
          ],
          "retrieve": true
        })
      }).catch((err) => {
        console.log(err);
      })
    }

    //Update
    const edit = reactive({namaAwal: "",nama_project: "", tanggal: "", id_album: ""})
    const Edit = (data) => {
      var tgl = data.tanggal_pelaksanaan.split("T")
      edit.nama_project = data.nama, edit.id_album = data.id_album, edit.namaAwal = data.nama, edit.tanggal = tgl[0]
      new bootstrap.Modal(document.getElementById('EditAlbum')).show();
    }
    const SaveEdit = () => {
      axios.post(process.env.VUE_APP_ROOT_API +'/api/album/update/' + edit.id_album, {
        nama: edit.nama_project,
        tanggal_pelaksanaan: edit.tanggal
      }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
      }
      ).then((response) => {
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "Data berhasil diubah",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            bootstrap.Modal.getInstance(document.getElementById('EditAlbum')).hide()
            getAlbum()
          });
        } else {
          Swal.fire('Data gagal diubah', '', 'error')
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

    return{album, getAlbum, edit, Edit, SaveEdit, ConvertDate}
  },
  mounted() {
    this.getAlbum()
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