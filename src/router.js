import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // {
  //   path: "/",
  //   name: "landing.page",
  //   component: () => import("@/components/landing.page"),
  // },
  {
    path: "/",
    name: "landing.page",
    component: () => import("@/components/landings.page"),
  },
  {
    path: "/user/profile",
    name: "profileUser",
    component: () => import("@/components/Profile-User"),
  },
  {
    path: "/user/ubahpassword",
    name: "ubahPasswordUser",
    component: () => import("@/components/UbahPassword"),
  },
  {
    path: "/user/riwayatTransaksi",
    name: "riwayatTransaksi",
    component: () => import("@/components/Riwayat"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login"),
  },
  {
    path: "/user/register",
    name: "registerUser",
    component: () => import("@/components/Register.user"),
  },
  {
    path: "/vendor/register",
    name: "registerVendor",
    component: () => import("@/components/Register.vendor"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/components/Admin"),
    redirect: "/admin/dashboard",
    children: [
      {
        path: "/admin/dashboard",
        name: "dashboard",
        component: () => import("@/components/Admin/Dashboard"),
      },
      {
        path: "/admin/kategori",
        name: "kategori",
        component: () => import("@/components/Admin/Kategori/Kategori"),
      },
      {
        path: "/admin/tambahkategori",
        name: "tambahKategori",
        component: () => import("@/components/Admin/Kategori/TambahKategori"),
      },
      {
        path: "/admin/kota",
        name: "kota",
        component: () => import("@/components/Admin/Kota/Kota"),
      },
      {
        path: "/admin/tambahkota",
        name: "tambahKota",
        component: () => import("@/components/Admin/Kota/TambahKota"),
      },
      {
        path: "/admin/vendor",
        name: "vendorAdmin",
        component: () => import("@/components/Admin/Vendor/Vendor"),
      },
      {
        path: "/admin/transaksi",
        name: "transaksiAdmin",
        component: () => import("@/components/Admin/Transaksi/Transaksi"),
      },
      {
        path: "/admin/profile",
        name: "profile",
        component: () => import("@/components/Admin/Profil/Profile"),
      },
      {
        path: "/admin/ubahpassword",
        name: "ubahPassword",
        component: () =>
          import("@/components/Admin/Ubah Password/UbahPassword"),
      },
      {
        path: "/admin/request",
        name: "request",
        component: () => import("@/components/Admin/Request/Request"),
      },
    ],
  },
  {
    path: "/vendor",
    name: "vendor",
    component: () => import("@/components/Vendor"),
    redirect: "/vendor/dashboard",
    children: [
      {
        path: "/vendor/dashboard",
        name: "vendorDashboard",
        component: () => import("@/components/Vendor/Dashboard"),
      },
      {
        path: "/vendor/produk",
        name: "produk",
        component: () => import("@/components/Vendor/Produk/Produk"),
      },
      {
        path: "/vendor/tambahproduk",
        name: "tambahProduk",
        component: () => import("@/components/Vendor/Produk/TambahProduk"),
      },
      {
        path: "/vendor/album",
        name: "album",
        component: () => import("@/components/Vendor/Album/Album"),
      },
      {
        path: "/vendor/tambahalbum",
        name: "tambahAlbum",
        component: () => import("@/components/Vendor/Album/TambahAlbum"),
      },
      {
        path: "/vendor/collection/:slug",
        name: "collection",
        component: () => import("@/components/Vendor/Collection/Collection"),
      },
      {
        path: "/vendor/tambahcollection/:slug",
        name: "tambahCollection",
        component: () =>
          import("@/components/Vendor/Collection/TambahCollection"),
      },
      {
        path: "/vendor/transaksi",
        name: "transaksiVendor",
        component: () => import("@/components/Vendor/Transaksi/Transaksi"),
      },
      {
        path: "/vendor/penilaian",
        name: "penilaianVendor",
        component: () => import("@/components/Vendor/Penilaian/Penilaian"),
      },
      {
        path: "/vendor/profile",
        name: "profileVendor",
        component: () => import("@/components/Vendor/Profile/Profile"),
      },
      {
        path: "/vendor/updatepassword",
        name: "ubahPasswordVendor",
        component: () =>
          import("@/components/Vendor/Ubah Password/UbahPassword"),
      },
    ],
  },
  // {
  //     path: '/:catchAll(.*)',
  //     component: () => import('@/views/404.vue'),
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
