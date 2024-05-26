import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type Layout = "vertical" | "mobile";

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ApiError<T = null> extends Error {
  data: T;
  message: string;
}

export type ID = number;

export interface Scheme {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export type Order = "asc" | "desc";

export type PageQueryParams = {
  page: number;
  limit: number;
  isBest: number;
  area?: string;
  sort?: string;
  order?: Order;
  search?: string;
};

export type DetailMountainQueryParams = {
  frtrlId: string;
};

export type CursorQueryParams = {
  page: number;
  limit: number;
  isBest: number;
  area: string;
};

export interface PageQueryResponse<T> {
  data: T;
  total: number;
}

export interface CursorQueryResponse<T, S> {
  previous: S;
  next: S;
  data: T;
  total?: number;
}

export type UrlBuilder<T> = string | ((data: T) => string);

export type QueryKey<T = void> = [UrlBuilder<T>, Optional<object>];

export type QueryOptions<T> = UseQueryOptions<
  T,
  AxiosError<ApiError>,
  T,
  QueryKey
>;

export type PageQueryOptions<T, S = PageQueryResponse<T>> = UseQueryOptions<
  S,
  AxiosError<ApiError>,
  S,
  QueryKey
>;

export type InfiniteQueryOptions<
  T,
  S = CursorQueryResponse<T, number>
> = UseInfiniteQueryOptions<S, AxiosError<ApiError>, S, S, QueryKey>;

export type MutationOptions<T, S> = UseMutationOptions<
  ApiResponse<T>,
  AxiosError<ApiError>,
  S
>;
