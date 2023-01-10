import styled from "styled-components/macro";
import Dropdown from "../../components/select";

export const MainWrapper = styled.div``;

export const TitleOfApp = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: teal;
  font-size: 3.5rem;
  font-family: cursive;
  margin-top: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 50px;
  padding-top: 25px;
  position: sticky;
  top: 0px;
  z-index: 999;
  background: #f0f8ffde;
`;

export const StyledDebouceInput = styled.div`
  width: 35%;
  margin-right: 20px;

  input {
    border-radius: 7px;
    height: 38px;
    padding-left: 7px;
    height: 35px;
    width: 100%;
    border: 1px solid lightgrey;
    color: teal;
    /* margin-right: 20px; */
  }

  input:hover {
    border: 1px solid teal;
  }
  input:focus {
    border: 1px solid teal;
  }
  input:active {
    border: 1px solid teal;
  }
  input:visited {
    border: 1px solid teal;
  }
  /* input::focus-visible: {
    border: 1px solid teal;
  } */
  input:focus-visible {
    outline: 1px solid teal;
    border-radius: 3px;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  div[class*="-ValueContainer"] {
    width: 150px;
  }
`;

export const NoDog = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
