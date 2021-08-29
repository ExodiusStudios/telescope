import Router from 'vue-router';
import Store from 'vuex';
import Transitions from 'vue2-transitions';
import Trend from 'vuetrend';
import VWave from 'v-wave';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import WaveUI from 'wave-ui';
import { DelegateRegistry } from './registry';

export class PluginsRegistry extends DelegateRegistry<any> {

	public override onInitialize(): void {
		this.register('transitions', Transitions);
		this.register('i18n', VueI18n);
		this.register('waveui', WaveUI);
		this.register('router', Router);
		this.register('store', Store);
		this.register('wave', VWave);
		this.register('trend', Trend);
	}

	public override onComplete(): void {
		for(const plugin of this.toArray()) {
			Vue.use(plugin);
		}
	}

}