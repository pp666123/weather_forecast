"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Book from "./components/FlipBook";

export default function Home() {
  interface objectType {
    link: string;
    title: string;
    description: string;
  }
  const [data, setData] = useState<objectType[]>([]);

  useEffect(() => {
    Swal.fire({
      title: "載入中。。。",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          await axios
            .get(
              "https://data.moa.gov.tw/Service/OpenData/Agriculturalcoa_videoRss.aspx?IsTransData=1&UnitId=F35"
            )
            .then((res) => {
              setData(res.data.slice(0, 7));
            });
        } catch (error) {
          Swal.hideLoading();
          Swal.fire({
            title: "oops發生錯誤，請稍後在試!",
            icon: "error",
          });
        }
      },
    });
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center  px-2">
      <div className="w-[100%] md:w-[90%]">
        <Book data={data} />
      </div>
    </div>
  );
}
