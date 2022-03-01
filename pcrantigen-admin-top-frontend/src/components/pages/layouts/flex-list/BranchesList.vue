<script setup lang="ts">
import {computed, onMounted, ref, inject} from 'vue'

import getBranches from '/@src/composable/branchData'

import useNotyf from '/@src/composable/useNotyf'

import BranchService from '/@src/service/branchService';

import {useCookies} from "vue3-cookies";
import {useRoute} from "vue-router";
import html2canvas from "html2canvas";

const swal = inject('$swal')

const {cookies} = useCookies();
const route = useRoute()
const branchService = new BranchService();

const notif = useNotyf()

const {searchAllBranches, searchAllGroupsToBranch, allBranchesCount, branches, groups} = getBranches();

const centeredActionsOpen = ref(false)
const editActionsOpen = ref(false)
const viewActionsOpen = ref(false)
const QrCodeActionsOpen = ref(false)
const deleteActionsOpen = ref(false)

const filters = ref('')
const isLoaderActive = ref(false)

const filteredData = computed(() => {
  if (!filters.value) {
    return branches.value
  } else {
    return branches.value.filter((item) => {
      return (
        item.company_name.match(new RegExp(filters.value, 'i')) ||
        item.address.match(new RegExp(filters.value, 'i')) ||
        item.email.match(new RegExp(filters.value, 'i')) ||
        item.contact_number.match(new RegExp(filters.value, 'i')) ||
        item.group_id.match(new RegExp(filters.value, 'i'))
      )
    })
  }
});
// company_name;  address:  contact_number:  group_id:  username:  password; start_date; end_date; start_time; end_time; profile_url;
const company_name = ref('')
const address = ref('')
const contact_number = ref('')
const group_id = ref(0)
const username = ref('')
const password = ref('')
const confirm_password = ref('')
const start_date = ref()
const end_date = ref()
const branch_email = ref()
const profile_url = ref('https://sample.jvpdtest.com/User.jpg')
const unit_price = ref()

const start_time = ref()
const end_time = ref()

let start_time_test = ref(new Date());
start_time_test.value.setMinutes(0, 0, 0);

let end_time_test = ref(new Date());
end_time_test.value.setMinutes(0, 0, 0);


const edit_company_id = ref('')
const edit_company_name = ref('')
const edit_address = ref('')
const edit_branch_email = ref('')
const edit_contact_number = ref('')
const edit_group_id = ref(0)
const edit_group_name = ref('')
const edit_username = ref('')
const edit_password = ref('')
const edit_confirm_password = ref('')
const edit_start_date = ref('')
const edit_end_date = ref('')
const edit_start_time = ref()
const edit_start_time_saved = ref()
const edit_end_time = ref()
const edit_end_time_saved = ref()
const edit_profile_url = ref('')
const edit_unit_price = ref();
const selected_qr_code_url = ref('https://sample.jvpdtest.com/Qr/55360360-ddaf-4db6-9387-1000e5125967.png')
const testurl = ref('https://sample.jvpdtest.com/Qr/55360360-ddaf-4db6-9387-1000e5125967.png')


// Save branch
const fireSaveBranchFuncAlert = () => {
  // console.log("groups", groups.value, group_id.value)
  if (company_name.value && address.value && contact_number.value && (group_id.value !== 0) && branch_email.value && start_date.value && end_date.value && unit_price.value) {
    if ( contact_number.value.length === 11 || contact_number.value.length === 10) {
      centeredActionsOpen.value = false;
      swal.fire({
        title: `Do you want to save the Branch ?`,
        showCancelButton: true,
        confirmButtonText: '保存する',
        cancelButtonText:'キャンセル',
        confirmButtonColor: '#41b883',
      }).then((result) => {
        if (result.isConfirmed) {
          saveBranchFunc()
        }
      })
    }else {
      notif.warning('Not a valid contact number..!!')
    }

  } else {
    notif.warning('未入力フィールドがございます。')
  }

}

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const saveBranchFunc = () => {
  // console.log("saving")
  isLoaderActive.value = !isLoaderActive.value
  start_date.value = start_date.value.toISOString().slice(0, 10)
  end_date.value = end_date.value.toISOString().slice(0, 10)
  start_time.value = start_time_test.value.toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  })
  // console.log("----------------start_time", start_time.value.split(":")[0],start_time.value.split(":")[1])
  parseInt(start_time.value.split(":")[0]) === 24 ? (start_time.value = "00:"+start_time.value.split(":")[1]+":00") : null
  end_time.value = end_time_test.value.toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  })
  parseInt(end_time.value.split(":")[0]) === 24 ? (end_time.value = "00:"+end_time.value.split(":")[1]+":00") : null
  const branch = {
    company_name: company_name.value,
    address: address.value,
    contact_number: contact_number.value,
    group_id: group_id.value,
    username: contact_number.value,
    branch_email: branch_email.value,
    start_date: start_date.value,
    end_date: end_date.value,
    start_time: start_time.value,
    end_time: end_time.value,
    profile_url: profile_url.value,
    unit_price: formatter.format(unit_price.value)
  }
  branchService.saveBranch(branch)
    .then(function (response) {
      // console.log('response', response)
      if (response.data.success) {
        swal.fire({
          icon: 'success',
          title: '保存完了',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#41b883',
        })
        notif.success('保存完了')
        searchAllBranches(currentPage.value)
        clearFields()
        centeredActionsOpen.value = false
        isLoaderActive.value = !isLoaderActive.value
      } else {
        notif.warning(response.data.message)
        isLoaderActive.value = !isLoaderActive.value
        clearFields()
      }
    })
    .catch(function (error) {
      console.log(error);
      isLoaderActive.value = !isLoaderActive.value
      clearFields()
    });

}


// Edit branch
const openEditActionsOpen = (branch: any) => {
  // console.log("openEditActionsOpen", branch, parseInt(branch.group_id))
  // company_name;  address:  contact_number:  group_id:  username:  password; start_date; end_date; start_time; end_time; profile_url;
  editActionsOpen.value = true
  const date = new Date().toISOString().slice(0, 10).toString()

  edit_company_id.value = branch.branch_id;
  edit_company_name.value = branch.company_name;
  edit_address.value = branch.address;
  edit_branch_email.value = branch.email;
  edit_contact_number.value = branch.contact_number;
  edit_group_id.value = parseInt(branch.group_id);
  edit_start_date.value = branch.start_date;
  edit_end_date.value = branch.end_date;
  edit_start_time.value = new Date(date + " " + branch.start_time + ":00").setMinutes(0, 0, 0);
  edit_end_time.value = new Date(date + " " + branch.end_time + ":00").setMinutes(0, 0, 0);
  edit_profile_url.value = branch.profile_url;
  edit_unit_price.value = branch.unit_price;
};

// View branch
const openViewActionsOpen = (branch: any) => {
  // console.log("openEditActionsOpen", branch, parseInt(branch.group_id))
  // company_name;  address:  contact_number:  group_id:  username:  password; start_date; end_date; start_time; end_time; profile_url;
  viewActionsOpen.value = true
  const date = new Date().toISOString().slice(0, 10).toString()

  edit_company_id.value = branch.branch_id;
  edit_company_name.value = branch.company_name;
  edit_address.value = branch.address;
  edit_branch_email.value = branch.email;
  edit_contact_number.value = branch.contact_number;
  edit_group_id.value = parseInt(branch.group_id);
  edit_group_name.value = branch.group_name;
  edit_start_date.value = branch.start_date;
  edit_end_date.value = branch.end_date;
  edit_start_time.value = branch.start_time;
  edit_end_time.value = branch.end_time;
  edit_profile_url.value = branch.profile_url;
  edit_unit_price.value = branch.unit_price;
};



const openQRCodeModel = (qr_code_url: any) => {
  getBase64FromImageUrlQR(selected_qr_code_url.value)
  // console.log("QRCode ", qr_code_url)
  QrCodeActionsOpen.value = true;
  selected_qr_code_url.value = '';
  selected_qr_code_url.value = qr_code_url ? qr_code_url : 'https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-9.png'
}

const fireEditBranchFuncAlert = () => {
  // console.log("fireEditBranchFuncAlert")
  if (edit_company_id.value && edit_company_name.value && edit_address.value && edit_branch_email.value && edit_contact_number.value && edit_group_id.value && edit_start_date.value && edit_end_date.value && edit_start_time.value && edit_end_time.value && edit_profile_url.value && edit_unit_price.value) {
    swal.fire({
      title: `Do you want to edit the Branch ?`,
      showCancelButton: true,
      confirmButtonText: '修正',
      cancelButtonText:'キャンセル',
      confirmButtonColor: '#41b883',
    }).then((result) => {
      if (result.isConfirmed) {
        editBranchFunc()
      }
    })
  } else {
    notif.warning('未入力フィールドがございます。')
  }
}

const editBranchFunc = () => {
  isLoaderActive.value = !isLoaderActive.value
  // console.log("editing", edit_company_id.value)
  edit_start_time_saved.value = new Date(edit_start_time.value).toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  })
  parseInt(edit_start_time_saved.value.split(":")[0]) === 24 ? (edit_start_time_saved.value = "00:"+edit_start_time_saved.value.split(":")[1]+":00") : null

  edit_end_time_saved.value = new Date(edit_end_time.value).toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  })
  parseInt(edit_end_time_saved.value.split(":")[0]) === 24 ? (edit_end_time_saved.value = "00:"+edit_end_time_saved.value.split(":")[1]+":00") : null

  const branch = {
    branch_id: edit_company_id.value,
    company_name: edit_company_name.value,
    address: edit_address.value,
    branch_email: edit_branch_email.value,
    contact_number: edit_contact_number.value,
    group_id: edit_group_id.value,
    start_date: edit_start_date.value,
    end_date: edit_end_date.value,
    start_time: edit_start_time_saved.value,
    end_time: edit_end_time_saved.value,
    profile_url: edit_profile_url.value,
    unit_price: formatter.format(edit_unit_price.value)
  }
  branchService.editBranch(branch)
    .then(function (response) {
      // console.log('response', response)
      if (response.data.success) {
        swal.fire({
          icon: 'success',
          title: '編集完了',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#41b883',
        })
        notif.success('編集完了')
        searchAllBranches(currentPage.value)
        editActionsOpen.value = false
        isLoaderActive.value = !isLoaderActive.value
      } else {
        // swal.fire('Editing Failed!', '', 'error')
        swal.fire({
          icon: 'error',
          title: 'Editing Failed!',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#41b883',
        })
        notif.warning(response.data.message)
        editActionsOpen.value = false
        isLoaderActive.value = !isLoaderActive.value
      }
    })
    .catch(function (error) {
      console.log(error);
      isLoaderActive.value = !isLoaderActive.value
    });
}


// delete branch
const fireDeleteBrandAlert = (branch_id: number) => {
  // console.log("fireDeleteBrandAlert", branch_id)
  swal.fire({
    title: `この薬局者を削除したいですか？`,
    showCancelButton: true,
    confirmButtonText: '削除',
    cancelButtonText:'キャンセル',
    confirmButtonColor: '#41b883',
  }).then((result: any) => {
    if (result.isConfirmed) {
      deleteBranchFunc(branch_id)
    }
  })
}

const deleteBranchFunc = (branch_id: number) => {
  isLoaderActive.value = !isLoaderActive.value
  // console.log('delete this', branch_id)
  branchService.deleteBranch(branch_id)
    .then(function (response) {

      // console.log('response', response)
      if (response.data.success) {
        // swal.fire('削除完了', '', 'success')
        swal.fire({
          icon: 'success',
          title: '削除完了',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#41b883',
        })
        notif.success('削除完了')
        searchAllBranches(currentPage.value)
      } else {
        // swal.fire(response.data.message, '', 'error')
        swal.fire({
          icon: 'error',
          title: response.data.message,
          confirmButtonText: 'Okay',
          confirmButtonColor: '#41b883',
        })
        notif.warning(response.data.message)
      }
      isLoaderActive.value = !isLoaderActive.value
    })
    .catch(function (error) {
      console.log(error);
      isLoaderActive.value = !isLoaderActive.value
    });
}

function getBase64FromImageUrlQR(url : any) {
  const img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width =this.width;
    canvas.height =this.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    const dataURL = canvas.toDataURL("image/png");

    // alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));

    const img2 = document.getElementById('qr-img');
    img2.src = dataURL;
  };

  img.src = url;
}


// clear fields after saving
const clearFields = () => {
  company_name.value = ''
  branch_email.value = ''
  address.value = ''
  contact_number.value = ''
  group_id.value = 0
  username.value = ''
  confirm_password.value = ''
  start_date.value = null
  end_date.value = null
  unit_price.value = null
}

const currentPage = computed(() => {
  try {
    // console.log("currentPage", Number.parseInt(route.query.page as string) || 1)
    searchAllBranches(Number.parseInt(route.query.page as string) || 1)
    return Number.parseInt(route.query.page as string) || 1
  } catch {
  }
  return 1
})

const downloadPNG = () => {
  const node = document.getElementById('id-card');

  html2canvas(node).then(canvas => {
    var link = document.createElement('a');
    link.download = 'qr.png';
    link.href = canvas.toDataURL()
    link.click();
  });
  QrCodeActionsOpen.value = false
};

onMounted(async () => {
  searchAllBranches(1);
  searchAllGroupsToBranch();
})
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
        <!--        <V-Button dark="3">View Reports</V-Button>-->
        <V-Button color="primary" icon="fas fa-plus" elevated @click="centeredActionsOpen = true">
          薬局者を追加する
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
            <span class="is-grow">薬局名</span>
            <span class="is-grow">ご住所</span>
            <span class="is-grow">グループ</span>
            <span class="is-grow">メールアドレス</span>
            <span class="is-grow cell-end">アクション</span>
          </div>

          <div class="flex-list-inner">
            <transition-group name="list" tag="div">
              <!--Table item-->
              <div
                v-for="branch in filteredData"
                :key="branch.branch_id"
                class="flex-table-item"
              >
                <div class="flex-table-cell is-media is-grow">
                  <V-Avatar
                    :picture="branch.profile_url"
                    size="medium"
                  />
                  <div>
                    <span class="item-name dark-inverted">{{branch.company_name }}</span>
                    <span class="item-meta">
                      <span>{{ branch.contact_number }}</span>
                    </span>
                  </div>
                </div>
                <div class="flex-table-cell is-grow" data-th="ご住所">
                  <span class="light-text">{{ branch.address }}</span>
                </div>
                <div class="flex-table-cell is-grow" data-th="グループ">
                  <span class="light-text">{{ branch.group_name }}</span>
                </div>

                <div class="flex-table-cell is-grow" data-th="メールアドレス">
                  <span class="light-text">{{ branch.email }}</span>
                </div>
                <div class="flex-table-cell is-grow cell-end" data-th="アクション">
                  <V-Dropdown
                    icon="feather:more-vertical"
                    class="is-pushed-mobile"
                    spaced
                    right
                  >
                    <template #content>
                      <a role="menuitem" class="dropdown-item is-media" @click="openViewActionsOpen(branch)">
                        <div class="icon">
                          <i aria-hidden="true" class="lnil lnil-eye"></i>
                        </div>
                        <div class="meta">
                          <span>Details</span>
                          <span>View more info of branch</span>
                        </div>
                      </a>

                      <hr class="dropdown-divider"/>
                      <a role="menuitem" class="dropdown-item is-media" @click="openQRCodeModel(branch.qr_code_url)">
                        <div class="icon">
                          <i aria-hidden="true" class="lnil lnil-eye"></i>
                        </div>
                        <div class="meta">
                          <span>QR Code</span>
                          <span>View QR Code of branch</span>
                        </div>
                      </a>

                      <hr class="dropdown-divider"/>
                      <a role="menuitem" class="dropdown-item is-media" @click="openEditActionsOpen(branch)">
                        <div class="icon">
                          <i class="lnir lnir-cog" aria-hidden="true"></i>
                        </div>
                        <div class="meta">
                          <span>編集</span>
                          <span>薬局の情報編集</span>
                        </div>
                      </a>

                      <hr class="dropdown-divider"/>

                      <a role="menuitem" class="dropdown-item is-media" @click="fireDeleteBrandAlert(branch.branch_id)">
                        <div class="icon">
                          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
                        </div>
                        <div class="meta">
                          <span>削除</span>
                          <span>薬局編集 {{ branch.company_name }}</span>
                        </div>
                      </a>
                    </template>
                  </V-Dropdown>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!--Table Pagination-->
        <V-FlexPagination
          v-if="filteredData.length > 0"
          :item-per-page="10"
          :total-items="allBranchesCount"
          :current-page="currentPage"
          :max-links-displayed="7"
        />
      </div>
    </div>

<!--    Add a New Branch-->
    <VModal
      :open="centeredActionsOpen"
      size="medium"
      actions="center"
      @close="centeredActionsOpen = false"
      title="薬局者を追加する"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div>
                <V-Field>
                  <label>薬局名</label>
                  <V-Control icon="feather:pocket">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局名"
                      autocomplete="branch_name"
                      v-model="company_name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>メールアドレス</label>
                  <V-Control icon="feather:mail">
                    <input
                      type="text"
                      class="input"
                      placeholder="メールアドレス"
                      autocomplete="branch email"
                      inputmode="email"
                      v-model="branch_email"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>薬局住所</label>
                  <V-Control icon="feather:map-pin">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局住所"
                      autocomplete="Address"
                      inputmode="Address"
                      v-model="address"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>電話番号</label>
                  <V-Control icon="feather:phone">
                    <input
                      type="number"
                      class="input"
                      placeholder="電話番号"
                      autocomplete="contact_number"
                      inputmode="contact_number"
                      v-model="contact_number"
                    />
                  </V-Control>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>グループ</label>
                  <VControl icon="feather:search">
                    <Multiselect
                      v-model="group_id"
                      :options="groups"
                      placeholder="Search a Group"
                      :searchable="true"
                    >
                    </Multiselect>
                  </VControl>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>Price per Unit</label>
                  <VControl icon="feather:dollar-sign">
                    <input
                      type="number"
                      class="input"
                      placeholder="Unit Price"
                      autocomplete="unit_price"
                      inputmode="unit_price"
                      v-model="unit_price"
                    />
                  </VControl>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="start_date" color="green" trim-weeks>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>開始日</label>
                          <V-Control icon="feather:calendar">
                            <input
                              class="input"
                              type="text"
                              placeholder="開始日"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="end_date" color="green" trim-weeks>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>終了日</label>
                          <V-Control icon="feather:calendar">
                            <input
                              class="input"
                              type="text"
                              placeholder="終了日"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="start_time_test" mode="time" is24hr>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>開始時間</label>
                          <V-Control icon="feather:clock">
                            <input class="input" :value="inputValue" v-on="inputEvents" placeholder="開始時間"/>
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                    <!--                    end_time_test-->
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="end_time_test" mode="time" is24hr>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>終了時間</label>
                          <V-Control icon="feather:clock">
                            <input class="input" :value="inputValue" v-on="inputEvents" placeholder="終了時間"/>
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                  </V-Control>
                </V-Field>
              </div>
            </div>
          </div>

        </form>

      </template>
      <template #action>
        <VButton @click="centeredActionsOpen = false"> キャンセル </VButton>
        <VButton color="primary" raised @click="fireSaveBranchFuncAlert">薬局者を追加する</VButton>
      </template>
    </VModal>

<!--    Edit Branch-->
    <VModal
      :open="editActionsOpen"
      size="medium"
      actions="center"
      @close="editActionsOpen = false"
      title="薬局編集"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div>
                <V-Field>
                  <label>薬局ID</label>
                  <V-Control icon="feather:pocket">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局ID"
                      autocomplete="branch_id"
                      v-model="edit_company_id"
                      readonly
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>薬局名</label>
                  <V-Control icon="feather:pocket">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局名"
                      autocomplete="branch_name"
                      v-model="edit_company_name"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>メールアドレス</label>
                  <V-Control icon="feather:mail">
                    <input
                      type="text"
                      class="input"
                      placeholder="メールアドレス"
                      autocomplete="branch_email"
                      inputmode="branch_email"
                      v-model="edit_branch_email"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>薬局住所</label>
                  <V-Control icon="feather:map-pin">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局住所"
                      autocomplete="Address"
                      inputmode="Address"
                      v-model="edit_address"
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>電話番号</label>
                  <V-Control icon="feather:phone">
                    <input
                      type="tel"
                      class="input"
                      placeholder="電話番号"
                      autocomplete="contact_number"
                      inputmode="contact_number"
                      v-model="edit_contact_number"
                      readonly
                    />
                  </V-Control>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>グループ</label>
                  <VControl icon="feather:search">
                    <Multiselect
                      v-model="edit_group_id"
                      :options="groups"
                      placeholder="Search a Group"
                      :searchable="true"
                    >
                    </Multiselect>
                  </VControl>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>Price per Unit</label>
                  <VControl icon="feather:dollar-sign">
                    <input
                      type="number"
                      class="input"
                      placeholder="Unit Price"
                      autocomplete="unit_price"
                      inputmode="unit_price"
                      v-model="edit_unit_price"
                    />
                  </VControl>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="edit_start_date" color="green" trim-weeks>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>開始日</label>
                          <V-Control icon="feather:calendar">
                            <input
                              class="input"
                              type="text"
                              placeholder="開始日"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="edit_end_date" color="green" trim-weeks>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>終了日</label>
                          <V-Control icon="feather:calendar">
                            <input
                              class="input"
                              type="text"
                              placeholder="終了日"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="edit_start_time" mode="time" is24hr>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>開始時間</label>
                          <V-Control icon="feather:clock">
                            <input class="input" :value="inputValue" v-on="inputEvents" placeholder="開始時間"/>
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                    <!--                    end_time_test-->
                  </V-Control>
                </V-Field>
                <V-Field>
                  <V-Control>
                    <v-date-picker v-model="edit_end_time" mode="time" is24hr>
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>終了時間</label>
                          <V-Control icon="feather:clock">
                            <input class="input" :value="inputValue" v-on="inputEvents" placeholder="終了時間"/>
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                  </V-Control>
                </V-Field>
              </div>
            </div>
          </div>

        </form>

      </template>
      <template #action>
        <VButton @click="editActionsOpen = false"> キャンセル </VButton>
        <VButton color="primary" raised @click="fireEditBranchFuncAlert">薬局編集</VButton>
      </template>
    </VModal>
    <VModal
      :open="viewActionsOpen"
      size="medium"
      actions="center"
      @close="viewActionsOpen = false"
      title="Branch info"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div>
                <V-Field>
                  <label>薬局ID</label>
                  <V-Control icon="feather:pocket">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局ID"
                      autocomplete="branch_id"
                      v-model="edit_company_id"
                      readonly
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>薬局名</label>
                  <V-Control icon="feather:pocket">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局名"
                      autocomplete="branch_name"
                      v-model="edit_company_name"
                      readonly
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>メールアドレス</label>
                  <V-Control icon="feather:mail">
                    <input
                      type="text"
                      class="input"
                      placeholder="メールアドレス"
                      autocomplete="branch_email"
                      inputmode="branch_email"
                      v-model="edit_branch_email"
                      readonly
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>薬局住所</label>
                  <V-Control icon="feather:map-pin">
                    <input
                      type="text"
                      class="input"
                      placeholder="薬局住所"
                      autocomplete="Address"
                      inputmode="Address"
                      v-model="edit_address"
                      readonly
                    />
                  </V-Control>
                </V-Field>
                <V-Field>
                  <label>電話番号</label>
                  <V-Control icon="feather:phone">
                    <input
                      type="tel"
                      class="input"
                      placeholder="電話番号"
                      autocomplete="contact_number"
                      inputmode="contact_number"
                      v-model="edit_contact_number"
                      readonly
                    />
                  </V-Control>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>グループ</label>
                  <VControl icon="feather:key">
                    <input
                      type="text"
                      class="input"
                      placeholder="グループ"
                      autocomplete="Group"
                      inputmode="Group"
                      v-model="edit_group_name"
                      readonly
                    />
                  </VControl>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>Price per Unit</label>
                  <VControl icon="feather:dollar-sign">
                    <input
                      type="number"
                      class="input"
                      placeholder="Unit Price"
                      autocomplete="unit_price"
                      inputmode="unit_price"
                      v-model="edit_unit_price"
                      readonly
                    />
                  </VControl>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>開始日</label>
                  <VControl icon="feather:calendar">
                    <input
                      type="text"
                      class="input"
                      placeholder="開始日"
                      autocomplete="Start Date"
                      inputmode="Start Date"
                      v-model="edit_start_date"
                      readonly
                    />
                  </VControl>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>終了日</label>
                  <VControl icon="feather:calendar">
                    <input
                      type="text"
                      class="input"
                      placeholder="終了日"
                      autocomplete="Start Date"
                      inputmode="Start Date"
                      v-model="edit_end_date"
                      readonly
                    />
                  </VControl>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>開始時間</label>
                  <VControl icon="feather:clock">
                    <input
                      type="text"
                      class="input"
                      placeholder="開始時間"
                      autocomplete="Start Time"
                      inputmode="Start Time"
                      v-model="edit_start_time"
                      readonly
                    />
                  </VControl>
                </V-Field>
                <V-Field class="is-autocomplete-select">
                  <label>終了時間</label>
                  <VControl icon="feather:clock">
                    <input
                      type="text"
                      class="input"
                      placeholder="終了時間"
                      autocomplete="End Time"
                      inputmode="End Time"
                      v-model="edit_end_time"
                      readonly
                    />
                  </VControl>
                </V-Field>
              </div>
            </div>
          </div>

        </form>

      </template>
      <template #action>
        <VButton color="primary" raised @click="viewActionsOpen = false">Okay</VButton>
      </template>
    </VModal>
    <VModal
      :open="QrCodeActionsOpen"
      size="medium"
      actions="center"
      @close="QrCodeActionsOpen = false"
      title="QR Code"
    >
      <template #content>
        <form class="form-layout is-split" @submit.prevent>
          <div class="form-outer">
            <div class="form-section is-grey">
              <div id="id-card">
                <img id="qr-img" :src=selected_qr_code_url alt="qrcode-1" border="0">
              </div>
            </div>
          </div>

        </form>

      </template>
      <template #action>
<!--        <VButton color="primary" raised @click="QrCodeActionsOpen = false">OK</VButton>-->
        <VButton color="primary" raised @click="downloadPNG">Download</VButton>
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

.swal2-title {
  font-size: 20px !important;
}



</style>
