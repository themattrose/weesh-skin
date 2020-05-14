import React from 'react'
import styled, { css } from 'styled-components'
import IconButton from 'Root/components/global/IconButton'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import useHistory from 'Root/hooks/useHistory'
import { AuthContext } from 'Root/contexts/auth'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledFooterContainer = styled.div`
    ${C.styles.flex.flexColumn};
`

const StyledFooter = styled.div`
    margin: .25rem;
    color: ${({ theme }) => theme.colors.dark};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStretch};
    ${C.styles.flex.justifyContentBetween};
`

const StyledComments = styled(Link)`
    text-decoration: none;
    color: ${({theme}) => theme.colors.dark};
    padding: 0 1rem 1rem;
    font-size: .85rem;
`

const StyledButtonContainer = styled.span`
    padding: .5rem .5rem ;
`

const StyledNumbers = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    margin: 0 .75rem 0 0;
`

const StyledNumberContainer = styled.span`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    ${({ margin }) => margin && css`
        margin: ${margin};
    `};
`

const StyledButtons = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledNumber = styled.span`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    font-size: .75rem;
    margin: 0 0 0 .1rem;
`

export default (props) => {
    const { auth } = React.useContext(AuthContext)
    const [isLiked, setIsLiked] = React.useState(props.isLiked)
    const [isBookmarked, setIsBookmarked] = React.useState(props.isBookmarked)
    const history = useHistory()

    const [likeWeesh, likeWeeshResult] = useMutation(api.weeshLikes.like,{
        variables: {
            weeshId: `${props.id}`
        }
    })
    const [dislikeWeesh, dislikeWeeshResult] = useMutation(api.weeshLikes.dislike,{
        variables: {
            weeshId: `${props.id}`
        }
    })

    const [addToBookmark, addToBookmarkResult] = useMutation(api.weeshBookmarks.add,{
        variables: {
            weeshId: `${props.id}`
        }
    })
    const [removeFromBookmark, removeFromBookmarkResult] = useMutation(api.weeshBookmarks.remove,{
        variables: {
            weeshId: `${props.id}`
        }
    })

    const buttons = [
        {
            icon: 'Bookmark',
            fill: () => isBookmarked ? 'foreground' : undefined,
            color: () => isBookmarked ? 'foreground' : 'foreground',
            handleClick: (props) => {
                if (!auth.token) {
                    return history.push('/login')
                }
                if (isBookmarked) {
                    removeFromBookmark()
                } else {
                    addToBookmark()
                }
                setIsBookmarked(isBookmarked ? false : true)
            },
        },
        {
            icon: 'MessageCircle',
            fill: () => undefined,
            color: () => 'foreground',
            handleClick: () => {
                history.push(`/w/${props.link}`)
            }
        },
        {
            icon: 'Heart',
            fill: () => isLiked ? 'red' : undefined,
            color: () => isLiked ? 'red' : 'foreground',
            handleClick: (props) => {
                if (!auth.token) {
                    return history.push('/login')
                }
                if(isLiked) {
                    dislikeWeesh()
                } else {
                    likeWeesh()
                }
                setIsLiked(isLiked ? false : true)
            }
        },
    ]

    const numbers = [
        {
            number: props.like && props.like.paginate.totalDocs,
            icon: 'Heart',
        },
        {
            number: props.commentsCounter,
            icon: 'MessageCircle',
        },
    ]
    return <StyledFooterContainer>
        <StyledFooter>
            <StyledButtons>
                {buttons.map(item => (<StyledButtonContainer key={uuid()}>
                    <IconButton icon={item.icon}
                        onClick={() => item.handleClick(props)}
                        fill={item.fill()}
                        color={item.color()}
                        size={24} strokeWidth={1.5} />
                </StyledButtonContainer>))}
            </StyledButtons>
            <StyledNumbers>
                {numbers.map(item => (item.number > 0 && <StyledNumberContainer key={uuid()} margin='0 0 0 .75rem'>
                    <Icon icon={item.icon} size={12} fill='dark' color='dark' />
                    <StyledNumber>{item.number}</StyledNumber>
                </StyledNumberContainer>))}
            </StyledNumbers>
        </StyledFooter>
        {props.comment && props.commentsCounter > 0 && <StyledComments to={`/w/${props.link}`}>
            View all {props.commentsCounter} comments
        </StyledComments>}
    </StyledFooterContainer>
}