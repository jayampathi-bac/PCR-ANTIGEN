import axios from 'axios';

export default class AllTestsService {
  getAllTestsByBranch = (branch_id: string) => axios.get(`http://localhost:8080/v1/admin/test/all/${branch_id}`)
    .then((response) => ({
      data: response.data.data,
    }));

  getAllTestsByRange = (start_date: string,end_date: string) => axios.get(`http://localhost:8080/v1/admin/test/allby/`,{
    params:{
      start_date: start_date,
      end_date: end_date,
    }
  }).then((response) => ({
      data: response.data.data,
    }));

  getAllTestsByMonth = (selectedMonth: number) => axios.get(`http://localhost:8080/v1/admin/test/allbymonth/`,{
    params:{
      month: selectedMonth
    }
  }).then((response) => ({
    data: response.data.data,
  }));
}
