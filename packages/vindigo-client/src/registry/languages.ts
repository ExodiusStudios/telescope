import { Language } from '../i18n';
import { DelegateRegistry } from './registry';

export class LanguageRegistry extends DelegateRegistry<Language> {

	public override onInitialize(): void {
		this.registerLanguage({
			id: 'en-US',
			name: 'English (United States)',
			dayjs: 'en',
			icon: 'us'
		});

		this.registerLanguage({
			id: 'en-PS',
			name: 'Pirate Speak (English)',
			dayjs: 'en',
			icon: 'us'
		});

		this.registerLanguage({
			id: 'nl-NL',
			name: 'Dutch',
			dayjs: 'nl',
			icon: 'nl'
		});
	}

	public registerLanguage(language: Language) {
		this.register(language.id, language);
	}

	public override onComplete(): void { }

}