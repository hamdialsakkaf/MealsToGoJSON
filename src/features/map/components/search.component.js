import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

export const Search = () => {
  // السابق صالح
  //const { keyword, search } = useContext(LocationContext);
  //const { keyword, search } = useContext(LocationContext);
  const { city, search } = useContext(LocationContext);

  // السابق الصالح
  //const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [searchKeyword, setSearchKeyword] = useState(city);
/* السابق الصالح
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  */
  useEffect(() => {
    setSearchKeyword(city);
  }, [city]);
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        icon="map"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
