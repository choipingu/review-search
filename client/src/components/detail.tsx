import styled from "styled-components";
import Slide from "./slide";
import { AiOutlineLike } from 'react-icons/ai'
import { BsEye } from 'react-icons/bs'
import { FaRegCommentAlt } from 'react-icons/fa'
import { BiBookmark } from 'react-icons/bi'

interface modalType {
    openModalHandler: React.MouseEventHandler<HTMLDivElement>
    data: any
    imageDataList: string[]
    satisChange: any
}

function Detail({ openModalHandler, data, imageDataList, satisChange }: modalType) {
    document.body.style.overflow = "hidden";
    const notImage = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'

    return (
        <Background onClick={openModalHandler}>
            <Container onClick={(e) => e.stopPropagation()}>
                <SubContainer>
                    <UserWrap>
                        <ProfileImgWrap>
                            <ProfileImg src={data.author.profileImage ? data.author.profileImage : notImage} alt='' />
                        </ProfileImgWrap>
                        <Author>
                            <NicknameText>{data.author.nickname}</NicknameText>
                        </Author>
                    </UserWrap>
                    <Slide imageDataList={imageDataList} />
                    <ContentWrap>
                        <SatisWrap>{satisChange()}</SatisWrap>
                        {data.parent ? <Parent onClick={(e) => e.stopPropagation()}>{data.parent.content}&nbsp;&gt;</Parent> : <div></div>}
                    </ContentWrap>
                    <Content onClick={(e) => e.stopPropagation()}>{data.content}</Content>
                </SubContainer>
                <InfoWrap onClick={(e) => e.stopPropagation()}>
                    <BsEye />{data.viewCount}
                    <FaRegCommentAlt />{data.commentCount}
                    <AiOutlineLike />{data.likeCount}
                    <BiBookmark />{data.bookmarkCount}
                </InfoWrap>
            </Container>
        </Background>
    )
}

export default Detail;
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
const Background = styled(Fadein)`
    display: ${(isOpen) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    background-color: rgba(102, 100, 100, 0.4 );
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: default;
  `;
const Container = styled(Fadein)`
    padding: 15px;
    width: 600px;
    height: 90vh;
    background-color: white;
    border-radius: 10px;
    border: 1px solid;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;
const SubContainer = styled.div`

`
const ProfileImgWrap = styled.div`
    height: 6vmin;
    width: 6vmin;

`
const ProfileImg = styled.img`
    width: 100%;
    border-radius: 50%;
`
const Author = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;

`
const NicknameText = styled.div`
    font-weight: bold;
    font-size: 2.6vmin;
`
const AuthorTag = styled.div`
    opacity: 0.5;
    font-size: 1.9vmin;
`
const ContentWrap = styled.div`
    
`
const Parent = styled.div`

`
const Content = styled.div`
    height: 30vmin;
    border-top: 1px solid #dadada;
    padding-top: 5px;
`
const InfoWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const UserWrap = styled.div`
    display: flex;
    padding-bottom: 5px;
`
const SatisWrap = styled.div`
    height: 5vmin;
    display: flex;
`