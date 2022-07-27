<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Produk</a>
        <!--        <h6 class="m-0 font-weight-bold text-primary">Tabel Data Kategori</h6>-->
        <router-link :to="{ name: 'tambahProduk' }" class="btn btn-success float-end">
          <i class="fas fa-plus fa-sm"></i>&nbsp;
          <span>Tambah Produk</span>
        </router-link>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTableProduk" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>No</th>
              <th>Nama Kategori</th>
              <th>Harga</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(prod, index) in produk" :key="prod.id_produk">
              <td>{{ ++index }}</td>
              <td>{{ prod.nama_produk }}</td>
              <td>{{ convertToRupiah(prod.harga) }}</td>
              <td>
                <label class="switch">
                  <input
                      type="checkbox"
                      class="shortime-toggle"
                      :checked="prod.is_active == '1'"
                      @change="updateActive(prod.id_produk, $event)"
                  />
                  <span class="slider round"></span>
                </label>
              </td>
              <td>
                <a @click="Detail(prod)" style="color: cornflowerblue; cursor: pointer">
                  <i class="fas fa-info-circle fa-sm"></i>
                </a>
                <a @click="Edit(prod)" class="ms-2" style="color: lightseagreen; cursor: pointer">
                  <i class="fas fa-edit fa-sm"></i>
                </a>
<!--                <a @click="Delete(prod.id_produk)" class="ms-2" style="color: red; cursor: pointer">-->
<!--                  <i class="fas fa-trash-alt fa-sm"></i>-->
<!--                </a>-->
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="DetailProduk" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ detail.nama }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="`http://localhost:1000/produk/`+ detail.image" class="mx-auto d-block w-25" alt="" srcset="">
          <h6 class="mt-2 font-weight-bolder">Informasi Pribadi</h6>
          <div class="row">
            <div class="col-sm-3">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Nama Produk</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama produk"
                    readonly
                    v-model="detail.nama"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Harga</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan harga produk"
                    readonly
                    v-model="detail.harga"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">DP</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan dp produk"
                    readonly
                    v-model="detail.dp"
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Deskripsi</label>
                </small>
                <textarea
                    class="form-control ms-2"
                    type="text"
                    readonly
                    v-model="detail.deskripsi"
                />
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
  <div class="modal fade" id="EditProduk" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <form @submit.prevent="SaveEdit">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ edit.nama }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6 class="mt-2 font-weight-bolder">Informasi Produk</h6>
            <div class="row">
              <div class="col-sm-3">
                <div class="row">
                  <small>
                    <label class="mb-2 pb-0">Nama Produk</label>
                  </small>
                  <input
                      class="form-control ms-2"
                      type="text"
                      placeholder="Masukkan nama produk"
                      v-model="edit.nama"
                  />
                </div>
              </div>
              <div class="col-sm-4 ms-2">
                <div class="row">
                  <small>
                    <label class="mb-2 pb-0">Harga</label>
                  </small>
                  <input
                      class="form-control ms-2"
                      type="text"
                      placeholder="Masukkan harga produk"
                      v-model="edit.harga"
                  />
                </div>
              </div>
              <div class="col-sm-4 ms-2">
                <div class="row">
                  <small>
                    <label class="mb-2 pb-0">DP</label>
                  </small>
                  <input
                      class="form-control ms-2"
                      type="text"
                      placeholder="Masukkan dp produk"
                      v-model="edit.dp"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-11">
                <div class="row">
                  <small>
                    <label class="mb-2 pb-0">Deskripsi</label>
                  </small>
                  <textarea
                      class="form-control ms-2"
                      type="text"
                      v-model="edit.deskripsi"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-11">
                <div class="row">
                  <small>
                    <label class="pb-0">Image Produk</label>
                  </small>
                  <a class="text-xxs" style="color: red">Gambar Sekarang : {{ edit.image }}</a>
                  <img :src="`http://localhost:1000/produk/`+ edit.image" class="mx-auto d-block w-25" alt="" srcset="">
                  <input type="file" @change="UploadUpdateProduk" ref="UpdateProduk" class="form-control mt-3">
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
import {reactive, ref} from "vue";
import axios from "axios";
import $ from "jquery";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import Swal from "sweetalert2";
import Form from "vform";
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
import router from "@/router";

export default {
  name: "Produk-page",
  setup() {
    //List Kategori
    const produk = ref([])
    const getProduk = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/produk/listforVendor/' + localStorage.getItem('id'), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(response => {
        produk.value = response.data.data
      }).then(() => {
        $('#dataTableProduk').DataTable({
          "columnDefs": [
            { "orderable": false, "targets": 2,}
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
    const detail = reactive({
      nama: "",
      dp: "",
      harga: "",
      deskripsi: "",
      image: ""
    })
    const Detail = (data) => {
      detail.nama = data.nama_produk,
      detail.dp = data.dp,
      detail.harga = data.harga,
      detail.deskripsi = data.deskripsi,
      detail.image = data.image
      new bootstrap.Modal(document.getElementById('DetailProduk')).show();
    }

    //Update
    const edit = reactive({
      nama: "",
      dp: "",
      harga: "",
      deskripsi: "",
      image: "",
      id_produk: "",
      file: []
    })
    const update = new Form({
      nama_produk: "",
      dp: "",
      harga: "",
      deskripsi: "",
      produk: []
    })
    const UploadUpdateProduk = () => {
      edit.file = UpdateProduk.value.files[0]
    }
    const UpdateProduk = ref(null)
    const Edit = (data) => {
      edit.nama = data.nama_produk,
      edit.dp = data.dp,
      edit.harga = data.harga,
      edit.deskripsi = data.deskripsi,
      edit.image = data.image,
      edit.id_produk = data.id_produk
      new bootstrap.Modal(document.getElementById('EditProduk')).show();
    }
    const SaveEdit = () => {
      update.fill({
        nama_produk: edit.nama,
        dp: edit.dp,
        harga: edit.harga,
        deskripsi: edit.deskripsi,
        produk: edit.file
      })
      update.post(process.env.VUE_APP_ROOT_API +'/api/produk/update/' + edit.id_produk, {
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
            UpdateProduk.value = null
            bootstrap.Modal.getInstance(document.getElementById('EditProduk')).hide()
            getProduk()
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

    return{produk, getProduk, convertToRupiah, detail, Detail, update, Edit, SaveEdit, UploadUpdateProduk, edit, UpdateProduk}
  },
  methods: {
    updateActive(id, event) {
      let stat
      if (event.target.checked === false) {
        stat = "0"
      } else if (event.target.checked === true) {
        stat = "1"
      }
      axios.post(process.env.VUE_APP_ROOT_API +'/api/produk/publish/' + id,
          {
            status: stat
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }).then((response) => {
            console.log(response);
      }).catch((err) => {
        console.log(err);
      })
    },
  },
  mounted() {
    this.getProduk()
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
function convertToRupiah(value) {
  value = parseFloat(value)
  let rupiah = ''
  let valueRev = value.toString().split('').reverse().join('')
  for (let i = 0; i < valueRev.length; i++) {
    if (i % 3 === 0) rupiah += `${valueRev.substr(i, 3)}.`
  }

  const rp = rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  if (rupiah === 'NaN.' || rupiah === 'NaN') {
    return '...'
  }
  return `Rp ${rp}`
}
</script>

<style scoped>
@import "../../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
</style>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 17px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>