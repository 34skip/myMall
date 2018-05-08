import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Dheader from '@/views/Dheader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: 'dheader',
          name: 'dheader',
          component: Dheader
        }
      ]
    }
  ]
})
