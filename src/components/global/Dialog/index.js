import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import C from 'Root/constants'

const StyledContainer = styled.div`
    ${({ visible }) => !visible ? css`
        display: none;
    `: C.styles.flex.flexRowCenter};
    ${C.styles.position.positionFixedZiro};
    background: rgba(0,0,0,.5);
    z-index: 100;
`
const StyledContent = styled.div`
    overflow: hidden;
    ${C.styles.flex.flexColumnCenter};
    background: ${({ theme }) => theme.colors.background};
    border-radius: .75rem;
    ${({ width }) => width && css`
        width: ${width};
    `};
`

const StyledButton = styled.button`
    width: 100%;
    ${C.styles.flex.flexRowCenter};
    background: ${({theme}) => theme.colors.background};
    font-size: .875rem;
    vertical-align: middle;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
    color: ${({color, theme}) => theme.colors[color || 'foreground']};
    padding: .85rem;
    ${({ fontWeight }) => fontWeight && css`
        font-weight: ${fontWeight};
    `};
    margin: 0;
    cursor: pointer;
`

export default (props) => {
    return <StyledContainer {...props} onClick={(e) => {
            if (e.target == e.currentTarget) {
                props.toggleDialogFunction(false)
            }
        }}>
        <StyledContent {...props}>
            {props.children}
        </StyledContent>
    </StyledContainer>
}

export const DialogButton = (props) => {
    return <StyledButton {...props}>
        {props.children}
    </StyledButton>
}