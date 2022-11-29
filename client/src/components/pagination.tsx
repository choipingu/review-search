import styled from "styled-components";

interface pageType {
  total: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
}


function Pagination({ total, setPage, page }: pageType) {
  const pageNum = []
  const maxPage = Math.ceil(total / 5)
  const topScroll = {
    top: 0,
    behavior: "smooth"
  } as const
  for (let i = 1; i <= maxPage; i++) {
    pageNum.push(i);
  }
  const firstBtnHandler = (): void => {
    window.scrollTo(topScroll);
    setPage(page - 1)
  }
  const lastBtnHandler = (): void => {
    window.scrollTo(topScroll);
    setPage(page + 1)
  }
  return (
    <Container>
      <FirstButton onClick={firstBtnHandler} curPage={page} disabled={page === 1}>
        &lt;
      </FirstButton>
      {pageNum.map((el, idx) => (
        <Button
          key={idx + 1}
          onClick={() => {
            window.scrollTo(topScroll);
            setPage(idx + 1)
          }}
          aria-current={page === idx + 1 && "page"}
        >
          {idx + 1}
        </Button>
      ))}
      {pageNum.length !== 0 ?
        <LastButton onClick={lastBtnHandler} curPage={page} maxPage={maxPage} disabled={page === maxPage}>
          &gt;
        </LastButton>
        :
        <div></div>
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 1.3vmin 2vmin;
  margin: 6px;
  border: 1px solid gray;
  border-radius: 50%;
  background: white;
  color: black;
  font-size: 3vmin;
  transition: 0.2s;
  :hover {
    cursor: pointer;
    transform: translateY(-4px);
    background: whitesmoke;
  } 

  &[aria-current='page'] {
    color: white;
    background: #FF4461;
    font-weight: bold;
  }
  
`;

const FirstButton = styled(Button) <{ curPage: number }>`
  visibility: ${(props) => props.curPage === 1 ? 'hidden' : 'visible'};
  transition: ${(props) => props.curPage === 1 ? '0s' : '0.2s'};
`
const LastButton = styled(Button) <{ curPage: number, maxPage: number }>`
  visibility: ${(props) => props.curPage === props.maxPage ? 'hidden' : 'visible'};
  transition: ${(props) => props.curPage === props.maxPage ? '0s' : '0.2s'};
  
`
export default Pagination;