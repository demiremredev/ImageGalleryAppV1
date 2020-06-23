 <template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div
				id="sc-gallery-grid"
				class="uk-child-width-1-2@s uk-child-width-1-3@l uk-child-width-1-4@xl uk-grid-medium uk-position-relative uk-grid uk-flex-top uk-flex-wrap-top"
				data-uk-lightbox="animation: scale"
				data-uk-grid="masonry: true"
			>
				<div v-for="photo in photos" :key="photo.id">
					<ScCard>
						<ScCardBody class="sc-padding-remove">
							<a :href="photo.large" class="uk-display-block">
								<img :src="photo.large" class="sc-round-top uk-width-1-1" alt="">
							</a>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers, scFakeData } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export default {
	data: () => ({
		rating: {},
		imageList: []
	}),
	computed: {
		photos () {
			let photos = [];
			if (this.imageList && this.imageList.length) {
				this.imageList.forEach((k, index) => {
					let id = uniqueID();
					photos.push({
						id: id,
						large: require('~/upload/photos/' + k),
						like: index === 0 || index === 2
					});
				});
			}
			return photos;
		}
	},
	watch: {
		sidebarMainExpanded () {
			setTimeout(() => {
				UIkit.update(document.getElementById('sc-gallery-grid'));
			}, 150);
		},
		imageList () {

		}
	},
	async mounted () {
		let self = this;
		this.photos.forEach(obj => {
			self.$set(self.rating, obj.id, obj.like)
		});
		setTimeout(() => {
			UIkit.update(document.getElementById('sc-gallery-grid'));
		}, 100);
		this.imageList = await this.getImages();
	},
	methods: {
		async getImages () {
			return await this.$axios.$get("/api/get_all_images");
		}
	}
}
</script>