import styled from 'styled-components';
import { useState } from 'react';
import Knew from '../Logo/logo.png';
import LoginModal from './login';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAccessToken, setLogin, setRefreshToken, setSearchValue } from '../feature/info';
import Search from './search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [scroll, setScroll] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLogin = useAppSelector((state: RootState) => state.info.login)
  const dispatch = useAppDispatch()
  const openModalHandler = (): void => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate()
  window.addEventListener('scroll', (): void => {
    let top =
      window.scrollY ||
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (top > 30) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });

  const clickHome = (): void => {
    dispatch(setSearchValue(''))
    navigate('/')
  }
  const clickHandler = async () => {
    localStorage.clear();
    dispatch(setLogin(false))
    dispatch(setAccessToken(''))
    dispatch(setRefreshToken(''))
    dispatch(setSearchValue(''))
    alert('로그아웃 되었습니다.');
    window.location.reload();
  };
  const clickSignup = (): void => {
    dispatch(setSearchValue(''))
    navigate('/signup')
  }
  const clickPost = (): void => {
    dispatch(setSearchValue(''))
    navigate('/post')
  }
  return (
    <>
      <Container scroll={scroll}>
        <HeaderWrap>
          <Logo src={Knew} onClick={clickHome} />
          <Search />
          <RightContents>
            <Home onClick={clickHome}>홈</Home>
            {isLogin ?
              <>
                <PostTag onClick={clickPost}>글작성</PostTag>
                <LogoutTag onClick={clickHandler}>로그아웃</LogoutTag>
              </>
              :
              <>
                <Home onClick={clickSignup}>회원가입</Home>
                <LoginTag onClick={openModalHandler}>로그인</LoginTag>
              </>
            }
          </RightContents>
          {isOpen && <LoginModal openModalHandler={openModalHandler} setIsOpen={setIsOpen} />}
        </HeaderWrap>
      </Container>
    </>
  );
};

export default Header;

const Container = styled.div<{ scroll: boolean }>`
  width: 100%;
  height: 60px;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
  box-shadow: ${(props) => props.scroll ? '2px 2px 10px rgba(0,0,0,0.1)' : ''};
`;

const HeaderWrap = styled.div`
  width: 100vw;
  display: flex;
  padding: 0px 40px;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
  height: 60px;
  border-radius: 10px;
  :hover{
    cursor: pointer;
  }
`;

const RightContents = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10%;
  @media (max-width: 1400px) {
    width: 20%;
  }
  @media (max-width: 650px) {
    width: 30%;
  }
`;

const LoginTag = styled.div`
  cursor: pointer;
  transition: 0.5s;
  color:#8b8b8b;
  :hover {
    color:#FF4461;
    transform: scale(1.1);
  }
`;

const LogoutTag = styled(LoginTag)`
  
`
const Home = styled(LoginTag)`
  
`
const PostTag = styled(LoginTag)`
  
`