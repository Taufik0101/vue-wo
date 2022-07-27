<template>
  <h1>Tambah Koleksi</h1>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
      </div>
      <div class="card-body">
        <form @submit.prevent="Submit">
          <div class="row">
            <div class="col-md col-12">
              <div class="form-group">
                <label>Image Koleksi Project</label>
                <img :src="preview" v-if="preview != null" class="mx-auto d-block w-50" alt="" srcset="">
                <input type="file" @change="AddImage" ref="ImageKoleksi" class="form-control mt-3">
              </div>
            </div>
          </diV>
          <button class="btn btn-primary" type="submit">Submit Data</button>
          <!--          <button class="btn btn-danger ms-2">Cancel</button>-->
          <router-link :to="{ name: 'collection', params: { slug: params } }" class="btn btn-danger ms-2">
            Cancel
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {useRoute} from "vue-router";
import {ref} from "vue";
import Form from "vform";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "TambahCollection",
  setup() {
    //Get Parameter
    const path = useRoute()
    const params = path.params.slug

    //Tambah Koleksi
    const preview = ref(null)
    const tambah = new Form({id_album: params, album: []})
    const AddImage = () => {
      tambah.album = ImageKoleksi.value.files[0]
      if (ImageKoleksi.value && ImageKoleksi.value.files[0]){
        let reader = new FileReader()
        reader.onload = e => {
          preview.value = e.target.result
        }
        reader.readAsDataURL(ImageKoleksi.value.files[0])
      }
    }
    const ImageKoleksi = ref(null)
    const Submit = () => {
      let beforeSubmit = Object.values(tambah.data())
      let countError = 0
      beforeSubmit.map(items => {
        if (items === "" || items.length === 0) {
          countError++
        }
      })
      if (countError === 0) {
        tambah.post(process.env.VUE_APP_ROOT_API +'/api/koleksi/add', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Tambah Data Berhasil",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              router.push({path: "/vendor/collection/" + params})
            });
          } else {
            Swal.fire('Tambah Data Gagal', '', 'error')
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
              title: 'Tambah Data Koleksi Album Gagal',
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
              title: 'Tambah Data Koleksi Album Gagal',
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

    return{path, params, preview, tambah, AddImage, ImageKoleksi, Submit}
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