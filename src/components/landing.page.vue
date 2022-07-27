<template>
  <section :hidden="isHideLandingUtama">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <!--      <a class="navbar-brand" href="#">Hotel</a>-->
        <a class="text-decoration-none brands" style="cursor: pointer">Dream Weddings<strong>.</strong></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="!trueLogin" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'registerVendor' }" class="nav-link nav-item become text-decoration-none" style="cursor:pointer;">
                Becomer A Vendor ?
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" id="btnL" class="nav-item btn btn-primary btn-login text-white me-2">
                Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'registerUser' }" id="btnR" class="nav-item btn btn-outline-primary btn-register">
                Register
              </router-link>
            </li>
          </ul>
        </div>
        <div v-if="trueLogin" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <div class="dropdown">
                <a class="btn text-white" style="background-color: transparent;" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ username }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <router-link :to="{ name: 'profileUser' }" class="dropdown-item">
                    <i data-feather="user"></i>Profile
                  </router-link>
                  <router-link :to="{ name: 'ubahPasswordUser' }" class="dropdown-item">
                    <i data-feather="key"></i>Ubah Password
                  </router-link>
                  <li>
                    <a @click="showCart" v-if="cart === null" class="dropdown-item" href="#">Cart (0)</a>
                    <a @click="showCart" v-else class="dropdown-item" href="#">Cart ({{ cart.length }})</a>
                  </li>
                  <router-link :to="{ name: 'riwayatTransaksi' }" class="dropdown-item">
                    <i data-feather="key"></i>Riwayat Transaksi
                  </router-link>
                  <li><a @click="Logout" class="dropdown-item" href="#">Logout</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Hello !</h1>
        <h3>Find Your Dream Wedding Partner or Create Your Dream Wedding in Here</h3>
        <br />
        <!--       <a href="#" class="btn btn-primary">Daftar Sekarang</a>-->
      </div>
    </div>
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 info-panel">
          <!-- Tab panes -->
          <div class="row">
            <div class="col-sm-5 mt-2">
              <select class="form-control" v-model="selectedKota">
                <option selected value="">Pilih Kota</option>
                <option v-for="datas in kota" :key="datas.i_kota" :value="datas.id_kota">{{ datas.nama_kota }}</option>
              </select>
            </div>
            <div class="col-sm-5 mt-2">
              <select class="form-control" v-model="selectedCategory">
                <option selected value="">Pilih Kategori</option>
                <option v-for="data in kategori" :key="data.id" :value="data.id_kategori">{{ data.nama_kategori }}</option>
              </select>
            </div>
            <div class="col-sm-2 mt-2">
              <a class="btn btn-primary w-100" @click="Cari">Cari</a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="row workingspace">
          <h5>Browse by Category</h5>
          <div class="col-lg-12">
            <Carousel :settings="settingsKategori" :breakpoints="breakpointsKategori" :wrap-around="true">
              <Slide v-for="slide in kategori" :key="slide.id_kategori" style="padding: 10px">
                <div @click="findVendor(slide.id_kategori)" class="card" style="width: 30rem; cursor:pointer;">
                  <div class="card-body">
                    <h5 class="card-title">{{ slide.nama_kategori }}</h5>
                  </div>
                </div>
              </Slide>
            </Carousel>
          </div>
        </div>
        <div class="row workingspace">
          <h5>Recommendation</h5>
          <div class="col-lg-12">
            <Carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
              <Slide v-for="slide in produk" :key="slide.id_produk" style="padding: 5px">
                <div @click="DetailProdukAnother(slide)" class="card card-outline" style="min-height: 320px !important; min-width: 200px !important; margin-bottom: 0px;">
                  <div class="card-body box-profile" style="cursor: pointer; margin-bottom: 0px; padding: 16px 8px 8px 8px;" @click="findProduk">
                    <div class="text-center" style="margin-top: 8px;">
                      <img v-if="slide.image" :src="`http://localhost:1000/produk/`+ slide.image"
                           alt="User profile picture"
                           class="profile-user-img img-fluid"
                           style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                    </div>
                    <div style="min-height: 36px">
                      <h6 class="text-center" style="margin-bottom: 2px; margin-top: 5px; font-weight: bold;">{{ slide.nama_produk }}</h6>
                    </div>
                    <p v-if="slide.users.toko !== ''" class="text-muted text-center" style="margin-bottom: 2px; font-size: 14px;">By {{ slide.users.toko }}</p>
                    <p v-else class="text-muted text-center" style="margin-bottom: 2px; font-size: 14px;">By Unnamed</p>
                    <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">{{ convertToTupiah(slide.harga) }}</p>
                  </div>
                </div>
              </Slide>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
    <footer class="container-fluid" style="min-height: 200px !important; background-color: #C4C4C4;">
      <div class="row pt-5 justify-content-center">
        <div class="col-lg-2 col-md-2 col-sm-2 text-center">
          <img alt="User profile picture" class="bg-white p-2" style="width: 4rem; border-radius: 50%"
               src="../assets/images/Category.jpg">
          <p class="mt-2">{{ kategori.length }} Category</p>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 text-center">
          <img alt="User profile picture" style="width: 4rem; border-radius: 50%"
               src="../assets/images/City.png">
          <p class="mt-2">{{ kota.length }} Kota</p>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 text-center">
          <img alt="User profile picture" style="width: 4rem; border-radius: 50%"
               src="../assets/images/Vendors.jpg">
          <p class="mt-2">{{ vendor.length }} Vendor</p>
        </div>
      </div>
    </footer>
    <footer class="container-fluid bg-secondary" style="min-height: 200px !important">
      <div class="row pt-5 justify-content-center">
        <div class="col-lg-3 col-md-3 col-sm-3">
          <h5>Dreams Wedding</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3">
          <h5>Address</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3">
          <h5>Contact Us</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <hr class="dropdown-divider" style="min-height: 3px; color: black">
        <div class="col-lg-9 mb-3">
          Copyright © 2022 App Name™. All rights reserved
        </div>
      </div>
    </footer>
  </section>
  <section :hidden="isHideLandingSecond">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <!--      <a class="navbar-brand" href="#">Hotel</a>-->
        <a @click="BckToHome" class="text-decoration-none brands" style="cursor: pointer">Dream Weddings<strong>.</strong></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul v-if="!trueLogin" class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'registerVendor' }" class="nav-item btn btn-white text-dark me-2">
                Becomer A Vendor ?
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" id="btnL" class="nav-item btn btn-primary btn-login text-white me-2">
                Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'registerUser' }" id="btnR" class="nav-item btn btn-outline-primary btn-register text-dark">
                Register
              </router-link>
            </li>
          </ul>
          <ul v-if="trueLogin" class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <div class="dropdown">
                <a class="btn text-dark" style="background-color: transparent;" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ username }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <router-link :to="{ name: 'profileUser' }" class="dropdown-item">
                    <i data-feather="user"></i>Profile
                  </router-link>
                  <router-link :to="{ name: 'ubahPasswordUser' }" class="dropdown-item">
                    <i data-feather="key"></i>Ubah Password
                  </router-link>
                  <li>
                    <a @click="showCart" v-if="cart === null" class="dropdown-item" href="#">Cart (0)</a>
                    <a @click="showCart" v-else class="dropdown-item" href="#">Cart ({{ cart.length }})</a>
                  </li>
                  <router-link :to="{ name: 'riwayatTransaksi' }" class="dropdown-item">
                    <i data-feather="key"></i>Riwayat Transaksi
                  </router-link>
                  <li>
                    <a @click="Logout" class="dropdown-item" href="#">Logout</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <center>
      <div class="col-md-9 justify-content-center">
        <img src="../assets/images/gallery-1-ureq.png" style="max-height: 50vh; width: 100%; border-radius: 10px">
      </div>
    </center>
    <section :hidden="isHiddenFilter">
      <div class="container-fluid mb-3">
        <div class="row">
          <div class="col-lg-3 mt-2">
            <div class="card">
              <div class="card-body">
                <div class="mt-2">
                  <select class="form-control" v-model="selectedKota">
                    <option selected value="">Pilih Kota</option>
                    <option v-for="datas in kota" :key="datas.i_kota" :value="datas.id_kota">{{ datas.nama_kota }}</option>
                  </select>
                </div>
                <div class="mt-2">
                  <select class="form-control" v-model="selectedCategory">
                    <option selected value="">Pilih Kategori</option>
                    <option v-for="data in kategori" :key="data.id" :value="data.id_kategori">{{ data.nama_kategori }}</option>
                  </select>
                </div>
                <div class="mt-2">
                  <a class="btn btn-primary w-100" @click="Cari">Cari</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 mt-2">
            <div class="card">
              <div class="card-body" style="max-height: 500px; overflow-y: auto; overflow-x: hidden;">
                <div class="row">
                  <div class="col-md-3" v-for="(data, index) in filterVendor" :key="data.id">
                    <div @click="fetchVendor(data)" class="card card-outline" style="min-height: 320px !important; margin-bottom: 0px;">
                      <div class="card-body box-profile" style="cursor: pointer; margin-bottom: 0px; padding: 16px 8px 8px 8px;" @click="findProduk">
                        <div class="text-center" style="margin-top: 8px;">
                          <img v-if="data.profil === ''" src="../assets/images/example-image.jpg"
                               alt="User profile picture"
                               class="profile-user-img img-fluid"
                               style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                          <img v-else-if="data.profil !== ''" :src="`http://localhost:1000/profil/`+ data.profil"
                               alt="User profile picture"
                               class="profile-user-img img-fluid"
                               style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                        </div>
                        <div style="min-height: 36px">
                          <h5 v-if="data.toko !== ''" class="text-center" style="margin-bottom: 2px; margin-top: 5px; font-weight: bold;">{{ data.toko }}</h5>
                          <h5 v-else-if="data.toko === ''" class="text-center" style="margin-bottom: 2px; margin-top: 5px; font-weight: bold;">Vendor {{ index }}</h5>
                        </div>
                        <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 14px;">{{ data.cat.nama_kategori }}</p>
                        <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">{{ data.alamat }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section :hidden="detailVendor" v-if="detailSelectedVendor.length !== 0">
      <div class="container-fluid mb-3">
        <div class="row">
          <div class="col-lg-3 mt-2">
            <div class="card card-outline" style="min-height: 320px !important; margin-bottom: 0px;">
              <div class="card-body box-profile" style="cursor: pointer; margin-bottom: 0px; padding: 16px 8px 8px 8px;" @click="findProduk">
                <div class="text-center" style="margin-top: 8px;">
                  <img v-if="detailSelectedVendor.profil === ''" src="../assets/images/example-image.jpg"
                       alt="User profile picture"
                       class="profile-user-img img-fluid"
                       style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                  <img v-else-if="detailSelectedVendor.profil !== ''" :src="`http://localhost:1000/profil/`+ detailSelectedVendor.profil"
                       alt="User profile picture"
                       class="profile-user-img img-fluid"
                       style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                </div>
                <div style="min-height: 36px">
                  <h5 class="text-center" style="margin-bottom: 2px; margin-top: 5px; font-weight: bold;">{{ detailSelectedVendor.toko }}</h5>
                </div>
                <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">{{ detailSelectedVendor.cat.nama_kategori }}</p>
                <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">{{ detailSelectedVendor.kot.nama_kota }}</p>
                <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">{{ detailSelectedVendor.alamat }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-9 mt-2">
            <div class="card">
              <div class="card-header">
                <nav class="nav nav-tabs nav-pills flex-column flex-sm-row" role="tablist">
                  <a :class="{ active: isActiveProduct, 'btn-primary': btnProduct }" @click="Change('product', detailSelectedVendor.id)" class="flex-sm-fill btn text-decoration-none text-sm-center" id="producttab" aria-current="page" href="#product">Product</a>
                  <a :class="{ active: isActiveCollection, 'btn-primary': btnCollection }" @click="Change('collection', detailSelectedVendor.id)" class="flex-sm-fill btn text-decoration-none text-sm-center" id="collectiontab" href="#collection">Collection</a>
                  <a :class="{ active: isActiveReview, 'btn-primary': btnReview }" @click="Change('review', detailSelectedVendor.id)" class="flex-sm-fill btn text-decoration-none text-sm-center" href="#review">Review</a>
                </nav>
              </div>
              <div class="card-body" style="max-height: 500px; overflow-y: auto; overflow-x: hidden;">
                <div class="tab-content">
                  <div class="tab-pane" :class="{ active: isActiveProduct }" role="tabpanel">
                    <div :hidden="listProduk" class="row mt-3">
                      <div class="col-md-3" v-for="data in productSelectedVendor" :key="data.id">
                        <div @click="DetailProduk(data)" class="card card-outline" style="min-height: 320px !important; margin-bottom: 0px;">
                          <div class="card-body box-profile" style="cursor: pointer; margin-bottom: 0px; padding: 16px 8px 8px 8px;" @click="findProduk">
                            <div class="text-center" style="margin-top: 8px;">
                              <img v-if="data.image === ''" src="../assets/images/example-image.jpg"
                                   alt="User profile picture"
                                   class="profile-user-img img-fluid"
                                   style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                              <img v-else-if="data.image !== ''" :src="`http://localhost:1000/produk/`+ data.image"
                                   alt="User profile picture"
                                   class="profile-user-img img-fluid"
                                   style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                            </div>
                            <div style="min-height: 36px">
                              <h5 class="text-center" style="margin-bottom: 2px; margin-top: 5px; font-weight: bold;">{{ data.nama_produk }}</h5>
                            </div>
                            <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">By {{ data.users.toko }}</p>
                            <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">{{ convertToTupiah(data.harga) }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :hidden="listDetailProduk" v-if="selectedDetailProduk !== null" class="row mt-3">
                      <h5>{{ selectedDetailProduk.nama_produk }}</h5>
                      <center>
                        <img v-if="selectedDetailProduk.image === ''" src="../assets/images/example-image.jpg" class="card-img-top" alt="...">
                        <img v-else-if="selectedDetailProduk.image !== ''" :src="`http://localhost:1000/produk/`+ selectedDetailProduk.image" style="width: 20rem" class="card-img-top" alt="...">
                      </center>
                      <div class="row mt-3">
                        <div class="col-6">
                          <h5>Detail</h5>
                          <p>{{ selectedDetailProduk.deskripsi }}</p>
                        </div>
                        <div class="col-6">
                          <h5>Price</h5>
                          <h3>{{ convertToTupiah(selectedDetailProduk.harga) }}</h3>
                          <h6>DP: {{ selectedDetailProduk.dp }}%</h6>
                          <div class="row">
                            <div class="col-lg-4">
                              <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend" style="cursor: pointer" @click="kurangiQty(selectedDetailProduk.harga, selectedDetailProduk.dp)">
                                  <span class="input-group-text">-</span>
                                </div>
                                <input @input="countQty(selectedDetailProduk.harga, selectedDetailProduk.dp)" type="number" class="form-control shadow-none text-center" v-model="newQty">
                                <div class="input-group-append" style="cursor: pointer" @click="tambahQty(selectedDetailProduk.harga, selectedDetailProduk.dp)">
                                  <span class="input-group-text">+</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <p>{{convertToTupiah(newDP)}}</p>
                            </div>
                            <div class="col-lg-4">
                              <a class="btn btn-block btn-success" @click="addToCart1(selectedDetailProduk)">Tambah Cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" :class="{ active: isActiveCollection }" role="tabpanel">
                    <div :hidden="listCollection" class="row mt-3">
                      <div class="col-md-3" v-for="data in selectedVendorAlbum" :key="data.id">
                        <div @click="detailCollection(data.id_album, data.nama, data.tanggal_pelaksanaan)" class="card card-outline" style="min-height: 320px !important; margin-bottom: 0px;">
                          <div class="card-body box-profile" style="cursor: pointer; margin-bottom: 0px; padding: 16px 8px 8px 8px;" @click="findProduk">
                            <div class="text-center" style="margin-top: 8px;">
                              <img v-if="data.Detail.length === 0" src="../assets/images/example-image.jpg"
                                   alt="User profile picture"
                                   class="profile-user-img img-fluid"
                                   style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                              <img v-else-if="data.Detail.length !== 0" :src="`http://localhost:1000/album/`+ data.Detail[0].foto"
                                   alt="User profile picture"
                                   class="profile-user-img img-fluid"
                                   style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                            </div>
                            <div style="min-height: 36px">
                              <h5 class="text-center" style="margin-bottom: 2px; margin-top: 5px; font-weight: bold;">{{ data.nama }}</h5>
                            </div>
                            <p class="text-muted text-center" style="margin-bottom: 2px; font-size: 17px;">{{ converWaktu(data.tanggal_pelaksanaan) }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :hidden="listDetailCollection" class="row">
                        <h5 class="text-center">{{ titleSelectedDetailAlbum }}</h5>
                        <p class="text-muted text-sm text-center">{{ converWaktu(tanggalSelectedDetailAlbum) }}</p>
                        <div v-for="data in selectedDetailAlbum" :key="data.id">
                          <center>
                            <img :src="`http://localhost:1000/album/`+ data.foto" class="card-img-top mt-2 w-50" alt="...">
                          </center>
                        </div>
                    </div>
                  </div>
                  <div class="tab-pane" :class="{ active: isActiveReview }" role="tabpanel">
                    <h5 class="text-center mb-4">Review {{ detailSelectedVendor.toko }}</h5>
                    <div class="row mt-2 p-5 pt-0 pb-0" v-for="data in selectedPenilaianVendor" :key="data.id">
                      <div class="row">
                        <div class="col-md-6 float-start" style="font-size: 20px; font-weight: bold;">{{ data.cus.name }}</div>
                        <div class="col-md-6">
                          <span class="float-end" v-if="data.star === 1" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                          <span class="float-end" v-if="data.star === 2" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                          <span class="float-end" v-if="data.star === 3" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                          <span class="float-end" v-if="data.star === 4" >
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                          <span class="float-end" v-if="data.star === 5">
                  <div class="text-center">
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                    <i class="fas fa-star" style="color: #FFC107"></i>
                  </div>
                </span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-12">
                          {{ converWaktu(data.CreatedAt) }}  | {{ data.judul }}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-12">
                          {{ data.pesan }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="container-fluid bg-secondary" style="min-height: 200px !important">
      <div class="row pt-5 justify-content-center">
        <div class="col-lg-3 col-md-3 col-sm-3">
          <h5>Dreams Wedding</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3">
          <h5>Address</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3">
          <h5>Contact Us</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <hr class="dropdown-divider" style="min-height: 3px; color: black">
        <div class="col-lg-9 mb-3">
          Copyright © 2022 App Name™. All rights reserved
        </div>
      </div>
    </footer>
  </section>
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
                  <td>Tanggal Reservasi: </td>
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
                  <a class="btn w-25 text-white" style="background-color: #0d6efd">Kembali</a>
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
// import axios from "axios";
import $ from 'jquery';
import router from "@/router";
import axios from "axios";
import { Carousel, Slide } from 'vue3-carousel';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import 'vue3-carousel/dist/carousel.css';
import moment from "moment";
import Swal from "sweetalert2";
// import { mapActions, mapGetters } from 'vuex';
// import Swal from "sweetalert2";

export default {
  name: 'landing-page',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      alamatUser: localStorage.getItem('alamat'),
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
    DetailProdukAnother(slide) {
      this.isHideLandingUtama = true
      this.isHideLandingSecond = false
      this.isHiddenFilter = true
      this.detailVendor = false
      this.isActiveProduct = true
      this.isActiveReview = false
      this.isActiveCollection = false
      this.listProduk = true
      this.listDetailProduk = false
      this.detailSelectedVendor = slide.users
      this.selectedDetailProduk = slide
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
    GetAvailableBank() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/va/list').then(response => {
        // this.produk = response.data.data
        console.log(response)
      })
    },
    Submit(e) {
      e.preventDefault()
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
          Swal.fire({
            icon: "success",
            title: "Checkout Berhasil",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            localStorage.removeItem('cart')
            // this.getCart()
            window.location.href = "/"
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
    },
    convertToDP(price, qty, dp) {
      let data = (((dp/100) * (price*qty)))
      return data
    },
    convertHP(data) {
      if (data !== null) {
        if (data.charAt(0) === '6' && data.charAt(1) === '2') {
          let akhir = '+' + data;
          return akhir
        } else if (data.charAt(0) === '0') {
          let str = data.split('');
          str[0] = '+62';
          return str.join('')
        } else {
          return data
        }
      }
    },
    showCart() {
      this.getCart()
      this.GetAvailableBank()
      new bootstrap.Modal(document.getElementById('cart-wo')).show();
    },
    BckToHome() {
      window.location.reload()
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
        Swal.fire('Ditambahkan', 'Berhasil menambah kamar ke keranjang', 'success')
        this.getCart()
      } else {
        Swal.fire('Anda Belum Login', '', 'error')
      }
    },
    addQty(index) {
      const cart = localStorage.getItem('cart')
      const oldData = JSON.parse(cart)
      let qty = parseInt(oldData[index].quantity)
      qty++
      oldData[index].quantity = qty.toString()
      localStorage.setItem('cart', JSON.stringify(oldData))
      this.getCart()
    },
    kurangQty(index) {
      const cart = localStorage.getItem('cart')
      const oldData = JSON.parse(cart)
      let qty = parseInt(oldData[index].quantity)
      qty--
      oldData[index].quantity = qty.toString()
      localStorage.setItem('cart', JSON.stringify(oldData))
      this.getCart()
    },
    removeItem(index) {
      const cart = localStorage.getItem('cart')
      const oldData = JSON.parse(cart)
      oldData.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(oldData))
      this.getCart()
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
      this.listProduk = true
      this.listDetailProduk = false
      this.selectedDetailProduk = data
    },
    detailCollection(data, name, tanggal) {
      this.titleSelectedDetailAlbum = name
      this.tanggalSelectedDetailAlbum = tanggal
      this.listCollection = true
      this.listDetailCollection = false
      axios.get(process.env.VUE_APP_ROOT_API + '/api/koleksi/list/' + data).then(response => {
        this.selectedDetailAlbum = response.data.data
      })
    },
    converWaktu(value) {
      if (value) {
        return moment(String(value)).format("DD\xa0MMMM\xa0YYYY");
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
    findVendor(data) {
      this.isHideLandingUtama = true
      this.isHideLandingSecond = false

      axios.get(process.env.VUE_APP_ROOT_API + '/api/vendor/filterKategori/' + data).then(response => {
        this.filterVendor = response.data.data
      })
    },
    fetchVendor(data) {
      this.Change('product', data.id)
      this.detailSelectedVendor = data
      this.isHiddenFilter = true
      this.detailVendor = false
    },
    getKategori() {
      axios.get(process.env.VUE_APP_ROOT_API + '/api/kategori/list').then(response => {
        this.kategori = response.data.data
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
    }
  },
  mounted() {
    this.getKategori()
    this.getKota()
    this.getProduk()
    this.getVendor()
    this.getCart()
    if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Admin') {
      router.push({ name: "admin" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Vendor') {
      router.push({ name: "vendor" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'User') {
      router.push({ name: "landing.page" })
    }
    ScreenSize()
  },
  beforeMount() {
    if (localStorage.getItem("hp") === "0" || localStorage.getItem("alamat") === "") {
      Swal.fire({
        icon: 'error',
        title: 'Data Belum Lengkap',
        text: 'Silahkan Lengkapi Data',
        confirmButtonText: 'OK',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          router.push({ name: "profileUser" })
        }
      })
    }
  }
}
function ScreenSize() {
  if (window.screen.width < 992){
    if (document.getElementById('btnL') !== null && document.getElementById('btnR') !== null) {
      document.getElementById('btnL').classList.add("w-100")
      document.getElementById('btnR').classList.add("w-100")
    }
  }else {
    if (document.getElementById('btnL') !== null && document.getElementById('btnR') !== null) {
      document.getElementById('btnL').classList.remove("w-100")
      document.getElementById('btnR').classList.remove("w-100")
    }
  }
  $(window).resize(function () {
    if (window.screen.width < 992 ) {
      if (document.getElementById('btnL') !== null && document.getElementById('btnR') !== null) {
        document.getElementById('btnL').classList.add("w-100")
        document.getElementById('btnR').classList.add("w-100")
      }
    }else {
      if (document.getElementById('btnL') !== null && document.getElementById('btnR') !== null) {
        document.getElementById('btnL').classList.remove("w-100")
        document.getElementById('btnR').classList.remove("w-100")
      }
    }
  })
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Sacramento');
@media screen and (max-width: 991px) {
  .navbar-nav .btn-register {
    margin-top: 5px;
  }
  .navbar-nav .become {
    text-align: center;
    font-size: 20px;
  }
}
.carousel__slide {
  padding: 10px;
}
@media screen and (min-width: 992px) {
  .navbar-nav .btn-register {
    color: white;
  }
}
.jumbotron .display-4 {
  font-family: "Sacramento", Arial, serif;
}
.navbar-nav .btn-login {
  width: 5rem;
  border-radius: 15px;
}
.navbar-nav .btn-login:hover {
  background-color: #f366a3 !important;
  border-color: #f366a3 !important;
}
.navbar-nav .btn-register {
  width: 5rem;
  border-radius: 15px;
}
.navbar .brands {
  font-size: 35px;
  font-family: "Sacramento", Arial, serif;
}
#topBtn {
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  z-index: 99; /* Make sure it does not overlap */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  background-color: rgb(125, 125, 125); /* Set a background color */
  color: white; /* Text color */
  cursor: pointer; /* Add a mouse pointer on hover */
  padding: 0.7rem 1rem; /* Some padding */
  border-radius: 10px; /* Rounded corners */
  font-size: 18px; /* Increase font size */
  opacity: 0;
  transition: opacity 0.5s;
}
#topBtn:hover {
  background-color: rgb(90, 90, 90); /* Add a dark-grey background on hover */
}
/* Navbar */
.navbar-brand {
  font-size: 30px;
}
/* Jumbotron */
.jumbotron {
  padding-top: 4rem;
  background-image: url("../assets/images/img_bg_1.jpg");
  background-size: cover;
  height: 540px;
  position: relative;
  z-index: -1;
}
.jumbotron::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 50%;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  bottom: 0;
}
.jumbotron .container {
  color: white;
  text-align: center;
  position: relative;
  z-index: 1;
}
.jumbotron .display-4 {
  font-weight: 200;
  font-size: 2.6em;
  margin-top: 100px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  margin-bottom: 50px;
}
.jumbotron .display-4 span {
  font-weight: 500;
}
/* Info Panel */
.info-panel {
  background-color: white;
  padding: 30px;
  margin-top: -60px;
  border-radius: 12px;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.6);
}
.info-panel h4 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  text-transform: uppercase;
}
.info-panel p {
  font-size: 14px;
  font-weight: lighter;
  color: #acacac;
}
/* Workingspace */
.workingspace {
  margin-top: 50px;
  text-align: center;
}
.workingspace img {
  margin-bottom: 20px;
}
.workingspace h2 {
  font-size: 52px;
  /* text-transform: uppercase; */
  font-weight: 200;
}
.workingspace h2 span {
  font-weight: 500;
}
.workingspace p {
  font-size: 18px;
  color: #acacac;
  font-weight: 200;
}
/* Testimonial */
.testimonial {
  margin-top: 130px;
}
.testimonial p {
  font-size: 1.4em;
  text-align: center;
  font-weight: 200;
  font-style: italic;
  margin-bottom: 30px;
}
.testimonial img {
  width: 80px;
  height: 80px;
  margin: 10px;
  border-radius: 50%;
  filter: grayscale(1);
}
.testimonial .img-main {
  width: 100px;
  height: 100px;
  margin-top: -5px;
  filter: grayscale(0);
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  /*background-color: var(--vc-clr-primary);*/
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.testimonial .info-text h5 {
  font-size: 16px;
  font-weight: bold;
}
.testimonial .info-text p {
  font-size: 12px;
  margin-top: -5px;
  color: #acacac;
  font-style: normal;
}
/* Utility */
.tombol {
  border-radius: 40px;
  text-transform: uppercase;
}
/* Overriding styles */
::-webkit-input-placeholder {
  font-size: 16px !important;
  color: #5f5f5f !important;
}
:-moz-placeholder {
  /* Firefox 18- */
  font-size: 16px !important;
  color: #5f5f5f !important;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-size: 16px !important;
  color: #5f5f5f !important;
}
.form-control {
  border-color: #ccc !important;
}

@media (max-width: 576px) {
  .info-panel {
    width: 450px;
  }
}

@media (max-width: 450px) {
  .info-panel {
    width: 400px;
  }
}

@media (max-width: 400px) {
  .info-panel {
    width: 350px;
  }
}

@media (max-width: 350px) {
  .info-panel {
    width: 300px;
  }
}

@media (max-width: 300px) {
  .info-panel {
    width: 250px;
  }
}

@media (max-width: 250px) {
  .info-panel {
    width: 200px;
  }
}
/* RESPONSIVE */
@media (min-width: 992px) {
  .navbar {
    padding-top: 20px;
  }

  .navbar-brand,
  .nav-link {
    color: white !important;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .nav-link {
    text-transform: uppercase;
    margin-right: 20px;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    content: "";
    display: block;
    border-bottom: 3px solid #0b63dc;
    margin: auto;
    margin-bottom: -8px;
    width: 50%;
    padding-top: 5px;
  }

  .jumbotron {
    margin-top: -90px;
    height: 640px;
  }

  .jumbotron .display-4 {
    font-size: 4em;
    margin-top: 150px;
  }

  .rounded-img{
    border-radius: 25px;
  }

  .workingspace {
    text-align: left;
  }

  .testimonial p {
    font-size: 2em;
  }
}
</style>