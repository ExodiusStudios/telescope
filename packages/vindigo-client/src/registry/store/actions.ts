import { api, routing, vue } from "../..";

import { ActionTree } from "vuex";
import gql from "graphql-tag";
import { personalFragment, profileFragment } from "../../fragments";
import { clientReadyTask } from "../../util";
import { RootState } from "../store";

/**
 * Register store actions
 */
export const storeActions: ActionTree<RootState, RootState> = {
	
	/**
	 * Request the latest client config
	 */
	async fetchConfig({ commit }) {
		const { config } = await api.query(gql`
			query {
				config {
					instanceName
					maintenance
					allowRegister
					allowAnonymous
					verification
					colorPalette
				}
			}
		`);
		
		commit('storeConfig', config);
		commit('setLoaded', 'config');
	},

	/**
	 * Authenticate with the server
	 */
	async authenticate({ state, commit }) {
		const res = await api.query(gql`
			query {
				profile {
					...AllProfileFields
					...PersonalProfileFields
				}
			}
			${profileFragment}
			${personalFragment}
		`);

		commit('storeProfile', res.profile);
		commit('setLoaded', 'auth');

		clientReadyTask.then(() => {
			if(state.config.verification && !state.profile!.isVerified) {
				vue.$waveui.notify({
					error: true,
					message: 'Your account has not been verified yet',
					timeout: 0
				});
			}
		});
	},

	/**
	 * Sign in to a valid user account
	 */
	async signIn({ commit }, details) {
		const result = await api.query(gql`
			mutation ($details: UserAuthentication!) {
				authenticate(details: $details) {
					...AllProfileFields
					...PersonalProfileFields
				}
			}
			${profileFragment}
			${personalFragment}
		`, { details });

		commit('storeProfile', result.authenticate);

		return result.authenticate;
	},

	async signUp({ commit }, details) {
		const result = await api.query(gql`
			mutation ($details: UserRegistration!) {
				register(details: $details) {
					...AllProfileFields
					...PersonalProfileFields
				}
			}
			${profileFragment}
			${personalFragment}
		`, { details });

		commit('storeProfile', result.register);

		return result.register;
	},

	/**
	 * Sign the user out from the application
	 */
	async signOut({ commit }) {
		api.query(gql`
			mutation {
				signOut
			}
		`);

		commit('storeProfile', null);

		routing.instance.push('/explorer');
	},

	/**
	 * Refresh the current users profile
	 */
	async updateProfile({ commit }) {
		const result = await api.query(gql`
			query {
				profile {
					...AllProfileFields
				}
			}
			${profileFragment}
		`);

		commit('storeProfile', result.profile);
	},

};