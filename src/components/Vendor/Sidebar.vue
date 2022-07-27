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
        <li class="sidebar-item has-sub">
          <a href="#" class='sidebar-link' style="text-decoration: none" @click="DropComponent">
            <i data-feather="database" width="20"></i>
            <span>Master Data</span>
          </a>
          <ul class="submenu" id="subComponent">
            <li class="sidebar-item">
              <router-link :to="{ name: 'produk' }" class="sidebar-item text-decoration-none">
                <span>Daftar Produk</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'album' }" class="sidebar-item text-decoration-none">
                <span>Project/Collection</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'transaksiVendor' }" class="sidebar-link text-decoration-none">
            <i data-feather="dollar-sign" width="20"></i>
            <span>Transaksi</span>
          </router-link>
        </li>
        <li class="sidebar-item">
          <router-link :to="{ name: 'penilaianVendor' }" class="sidebar-link text-decoration-none">
            <i data-feather="star" width="20"></i>
            <span>Review</span>
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

    const DropComponent = () => {
      if(document.getElementById('subComponent').classList.item(1) === "active"){
        document.getElementById('subComponent').classList.remove("active")
      }else {
        document.getElementById('subComponent').classList.add("active")
      }
    }

    return{Hide, DropComponent}
  },
  mounted() {
    feather.replace()
  }
}
</script>

<style scoped>
</style>