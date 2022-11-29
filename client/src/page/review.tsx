import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useAppSelector } from '../store/hooks'
import { RootState } from '../store'
import Loader from '../components/loader'
import Pagination from '../components/pagination'
import List from '../components/list'
import SearchBar from '../components/searchBar'
import UserList from '../components/userlist'
import { TbFaceIdError } from 'react-icons/tb'
import { useParams } from 'react-router-dom'

function Review() {
    const [data, setData] = useState<string[]>([])
    const [nickData, setNickData] = useState<[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [whichPage, setWhichPage] = useState<string>('review')
    const [error, setError] = useState<boolean>(false);
    const isAccessToken = useAppSelector((state: RootState) => state.info.accessToken)
    const isSearchValue = useAppSelector((state: RootState) => state.info.SearchValue)
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    const params = useParams()
    const pageSet = (page - 1) * 5
    const pageSetNick = (page - 1) * 10
    const dataList = data.slice(pageSet, pageSet + 5).map((el: any, idx: number) => {
        return (<List key={idx} data={el} />)
    })
    const nickList = nickData.slice(pageSetNick, pageSetNick + 10).map((el: any, idx: number) => {
        return (<UserList key={idx} data={el} />)
    })
    useEffect(() => {
        const dataFetch = async () => {
            try {
                if (isAccessToken) {
                    if (isSearchValue) {
                        setLoading(true)
                        const nickRes = await axios.get(`${process.env.REACT_APP_URL}/account/search/${isSearchValue}`, config)
                        const KeyRes = await axios.get(`${process.env.REACT_APP_URL}/review/search/${isSearchValue}`, config)
                        console.log(KeyRes.data)
                        setData(KeyRes.data)
                        setNickData(nickRes.data)
                        setLoading(false)
                    } else {
                        setLoading(true)
                        const res = await axios.get(`${process.env.REACT_APP_URL}/review/search/${params.id}`, config)
                        setData(res.data)
                        setLoading(false)
                        setError(false)
                    }
                }
            } catch (e) {
                setLoading(false)
                setError(true)
                console.log(e)
            }
        }
        dataFetch()
    }, [isAccessToken, isSearchValue])
    return (
        <Container>
            {isSearchValue && <SearchBar setWhichPage={setWhichPage} whichPage={whichPage} />}
            {whichPage === 'review' ?
                <>
                    <ListWrap isSearchValue={isSearchValue}>
                        {loading ? <Loader type="spin" color="#999999" /> : dataList.length !== 0 ? dataList : <NotData><TbFaceIdError className='icon' />검색 결과가 없습니다.</NotData>}
                        {error && <SpanTag>데이터를 불러오지 못했습니다.</SpanTag>}
                    </ListWrap>
                    <PaginationWrap>
                        <Pagination
                            total={data.length}
                            page={page}
                            setPage={setPage}
                        />
                    </PaginationWrap>
                </>
                :
                <>
                    <UserWrap isSearchValue={isSearchValue}>
                        {loading ? <Loader type="spin" color="#999999" /> : nickList.length !== 0 ? nickList : <NotData><TbFaceIdError className='icon' />검색 결과가 없습니다.</NotData>}
                        {error && <SpanTag>데이터를 불러오지 못했습니다.</SpanTag>}
                    </UserWrap>
                    <PaginationWrap>
                        <Pagination
                            total={nickData.length}
                            page={page}
                            setPage={setPage}
                        />
                    </PaginationWrap>
                </>

            }

        </Container>
    )
}

export default Review


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
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
`
const ListWrap = styled(Fadein) <{ isSearchValue: string }>`
    margin-top: ${(props) => props.isSearchValue ? '0px' : '70px'};
    display: flex;
    width: 55%;
    height: 100%;
    flex-direction: column;
    @media (max-width: 1400px) {
    width: 70%;
    }
`
const UserWrap = styled(Fadein) <{ isSearchValue: string }>`
    margin-top: ${(props) => props.isSearchValue ? '0px' : '70px'};
    display: flex;
    width: 55%;
    height: 100%;
    flex-direction: column;
    @media (max-width: 1400px) {
    width: 70%;
    }
`

const PaginationWrap = styled(Fadein)`
    display: flex;
    height: 10%;
    width: auto;
`
const SpanTag = styled.span`
  font-size: 24px;
  color: red;
  margin-top: 10px;
`;
const NotData = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    margin-top: 100px;
    .icon{
        font-size: 100px;
    }
`