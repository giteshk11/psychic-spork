<script setup lang="ts">
import { CardState, tabs } from 'src/models/constats';
import { ref, toRaw, watch } from 'vue';
import Card from 'src/models/card';
import QuickActions from 'src/components/QuickActions.vue';
import UserDetails from 'src/components/UserDetails.vue';
import CardSlider from 'src/components/CardSlider.vue';
import AddNewCard from 'src/components/AddNewCard.vue';
import AspireLogo from 'src/assets/icons/AspireLogo.svg?component';

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

const addCard = (val: any) => {
  cards.value.push(val);
  currentCard.value = val.cardId;
  localStorage.setItem('cards', JSON.stringify(toRaw(cards.value)));
};

const retreiveCards = () => {
  const temp = localStorage.getItem('cards');
  if (temp) {
    cards.value = JSON.parse(temp);
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

watch(cards, () => {
  localStorage.setItem('cards', JSON.stringify(toRaw(cards.value)));
});

retreiveCards();
</script>

<template>
  <q-page class="relative-position bg-blue-100">
    <!-- 1st section -->
    <div class="q-px-lg q-mt-md text-white wrapper">
      <div class="w-full">
        <AspireLogo class="q-ml-auto block header-logo"></AspireLogo>
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
      <div class="q-mt-md slider-wrapper">
        <card-slider
          :curren-card="currentCard"
          :cards="cards"
          @card-changed="(val) => (currentCard = val)"
        />
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
            @add-card="addCard"
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

.wrapper {
  z-index: 1;
  width: 100%;
  position: fixed;
  height: 40%;
}

.slider-wrapper {
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@media only screen and (min-width: 600px) {
  .slider-wrapper {
    max-width: 50vw;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 1024px) {
  .slider-wrapper {
    max-width: 30vw;
    margin: 0 10rem;
  }
}

@media only screen and (min-width: 1440px) {
  .slider-wrapper {
    max-width: 30vw;
    margin: 0 20rem;
  }
}
</style>
