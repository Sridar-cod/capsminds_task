import axios from "axios";
import { getUserData } from "./storage";
const API_KEY = "AIzaSyBXlBGOoUTkqDqkmY117FMuUTlCBWU8Wvo";
const FIREBASE_URL = `https://identitytoolkit.googleapis.com/v1`;
const REGISTER_URL = `${FIREBASE_URL}/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `${FIREBASE_URL}/accounts:signInWithPassword?key=${API_KEY}`;
const USER_URL = `${FIREBASE_URL}/accounts:lookup?key=${API_KEY}`;

const BASE_URL = "http://localhost:3000";
const CONDITIONS_URL = `${BASE_URL}/data/conditions.json`;
const DOCTORS_URL = `${BASE_URL}/data/doctors.json`;

const fetchData = async (url, type) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`${type} fetch error`, response.status);
      throw new Error(`failed to fetch ${type} data`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`err fetching ${type}`, error.message);
    throw error;
  }
};

export const fetchConditions = async () => {
  return await fetchData(CONDITIONS_URL, "Conditions");
};

export const fetchDoctors = async () => {
  return await fetchData(DOCTORS_URL, "Doctors");
};

export const getConditionDetail = async (id) => {
  try {
    const conditions = await fetchConditions();
    const condition = conditions.find((cond) => cond.id === parseInt(id));
    if (!condition) {
      throw new Error(`id ${id} not found`);
    }
    return condition;
  } catch (error) {
    console.error("err", error.message);
  }
};

export const getDoctorDetail = async (id) => {
  try {
    const doctors = await fetchDoctors();
    const doctor = doctors.find((doc) => doc.id === parseInt(id));
    if (!doctor) {
      throw new Error(`id ${id} not found`);
    }
    return doctor;
  } catch (error) {
    console.error("error", error.message);
  }
};

export const register = (inputs) => {
  let data = {
    displayName: inputs.name,
    email: inputs.email,
    password: inputs.password,
  };
  return axios.post(REGISTER_URL, data);
};
export const login = (inputs) => {
  let data = { email: inputs.email, password: inputs.password };
  return axios.post(LOGIN_URL, data);
};
export const userDetails = () => {
  let data = { idToken: getUserData() };
  return axios.post(USER_URL, data);
};
