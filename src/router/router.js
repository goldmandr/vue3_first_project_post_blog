import Main from '@/pages/Main';
import PostPage from '@/pages/PostPage'
import { createRouter, createWebHistory } from 'vue-router';
import About from '@/pages/About'
import PostIdPage from '@/pages/PostIdPage'
import PostPageWithStore from '@/pages/PostPageWithStore'
import PostPageCompositionApi from '@/pages/PostPageCompositionApi'

const routes = [
    {
        path: '/', 
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store-posts',
        component: PostPageWithStore
    },
    {
        path: '/composition-api-posts',
        component: PostPageCompositionApi
    }

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router








