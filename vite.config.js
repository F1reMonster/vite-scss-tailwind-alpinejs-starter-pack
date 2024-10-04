
import { resolve } from "path";
import { globSync } from "glob";
import * as sass from "sass";

// Знаходимо всі HTML файли
const htmlEntries = globSync("src/**/*.html").map((file) => resolve(file));

export default {
	root: "src",
	base: "",
	build: {
		outDir: resolve(__dirname, "dist"),
		emptyOutDir: true,
		rollupOptions: {
			input: htmlEntries,
			output: {
				entryFileNames: "assets/js/[name]-[hash].js",
				chunkFileNames: "assets/js/[name]-[hash].js",
				assetFileNames: ({ name }) => {
					if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
						return "assets/images/[name]-[hash][extname]";
					}
					if (/\.css$/.test(name ?? "")) {
						return "assets/css/[name]-[hash][extname]";
					}
					return "assets/[name]-[hash][extname]";
				},
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				implementation: sass,
				api: "modern-compiler",
			},
		},
	},
	plugins: [
		{
			name: "watch-external",
			buildStart() {
				globSync("src/**/*").forEach((file) => {
					this.addWatchFile(file);
				});
			},
		},
		{
			name: "html-transform",
			transformIndexHtml(html) {
				return html.replace(/href="\.\//g, 'href="').replace(/src="\.\//g, 'src="');
			},
		},
	],
};
