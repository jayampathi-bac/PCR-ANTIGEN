import axios from 'axios';
import {basic_url} from "/@src/utils/basic_config";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

let start_date_time: null = null
let end_date_time: null = null
if (cookies.isKey("admin2")){

}

export default class CheckTimeService {
  checkTimeDuration() {
    if (cookies.isKey("admin2")) {
      // @ts-ignore
      start_date_time = cookies.get('admin2').start_time
      // @ts-ignore
      end_date_time = cookies.get('admin2').end_time
      // @ts-ignore
      let startTime = start_date_time.split(" ", 2)[1];
      // let startTime = '00:00:00';
      // @ts-ignore
      let endTime =  end_date_time.split(" ", 2)[1];
      // let endTime =  '12:00:00';

      console.log("batman thamai", startTime, endTime)

      let currentDate = new Date()

      let startDate = new Date(currentDate.getTime());
      startDate.setHours(Number(startTime.split(":")[0]));
      startDate.setMinutes(Number(startTime.split(":")[1]));
      startDate.setSeconds(Number(startTime.split(":")[2]));

      let endDate = new Date(currentDate.getTime());
      endDate.setHours(Number(endTime.split(":")[0]));
      endDate.setMinutes(Number(endTime.split(":")[1]));
      endDate.setSeconds(Number(endTime.split(":")[2]));


      return startDate < currentDate && endDate > currentDate
    }
  }
}
