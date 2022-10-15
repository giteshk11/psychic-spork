<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <SideMenu :menu-list="menuList" style="z-index: 3; position: fixed" />
</template>

<script setup lang="ts">
import SideMenu from 'src/components/SideMenu.vue';

const menuList = [
  {
    icon: 'img:/icons/svg/Logo.svg',
    label: 'Home',
  },
  {
    icon: 'img:/icons/svg/Pay.svg',
    label: 'Cards',
  },
  {
    icon: 'img:/icons/svg/Payments.svg',
    label: 'Payments',
  },
  {
    icon: 'img:/icons/svg/Credit.svg',
    label: 'Credit',
  },
  {
    icon: 'img:/icons/svg/Account.svg',
    label: 'Profile',
  },
];
</script>
