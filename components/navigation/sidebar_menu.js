import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		section_title: "Menu"
	},
	{
		id: uniqueID(),
		title: "Dashboard",
		page: "/dashboard/overview",
		icon: "mdi mdi-view-dashboard-variant",
		permission_key: "dashboard_page_view"
	},
	{
		id: uniqueID(),
		title: "Upload",
		page: "/dashboard/upload",
		icon: "mdi mdi-file-upload",
		permission_key: "dashboard_page_view"
	}
];
