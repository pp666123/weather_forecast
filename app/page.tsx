"use client";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip-agile";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  interface dataType {
    link: string;
    title: string;
    description: string;
  }
  const [wearherData, setWearherData] = useState<dataType[]>([]);
  useEffect(() => {
    axios
      .get(
        "https://data.moa.gov.tw/Service/OpenData/Agriculturalcoa_videoRss.aspx?IsTransData=1&UnitId=F35"
      )
      .then((response) => {
        setWearherData(response.data.slice(0, 7));
      });
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen px-2">
      <HTMLFlipBook
        width={315}
        height={450}
        size={"stretch"}
        maxWidth={630}
        maxHeight={800}
        minWidth={300}
        minHeight={600}
      >
        <div className="bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-1 rounded-lg">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-3xl py-3 text-center">農業部農業氣象影音</h3>
              <h3 className="text-3xl py-3 text-center">一週手冊</h3>
            </div>
            <div className="flex justify-center items-center">
              <Image
                className=""
                src="https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/02.svg"
                width={200}
                height={100}
                alt=""
              />
            </div>

            <div className="flex justify-center">
              <p className="px-4 text-lg">資料來源：</p>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/ROC_Central_Weather_Bureau.svg/1200px-ROC_Central_Weather_Bureau.svg.png"
                width={45}
                height={100}
                alt=""
              />
              <p className="px-4 text-lg">交通部中央氣象署</p>
            </div>
          </div>
        </div>
        {wearherData.map((data, index) => {
          return (
            <div
              key={index}
              className="bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-2 rounded-lg"
            >
              <div>
                <iframe
                  className="w-full"
                  height="315"
                  src={`https://www.youtube.com/embed/${data?.link
                    .split("/")
                    .pop()}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div>
                  <h3 className="text-3xl py-3 text-center">{data.title}</h3>
                  <p className="px-4 text-lg">{data.description}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-1 rounded-lg">
          <div className="flex flex-col justify-center h-full">
            <h3 className="text-3xl py-3 text-center">-The End-</h3>
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
}
