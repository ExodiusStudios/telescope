import Vue from 'vue';

/**
 * Create a scrollable mixin that sets the `isScrolling` field
 * when the given ref element is scrolled.
 */
export const Scrollable = (source: any, element: Element = source) => {
	return Vue.extend({
		name: 'Scrollable',
	
		data: () => ({
			isScrolling: false
		}),
	
		mounted() {
			source.addEventListener('scroll', this.computeScrolling);
			this.computeScrolling();
		},
	
		beforeDestroy() {
			source.removeEventListener('scroll', this.computeScrolling);
		},
	
		methods: {
			computeScrolling() {
				this.isScrolling = (element.scrollTop ?? 0) > 0;
			}
		}
	});
};