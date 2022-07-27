<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Daftar Penilaian</a>
        <!--        <h6 class="m-0 font-weight-bold text-primary">Tabel Data Kategori</h6>-->
        <!--        <router-link :to="{ name: 'tambahKategori' }" class="btn btn-success float-end">-->
        <!--          <i class="fas fa-plus fa-sm"></i>&nbsp;-->
        <!--          <span>Tambah Kategori</span>-->
        <!--        </router-link>-->
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTablePenilaian" width="100%" cellspacing="0">
            <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Kegiatan</th>
              <th>Tanggal Pelaksanaan</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(rev, index) in review" :key="rev.id_penilaian">
              <td>{{ ++index }}</td>
              <td>{{ rev.cus.name }}</td>
              <td>{{ rev.judul }}</td>
              <td>{{ ConvertDate(rev.tx.tanggal_res) }}</td>
              <td>
                <span v-if="rev.star === 1" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="rev.star === 2" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="rev.star === 3" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="rev.star === 4" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                <span v-if="rev.star === 5">
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
              </td>
              <td>
                <a @click="Detail(rev)" class="ms-2" style="color: #0b63dc; cursor: pointer">
                  <i class="fas fa-info-circle fa-lg" data-bs-toggle="tooltip" data-bs-placement="top" title="Detail Penilaian"></i>
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
  <div class="modal fade" id="DetailReview" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ detail.customer + " - " + detail.tanggal }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6 float-start">
              <h4 class="mt-2 font-bold float-start">{{ detail.customer }}</h4>
            </div>
            <div class="col-sm-6 float-end">
              <span class="float-end" v-if="detail.rating === 1">
              <i class="fas fa-star" style="color: #FFC107"></i>
            </span>
              <span class="float-end" v-if="detail.rating === 2">
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
            </span>
              <span class="float-end" v-if="detail.rating === 3">
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
            </span>
              <span class="float-end" v-if="detail.rating === 4">
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
            </span>
              <span class="float-end" v-if="detail.rating === 5">
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
              <i class="fas fa-star" style="color: #FFC107"></i>
            </span>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <p>{{ detail.tanggal }} | {{ detail.paket }} | {{ detail.kegiatan }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <p>{{ detail.deskripsi }}</p>
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
import 'datatables.net-bs5/js/dataTables.bootstrap5.min'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "Penilaian-page",
  setup() {
    //List Penilaian
    const review = ref([])
    const getReview = () => {
      return axios.get(process.env.VUE_APP_ROOT_API + '/api/penilaian/list/' + localStorage.getItem("id")).then(response => {
        review.value = response.data.data
      }).then(() => {
        $('#dataTablePenilaian').DataTable({
          "columnDefs": [
            { "orderable": false, "targets": 2,}
          ],
          "retrieve": true
        })
      }).catch((err) => {
        console.error(err)
      })
    }

    //Detail Penilaian
    const detail = reactive({
      customer: "",
      kegiatan: "",
      deskripsi: "",
      rating: "",
      paket: "",
      tanggal: "",
    })
    const Detail = (data) => {
      detail.customer = data.cus.name,
          detail.kegiatan = data.judul,
          detail.deskripsi = data.pesan,
          detail.rating = data.star,
          detail.paket = data.tx.prod.nama_produk
          detail.tanggal = ConvertDate(data.tx.tanggal_res),
      new bootstrap.Modal(document.getElementById('DetailReview')).show();
    }

    return{review, getReview, ConvertDate, detail, Detail}
  },
  mounted() {
    this.getReview()
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