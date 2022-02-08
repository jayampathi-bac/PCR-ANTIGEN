import {ref} from "vue";
// @ts-ignore
import InvoiceService from '/@src/service/invoiceService';

const getInvoiceData = () => {
  const invoiceBranchData = ref([]);
  const invoiceBranchDataList = ref([]);
  const invoiceBranchName = ref();
  const branchTotalPrice = ref(0)
  const invoiceGroupData = ref();

  const invoiceService = new InvoiceService();

  const loadInvoiceBranchData = (invoiceData: { branch_id: number; start_date: string; end_date: string; }) => {
    console.log("loadInvoiceBranchData")
    invoiceService.getBranchInvoice(invoiceData).then((result: { data: any; }) => {
      // console.log("groups",result)
      invoiceBranchDataList.value = result.data.data;
      invoiceBranchName.value = result.data.data[0] ? result.data.data[0].branch_name : '';
      // console.log("result.data.data.branch_name",result.data.data[0].branch_name)
      console.log("invoiceBranchDataList",invoiceBranchDataList.value)
      for (let i=0; i<invoiceBranchDataList.value.length; i++){
        branchTotalPrice.value += invoiceBranchDataList.value[i].total
      }
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  const loadInvoiceGroupData = (invoiceData: { group_id: number; start_date: string; end_date: string; }) => {
    console.log("loadInvoiceGroupData")
    invoiceService.getGroupInvoice(invoiceData).then((result: { data: any; }) => {
      // console.log("groups",result)
      invoiceGroupData.value = result.data.data;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    loadInvoiceBranchData,
    loadInvoiceGroupData,
    invoiceBranchDataList,
    invoiceBranchName,
    branchTotalPrice,
    invoiceGroupData
  };
};

export default getInvoiceData;
