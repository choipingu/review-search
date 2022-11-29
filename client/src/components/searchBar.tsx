import styled from 'styled-components'


interface SearchType {
    setWhichPage: React.Dispatch<React.SetStateAction<string>>
    whichPage: string
}


function SearchBar({ setWhichPage, whichPage }: SearchType) {
    const clickHandler = (e: any): void => {
        setWhichPage(e.target.id)
    }
    return (
        <Container>
            <ChooseWrap whichPage={whichPage}>
                <ReviewChoose whichPage={whichPage} id='review' onClick={clickHandler}>리뷰</ReviewChoose>
                <UserChoose whichPage={whichPage} id='user' onClick={clickHandler}>유저</UserChoose>
            </ChooseWrap>
        </Container>
    )
}

export default SearchBar


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
const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`

const ChooseWrap = styled(Fadein) <{ whichPage: string }>`
    margin-top: 70px;
    height: auto;
    width: 55%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
    ::after {
        transition: 0.4s;
        content: "";
        position: absolute;
        bottom: 0;
        left: ${(props) => props.whichPage === 'review' ? '0' : '50%'};
        width: 50%;
        border-bottom: 2px solid black;
    }
    @media (max-width: 1400px) {
    width: 70%;
    }
`
const DivChoose = styled.div<{ whichPage: string }>`
    background: white;
    width: 50%;
    font-size: 2.8vmin;
    text-align: center;
    transition: 0.3s;
    :hover{
        cursor: pointer;
        background: #dadada;
    }

`
const ReviewChoose = styled(DivChoose)`
    border-radius: 10px 0px 0px 0px;
`
const UserChoose = styled(DivChoose)`
    border-radius: 0px 10px 0px 0px;
`