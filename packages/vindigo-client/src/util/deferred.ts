/**
 * An instance of Deferred acts similar to a Promise with
 * the addition of being completable externally.
 */
export class Deferred<T> implements Promise<T> {
	
	private readonly promise: Promise<T>;
	private _resolver!: (value: T) => void;
	private _rejecter!: (reason?: any) => void;

	public constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.reject = reject;
			this.resolve = resolve;
		});
	}

	public then<TResult1 = T, TResult2 = never>(
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
	): Promise<TResult1 | TResult2> {
		return this.promise.then(onfulfilled, onrejected);
	}
	
	public catch<TResult = never>(
		onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
	): Promise<T | TResult> {
		return this.promise.then(onrejected);
	}
	
	public finally(
		onfinally?: (() => void) | undefined | null
	): Promise<T> {
		return this.promise.finally(onfinally);
	}
	
	public resolve(val:T) { this._resolver(val); }
	public reject(reason:any) { this._rejecter(reason); }
	
	public [Symbol.toStringTag]: 'Promise'
	
}