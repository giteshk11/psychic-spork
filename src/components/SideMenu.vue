<script setup lang="ts">
import { MenuItem } from 'src/types';
import { PropType, ref } from 'vue';

const props = defineProps({
  menuList: {
    type: Object as PropType<MenuItem[]>,
    required: true,
  },
});

const selectedItem = ref(props.menuList[0].label);
</script>

<template>
  <div class="full-width fixed-bottom mobile-only shadow-up-3 bg-white">
    <q-list dense class="flex no-wrap justify-center">
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
            class="self-center no-padding items-center"
          >
            <q-icon
              :name="menuItem.icon"
              :class="[selectedItem === menuItem.label ? 'active-item' : '']"
            />
          </q-item-section>
          <q-item-section class="text-caption">
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<style scoped>
.active-item {
  stroke: #01d167;
}
</style>
