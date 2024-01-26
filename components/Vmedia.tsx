import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Movie, TV } from '../api';

const MovieView = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    // @ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <MovieView>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 6)}
          {originalTitle.length > 6 ? '...' : null}
        </Title>
        <Votes votes={voteAverage} />
      </MovieView>
    </TouchableOpacity>
  );
};

export default VMedia;
