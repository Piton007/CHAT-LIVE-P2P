<template>
  <div class="d-flex justify-content-start mb-4">
    <div class="img_cont_msg">
      <img
        :src="img"
        class="rounded-circle user_img_msg"
      />
    </div>
    <div class="msg_cotainer" v-emoji>
      {{ data.msg }}
      <span class="msg_time">{{ data.date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocalMessage",
  props: {
    img:String,
    data: Object
  }
};
</script>
