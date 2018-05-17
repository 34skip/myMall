import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Dheader from '@/views/Dheader'
import myChart from '@/views/myChart'

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
    },
    {
      path: '/myChart',
      name: 'myChart',
      component: myChart
    }
  ]
})
