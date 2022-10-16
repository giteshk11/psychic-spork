<template>
  <q-layout view="hHh LpR fFf">
    <q-drawer show-if-above side="left" bordered>
      <!-- drawer content -->
      <SideMenu :menu-list="menuList"></SideMenu>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <div class="mobile-only">
    <BottomMenu :menu-list="menuList" style="z-index: 3; position: fixed" />
  </div>
</template>

<script setup lang="ts">
import BottomMenu from 'src/components/BottomMenu.vue';
import SideMenu from '../components/SideMenu.vue';
import { menuList } from 'src/models/constats';
</script>
