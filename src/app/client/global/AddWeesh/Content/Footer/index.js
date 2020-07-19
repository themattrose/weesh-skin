import React from 'react'
import styled, { css } from 'styled-components'
import Button from 'Root/components/global/Button'
import Icon from 'Root/components/global/Icon'
import { WeeshContext } from 'Root/contexts/weesh'
import { AuthContext } from 'Root/contexts/auth'
import C from 'Root/constants'
import Dialog, { DialogButton } from 'Root/components/global/Dialog'
import StyledComponents from 'Root/StyledComponents'
import { useMutation } from '@apollo/react-hooks'
import { SnackBarContext } from 'Root/contexts/snackbar'
import api from 'Root/api'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsEnd};
    ${C.styles.flex.justifyContentBetween};
    padding: 0 1rem;
`

const StyledButtonTitle = styled.span`
    color: ${({ theme }) => theme.colors.background};
    margin: 0 0.5rem 0 0;
    font-weight: bold;
`

const StyledNumbers = styled.div`
    ${C.styles.flex.flexRow};
    ${props =>
        props.characterCount <= props.totalCount
            ? css`
                  color: ${({ theme }) => theme.colors.gray};
              `
            : css`
                  color: ${({ theme }) => theme.colors.red};
              `};
`

const StyledNumber = styled.span`
    color: inherit;
    ${C.styles.flex.inlineFlexRow};
`

const initialDialog = {
    visible: false,
}

export default () => {
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(
        SnackBarContext,
    )
    const { weesh, dispatch } = React.useContext(WeeshContext)
    const { auth } = React.useContext(AuthContext)
    const [dialog, setDialog] = React.useState(initialDialog)

    const [addWeesh, { data, error, loading }] = useMutation(api.weeshes.add)

    const handleAddWeesh = status => {
        toggleDialog(false)
        addWeesh({
            variables: {
                content: weesh.content,
                status,
            },
        })
    }

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (data) {
            const res = data.addWeeshForUser
            dispatch({
                type: 'ADD_WEESH',
                data: {
                    content: '',
                },
            })
            snackbarDispatch({
                type: 'SET_DATA',
                data: {
                    icon: 'PenTool',
                    message: 'Your weesh added successfully.',
                    background: 'foreground',
                    visible: true,
                },
            })
            setTimeout(() => {
                snackbarDispatch({ type: 'HIDE' })
            }, 2 * 1000)
        }
    }, [data])

    const toggleDialog = visible => {
        setDialog(prevState => ({
            ...prevState,
            visible,
        }))
    }

    const shareOptions = [
        {
            title: C.txts.en.addWeesh.public,
            icon: 'Globe',
            status: 3,
        },
        {
            title: C.txts.en.addWeesh.private,
            icon: 'Users',
            status: 2,
        },
        {
            title: C.txts.en.addWeesh.secret,
            icon: 'User',
            status: 1,
        },
    ]

    auth.private && shareOptions.splice(0, 1)

    const limitedCharacter = weesh.content.length > 2 ? true : false

    return (
        <StyledContainer>
            <Dialog
                width='19rem'
                padding='.5rem'
                contentPosition='top'
                {...dialog}
                toggleDialogFunction={visible => toggleDialog(visible)}>
                <StyledComponents.Dialog.Header.Container>
                    <StyledComponents.Dialog.Header.Message
                        padding='1rem'
                        fontWeight='bold'>
                        {C.txts.en.addWeesh.shareQuestion}
                    </StyledComponents.Dialog.Header.Message>
                </StyledComponents.Dialog.Header.Container>
                <StyledComponents.Share.Container>
                    {shareOptions.map(item => (
                        <StyledComponents.Share.Item
                            onClick={() => handleAddWeesh(item.status)}>
                            <Icon
                                icon={item.icon}
                                color={auth.color}
                                size={30}
                            />
                            <StyledComponents.Share.ItemTitle>
                                {item.title}
                            </StyledComponents.Share.ItemTitle>
                        </StyledComponents.Share.Item>
                    ))}
                </StyledComponents.Share.Container>
            </Dialog>
            <StyledNumbers {...weesh}>
                <StyledNumber>{weesh.characterCount}</StyledNumber>/
                <StyledNumber>{weesh.totalCount}</StyledNumber>
            </StyledNumbers>
            <Button
                color={limitedCharacter ? 'background' : 'gray'}
                cursor={limitedCharacter ? 'pointer' : 'not-allowed'}
                background={limitedCharacter ? 'primary' : 'lightGray'}
                boxShadow='light'
                disabled={limitedCharacter ? false : true}
                clickEvent={() => toggleDialog(true)}
                isLoading={loading || undefined}
                padding='.5rem 1rem'
                radius='50rem'>
                <StyledButtonTitle>Weesh</StyledButtonTitle>
                <Icon icon='PenTool' color='background' />
            </Button>
        </StyledContainer>
    )
}
