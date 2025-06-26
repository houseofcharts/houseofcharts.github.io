import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./next.config";

export function middleware(request) {
    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: ["/", "/(de|en|fr)/:path*"],
};