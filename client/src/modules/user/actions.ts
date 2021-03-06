import { createAction, createAsyncAction } from "typesafe-actions";
import { AxiosError, AxiosResponse } from "axios";

export const LOG_IN_REQUEST = "user/LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "user/LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "user/LOG_IN_FAILURE";

export const LOAD_MY_INFO_REQUEST = "user/LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "user/LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "user/LOAD_MY_INFO_FAILURE";

export const LOAD_USER_INFO_REQUEST = "user/LOAD_USER_INFO_REQUEST";
export const LOAD_USER_INFO_SUCCESS = "user/LOAD_USER_INFO_SUCCESS";
export const LOAD_USER_INFO_FAILURE = "user/LOAD_USER_INFO_FAILURE";

export const JOIN_REQUEST = "user/JOIN_REQUEST";
export const JOIN_SUCCESS = "user/JOIN_SUCCESS";
export const JOIN_FAILURE = "user/JOIN_FAILURE";

export const LOGOUT_REQUEST = "user/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "user/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "user/LOGOUT_FAILURE";

export const loginAsyncAction = createAsyncAction(
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
)<any, AxiosResponse, AxiosError<any>>();

export const joinAsyncAction = createAsyncAction(
  JOIN_REQUEST,
  JOIN_SUCCESS,
  JOIN_FAILURE,
)<any, AxiosResponse, AxiosError<any>>();

export const logoutAsyncAction = createAsyncAction(
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
)<void, AxiosResponse, AxiosError<any>>();

export const loadMyInfoAction = createAsyncAction(
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
)<void, AxiosResponse, AxiosError<any>>();

export const loadUserInfoAction = createAsyncAction(
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
)<void, AxiosResponse, AxiosError<any>>();
