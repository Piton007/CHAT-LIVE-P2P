<template>
  <div class="container">
		<div class="row">
			<div class="col">
				<video ref="video"  src=""></video>
			</div>
		</div>
	</div>
</template>

<script>
import getVideoStream from "@/plugins/shared.js";
export default {
name:"Viewer",
mounted(){
    let self = this
    const peer = new Peer({
				host: "localhost",
				port: 9000,
				path: "/myapp",
            });
    peer.on('open', function(id) {
            window.socket.emit("joined-in-class", id);
        });
        
    window.socket.on("master-id",id => {
        var call =  peer.call(id,new MediaStream())
        call.on("stream",stream=>{
            console.log(stream)
            self.$refs.video.srcObject = stream;
			self.$refs.video.addEventListener("loadedmetadata", () => {
			self.$refs.video.play();
			});
        })
    })
    
     
}
}
</script>

<style>

</style>