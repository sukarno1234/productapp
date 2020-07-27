
const routes = [
  {
    path: '/',
    component: () => import('pages/todo.vue'),
     
    // component: () => import('layouts/MainLayout.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') }
    // ]
  },
  {
    path: '/product/create',
    component: () => import('pages/product/create.vue'), 
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
