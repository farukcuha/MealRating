import * as React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Past from './pages/past/Past'
import './App.scss'
import Statistic from './pages/statistic/Statistic';
import PastDetail from './pages/past_detail/PastDetail';
import ReviewsContextProvider from './contexts/ReviewsContext';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import PastReviewsContextProvider from './contexts/PastReviewsContext';

export const API_BASE_URL = process.env.REACT_APP_BASE_API_URL

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);

  return (
    <ReviewsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home></Home> } />
          <Route path='statistic' element={ <Statistic /> } />
          <Route element={
            <PastReviewsContextProvider>
              <Outlet />
            </PastReviewsContextProvider>}>
            <Route path='past' element={ <Past /> } />
            <Route path='past/detail/:time/:meal' element={ <PastDetail /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReviewsContextProvider>
  );
}

export default App;
