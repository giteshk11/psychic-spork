<script setup lang="ts">
import { CardState, tabs } from 'src/models/constats';
import { ref } from 'vue';
import Card from '../models/card';
import QuickActions from 'src/components/QuickActions.vue';
import UserDetails from 'src/components/UserDetails.vue';
import CardSlider from 'src/components/CardSlider.vue';
import AddNewCard from 'src/components/AddNewCard.vue';
import { watch } from 'vue';

const mockCard = new Card({
  cardId: 999,
  cardHolderName: 'Mark Henry',
  expirationDate: '02/25',
  cardNumber: '1234567891121222',
});

const currentCard = ref(999);

const cards = ref([mockCard]);

const isModalOpen = ref(false);

const selectedTab = ref(tabs[1].name);

const cancelCardModal = ref(false);
const confirmDeleteCard = ref(false);

const actionClicked = (actionId: string) => {
  switch (actionId) {
    case 'freezeCard': {
      cards.value = cards.value.map((card) => {
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
    case 'unfreezeCard': {
      cards.value = cards.value.map((card) => {
        if (card.cardId === currentCard.value) {
          return {
            ...card,
            cardState: CardState.ACTIVE,
          };
        }
        return card;
      });
      break;
    }
    case 'cancelCard': {
      cancelCardModal.value = true;
      if (!confirmDeleteCard.value) {
        return;
      }
      break;
    }
  }
};

watch(confirmDeleteCard, (value) => {
  if (value) {
    const temp = cards.value.filter(
      (card) => card.cardId !== currentCard.value
    );
    cards.value = temp.length ? [...temp] : [];
    currentCard.value = temp.length ? temp[0].cardId : -1;
    confirmDeleteCard.value = false;
  }
});
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
      <div class="q-mt-md" style="max-width: 300px">
        <q-tabs
          v-model="selectedTab"
          no-caps
          dense
          class="no-padding text-caption"
          indicator-color="light-blue-3"
        >
          <template v-for="(tab, i) in tabs" :key="i">
            <q-tab :name="tab.name" :label="tab.label" />
          </template>
        </q-tabs>
      </div>
      <div class="q-mt-lg">
        <card-slider
          :cards="cards"
          @card-changed="(val) => (currentCard = val)"
        ></card-slider>
      </div>
    </div>

    <!-- 2nd section -->
    <q-card
      class="rounded-borders no-shadow"
      style="z-index: 2; top: 64vh; min-height: 40vh; border-radius: 20px"
    >
      <q-card-section class="q-pa-xs bg-blue-50">
        <quick-actions
          :current-card="cards.filter((card) => card.cardId)[0]"
          @click="actionClicked"
        />
      </q-card-section>
      <q-card-section style="padding-bottom: 75px">
        <user-details />
        <q-dialog full-width v-model="isModalOpen">
          <add-new-card
            @close-model="isModalOpen = false"
            @add-card="(val) => cards.push(val)"
          ></add-new-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog v-model="cancelCardModal" persistent position="bottom">
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-mx-auto text-body1">
          Are you sure you want to delete this card?
        </span>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="confirmDeleteCard = false"
          v-close-popup
        />
        <q-btn
          flat
          label="Delete"
          color="red"
          @click="confirmDeleteCard = true"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.header-logo {
  width: 1.4rem;
  height: 1.3rem;
}
</style>
