<script setup lang="ts">
import { recentTransaction } from 'src/models/constats';
import IconBAF from 'src/assets/icons/business-and-finance.svg?component';
</script>
<template>
  <q-list class="q-gutter-y-md">
    <q-expansion-item
      icon="img:src/assets/icons/Group 11889 (1).svg"
      label="Card Details"
      class="no-padding rounded-borders text-blue-100 text-weight-medium"
      header-class="box-shadow bg-blue-50"
      expand-icon="img:src/assets/icons/down-arrow.svg"
    >
    </q-expansion-item>
    <q-expansion-item
      icon="img:src/assets/icons/Group 11889.svg"
      label="Recent Transactions"
      header-class="box-shadow bg-blue-50 text-blue-100 text-weight-medium"
      class="no-padding rounded-borders box-shadown"
      expand-icon="img:src/assets/icons/down-arrow.svg"
      default-opened
    >
      <q-card class="item">
        <q-card-section>
          <q-list>
            <template v-for="(trans, i) in recentTransaction" :key="i">
              <q-item>
                <q-item-section avatar>
                  <q-icon :name="`img:src/assets/icons/${trans.icon}.svg`" />
                </q-item-section>
                <q-item-section class="text-caption">
                  <div class="row items-center justify-between">
                    <div class="column">
                      <span class="text-weight-medium text-body2">
                        {{ trans.name }}
                      </span>
                      <span class="text-weight-light text-gray-10">
                        {{ trans.date }}
                      </span>
                    </div>
                    <div>
                      <span
                        :class="[
                          trans.type === 'credit' ? 'text-green-100' : '',
                          'text-weight-semi-bold text-body2',
                        ]"
                      >
                        {{ trans.type === 'credit' ? '+' : '-' }}
                        S$
                        {{ trans.amount }}
                      </span>
                    </div>
                  </div>
                  <div class="q-mt-sm">
                    <span
                      class="bg-blue-90 rounded-borders inline-row card-icon"
                    >
                      <IconBAF style="margin-bottom: 0.04rem; fill: #fff" />
                    </span>
                    <span class="text-blue-90"> Refund on card </span>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator inset v-if="recentTransaction.length - 1 !== i" />
            </template>
          </q-list>
        </q-card-section>
      </q-card>
      <div
        class="bg-green-50 text-white row justify-center items-center border border-green-10 no-padding"
      >
        <span class="q-pa-md text-green-100"> View all card transcations </span>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<style scoped>
.item {
  border: 1px solid #f0f0f0;
}

.card-icon {
  padding: 1px 6.5px;
  border-radius: 8px;
}
</style>
