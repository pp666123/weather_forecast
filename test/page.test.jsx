import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import Home from "../app/page";
import axios from "axios";
import FlipBook from "../app/components/FlipBook";

jest.mock("axios");

test("renders Home component", () => {
  render(<Home />);
  expect(screen.getByText("載入中。。。")).toBeInTheDocument();
});

test("renders Home component and shows error alert on unsuccessful API GET", async () => {
  const mockAxios = new MockAdapter(axios);
  mockAxios
    .onGet(
      "https://data.moa.gov.tw/Service/OpenData/Agriculturalcoa_videoRss.aspx?IsTransData=1&UnitId=F35"
    )
    .reply(500);

  // 渲染元件
  render(<Home />);

  // 等待異步操作完成
  await waitFor(() => {
    // 檢查是否存在錯誤警告
    const errorAlert = screen.getByText("oops發生錯誤，請稍後在試!");
    expect(errorAlert).toBeInTheDocument();
  });
});

test("data onload success then show 載入完成。。。 alert", async () => {
  const mockData = [
    { link: "link1", title: "title1", description: "description1" },
    { link: "link2", title: "title2", description: "description2" },
    { link: "link3", title: "title3", description: "description3" },
    { link: "link4", title: "title4", description: "description4" },
    { link: "link5", title: "title5", description: "description5" },
    { link: "link6", title: "title6", description: "description6" },
    { link: "link7", title: "title7", description: "description7" },
    // ... only get 7 data
  ];

  render(<FlipBook data={mockData} />);

  mockData.forEach((wearherData, index) => {
    const iframeElement = document.getElementById(wearherData.title);
    if (index === 6) {
      iframeElement?.dispatchEvent(new Event("load"));
    }
  });

  await waitFor(() => {
    const sucessAlert = screen.getByText("載入完成。。。");
    expect(sucessAlert).toBeInTheDocument();

    // 找到 "打開手冊" 按鈕並點擊它
    const openHandbookButton = screen.getByText("打開手冊");
    fireEvent.click(openHandbookButton);
  });
});

test("click 打開手冊 button than can flip next page", async () => {
  const mockData = [
    { link: "link1", title: "title1", description: "description1" },
    { link: "link2", title: "title2", description: "description2" },
    { link: "link3", title: "title3", description: "description3" },
    { link: "link4", title: "title4", description: "description4" },
    { link: "link5", title: "title5", description: "description5" },
    { link: "link6", title: "title6", description: "description6" },
    { link: "link7", title: "title7", description: "description7" },
    // ... only get 7 data
  ];

  render(<FlipBook data={mockData} />);

  // 模擬點擊第一頁，使其翻頁
  const coverPage = screen.getByTestId("flip-page-cover");
  fireEvent.click(coverPage);

  // 使用 waitFor 等待翻頁的異步操作完成
  await waitFor(() => {
    // 斷言翻頁後的狀態或畫面變化，可以根據實際情況修改
    // 這裡我們使用 data-testid 作為示例，你可以根據實際情況修改
    const nextPageContent = screen.getByTestId("flip-page-1");
    expect(nextPageContent).toBeInTheDocument();
  });
});

test("data onload success then show correct data", async () => {
  const mockData = [
    { link: "link1", title: "title1", description: "description1" },
    { link: "link2", title: "title2", description: "description2" },
    { link: "link3", title: "title3", description: "description3" },
    { link: "link4", title: "title4", description: "description4" },
    { link: "link5", title: "title5", description: "description5" },
    { link: "link6", title: "title6", description: "description6" },
    { link: "link7", title: "title7", description: "description7" },
    // ... add more mock data as needed
  ];

  render(<FlipBook data={mockData} />);

  mockData.forEach((item) => {
    expect(screen.getByText(item.title)).toBeInTheDocument();
  });
});
