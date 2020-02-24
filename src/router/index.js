import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import MapApp from '@/components/MapApp'
import demoList from '../shared/DemoList';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/map-app',
            name: 'MapApp',
            component: MapApp,
            children: demoList.map(demo => {
                return {
                    path: demo.path,
                    component: demo.component,
                    name: demo.route
                }
            })
        }
    ]
});