const SuperAdminPages = [
    "access-management"
]
const AdminPages = [
]

const AllowedPages = [
    "logout",
    "login",
    "forbidden",
    "failure-report"
]
const AppConstant = {
    AccessToken: "token",
    RefreshToken: "refresh"
}

const UserRole = {
    superadmin: 0,
    admin: 1,
    investor: 2,
    collector: 3
}
//0: todo, 1: service, 2: ready
const MaintenanceStatus = {
  "todo": 0,
  "service": 1,
  "ready": 2
}
module.exports = {
    SuperAdminPages,
    AdminPages,
    AppConstant,
    AllowedPages,
    UserRole,
    MaintenanceStatus
}
