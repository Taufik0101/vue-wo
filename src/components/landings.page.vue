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
<!--              <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>-->
<!--                <ul>-->
<!--                  <li><a href="#">Deep Dropdown 1</a></li>-->
<!--                  <li><a href="#">Deep Dropdown 2</a></li>-->
<!--                  <li><a href="#">Deep Dropdown 3</a></li>-->
<!--                  <li><a href="#">Deep Dropdown 4</a></li>-->
<!--                  <li><a href="#">Deep Dropdown 5</a></li>-->
<!--                </ul>-->
<!--              </li>-->
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

  <section :hidden="isHideLandingUtama" id="hero" class="hero">
    <div class="info d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
            <h2 data-aos="fade-down">Hello <span>!</span></h2>
            <p data-aos="fade-up">Find Your Dream Wedding Partner or Create Your Dream Wedding in Here</p>
<!--            <a data-aos="fade-up" data-aos-delay="200" href="#get-started" class="btn-get-started">Get Started</a>-->
          </div>
        </div>
      </div>
    </div>

    <div id="hero-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">

      <div class="carousel-item active jumbotron"></div>
      <div class="carousel-item jumbotron-1"></div>
      <div class="carousel-item jumbotron-2"></div>
      <div class="carousel-item jumbotron-3"></div>
      <div class="carousel-item jumbotron-4"></div>

      <a class="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true">
          <i class="fas fa-chevron-left"></i>
        </span>
      </a>

      <a class="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true">
          <i class="fas fa-chevron-right"></i>
        </span>
      </a>
    </div>
  </section>

  <main :hidden="isHideLandingUtama" id="main">
    <section id="alt-services" class="alt-services" style="padding-top: 30px; padding-bottom: 30px;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 info-panel">
            <!-- Tab panes -->
            <div class="row">
              <div class="col-sm-5">
                <select class="form-control" v-model="selectedKota">
                  <option selected value="">Pilih Kota</option>
                  <option v-for="datas in kota" :key="datas.i_kota" :value="datas.id_kota">{{ datas.nama_kota }}</option>
                </select>
              </div>
              <div class="col-sm-5">
                <select class="form-control" v-model="selectedCategory">
                  <option selected value="">Pilih Kategori</option>
                  <option v-for="data in kategori" :key="data.id" :value="data.id_kategori">{{ data.nama_kategori }}</option>
                </select>
              </div>
              <div class="col-sm-2">
                <a class="btn text-white w-100" style="background-color: var(--color-primary)" @click="Cari">Cari</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="testimonials section-bg" style="padding-top: 30px; padding-bottom: 30px;">
    <div class="container" data-aos="fade-up">
      <div class="section-header" style="padding-bottom: 30px;">
        <h2>Category</h2>
      </div>
      <div class="col-lg-12">
        <Carousel style="padding-top: 30px; padding-bottom: 30px;" :settings="settingsKategori" :breakpoints="breakpointsKategori" :wrap-around="true">
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
  </section>

    <section id="alt-services1" class="alt-services" style="padding-bottom: 30px;">
    <div class="container" data-aos="fade-up">
      <div class="section-header" style="padding-bottom: 30px;">
        <h2>Maybe To Choose</h2>
      </div>
      <div class="col-lg-12">
        <Carousel style="padding-top: 30px; padding-bottom: 30px;" :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
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
  </section>
  </main>

  <main :hidden="isHideLandingSecond" id="main">
    <span>
      <div class="breadcrumbs d-flex align-items-center cadangan">
      <div class="container position-relative d-flex flex-column align-items-center">
        <h2 v-if="detailSelectedVendor.length === 0">Filter</h2>
        <h2 v-else>{{ detailSelectedVendor.toko }}</h2>
        <ol>
          <li><a style="color: #cccccc; cursor: pointer" @click="Kembali">Home</a></li>
          <li v-if="detailSelectedVendor.length === 0">Filter</li>
          <li v-else>{{ detailSelectedVendor.toko }}</li>
        </ol>
      </div>
    </div>
    </span>

    <section :hidden="isHiddenFilter" id="contact" class="contact" style="padding-top: 30px; padding-bottom: 30px;">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg-3 col-md-6">
            <div class="info-item  d-flex flex-column justify-content-center align-items-center p-3">
              <select class="form-control mt-2" v-model="selectedKota">
                <option selected value="">Pilih Kota</option>
                <option v-for="datas in kota" :key="datas.i_kota" :value="datas.id_kota">{{ datas.nama_kota }}</option>
              </select>
              <select class="form-control mt-2" v-model="selectedCategory">
                <option selected value="">Pilih Kategori</option>
                <option v-for="data in kategori" :key="data.id" :value="data.id_kategori">{{ data.nama_kategori }}</option>
              </select>
              <a class="btn text-white mt-2 w-100" style="background-color: var(--color-primary)" @click="Cari">Cari</a>
            </div>
          </div><!-- End Info Item -->

          <div class="col-lg-9">
            <div class="info-item flex-column justify-content-center align-items-center" style="max-height: 500px; overflow-y: auto; overflow-x: hidden;">
              <div class="row ps-3">
                <div class="col-md-3" v-for="(data, index) in filterVendor" :key="data.id">
                  <div @click="fetchVendor(data)" class="card card-outline" style="min-height: 280px !important; margin-bottom: 0px;">
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
          </div><!-- End Info Item -->
        </div>
      </div>
    </section>

    <section :hidden="detailVendor" v-if="detailSelectedVendor.length !== 0" style="padding-top: 30px; padding-bottom: 30px;" id="contact" class="contact">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg-6">
            <div class="info-item">
              <div class="row">
                <div class="col-md-6 text-center">
                  <img v-if="detailSelectedVendor.profil === ''" src="../assets/images/example-image.jpg"
                       alt="User profile picture"
                       class="profile-user-img img-fluid"
                       style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                  <img v-else-if="detailSelectedVendor.profil !== ''" :src="URL+`/profil/`+ detailSelectedVendor.profil"
                       alt="User profile picture"
                       class="profile-user-img img-fluid"
                       style="width: 120px; height: 120px; object-fit: cover; object-position: center top;"/>
                </div>
                <div class="col-md-6">
                  <h3>Profil</h3>
                  <p class="text-muted" style="margin-bottom: 2px; font-size: 17px;">Kategori: {{ detailSelectedVendor.cat.nama_kategori }}</p>
                  <p class="text-muted" style="margin-bottom: 2px; font-size: 17px;">Kota: {{ detailSelectedVendor.kot.nama_kota }}</p>
                  <p class="text-muted" style="margin-bottom: 2px; font-size: 17px;">Alamat: {{ detailSelectedVendor.alamat }}</p>
                </div>
              </div>
            </div>
          </div><!-- End Info Item -->

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center" style="min-height: 170px">
              <i class="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>{{ detailSelectedVendor.email }}</p>
            </div>
          </div><!-- End Info Item -->

          <div class="col-lg-3 col-md-6">
            <div class="info-item  d-flex flex-column justify-content-center align-items-center" style="min-height: 170px">
              <i class="fas fa-phone"></i>
              <h3>Telepon</h3>
              <p>{{ convertHP(detailSelectedVendor.no_hp) }}</p>
            </div>
          </div><!-- End Info Item -->
        </div>
      </div>
    </section>

    <section :hidden="detailVendor" v-if="detailSelectedVendor.length !== 0" style="padding-top: 0; padding-bottom: 30px;" id="projects" class="projects">
      <div class="container" data-aos="fade-up">
        <div class="col-lg-12 mt-2">
          <div class="card">
            <div class="card-header">
              <nav class="nav nav-tabs nav-pills flex-column flex-sm-row" role="tablist">
                <a :class="{ active: isActiveProduct, 'btn-warning': btnProduct }" @click="Change('product', detailSelectedVendor.id)" class="flex-sm-fill btn text-decoration-none text-sm-center" id="producttab" aria-current="page" href="#product">Product</a>
                <a :class="{ active: isActiveCollection, 'btn-warning': btnCollection }" @click="Change('collection', detailSelectedVendor.id)" class="flex-sm-fill btn text-decoration-none text-sm-center" id="collectiontab" href="#collection">Collection</a>
                <a :class="{ active: isActiveReview, 'btn-warning': btnReview }" @click="Change('review', detailSelectedVendor.id)" class="flex-sm-fill btn text-decoration-none text-sm-center" href="#review">Review</a>
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
  <div v-if="selectedDetailProduk !== null" class="modal fade" id="detail-produk" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ selectedDetailProduk.nama_produk }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-white">
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
              <h5>Harga</h5>
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
    </div>
  </div>
  <div v-if="selectedDetailAlbum !== null" class="modal fade" id="detail-album" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" id="waitDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ titleSelectedDetailAlbum }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-white">
          <p class="text-muted text-sm text-center">{{ converWaktu(tanggalSelectedDetailAlbum) }}</p>
          <div v-for="data in selectedDetailAlbum" :key="data.id">
            <center>
              <img :src="URL+`/album/`+ data.foto" class="card-img-top mt-2 w-50" alt="...">
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import { Carousel, Slide } from 'vue3-carousel';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import 'vue3-carousel/dist/carousel.css';
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import router from "@/router";
export default {
  name: "landings-page",
  components: {
    Carousel,
    Slide,
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
      window.location.reload()
    },
    DetailProdukAnother(slide) {
      this.newQty = 0
      this.newDP = 0
      this.selectedDetailProduk = slide
      new bootstrap.Modal(document.getElementById('detail-produk')).show();
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
              localStorage.removeItem('cart')
              // this.getCart()
              bootstrap.Modal.getInstance(document.getElementById('cart-wo')).hide()
              window.location.href = "/"
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
    if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Admin') {
      router.push({ name: "admin" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'Vendor') {
      router.push({ name: "vendor" })
    } else if (localStorage.getItem("trueLogin") && localStorage.getItem('role') === 'User') {
      router.push({ name: "landing.page" })
    }
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