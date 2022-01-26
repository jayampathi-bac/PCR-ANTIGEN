import {ref} from "vue";
// @ts-ignore
import GroupService from '/@src/service/groupService';

const getGroups = () => {
  const groups = ref([]);
  const allGroupsCount = ref(0);

  const groupService = new GroupService();

  const searchAllGroups = (pageId: number) => {
    console.log("searching groups")
    groupService.getGroups(pageId).then((result: { data: any; }) => {
      // console.log("groups",result)
      groups.value = result.data.data;
      allGroupsCount.value = result.data.meta;
    }).catch((e: any) => {
      console.log('error: ', e);
    });
  };

  return {
    searchAllGroups,
    groups,
    allGroupsCount
  };
};

export default getGroups;
