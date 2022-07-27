<template>
  <!--<h1>Dashboard</h1>-->
  <!--<h2 class="mt-4">Selamat Datang Admin</h2>-->
  <div className="page-title">
    <h3>Dashboard</h3>
    <p className="text-subtitle text-muted">Statistik</p>
  </div>
  <section className="section">
    <table className="row" style="width: 100%;">
      <tr style="width: 100%; display: flex; flex-wrap: wrap; background-color: transparent;">
        <td className="p-2" style="width: 25%; align-items: start">
          <div className="card text-center bg-secondary">
            <div className="card-content">
              <div className="card-body">
                <h2 className="card-title font-bold text-white">Produk</h2>
                <p v-if="Produk.length === 0" className="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else className="card-text text-white" style="font-size: 20px;">{{ Produk.length }}</p>
              </div>
            </div>
          </div>
        </td>
        <td className="p-2" style="width: 25%; align-items: start">
          <div className="card text-center bg-secondary">
            <div className="card-content">
              <div className="card-body">
                <h2 className="card-title font-bold text-white">Album</h2>
                <p v-if="Album.length === 0" className="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else className="card-text text-white" style="font-size: 20px;">{{ Album.length }}</p>
              </div>
            </div>
          </div>
        </td>
        <td className="p-2" style="width: 25%; align-items: start">
          <div className="card text-center bg-secondary">
            <div className="card-content">
              <div className="card-body">
                <h2 className="card-title font-bold text-white">Review</h2>
                <p v-if="Review === 0" className="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else className="card-text text-white" style="font-size: 20px;">
<!--                  {{ Review }}-->
                  <span class="text-center" v-if="Review === Math.fround(0)">
                    -
                  </span>
                  <span class="text-center" v-else-if="Review > Math.fround(0) && Review < Math.fround(1.0)">
                    <i class="fas fa-star-half" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review === Math.fround(1.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review > Math.fround(1.0) && Review < Math.fround(2.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star-half" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review === Math.fround(2.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review > Math.fround(2.0) && Review < Math.fround(3.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star-half" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review === Math.fround(3.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review > Math.fround(3.0) && Review < Math.fround(4.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star-half" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review === Math.fround(4.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review > Math.fround(4.0) && Review < Math.fround(5.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star-half" style="color: #FFC107"></i>
                  </span>
                  <span class="text-center" v-else-if="Review === Math.fround(5.0)">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </td>
        <td className="p-2" style="width: 25%; align-items: start">
          <div className="card text-center bg-secondary">
            <div className="card-content">
              <div className="card-body">
                <h2 className="card-title font-bold text-white">Transaksi</h2>
                <p v-if="Transaksi.length === 0" className="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else className="card-text text-white" style="font-size: 20px;">{{ Transaksi.length }}</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h4>Grafik Produk Terlaris</h4>
          </div>
          <div className="card-body">
            <div id="chartProdukTerlaris"></div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h4>Grafik Transaksi</h4>
          </div>
          <div className="card-body">
            <!--            <div id="area"></div>-->
            <div id="chartTransaksi"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import * as ApexCharts from "apexcharts";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "Dashboard-page",
  data() {
    return {
      Produk: [],
      Album: [],
      Review: 0,
      Transaksi: [],
      chartTransaksiOptions: {},
      seriesTransaksi: [],
    }
  },
  methods: {
    getProduk() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/produk/listforVendor/' + localStorage.getItem('id'), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(response => {
        this.Produk = response.data.data
      })
    },
    getAlbum() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/album/list/' + localStorage.getItem('id')).then(response => {
        this.Album = response.data.data
      })
    },
    getPenilaian() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/penilaian/list/' + localStorage.getItem("id")).then(response => {
        const Rev = response.data.data

        if (Rev.length === 0) {
          this.Review = 0
        } else {
          let RataanReview = Rev.reduce((val, element) => {
            return val + element.star
          }, 0)

          this.Review = parseFloat((RataanReview / Rev.length).toFixed(1))
        }
      })
    },
    getTransaksi() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/transaksi/list/' + localStorage.getItem("id"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(response => {
        this.Transaksi = response.data.data

        this.Transaksi.map(item => {
          Object.assign(item, {tgl_baru: moment(String(item.CreatedAt)).format("DD\xa0MMMM\xa0YYYY")});
        })

        const uniqBy = _.uniqBy(this.Transaksi, 'tgl_baru');

        const Status = []
        // const Total = []
        const TotalLunas = []
        const TotalWait = []
        const TotalBatal = []
        uniqBy.map(items => {
          // let lok = this.Transaksi.filter((vals) => vals.tgl_baru === items.tgl_baru)
          Status.push(items.tgl_baru)
          // Total.push(lok.length)
          let lokLunas = this.Transaksi.filter((vals) => vals.tgl_baru === items.tgl_baru && vals.status === '1')
          TotalLunas.push(lokLunas.length)

          let lokWait = this.Transaksi.filter((vals) => vals.tgl_baru === items.tgl_baru && vals.status === '2')
          TotalWait.push(lokWait.length)

          let lokBatal = this.Transaksi.filter((vals) => vals.tgl_baru === items.tgl_baru && vals.status === '0')
          TotalBatal.push(lokBatal.length)
        })

        const options = {
          chart: {
            type: 'area',
            stroke: {
              curve: 'smooth',
            }
          },
          series: [{
            name: 'Transaksi Lunas',
            data: TotalLunas
          }, {
            name: 'Transaksi Menunggu Pembayaran',
            data: TotalWait
          },{
            name: 'Transaksi Dibatalkan',
            data: TotalBatal
          }],
          xaxis: {
            categories: Status
          }
        }

        const chart = new ApexCharts(document.querySelector("#chartTransaksi"), options);

        chart.render();

        const Lunas = this.Transaksi.filter((val) => val.status === '1')

        const uniqByProduk = _.uniqBy(Lunas, 'produk');

        const NamaProduk = []
        // const IDProduk = []
        const Laku = []
        const All = []
        uniqByProduk.map(items => {
          let lok = Lunas.filter((vals) => vals.produk === items.produk)
          All.push({id_produk: items.produk, nama_produk: items.prod.nama_produk, jml_laku: lok.length})
        })

        All.sort(function (a, b) {
          return b.jml_laku - a.jml_laku;
        });

        const AllLimit = []

        if (All.length < 5) {
          for (let i = 0; i < All.length; i++) {
            AllLimit.push(All[i])
          }
        } else {
          for (let i = 0; i < 5; i++) {
            AllLimit.push(All[i])
          }
        }

        AllLimit.map(item => {
          NamaProduk.push(item.nama_produk)
          Laku.push(item.jml_laku)
        })

        const optionsProdukLaku = {
          series: [{
            data: Laku
          }],
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: NamaProduk
          }
        };

        const chartProdukLaku = new ApexCharts(document.querySelector("#chartProdukTerlaris"), optionsProdukLaku);
        chartProdukLaku.render();


        // this.seriesTransaksi = Total
      })
    }
  },
  mounted() {
    this.getProduk()
    this.getAlbum()
    this.getPenilaian()
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
</script>

<style scoped>
</style>