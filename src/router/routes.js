
import LoginPage from 'pages/Login';
import HomePage from 'pages/Index';

const isAuthenticated = () => {
	if (localStorage.getItem('token')) {
		return true;
	}

	return false;
};

const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: HomePage }
		],
		beforeEnter: (to, from, next) => {
			if (!isAuthenticated()) {
				next('/login');
			} else {
				next();
			}
		}
	},
	{
		path: '/login',
		component: LoginPage
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
];

export default routes;
