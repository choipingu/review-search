import React, { useState } from 'react'
import styled from 'styled-components'
import { BiSearchAlt2 } from 'react-icons/bi'
import { useAppDispatch } from '../store/hooks'
import { setSearchValue } from '../feature/info'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [value, setValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const submit = async () => {
    dispatch(setSearchValue(value))
    navigate('/review')
  }
  const handleKey = (e: { key: string }) => {
    if (e.key === 'Enter') {
      submit()
    }
  }
  const changeValue = (e: { target: { value: React.SetStateAction<string> } }) => {
    setValue(e.target.value)
  }
  return (
    <Container>
      <SearchTag>
        <BiSearchAlt2 color='gray' />
        <SearchInput
          type='text'
          value={value || ''}
          onKeyUp={handleKey}
          onChange={changeValue}
          placeholder='검색어를 입력해주세요'
        />
        <DeleteButton onClick={() => {
          setValue('')
        }}>&times;</DeleteButton>
      </SearchTag>
    </Container>
  );
}
export default Search;

const Container = styled.div`
  max-width: 700px;
  margin: auto;
`


const SearchTag = styled.div`
  display: flex;
  box-shadow: 0 1px 1px 1px #dadada;
  padding: 10px;
  border-radius: 20px;
  background-color: white;
  flex-direction: row;
  border: 1px solid whitesmoke;
  z-index: 4;
  &:hover{
    background-color: whitesmoke;
  }
  &:focus-within{
    background-color:  whitesmoke;
  }
  `

const SearchInput = styled.input`
  caret-color: black;
  flex: 1 0 0;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  outline: none;
  padding-left: 10px;
  font-size: 16px;
`

const DeleteButton = styled.div`
  cursor: pointer;
`


