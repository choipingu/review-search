import { useEffect } from "react";
import Header from "./components/header";
import { setAccessToken, setLogin, setRefreshToken } from "./feature/info";
import Main from "./page/main";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import styled from 'styled-components';
import { RootState } from "./store";
import Review from "./page/review";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from "./page/signup";
import Post from "./page/post";


function App() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state: RootState) => state.info.login)

  const Login = ({ children }: any) => {
    return isLogin ? children : (
      alert('로그인을 먼저 해주세요.'),
      <Navigate to={'/'} />
    );
  };
  useEffect(() => {
    const res = localStorage.getItem('accessToken')
    const res1 = localStorage.getItem('refreshToken')
    if (res) {
      dispatch(setAccessToken(res))
      dispatch(setLogin(true))
    }
    if (res1) {
      dispatch(setRefreshToken(res1))
    }
  }, [])
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path="/*" element={<Navigate to='/' />} />
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post" element={<Post />} />
          <Route path="/review/" element={<Login><Review /></Login>} />
          <Route path="/review/:id" element={<Login><Review /></Login>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
`
