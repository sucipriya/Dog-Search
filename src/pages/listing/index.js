import React, { useRef, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import Spinner from "../../components/spinner";
import DebounceInput from "../../components/debounceInput";
import { filteredInformation } from "../../utils/common";

import {
  MainWrapper,
  TitleOfApp,
  InputWrapper,
  StyledDebouceInput,
  StyledDropdown,
  NoDog,
} from "../listing/styles";

// const { REACT_APP_FETCH_ALL_DOG_URL, REACT_APP_FETCH_SEARCH_BY_NAME_URL } =
//   process.env;

const dropDownOptions = [
  { label: "Name", value: 1 },
  { label: "Height", value: 2 },
  { label: "LifeSpan", value: 4 },
];

const Listing = () => {
  const [state, setState] = useState({
    dogListData: [],
    isLoading: false,
    searchKeyword: "",
    noData: "No Dogs Found",
    selectedSortOrder: [],
    dogOriginalData: [],
  });
  // const mycustomeRef = useRef();

  // useEffect(() => {
  //   mycustomeRef.current.focus();
  // });

  // Get all Dogs Details
  const getAllDogData = () => {
    axios.defaults.headers.common["x-api-key"] =
      "live_E0XX5dphJzpz0uOmEfQq8CjDECtQieMVCxp9y5IUcgXJNO7dPFNSvyYgT85Ruo3T";
    axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setState((prevState) => ({
            ...prevState,
            dogListData: data,
            dogOriginalData: data,
            isLoading: false,
          }));
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error?.response?.status === 401) {
            // window.location = REACT_APP_AUTH_REDIRECT_URL;
          } else if (error?.response?.status === 403) {
            // const alertPanel = document.getElementById("alert-root");
            // if (alertPanel) {
            //   alertPanel.style.display = "flex";
            // }
          }
        }
      });
  };

  // this.state.message = "hello world";
  // this.setState({message:msg})
  // const [message, setMessge]= useState("")
  // setMessage("hello world")

  //Search By Dog Name
  const onSearchDogbyName = () => {
    axios.defaults.headers.common["x-api-key"] =
      "live_E0XX5dphJzpz0uOmEfQq8CjDECtQieMVCxp9y5IUcgXJNO7dPFNSvyYgT85Ruo3T";
    axios
      .get(
        `https://api.thedogapi.com/v1/breeds/search?q=${state.searchKeyword}`
      )
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setState((prevState) => ({
            ...prevState,
            dogListData: data,
          }));
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error?.response?.status === 401) {
            // window.location = REACT_APP_AUTH_REDIRECT_URL;
          } else if (error?.response?.status === 403) {
            // const alertPanel = document.getElementById("alert-root");
            // if (alertPanel) {
            //   alertPanel.style.display = "flex";
            // }
          }
        }
      });
  };

  // Call on dependency of search value
  useEffect(() => {
    if (state.searchKeyword !== "") {
      onSearchDogbyName();
    } else {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      getAllDogData();
    }
  }, [state.searchKeyword]);

  // Call on dependency of sorting values: Name, Height and Lifespan
  useEffect(() => {
    const clonedDogDataList = _.cloneDeep(state.dogListData);

    if (state.selectedSortOrder.value === 1) {
      setState((prevState) => ({
        ...prevState,
        dogListData: _.orderBy(clonedDogDataList, "name", "asc"),
      }));
    } else if (state.selectedSortOrder.value === 2) {
      setState((prevState) => ({
        ...prevState,
        dogListData: _.sortBy(clonedDogDataList, function (obj) {
          return parseInt(obj.height.imperial, 10);
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        dogListData: _.sortBy(clonedDogDataList, function (obj) {
          return parseInt(obj.life_span, 10);
        }),
      }));
    }
  }, [state.selectedSortOrder]);

  const placeholderForDropdown = (
    <span style={{ color: "rgb(199, 224, 224)" }}>Sory by: Category</span>
  );

  const initialData = _.cloneDeep(state.dogOriginalData);
  return (
    <>
      {/* <input type="text" />
      <input type="text" ref={mycustomeRef} /> */}
      <MainWrapper>
        <Outlet context={[initialData]} />
        <TitleOfApp>Dog Breed Search</TitleOfApp>
        <>
          <InputWrapper>
            <StyledDebouceInput>
              <DebounceInput
                id="search-dogs"
                type="text"
                placeholder="Search for a favourite pet details"
                debounceTimeout={1000}
                onChange={(e) => {
                  setState((prevState) => ({
                    ...prevState,
                    searchKeyword: e.target.value,
                  }));
                }}
              />
            </StyledDebouceInput>
            <StyledDropdown
              options={dropDownOptions}
              isDisabled={false}
              isLoading={false}
              isSearchable={true}
              placeholder={placeholderForDropdown}
              onChange={(setSelectedValue) => {
                setState((prevState) => ({
                  ...prevState,
                  selectedSortOrder: setSelectedValue,
                }));
              }}
              selectedValue={state.selectedSortOrder}
              value={state.selectedSortOrder}
              className="display-sort-order"
            />
          </InputWrapper>
          {state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              {!_.isEmpty(state.dogListData) ? (
                <Container>
                  <Row>
                    {state.dogListData?.map((data) => {
                      const filterDogImage = filteredInformation(
                        state.dogOriginalData,
                        data
                      )?.[0];
                      return (
                        <Col id="card-item">
                          <Card
                            key={data.id}
                            style={{
                              width: "15rem",
                              marginBottom: "45px",
                              border: "1px solid teal",
                            }}
                          >
                            <Link to={`/${data.name}`} key={data.id}>
                              <Card.Img
                                variant="top"
                                src={
                                  filterDogImage?.image?.url
                                    ? filterDogImage.image.url
                                    : `/dogLogo.jpg`
                                }
                                alt={data.name}
                                style={{ width: "238px", height: "150px" }}
                              />
                            </Link>
                            <Card.Body
                              style={{
                                padding: "1rem",
                              }}
                            >
                              <Card.Title
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  wordBreak: "keep-all",
                                }}
                                title={data.name}
                              >
                                {data.name}
                              </Card.Title>
                              <Card.Text style={{ fontSize: "15px" }}>
                                <br />
                                Height in Imperial: {data.height.imperial}
                                <br />
                                Height in Metrics: {data.height.metric}
                                <br />
                                LifeSpan: {data.life_span}
                              </Card.Text>
                              <Link to={`/${data.name}`} key={data.id}>
                                <Button
                                  variant="primary"
                                  style={{
                                    backgroundColor: "teal",
                                    border: "none",
                                  }}
                                >
                                  Details
                                </Button>
                              </Link>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              ) : state.searchKeyword !== "" ? (
                <NoDog>
                  <img src={`/nodog.png`} />
                </NoDog>
              ) : null}
            </div>
          )}
        </>
      </MainWrapper>
    </>
  );
};

export default Listing;
