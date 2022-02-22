import {ref} from "vue";
// @ts-ignore
import InvoiceBranchService from '/@src/service/invoice/invoiceBranchService';

const getInvoiceBranchData = () => {
  const invoiceBranchDataList = ref([]);
  const invoiceBranchName = ref();
  const branchTotalPrice = ref(0)

  const invoiceBranchService = new InvoiceBranchService();

  const loadInvoiceBranchData = (invoiceData: { branch_id: number; start_date: string; end_date: string; }) => {
    console.log("loadInvoiceBranchData")
    invoiceBranchService.getBranchInvoice(invoiceData).then((result: { data: any; }) => {
      invoiceBranchDataList.value = result.data.data;
      invoiceBranchName.value = result.data.data[0] ? result.data.data[0].branch_name : '';
      console.log("invoiceBranchDataList",invoiceBranchDataList.value)
      for (let i=0; i<invoiceBranchDataList.value.length; i++){
        // @ts-ignore
        branchTotalPrice.value += invoiceBranchDataList.value[i].total
      }
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };



  return {
    loadInvoiceBranchData,
    invoiceBranchDataList,
    invoiceBranchName,
    branchTotalPrice,
  };
};

export default getInvoiceBranchData;
