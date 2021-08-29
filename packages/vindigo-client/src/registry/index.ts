import { forEach } from "lodash";
import { ComponentRegistry } from "./components";
import { LanguageRegistry } from "./languages";
import { PluginsRegistry } from "./plugins";
import { Registry } from "./registry";
import { RoutingRegistry } from "./routing";
import { StoreRegistry } from "./store";

const components = new ComponentRegistry();
const languages = new LanguageRegistry();
const plugins = new PluginsRegistry();
const routing = new RoutingRegistry();
const store = new StoreRegistry();

export {
	components,
	languages,
	plugins,
	routing,
	store
};

const registries: Registry<any>[] = [
	components,
	languages,
	plugins,
	routing,
	store
];

/**
 * Complete and lock all registries
 */
export function completeRegistries() {
	forEach(registries, (reg) => reg.complete());
}