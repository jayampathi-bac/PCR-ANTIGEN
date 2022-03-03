<script setup lang="ts">
import {computed, onMounted, ref, inject, watch} from 'vue'

import getResults from '/@src/composable/resultData'
import ResultService from '/@src/service/resultService';

import {useCookies} from "vue3-cookies";
import useNotyf from "/@src/composable/useNotyf";

import {socket_url, socket_url2} from "/@src/utils/basic_config";

const notif = useNotyf()
const isLoaderActive = ref(false)
const resultService = new ResultService();

const {cookies} = useCookies();

const {search, results, brands, searchAllBrandsToResults} = getResults();

const sendResutlsModelOpen = ref(false)
const captureUserImageModel = ref(false)
const captureTestImageModel = ref(false)
const capturedCustomerImage = ref('')
const capturedTestImage = ref('')
const test_name = ref('抗原検査')

const swal = inject('$swal')

const filters = ref('')

const filteredData = computed(() => {
  if (!filters.value) {
    return results.value
  } else {
    return results.value.filter((item) => {
      return (
        item.customer_contact.match(new RegExp(filters.value, 'i')) ||
        item.profile_url.match(new RegExp(filters.value, 'i')) ||
        item.logged_at.match(new RegExp(filters.value, 'i')) ||
        item.name.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});

// VModel Data
//selected_customer object data = c
const selected_customer = ref('');
const date = ref(new Date())
let result = ref('陰性（―）')
const testResult = ref(null)
const resultOptions = [
  '陽性（＋）',
  '陰性（―）',
]

const selectedBrand = ref(0)

const loadSendResult = (customer: string) => {
  sendResutlsModelOpen.value = true
  selected_customer.value = customer
}

const issueResult = () => {

  isLoaderActive.value = !isLoaderActive.value
  if (testResult.value && selectedBrand.value !== 0) {
    // console.log("here here")
    sendResutlsModelOpen.value = false
    swal.fire({
      title: `${selected_customer.value.name} 様の検査結果送信してもよろしいでしょうか？`,
      showCancelButton: true,
      cancelButtonText:'キャンセル',
      confirmButtonText: '結果を送信',
      confirmButtonColor: '#41b883',
    }).then((result: any) => {
      // console.log("testing negative",testResult.value)
      // console.log("result", result)
      if (result.isConfirmed) {
        let formdata = new FormData()
        formdata.append('contact_number', selected_customer.value.customer_contact)
        formdata.append('record_state', '1')
        formdata.append('testkit_id', selectedBrand.value.toString())
        formdata.append('branch_id', cookies.get('admin2').branch_id.toString())
        if (testResult.value === '陰性（―）') {
          formdata.append('script_image_url', capturedTestImage.value);
          formdata.append('user_image_url', capturedCustomerImage.value);
          formdata.append('test_result', '0');
          resultService.generateResult(formdata).then(function (response) {
            // console.log('response', response)
            if (response.data.success) {
              callingWebSocket2(selected_customer.value.customer_contact, "COMPLETE")
            } else {
              // notif.warning(response.data.message)
              notif.warning('エラーが発生しました。')
            }
            isLoaderActive.value = !isLoaderActive.value
          }).catch(function (error) {
            console.log(error);
            isLoaderActive.value = !isLoaderActive.value
          });
        }else {
          formdata.append('script_image_url', '');
          formdata.append('user_image_url', '');
          formdata.append('test_result', '1');
          resultService.generateResult(formdata).then(function (response) {
            // console.log('response', response)
            if (response.data.success) {
              callingWebSocket2(selected_customer.value.customer_contact, "COMPLETE")
            } else {
              // notif.warning(response.data.message)
              notif.warning('エラーが発生しました。')
            }
            isLoaderActive.value = !isLoaderActive.value
          }).catch(function (error) {
            console.log(error);
            isLoaderActive.value = !isLoaderActive.value
          });

        }
      } else if (result.isDenied) {
        // console.log("here is me")
        // swal.fire('Sending Results Failed', '', 'info')
        swal.fire('検査結果送信エラーが発生しました。', '', 'info')
        isLoaderActive.value = !isLoaderActive.value
      } else if (result.isDismissed) {z``
        sendResutlsModelOpen.value = true
        isLoaderActive.value = !isLoaderActive.value
      }
    })
  } else {
    notif.warning("未入力フィールドが入力してください。")
    isLoaderActive.value = !isLoaderActive.value
  }

}

const clearFields = () => {
  testResult.value = null
  selectedBrand.value = 0
}

const openCaptureUserImageModel = () => {
  captureUserImageModel.value = true
}
const openCaptureTestImageModel = () => {
  captureTestImageModel.value = true
}
const closeCaptureUserImageModel = () => {
  captureUserImageModel.value = false
}
const closeCaptureTestImageModel = () => {
  captureTestImageModel.value = false
}

const savedCustomerImage = (value: any) => {
  capturedCustomerImage.value = value
  // console.log('savedCustomerImage',value);
};

const isDisabled = (customer: object) => (customer.status === 'COMPLETE' || customer.status === 'INCOMPLETE');

const savedTestImage = (value: any) => {
  capturedTestImage.value = value
  // console.log('savedTestImage', value);
};

const selectedCustomerVoid = ref({})

const voidCustomer = (customer: object) => {
  selectedCustomerVoid.value = customer
  // console.log('voidCustomer', customer);
  swal.fire({
    title: `${customer.name} 様の検査依頼削除してもよろしいでしょうか？`,
    showCancelButton: true,
    confirmButtonText: '空所',
    cancelButtonText:'キャンセル',
    confirmButtonColor: '#41b883',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //[[[[[[[[[[[[[[[[[
      let formdata = new FormData()
      formdata.append('contact_number', selectedCustomerVoid.value.customer_contact)
      formdata.append('record_state', '0')
      formdata.append('testkit_id', '1')
      formdata.append('branch_id', cookies.get('admin2').branch_id.toString())
      formdata.append('script_image_url', '');
      formdata.append('user_image_url', '');
      formdata.append('test_result', '2');
      //[[[[[[[[[[[[[[[[[
      resultService.generateResult(formdata).then(function (response) {
        if (response.data.success) {
          callingWebSocket2(customer.customer_contact, "INCOMPLETE")
        }else {
          notif.warning('エラーが発生しました。')
        }
      })

      // resultService.updateAvailableLogStatus({
      //   contact_number: customer.customer_contact,
      //   status: 'INCOMPLETE',
      //   branch_id: cookies.get('admin2').branch_id,
      // })
      //   .then(function (response) {
      //     console.log('response', response)
      //     if (response.data.success) {
      //       notif.success(response.data.message)
      //       swal.fire('Void Successful!', '', 'success')
      //       search();
      //     } else {
      //       notif.warning(response.data.message)
      //     }
      //   }).catch(function (error) {
      //   console.log(error);
      // });

    }
  })
};

let connection = null
let connection2 = null

//websocket connection 2
const callingWebSocket2 = (contact: any, state: string) => {
  // console.log("Starting connection to WebSocket Server 2")
  connection2 = new WebSocket(socket_url2)

  connection2.onmessage = function (event) {
    // console.log("connection2 response came")
    // console.log("connection2",event.data);
    if (event.data === 'updated') {
        notif.success('検査結果送信完了')
        swal.fire('検査結果送信完了', '', 'success')
        clearFields();
        search();
    } else  {
      notif.warning('エラーが発生しました。')
      swal.fire('エラーが発生しました。', '', 'error')
      clearFields();
      search();
    }

  }

  connection2.onopen = function (event) {
    // console.log('connection2 onopen',event)
    // console.log("Successfully connected to the echo websocket server 2...")
    // console.log("contact number here here here",contact)
    // console.log("contact number here here here",JSON.stringify({'contact_number': contact, "status": "INCOMPLETE", "branch_id":cookies.get('admin2').branch_id}))
    // setInterval(() => connection.send(JSON.stringify({ event: "ping" })), 10000);
    connection2.send(JSON.stringify({'contact_number': contact, "status": state, "branch_id":cookies.get('admin2').branch_id}));
  }

  // contact_number: customer.customer_contact,
  //   status: 'INCOMPLETE',
  //   branch_id: cookies.get('admin2').branch_id,
  // connection2.send('{"contact_number": "0998765434","branch_id":"1"}');

  connection2.onclose = function(){
    // console.log('connection2 onclose')
    connection2 = new WebSocket(socket_url2)
  };
}

const callingWebSocket = () => {
  // console.log("Starting connection to WebSocket Server")
  connection = new WebSocket(socket_url)


  connection.onmessage = function (event) {
    // console.log("response came")
    // console.log(event);
    if (event.data !== 'ALREDY HEREE 2') {
      const myObj = JSON.parse(event.data);
      // console.log("myObj",myObj);
      if (cookies.get('admin2').branch_id === parseInt(myObj.branch_id) && myObj.condition === "true") {
        // console.log("true true true")
        search();
      }
    }
  }

  connection.onopen = function (event) {
    // console.log(event)
    // console.log("Successfully connected to the echo websocket server...")
    // setInterval(() => connection.send(JSON.stringify({ event: "ping" })), 10000);
  }

  connection.onclose = function(){
    connection = new WebSocket(socket_url)
  };
}

const connected = ref(false);
const received_messages = ref([]);
const hasCameraSupport = ref(true);

const checkCameraSupport = () => {
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment'
    },
  }).then(stream => {

  }).catch(error => {
    hasCameraSupport.value = false
  })
}


onMounted(async () => {
  search();
  callingWebSocket();
  searchAllBrandsToResults();
  checkCameraSupport();

})

const refreshSearch = () => {

  search()
}

</script>

<template>
  <VLoader size="large"  center="smooth" lighter="true" translucent="true" :active="isLoaderActive">
  <div>
    <div class="list-flex-toolbar flex-list-v1">
      <V-Field>
        <V-Control icon="feather:search">
          <input
            v-model="filters"
            class="input custom-text-filter"
            placeholder="検索"
          />
        </V-Control>
      </V-Field>

      <V-Buttons>
        <V-Button @click="refreshSearch()" color="primary" icon="feather:refresh-cw" elevated>
          更新
        </V-Button>
      </V-Buttons>
    </div>

    <div class="page-content-inner">
      <div class="flex-list-wrapper flex-list-v1">
        <!--List Empty Search Placeholder -->
<!--        <V-PlaceholderPage-->
<!--          :class="[filteredData.length !== 0 && 'is-hidden']"-->
<!--          title="対象のものはございませんでした。"-->
<!--          subtitle="Too bad. Looks like we couldn't find any matching results for the-->
<!--          search terms you've entered. Please try different search terms or-->
<!--          criteria."-->
<!--          larger-->
<!--        >-->
          <V-PlaceholderPage
            :class="[filteredData.length !== 0 && 'is-hidden']"
            title="対象のものはございませんでした。"
            larger
          >
        </V-PlaceholderPage>

        <div class="flex-table">
          <!--Table header-->
          <div
            class="flex-table-header"
            :class="[filteredData.length === 0 && 'is-hidden']"
          >
            <span class="is-grow">患者</span>
            <span class="is-grow">検査依頼日時</span>
            <span class="is-grow">検査状態</span>
            <span class="is-grow">検査名</span>
            <span class="is-grow cell-end">結果送信/削除</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="customer in filteredData"
                :key="customer.customer_contact"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-media is-grow">
                  <V-Avatar
                    :picture="customer.profile_url"
                    size="medium"
                  />
                  <div>
                    <span class="item-name dark-inverted m-1">{{ customer.name }}</span>
                    <span class="item-meta">
                      <span>{{ customer.customer_contact }}</span>
                    </span>
                  </div>
                </div>
                <div class="flex-table-cell is-grow" data-th="検査依頼日時">
                  <span class="light-text">{{ customer.logged_at }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="検査状態">
                  <span class="light-text">{{ customer.status }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="検査名">
                  <span class="light-text"> 抗原検査 </span>
                </div>
                <div class="flex-table-cell is-grow cell-end" data-th="結果送信/削除">
                  <span class="mr-2">
                    <VButton
                      @click="loadSendResult(customer)"
                      color="primary"
                      outlined
                      :disabled="isDisabled(customer)"
                    > 結果を送信
                    </VButton>
                  </span>
                  <span>
                    <VButton
                      @click="voidCustomer(customer)"
                      color="danger"
                      :disabled="isDisabled(customer)"
                      outlined> 削除</VButton>
                  </span>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
<!--        <V-FlexPagination-->
<!--          v-if="filteredData.length > 5"-->
<!--          :item-per-page="10"-->
<!--          :total-items="873"-->
<!--          :current-page="42"-->
<!--          :max-links-displayed="7"-->
<!--        />-->
      </div>
    </div>
    <VModal
      :open="sendResutlsModelOpen"
      size="large"
      actions="center"
      @close="sendResutlsModelOpen = false"
      title="検査情報"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div class="columns">
                <div class="column is-12">
                  <V-Field>
                    <V-Control icon="feather:phone">
                      <input
                        type="text"
                        class="input"
                        readonly
                        placeholder="患者ID"
                        autocomplete="customer-id"
                        v-model="selected_customer.customer_contact"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field>
                    <V-Control icon="feather:calendar">
                      <v-date-picker v-model="date" mode="date">
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
                        v-model="test_name"
                        readonly
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field class="is-autocomplete-select">
                    <VControl icon="feather:search">
                      <Multiselect
                        v-model="selectedBrand"
                        :options="brands"
                        placeholder="検査キットを選択してください。"
                        :searchable="true"
                      >
                      </Multiselect>
                    </VControl>
                  </V-Field>
                  <V-Field class="is-autocomplete-select">
                    <V-Control icon="feather:activity">
                      <Multiselect
                        v-model="testResult"
                        :options="resultOptions"
                        :searchable="true"
                        placeholder="検査結果"
                      />
                    </V-Control>
                  </V-Field>
                  <V-Field v-show="testResult === '陰性（―）'">
                    <V-Control>
                      <VButtons class="is-centered">
                        <VButton @click="openCaptureUserImageModel()"
                                 color="info" icon="feather:user" raised rounded outlined
                                 :disabled="!hasCameraSupport"
                        > 本人顔写真撮影
                        </VButton>
                        <VButton @click="openCaptureTestImageModel()"
                                 :disabled="!hasCameraSupport"
                                 color="danger" icon="feather:activity" raised rounded outlined>
                          抗原検査キット撮影
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
        <VButton @click="sendResutlsModelOpen = false"> キャンセル </VButton>
        <VButton color="primary" raised @click="issueResult()">検査結果送信</VButton>
      </template>
    </VModal>
    <VModal
      :open="captureUserImageModel"
      size="large"
      actions="center"
      @close="closeCaptureUserImageModel"
      title="本人顔写真撮影"
    >
      <template #content>
        <capture-user-image :is-opened="captureUserImageModel" @savedCustomerImage="savedCustomerImage"/>

      </template>
      <template #action>
        <VButton @click="captureUserImageModel = false"> キャンセル </VButton>
        <VButton color="primary" raised @click="closeCaptureUserImageModel">画像を保存</VButton>
      </template>
    </VModal>
    <VModal
      :open="captureTestImageModel"
      size="large"
      actions="center"
      @close="closeCaptureTestImageModel"
      title="抗原検査キット撮影"
    >
      <template #content>
        <capture-test-image :is-opened="captureTestImageModel" @savedTestImage="savedTestImage"/>

      </template>
      <template #action>
        <VButton @click="captureTestImageModel = false"> キャンセル </VButton>
        <VButton color="primary" raised @click="closeCaptureTestImageModel">画像を保存</VButton>
      </template>
    </VModal>
  </div>
  </VLoader>
</template>

<style lang="scss" scoped>
@import '../../../../scss/abstracts/_variables.scss';

.has-top-nav {
  .flex-list-wrapper,
  .list-flex-toolbar {
    max-width: 880px;
    margin-right: auto;
    margin-left: auto;
  }
}

.camera-frame {
  border: 2px solid black;
  border-radius: 5px;
}

.swal2-title {
  font-size: 20px !important;
}

.swal2-styled.swal2-confirm {
  background-color: #41b883 !important;
}

.v-modal-close {
  .v-button {
    display: none !important;
  }

}
</style>
