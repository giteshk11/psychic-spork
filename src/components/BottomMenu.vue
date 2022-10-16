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
  <div class="full-width fixed-bottom shadow-up-3 bg-white">
    <q-list dense class="row no-wrap justify-center q-py-xs">
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          clickable
          dense
          :active="menuItem.label === selectedItem"
          class="column items-center q-mx-sm no-padding justify-center q-gutter-y-xs"
          @click="() => (selectedItem = menuItem.label)"
        >
          <q-item-section
            avatar
            no-wrap
            class="self-center column no-padding items-center"
          >
            <component
              :is="getMenuItemIcon(menuItem.icon)"
              :class="[
                menuItem.label === selectedItem ? 'active-item' : 'item',
                ,
              ]"
            />
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
.label {
  font-size: 0.55rem;
  color: #dddddd;
}

.active-label {
  font-size: 0.55rem;
  color: #01d167;
}

.item {
  stroke: white;
  fill: #dddddd;
}

.active-item {
  stroke: white;
  fill: #01d167;
}
</style>
