<script setup lang="ts">
import { MenuItem } from 'src/types';
import { defineAsyncComponent, PropType, ref } from 'vue';

const props = defineProps({
  menuList: {
    type: Object as PropType<MenuItem[]>,
    required: true,
  },
});

const getMenuItemIcon = (icon: string) =>
  defineAsyncComponent(() => import(`../assets/icons/${icon}.svg?component`));

const selectedItem = ref(props.menuList[1].label);
</script>

<template>
  <div class="full-height bg-blue-100 text-white">
    <q-list class="justify-center q-gutter-y-lg q-px-md">
      <q-item>
        <q-img
          src="~assets/Logo/Logo@3x.png"
          fit="fill"
          width="7rem"
          height="2rem"
        />
      </q-item>
      <q-item class="no-padding q-mt-xs q-mb-xl" style="opacity: 30%">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </q-item>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          clickable
          :active="menuItem.label === selectedItem"
          class="row no-padding"
          @click="() => (selectedItem = menuItem.label)"
        >
          <q-item-section avatar class="no-padding">
            <component
              :is="getMenuItemIcon(menuItem.icon)"
              :class="[
                menuItem.label === selectedItem ? 'active-item' : 'item',
                ,
              ]"
            />
          </q-item-section>
          <q-item-section>
            <span
              :class="[
                menuItem.label === selectedItem ? 'active-label' : 'label',
                'no-margin q-mt-xs text-weight-medium',
              ]"
            >
              {{ menuItem.label }}
            </span>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<style scoped>
.logo {
  width: 5rem;
  height: 2rem;
}
.label {
  color: #dddddd;
}

.active-label {
  color: #01d167;
}

.item {
  fill: #dddddd;
}

.active-item {
  fill: #01d167;
}
</style>
