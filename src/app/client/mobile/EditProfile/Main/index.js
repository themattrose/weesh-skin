import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'
import helpers from 'Root/helpers'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import { EditProfileContext } from 'Root/contexts/editProfile'
import api from 'Root/api'
import Input from 'Root/components/global/Input'
import Icon from 'Root/components/global/Icon'
import Toggle from 'Root/components/global/Toggle'
import Textarea from 'Root/components/global/Textarea'
import Button from 'Root/components/global/Button'
import C from 'Root/constants'
import { useMutation } from '@apollo/react-hooks'
import UsernameInput from './UsernameInput'
import EmailInput from './EmailInput'

const StyledMain = styled.div`
     ${C.styles.flex.flexColumn};
     ${C.styles.flex.justifyContentCenter};
    padding: .5rem;
`

const StyledToggles = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.boxShadow.primary.normal};
    margin: .5rem 0 0;
    border-radius: .75rem;
`

const StyledLogoutContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
    ${C.styles.flex.alignItemsCenter};
    padding: 0 0 1rem;
`

const StyledToggleContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsCenter};
    padding: .75rem 1rem;
    &:not(:last-child) {
        border-bottom: 1px dashed ${({theme}) => theme.colors.light};
    }
`

const StyledToggleTitle = styled.span`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    font-size: .85rem;
    margin: 0 0 0 .5rem;
    font-weight: bold;
`

const StyledToggleTitleContainer = styled.span`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledInputGroup = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    width: 100%;
`

const StyledLoader = styled.div`
    ${C.styles.flex.flexRowCenter};
    padding: 2rem 0;
    margin: 0 0 50px;
`

export default (props) => {
    const { editProfile, dispatch: editProfileDispatch } = React.useContext(EditProfileContext)
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)

    const handleChange = ({key, e}) => {
        let variables
        switch (key) {
            case 'private':
                variables = {
                    [key]: e.target.checked
                }
                
                break;
            case 'unknown':
                variables = {
                    [key]: {
                        fullname: e.target.checked
                    }
                }

                break;
            default:
                variables = {
                    [key]: e.target.value
                }
                break;
        }

        editProfileDispatch({ 
            type: 'EDIT_PROFILE', 
            data: variables
        })
    }

    const toggles = [
        {
            title: C.txts.en.editProfile.togglesLabel.unknownPerson,
            icon: 'EyeOff',
            checked: editProfile.unknown.fullname,
            onInput: (e) => handleChange({ key: 'unknown', e })
        },
        {
            title: C.txts.en.editProfile.togglesLabel.privateAccount,
            icon: 'Lock',
            checked: editProfile.private,
            onInput: (e) => handleChange({ key: 'private', e })
        },
        {
            title: C.txts.en.editProfile.togglesLabel.darkMode,
            icon: 'Moon',
            checked: auth.theme == 'dark',
            onInput: (e) => authDispatch({ type: 'TOGGLE_THEME' })
        },
    ]
    
    
    return editProfile ? <StyledMain>
        <StyledLogoutContainer>
            <Button padding='.5rem .75rem' radius='50rem' fontWeight='bold' background='foreground' color='background' to='/logout'>{C.txts.en.editProfile.header.logout}</Button>
        </StyledLogoutContainer>
        <StyledInputGroup>
            <Input label={C.txts.en.editProfile.inputsLabel.firstName} padding='.65rem' value={editProfile.firstName} onInput={(e) => handleChange({ key: 'firstName', e })} margin='0 .5rem 0 0' width={100} placeholder={C.txts.en.editProfile.inputsLabel.firstName} />
            <Input label={C.txts.en.editProfile.inputsLabel.lastName} padding='.65rem' value={editProfile.lastName} onInput={(e) => handleChange({ key: 'lastName', e })} width={100} placeholder={C.txts.en.editProfile.inputsLabel.lastName} />
        </StyledInputGroup>
        <UsernameInput />
        <EmailInput />
        <Textarea value={editProfile.bio} label={C.txts.en.editProfile.inputsLabel.bio} padding='.65rem' onInput={(e) => handleChange({ key: 'bio', e })} margin='.5rem 0 0' width={100} placeholder={C.txts.en.editProfile.inputsLabel.bio} />

        <StyledToggles>
            {toggles.map(toggle => <StyledToggleContainer key={uuid()}>
                <StyledToggleTitleContainer>
                    <Icon icon={toggle.icon} color='foreground' />
                    <StyledToggleTitle>
                        {toggle.title}
                    </StyledToggleTitle>
                </StyledToggleTitleContainer>
                <Toggle checked={toggle.checked || undefined} onInput={(e) => toggle.onInput(e)} />
            </StyledToggleContainer>
            )}
        </StyledToggles>
    </StyledMain> : <></>
}