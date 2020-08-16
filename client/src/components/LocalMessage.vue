<template>
  <div class="d-flex justify-content-end mb-4">
    <div ref="container" v-emoji class="msg_cotainer_send" >
      {{data.msg}}
      <div class="msg_time_send">{{ data.date }}</div>
    </div>
    <div class="img_cont_msg">
      <img
        :src="img"
        class="rounded-circle user_img_msg"
      />
    </div>
  </div>
</template>

<script>
export default {
  
  name: "ForeignMessage",
  props: {
    img:String,
    data: Object
  }
};
</script>
