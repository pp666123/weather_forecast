"use client";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip-agile";
import axios from "axios";
import Cover from "./FlipPage/Cover";
import End from "./FlipPage/End";
import Page from "./FlipPage/Page";
import Swal from "sweetalert2";

export default function Home() {
  interface objectType {
    link: string;
    title: string;
    description: string;
  }
  const [pages, setPages] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    Swal.fire({
      title: "載入中。。。",
      showLoaderOnConfirm: true,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const response = await axios.get(
            "https://data.moa.gov.tw/Service/OpenData/Agriculturalcoa_videoRss.aspx?IsTransData=1&UnitId=F35"
          );
          const data = response.data.slice(0, 7);
          const pageArray = [];
          pageArray.push(Cover());

          data.forEach((wearherData: objectType) => {
            pageArray.push(Page(wearherData));
          });
          pageArray.push(End());
          setPages(pageArray);

          const iframe = document.getElementById(data.pop().title);
          if (iframe) {
            iframe.addEventListener("load", () => {
              Swal.hideLoading();
              Swal.fire({
                title: "載入完成。。。",
                confirmButtonText: "打開手冊",
              });
            });
            return () => {
              iframe.removeEventListener("load", () => {});
            };
          }
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
        {pages}
      </HTMLFlipBook>
    </div>
  );
}
