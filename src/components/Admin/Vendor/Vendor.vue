<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Vendor</a>
        <!--        <h6 class="m-0 font-weight-bold text-primary">Tabel Data Kategori</h6>-->
<!--        <router-link :to="{ name: 'tambahKota' }" class="btn btn-success float-end">-->
<!--          <i class="fas fa-plus fa-sm"></i>&nbsp;-->
<!--          <span>Tambah Kota</span>-->
<!--        </router-link>-->
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTableVendor" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Nama Toko</th>
              <th>Kategori</th>
              <th>Kota</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(ven, index) in vendor" :key="ven.id">
              <td>{{ ++index }}</td>
              <td>{{ ven.name }}</td>
              <td>{{ ven.toko }}</td>
              <td>{{ ven.cat.nama_kategori }}</td>
              <td>{{ ven.kot.nama_kota }}</td>
              <td>
                <a @click="Detail(ven)" style="color: lightseagreen; cursor: pointer">
                  <i class="fas fa-info-circle fa-lg"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="DetailVendor" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ detail.toko }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="`http://localhost:1000/profil/`+ detail.profil" class="mx-auto d-block w-25" alt="" srcset="">
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
                  <label class="mb-2 pb-0">No HP</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.noHp"
                />
              </div>
            </div>
          </div>
          <hr>
          <h6 class="mt-3 font-weight-bolder">Informasi Toko</h6>
          <div class="row">
            <div class="col-sm-3">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Toko</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.toko"
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
                    v-model="detail.kategori"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Kota</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.kota"
                />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm-11">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Alamat</label>
                </small>
                <textarea
                    class="form-control ms-2"
                    readonly
                    v-model="detail.alamat"
                />
              </div>
            </div>
          </div>
          <hr>
          <h6 class="mt-3 font-weight-bolder">Informasi Pembayaran</h6>
          <div class="row">
            <div class="col-sm-5">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Bank 1</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.bank1"
                />
              </div>
            </div>
            <div class="col-sm-6 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Rekening 1</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.rekening1"
                />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm-5">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Bank 2</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.bank2"
                />
              </div>
            </div>
            <div class="col-sm-6 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Rekening 2</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.rekening2"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
<!--          <button type="submit" class="btn btn-primary">Simpan</button>-->
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

export default {
  name: "Vendor-page",
  setup() {
    //List Vendor
    const vendor = ref([])
    const getVendor = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/list').then(response => {
        vendor.value = response.data.data
      }).then(() => {
        $('#dataTableVendor').DataTable({
          "columnDefs": [
            { "orderable": false, "targets": 2 }
          ],
          "retrieve": true
        })
      })
    }

    //Detail Vendor
    const detail = reactive({nama: "", email: "", profil: "", noHp: "", alamat: "", toko: "", kategori: "", kota: "",
    bank1: "", rekening1: "", bank2: "", rekening2: ""})
    const Detail = (data) => {
      detail.nama = data.name, detail.email = data.email, detail.profil = data.profil, detail.noHp = "+"+data.no_hp,
          detail.alamat = data.alamat, detail.toko = data.toko, detail.kategori = data.cat.nama_kategori,
          detail.kota = data.kot.nama_kota, detail.bank1 = data.bank_1.toUpperCase(), detail.rekening1 = data.rekening_1,
          detail.bank2 = data.bank_2.toUpperCase(), detail.rekening2 = data.rekening_2
      new bootstrap.Modal(document.getElementById('DetailVendor')).show();
    }

    return{vendor, getVendor, Detail, detail}
  },
  mounted() {
    this.getVendor()
  }
}
</script>

<style scoped>
@import "../../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
</style>