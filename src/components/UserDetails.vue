<script setup lang="ts">
import { recentTransaction } from 'src/models/constats';
</script>
<template>
  <q-list class="q-gutter-y-md">
    <q-expansion-item
      icon="img:/icons/svg/Group 11889 (1).svg"
      label="Card Details"
      class="no-padding rounded-borders"
      header-class="shadow-1 bg-blue-50"
      expand-icon="img:/icons/svg/down-arrow.svg"
    >
    </q-expansion-item>
    <q-expansion-item
      icon="img:/icons/svg/Group 11889.svg"
      label="Recent Transactions"
      header-class="shadow-1 bg-blue-50"
      class="no-padding rounded-borders"
      expand-icon="img:/icons/svg/down-arrow.svg"
      default-opened
    >
      <q-card style="top: 2px">
        <q-card-section>
          <q-list>
            <q-item v-for="(trans, i) in recentTransaction" :key="i">
              <q-item-section avatar>
                <q-icon :name="`img:/icons/svg/${trans.icon}.svg`" />
              </q-item-section>

              <q-item-section class="text-caption">
                <div class="row items-center justify-between">
                  <div class="column">
                    <span class="text-weight-medium text-body2">
                      {{ trans.name }}
                    </span>
                    <span class="text-weight-light">
                      {{ trans.date }}
                    </span>
                  </div>
                  <div>
                    <span>
                      {{ trans.type === 'credit' ? '+' : '-' }}
                      S$
                      {{ trans.amount }}
                    </span>
                  </div>
                </div>
                <div>Refund on card</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-item-section
          class="bg-green-50 text-white row justify-center items-center border border-green-10"
        >
          <span class="q-pa-sm text-green-100">
            View all card transcations
          </span>
        </q-item-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>
