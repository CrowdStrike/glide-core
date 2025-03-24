import { LocalizeController as DefaultLocalizationController, registerTranslation, } from '@shoelace-style/localize';
import en from '../translations/en.js'; // Register English as the default/fallback language
import fr from '../translations/fr.js';
import ja from '../translations/ja.js';
// Extend the controller and apply our own translation interface for better typings
export class LocalizeController extends DefaultLocalizationController {
    static {
        registerTranslation(en, ja, fr);
    }
}
