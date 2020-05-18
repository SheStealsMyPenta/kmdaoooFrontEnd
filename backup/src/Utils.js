export  function datetimeFormat(longTypeDate, type) {
    if (type === "Chinese") {
        var dateTypeDate = "";
        var date = new Date();
        date.setTime(longTypeDate);
        dateTypeDate += date.getFullYear(); //年
        dateTypeDate += "年" + getMonth(date); //月
        dateTypeDate += "月" + getDay(date); //日
        dateTypeDate += "日 " + getHours(date); //时
        dateTypeDate += "时" + getMinutes(date);  //分
        dateTypeDate += "分" + getSeconds(date);  //分
        dateTypeDate += "秒"
        return dateTypeDate;
    } else {
        var dateTypeDate = "";
        var date = new Date();
        date.setTime(longTypeDate);
        dateTypeDate += date.getFullYear(); //年
        dateTypeDate += "/" + getMonth(date); //月
        dateTypeDate += "/" + getDay(date); //日
        dateTypeDate += "\n";
        dateTypeDate += "  " + getHours(date); //时
        dateTypeDate += ":" + getMinutes(date);  //分
        dateTypeDate += ":" + getSeconds(date);  //分
        dateTypeDate += ""
        return dateTypeDate;
    }

}

   //返回 01-12 的月份值
   function getMonth(date) {
    var month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
        month = "0" + month;
    }
    return month;
}

//返回01-30的日期
export function getDay(date) {
    var day = "";
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
}

//小时
export function getHours(date) {
    var hours = "";
    hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    return hours;
}

//分
export function getMinutes(date) {
    var minute = "";
    minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    return minute;
}

//秒
export function getSeconds(date) {
    var second = "";
    second = date.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    return second;
}
export function getParenthesesStr(text) {
    let result = ''
    if (isObjEmpty(text))
        return result
    let regex = /\((.+?)\)/g;
    let options = text.match(regex)
    if (!isObjEmpty(options)) {
        let option = options[0]
        if (!isObjEmpty(option)) {
            result = option.substring(1, option.length - 1)
        }
    }
    return result
}
function isObjEmpty(text) {
    if(text==null){
        return true
    }else {
        return false
    }
}