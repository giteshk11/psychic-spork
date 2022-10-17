<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/vue';
import { ICard } from 'src/types';
import { CardState } from 'src/models/constats';
import AspireLogoFull from 'src/assets/icons/AspireLogoFull.svg?component';
import IconEye from 'src/assets/icons/eye.svg?component';

const props = defineProps({
  cards: {
    type: Object as PropType<ICard[]>,
  },
  currentCard: Number,
});

const emits = defineEmits(['card-changed']);
const current = ref(0);
const dots = ref();

const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      slider.update();
      dotHelper();
    });
  });
  const config = { childList: true };

  slider.on('created', () => {
    observer.observe(slider.container, config);
  });
  slider.on('destroyed', () => {
    observer.disconnect();
  });
};

const [container, slider] = useKeenSlider(
  {
    loop: true,
    initial: current.value,
    slideChanged: (s) => {
      current.value = s.track.details.rel;
      if (props.cards?.length) {
        emits('card-changed', props.cards[current.value].cardId);
      }
    },
    slides: {
      origin: 'center',
      perView: 1,
      spacing: 20,
    },
  },
  [MutationPlugin]
);

const dotHelper = () => {
  dots.value = slider.value
    ? [...Array(slider.value.track.details?.slides?.length).keys()]
    : [];
};

onMounted(() => {
  dotHelper();
});
</script>

<template>
  <template v-if="cards?.length">
    <div
      ref="container"
      class="keen-slider relative-position"
      style="height: 245px; padding: 20px 0px"
    >
      <template v-for="(card, i) in cards" :key="i">
        <span
          class="bg-white text-green-100 fixed-top-right absolute-top-right row items-center justify-between show-card-span"
        >
          <IconEye />
          <span class="q-ml-xs text-caption"> Show Card Number </span>
        </span>
        <q-card
          class="bg-green-100 keen-slider__slide"
          :class="{
            disabled: card.cardState === CardState.FREEZED,
          }"
          style="border-radius: 0.8rem"
        >
          <q-card-section class="row">
            <q-space />
            <aspire-logo-full></aspire-logo-full>
          </q-card-section>
          <q-card-section class="text-white q-py-none q-px-lg q-gutter-y-md">
            <p class="text-h6 text-weight-bold no-padding no-margin">
              {{ card.cardHolderName }}
              <span v-if="card.cardState === CardState.FREEZED">(Freezed)</span>
            </p>
            <div class="inline-block q-gutter-x-md items-center justify-start">
              <span> &#9679; &#9679; &#9679; &#9679; </span>
              <span> &#9679; &#9679; &#9679; &#9679; </span>
              <span> &#9679; &#9679; &#9679; &#9679; </span>
              <span class="text-caption text-weight-semi-bold">
                {{ card.cardNumber.slice(-4) }}
              </span>
            </div>
            <div
              class="inline-block text-caption text-weight-bold q-gutter-x-md"
            >
              <span> Thru: {{ card.expirationDate }} </span>
              <span>
                <span> CVV:</span>
                <span class="text-h6 text-weight-bold">
                  &lowast; &lowast; &lowast;
                </span>
              </span>
            </div>
          </q-card-section>
          <q-card-section>
            <q-img
              width="20%"
              src="src/assets/icons/Visa Logo.svg"
              class="q-ml-auto block"
            />
          </q-card-section>
        </q-card>
      </template>
    </div>
    <div v-if="slider" class="dots">
      <button
        v-for="(_slide, idx) in dots"
        @click="slider?.moveToIdx(idx)"
        :class="{ dot: true, active: current === idx }"
        :key="idx"
      ></button>
    </div>
  </template>
  <template v-else>
    <q-card class="bg-blue-80" style="height: 215px">
      <q-card-section class="column fit items-center justify-center">
        <h5 class="text-weight-medium">No Cards available</h5>
      </q-card-section>
    </q-card>
  </template>
</template>

<style>
@import url('keen-slider/keen-slider.css');

.dots {
  margin-top: -1rem;
  display: flex;
  padding: 10px 0;
  justify-content: center;
}
.dot {
  border: none;
  width: 5px;
  height: 5px;
  background: #01d167;
  border-radius: 50%;
  margin: 0 5px;
  padding: 4px;
  cursor: pointer;
  opacity: 0.1;
}
.dot:focus {
  outline: none;
}
.dot.active {
  padding: 4px 8px;
  border-radius: 16px;
  opacity: 1;
}

.show-card-span {
  z-index: -1;
  height: 2.5rem;
  padding-inline: 0.5rem;
  padding-bottom: 1rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
