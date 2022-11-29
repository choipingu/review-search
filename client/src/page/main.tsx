import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { bmart, cookat, coupang, curly, market, naverstore, ssg, wingit } from './url'
import { useEffect, useRef, useState } from 'react'
function Main() {

    const navigate = useNavigate()
    const clickHandler = (id: string) => {
        navigate(`/review/${id}`)
    }
    return (
        <Container>
            <MarketContainer>
                <ChildDiv onClick={() => clickHandler('마켓컬리')}><Img src={curly} />마켓컬리</ChildDiv>
                <ChildDiv onClick={() => clickHandler('쿠팡프레시')}><Img src={coupang} />쿠팡프레시</ChildDiv>
                <ChildDiv onClick={() => clickHandler('SSG')}><Img src={ssg} />SSG</ChildDiv>
                <ChildDiv onClick={() => clickHandler('B마트')}><Img src={bmart} />B마트</ChildDiv>
                <ChildDiv onClick={() => clickHandler('윙잇')}><Img src={wingit} />윙잇</ChildDiv>
                <ChildDiv onClick={() => clickHandler('쿠캣마켓')}><Img src={cookat} />쿠캣마켓</ChildDiv>
                <ChildDiv onClick={() => clickHandler('네이버스토어')}><Img src={naverstore} />네이버스토어</ChildDiv>
                <ChildDiv onClick={() => clickHandler('편의점')}><Img src={market} />편의점</ChildDiv>
            </MarketContainer>
        </Container>

    )
}

export default Main
const Alert = styled.div`
    
`
const Fadein = styled.div`
    animation: fadein 0.5s;
    -webkit-animation: fadein 0.5s;
    @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes fadein { 
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`
const Container = styled(Fadein)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`
const MarketContainer = styled(Fadein)`
    display: grid;
    width: 55%;
    margin-top: 70px;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: repeat(2,1fr);
    grid-gap: 10px;
    @media (max-width: 1400px) {
    width: 70%;
    }
`

const ChildDiv = styled.div`
    border-radius: 30px;
    display: flex;
    background: white;
    flex-direction: column;
    align-items: center;
    transition: 0.3s;
    :hover{
        transform: scale(1.05);
        cursor: pointer;
    }
`
const Img = styled.img`
    width: 100%;
    height: 90%;
    object-fit: contain;
    border-radius: 30px;
`