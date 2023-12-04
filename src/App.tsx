import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { auth } from './firebase';
import { login } from './features/auth/authSlice';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import AuthRoutes from './components/HOC/AuthRoutes';

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
            border: '3px solid #2b2b2b',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
  },
});

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL,
          }),
        );
      }
    });

    return () => unSubscribe();
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route
            path='yugioh-card-tracker'
            element={<Dashboard />}
          ></Route>
        </Route>
        <Route
          path='auth'
          element={<Auth />}
        ></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
