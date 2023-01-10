import React from "react";
import mockAxios from "axios";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// eslint-disable-next-line testing-library/no-dom-import
import { configure } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import LandingPage from "./pages/listing";
import jest from "jest";

configure({ testIdAttribute: "id" });

jest.mock("axios");

const mockData = [
  {
    weight: {
      imperial: "6 - 13",
      metric: "3 - 6"
    },
    height: {
      imperial: "9 - 11.5",
      metric: "23 - 29"
    },
    id: 1,
    name: "Affenpinscher",
    bred_for: "Small rodent hunting, lapdog",
    breed_group: "Toy",
    life_span: "10 - 12 years",
    temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    origin: "Germany, France",
    reference_image_id: "BJa4kxc4X",
    image: {
      id: "BJa4kxc4X",
      width: 1600,
      height: 1199,
      url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    }
  },
  {
    weight: {
      imperial: "50 - 60",
      metric: "23 - 27"
    },
    height: {
      imperial: "25 - 27",
      metric: "64 - 69"
    },
    id: 2,
    name: "Afghan Hound",
    country_code: "AG",
    bred_for: "Coursing and hunting",
    breed_group: "Hound",
    life_span: "10 - 13 years",
    temperament: "Aloof, Clownish, Dignified, Independent, Happy",
    origin: "Afghanistan, Iran, Pakistan",
    reference_image_id: "hMyT4CDXR",
    image: {
      id: "hMyT4CDXR",
      width: 606,
      height: 380,
      url: "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg"
    }
  }
];

afterAll(() => {
  jest.clearAllMocks();
  mockAxios.get.mockClear();
});

const getUrl = "https://api.thedogapi.com/v1/breeds";
const getUrlSearch = "https://api.thedogapi.com/v1/breeds/search?q=";
mockAxios.get.mockImplementation(() => Promise.resolve({ data: [mockData] }));

function mockCall() {
  mockAxios.get.mockResolvedValueOnce({
    data: mockData
  });
}

function mockCallSearch() {
  mockAxios.get.mockResolvedValueOnce({
    data: [mockData[0]]
  });
}

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return {
    onUser: userEvent,
    fire: fireEvent,
    ...render(ui, { wrapper: BrowserRouter })
  };
};

test("Show loader when fetching dog list data", async () => {
  mockCall();
  render(<LandingPage />);
  expect(await screen.findByTestId("loader-container")).toBeInTheDocument();
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toBeCalledWith(getUrl);
});

test("Check the dog list data is loading correctly", async () => {
  mockCall();
  renderWithRouter(<LandingPage />);
  const rowValues = await screen.findAllByTestId("card-item");
  expect(rowValues.length).toEqual(mockData.length);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toBeCalledWith(getUrl);
});

test("Check user can able to search dogs correctly", async () => {
  mockCall();
  renderWithRouter(<LandingPage />);
  const rowValues = await screen.findAllByTestId("card-item");
  expect(rowValues.length).toEqual(mockData.length);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toBeCalledWith(getUrl);
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const searchInput = await screen.findByTestId("search-dogs");
  fireEvent.change(searchInput, { target: { value: "Affenpinscher" } });
  mockCallSearch();
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toBeCalledWith(getUrlSearch);
  jest.useFakeTimers();
  setTimeout(async () => {
    const resultRow = await screen.findAllByTestId("card-item");
    expect(resultRow.length).toEqual(1);
  }, 1000);
  jest.runAllTimers();
});

test("API Success check", () => {
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({ data: mockData, status: 200 })
  );
});

test("API Failed check", () => {
  mockAxios.get.mockImplementation(() =>
    Promise.reject({ error: "Internal Server Error.", status: 500 })
  );
});
