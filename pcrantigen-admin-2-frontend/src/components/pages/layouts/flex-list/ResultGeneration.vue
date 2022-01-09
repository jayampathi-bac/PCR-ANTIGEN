<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'

import getResults from '/@src/composable/resultData'

import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

const {search, results, generateResult} = getResults();

const sendResutlsModelOpen = ref(false)
const captureUserImageModel = ref(false)
const captureTestImageModel = ref(false)
const capturedCustomerImage = ref(null)
const capturedTestImage = ref(null)

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return results.value
  } else {
    return results.value.filter((item) => {
      return (
        item.contact_number.match(new RegExp(filters.value, 'i')) ||
        item.user_image_url.match(new RegExp(filters.value, 'i')) ||
        item.created_at.match(new RegExp(filters.value, 'i')) ||
        item.record_status.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

// VModel Data
const selected_customer_id = ref('');
const date = ref(new Date())
let result = ref('Negative')
const testResult = ref(0)
const resultOptions = [
  'Positive',
  'Negative',
]

const loadSendResult = (customerID: string) => {
  sendResutlsModelOpen.value = true
  selected_customer_id.value = customerID
}

const issueResult = (customerID: string) => {
  // console.log("capturedCustomerImage",capturedCustomerImage.value)
  // console.log("capturedTestImage",capturedTestImage.value)
  generateResult({
    created_at:'2020-02-02',
    contact_number:1234,
    record_status:'Positive',
    script_image_url:'https://www.testing.com/test.jpg',
    user_image_url:'https://www.testing.com/test.jpg',
    branch_id: cookies.get('admin2').branch_id
  })
}

const openCaptureUserImageModel = () => {
  captureUserImageModel.value = true
}
const openCaptureTestImageModel = () => {
  captureTestImageModel.value = true
}

const savedCustomerImage = (value: any) => {
  capturedCustomerImage.value = value
  // console.log('savedCustomerImage',value);
};

const savedTestImage = (value: any) => {
  capturedTestImage.value = value
  console.log('savedTestImage',value);
};

const connected = ref(false);
const received_messages = ref([]);

// const connect = () => {
//   let socket = new SockJS("http://localhost:8080/gs-guide-websocket");
//   let stompClient = Stomp.over(socket);
//   stompClient.connect(
//     {},
//     frame => {
//       connected.value = true;
//       console.log(frame);
//       stompClient.subscribe("/topic/greetings", tick => {
//         console.log(tick);
//         received_messages.value.push(JSON.parse(tick.body).content);
//       });
//     },
//     error => {
//       console.log(error);
//       connected.value = false;
//     }
//   );
// }

onMounted(async () => {
  search();
  // connect();
})
</script>

<template>
  <div>
    <div class="list-flex-toolbar flex-list-v1">
      <V-Field>
        <V-Control icon="feather:search">
          <input
            v-model="filters"
            class="input custom-text-filter"
            placeholder="Search..."
          />
        </V-Control>
      </V-Field>

      <V-Buttons>
        <V-Button color="primary" icon="fas fa-plus" elevated>
          Add Test
        </V-Button>
      </V-Buttons>
    </div>

    <div class="page-content-inner">
      <div class="flex-list-wrapper flex-list-v1">
        <!--List Empty Search Placeholder -->
        <V-PlaceholderPage
          :class="[filteredData.length !== 0 && 'is-hidden']"
          title="We couldn't find any matching results."
          subtitle="Too bad. Looks like we couldn't find any matching results for the
          search terms you've entered. Please try different search terms or
          criteria."
          larger
        >
        </V-PlaceholderPage>

        <div class="flex-table">
          <!--Table header-->
          <div
            class="flex-table-header"
            :class="[filteredData.length === 0 && 'is-hidden']"
          >
            <span class="is-grow">Customer ID</span>
            <span>Time Logged</span>
            <span>Test State</span>
            <span>Test Type</span>
            <span class="cell-end">Actions</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="customer in filteredData"
                :key="customer.customer_contact_number"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-media is-grow">
                  <V-Avatar
                    :picture="customer.user_image_url"
                    size="medium"
                  />
                  <div>
                    <span class="item-name dark-inverted">{{ customer.customer_contact_number }}</span>
                  </div>
                </div>
                <div class="flex-table-cell" data-th="Time Logged">
                  <span class="light-text">{{ customer.created_at }}</span>
                </div>
                <div class="flex-table-cell" data-th="State">
                  <span class="light-text">{{ customer.record_status }}</span>
                </div>
                <div class="flex-table-cell" data-th="Test Type">
                  <span
                    v-if="customer.record_status === '1'"
                    class="tag is-success is-rounded"
                  >
                    Positive
                  </span>
                  <span
                    v-if="customer.record_status === '0'"
                    class="tag is-danger is-rounded"
                  >Negative</span>
                </div>
                <div class="flex-table-cell cell-end" data-th="Actions">
                  <div class="m-2">
                    <VButton
                      @click="loadSendResult(customer.customer_contact_number)"
                      color="primary"
                      outlined
                    > Send Result
                    </VButton>
                  </div>
                  <div>
                    <VButton color="danger" outlined> Void</VButton>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
        <V-FlexPagination
          v-if="filteredData.length > 5"
          :item-per-page="10"
          :total-items="873"
          :current-page="42"
          :max-links-displayed="7"
        />
      </div>
    </div>
    <VModal
      :open="sendResutlsModelOpen"
      size="large"
      actions="center"
      @close="sendResutlsModelOpen = false"
      title="Test Details"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div class="columns">
                <div class="column is-12">
                  <V-Field>
                    <V-Control icon="feather:user">
                      <input
                        type="text"
                        class="input"
                        readonly
                        placeholder="Customer ID"
                        autocomplete="customer-id"
                        v-model="selected_customer_id"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control icon="feather:calendar">
                      <v-date-picker v-model="date" mode="dateTime">
                        <template #default="{ inputValue }">
                          <VField>
                            <VControl>
                              <input class="input" readonly :value="inputValue"/>
                            </VControl>
                          </VField>
                        </template>
                      </v-date-picker>
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control icon="feather:book-open">
                      <input
                        type="text"
                        class="input"
                        placeholder="Test Name"
                        autocomplete="test-name"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control >
                      <Multiselect
                        v-model="testResult"
                        :options="resultOptions"
                        :max-height="145"
                        placeholder="Test Result"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field v-show="testResult === 'Negative'">
                    <V-Control >
                      <VButtons class="is-centered">
                        <VButton @click="openCaptureUserImageModel()"
                                 color="info" icon="feather:user" raised rounded outlined
                        > Capture Customer Image</VButton>
                        <VButton @click="openCaptureTestImageModel()"
                                 color="danger" icon="feather:activity" raised rounded outlined>
                          Capture Test Image
                        </VButton>
                      </VButtons>
                    </V-Control>
                  </V-Field>
                </div>
              </div>

            </div>
          </div>

        </form>

      </template>
      <template #action>
        <VButton color="primary" raised @click="issueResult()">Issue Result</VButton>
      </template>
    </VModal>
    <VModal
      :open="captureUserImageModel"
      size="large"
      actions="center"
      @close="captureUserImageModel = false"
      title="Capture Customer Image"
    >
      <template #content>
        <capture-user-image :is-opened="captureUserImageModel" @savedCustomerImage="savedCustomerImage"/>

      </template>
      <template #action>
        <VButton color="primary" raised @click="issueResult()">Save Image</VButton>
      </template>
    </VModal>
    <VModal
      :open="captureTestImageModel"
      size="large"
      actions="center"
      @close="captureTestImageModel = false"
      title="Capture Test Record Image"
    >
      <template #content>
        <capture-test-image :is-opened="captureTestImageModel" @savedTestImage="savedTestImage"/>

      </template>
      <template #action>
        <VButton color="primary" raised @click="issueResult()">Save Image</VButton>
      </template>
    </VModal>
  </div>

</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';

.has-top-nav {
  .flex-list-wrapper,
  .list-flex-toolbar {
    max-width: 880px;
    margin-right: auto;
    margin-left: auto;
  }
}
.camera-frame{
  border: 2px solid black;
  border-radius: 5px;
}
</style>
