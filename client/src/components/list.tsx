import { useState } from "react";
import styled from "styled-components";
import Detail from '../components/detail'
import { AiFillHeart, AiOutlineLike } from 'react-icons/ai'
import { BsCircleFill, BsQuestionLg, BsEye } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { FaRegCommentAlt } from 'react-icons/fa'
import { BiBookmark } from 'react-icons/bi'

function List({ data }: any) {
    const notImage = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openModalHandler = (): void => {
        setIsOpen(!isOpen);
        document.body.style.overflow = "unset"
    };
    const satisChange = () => {
        switch (data.satisfaction) {
            case 'bad':
                return (<Satis><GrClose />별로예요</Satis>)
            case 'good':
                return (<Satis style={{ color: '#F3C73C' }}><BsCircleFill />괜찮아요</Satis>)
            case 'best':
                return (<Satis style={{ color: 'red' }}><AiFillHeart />최고예요</Satis>)
            case 'question':
                return (<Satis><BsQuestionLg />궁금해요</Satis>)
            default:
                return (<></>)
        }
    }

    const imageData = data.images.slice(0, 2).map((el: { image: string | undefined; }, idx: number) => {
        return (<ImgList key={idx} src={el.image} />)
    })
    const imageDataList = data.images.map((el: { image: string | undefined; }) => el.image)
    return (
        <Container onClick={openModalHandler}>
            <ImgWrap>
                <Img src={data.author.profileImage ? data.author.profileImage : notImage} alt='' />
            </ImgWrap>
            <SubContainer>
                <Author>
                    <NicknameText>{data.author.nickname}</NicknameText>
                </Author>
                <ContentWrap>
                    {satisChange()}
                </ContentWrap>
                <Content>{data.content ? data.content : ''}</Content>
                <InfoWrap onClick={(e) => e.stopPropagation()}>
                    <BsEye />{data.viewCount}
                    <FaRegCommentAlt />{data.commentCount}
                    <AiOutlineLike />{data.likeCount}
                    <BiBookmark />{data.bookmarkCount}
                </InfoWrap>
            </SubContainer>
            <ImgListWrap>
                {data.images[0] ? imageData : <ImgList src={notImage} />}
            </ImgListWrap>
            {isOpen && <Detail satisChange={satisChange} openModalHandler={openModalHandler} data={data} imageDataList={imageDataList} />}
        </Container>
    );
}

export default List;


const Container = styled.div`
    display: flex;
    height: 20%;
    border-radius: 10px;
    align-items: flex-start;
    margin-bottom: 5px;
    transition: 0.3s;
    background-color: white;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.07);
    &:hover{
        cursor: pointer;
    }
`
const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 43%;
    height: 100%;
    border-radius: 10px;
`
const ImgWrap = styled.div`
    height: 6vmin;
    width: 6vmin;
`
const Img = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 50%;
`
const Author = styled.div`
    padding: 4px;
    display: flex;
`

const NicknameText = styled.div`
    font-size: 2vmin;
    font-weight: 500;
`
const ParentWrap = styled.div`
    display: flex;
    background: #f1f1f1;
    width: 95%;
`
const Parent = styled.button`
    all: unset;
    margin-left: 5px;
    padding: 3px;
    border-radius: 2px;
    font-size: 2vmin;
    color: #14141499;
    height: 2vh;
    width: 95%;
    overflow: hidden;
    :hover{
        cursor: pointer;
    }
    :active{
        background:white;
    }
`
const ContentWrap = styled.div`
    gap: 5px;
    display: flex;
    flex-direction: column;
`
const Content = styled.div`
    margin-left: 5px;
    margin-bottom: 8px;
    font-size: 1.9vmin;
    opacity: 0.5;
    width: 95%;
    height: 12vh;
    margin-top: 5px;
    overflow: hidden;
`
const Satis = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: 5px;
    font-weight: bold;
    font-size: 2.2vmin;
`
const InfoWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin-left: 5px;
    width: 95%;
    margin-bottom: 5px;
    :hover{
        cursor: default;
    }
`
const ImgListWrap = styled.div`
    display: flex;
    width: 51%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`
const ImgList = styled.img`
    margin: 10px;
    border-radius: 10px;
    width: 20vmin;
    height: 20vmin;
    border: 1px solid gray;
`