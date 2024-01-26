import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { movieApi, tvApi } from '../api';
import { Loader } from '../components/Loader';
import HList from '../components/HList';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  border: solid 1px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState('');
  const {
    isLoading: loadingMovies,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery({
    queryKey: ['searchMovies', query],
    queryFn: movieApi.search,
    enabled: false,
  });
  const {
    isLoading: loadingTv,
    data: tvData,
    refetch: searchTv,
  } = useQuery({
    queryKey: ['searchTv', query],
    queryFn: tvApi.search,
    enabled: false,
  });
  const onChageText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === '') {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        onChangeText={onChageText}
        onSubmitEditing={onSubmit}
      />
      {loadingMovies || loadingTv ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movies Result" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="Tv Result" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
