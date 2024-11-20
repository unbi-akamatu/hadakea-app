const flowElemList = [
  ["q1", "section#introduction", "section#q01", ""],
  ["q2", "section#q01", "section#q02", ""],
  ["q3", "section#q02", "section#q03", "section#q01"],
  ["q4", "section#q03", "section#q04", "section#q02"],
  ["q5", "section#q04", "section#q05", "section#q03"],
  ["q6", "section#q05", "section#q06", "section#q04"],
  ["q7", "section#q06", "section#q07", "section#q05"],
  ["q8", "section#q07", "section#q08", "section#q06"],
  ["q9", "section#q08", "section#q09", "section#q07"],
  ["q10", "section#q09", "section#q10", "section#q08"],
  ["result", "section#q10", "section#result", "section#q09"],
];

const allowChkElemList = [
  ["section#q01 .check input:checked", "length", "section#q01"],
  ["section#q02 .radio input:checked", "length", "section#q02"],
  ["section#q03 .check input:checked", "length", "section#q03"],
  ["section#q04 .radio input:checked", "length", "section#q04"],
  ["section#q05 .radio input:checked", "length", "section#q05"],
  ["section#q06 .radio input:checked", "length", "section#q06"],
  ["section#q07 .radio input:checked", "length", "section#q07"],
  ["section#q08 .radio input:checked", "length", "section#q08"],
  ["section#q09 .radio input:checked", "length", "section#q09"],

  ["section#q10 .name input", "value", "section#q10"],
];

const diagTagNameList = [
  ["section#q01", "check", -1],
  ["section#q02", "radio", 0],
  ["section#q03", "check", 1],
  ["section#q04", "radio", 2],
  ["section#q05", "radio", 3],
  ["section#q06", "radio", 4],
  ["section#q07", "radio", 5],
  ["section#q08", "radio", 6],
  ["section#q09", "radio", -1],
];

//透明感,毛穴,キメ,肌荒れ,ハリ

const diagCalcList = [
  [
    [8, 4, 5, 6, 10],
    [3, 4, 2, 4, 7],
    [0, 4, 1, 2, 3],
    [2, 4, 4, 3, 0],
    [7, 4, 8, 5, 0],
  ],
  [
    [0, 3, 10, 1, 8],
    [3, 0, 5, 10, 0],
    [5, 1, 3, 0, 10],
    [10, 8, 0, 5, 1],
    [8, 5, 1, 3, 0],
    [0, 10, 0, 8, 3],
    [1, 0, 8, 0, 5],
  ],
  [
    [10, 3, 0, 0, 5],
    [7, 1, 0, 0, 3],
    [-3, -1, 0, 0, -2],
  ],
  [
    [5, 0, 10, 3, 0],
    [3, 0, 7, 1, 0],
    [-2, 0, -3, -1, 0],
  ],
  [
    [0, 10, 0, 5, 3],
    [0, 7, 0, 3, 1],
    [0, -3, 0, -2, -1],
  ],
  [
    [0, -2, -1, 0, -3],
    [0, 3, 1, 0, 7],
    [0, 5, 3, 0, 10],
  ],
  [
    [3, 0, 5, 10, 0],
    [1, 0, 3, 7, 0],
    [-1, 0, -2, -3, 0],
  ],
];

const yourBeautyList = [
  ["123", "ywg"],
  ["124", "ywg"],
  ["120", "wyb"],
  ["132", "ywg"],
  ["134", "gpy"],
  ["130", "ywg"],
  ["142", "ywg"],
  ["143", "gpy"],
  ["140", "wyb"],
  ["102", "wyb"],
  ["103", "ywg"],
  ["104", "wyb"],
  ["213", "ywg"],
  ["214", "wyb"],
  ["210", "wyb"],
  ["231", "ywg"],
  ["234", "gpy"],
  ["230", "wyb"],
  ["241", "wyb"],
  ["243", "gpy"],
  ["240", "pbw"],
  ["201", "wyb"],
  ["203", "wyb"],
  ["204", "pbw"],
  ["312", "ywg"],
  ["314", "gpy"],
  ["310", "gpy"],
  ["321", "ywg"],
  ["324", "gpy"],
  ["320", "ywg"],
  ["341", "gpy"],
  ["342", "gpy"],
  ["340", "bgp"],
  ["301", "gpy"],
  ["302", "ywg"],
  ["304", "bgp"],
  ["412", "pbw"],
  ["413", "gpy"],
  ["410", "pbw"],
  ["421", "pbw"],
  ["423", "pbw"],
  ["420", "pbw"],
  ["431", "gpy"],
  ["432", "pbw"],
  ["430", "bgp"],
  ["401", "pbw"],
  ["402", "pbw"],
  ["403", "bgp"],
  ["012", "wyb"],
  ["013", "bgp"],
  ["014", "bgp"],
  ["021", "wyb"],
  ["023", "bgp"],
  ["024", "pbw"],
  ["031", "bgp"],
  ["032", "bgp"],
  ["034", "bgp"],
  ["041", "bgp"],
  ["042", "pbw"],
  ["043", "bgp"],
];

const diagAnswerMaxList = [49, 45, 49, 47, 51];

let userTotalScore = [0, 0, 0, 0, 0];
let userRatioScore = [0, 0, 0, 0, 0];

let canvas_rc;
let ctx_rc;

$(function () {
  $(window).on("load", function () {
    canvas_rc = document.querySelector("#canvas_radarchart");
    ctx_rc = canvas_rc.getContext("2d");
  });

  $("input").change(function (e) {
    chkMaxSelect();
    chkAllowNext();
    checkAllDiagnosis();
  });

  $("section#q10 .name input").keypress(function (e) {
    chkAllowNext();
  });

  $("section#q10 .name input").keyup(function (e) {
    chkAllowNext();
  });

  $(".flow-next").click(function () {
    const type = $(this).attr("href");
    chkFlowChange("next", type);
    return false;
  });

  $(".flow-back").click(function () {
    const type = $(this).attr("href");
    chkFlowChange("back", type);
    return false;
  });

  function chkAllowNext() {
    $.each(allowChkElemList, function (index, val) {
      const type = val[1];
      const btnel = val[2] + " .flow-next";

      if (type === "length") {
        const cnt = $(val[0]).length;

        if (cnt >= 1) {
          if ($(btnel).hasClass("noanswer")) {
            $(btnel).removeClass("noanswer");
          }
        } else {
          if (!$(btnel).hasClass("noanswer")) {
            $(btnel).addClass("noanswer");
          }
        }
      } else if (type === "value") {
        const text = $(val[0]).val();

        if (text.length >= 1) {
          if ($(btnel).hasClass("noanswer")) {
            $(btnel).removeClass("noanswer");
          }
        } else {
          if (!$(btnel).hasClass("noanswer")) {
            $(btnel).addClass("noanswer");
          }
        }
      }
    });
  }

  function chkFlowChange(flow, type) {
    if (flow === "next") {
      analyticsSend(type);
    }

    $.each(flowElemList, function (index, val) {
      const elType = val[0];
      if (type === elType) {
        const now_ele = val[1];
        const next_ele = val[2];
        const back_ele = val[3];

        if (flow === "next") {
          if (elType === "result") {
            setUserResult();
          } else {
            $(now_ele).css("display", "none");
            $(next_ele).css("display", "block");

            if (!$(now_ele + " li").hasClass("overeff")) {
              $(now_ele + " li").addClass("overeff");
              $(now_ele + " .button").addClass("overeff");
            }
          }
        } else if (flow === "back") {
          $(now_ele).css("display", "none");
          $(back_ele).css("display", "block");
        }
      }
    });
  }

  function chkMaxSelect() {
    const cnt = $("section#q03 .check input:checked").length;
    const notChk = $("section#q03 .check input").not(":checked");

    if (cnt >= 3) {
      notChk.attr("disabled", true);
    } else {
      notChk.attr("disabled", false);
    }
  }

  function checkAllDiagnosis() {
    userTotalScore = [0, 0, 0, 0, 0];

    $.each(diagTagNameList, function (qNum, val) {
      const rowNum = val[2];
      if (rowNum !== -1) {
        $(val[0] + " ." + val[1] + " input:checked").each(function () {
          const num = parseInt($(this).val());

          for (let i = 0; i < 5; i++) {
            userTotalScore[i] += diagCalcList[rowNum][num - 1][i];
          }
        });
      }
    });
  }

  function makeRatioScore() {
    for (let comNum = 0; comNum < 5; comNum++) {
      const scmax = diagAnswerMaxList[comNum];
      const rat = 100 / scmax;
      const scTotal = userTotalScore[comNum];

      let num = Math.ceil(scTotal * rat);

      if (num > 100) {
        num = 100;
      } else if (num < 0) {
        num = 0;
      }

      userRatioScore[comNum] = num;
    }
  }

  function setUserResult() {
    makeRatioScore();

    $("section#q10").css("display", "none");
    $("section#result").css("display", "block");
    $("section#result #component").css("display", "block");

    let resComList = [-1, -1, -1, -1, -1];
    let resRankList = [];

    for (let rank = 0; rank < 5; rank++) {
      let maxNum = -99;
      let maxLoc = -1;

      for (let i = 0; i < 5; i++) {
        if (resComList[i] === -1) {
          if (userRatioScore[i] > maxNum) {
            maxNum = userRatioScore[i];
            maxLoc = i;
          }
        }
      }

      resComList[maxLoc] = 1;
      resRankList.push(maxLoc);
    }

    const com_names = ["E", "A", "B", "C", "D"];

    let com_tags = "";

    for (let i = 0; i < 5; i++) {
      const n = resRankList[i];
      const tags = $("section#result #component #component" + com_names[n]).prop("outerHTML");

      if (i < 3) {
        com_tags += tags;
      }
      $("section#result #component #component" + com_names[n]).remove();
    }

    $("#result-component").append(com_tags);
    $("section#result #component .component").css("display", "block");

    const res_textList = ["透明感", "毛穴", "キメ", "肌荒れ", "ハリ"];
    const res_bgclassList = ["b", "y", "w", "g", "p"];

    //Result icons
    for (let i = 0; i < 3; i++) {
      const cls = res_bgclassList[resRankList[i]];
      const text = res_textList[resRankList[i]];
      const tag = '<li class="' + cls + '">' + text + "</li>";
      $("section#result #worry").append(tag);
    }

    //Result BackGround
    for (let i = 0; i < 3; i++) {
      const cname = res_bgclassList[resRankList[i]];
      $("section#bg").addClass(cname);
    }

    //user Name
    let username = $('section#q10 .name input:text[name="username"]').val();
    $(".result-username").text(username);

    setYourBeauty(resRankList);
    makeRadarChart();

    analyticsSend("score");
  }

  function makeRadarChart() {
    //Setting
    const cornerNum = 5;
    const center_x = 500;
    const center_y = 500;
    const base_lineSize = 2;
    const angleplus = Math.floor(360 / cornerNum);

    const rulerRange_one = 70;
    const rulerRange_max = rulerRange_one * 5;

    const status_orderList = [1, 2, 3, 4, 0]; //Use in get userRatioScore
    const status_colorList = ["#ffd241", "#c8c8c8", "#96d26e", "#fa82a5", "#7dd2f5"];
    const status_textList = ["毛穴", "キメ", "肌荒れ", "ハリ", "透明感"];

    const textPosXList = [500, 900, 750, 250, 100];
    const textPosYList = [80, 400, 840, 840, 400];

    //Clear
    ctx_rc.clearRect(0, 0, 1000, 1000);
    ctx_rc.lineWidth = 5;
    ctx_rc.strokeStyle = "#444444";
    ctx_rc.fillStyle = "#f8f8f8";
    ctx_rc.fillRect(0, 0, 1000, 1000);

    //Back Pentagon
    ctx_rc.strokeStyle = "#e9e9e9";
    ctx_rc.lineWidth = base_lineSize;
    ctx_rc.fillStyle = "#ffffff";

    for (let spNum = 5; spNum > 0; spNum--) {
      let r = rulerRange_one * spNum;
      let theta = -90;

      ctx_rc.beginPath();

      for (let i = 0; i < cornerNum; i++) {
        const x = r * Math.cos((theta * Math.PI) / 180) + center_x;
        const y = r * Math.sin((theta * Math.PI) / 180) + center_y;
        theta += angleplus;

        if (i == 0) {
          ctx_rc.moveTo(x, y);
        } else {
          ctx_rc.lineTo(x, y);
        }
      }

      ctx_rc.closePath();
      ctx_rc.fill();
      ctx_rc.stroke();
    }

    //Result Pentagon
    ctx_rc.fillStyle = "rgba(" + [0, 0, 0, 0.1] + ")";
    ctx_rc.beginPath();

    for (let i = 0; i < cornerNum; i++) {
      const mynum = 100 - userRatioScore[status_orderList[i]];
      const r = (rulerRange_max / 100) * mynum;
      const theta = -90 + i * angleplus;
      const px = r * Math.cos((theta * Math.PI) / 180) + center_x;
      const py = r * Math.sin((theta * Math.PI) / 180) + center_y;

      if (i == 0) {
        ctx_rc.moveTo(px, py);
      } else {
        ctx_rc.lineTo(px, py);
      }
    }

    ctx_rc.closePath();
    ctx_rc.fill();

    //Color Dot
    for (let i = 0; i < cornerNum; i++) {
      const mynum = 100 - userRatioScore[status_orderList[i]];

      const r = (rulerRange_max / 100) * mynum;
      const theta = -90 + i * angleplus;
      const px = r * Math.cos((theta * Math.PI) / 180) + center_x;
      const py = r * Math.sin((theta * Math.PI) / 180) + center_y;

      ctx_rc.beginPath();
      ctx_rc.arc(px, py, 10, (0 * Math.PI) / 180, (360 * Math.PI) / 180, false);
      ctx_rc.fillStyle = status_colorList[i];
      ctx_rc.fill();
    }

    //text
    for (let i = 0; i < cornerNum; i++) {
      let fontSize, px, py;

      const fontN = "pt 'Roboto'";
      const text = status_textList[i];
      const myscore = 100 - userRatioScore[status_orderList[i]];

      //el name
      fontSize = 24;

      px = textPosXList[i] - (fontSize * text.length) / 2;
      py = textPosYList[i] - fontSize / 2;

      ctx_rc.fillStyle = status_colorList[i];
      ctx_rc.font = "bold " + fontSize + fontN;
      ctx_rc.fillText(text, px, py);

      //score
      fontSize = 54;

      px = textPosXList[i] - ((fontSize / 1.7) * String(myscore).length) / 2;
      py = textPosYList[i] + fontSize / 1.5 + fontSize / 2;

      ctx_rc.fillStyle = status_colorList[i];
      ctx_rc.font = fontSize + fontN;
      ctx_rc.fillText(myscore, px, py);
    }
  }

  function setYourBeauty(ranklist) {
    let yourType = "";
    let myset = "";

    if (ranklist[0] === 0) {
      yourType = "bgp";
    } else if (ranklist[0] === 1) {
      yourType = "ywg";
    } else if (ranklist[0] === 2) {
      yourType = "wyb";
    } else if (ranklist[0] === 3) {
      yourType = "gpy";
    } else {
      yourType = "pbw";
    }

    for (let i = 0; i < 3; i++) {
      myset += String(ranklist[i]);
    }

    $.each(yourBeautyList, function (index, value) {
      if (myset === value[0]) {
        yourType = value[1];
      }
    });

    const recoUrl = "../../../file/sp/skin_check/images/skc_rlt_rcm_" + yourType + ".png";
    $("#recommend img").attr("src", recoUrl);
  }

  function analyticsSend(type) {
    let log = "";

    switch (type) {
      case "q1":
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: "start" });
        break;

      case "q2":
        log = "q1:";
        $(allowChkElemList[0][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q3":
        log = "q2:";
        $(allowChkElemList[1][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q4":
        log = "q3:";
        $(allowChkElemList[2][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q5":
        log = "q4:";
        $(allowChkElemList[3][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q6":
        log = "q5:";
        $(allowChkElemList[4][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q7":
        log = "q6:";
        $(allowChkElemList[5][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q8":
        log = "q7:";
        $(allowChkElemList[6][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q9":
        log = "q8:";
        $(allowChkElemList[7][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "q10":
        log = "q9:";
        $(allowChkElemList[8][0]).each(function () {
          log += $(this).val() + " ";
        });
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;

      case "score":
        log = "score:";
        const comlist = ["tomei", "keana", "kime", "are", "hari"];
        for (let i = 0; i < 5; i++) {
          log += comlist[i] + "=" + userRatioScore[i] + " ";
        }
        log = log.slice(0, -1);
        gtag("event", "pdcskincheck", { event_category: "useraction", event_label: log });
        break;
    }
  }
});
