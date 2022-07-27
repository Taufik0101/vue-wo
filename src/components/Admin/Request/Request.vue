<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Request Account</a>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTableRequest" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>No</th>
              <th>Email</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(req, index) in request" :key="req.id_req">
              <td>{{ ++index }}</td>
              <td>{{ req.email }}</td>
              <td>{{ req.cat.nama_kategori }}</td>
              <td>
                <span v-if="req.status === ''" class="badge bg-warning">Menunggu Persetujuan</span>
                <span v-if="req.status === '1'" class="badge bg-success">Disetujui</span>
                <span v-if="req.status === '0'" class="badge bg-danger">Ditolak</span>
              </td>
              <td>
                <a @click="Update(req.id_req, 1)" v-if="req.status === ''" style="color: lightseagreen; cursor: pointer">
                  <i class="fas fa-check-circle fa-lg" data-bs-toggle="tooltip" data-bs-placement="top" title="Setujui Permintaan"></i>
                </a>
                <a @click="Update(req.id_req, 0)" v-if="req.status === ''" class="ms-2" style="color: red; cursor: pointer">
                  <i class="fas fa-times-circle fa-lg" data-bs-toggle="tooltip" data-bs-placement="top" title="Tolak Permintaan"></i>
                </a>
                <a @click="Detail(req)" class="ms-2" style="color: #0b63dc; cursor: pointer">
                  <i class="fas fa-info-circle fa-lg" data-bs-toggle="tooltip" data-bs-placement="top" title="Detail Permintaan"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="DetailRequest" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ detail.nama }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
<!--          <img :src="`http://localhost:1000/profil/`+ detail.profil" class="mx-auto d-block w-25" alt="" srcset="">-->
          <h6 class="mt-2 font-weight-bolder">Informasi Pribadi</h6>
          <div class="row">
            <div class="col-sm-3">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Nama</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.nama"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Email</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.email"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Kategori</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.nama_kategori"
                />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm-3">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">No HP</label>
                </small>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">+62</span>
                  <input
                      type="number"
                      readonly
                      class="form-control"
                      placeholder="masukkan no hp"
                      aria-label="masukkan no hp"
                      aria-describedby="basic-addon1"
                      v-model="detail.no_hp"
                  >
                </div>
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">No KTP</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.nik"
                />
              </div>
            </div>
          </div>
          <hr>
          <h6 class="mt-3 font-weight-bolder">Bukti Data Diri</h6>
          <div class="row">
            <div class="col-sm-5">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">KTP</label>
                </small>
                <img :src="`http://localhost:1000/ktp/`+ detail.ktp" class="mx-auto d-block w-25" alt="" srcset="">
              </div>
            </div>
            <div class="col-sm-6 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Selfie + KTP</label>
                </small>
                <img :src="`http://localhost:1000/selfiektp/`+ detail.selfie_ktp" class="mx-auto d-block w-25" alt="" srcset="">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
import {reactive, ref} from "vue";
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";
import router from "@/router";
// import router from "@/router";
export default {
  name: "Request-page",
  setup() {
    //List Request
    const request = ref([])
    const getRequest = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/request/list', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(response => {
        request.value = response.data.data
      }).then(() => {
        $('#dataTableRequest').DataTable({
          "columnDefs": [
            { "orderable": false, "targets": 2 }
          ],
          "retrieve": true
        })
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
        }
      })
    }

    //Detail
    const detail = reactive({nama: "", email: "", ktp: "", no_hp: "", nik: "", selfie_ktp: "", nama_kategori: ""})
    const Detail = (data) => {
      detail.nama = data.nama, detail.email = data.email, detail.nama_kategori = data.cat.nama_kategori,
          detail.ktp = data.ktp, detail.selfie_ktp = data.selfie_ktp, detail.no_hp = data.no_hp, detail.nik = data.nik
      new bootstrap.Modal(document.getElementById('DetailRequest')).show();
    }

    //Accept
    const Update = (id, value) => {
      axios.post(process.env.VUE_APP_ROOT_API +'/api/request/update/'+ id, {
            status: value.toString(),
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
      ).then((response) => {
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "Update Berhasil",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            getRequest()
          });
        } else {
          Swal.fire('Update Gagal', '', 'error')
        }
      }).catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Terjadi kesalahan',
            text: 'Akun Akan Logout',
            toast: true,
            timer: 3000
          })
          localStorage.clear()
          router.push({ name: 'login' })
        }
      })
    }

    return{request, getRequest, Detail, detail, Update}
  },
  mounted() {
    this.getRequest()
  }
}
</script>

<style scoped>
@import "../../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
</style>