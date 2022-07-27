<template>
<!--<h1>Dashboard</h1>-->
<!--<h2 class="mt-4">Selamat Datang Admin</h2>-->
  <div class="page-title">
    <h3>Dashboard</h3>
    <p class="text-subtitle text-muted">Statistik</p>
  </div>
  <section class="section">
    <table class="row" style="width: 100%;">
      <tr style="width: 100%; display: flex; flex-wrap: wrap; background-color: transparent;">
        <td class="p-2" style="width: 20%; align-items: start">
          <div class="card text-center bg-secondary">
            <div class="card-content">
              <div class="card-body">
                <h2 class="card-title font-bold text-white">Request Account</h2>
                <p v-if="Request.length === 0" class="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else class="card-text text-white" style="font-size: 20px;">{{ Request.length }}</p>
              </div>
            </div>
          </div>
        </td>
        <td class="p-2" style="width: 20%; align-items: start">
          <div class="card text-center bg-secondary">
            <div class="card-content">
              <div class="card-body">
                <h2 class="card-title font-bold text-white">Vendor</h2>
                <p v-if="Vendor.length === 0" class="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else class="card-text text-white" style="font-size: 20px;">{{ Vendor.length }}</p>
              </div>
            </div>
          </div>
        </td>
        <td class="p-2" style="width: 20%; align-items: start">
          <div class="card text-center bg-secondary">
            <div class="card-content">
              <div class="card-body">
                <h2 class="card-title font-bold text-white">Kategori</h2>
                <p v-if="Kategori.length === 0" class="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else class="card-text text-white" style="font-size: 20px;">{{ Kategori.length }}</p>
              </div>
            </div>
          </div>
        </td>
        <td class="p-2" style="width: 20%; align-items: start">
          <div class="card text-center bg-secondary">
            <div class="card-content">
              <div class="card-body">
                <h2 class="card-title font-bold text-white">Kota</h2>
                <p v-if="Kota.length === 0" class="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else class="card-text text-white" style="font-size: 20px;">{{ Kota.length }}</p>
              </div>
            </div>
          </div>
        </td>
        <td class="p-2" style="width: 20%; align-items: start">
          <div class="card text-center bg-secondary">
            <div class="card-content">
              <div class="card-body">
                <h2 class="card-title font-bold text-white">Transaksi</h2>
                <p v-if="Transaksi.length === 0" class="card-text text-white" style="font-size: 20px;">-</p>
                <p v-else class="card-text text-white" style="font-size: 20px;">{{ Transaksi.length }}</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h4>Grafik Request Account</h4>
          </div>
          <div class="card-body">
            <div id="chartRequest"></div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h4>Grafik Transaksi</h4>
          </div>
          <div class="card-body">
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

export default {
  name: "Dashboard-page",
  data() {
    return {
      Request: [],
      Vendor: [],
      Kategori: [],
      Kota: [],
      Transaksi: [],
      chartTransaksiOptions: {},
      seriesTransaksi: [],
    }
  },
  methods: {
    getRequest() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/request/list',{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(response => {
        this.Request = response.data.data

        this.Request.map(item => {
          Object.assign(item, {tgl_baru: moment(String(item.CreatedAt)).format("DD\xa0MMMM\xa0YYYY")});
        })

        const uniqBy = _.uniqBy(this.Request, 'tgl_baru');

        const Status = []
        // const Total = []
        const Diterima = []
        const Ditolak = []
        uniqBy.map(items => {
          // let lok = this.Request.filter((vals) => vals.tgl_baru === items.tgl_baru)
          Status.push(items.tgl_baru)
          // Total.push(lok.length)
          let lokTerima = this.Request.filter((vals) => vals.tgl_baru === items.tgl_baru && vals.status === '1')
          Diterima.push(lokTerima.length)

          let lokTolak = this.Request.filter((vals) => vals.tgl_baru === items.tgl_baru && vals.status === '0')
          Ditolak.push(lokTolak.length)
        })

        const options = {
          chart: {
            type: 'area',
            stroke: {
              curve: 'smooth',
            }
          },
          series: [{
            name: 'Diterima',
            data: Diterima
          },{
            name: 'Ditolak',
            data: Ditolak
          }],
          xaxis: {
            categories: Status
          }
        }

        const chart = new ApexCharts(document.querySelector("#chartRequest"), options);

        chart.render();
      })
    },
    getVendor() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/list').then(response => {
        this.Vendor = response.data.data
      })
    },
    getKota() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/kota/list').then(response => {
        this.Kota = response.data.data
      })
    },
    getKategori() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/kategori/list').then(response => {
        this.Kategori = response.data.data
      })
    },
    getTransaksi() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/transaksi/listAll',{
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
        // this.seriesTransaksi = Total
      })
    }
  },
  mounted() {
    this.getRequest()
    this.getVendor()
    this.getKota()
    this.getKategori()
    this.getTransaksi()
  }
}
</script>

<style scoped>
</style>