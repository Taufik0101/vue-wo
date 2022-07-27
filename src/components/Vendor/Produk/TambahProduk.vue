<template>
  <h1>Tambah Produk</h1>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
      </div>
      <div class="card-body">
        <form @submit.prevent="Submit">
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
                    v-model="tambah.nama"
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
                    placeholder="Masukkan harga produk per PCS/Porsi/Paket"
                    v-model="tambah.harga"
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
                    v-model="tambah.dp"
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
                    v-model="tambah.deskripsi"
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
                <input type="file" @change="UploadNewProduk" ref="AddProduk" class="form-control ms-2 mt-2 mb-2">
              </div>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Submit Data</button>
          <!--          <button class="btn btn-danger ms-2">Cancel</button>-->
          <router-link :to="{ name: 'produk' }" class="btn btn-danger ms-2">
            Cancel
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {reactive, ref} from "vue";
// import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import Form from "vform";

export default {
  name: "TambahProduk",
  setup() {
    //Tambah Kategori
    const tambah = reactive({
      nama: "",
      dp: "",
      harga: "",
      deskripsi: "",
      image: "",
      id_produk: "",
      file: []
    })
    const add = new Form({
      nama_produk: "",
      dp: "",
      harga: "",
      deskripsi: "",
      produk: [],
      seller: ""
    })
    const UploadNewProduk = () => {
      tambah.file = AddProduk.value.files[0]
    }
    const AddProduk = ref(null)
    const Submit = () => {
      add.fill({
        nama_produk: tambah.nama,
        dp: tambah.dp,
        harga: tambah.harga,
        deskripsi: tambah.deskripsi,
        produk: tambah.file,
        seller: localStorage.getItem("id")
      })
      let beforeSubmit = Object.values(add.data())
      let countError = 0
      beforeSubmit.map(items => {
        if (items === "" || items.length === 0) {
          countError++
        }
      })
      if (countError === 0) {
        add.post(process.env.VUE_APP_ROOT_API +'/api/produk/add',{
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
        ).then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Data berhasil ditambahkan",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              router.push({ name: 'produk' })
            });
          } else {
            Swal.fire('Data gagal ditambahkan', '', 'error')
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
              title: 'Tambah Data Produk Gagal',
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
              title: 'Tambah Data Produk Gagal',
              text: 'Terjadi Kesalahan'
            })
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          toast: true,
          timer: 3000,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          title: 'Terjadi kesalahan',
          text: 'Data Belum Lengkap'
        })
      }
    }

    return{tambah, Submit, AddProduk, add, UploadNewProduk}
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