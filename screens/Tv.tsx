import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { tvApi } from '../api';
import { Loader } from '../components/Loader';
import HList from '../components/HList';

const Tv = () => {
  const queryClient = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: trendingLoading, data: trendingData } = useQuery({
    queryKey: ['tv', 'trending'],
    queryFn: tvApi.getTrending,
  });
  const { isLoading: tvLoading, data: todayData } = useQuery({
    queryKey: ['tv', 'today'],
    queryFn: tvApi.getAiringToday,
  });
  const { isLoading: topLoading, data: topData } = useQuery({
    queryKey: ['tv', 'top'],
    queryFn: tvApi.getTopRated,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({ queryKey: ['tv'] });
    setRefreshing(false);
  };

  const loading = trendingLoading || tvLoading || topLoading;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <HList title="Trending Tv" data={trendingData.results} />

      <HList title="Airing Today" data={todayData.results} />

      <HList title="Top Rated Tv" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
