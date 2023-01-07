import DashboardLayout from '../layout/DashboardLayout.vue'
import NotFound from '../pages/NotFoundPage.vue'
import Eletro from 'src/pages/Eletro.vue'
import Marca from 'src/pages/Marca.vue'
import Tensao from 'src/pages/Tensao.vue'


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/Eletro',
    children: [
      {
        path: 'Eletro',
        name: 'Eletro',
        component: Eletro
      },
      {
        path: 'Marca',
        name: 'Marca',
        component: Marca
      },
      {
        path: 'Tensao',
        name: 'Tensao',
        component: Tensao
      },
    ]
  },
  { path: '*', component: NotFound }
]


 


export default routes
