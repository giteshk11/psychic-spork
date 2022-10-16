<script setup lang="ts">
import { ref } from 'vue';
import Card from 'src/models/card';
import { ICard } from 'src/types';
import { CardState } from 'src/models/constats';

const addedCard = ref<ICard>({
  cardHolderName: '',
  expirationDate: '',
  cardNumber: '',
  cvv: '',
  cardState: CardState.ACTIVE,
});

const emits = defineEmits(['add-card', 'close-model']);

const nameVal = new RegExp(/^[a-zA-Z ]*$/);

const cardVal = new RegExp(
  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
);

const expDateVal = new RegExp(/(0[1-9]|10|11|12)\/20[0-9]{2}$/);

const cvvVal = new RegExp(/[\d]{3}/);

function formartCardNo(val: string) {
  return val.split(' ').join('');
}

const submitting = ref(false);
const addCardForm = ref<HTMLFormElement | null>(null);

const addNewCard = () => {
  addCardForm.value?.validate().then((success: boolean) => {
    if (!success) {
      return;
    }
  });
  emits('add-card', new Card(addedCard.value));
  emits('close-model', true);
};
</script>

<template>
  <q-card class="bg-blue-50 text-blue-100">
    <q-card-section class="row items-center no-padding">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Card Details</div>
    </q-card-section>

    <q-card-section class="q-pt-none q-gutter-y-md">
      <q-form @submit.prevent="addNewCard" class="q-pa-md" ref="addCardForm">
        <q-input
          outlined
          v-model="addedCard.cardHolderName"
          label="Card Holder Name"
          :rules="[
            (val) => !!val || 'Field is required',
            (val) => nameVal.test(val) || 'Invalid Card Holder Name',
          ]"
        />
        <q-input
          outlined
          v-model="addedCard.cardNumber"
          label="Card Number"
          mask="card"
          :rules="[
            (val) => !!val || 'Field is required',
            (val) => cardVal.test(formartCardNo(val)) || 'Invalid Card Number',
          ]"
        />
        <div class="row q-gutter-x-md">
          <div class="col">
            <q-input
              outlined
              v-model="addedCard.expirationDate"
              label="Expiration Date"
              placeholder="11/2022"
              :rules="[
                (val) => !!val || 'Field is required',
                (val) => expDateVal.test(val) || 'Invalid Expiration Date',
              ]"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              v-model="addedCard.cvv"
              label="CVV"
              placeholder="123"
              :rules="[
                (val) => !!val || 'Field is required',
                (val) => cvvVal.test(val) || 'Invalid CVV',
              ]"
            />
          </div>
        </div>
        <q-btn
          :loading="submitting"
          color="primary"
          label="Add New Card"
          type="submit"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>
