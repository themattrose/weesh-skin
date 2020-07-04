import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import uuid from 'uuid'
import List from 'Root/components/mobile/List'
import Loader from 'Root/components/global/Loader'
import SliderTab from 'Root/components/global/SliderTab'
import C from 'Root/constants'
import {useQuery} from '@apollo/react-hooks'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    padding: 0 0 3.5rem;
`

const StyledLoaderContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentCenter};
    padding: 1rem;
`

const switchStatus = status => {
    switch (status) {
        case 'followers':
            return {
                index: 'follower',
                api: 'getFollowers',
                data: 'getFollowersUserConnectionByUsernameForUser',
            }
        case 'following':
            return {
                index: 'following',
                api: 'getFollowing',
                data: 'getFollowingUserConnectionByUsernameForUser',
            }
    }
}

export default props => {
    let url = props.match.url.split('/')
    const [state, setState] = React.useState(null)
    const history = useHistory()
    const [status, setStatus] = React.useState(url[url.length - 1])
    const {data, called, error, loading} = useQuery(
        api.connections[switchStatus(status).api],
        {
            variables: {
                username: `${props.match.params.username}`,
            },
            fetchPolicy: 'no-cache',
        },
    )

    React.useEffect(() => {
        if (error) {
            console.log(error)
        }

        if (called && data) {
            const result = data[switchStatus(status).data].userConnections
            setState(result)
        }
    }, [data, error])

    const tabs = [
        {
            id: uuid(),
            title: 'Following',
            value: true,
            status: 'following',
        },
        {
            id: uuid(),
            title: 'Followers',
            value: false,
            status: 'followers',
        },
    ]

    return (
        <StyledContainer>
            <Meta />
            {loading ? (
                <StyledLoaderContainer>
                    <Loader size={20} strokeWidth={1.25} color='gray' />
                </StyledLoaderContainer>
            ) : (
                state && (
                    <List index={switchStatus(status).index} users={state} />
                )
            )}
        </StyledContainer>
    )
}
