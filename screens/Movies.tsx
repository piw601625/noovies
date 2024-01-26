import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import HMedia from '../components/Hmedia';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Movie, MovieResponse, movieApi } from '../api';
import { Loader } from '../components/Loader';
import HList from '../components/HList';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlaying } =
    useQuery<MovieResponse>({
      queryKey: ['movies', 'nowPlaying'],
      queryFn: movieApi.getNowPlaying,
    });
  const { isLoading: trendingLoading, data: trending } =
    useQuery<MovieResponse>({
      queryKey: ['movies', 'trending'],
      queryFn: movieApi.getTrending,
    });
  const {
    isLoading: upComingLoading,
    data: upComing,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>({
    queryKey: ['movies', 'upComing'],
    initialPageParam: 0,
    queryFn: movieApi.getUpComing({ pageParams: 1 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 > lastPage.total_pages) {
        return null;
      }
      return lastPage.page + 1;
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries({ queryKey: ['movies'] });
    setRefreshing(false);
  };

  const renderHMedia = ({ item }: any) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  );

  const loading = nowPlayingLoading || trendingLoading || upComingLoading;

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: '100%',
              height: SCREEN_HEIGHT / 3,
            }}>
            {nowPlaying?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ''}
                posterPath={movie.poster_path || ''}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trending ? (
            <HList title="Trending Movies" data={trending.results} />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upComing?.pages.map((page) => page.results).flat()}
      renderItem={renderHMedia}
      keyExtractor={(item: Movie) => item.id + ''}
      contentContainerStyle={{ paddingVertical: 10 }}
      ItemSeparatorComponent={HSeperator}
    />
  );
};

export default Movies;
