import axios from 'axios'
import { version } from '~~/package.json';
// initial state
export const state = () => ({
    collapseSideBar: false,
    currentPage: "",
    appVersion: "v" + require('./../package.json').version,
	vxAppVersion: version,
	vxSidebarMainExpanded: true,
	vxSidebarMainAccordionMode: false,
	vxSidebarMainScrollToActive: false,
	vxCardFixed: false,
	vxHeaderExpanded: false,
	vxPageFixed: false,
	vxAppTheme: 'theme-default',
	vxOffcanvasPresent: false,
	vxOffcanvasExpanded: false,
	vxCodeMirrorFullscreen: false,
	vxProgressOverlay: false,
	vxPageScrollbars: true,
    vxFooterActive: false
})

export const mutations = {
	sidebarMainToggle (state, expanded) {
		state.vxSidebarMainExpanded = expanded
	},
	sidebarMainAccordionModeToggle (state) {
		state.vxSidebarMainAccordionMode = !state.vxSidebarMainAccordionMode
	},
	sidebarMainScrollToActiveToggle (state) {
		state.vxSidebarMainScrollToActive = !state.vxSidebarMainScrollToActive
	},
	setCardFixed (state, fixed) {
		state.vxCardFixed = fixed;
	},
	setHeaderExpanded (state, expanded) {
		state.vxHeaderExpanded = expanded;
	},
	setPageFixed (state, fixed) {
		state.vxPageFixed = fixed
	},
	setAppTheme (state, theme) {
		console.log(theme);
		state.vxAppTheme = theme
	},
	setOffcanvasPresent (state, present) {
		state.vxOffcanvasPresent = present
	},
	offcanvasToggle (state, active) {
		state.vxOffcanvasExpanded = active
	},
	cmFullscreenToggle (state, fullscreen) {
		state.vxCodeMirrorFullscreen = fullscreen
	},
	toggleProgressOverlay (state, active) {
		state.vxProgressOverlay = active
	},
	togglePageScrollbars (state, active) {
		if (active) {
			this.pageScrollbarEnable();
		} else {
			this.pageScrollbarDisable();
		}
	},
    SET_ACTIVE_PAGE_TITLE(state, title) {
        state.currentPage = title
    }
}

export const actions = {
    setActivePageTitle({ commit }, title) {
        commit('SET_ACTIVE_PAGE_TITLE', title);
    }
};

export const getters = {
    isAppLoading(state) {
        return true;
    },
    activePageTitle(state) {
        return state.currentPage;
    },
    redirectURL(state){
        return state.authUser && state.authUser.redirect_url ? state.authUser.redirect_url : ""
    },
    appVersion(state){
        return state.appVersion;
    },
	pageFixedState: state => state.vxPageFixed,
	cardFixedState: state => state.vxCardFixed,
	headerExpandedState: state => state.vxHeaderExpanded,
	sidebarMainState: state => state.vxSidebarMainExpanded,
    offcanvasState: state => state.vxOffcanvasExpanded,
};
