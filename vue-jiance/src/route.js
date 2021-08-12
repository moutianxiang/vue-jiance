import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login.vue'
import Home from './components/Home.vue'
import shouye from './components/shouye.vue'
import workflowselect from './components/workflowselect.vue'
import userselect from './components/userselect.vue'
import productadd from './components/productadd.vue'
import productselect from './components/productselect.vue'
import custadd from './components/custadd.vue'
import custselect from './components/custselect.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', 
    component: Home,
    redirect: '/shouye',
    children: [
      {
        path: '/shouye',
        component: shouye
      },
      {
        path: '/workflowselect',
        component: workflowselect
      },
      {
        path: '/userselect',
        component: userselect
      },
      {
        path: '/productadd',
        component: productadd
      },
      {
        path: '/productselect',
        component: productselect
      },
      {
        path: '/custadd',
        component: custadd
      },
      {
        path: '/custselect',
        component: custselect
      },
    ]
  }
  ],
})
