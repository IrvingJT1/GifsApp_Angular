import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
        // el probelma inicial se solucion usando un export default en la definición del componente al que apunta el lazy load
    
        // con children se asegura mostrar el contenido de los componentes dentro de la ruta de dashboard que es el padre
        // ej ...dashboard/search o ...dashboard/trending
        children:[
            {
                path: 'search',
                loadComponent: () => import('./gifs/pages/search-page/search-page.component'),
            },
            {
                path: 'trending',
                loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
            },
            {
                path:'**',
                redirectTo: 'trending'
            }
        ]
    },
    
    {
        path:'**',
        redirectTo: 'dashboard'
    }
];
