<template>
  <section class="section">
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <a class="h2 text-dark font-bold text-decoration-none">Update Password</a>
      </div>
      <div class="card-body">
        <form @submit.prevent="Update">
          <div class="row mb-3">
            <div class="col-sm-11">
              <div class="row">
                <small>
                  <label class="mb-2 pb-0">Password Lama</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="password"
                    placeholder="Masukkan password lama"
                    v-model="update.opassword"
                />
              </div>
              <div class="row mt-3">
                <small>
                  <label class="mb-2 pb-0">Password Baru</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="password"
                    placeholder="Masukkan password baru"
                    v-model="update.npassword"
                />
              </div>
              <div class="row mt-3">
                <small>
                  <label class="mb-2 pb-0">Konfirmasi Password</label>
                </small>
                <input
                    class="form-control ms-2"
                    type="password"
                    placeholder="Masukkan konfirmasi password"
                    v-model="update.confirm"
                />
              </div>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
          <router-link :to="{ name: 'vendor' }" class="btn btn-danger ms-2">
            Cancel
          </router-link>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "UbahPassword",
  setup() {
    //UpdatePassword
    const update = reactive({opassword: "", npassword: "", confirm: ""})
    const Update = () => {
      if (!!update.opassword && !!update.npassword && !!update.confirm) {
        if (update.confirm === update.npassword){
          axios.post(process.env.VUE_APP_ROOT_API +'/api/user/updatePass/'+ localStorage.getItem('id'), {
            opassword: update.opassword, npassword: update.npassword
          },{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then((response) => {
            if (response.data.status) {
              Swal.fire({
                icon: "success",
                title: "Update Password Berhasil",
                showConfirmButton: false,
                timer: 1500,
              }).then(function () {
                router.push({ name: 'admin' })
              });
            } else {
              Swal.fire('Update Password Gagal', '', 'error')
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
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Confirm Password Salah',
          })
        }
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

    return{update, Update}
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