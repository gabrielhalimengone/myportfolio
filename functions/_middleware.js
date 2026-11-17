const canonicalHost = "gabrielhalim-dev.com";
const alternateHost = "www.gabrielhalim-dev.com";

export function onRequest(context) {
    const url = new URL(context.request.url);

    if (
        url.hostname === alternateHost
        && (url.pathname === "/" || url.pathname === "/index.html")
    ) {
        url.hostname = canonicalHost;
        return Response.redirect(url.toString(), 301);
    }

    return context.next();
}
