<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<video ref="video" class="screen-shared" src=""></video>
			</div>
			<div class="col">
				<b-button variant="danger" @click="stop">Button</b-button>
			</div>
		</div>
	</div>
</template>

<script>
	import getVideoStream from "@/plugins/shared.js";
	export default {
		name: "ScreenShared",
		data: () => ({}),
		mounted() {
			const peer = new Peer({
				host: "localhost",
				port: 9000,
				path: "/myapp",
			});
			peer.on("open", function(id) {
				window.socket.emit("start-class", id);
			});
			getVideoStream({
				video: {
					cursor: "always",
				},
				audio: true,
			}).then((stream) => {
				this.$refs.video.srcObject = stream;
				this.$refs.video.addEventListener("loadedmetadata", () => {
					this.$refs.video.play();
				});
				peer.on("error",error=>{
					console.log(error)
				})
				peer.on("call", call => {
					call.answer(stream);
					call.on("stream",stream=>{
						console.log(stream)
					})
				});
			});
		},
		methods: {
			stop() {
				let tracks = this.$refs.video.srcObject.getTracks();
				console.info(tracks);
				tracks.forEach((track) => {
					track.stop();
				});
				this.$refs.video.srcObject = null;
			},
		},
	};
</script>

<style scoped>
	.screen-shared {
		width: 100%;
		height: 100%;
	}
</style>
