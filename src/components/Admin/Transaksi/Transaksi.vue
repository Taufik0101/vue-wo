<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Data Transaksi</a>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTableTransaksi" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th class="p-2 text-center" style="font-weight: bold">#</th>
              <th class="p-2 text-center" style="font-weight: bold">Customer</th>
              <th class="p-2 text-center" style="font-weight: bold">Tanggal Transaksi</th>
              <th class="p-2 text-center" style="font-weight: bold">Pembayaran</th>
              <th class="p-2 text-center" style="font-weight: bold">Status</th>
              <th class="p-2 text-center" style="font-weight: bold">Action</th>
              <th class="p-2 text-center" style="font-weight: bold">Penilaian</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, index) in Transaksi" :key="data.id_transaksi">
              <td class="p-2">{{ "TX" + (++index) }}</td>
              <td class="p-2">{{ data.users.name }}</td>
              <td class="p-2">{{ converWaktu(data.CreatedAt) }}</td>
              <td v-if="data.payment_methods !== ''" class="p-2">{{ data.payment_methods.toUpperCase() }}</td>
              <td v-if="data.payment_methods === ''" class="p-2">-</td>
              <td class="p-2">
                    <span v-if="data.status === '2'" class="badge bg-warning">
                      Menunggu Pembayaran
                    </span>
                <span v-if="data.status === '1'" class="badge bg-success">
                      Lunas
                    </span>
                <span v-if="data.status === '0'" class="badge bg-danger">
                      DiBatalkan
                    </span>
              </td>
              <td class="p-2">
                <a @click="DetailTX(data.id_transaksi)" class="badge bg-info text-white text-decoration-none" style="cursor:pointer;">
                  Detail
                </a>
              </td>
              <td class="p-2">
                <span v-if="data.is_review === '' && data.status === '1'" class="badge bg-warning">
                      Belum Review
                </span>
                <span v-else-if="data.status === '2'">
                      -
                </span>
                <span v-else-if="data.is_review === '1'" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="data.is_review === '2'" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="data.is_review === '3'" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="data.is_review === '4'" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="data.is_review === '5'">
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <!-- Modal Detail Transaksi -->
  <div class="modal fade" id="DetailBook" tabindex="-1" aria-labelledby="editBankModal" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Keranjang Anda</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5 class="ml-2 font-weight-bolder">Data Reservasi</h5>
          <div class="row ml-1">
            <div class="col-sm-5" style="font-weight: bold">Alamat</div>
            <div class="col-sm-5" style="font-weight: bold">Tanggal Reservasi</div>
          </div>
          <div class="row ml-1">
            <div class="col-sm-5">{{ alamat }}</div>
            <div class="col-sm-5">{{ converWaktu(tglReservasi) }}</div>
          </div>
          <hr />
          <h5 class="ml-2 font-weight-bolder">Data Produk</h5>
          <table class="table table-borderless">
            <thead>
            <tr>
              <!-- <th scope="col">#</th> -->
              <th scope="col">Vendor</th>
              <th scope="col">Nama Produk</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="data in DetilRiwayat" :key="data.id_detail">
              <!-- <th scope="row">1</th> -->
              <td style="padding-top: .25rem; padding-bottom: .25rem;">{{ data.sell.toko }}</td>
              <td style="padding-top: .25rem; padding-bottom: .25rem;">{{ data.prod.nama_produk }}</td>
              <td style="padding-top: .25rem; padding-bottom: .25rem;">{{ data.pax + " Pax" }}</td>
              <td style="padding-top: .25rem; padding-bottom: .25rem;">{{ convertToTupiah(data.down_payment) }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr style="border-top: 1px solid #c4c4c4;">
              <td colspan="3"></td>
              <td style="font-weight: bold">{{ convertToTupiah(totalTx) }}</td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
import axios from 'axios'
import moment from "moment";
import $ from "jquery";
import Swal from "sweetalert2";
import router from "@/router";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

export default {
  name: "Kategori-page",
  data() {
    return {
      Transaksi: [],
      DetilRiwayat: [],
      totalTx: 0,
      alamat: null,
      tglReservasi: null,
    }
  },
  methods: {
    convertToTupiah(value) {
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
    },
    DetailTX(id) {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/transaksi/riwayatDetilAll/' + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(response => {
        this.DetilRiwayat = response.data.data
        this.totalTx = this.DetilRiwayat[0].tx.total_price
        this.alamat = this.DetilRiwayat[0].alamat
        this.tglReservasi = this.DetilRiwayat[0].tanggal_res
        new bootstrap.Modal(document.getElementById('DetailBook')).show();
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
    },
    converWaktu(value) {
      if (value) {
        return moment(String(value)).format("DD\xa0MMMM\xa0YYYY");
      }
    },
    getTransaksi() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/transaksi/listAll', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(response => {
        this.Transaksi = response.data.data
      }).then(() => {
        $('#dataTableTransaksi').DataTable({
          "columnDefs": [
            { "orderable": false, "targets": 2,}
          ],
          "retrieve": true
        })
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.getTransaksi()
  }
}
</script>

<style scoped>
@import "../../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
/*@import "~simple-datatables/src/style.css";*/
</style>

// new DataTable("#dataTableKategori", {searchable: true, nextPrev: true})