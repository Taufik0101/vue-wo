<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Transaksi</a>
        <!--        <h6 class="m-0 font-weight-bold text-primary">Tabel Data Kategori</h6>-->
<!--        <router-link :to="{ name: 'tambahKategori' }" class="btn btn-success float-end">-->
<!--          <i class="fas fa-plus fa-sm"></i>&nbsp;-->
<!--          <span>Tambah Kategori</span>-->
<!--        </router-link>-->
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTableTransaksi" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Produk</th>
              <th>Tanggal Pelaksanaan</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(tx, index) in transaksi" :key="tx.id_detail">
              <td>{{ ++index }}</td>
              <td>{{ tx.cus.name }}</td>
              <td>{{ tx.prod.nama_produk }}</td>
              <td>{{ ConvertDate(tx.tanggal_res) }}</td>
              <td>
                <span v-if="tx.status === '2'" class="badge bg-warning">Menunggu Pembayaran</span>
                <span v-if="tx.status === '1'" class="badge bg-info">DP Lunas</span>
                <span v-if="tx.status === '0'" class="badge bg-danger">Dibatalkan</span>
<!--                <span v-if="tx.status === '2'" class="badge bg-success">Pembayaran Selesai</span>-->
              </td>
              <td>
                <a @click="Detail(tx)" class="ms-2" style="color: #0b63dc; cursor: pointer">
                  <i class="fas fa-info-circle fa-lg" data-bs-toggle="tooltip" data-bs-placement="top" title="Detail Transaksi"></i>
                </a>
<!--                <a @click="Edit(kat)" style="color: lightseagreen; cursor: pointer">-->
<!--                  <i class="fas fa-edit fa-sm"></i>-->
<!--                </a>-->
<!--                <a @click="Delete(kat.id_kategori)" class="ms-2" style="color: red; cursor: pointer">-->
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
  <div class="modal fade" id="DetailTransaksi" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ detail.customer + " - " + detail.tanggal }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h6 class="mt-2 font-weight-bolder">Data Customer</h6>
          <div class="row">
            <div class="col-sm-3">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Nama Customer</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.customer"
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
                    v-model="detail.no_hp"
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">
<!--            <div class="col-sm-5">-->
<!--              <div class="row">-->
<!--                <small>-->
<!--                  <label class="mb-2 pb-0">Kota</label>-->
<!--                </small>-->
<!--                <input-->
<!--                    class="form-control ms-2"-->
<!--                    type="text"-->
<!--                    placeholder="-"-->
<!--                    readonly-->
<!--                    v-model="detail.kota"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
            <div class="col-sm-11 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Alamat</label>
                </small>
                <textarea
                    class="form-control ms-2"
                    type="text"
                    readonly
                    v-model="detail.alamat"
                />
              </div>
            </div>
          </div>
          <hr>
          <h6 class="mt-3 font-weight-bolder">Data Pesanan</h6>
          <div class="row">
            <div class="col-sm-3">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Nama Produk</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.produk"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Pax</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.pax"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Total Harga</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="-"
                    readonly
                    v-model="detail.total_harga"
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-3">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Total DP</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="Masukkan nama kota"
                    readonly
                    v-model="detail.total_dp"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Metode Pembayaran</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="text"
                    placeholder="-"
                    readonly
                    v-model="detail.payment_methods"
                />
              </div>
            </div>
            <div class="col-sm-4 ms-2">
              <div class="row ms-2">
                <small>
                  <label class="mb-2 pb-0">Status Pembayaran</label>
                </small>
                <span v-if="detail.status === '2'" class="badge bg-warning w-50">Menunggu Pembayaran</span>
                <span v-if="detail.status === '1'" class="badge bg-info">DP Lunas</span>
                <span v-if="detail.status === '0'" class="badge bg-danger">Dibatalkan</span>
<!--                <span v-if="detail.status === '2'" class="badge bg-success w-50">Pembayaran Selesai</span>-->
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
import {reactive, ref} from "vue";
import axios from "axios";
import $ from "jquery";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "Transaksi-page",
  setup() {
    //List Transaksi
    const transaksi = ref([])
    const getTransaksi = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/transaksi/list/' + localStorage.getItem("id")).then(response => {
        console.log(response)
        transaksi.value = response.data.data
      }).then(() => {
        $('#dataTableTransaksi').DataTable({
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

    //Detail Transaksi
    const detail = reactive({
      customer: "",
      email: "",
      no_hp: "",
      kota: "",
      alamat: "",
      total_dp: "",
      pax: "",
      payment_methods: "",
      produk: "",
      total_harga: "",
      // dp: "",
      // harga_dp: "",
      status: "",
      tanggal: ""
    })
    const Detail = (data) => {
      detail.customer = data.cus.name,
      detail.email = data.cus.email,
      detail.no_hp = "+" + data.cus.no_hp,
          detail.alamat = data.cus.alamat,
          detail.kota = data.cus.kot.nama_kota,
          detail.total_dp = rupiah(data.down_payment),
          detail.pax = data.pax,
          detail.payment_methods = data.payment_methods.toUpperCase(),
          detail.produk = data.prod.nama_produk,
          detail.total_harga = rupiah(data.prod.harga),
          // detail.dp = data.prod.dp,
          // detail.harga_dp = (data.prod.dp/100) * data.prod.harga,
          detail.status = data.status,
          detail.tanggal = ConvertDate(data.tanggal_res)
      new bootstrap.Modal(document.getElementById('DetailTransaksi')).show();
    }

    return{transaksi, getTransaksi, ConvertDate, detail, Detail, rupiah}
  },
  mounted() {
    this.getTransaksi()
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

function rupiah(value) {
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