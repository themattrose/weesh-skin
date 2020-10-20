import React from "react"
import styled from "styled-components"
import C from "Root/constants"
import Input from "Root/components/global/Input"
import Textarea from "Root/components/global/Textarea"
import ErrorMessage from "Root/components/global/ErrorMessage"
import { useMutation, useQuery } from "@apollo/react-hooks"
import useHistory from "Root/hooks/useHistory"
import api from "Root/api"
import { AuthContext } from "Root/contexts/auth"
import { SnackBarContext } from "Root/contexts/snackbar"
import Button from "Root/components/global/Button"
import Meta from "Root/meta"

const StyledContainer = styled.div`
    padding: 0 0.75rem 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
`

const StyledForm = styled.form``

const StyledButtonContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
`

const StyledLoaderContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentCenter};
    padding: 1rem;
`

const initialVariables = {
    subject: "",
    message: "",
}

export default props => {
    const { auth } = React.useContext(AuthContext)
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(
        SnackBarContext,
    )
    const [state, setState] = React.useState(initialVariables)
    const [addMessage, addMessageResponse] = useMutation(api.support.addMessage)
    const history = useHistory()

    const handleChange = ({ key, e }) => {
        let value = e.target.value
        setState(prevState => {
            return {
                ...prevState,
                [key]: value,
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (state.message.length > 0) {
            addMessage({
                variables: {
                    recipientId:
                        auth.id == props.sender.id
                            ? props.recipient.id
                            : props.sender.id,
                    ticketId: props.id,
                    message: state.message,
                },
            })
        }
    }

    React.useEffect(() => {
        if (addMessageResponse.data) {
            props.setShowAddMessage(false)
            props.setMessages(prevState => {
                return [
                    addMessageResponse.data.addUserTicketMessageForUser,
                    ...prevState,
                ]
            })
            snackbarDispatch({
                type: "SET_DATA",
                data: {
                    icon: "CheckCircle",
                    message: "Your message added successfully.",
                    background: "foreground",
                    visible: true,
                },
            })
            setTimeout(() => {
                snackbarDispatch({ type: "HIDE" })
            }, 2 * 1000)
        }
    }, [addMessageResponse])

    return (
        <StyledContainer>
            <Meta type="Support" />
            <StyledForm onSubmit={e => handleSubmit(e)}>
                <Textarea
                    label="Message"
                    padding=".65rem"
                    value={state.message}
                    onChange={e => handleChange({ key: "message", e })}
                    width={100}
                    rows="10"
                    margin="1rem 0 0"
                />
                <StyledButtonContainer>
                    {state.message.length > 0 ? (
                        <Button
                            padding=".65rem 1.5rem"
                            background="primary"
                            color="background"
                            radius="5rem"
                            margin=".75rem 0 0"
                            fontWeight="bold"
                            isLoading={addMessageResponse.loading || undefined}>
                            Submit
                        </Button>
                    ) : (
                        <Button
                            cursor="not-allowed"
                            padding=".65rem 1.5rem"
                            background="lightGray"
                            color="gray"
                            radius="5rem"
                            margin=".75rem 0 0"
                            fontWeight="bold">
                            Submit
                        </Button>
                    )}
                </StyledButtonContainer>
            </StyledForm>
        </StyledContainer>
    )
}
