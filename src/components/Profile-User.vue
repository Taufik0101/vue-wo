<template>
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a class="logo d-flex align-items-center">
        <h1>Dream Weddings<span>.</span></h1>
      </a>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          <li v-if="!trueLogin">
            <router-link :to="{ name: 'registerVendor' }" class="text-white p-2 vendor" style="cursor: pointer">Become A Vendor ?</router-link>
          </li>
          <li v-if="!trueLogin">
            <router-link :to="{ name: 'login' }" class="btn text-white btn-block btn-outline-primary p-2">Login</router-link>
          </li>
          <li v-if="!trueLogin">
            <router-link :to="{ name: 'registerUser' }" class="btn text-white btn-block btn-primary p-2">Register</router-link>
          </li>
          <!--          <li><a >Services</a></li>-->
          <!--          <li><a >Projects</a></li>-->
          <!--          <li><a >Blog</a></li>-->
          <li v-if="trueLogin" class="dropdown">
            <a href="#">
              <span>{{ username }}</span>
              <i class="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul>
              <li>
                <router-link :to="{ name: 'profileUser' }">
                  <span>
                    <i class="fas fa-user"></i>&nbsp;Profile
                  </span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'ubahPasswordUser' }">
                  <span>
                    <i class="fas fa-key"></i>&nbsp;Ubah Password
                  </span>
                </router-link>
              </li>
              <li>
                <a @click="showCart" v-if="cart === null" href="#">
                  <span>
                    <i class="fas fa-shopping-cart"></i>&nbsp;Cart (0)
                  </span>
                </a>
                <a @click="showCart" v-else href="#">
                  <span>
                    <i class="fas fa-shopping-cart"></i>&nbsp;Cart ({{ cart.length }})
                  </span>
                </a>
              </li>
              <li>
                <router-link :to="{ name: 'riwayatTransaksi' }">
                  <span>
                    <i class="fas fa-money-bill"></i>&nbsp;Riwayat Transaksi
                  </span>
                </router-link>
              </li>
              <li>
                <a @click="Logout" class="dropdown-item" href="#">
                  <span>
                    <i class="fas fa-sign-out-alt"></i>&nbsp;Logout
                  </span>
                </a>
              </li>
            </ul>
          </li>
          <!--          <li><a >Contact</a></li>-->
        </ul>
      </nav><!-- .navbar -->
    </div>
  </header>

  <main id="main">
    <span>
      <div class="breadcrumbs d-flex align-items-center cadangan">
      <div class="container position-relative d-flex flex-column align-items-center">
        <h2>Profile</h2>
        <ol>
          <li><a style="color: #cccccc; cursor: pointer" @click="Kembali">Home</a></li>
          <li>Profile</li>
        </ol>
      </div>
    </div>
    </span>

    <section id="contact" class="contact" style="padding-top: 30px;">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4 mt-1">
          <div class="col-lg-12">
            <div class="member-img mb-3">
              <img :src="URL+`/profil/`+ local.profile" v-if="local.profile != '' && preview === null" class="mx-auto d-block w-25" alt="" srcset="">
              <img src="@/assets/images/undraw_profile.svg" v-if="local.profile === '' && preview === null" class="mx-auto d-block w-25 rounded-full" alt="" srcset="">
              <img :src="preview" v-if="preview != null" class="mx-auto d-block w-25 rounded-full" alt="" srcset="">
              <div class="text-center mt-2">
                <input type="file" @change="UploadProfile" id="userProfile" style="display: none" ref="Profile" class="w-25 form-control mt-2 mx-auto">
                <label for="userProfile">
                  <a class="btn btn-warning btn-sm mx-auto p-2 text-white">Ubah Gambar</a>
                </label>
              </div>
            </div>
            <form @submit.prevent="Update" role="form" class="php-email-form">
              <h6 class="mt-2" style="font-weight: bold; font-size: 20px">Informasi Pribadi</h6>
              <div class="row gy-4">
                <div class="col-lg-6 form-group">
                  <label style="font-weight: bold">Nama</label>
                  <input type="text" v-model="update.name" name="name" class="form-control" id="name" placeholder="Your Name" required>
                </div>
                <div class="col-lg-6 form-group">
                  <label style="font-weight: bold">Email</label>
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" v-model="update.email" disabled>
                </div>
              </div>
              <div class="form-group">
                <label style="font-weight: bold">No HP</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">+62</span>
                  <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" v-model="update.no_hp" required>
                </div>
              </div>
              <div class="form-group">
                <label style="font-weight: bold">Alamat</label>
                <textarea class="form-control" v-model="update.alamat" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center">
                <button class="btn-sm" type="submit">Update</button>
                <router-link :to="{ name: 'landing.page' }" class="btn btn-danger ms-2">
                  Cancel
                </router-link>
              </div>
            </form>
          </div><!-- End Contact Form -->

        </div>

      </div>
    </section>
  </main>
  <footer id="footer" class="footer">
    <div class="footer-content position-relative">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="footer-info">
              <h3>Dream Weddings</h3>
              <p>
                Jl. Raya Seturan <br>
                Sleman, Yogyakarta<br><br>
                <strong>Phone:</strong> +62 857123124123<br>
                <strong>Email:</strong> dreamswedding06@gmail.com<br>
              </p>
            </div>
          </div><!-- End footer info column-->
          <div class="col-lg-4 col-md-5 footer-links">
            <h4>Category</h4>
            <ul>
              <li v-for="data in kategoriLimit" :key="data.id_kategori">
                <a href="#">{{ data.nama_kategori }}</a>
              </li>
            </ul>
          </div><!-- End footer links column-->
          <div class="col-lg-4 col-md-5 footer-links">
            <h4>Kota</h4>
            <ul>
              <li v-for="data in kotaLimit" :key="data.id_kota">
                <a href="#">{{ data.nama_kota }}</a>
              </li>
            </ul>
          </div><!-- End footer links column-->
        </div>
      </div>
    </div>
    <div class="footer-legal text-center position-relative">
      <div class="container">
        <div class="copyright">
          &copy; Copyright <strong><span>Dream Weddings</span></strong>. All Rights Reserved
        </div>
      </div>
    </div>
  </footer>
  <div class="modal fade" id="cart-wo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Keranjang Anda</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-white">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="alamat" style="font-weight: bold">Alamat:</label>
            </div>
            <div class="col-auto">
              <input
                  class="form-control border-0"
                  id="alamat"
                  type="text"
                  placeholder="Masukkan Alamat"
                  v-model="alamatUser"
              />
            </div>
          </div>
          <h6>
            No. HP: {{ convertHP(hpUser) }}
          </h6>
          <form>
            <table class="table">
              <thead style="background-color: #e0e0e0" v-if="cart.length !== 0">
              <tr>
                <th>Vendor</th>
                <th>Produk</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in cart" :key="item.id" id="cartAgen">
                <!--                  <td scope="row">-->
                <!--                    <input id="checkIDAgenCart" type="checkbox">-->
                <!--                  </td>-->
                <td>{{ item.nama_vendor}}</td>
                <td>{{ item.nama_produk }}</td>
                <td style="width:13%">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend" style="cursor: pointer" @click="kurangQty(index)">
                      <span class="input-group-text">-</span>
                    </div>
                    <input disabled type="number" class="form-control shadow-none text-center" :value="item.quantity">
                    <div class="input-group-append" style="cursor: pointer" @click="addQty(index)">
                      <span class="input-group-text">+</span>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-muted" style="font-weight: bold; font-size: 12px;">Harga: {{ convertToTupiah(item.harga_normal) }},  DP: {{ item.dp }}%</p>
                  <p class="text-muted" style="font-weight: bold; font-size: 12px; margin-top: -15px;">Total: {{ convertToTupiah(convertToDP(item.harga_normal, item.quantity, item.dp)) }}</p>
                </td>
                <td>
                  <i @click="removeItem(index)" class="fas fa-trash" style="cursor: pointer;"></i>
                </td>
              </tr>
              </tbody>
              <tfoot v-if="cart.length !== 0">
              <tr>
                <td>
                </td>
                <td>Tanggal Pelaksanaan: </td>
                <td>
                  <input v-model="tglReserv" type="datetime-local" class="form-control">
                </td>
                <td class="font-weight-bolder">
                  Total Bayar: {{ convertToTupiah(totalBayar) }}
                </td>
                <td style="width: 12.5%">
                  <button @click="Submit" type="submit" class="btn btn-outline-primary">
                    Checkout
                  </button>
                </td>
              </tr>
              </tfoot>
              <tfoot v-else>
              <!-- <tfoot> -->
              <td colspan="6" class="text-center">
                <h4 class="text-center">
                  Wah, Keranjangmu masih kosong, yuk isi dengan produk pilihanmu
                </h4>
                <a class="btn w-25 text-white" style="background-color: var(--color-primary)">Kembali</a>
              </td>
              </tfoot>
            </table>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import 'vue3-carousel/dist/carousel.css';
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import router from "@/router";
import {reactive, ref} from "vue";
import Form from "vform";
export default {
  name: "landings-page",
  setup() {
    //LocalStorager
    const local = reactive({
      trueLogin: localStorage.getItem('trueLogin'),
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      hp: localStorage.getItem('hp'),
      alamat: localStorage.getItem('alamat'),
      toko: localStorage.getItem('toko'),
      profile: localStorage.getItem('profil'),
      rating: localStorage.getItem('rating'),
      bank1: localStorage.getItem('bank1'),
      bank2: localStorage.getItem('bank2'),
      rekening1: localStorage.getItem('rekening1'),
      rekening2: localStorage.getItem('rekening2'),
      kategori: localStorage.getItem('kategori'),
      nama_kota: localStorage.getItem('kota'),
      id_kota: localStorage.getItem('id_kota')
    })

    //GetKota
    // const kota = ref([])
    // const getKota = () => {
    //   return axios.get(process.env.VUE_APP_ROOT_API + '/api/kota/list').then(response => {
    //     kota.value = response.data.data
    //   })
    // }

    //Update
    const update = reactive({
      name: local.name,
      email: local.email,
      no_hp: local.hp,
      alamat: local.alamat,
      toko: local.toko,
      nama_kota: local.nama_kota,
      kota: "",
      kota_baru: "",
      bank_1: local.bank1,
      rekening_1: local.rekening1,
      bank_2: local.bank2,
      rekening_2: local.rekening2,
    })
    const preview = ref(null)
    const updates = new Form({
      name: "",
      email: "",
      no_hp: "",
      alamat: "",
      toko: "",
      kota: "",
      kota_baru: "",
      bank_1: "",
      rekening_1: "",
      bank_2: "",
      rekening_2: "",
      profile: []
    })
    const UploadProfile = () => {
      updates.profile = Profile.value.files[0]
      if (Profile.value && Profile.value.files[0]){
        let reader = new FileReader()
        reader.onload = e => {
          preview.value = e.target.result
        }
        reader.readAsDataURL(Profile.value.files[0])
      }
    }
    const Profile = ref(null)
    const Update = () => {
      var kota
      if (update.kota){
        kota = parseInt(update.kota)
      }else if (local.id_kota != '') {
        kota = local.id_kota
      }else {
        kota = 0
      }
      updates.fill({
        name: update.name,
        email: update.email,
        no_hp: parseInt(update.no_hp),
        alamat: update.alamat,
        toko: update.toko,
        kota: parseInt(kota),
        kota_baru: update.kota_baru,
        bank_1: update.bank_1,
        rekening_1: parseInt(update.rekening_1),
        bank_2: update.bank_2,
        rekening_2: parseInt(update.rekening_2),
        profile: Profile.value.files[0]
      })
      updates.post(process.env.VUE_APP_ROOT_API +'/api/user/update/'+ local.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response)
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "Update Berhasil",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            localStorage.setItem('name', response.data.data.name)
            localStorage.setItem('email', response.data.data.email)
            localStorage.setItem('hp', response.data.data.no_hp)
            localStorage.setItem('alamat', response.data.data.alamat)
            localStorage.setItem('toko', response.data.data.toko)
            localStorage.setItem('profil', response.data.data.profil)
            localStorage.setItem('bank1', response.data.data.bank_1)
            localStorage.setItem('bank2', response.data.data.bank_2)
            localStorage.setItem('rekening1', response.data.data.rekening_1)
            localStorage.setItem('rekening2', response.data.data.rekening_2)
            localStorage.setItem('id_kota', response.data.data.kota)
            localStorage.setItem('kota', response.data.data.kot.nama_kota)
            // router.push({ name: 'vendor' })
            window.location.reload()
          });
        } else {
          Swal.fire('Register Gagal', '', 'error')
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

    //Swap
    const Swap = () => {
      if (document.getElementById('PilihKota').style.display === '') {
        update.kota = ''
        document.getElementById('PilihKota').style.display = 'none'
        document.getElementById('NewKota').style.display = ''
        document.getElementById('button-addon2 cancel').style.display = ''
        document.getElementById('button-addon2 new').style.display = 'none'
      }else if (document.getElementById('PilihKota').style.display === 'none') {
        update.kota_baru = ''
        document.getElementById('PilihKota').style.display = ''
        document.getElementById('NewKota').style.display = 'none'
        document.getElementById('button-addon2 cancel').style.display = 'none'
        document.getElementById('button-addon2 new').style.display = ''
      }
    }

    return{local, preview, Swap, Update, UploadProfile, update, Profile}
  },
  data() {
    return {
      URL: process.env.VUE_APP_ROOT_API,
      alamatUser: localStorage.getItem('alamat'),
      kotaLimit: [],
      kategoriLimit: [],
      hpUser: localStorage.getItem('hp'),
      trueLogin: localStorage.getItem("trueLogin"),
      username: localStorage.getItem("name"),
      isActiveProduct: true,
      isActiveCollection: false,
      isActiveReview: false,
      listCollection: false,
      listDetailCollection: true,
      listProduk: false,
      listDetailProduk: true,
      btnProduct: true,
      btnCollection: false,
      btnReview: false,
      isHideLandingUtama: false,
      isHideLandingSecond: true,
      isHiddenFilter: false,
      detailVendor: true,
      kategori: [],
      kota: [],
      produk: [],
      vendor: [],
      detailSelectedVendor: [],
      productSelectedVendor: [],
      selectedVendorAlbum: [],
      selectedPenilaianVendor: [],
      selectedDetailAlbum: [],
      selectedDetailProduk: null,
      titleSelectedDetailAlbum: "",
      tanggalSelectedDetailAlbum: "",
      filterVendor: [],
      selectedKota: "",
      selectedCategory: "",
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 2,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: 'start',
        },
      },
      settingsKategori: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      breakpointsKategori: {
        // 700px and up
        700: {
          itemsToShow: 2,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 3,
          snapAlign: 'start',
        },
      },
      newQty: 0,
      newDP: 0,
      cart: [],
      totalBayar: 0,
      tglReserv: null
    }
  },
  methods: {
    Kembali() {
      router.push({ name: 'landing.page' })
    },
    Logout() {
      axios.post(process.env.VUE_APP_ROOT_API +'/api/auth/logout', {},{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
      ).then((response) => {
        if (response.data.status) {
          localStorage.clear()
          router.push({ name: 'login' })
        } else {
          Swal.fire('Logout Gagal', '', 'error')
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
        }
      })
    },
    Submit(e) {
      e.preventDefault()
      if (this.tglReserv !== null) {
        axios.post(process.env.VUE_APP_ROOT_API +'/api/transaksi/add', {
              id: localStorage.getItem('id'),
              cart: this.cart,
              totalHarga: this.totalBayar,
              tgl: this.tglReserv.toString(),
              alamat: this.alamatUser,
              email: localStorage.getItem("email")
            },{
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
        ).then((response) => {
          if (response.data.status) {
            localStorage.removeItem('cart')
            Swal.fire({
              icon: "success",
              title: "Checkout Berhasil",
              showConfirmButton: false,
              toast: true,
              timer: 1500,
              position: 'top-end',
            }).then(function () {
              // this.getCart()
              bootstrap.Modal.getInstance(document.getElementById('cart-wo')).hide()
              // window.location.href = "/"
              // router.push({ name: 'kategori' })
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
              title: 'Checkout Gagal',
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
              title: 'Checkout Gagal',
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
          text: 'Anda Belum Mengisi Tanggal Pelaksanaan'
        })
      }
    },
    showCart() {
      this.getCart()
      new bootstrap.Modal(document.getElementById('cart-wo')).show();
    },
    detailCollection(data, name, tanggal) {
      this.titleSelectedDetailAlbum = name
      this.tanggalSelectedDetailAlbum = tanggal
      axios.get(process.env.VUE_APP_ROOT_API + '/api/koleksi/list/' + data).then(response => {
        this.selectedDetailAlbum = response.data.data
      })
      new bootstrap.Modal(document.getElementById('detail-album')).show();
    },
    getCart() {
      const data = JSON.parse(localStorage.getItem('cart'))
      if (data !== null) {
        if (data.length === 0) {
          this.cart = []
        } else  {
          this.cart = data
          const totalPrice = data.reduce((a, b) => a + (((parseInt(b.dp)/100) * (parseInt(b.harga_normal) * parseInt(b.quantity)))), 0)
          this.totalBayar = totalPrice
        }
      }
    },
    convertToDP(price, qty, dp) {
      let data = (((dp/100) * (price*qty)))
      return data
    },
    addToCart1(data) {
      if (this.trueLogin) {
        const cart = localStorage.getItem('cart')
        if (cart === null) {
          const value = []
          value.push({
            id_produk: data.id_produk.toString(),
            id_seller: data.users.id.toString(),
            harga_normal: data.harga.toString(),
            dp: data.dp.toString(),
            nama_vendor: data.users.toko,
            nama_produk: data.nama_produk,
            quantity: this.newQty.toString()
          })
          localStorage.setItem('cart', JSON.stringify(value))
        } else {
          const oldData = JSON.parse(cart)
          let index = oldData.findIndex(p => p.id_produk === data.id_produk.toString());
          if (index === -1) {
            oldData.push({
              id_produk: data.id_produk.toString(),
              id_seller: data.users.id.toString(),
              harga_normal: data.harga.toString(),
              dp: data.dp.toString(),
              nama_vendor: data.users.toko,
              nama_produk: data.nama_produk,
              quantity: this.newQty.toString()
            })
          } else {
            oldData[index].quantity = (parseInt(oldData[index].quantity) + parseInt(this.newQty)).toString()
          }
          localStorage.setItem('cart', JSON.stringify(oldData))
        }
        this.newQty = 0
        this.newDP = 0
        this.getCart()
        Swal.fire({
          icon: "success",
          toast: true,
          position: 'top-end',
          timerProgressBar: true,
          title: "Produk Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {
          bootstrap.Modal.getInstance(document.getElementById('detail-produk')).hide()
        });
        // Swal.fire('Ditambahkan', 'Berhasil menambah kamar ke keranjang', 'success')
      } else {
        Swal.fire('Anda Belum Login', '', 'error')
      }
    },
    removeItem(index) {
      const cart = localStorage.getItem('cart')
      const oldData = JSON.parse(cart)
      oldData.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(oldData))
      this.getCart()
    },
    countQty(price, dp) {
      this.newDP = (((dp/100) * (price*this.newQty)))
    },
    tambahQty(price, dp) {
      this.newQty++
      this.newDP = (((dp/100) * (price*this.newQty)))
    },
    kurangiQty(price, dp) {
      if (this.newQty <= 0) {
        return null
      }
      this.newQty--
      this.newDP = (((dp/100) * (price*this.newQty)))
    },
    DetailProduk(data) {
      this.newQty = 0
      this.newDP = 0
      this.selectedDetailProduk = data
      new bootstrap.Modal(document.getElementById('detail-produk')).show();
    },
    convertHP(data) {
      if (data !== null) {
        if (data.toString().charAt(0) === '6' && data.toString().charAt(1) === '2') {
          let akhir = '+' + data.toString();
          return akhir
        } else if (data.toString().charAt(0) === '0') {
          let str = data.toString().split('');
          str[0] = '+62';
          return str.join('')
        } else {
          return data
        }
      }
    },
    Change(data, id) {
      if (data === 'product') {
        this.isActiveProduct = true
        this.isActiveReview = false
        this.isActiveCollection = false
        this.btnProduct = true
        this.btnReview = false
        this.btnCollection = false
        this.listProduk = false
        this.listDetailProduk = true
        axios.get(process.env.VUE_APP_ROOT_API + '/api/produk/list/' + id).then(response => {
          this.productSelectedVendor = response.data.data
        })
      } else if (data === 'collection') {
        this.isActiveProduct = false
        this.isActiveReview = false
        this.isActiveCollection = true
        this.btnProduct = false
        this.btnReview = false
        this.btnCollection = true
        this.listCollection = false
        this.listDetailCollection = true
        axios.get(process.env.VUE_APP_ROOT_API + '/api/album/list/' + id).then(response => {
          this.selectedVendorAlbum = response.data.data
        })
      } else if (data === 'review') {
        this.isActiveProduct = false
        this.isActiveReview = true
        this.isActiveCollection = false
        this.btnProduct = false
        this.btnReview = true
        this.btnCollection = false
        axios.get(process.env.VUE_APP_ROOT_API + '/api/penilaian/list/' + id).then(response => {
          this.selectedPenilaianVendor = response.data.data
        })
      }
    },
    converWaktu(value) {
      if (value) {
        return moment(String(value)).format("DD\xa0MMMM\xa0YYYY");
      }
    },
    fetchVendor(data) {
      this.Change('product', data.id)
      this.detailSelectedVendor = data
      this.isHiddenFilter = true
      this.detailVendor = false
    },
    findVendor(data) {
      this.isHideLandingUtama = true
      this.isHideLandingSecond = false

      axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/filterKategori/' + data).then(response => {
        this.filterVendor = response.data.data
      })
    },
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
    getKategori() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/kategori/list').then(response => {
        this.kategori = response.data.data

        for (let i = 0; i < 5; i++) {
          this.kategoriLimit.push(this.kategori[i])
        }
      })
    },
    getProduk() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/produk/listRandom').then(response => {
        this.produk = response.data.data
      })
    },
    getVendor() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/list').then(response => {
        this.vendor = response.data.data
      })
    },
    getKota() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/kota/list').then(response => {
        this.kota = response.data.data

        if (this.kota.length < 5) {
          for (let i = 0; i < this.kota.length; i++) {
            this.kotaLimit.push(this.kota[i])
          }
        } else {
          for (let i = 0; i < 5; i++) {
            this.kotaLimit.push(this.kota[i])
          }
        }
      })
    },
    Cari() {
      if (this.selectedKota === "" && this.selectedCategory) {
        axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/filterKategori/' + this.selectedCategory).then(response => {
          this.filterVendor = response.data.data
        })
      } else if (this.selectedCategory === "" && this.selectedKota) {
        axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/filterKota/' + this.selectedKota).then(response => {
          this.filterVendor = response.data.data
        })
      } else if (this.selectedCategory && this.selectedKota) {
        const params = this.selectedCategory + '-' + this.selectedKota
        axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/filterKC/' + params).then(response => {
          this.filterVendor = response.data.data
        })
      }
      this.isHideLandingUtama = true
      this.isHideLandingSecond = false
    },
  },
  mounted() {
    this.getKategori()
    this.getKota()
    this.getProduk()
    this.getVendor()
    this.getCart()
  }
}
</script>

<style scoped>
@import "../assets/Landing/css/main.css";

.jumbotron {
  background-image: url("../assets/images/img_bg_1.jpg");
}
.jumbotron-1 {
  background-image: url("../assets/images/img_bg_2.jpg");
}
.jumbotron-2 {
  background-image: url("../assets/images/img_bg_3.jpg");
}
.jumbotron-3 {
  background-image: url("../assets/images/img_bg_4.jpg");
}
.jumbotron-4 {
  background-image: url("../assets/images/img_bg_5.jpg");
}
.cadangan {
  background-image: url("../assets/images/gallery-2.jpg");
}
</style>