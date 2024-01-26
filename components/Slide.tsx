import React from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
} from 'react-native';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import Poster from './Poster';
import { useNavigation } from '@react-navigation/native';
import { Movie } from '../api';

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.6;
  margin-top: 10px;
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === 'dark';

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
    <TouchableWithoutFeedback onPress={goToDetail} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          tint={isDark ? 'dark' : 'light'}
          intensity={95}
          style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title>{originalTitle}</Title>
              {voteAverage > 0 ? <Votes>⭐{voteAverage}/10</Votes> : null}
              <Overview>{overview.slice(0, 60)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
