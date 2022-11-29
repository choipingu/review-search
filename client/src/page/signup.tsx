import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


function Signup() {
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nickNameMessage, setNickNameMessage] = useState<string>('')
    const [emailMessage, setEmailMessage] = useState<string>('')
    const [passwordMessage, setPasswordMessage] = useState<string>('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('')
    const [isNickName, setIsNickName] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false)
    const navigate = useNavigate()

    const SignupData = {
        "email": email,
        "nickname": nickname,
        "password": password
    }
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)
        setError(false)
        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸습니다')
            setIsEmail(true)
        } else {
            setIsEmail(false)
        }
    }, [])

    const onChangeNickName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value)
        setError(false)
        if (e.target.value.length < 2) {
            setNickNameMessage('2글자 이상 입력해주세요.')
            setIsNickName(true)
        } else {
            setIsNickName(false)
        }
    }, [])

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent)
        setError(false)
        if (!passwordRegex.test(passwordCurrent)) {
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요')
            setIsPassword(true)
        } else {
            setIsPassword(false)
        }
    }, [])

    const onChangePasswordConfirm = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const passwordConfirmCurrent = e.target.value
            setError(false)
            if (password === passwordConfirmCurrent) {
                setIsPasswordConfirm(false)
            } else {
                setPasswordConfirmMessage('비밀번호가 틀립니다')
                setIsPasswordConfirm(true)
            }
        },
        [password]
    )

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/account/signup`, SignupData, config)
            if (res.data.message === "vailed email") {
                setError(true)
                setErrorMessage('중복된 이메일입니다')
            }
            else if (res.data.message === "vailed nickname") {
                setError(true)
                setErrorMessage('중복된 닉네임입니다')
            }
            else {
                setError(false)
                navigate('/')
            }
        } catch (e) {
            setError(true);
        }
    };
    const msglog = () => {
        if (isEmail) {
            return emailMessage
        }
        if (isNickName) {
            return nickNameMessage
        }
        if (isPassword) {
            return passwordMessage
        }
        if (isPasswordConfirm) {
            return passwordConfirmMessage
        }
        if (error) {
            return errorMessage
        }
        if (!(isEmail && isNickName && isPassword && isPasswordConfirm)) {
            return '회원가입 가능'
        }
    }
    return (
        <Container>
            <FormTag onSubmit={handleLogin}>
                <InfoTag>회원가입</InfoTag>
                <InputTag type='text' placeholder='email' onChange={onChangeEmail} />
                <InputTag type='text' placeholder='nickname' onChange={onChangeNickName} />
                <InputTag type='password' placeholder='password' onChange={onChangePassword} />
                <InputTag type='password' placeholder='passwordConfirm' onChange={onChangePasswordConfirm} />
                <ButtonTag type='submit' onClick={handleLogin}>
                    회원가입
                </ButtonTag>
                <SpanTag>{msglog()}</SpanTag>
            </FormTag>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
`

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
  font-weight: 500;
  font-size: 22px;
  color: red;
  margin-top: 10px;
`;
export default Signup