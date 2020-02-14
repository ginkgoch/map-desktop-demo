import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import MapApp from '@/components/MapApp'
import HelloMap from '@/components/examples/HelloMap'
import LoadShapefile from '@/components/examples/LoadShapefile'

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
            children: [
                { path: '', component: HelloMap, name: 'HelloMap' },
                { path: 'load-shapefile', component: LoadShapefile, name: 'LoadShapefile' }
            ]
        }
    ]
});