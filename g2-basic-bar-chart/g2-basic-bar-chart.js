// json 형식의 변수를 불러옵니다.
import packet from './testPacket.js';

// 중복을 제거하는 기능입니다.
function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}

// 불러온 데이터를 Source 라는 키 기준으로 중복을 제거합니다.
// 중복이 제거된 배열 uniqueArray
var uniqueArray = removeDuplicates(packet, "Source");

// 가공할 데이터를 담을 빈 배열을 만들어 둡니다.
let arr = [];

uniqueArray.map((d,i) => {

  // 불러온 데이터중에 uniqueArray 의 i 번째 객체중 Source가 일치하는
  // 객체들을 골라 packets 에 담슴니다.
  const packets = _.filter(packet, (p) => p.Source == d.Source)

  // 새로운 객체를 생성합니다.
  // 키는 Source 와 Packets
  // 밸류는 소스 아이피와 그 아이피를 소스로 가진 패킷의 개수.
  const obj = {Source: packets[0].Source, Packets: packets.length};

  // 만들어진 객체를 만들어둔 빈 배열에 담습니다.
  arr.push(obj);
});

const m0 = {
  id: "8aa4c160372762c2@48",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# 김승훈 \n <hr/>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## chart`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`> *hover 시 수치 확인 가능합니다.*`
)})
    },
    {
      inputs: ["html","G2","data"],
      value: (function(html,G2,data)
{
  
  const container = html`<div></div>`
  
  var chart = new G2.Chart({
    container: container,
    forceFit: true,
    height: 600
  });
  
  chart.source(data);
  chart.scale('Packets', {
    tickInterval: 500
  });
  chart.interval().position('Source*Packets');
  chart.render();
  
  return container;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Data`
)})
    },

    // 가공한 데이터를 담아줍니다.
    {
      name: "data",
      value: (function(){return(
        arr
      )})
    },
    {
      name: "G2",
      inputs: ["require"],
      value: (function(require){return(
require("@antv/g2")
)})
    }
  ]
};

const notebook = {
  id: "8aa4c160372762c2@48",
  modules: [m0]
};

export default notebook;
