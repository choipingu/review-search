import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
interface imageType {
    imageDataList: string[]
}
interface styleType {
    transform: string
    transition: string
}
function Slide({ imageDataList }: imageType) {
    const ref = useRef<HTMLDivElement>(null);
    const [curIndex, setCurIndex] = useState<number>(1);
    const [imageList, setImageList] = useState<string[]>([
        imageDataList[imageDataList?.length - 1],
        ...imageDataList,
        imageDataList[0],
    ]);
    const notImage = 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'

    const [style, setStyle] = useState<styleType>({
        transform: `translateX(-${curIndex}00%)`,
        transition: `all 0.4s ease-in-out`,
    });

    const nextSlide = (): void => {
        setCurIndex(curIndex + 1);
        setStyle({
            transform: `translateX(-${curIndex + 1}00%)`,
            transition: `all 0.4s ease-in-out`,
        });
    };

    const prevSlide = (): void => {
        setCurIndex(curIndex - 1);
        setStyle({
            transform: `translateX(-${curIndex - 1}00%)`,
            transition: `all 0.4s ease-in-out`,
        });
    };

    useEffect((): void => {
        if (curIndex === 0) {
            setCurIndex(imageList.length - 2);
            setTimeout(function () {
                setStyle({
                    transform: `translateX(-${imageList.length - 2}00%)`,
                    transition: '0s',
                });
            }, 500);
        }
        if (curIndex >= imageList?.length - 1) {
            setCurIndex(1);
            setTimeout(() => {
                setStyle({
                    transform: `translateX(-${1}00%)`,
                    transition: '0ms',
                });
            }, 500);
        }
    }, [curIndex, imageList.length]);

    useEffect((): void => {
        setStyle({
            transform: `translateX(-${1}00%)`,
            transition: '0s',
        });
    }, [imageList]);
    return (
        <Container>
            {imageDataList.length === 0 ?
                <SubContainer><ImgTag src={notImage} /></SubContainer>
                :
                <>
                    <SubContainer>
                        <RefTag ref={ref} style={style}>
                            {imageList?.map((el, i) => {
                                return (<ImgTag key={i} src={el} />);
                            })}
                        </RefTag>
                    </SubContainer>
                    <ButtonWrap>
                        <Button onClick={prevSlide}>
                            <IoIosArrowDropleftCircle className="icon" />
                        </Button>
                        <Button onClick={nextSlide}>
                            <IoIosArrowDroprightCircle className="icon" />
                        </Button>
                    </ButtonWrap>
                </>
            }
        </Container>
    )
}

export default Slide

const Container = styled.div`
    position: relative;
    display: flex;

`
const SubContainer = styled.div`
    overflow: hidden;

`
const RefTag = styled.div`
    display: flex;
`
const ImgTag = styled.img`
    min-width: 600px;
    max-height: 60vmin;
    object-fit: contain;
`
const ButtonWrap = styled.div`
    position: absolute;
    top:50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const Button = styled.button`
    all: unset;
    .icon{
        font-size: 35px;
        color: white;
        mix-blend-mode: difference;
    }
`
