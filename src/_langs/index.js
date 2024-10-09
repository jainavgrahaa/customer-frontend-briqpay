import en from "./locales/en.json";
import us from "./locales/us.json";
import fr from "./locales/fr.json";

// Added en-us as en to not show error while redirect when access without locale
// And redirect to en-us en locale
const messages = { "en-default": en, "en-gb": en, "en-us": en, us, fr, uk: en };

export default messages;
