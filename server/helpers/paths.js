
const APIPaths = {
    Image: "/api/image"
}

const PortalPaths = {
    Dashboard: "/dashboard/overview",
    Forbidden: "/forbidden",
}

const DashboardPath = `/dashboard/overview`;
const AllowedPaths = ["/__webpack_hmr", "/favicon.ico", "/help-guide/overview" , "/forbidden"];
const AssetPaths = ['/css/', '/assets/', '/img/', '/js/', '/vendors/','/vendor/', '/_nuxt/', '/__webpack',"/fonts"];
module.exports = {
    APIPaths,
    PortalPaths,
    AllowedPaths,
    AssetPaths,
    DashboardPath
}
