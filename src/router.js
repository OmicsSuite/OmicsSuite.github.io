import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
    { path: '/documents', name: 'documents', component: () => import('./views/DocumentsView.vue') },
    { path: '/download', name: 'download', component: () => import('./views/DownloadView.vue') },
    { path: '/publication', name: 'publication', component: () => import('./views/PublicationView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
