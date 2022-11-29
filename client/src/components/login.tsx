import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios'
import { useAppDispatch } from '../store/hooks'
import { setAccessToken, setLogin, setRefreshToken, setUserId } from '../feature/info';
import { useNavigate } from 'react-router-dom';

interface modalType {
  openModalHandler: React.MouseEventHandler<HTMLDivElement>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function LoginModal({ openModalHandler, setIsOpen }: modalType) {
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loginData = {
    "email": email,
    "password": password
  }
  const config = {
    headers: {
      'Accept': 'application/json'
    }
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/account/login`, loginData, config)
      console.log(res)
      if (res.data) {
        setIsOpen(false)
        dispatch(setLogin(true))
        dispatch(setAccessToken(res.data.token.access))
        dispatch(setRefreshToken(res.data.token.refresh))
        dispatch(setUserId(res.data.user.id))
        navigate('/')
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Background onClick={openModalHandler}>
      <Container onClick={(e) => e.stopPropagation()}>
        <FormTag onSubmit={handleLogin}>
          <InfoTag>로그인</InfoTag>
          <InputTag type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
          <InputTag type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
          <ButtonTag type='submit' onClick={handleLogin}>
            로그인
          </ButtonTag>
          {error && <SpanTag>이메일 또는 비밀번호가 틀렸습니다.</SpanTag>}
        </FormTag>
      </Container>
    </Background>
  );
}

export default LoginModal

const Background = styled.div`
  display: ${(isOpen) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; 
  background-color: rgba(102, 100, 100, 0.7 );
  display: flex;
  justify-content: center;
  align-items: center;
  
`;
const Container = styled.div`
  width: 40vw;
  height: 50vh;
  background-color: white;
  border-radius: 10px;
  border: 1px solid;
  justify-content: center;
  display: flex;
`;

const InfoTag = styled.div`
  font-size: 30px;
`;
const FormTag = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputTag = styled.input`
  width: 200px;
  height: 30px;
  margin: 10px;
`;
const ButtonTag = styled.button`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 30px;
  border: none;
  background-color: purple;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;
const SpanTag = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 10px;
`;
