import Image from "next/image";

export default function Cover() {
  return (
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
  );
}
