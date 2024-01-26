import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Movie, TV, movieApi, tvApi } from '../api';
import Poster from '../components/Poster';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Share,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { makeImgPath } from '../utils';
import { BLACK_COLOR } from '../colors';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Loader } from '../components/Loader';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 3}px;
  justify-content: flex-end;
  padding: 0 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 34px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === 'dark';

  const isMovie = 'original_title' in params;

  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.hompage;

    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
      });
    }
  };

  const ShareBtn = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons
        name="share-outline"
        color={isDark ? 'white' : BLACK_COLOR}
        size={24}
      />
    </TouchableOpacity>
  );

  const { isLoading, data } = useQuery({
    queryKey: [isMovie ? 'movies' : 'tv', params.id],
    queryFn: isMovie ? movieApi.detail : tvApi.detail,
  });

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => ShareBtn(),
      });
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['transparent', isDark ? BLACK_COLOR : 'white']}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      {isLoading ? <Loader /> : null}
    </Container>
  );
};

export default Detail;
