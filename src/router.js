import VueRouter from 'vue-router'

import ImageUploadPage from './pages/ImageUploadPage';
import CongratsPage from './pages/CongratsPage';

const routes = [
    { path: '/', component: ImageUploadPage },
    { path: '/congrats', component: CongratsPage }
]

export default new VueRouter({
    routes
}) 