import { Dictionary, keyBy, values } from "lodash";

/**
 * Represents a single item in a Registry
 */
export interface RegistryItem<T> {
	id: string;
	content: T;
	weight: number;
}

/**
 * The registry interface defines a service in which
 * items may be registered.
 * 
 * Each item includes a unique id together with a
 * weight value. The weight value usually defines the
 * order in which items appear, as returned by #toArray()
 * 
 * Duplicate identifiers are forbidden and will throw an error.
 */ 
export interface Registry<T> {
	
	/**
	 * Register a new item in the registry.
	 * 
	 * @param id The unique identifier
	 * @param value The item value
	 * @param weight The weight value
	 */
	register(id: string, value: T, weight: number): T;

	/**
	 * Unregister an existing item by its
	 * unique identifier.
	 * 
	 * @param id The unique identifier
	 */
	unregister(id: string): T|undefined;

	/**
	 * Test whether the registry contains an
	 * item with the given identifier.
	 * 
	 * @param id The unique identifier
	 */
	contains(id: string): boolean;

	/**
	 * Returns a registered registry value by
	 * its unique identifier.
	 * 
	 * @param id The unique identifier
	 */
	get(id: string): T|undefined;

	/**
	 * Returns whether the registry is empty
	 * 
	 * @returns Boolean
	 */
	isEmpty(): boolean;

	/**
	 * Complete the registry and prevent further
	 * modifications from being made.
	 */
	complete(): void;

	/**
	 * Returns the items currently present within
	 * the map, including their id and weight.
	 * 
	 * @returns The array view
	 */
	toItems(): RegistryItem<T>[];

	/**
	 * Convert the contents of this registry in
	 * an array sorted by the weight values of
	 * each registry item.
	 * 
	 * @returns The array view
	 */
	toArray(): T[]

	/**
	 * Returns a dictionary view of the currently
	 * present items.
	 * 
	 * @returns RegistryItem map
	 */
	toMap(): Dictionary<RegistryItem<T>>

}

//
// --- Simple registry implementation
//

class SimpleRegistryItem<T> implements RegistryItem<T> {

	public id: string;
	public content: T;
	public weight: number;

	public constructor(id: string, content: T, priority: number) {
		this.id = id;
		this.content = content;
		this.weight = priority;
	}
}

export class SimpleRegistry<T> implements Registry<T> {

	private items: { [key: string]: SimpleRegistryItem<T> } = {};
	private cache: SimpleRegistryItem<T>[]|null = null;
	private completed = false;

	public register(id: string, value: T, weight = 0): T {
		if(this.completed) {
			throw new Error('Registry is already completed');
		} else if(this.contains(id)) {
			throw new Error(`Duplicate registry key "${id}"`);
		}

		this.cache = null;
		this.items[id] = {
			id: id,
			weight: weight,
			content: value
		};

		return value;
	}

	public unregister(id: string): T | undefined {
		if(this.completed) {
			throw new Error('Registry is already completed');
		}
		
		const value = this.get(id);

		this.cache = null;
		delete this.items[id];

		return value;
	}

	public contains(id: string): boolean {
		return !!this.items[id];
	}

	public get(id: string): T | undefined {
		return this.items[id].content;
	}

	public isEmpty(): boolean {
		return Object.keys(this.items).length == 0;
	}

	public complete() {
		this.completed = true;
	}

	public toItems(): RegistryItem<T>[] {
		if(!this.cache) {
			this.cache = values(this.items).sort((a, b) => a.weight - b.weight);
		}

		return this.cache!;
	}

	public toArray(): T[] {
		return this.toItems().map(item => item.content);
	}

	public toMap(): Dictionary<RegistryItem<T>> {
		return keyBy(this.toItems(), item => item.id);
	}

}

/**
 * A simple delegation registry which forwards initialization
 * and completion calls to the child. Useful for registries
 * requiring post-completion logic.
 */
export abstract class 	DelegateRegistry<T> extends SimpleRegistry<T> {

	public constructor() {
		super();
		this.onInitialize();
	}

	public override complete() {
		super.complete();
		this.onComplete();
	}

	abstract onInitialize(): void;

	abstract onComplete(): void;

}