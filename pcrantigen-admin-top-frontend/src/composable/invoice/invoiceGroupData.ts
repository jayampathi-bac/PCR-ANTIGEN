import {ref} from "vue";
// @ts-ignore
import InvoiceGroupService from '/@src/service/invoice/invoiceGroupService';

const getInvoiceGroupData = () => {
  const invoiceGroupDataList = ref([]);
  const invoiceGroupName = ref();
  const groupTotalPrice = ref(0)

  const invoiceGroupService = new InvoiceGroupService();

  const loadInvoiceGroupData = (invoiceData: { group_id: number; start_date: string; end_date: string; }) => {
    console.log("loadInvoiceGroupData")
    invoiceGroupService.getGroupInvoice(invoiceData).then((result: { data: any; }) => {
      console.log("groups",result)
      invoiceGroupDataList.value = result.data.data;
      invoiceGroupName.value = result.data.data[0] ? result.data.data[0].branch_name : '';
      // console.log("result.data.data.branch_name",result.data.data[0].branch_name)
      console.log("invoiceGroupDataList",invoiceGroupDataList.value)
      for (let i=0; i<invoiceGroupDataList.value.length; i++){
        // @ts-ignore
        groupTotalPrice.value += invoiceGroupDataList.value[i].total
      }
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    loadInvoiceGroupData,
    invoiceGroupDataList,
    invoiceGroupName,
    groupTotalPrice,
  };
};

export default getInvoiceGroupData;
