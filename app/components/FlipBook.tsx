import Image from "next/image";
import HTMLFlipBook from "react-pageflip-agile";
import Swal from "sweetalert2";

interface objectType {
  link: string;
  title: string;
  description: string;
}
interface arrayType {
  data: objectType[];
}

export default function FlipBook({ data }: arrayType) {
  return (
    <>
      {data.length > 0 ? (
        <HTMLFlipBook width={1} height={1} size={"stretch"} maxWidth={630}>
          <div
            data-testid="flip-page-cover"
            className="bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-1 rounded-lg"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-3xl py-3 text-center">
                  農業部農業氣象影音
                </h3>
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

              <div className="flex flex-col sm:flex-row sm:justify-center justify-start items-center">
                <p className="px-4 text-lg">資料來源：</p>
                <div className="flex">
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
          </div>
          {data.map((wearherData, index) => {
            return (
              <div
                data-testid={`flip-page-${index}`}
                key={index}
                className={`${
                  index % 2
                    ? "bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-1 rounded-lg"
                    : "bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-2 rounded-lg"
                }`}
              >
                <div>
                  <iframe
                    id={wearherData.title}
                    className="w-full"
                    height="315"
                    src={`https://www.youtube.com/embed/${wearherData.link
                      .split("/")
                      .pop()}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => {
                      if (index === 6) {
                        Swal.fire({
                          title: "載入完成。。。",
                          confirmButtonText: "打開手冊",
                          allowOutsideClick: false,
                        });
                      }
                    }}
                  />
                  <div>
                    <h3 className="text-3xl py-3 text-center">
                      {wearherData.title}
                    </h3>
                    <p className="px-4 text-lg">{wearherData.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            data-testid="flip-page-end"
            className="bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-1 rounded-lg"
          >
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-3xl py-3 text-center">-End-</h3>
            </div>
          </div>
        </HTMLFlipBook>
      ) : (
        <></>
      )}
    </>
  );
}
