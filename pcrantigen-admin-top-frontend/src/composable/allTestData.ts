import {ref} from "vue";
// @ts-ignore
import AllTestsService from '/@src/service/allTestsService';

const getAllTests = () => {
  const allTests = ref([]);
  const totalTestsCount = ref(0);


  const allTestsService = new AllTestsService();

  const searchAllTests = (pageId: number) => {
    console.log("searching Tests")
    allTestsService.getAllTests(pageId).then((result: { data: any; }) => {
      console.log("tests result",result)
      allTests.value = result.data.data;
      // console.log("meta",result.data.meta)
      totalTestsCount.value = result.data.meta;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    allTests,
    searchAllTests,
    totalTestsCount,
  };
};

export default getAllTests;
