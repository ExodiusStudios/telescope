import { DelegateRegistry } from './registry';
import { StoreNamespace } from '../store';
import { Optional } from '../typings/types';
import { Profile } from '../model/profile';
import { Dictionary } from 'lodash';
import { ClientConfig } from '../model/config';
import { storeMutations } from './store/mutations';
import { storeActions } from './store/actions';
import { storeGetters } from './store/getters';
import { store } from '..';

const isDarkMode = localStorage.getItem('vindigo:dark') == 'true';
const initialLang = localStorage.getItem('vindigo:lang') || 'en-US';

/**
 * The root state for the vindigo client
 */
export interface RootState {
	isDark: boolean,
	language: string,
	profile: Optional<Profile>,
	isAuthed: boolean,
	isReady: boolean,
	isWaiting: boolean,
	isRendered: boolean,
	loading: Dictionary<boolean>,
	config: ClientConfig
}

export class StoreRegistry extends DelegateRegistry<StoreNamespace<any>> {

	public override onInitialize(): void {
		
		this.registerNamespace({
			id: 'core',
			mutations: storeMutations,
			actions: storeActions,
			getters: storeGetters,
			state: {
				isDark: isDarkMode,
				language: initialLang,
				profile: null,
				isAuthed: false,
				isReady: false,
				isWaiting: false,
				isRendered: false,
				loading: {
					auth: false,	// Authentication status
					i18n: false,	// Language file download
					config: false	// Config fetched
				},
				config: {
					instanceName: '',
					maintenance: false,
					allowAnonymous: false,
					allowRegister: false,
					verification: false
				}
			}
		});

	}

	public registerNamespace(namespace: StoreNamespace<any>) {
		this.register(namespace.id, namespace);
	}

	public override onComplete(): void {
		store.submitNamespaces(this);
	}

}