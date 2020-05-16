import Home from './Home'
import Login from './Auth/Login'
import Join from './Auth/Join'
import Logout from 'Root/components/global/Logout'
import About from './About'
import Explore from './Explore'
import Notifications from './Notifications'
import UserProfile from './UserProfile'
import TagPage from './TagPage'
import BookmarkPage from './BookmarkPage'
import ConnectionsPage from './ConnectionsPage'
import RequestsPage from './RequestsPage'
import ChangePassword from './ChangePassword'
import Support from './Support'
import WeeshPage from './WeeshPage'
import AddWeesh from './AddWeesh'
import EditProfile from './EditProfile'
import NotFound from 'Root/components/global/NotFound'

const routes = [
    {
        exact: true,
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/join',
        component: Join,
    },
    {
        path: '/logout',
        component: Logout,
    },
    {
        path: '/about',
        component: About,
    },
    {
        private: true,
        path: '/explore',
        component: Explore,
    },
    {
        private: true,
        path: '/notifications',
        component: Notifications,
    },
    {
        private: true,
        path: '/compose/weesh',
        component: AddWeesh,
    },
    {
        private: true,
        path: '/settings/profile',
        component: EditProfile,
    },
    {
        private: true,
        path: '/settings/changePassword',
        component: ChangePassword,
    },
    {
        private: true,
        path: '/support',
        component: Support,
    },
    {
        private: true,
        exact: true,
        path: '/:username',
        component: UserProfile,
    },
    {
        private: true,
        exact: true,
        path: '/t/:tagTitle',
        component: TagPage,
    },
    {
        private: true,
        exact: true,
        path: '/:username/bookmarks',
        component: BookmarkPage,
    },
    {
        private: true,
        exact: true,
        path: '/:username/followers',
        component: ConnectionsPage,
    },
    {
        private: true,
        exact: true,
        path: '/:username/following',
        component: ConnectionsPage,
    },
    {
        private: true,
        exact: true,
        path: '/:username/requests',
        component: RequestsPage,
    },
    {
        private: true,
        exact: true,
        path: '/w/:link',
        component: WeeshPage,
    },
    {
        path: '*',
        component: NotFound,
    },
]

export default routes