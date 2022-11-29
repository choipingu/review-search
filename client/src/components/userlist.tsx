import styled from "styled-components"
interface dataType {
    data: {
        profileImage: string
        nickname: string
    }
}

function UserList({ data }: dataType) {
    const notImage = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
    return (
        <Container>
            <SubContainer>
                <ImgWrap>
                    <Img src={data.profileImage ? data.profileImage : notImage} />
                </ImgWrap>
                <NicknameText>{data.nickname}</NicknameText>
            </SubContainer>
        </Container>
    )
}

export default UserList

const Container = styled.div`
    display: flex;
    height: 20%;
    border-radius: 10px;
    align-items: flex-start;
    margin-bottom: 5px;
    transition: 0.3s;
    background-color: white;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.07);
    :hover{
        cursor: pointer;
    }
`
const SubContainer = styled.div`
    display: flex;
    align-items: center;
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

const NicknameText = styled.div`
    font-size: 2vmin;
    font-weight: bold;
    margin-left: 10px;
`
