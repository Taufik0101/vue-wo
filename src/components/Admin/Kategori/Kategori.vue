<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Kategori</a>
<!--        <h6 class="m-0 font-weight-bold text-primary">Tabel Data Kategori</h6>-->
        <router-link :to="{ name: 'tambahKategori' }" class="btn btn-success float-end">
          <i class="fas fa-plus fa-sm"></i>&nbsp;
          <span>Tambah Kategori</span>
        </router-link>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTableKategori" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>No</th>
              <th>Nama Kategori</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(kat, index) in kategori" :key="kat.id_kategori">
              <td>{{ ++index }}</td>
              <td>{{ kat.nama_kategori }}</td>
              <td>
                <a @click="Edit(kat)" style="color: lightseagreen; cursor: pointer">
                  <i class="fas fa-edit fa-sm"></i>
                </a>
                <a @click="Delete(kat.id_kategori)" class="ms-2" style="color: red; cursor: pointer">
                  <i class="fas fa-trash-alt fa-sm"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="EditKategori" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <form @submit.prevent="SaveEdit">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ edit.namaAwal }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-11">
                <div class="row">
                  <small>
                    <label class="mb-2 pb-0">Nama Kategori</label>
                  </small>
                  <input
                      class="form-control ms-2"
                      id="nama_kamar"
                      type="text"
                      placeholder="Masukkan nama kamar"
                      v-model="edit.nama_kategori"
                  />
                </div>
              </div>
            </div>
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
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
// import 'simple-datatables/src/datatable'
import axios from 'axios'
import $ from 'jquery'
import { ref, reactive } from "vue";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import Swal from "sweetalert2";
import router from "@/router";
// import { DataTable } from 'simple-datatables'

export default {
  name: "Kategori-page",
  setup() {
    //List Kategori
    const kategori = ref([])
    const getKategori = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/kategori/list').then(response => {
        kategori.value = response.data.data
      }).then(() => {
        $('#dataTableKategori').DataTable({
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
    const edit = reactive({namaAwal: "",nama_kategori: "", id_kategori: ""})
    const Edit = (data) => {
      edit.nama_kategori = data.nama_kategori, edit.id_kategori = data.id_kategori, edit.namaAwal = data.nama_kategori
      new bootstrap.Modal(document.getElementById('EditKategori')).show();
    }
    const SaveEdit = () => {
      axios.post(process.env.VUE_APP_ROOT_API +'/api/kategori/update/' + edit.id_kategori, {
        nama_kategori: edit.nama_kategori}, {
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
            bootstrap.Modal.getInstance(document.getElementById('EditKategori')).hide()
            getKategori()
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

    //Hapus Kategori
    const Delete = (id) => {
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
          axios.post(process.env.VUE_APP_ROOT_API + '/api/kategori/delete/' + id, {},{
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
                getKategori()
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
                title: 'Hapus Data Gagal',
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
                title: 'Hapus Data Gagal',
                text: 'Terjadi Kesalahan'
              })
            }
          })
        }
      })
    }

    return{getKategori, kategori, Edit, edit, SaveEdit, Delete}
  },
  mounted() {
    this.getKategori()
  }
}
</script>

<style scoped>
@import "../../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
/*@import "~simple-datatables/src/style.css";*/
</style>

// new DataTable("#dataTableKategori", {searchable: true, nextPrev: true})