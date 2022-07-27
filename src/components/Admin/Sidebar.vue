<template>
  <div class="sidebar-wrapper active">
    <div class="sidebar-header">
<!--      <img src="@/assets/images/logo.svg" alt="" srcset="">-->
      <a class="text-decoration-none brands" style="cursor: pointer; font-size: xx-large;">Dream Weddings<strong>.</strong></a>
    </div>
    <div class="sidebar-menu" style="margin-top: -40px">
      <ul class="menu">
        <li class='sidebar-title'>Menu</li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'dashboard' }" class="sidebar-link text-decoration-none">
            <i data-feather="home" width="20"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'request' }" class="sidebar-link text-decoration-none">
            <i data-feather="user" width="20"></i>
            <span>Permintaan Akun</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'vendorAdmin' }" class="sidebar-link text-decoration-none">
            <i data-feather="package" width="20"></i>
            <span>Vendor</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'kategori' }" class="sidebar-link text-decoration-none">
            <i data-feather="layers" width="20"></i>
            <span>Kategori</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'kota' }" class="sidebar-link text-decoration-none">
            <i data-feather="map-pin" width="20"></i>
            <span>Kota</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'transaksiAdmin' }" class="sidebar-link text-decoration-none">
            <i data-feather="dollar-sign" width="20"></i>
            <span>Transaksi</span>
          </router-link>
        </li>
      </ul>
    </div>
    <button @click="Hide" class="sidebar-toggler btn x"><i data-feather="x"></i></button>
  </div>
</template>

<script>
import feather from 'feather-icons'
export default {
  name: "Sidebar-page",
  setup() {
    const Hide = () => {
      document.getElementById('sidebar').classList.remove("active")
    }

    return{Hide}
  },
  mounted() {
    feather.replace()
  }
}
</script>

<style scoped>
</style>