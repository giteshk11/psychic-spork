<script setup lang="ts">
import { CardState } from 'src/models/constats';
import { ICard } from 'src/types';
import { defineAsyncComponent, PropType } from 'vue';

const quickActions = (currentCard: ICard) => [
  {
    label:
      currentCard?.cardState === CardState.FREEZED
        ? 'Unfreeze Card'
        : 'Freeze Card',
    icon: 'Freeze Card',
    id:
      currentCard?.cardState === CardState.FREEZED
        ? 'unfreezeCard'
        : 'freezeCard',
    isDisabled: false,
  },
  {
    label: 'Set spend limit',
    icon: 'Set Spend limit',
    id: 'setSpendLimits',
    isDisabled: false,
  },
  {
    label: 'Add to GPay',
    icon: 'GPay',
    id: 'addToGpay',
    isDisabled: false,
  },
  {
    label: 'Replace card',
    icon: 'Replace Card',
    id: 'replaceCard',
    isDisabled: false,
  },
  {
    label: 'Cancel Card',
    icon: 'Deactivate Card',
    id: 'cancelCard',
    isDisabled: currentCard?.cardState === CardState.DELETED,
  },
];

defineProps({
  currentCard: {
    type: Object as PropType<ICard>,
    required: true,
  },
});

const getIcons = (icon: string) =>
  defineAsyncComponent(() => import(`../assets/icons/${icon}.svg?component`));
</script>

<template>
  <ul class="row justify-between no-wrap no-padding">
    <li
      v-for="(action, i) in quickActions(currentCard)"
      :key="i"
      class="column items-center q-gutter-y-sm"
      @click.stop="$emit('click', action.id)"
    >
      <component :is="getIcons(action.icon)" />
      <span class="text-body2 text-center text-wrap">
        {{ action.label }}
      </span>
    </li>
  </ul>
</template>
