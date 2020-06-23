<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-grid" data-uk-grid>
				<div v-show="imgSrc" class="uk-width-2-3@l">
					<ScCard>
						<ScCardBody>
							<div id="sc-cropper-container">
								<client-only>
									<VueCropper
										ref="cropper"
										:src="imgSrc"
										alt="Source Image"
										:drag-mode="dragMode"
										:cropend="cropImage"
										:ready="cropImage"
									></VueCropper>
								</client-only>
							</div>
							<div class="sc-cropper-buttons uk-margin-top">
								<div class="uk-flex uk-flex-wrap uk-flex-top" data-uk-margin>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon sc-button-radio"
											title="Move"
											:class="{ 'uk-active' : dragMode === 'move' }"
											@click="changeDragMode('move')"
										>
											<span class="mdi mdi-arrow-all"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon sc-button-radio"
											title="Crop"
											:class="{ 'uk-active' : dragMode === 'crop' }"
											@click="changeDragMode('crop')"
										>
											<span class="mdi mdi-crop"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Zoom In"
											@click="zoom(0.1)"
										>
											<span class="mdi mdi-magnify-plus-outline"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Zoom Out"
											@click="zoom(-0.1)"
										>
											<span class="mdi mdi-magnify-minus-outline"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Rotate Left"
											@click="rotate(-45)"
										>
											<span class="mdi mdi-rotate-left"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Rotate Right"
											@click="rotate(45)"
										>
											<span class="mdi mdi-rotate-right"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Flip Horizontal"
											@click="scaleX(scaleXVal)"
										>
											<span class="mdi mdi-swap-horizontal"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Flip Vertical"
											@click="scaleY(scaleYVal)"
										>
											<span class="mdi mdi-swap-vertical"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Crop"
											@click="initCrop"
										>
											<span class="mdi mdi-check"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Clear"
											@click="clear"
										>
											<span class="mdi mdi-close"></span>
										</button>
									</div>
                                    <div>
                                        <div class="uk-button-group sc-buttons-stacked@m">
                                            <button
                                                type="button"
                                                class="sc-button sc-button-primary sc-button-radio"
                                                title="aspectRatio: 16/9"
                                                :class="{ 'uk-active' : aspectRatio === '16/9' }"
                                                @click="setAspectRatio(1.7777777777777777, '16/9')"
                                            >
                                                16:9
                                            </button>
                                            <button
                                                type="button"
                                                class="sc-button sc-button-primary sc-button-radio"
                                                title="aspectRatio: 4/3"
                                                :class="{ 'uk-active' : aspectRatio === '4/3' }"
                                                @click="setAspectRatio(1.3333333333333333, '4/3')"
                                            >
                                                4:3
                                            </button>
                                            <button
                                                type="button"
                                                class="sc-button sc-button-primary sc-button-radio"
                                                title="aspectRatio: 1/1"
                                                :class="{ 'uk-active' : aspectRatio === '1/1' }"
                                                @click="setAspectRatio(1, '1/1')"
                                            >
                                                1:1
                                            </button>
                                            <button
                                                type="button"
                                                class="sc-button sc-button-primary sc-button-radio"
                                                title="aspectRatio: 2/3"
                                                :class="{ 'uk-active' : aspectRatio === '2/3' }"
                                                @click="setAspectRatio(0.6666666666666666, '2/3')"
                                            >
                                                2:3
                                            </button>
                                            <button
                                                type="button"
                                                class="sc-button sc-button-primary sc-button-radio"
                                                title="aspectRatio: NaN"
                                                :class="{ 'uk-active' : aspectRatio === 'NaN' }"
                                                @click="setAspectRatio(NaN, 'NaN')"
                                            >
                                                Free
                                            </button>
                                        </div>
                                    </div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div v-show="imgSrc" class="uk-width-1-3@l">
					<ScCard>
						<ScCardBody>
							<p class="uk-margin-small-bottom">
								Preview:
							</p>
							<div>
								<div class="sc-cropper-preview sc-cropper-preview-lg">
									<img :src="cropImg" style="max-height: 150px;" alt="Cropped Image">
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="sc-fab-page-wrapper uk-form-custom" data-uk-form-custom>
				<input v-if="!imgSrc" type="file" name="file" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" @change="readImage">
				<button v-show="!imgSrc" class="sc-fab sc-fab-large sc-fab-danger" type="button" tabindex="-1">
					<i class="mdi mdi-file-upload"></i>
				</button>
				<button v-show="imgSrc" class="sc-fab sc-fab-large sc-fab-danger" type="button" tabindex="-1" @click="cancel">
					<i class="mdi mdi-cancel"></i>
				</button>
				<button v-if="cropImg" class="sc-fab sc-fab-large sc-fab-success" type="button" tabindex="-1" @click="uploadImage">
					<i class="mdi mdi-content-save"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers } from '~/assets/js/utils';
import { isMobile } from 'mobile-device-detect';

const { isHiRes } = scHelpers;

export default {
	components: {
		VueCropper: process.client ? () => import('vue-cropperjs') : null,
	},
	data: () => ({
        imgSrc: '',
        cropImg: '',
		dragMode: 'move',
		scaleXVal: -1,
		scaleYVal: -1,
		disabled: false,
		aspectRatio: '16/9',
		canDownload: false
    }),
    computed: {
        isDesktop () {
            return !isMobile;
        }
    },
	methods: {
        async uploadImage () {
			let img = this.cropImg;

			await this.$axios.$post("/api/upload", { image_base64: img})
				.then(function (result) {
					if(result.status === 'success') {
						window.location = '/dashboard/overview';
					}
				}, function (error) {
					console.log(error);
				});
        },
        cancel () {
            this.imgSrc = '';
            this.cropImg = '';
        },
		cropImage () {
			this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
		},
		changeDragMode (mode) {
			this.dragMode = mode;
			this.$refs.cropper.setDragMode(mode)
		},
		zoom (val) {
			this.$refs.cropper.relativeZoom(val)
		},
		move (o1, o2) {
			this.$refs.cropper.move(o1, o2)
		},
		rotate (deg) {
			this.$refs.cropper.rotate(deg)
		},
		scaleX (val) {
			this.$refs.cropper.scaleX(val);
			this.scaleXVal = val === 1 ? -1 : 1;
		},
		scaleY (val) {
			this.$refs.cropper.scaleY(val);
			this.scaleYVal = val === 1 ? -1 : 1;
		},
		clear () {
			this.$refs.cropper.clear()
		},
		initCrop () {
			this.$refs.cropper.initCrop()
		},
		disable () {
			this.$refs.cropper.disable();
			this.disabled = true;
		},
		enable () {
			this.$refs.cropper.enable();
			this.disabled = false;
		},
		reset () {
			this.$refs.cropper.reset()
		},
		destroy () {
			this.$refs.cropper.destroy()
		},
		getCroppedCanvas (size) {
			let options = null;
			if(size === 'full') {
				options = { "maxWidth": 4096, "maxHeight": 4096 }
			}
			if(size === 'medium') {
				options = { "width": 320, "height": 180 }
			}
			if(size === 'small') {
				options = { "width": 240, "height": 100 }
			}
			document.getElementById('croppedCanvasWrapper').innerHTML = '';
			UIkit.modal('#getCroppedCanvasModal').show();
			const croppedCanvas = this.$refs.cropper.getCroppedCanvas(options);
			document.getElementById('croppedCanvasWrapper').appendChild(croppedCanvas);
			document.getElementById("croppedCanvasDownload").href = croppedCanvas.toDataURL('image/jpeg');
		},
		setAspectRatio (aspectRatio, val) {
			this.$refs.cropper.setAspectRatio(aspectRatio);
			this.aspectRatio = val;
		},
		readImage (e) {
			const file = e.target.files[0];
			if (!file.type.includes('image/')) {
				alert('Please select an image file');
				return;
			}
			if (typeof FileReader === 'function') {
				const reader = new FileReader();
				reader.onload = (event) => {
					this.imgSrc = event.target.result;
					this.$refs.cropper.replace(event.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				alert('Sorry, FileReader API not supported');
			}
		},
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/cropper';
</style>