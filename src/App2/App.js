import { useState } from "react";
import Hoga from "./Hoga";

function App() {
  const [data, setData] = useState(0);
  const [playIndex, setplayIndex] = useState(0);

  const readFileDataAsBase64 = (e) => {
    const file = e.target.files[0];

    const myPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log("로딩끝!");
        resolve(event.target.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsArrayBuffer(file);
    });
    myPromise.then(setData);
  };

  const Next = () => {
    const playtime = playIndex + 1;
    setplayIndex(playtime);
  };

  const Result = () => {
    let view = new Int8Array(data);
    const hogaObject = [];

    // 기본정보 출력하기
    const arraySize = view.length;
    const bufDataSize = view.slice(arraySize - 4, arraySize);
    const [intDataSize] = new Int32Array(
      bufDataSize.buffer //.slice(bufDataSize.byteOffset)
    );

    // intDataSaze 만큼 반복하면서 데이터 읽기
    let indexPoint = 0;
    for (let i = 0; i < arraySize; i++) {
      ++indexPoint;
      if (view[i] === 35) {
        // 35 = 0x23
        const kind = view.slice(indexPoint, indexPoint + 4);
        const kind1 = new TextDecoder("euc-kr").decode(kind);
        if (kind1 === "호가") {
          // console.log(kind1);
          // 호가:
          //  1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
          // 05  23  "호가---------"  06  "시간-----------------"  매수1호
          // 가---- 매수1호가잔량---- 매도1호가-------- 매도1호가잔량---- ~~~
          // 매수10호가----- 매수10호가잔량---  매도10호가------ 매도10호가잔량
          // --매도총잔량------- 매수총잔량-------

          const time = view.slice(indexPoint + 5, indexPoint + 11);
          const time1 = new TextDecoder("euc-kr").decode(time);

          // const hogaData = [];
          // 11~171 바이트에 10단 호가 있음
          const hogaData = new Int32Array(
            view.buffer.slice(indexPoint + 11, indexPoint + 171)
          );

          const totalSell = view.slice(indexPoint + 171, indexPoint + 175);
          const totalSell1 = new Int32Array(totalSell.buffer);
          const totalBuy = view.slice(indexPoint + 175, indexPoint + 179);
          const totalBuy1 = new Int32Array(totalBuy.buffer);

          hogaObject.push({
            time: time1,
            hoga: hogaData,
            totalSell: totalSell1,
            totalBuy: totalBuy1
          });
        }
      }
    }

    return (
      <>
        <div>
          {data === 0 ? (
            <p>file not loaded yet.</p>
          ) : (
            <div>
              <button onClick={Next}>다 음</button>
              <p>{"체결시간: " + hogaObject[playIndex]["time"]}</p>
              <Hoga data={hogaObject[playIndex]["hoga"]} />
              <hr />

              <p>{"매도: " + hogaObject[playIndex]["totalSell"]}</p>
              <p>{"매수: " + hogaObject[playIndex]["totalBuy"]}</p>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <input
        type="file"
        id="avatar"
        // accept="image/png, image/jpeg"
        onChange={readFileDataAsBase64}
      />
      <button onClick={Result}>read</button>
      <br />
      <Result />
    </>
  );
}

export default App;
