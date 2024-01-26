const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzM3NGIxYzg0OWI0ZDQ1YTQ1Y2YyNmNmMWU1MWI3NSIsInN1YiI6IjYzYmVhZDViZmE0MDQ2MDBhZWZmNzRiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JMiFCjy7mjcESk5ay8puH-ptNt_bkJ61BVzAiCsMucg';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const BASE_URL = 'https://api.themoviedb.org/3/';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const movieApi = {
  getTrending: () =>
    fetch(`${BASE_URL}trending/movie/day`, options).then((res) => res.json()),
  getUpComing: ({ pageParams }) =>
    fetch(
      `${BASE_URL}movie/upcoming?language=en-US&page=${pageParams}`,
      options
    ).then((res) => res.json()),
  getNowPlaying: () =>
    fetch(`${BASE_URL}movie/now_playing?language=ko-KR&page=1`, options).then(
      (res) => res.json()
    ),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(`${BASE_URL}search/movie?query=${query}`, options).then(
      (res) => res.json()
    );
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(`${BASE_URL}movie/${id}`, options).then((res) => res.json());
  },
};

export const tvApi = {
  getTrending: () =>
    fetch(`${BASE_URL}trending/tv/day`, options).then((res) => res.json()),
  getAiringToday: () =>
    fetch(`${BASE_URL}tv/airing_today`, options).then((res) => res.json()),
  getTopRated: () =>
    fetch(`${BASE_URL}tv/top_rated`, options).then((res) => res.json()),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(`${BASE_URL}search/tv?query=${query}`, options).then((res) =>
      res.json()
    );
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(`${BASE_URL}tv/${id}`, options).then((res) => res.json());
  },
};
