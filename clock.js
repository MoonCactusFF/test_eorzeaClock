// Write JavaScript here // 時計のメインとなる関数
function clock()
{
    // 曜日を表す各文字列の配列
    var weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat");
    // 現在日時を表すインスタンスを取得
    var now = new Date();
    // 年
    var y = now.getFullYear();
    // 月 0~11で取得されるので実際の月は+1したものとなる
    var mo = now.getMonth() + 1;
    // 日
    var d = now.getDate();
    // 曜日 0~6で日曜始まりで取得されるのでweeks配列のインデックスとして指定する
    var w = weeks[now.getDay()];
    // 時
    var h = now.getHours();
    // 分
    var mi = now.getMinutes();
    // 秒
    var s = now.getSeconds();

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (mi < 10) mi = "0" + mi;
    if (s < 10) s = "0" + s;

    //　HTML: <span id="clock_date">(ココの日付文字列を書き換え)</span>
    document.getElementById("clock_date").innerHTML =  y + "/" + mo + "/" + d + " (" + w + ")";
    //　HTML: <span id="clock_time">(ココの時刻文字列を書き換え)</span>
    document.getElementById("clock_time").innerHTML = h + ":" + mi + ":" + s;
    //　HTML: <div id="clock_frame"> の内部要素のフォントサイズをウインドウサイズの10分の1ピクセルに設定
    //document.getElementById("clock_frame").style.fontSize =  window.innerWidth / 10 + "px";
}

var localToEorzea = function(){
    var LocalDate = new Date();
    var LocalUnix = LocalDate.getTime();
    var LtMonth = LocalDate.getMonth() + 1;
    var LtDate = LocalDate.getDate();
    var LtDay = LocalDate.getDay();
    var LtHour = LocalDate.getHours();
    var LtMinute = LocalDate.getMinutes();
    var LtSecond = LocalDate.getSeconds(); 

    var MONTHS_PER_YEAR = 12;
    var DATES_PER_MONTH = 32;
    var HOURS_PER_DATE = 24;
    var MINUTES_PER_HOUR = 60;
    var SECONDS_PER_MINUTE = 60;
    var MILLISECONDS_PER_SECONDS = 1000;
    var EORZEA_PER_LOCAL = 1440 / 70;
    var EORZEA_MILLISECONDS = 0;
   
    var MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECONDS * SECONDS_PER_MINUTE;
    var MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
    var MILLISECONDS_PER_DATE = MILLISECONDS_PER_HOUR * HOURS_PER_DATE;
    var MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DATE * DATES_PER_MONTH;
    return {
        setTime : function(time){
            var UNIX = time;
            EORZEA_MILLISECONDS = UNIX * EORZEA_PER_LOCAL;
        },
        setEtTime : function(time) {
            EORZEA_MILLISECONDS = time;
        },
        getMonth : function() {
            return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_MONTH) % MONTHS_PER_YEAR;
        },
        getDate : function() {
            return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_DATE) % DATES_PER_MONTH;
        },
        getHours : function() {
            return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_HOUR) % HOURS_PER_DATE;
        },
        getMinutes : function() {
            return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
        },
        getSeconds : function() {
            return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_SECONDS) % SECONDS_PER_MINUTE;
        },
        getMilliseconds : function() {
            return EORZEA_MILLISECONDS % MILLISECONDS_PER_SECONDS;
        },
        getTime : function() {
            return EORZEA_MILLISECONDS;
        },
        getSpeed : function() {
            return Math.floor(1000 / EORZEA_PER_LOCAL);
        }
    };
};


function etClock()
{
    var EorzeaDate = localToEorzea();
    EorzeaDate.setTime(LocalUnix);
    var EorzeaUnix = EorzeaDate.getTime();
    var EtSpeed = EorzeaDate.getSpeed();
    var EtMonth = EorzeaDate.getMonth() + 1;
    var EtDate = EorzeaDate.getDate() + 1;
    var EtHour = EorzeaDate.getHours();
    var EtMinute = EorzeaDate.getMinutes();
    var EtSecond = EorzeaDate.getSeconds();

    //　HTML: <span id="clock_date">(ココの日付文字列を書き換え)</span>
    document.getElementById("etClock_date").innerHTML = EtMonth + "/" + EtDate;
    //　HTML: <span id="clock_time">(ココの時刻文字列を書き換え)</span>
    document.getElementById("etClock_time").innerHTML = EtHour + ":" + EtMinute + ":" + EtSecond;
    //　HTML: <div id="clock_frame"> の内部要素のフォントサイズをウインドウサイズの10分の1ピクセルに設定
}
// 上記のclock関数を1000ミリ秒ごと(毎秒)に実行する
setInterval(clock, 1000);
setInterval(etClock, EorzeaDate.getSpeed());
