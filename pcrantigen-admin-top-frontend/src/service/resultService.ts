import axios from 'axios';

export default class ResultService {
  getResults = (branch_id: string) => axios.get(`http://localhost:8080/v1/admin/test/all/${branch_id}`)
    .then((response) => ({
      data: response.data.data,
    }));

  generateResult = (result: Object) => axios.post(`http://localhost:8080/v1/admin/test`,result)
    .then((response) => ({
      data: response.data.data,
    }));
}
