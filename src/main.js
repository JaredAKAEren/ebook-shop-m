import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    Swipe,
    SwipeItem,
    Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph,
    ConfigProvider,
    Collapse,
    CollapseItem,
    Sidebar,
    SidebarItem,
    Tab,
    Tabs,
    List,
    Form,
    Field,
    CellGroup,
    Cell,
    Button,
    Toast,
    Notify,
    Card,
    ActionBar,
    ActionBarIcon,
    ActionBarButton,
    SubmitBar,
    Checkbox,
    CheckboxGroup,
    Stepper,
    SwipeCell,
    Dialog,
    AddressEdit,
    BackTop,
    AddressList,
    Image as VanImage,
    Icon,
    Popup,
    ShareSheet
} from 'vant'
import './assets/styles/tailwind-base.css'
import 'vant/lib/index.css'
import './assets/styles/tailwind.css'

const app = createApp(App)

app.use(router).use(store)
    .use(Swipe)
    .use(SwipeItem)
    .use(Skeleton)
    .use(SkeletonTitle)
    .use(SkeletonImage)
    .use(SkeletonAvatar)
    .use(SkeletonParagraph)
    .use(ConfigProvider)
    .use(Collapse)
    .use(CollapseItem)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Tab)
    .use(Tabs)
    .use(List)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(Button)
    .use(Toast)
    .use(Notify)
    .use(Card)
    .use(ActionBar)
    .use(ActionBarIcon)
    .use(ActionBarButton)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Stepper)
    .use(SwipeCell)
    .use(Dialog)
    .use(AddressEdit)
    .use(BackTop)
    .use(AddressList)
    .use(VanImage)
    .use(Icon)
    .use(Popup)
    .use(ShareSheet)

router.beforeEach(to => {
    if (to.meta.requireAuth) {
        if (!store.getters.isLogin) {
            return {
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            }
        }
    }
    document.title = `ebook 图书 - ${to.meta.title}`
})

app.mount('#app')
