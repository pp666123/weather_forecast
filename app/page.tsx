"use client";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip-agile";
import axios from "axios";
import Cover from "./FlipPage/Cover";
import End from "./FlipPage/End";
import Error from "./FlipPage/Error";
import Page from "./FlipPage/Page";
import Swal from "sweetalert2";

export default function Home() {
  interface dataType {
    link: string;
    title: string;
    description: string;
  }
  interface objectType {
    link: string;
    title: string;
    description: string;
  }
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    try {
      axios
        .get(
          "https://data.moa.gov.tw/Service/OpenData/Agriculturalcoa_videoRss.aspx?IsTransData=1&UnitId=F35"
        )
        .then((response) => {
          const data = response.data.slice(0, 7);
          const pageArray = [];
          pageArray.push(Cover());

          data.forEach((wearherData: objectType) => {
            pageArray.push(Page(wearherData));
          });
          pageArray.push(End());
          setPages(pageArray);
        });
    } catch (error) {
      const pageArray = [];
      pageArray.push(Cover());
      pageArray.push(Error());
      setPages(pageArray);
    }
  }, []);

  useEffect(() => {
    // Swal.fire({
    //   title: "載入中。。。",

    //   didOpen: async () => {
    //     Swal.showLoading();
    //     try {
    //       await axios
    //         .get(
    //           "https://data.moa.gov.tw/Service/OpenData/Agriculturalcoa_videoRss.aspx?IsTransData=1&UnitId=F35"
    //         )
    //         .then((response) => {
    //           const data = response.data.slice(0, 7);
    //           const pageArray = [];
    //           pageArray.push(Cover());

    //           data.forEach((wearherData: objectType) => {
    //             pageArray.push(Page(wearherData));
    //           });
    //           pageArray.push(End());
    //           setPages(pageArray);
    //         });
    //     } catch (error) {
    //       const pageArray = [];
    //       pageArray.push(Cover());
    //       pageArray.push(Error());
    //       setPages(pageArray);
    //     }
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url,
    //     });
    //   }
    // });

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
          setTimeout(() => {
            Swal.hideLoading();
            Swal.fire({
              title: "載入完成。。。",
              confirmButtonText: "打開手冊",
            });
          }, 2000);
        } catch (error) {
          setTimeout(() => {
            Swal.hideLoading();
            Swal.fire({
              title: "Error!",
              text: "An error occurred.",
              icon: "error",
              confirmButtonText: "Close",
            });
          }, 2000);
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
