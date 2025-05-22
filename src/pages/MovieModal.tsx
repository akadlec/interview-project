import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MovieInfo from '../components/MovieInfo'

const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`

const ModalContent = styled.div`
    background: #2b2b2b;
    color: #fff;
    max-width: 900px;
    width: 95%;
    padding: 30px;
    border-radius: 12px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
`

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 24px;
    color: #aaa;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
        color: #fff;
    }
`

export default function MovieModal() {
    const navigate = useNavigate()

    const close = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        e?.preventDefault()
        navigate(-1)
    }

    return (
        <ModalOverlay onClick={close}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={close} aria-label="Close">×</CloseButton>
                <MovieInfo />
            </ModalContent>
        </ModalOverlay>
    )
}
