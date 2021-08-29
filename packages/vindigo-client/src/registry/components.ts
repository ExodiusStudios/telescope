import Avatar from '../components/Avatar.vue';
import Draggable from 'vuedraggable';
import FileUpload from '../components/FileUpload.vue';
import LanguagePicker from '../components/LanguagePicker.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Logo from '../components/Logo.vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import Pagination from '../components/Pagination.vue';
import ProjectList from '../components/ProjectList.vue';
import SectionTitle from '../components/SectionTitle.vue';
import Spacer from '../components/Spacer.vue';
import TeamIcon from '../components/TeamIcon.vue';
import Toolbar from '../components/Toolbar.vue';
import { VueConstructor } from 'vue/types/umd';
import { DelegateRegistry } from './registry';
import Vue from 'vue';

export class ComponentRegistry extends DelegateRegistry<VueConstructor> {

	public override onInitialize(): void {
		this.register('LanguagePicker', LanguagePicker);
		this.register('LoadingSpinner', LoadingSpinner);
		this.register('MarkdownEditor', MarkdownEditor);
		this.register('SectionTitle', SectionTitle);
		this.register('ProjectList', ProjectList);
		this.register('Pagination', Pagination);
		this.register('FileUpload', FileUpload);
		this.register('Draggable', Draggable);
		this.register('TeamIcon', TeamIcon);
		this.register('Toolbar', Toolbar);
		this.register('Spacer', Spacer);
		this.register('Avatar', Avatar);
		this.register('Logo', Logo);
	}

	public override onComplete(): void {
		for(const { id, content } of this.toItems()) {
			Vue.component(id, content);
		}
	}

}