<script setup lang="ts">
import { computed, onMounted, PropType, ref, toRaw, watch } from 'vue';
import { KeenSliderPlugin, useKeenSlider } from 'keen-slider/vue';
import { ICard } from 'src/models/card';

defineProps({
  cards: {
    type: Object as PropType<ICard[]>,
  },
});

const current = ref(1);
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
    },
    updated() {
      console.log('updated');
    },
  },
  [MutationPlugin]
);

const dotHelper = () => {
  dots.value = slider.value
    ? [...Array(slider.value.track.details.slides.length).keys()]
    : [];
};

onMounted(() => {
  dotHelper();
});
</script>

<template>
  <div ref="container" className="keen-slider">
    <template v-for="(card, i) in cards" :key="i">
      <q-card
        class="bg-green-100 full-width keen-slider__slide"
        :class="{}"
        style="height: 200px"
      >
        <q-card-section class="">
          <q-img
            width="25%"
            src="/icons/svg/AspireLogoFull.svg"
            class="q-ml-auto block"
          />
        </q-card-section>
        <q-card-section class="text-white q-py-none q-px-lg q-gutter-y-md">
          <span class="text-h6 text-weight-bold">
            {{ card.cardHolderName }}
          </span>
          <div class="inline-block q-gutter-x-md items-center justify-start">
            <span> &#9679; &#9679; &#9679; &#9679; </span>
            <span> &#9679; &#9679; &#9679; &#9679; </span>
            <span> &#9679; &#9679; &#9679; &#9679; </span>
            <span class="text-caption text-weight-semi-bold">
              {{ card.cardNumber.slice(-4) }}
            </span>
          </div>
          <div class="inline-block text-caption text-weight-bold q-gutter-x-md">
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
            src="/icons/svg/Visa Logo.svg"
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

<style>
@import url('keen-slider/keen-slider.css');

.dots {
  display: flex;
  padding: 10px 0;
  justify-content: center;
}
.dot {
  border: none;
  width: 10px;
  height: 10px;
  background: #c5c5c5;
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
}
.dot:focus {
  outline: none;
}
.dot.active {
  background: #000;
}
</style>
