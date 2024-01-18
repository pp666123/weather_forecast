"use client";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip-agile";
import axios from "axios";
import Image from "next/image";
import Cover from "./FlipPage/Cover";
import End from "./FlipPage/End";
import Error from "./FlipPage/Error";
import Page from "./FlipPage/Page";

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
  const [wearherData, setWearherData] = useState<dataType[]>([]);
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    try {
      axios
        .get(
          "https://data.moa.gov.tw/Service/OpenData/Agriculturalcoa_videoRss.aspx?IsTransData=1&UnitId=F35"
        )
        .then((response) => {
          const data = response.data.slice(0, 7);
          setWearherData(data);
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
