import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import MapApp from '@/components/MapApp'
import demoList from '../shared/demoList';

Vue.use(Router)

const defaultDemoName = 'HelloMap'
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
                    path: demo[0] === defaultDemoName ? '' : demo[2],
                    component: demo[4],
                    name: demo[0]
                }
            })
        }
    ]
});