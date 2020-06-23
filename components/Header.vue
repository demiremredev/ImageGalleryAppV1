<template>
	<header id="sc-header" ref="header">
		<nav class="uk-navbar uk-navbar-container" data-uk-navbar="mode: click; duration: 360">
			<div class="uk-navbar-left nav-overlay-small uk-margin-right uk-navbar-aside">
				<a id="sc-sidebar-main-toggle" href="javascript:void(0)" @click.stop="toggleMainSidebar">
					<i v-if="sidebarMainExpanded" class="mdi mdi-backburger"></i>
					<i v-if="!sidebarMainExpanded" class="mdi mdi-menu"></i>
				</a>
			</div>
			<div class="nav-overlay nav-overlay-small uk-navbar-right uk-flex-1" hidden>
				<a class="uk-navbar-toggle uk-visible@l" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<a class="uk-navbar-toggle uk-hidden@l uk-padding-remove-left" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<div class="uk-navbar-item uk-width-expand uk-padding-remove-right">
					<form class="uk-search uk-search-navbar uk-width-1-1 uk-flex">
						<input class="uk-search-input" type="search" placeholder="Search..." autofocus>
						<button class="sc-button sc-button-small sc-button-icon sc-button-flat uk-margin-small-left" type="button">
							<i class="mdi mdi-magnify sc-icon-24 md-color-white"></i>
						</button>
					</form>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { scMq } from '~/assets/js/utils'

export default {
	data: () => ({
		user: {
			avatar: require('~/assets/img/avatars/avatar_default_sm.png'),
			messages: [
			],
			alerts: [
				{
					id: 1,
					text: 'Information Page Not Found!',
					icon: 'mdi-alert-outline',
					color: 'md-color-red-600'
				},
				{
					id: 2,
					text: 'A new password has been sent to your e-mail address.',
					icon: 'mdi-email-check-outline',
					color: 'md-color-blue-600'
				},
				{
					id: 3,
					text: 'You do not have permission to access the API!',
					icon: 'mdi-alert-outline',
					color: 'md-color-red-600'
				},
				{
					id: 4,
					text: 'Your enquiry has been successfully sent.',
					icon: 'mdi-check-all',
					color: 'md-color-light-green-600'
				}
			]
		},
		sidebarMainExpanded: true,
		offcanvasExpanded: false,
		offcanvasPresent: false,
		logo: require('~/assets/img/logo.png'),
		alertsEmpty: null
	}),
	computed: {
		...mapState([
			'vxSidebarMainExpanded',
			'vxOffcanvasPresent',
			'vxOffcanvasExpanded'
		])
	},
	watch: {
		'vxSidebarMainExpanded' (state) {
			this.sidebarMainExpanded = state;
		},
		'vxOffcanvasExpanded' (state) {
			this.offcanvasExpanded = state;
		},
		'vxOffcanvasPresent' (state) {
			this.offcanvasPresent = state;
		}
	},
	mounted () {
		const self = this;
		self.$nextTick(() => {
			if(scMq.mediumMin()) {
				self.sidebarMainExpanded = this.vxSidebarMainExpanded;
			} else {
				self.sidebarMainExpanded = false;
				// sidebar events
				// UIkit.util.on(document, 'hide', '#sc-sidebar-main', function () {
				// 	self.$store.commit('sidebarMainToggle', false);
				// });
				// UIkit.util.on(document, 'hide', '#sc-offcanvas', function () {
				// 	self.$store.commit('offcanvasToggle', false);
				// });
			}
		});
		// sticky header
		var options = scMq.mediumMax() ? { showOnUp: true, animation: "uk-animation-slide-top" } : {};
		UIkit.sticky(this.$refs.header, options);
	},
	methods: {
		...mapActions({ logoutSt: "logout"}),
		async logoutUser(){
			let result = await this.logoutSt();
		},
		toggleMainSidebar () {
			let state = !this.sidebarMainExpanded;
			this.$store.commit('sidebarMainToggle', state);
		},
		toggleOffcanvas () {
			let state = !this.offcanvasExpanded;
			this.$store.commit('offcanvasToggle', state);
		}
	}
}
</script>
