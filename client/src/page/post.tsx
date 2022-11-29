import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { RootState } from "../store";
import { useAppSelector } from "../store/hooks";

function Post() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [satisfaction, setSatisfaction] = useState<string>('null');
    const [market, setMarket] = useState<string>('');
    const isLoginId = useAppSelector((state: RootState) => state.info.userId)
    const [img, setImg] = useState<any>([]);
    const [previewImg, setPreviewImg] = useState<any>([]);
    const notImage = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
    const navigate = useNavigate()
    const loginData = {
        "title": title,
        "content": content,
        "satisfaction": satisfaction,
        "user": isLoginId,
        "market": market,
    }

    console.log('id', isLoginId)
    const insertImg = (e: any) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            setImg([...img, e.target.files[0]])
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result
            if (previewImgUrl) {
                setPreviewImg([...previewImg, previewImgUrl])
            }
        }
    }
    const getPreviewImg = () => {
        if (img === null || img.length === 0) {
            return (
                <ImgAreaContainer>
                    <ImgArea>
                        <ImgTag
                            src={notImage}
                            alt="img" />
                    </ImgArea>
                    <ImgName>등록된 이미지가 없습니다.</ImgName>
                </ImgAreaContainer>
            )
        } else {
            return img.map((el: any, index: number) => {
                const { name } = el
                return (
                    <ImgAreaContainer key={index}>
                        <ImgArea>
                            <ImgTag src={previewImg[index]} />
                        </ImgArea>
                        <ImgName>{name}</ImgName>
                        <DelBtn onClick={() => deleteImg(index)}>❌</DelBtn>
                    </ImgAreaContainer>
                )
            })
        }
    }
    const satis = [
        { id: 'null', value: '평가를 선택하세요' },
        { id: 'best', value: '최고예요' },
        { id: 'good', value: '괜찮아요' },
        { id: 'bad', value: '별로예요' },
        { id: 'question', value: '궁금해요' },
    ];
    const mart = [
        { id: 'null', value: '마트를 선택하세요' },
        { id: '마켓컬리', value: '마켓컬리' },
        { id: '쿠팡프레시', value: '쿠팡프레시' },
        { id: '윙잇', value: '윙잇' },
        { id: '쿠캣마켓', value: '쿠캣마켓' },
        { id: '편의점', value: '편의점' },
        { id: '네이버스토어', value: '네이버스토어' },
        { id: 'B마트', value: 'B마트' },
        { id: 'SSG', value: 'SSG' },
    ];
    const satisDropDown = (e: any) => {
        const { value } = e.target;
        setSatisfaction(satis.filter(el => el.value === value)[0].id);
    }
    const marketDropDown = (e: any) => {
        const { value } = e.target;
        setMarket(mart.filter(el => el.value === value)[0].id);
    }
    const deleteImg = (index: number) => {
        const imgArr = img.filter((el: any, idx: number) => idx !== index)
        const imgNameArr = previewImg.filter((el: any, idx: number) => idx !== index)

        setImg([...imgArr])
        setPreviewImg([...imgNameArr])
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', title);
            formData.append('content', content);
            formData.append('satisfaction', satisfaction);
            formData.append('user', isLoginId);
            formData.append('market', market);
            img.map((el: any) => {
                formData.append('image', el)
            })
            if (market !== 'null' && satisfaction !== 'null') {
                const res = await axios.post(`${process.env.REACT_APP_URL}/review/post`, formData, config)
                console.log(res.data)
            }
            else {
                alert('필수입력이 안되었습니다')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <InfoTag>Post</InfoTag>
            <SelectForm>
                <SelectTag onChange={satisDropDown}>
                    {satis.map((el, idx) => {
                        return <option key={idx}>{el.value}</option>;
                    })}
                </SelectTag>
                <SelectTag onChange={marketDropDown}>
                    {mart.map((el, idx) => {
                        return <option key={idx}>{el.value}</option>;
                    })}
                </SelectTag>
            </SelectForm>
            <FormTag onSubmit={handleSubmit}>
                <InputTag type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)} />
                <TextAreaTag placeholder='content' onChange={(e) => setContent(e.target.value)} />
                <ButtonTag type='submit' onClick={handleSubmit}>
                    Posting
                </ButtonTag>
                <label htmlFor='file'>이미지업로드</label>
                <input type="file" id='file' accept='image/*' onChange={(e) => insertImg(e)} />
                <UploadContainer>
                    {getPreviewImg()}
                </UploadContainer>
            </FormTag>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`;
const SelectForm = styled.div`
    display: flex;
    width: 30%;
    justify-content: space-around;
`
const UploadContainer = styled.div`
    display: flex;
`
const ImgAreaContainer = styled.div`
    margin-left: 10px;
`
const ImgArea = styled.div`
`
const ImgName = styled.div`
    display: flex;
    justify-content: center;
`

const DelBtn = styled.div`
    display: flex;
    justify-content: center;
`

const InfoTag = styled.div`
    font-size: 30px;
    margin-bottom: 15px;
`;
const FormTag = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const TextAreaTag = styled.textarea`
    width: 500px;
    height: 200px;
    resize: none;
`
const InputTag = styled.input`
    width: 500px;
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
const SelectTag = styled.select`
    
`
const ImgTag = styled.img`
    width: 250px;
    height: 250px;
`
export default Post