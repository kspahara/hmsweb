/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_TEST_API_URL: string;
	readonly VITE_DEBBUG: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
