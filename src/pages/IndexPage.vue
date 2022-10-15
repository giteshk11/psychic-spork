<script setup lang="ts">
import { tabs } from 'src/models/constats';
import { ref } from 'vue';
import Card, { ICard, CardState } from '../models/card';
import QuickActions from 'src/components/QuickActions.vue';
import UserDetails from 'src/components/UserDetails.vue';
import CardSlider from 'src/components/CardSlider.vue';

const mockCard = new Card({
  cardId: 999,
  cardHolderName: 'Mark Henry',
  expirationDate: '02/25',
  cardNumber: '1234567891121222',
});

const addedCard = ref<ICard>({
  cardHolderName: '',
  expirationDate: '',
  cardNumber: '',
  cardState: CardState.ACTIVE,
});

const currentCard = ref(999);

const cards = ref([mockCard]);

const isModalOpen = ref(false);

const addNewCard = (event: any) => {
  cards.value.push(new Card(addedCard.value));
  isModalOpen.value = false;
  addedCard.value = new Card({
    cardHolderName: '',
    cardNumber: '',
    expirationDate: '',
  });
};

const selectedTab = ref(tabs[0].name);

const actionClicked = (actionId: string) => {
  switch (actionId) {
    case 'freezeCard': {
      cards.value.map((card) => {
        if (card.cardId === currentCard.value) {
          return {
            ...card,
            cardState: CardState.FREEZED,
          };
        }
        return card;
      });
      break;
    }
    case 'cancelCard': {
      cards.value.map((card) => {
        if (card.cardId === currentCard.value) {
          return {
            ...card,
            cardState: CardState.DELETED,
          };
        }
        return card;
      });
      break;
    }
  }
};
</script>

<template>
  <q-page class="relative-position bg-blue-100">
    <!-- 1st section -->
    <div
      style="z-index: 1; width: 100%; position: fixed"
      class="q-px-lg q-mt-md text-white"
    >
      <div class="w-full">
        <q-icon
          name="img:/icons/svg/AspireLogo.svg"
          class="q-ml-auto block header-logo"
        ></q-icon>
      </div>
      <div class="row justify-between items-center">
        <div class="column full-width">
          <span class="q-pb-xs text-caption text-weight-regular">
            Account Balance
          </span>
          <div class="row justify-between full-width">
            <div class="flex items-center q-gutter-x-sm">
              <q-chip
                size="0.65rem"
                square
                class="bg-green-100 text-white text-weight-semi-bold px-4"
              >
                S$
              </q-chip>
              <span class="text-h5 text-weight-bold"> 3,000 </span>
            </div>
            <div
              class="row self-end items-center q-gutter-xs"
              style="color: #23cefd"
              @click="isModalOpen = true"
            >
              <q-icon name="add_circle" />
              <span class="text-caption text-weight-medium"> New Card </span>
            </div>
          </div>
        </div>
      </div>
      <div style="max-width: 300px">
        <q-tabs
          v-model="selectedTab"
          no-caps
          dense
          class="no-padding"
          :indicator-color="'yellow'"
        >
          <template v-for="(tab, i) in tabs" :key="i">
            <q-tab :name="tab.name" :label="tab.label" />
          </template>
        </q-tabs>
      </div>
      <div class="q-mt-lg">
        <card-slider :cards="cards"></card-slider>
      </div>
    </div>

    <!-- 2nd section -->
    <q-card
      class="rounded-borders no-shadow"
      style="z-index: 2; top: 64vh; min-height: 40vh; border-radius: 20px"
    >
      <q-card-section class="q-pa-xs">
        <quick-actions
          :current-card="cards.filter((card) => card.cardId)[0]"
          @click="actionClicked"
        />
      </q-card-section>
      <q-card-section style="padding-bottom: 75px">
        <user-details />
        <q-dialog
          v-model="isModalOpen"
          transition-show="flip-down"
          transition-hide="flip-up"
        >
          <q-card class="bg-blue-50 text-white">
            <q-card-section class="row items-center q-pb-none">
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
              <div class="text-h6">Card Details</div>
            </q-card-section>

            <q-card-section class="q-pt-none q-gutter-y-md">
              <q-input
                outlined
                v-model="addedCard.cardHolderName"
                label="Card Holder Name"
              />
              <q-input
                outlined
                v-model="addedCard.cardNumber"
                label="Card Number"
              />
              <q-input
                outlined
                v-model="addedCard.expirationDate"
                label="Expiration Number"
              />
              <q-btn color="primary" label="Add New Card" @click="addNewCard" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
.header-logo {
  width: 1.4rem;
  height: 1.3rem;
}
</style>
