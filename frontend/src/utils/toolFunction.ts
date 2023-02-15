/*
 * @Author: your name
 * @Date: 2021-10-25 09:55:16
 * @LastEditTime: 2021-12-06 17:35:53
 * @LastEditors: [you name]
 * @Description: In User Settings Edit
 * @FilePath: \vue3-admin\src\utils\toolFunction.ts
 */
// 解析url地址
export const parseUrl = (url:string)=> {
  const obj = {}
  const arr = url.substr(url.indexOf('?') + 1).split('&')
  arr.forEach(function (item) {
    const tmp = item.split('=')
    obj[tmp[0]] = tmp[1]
  })
  return obj
}

// 过滤挑选数据
export const pick = (obj, value)=> {
  const result = {}
  const fields = Array.isArray(value) ? value : [value]
  const keys = Reflect.ownKeys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!value || fields.includes(key)) {
      result[key] = obj[key]
    }
  }
  return result
}

// 通过id获取name
export const getName = (id:any, array:any)=> {
  return array.find((item:any)=>{
    return item.value === id;
  })?.label || id;
}

// 获取时间范围内每一天，startDate: 开始时间； endDate：结束时间；dayLength：每隔几天，0-代表每天，1-代表日期间隔一天
export const  getDateArr = (startDate, endDate, dayLength: number = 0)=> {
  var dateArr = [startDate];
  for (var i = 0; ; i++) {
    var getDate = getTargetDate(startDate, dayLength);
    startDate = getDate;
    if (Date.parse(getDate) <= Date.parse(endDate)) {
      dateArr.push(getDate);
    } else {
      break;
    }
  }
  return dateArr;
}
function getTargetDate(date, dayLength) {
  dayLength = dayLength + 1;
  var tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + dayLength);
  var year = tempDate.getFullYear();
  var month = tempDate.getMonth() + 1 < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
  var day = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
  return year + "-" + month + "-" + day;
}

// 获取上个月今天
export const getLastMonthDay = (now)=> {
  let year = now.getFullYear();
  let month = now.getMonth() +1;
  let day = now.getDate();
  let lastDate = '';
  // 一位数时补零
  month = (Array(2).join('0') + month).slice(-2);
  day = (Array(2).join('0') + day).slice(-2);

  if (parseInt(month) ==1) {//如果是1月份，则取上一年的12月份
    lastDate = (parseInt(year) - 1) + '-12-' + day;
    return lastDate;
  }
  //上月总天数
  let preSize= new Date(year, parseInt(month)-1, 0).getDate();

  if (preSize < parseInt(day)) {//上月总天数<本月日期，比如3月的30日，在2月中没有30
    lastDate = year + '-' + month + '-01';
    return lastDate;
  }

  if(parseInt(month) <=10){
    lastDate = year + '-0' + (parseInt(month)-1) + '-' + day;
    return lastDate;
  }else{
    lastDate = year + '-' + (parseInt(month)-1) + '-' + day;
    return lastDate;
  }
}

// 当数组子项为空时，他的值取上一个子项的值
export const eqlastData = (array) => {
  for(let i=1; i<array.length; i++) {
    if(array[i] === 0) {
      array[i] = array[i-1];
    }
  }
  return array;
}