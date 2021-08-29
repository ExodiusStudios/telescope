import 'wave-ui/dist/wave-ui.css';
import 'codemirror/lib/codemirror.css';
import './style/global.vue';
import './style/wave.vue';
import './style/markdown.vue';

import { APIService } from './api';
import App from './views/App.vue';
import { I18nService } from './i18n';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { RoutingService } from "./routing";
import { StoreService } from "./store";
import Vue from 'vue';
import WaveUI from 'wave-ui';
import { buildThemeConfig } from './util';
import dayjs from 'dayjs';
import { patchRouterPush } from './helpers';
import { completeRegistries } from './registry';

dayjs.extend(RelativeTime);

// Define the services
const routing = new RoutingService();
const store = new StoreService();
const i18n = new I18nService();
const api = new APIService();

export {
	routing,
	store,
	i18n,
	api
};

// Apply patches
patchRouterPush();

// Register all core registries with
// their initial data and state
completeRegistries();

// Provide a type safe store reference
// since Vuex 3 does not yet support
// specifying a state structure.
Vue.mixin({
	computed: {
		$vuex() {
			return store.instance;
		},
		$config() {
			return store.instance.state.config;
		},
		$isDark() {
			return store.instance.state.isDark;
		}
	}
});

// Load wave ui
const waveui = new WaveUI({
	disableColorShades: true,
	colors: buildThemeConfig(),
	notificationManager: {
		align: 'right', // Or 'left'.
		transition: 'default' // Sliding from the side by default.
	}
});

// Instantiate the application
const vue = new Vue({
	el: '#app',
	router: routing.complete(),
	store: store.complete(),
	i18n: i18n.complete(),
	waveui: waveui,
	render: (m) => {
		return m(App);
	}
});

// Start the language service
i18n.initialize();

// Store a global reference
Object.defineProperty(window, 'vindigo', {
	writable: false,
	value: {
		routing,
		store,
		i18n,
		api,
		vue
	}
});

// Request the latest client config
store.instance.dispatch('fetchConfig');

// Sign in with the existing token
store.instance.dispatch('authenticate');

export { vue };