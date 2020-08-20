<template>
  <div class=" chat-content">
      <div class="row">
          <div class="col-6 bg-secondary" >
              <h2 class="chat-title mb-6">Chat</h2>
          
                 <b-input-group class="chat-finder" >
                    <b-form-input  placeholder="Search for messages or users..."></b-form-input>
                    <b-input-group-append>
                    <b-button  >Button</b-button>
                    </b-input-group-append>
                </b-input-group>
                <ul class="chat-list">
                    <li class="chat-list-item">
                        <div class="card">
                            <div class="card-body">
                                <div class="media">
                                    <div class="avatar mr-4">
                                        <img class="avatar-img" src="@/assets/avatar.jpg" alt="avatar photo">
                                    </div>
                                    <div class="media-body overflow-hidden">
                                        <div class="d-flex align-items-center mb-1">
                                                                <h6 class="text-truncate mb-0 mr-auto">Bootstrap Themes</h6>
                                                                <p class="small text-muted text-nowrap ml-4">10:42 am</p>
                                                            </div>
                                        <div class="text-truncate text-left">Anna Bridges: Hey, Maher! How are you? The weather is great isn't it?</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="chat-list-item">
                        <div class="card">
                            <div class="card-body">
                                <div class="media">
                                    <div class="avatar mr-4">
                                        <img class="avatar-img" src="@/assets/avatar.jpg" alt="avatar photo">
                                    </div>
                                    <div class="media-body overflow-hidden">
                                        <div class="text-truncate">Anna Bridges: Hey, Maher! How are you? The weather is great isn't it?</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="chat-list-item">
                        <div class="card">
                            <div class="card-body">
                                <div class="media">
                                    <div class="avatar mr-4">
                                        <img class="avatar-img" src="@/assets/avatar.jpg" alt="avatar photo">
                                    </div>
                                    <div class="media-body overflow-hidden">
                                        <div class="text-truncate">Anna Bridges: Hey, Maher! How are you? The weather is great isn't it?</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>  
                   
        
              
          </div>
          <div class="col-6 bg-white">
              Hello
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"Chat",
    data:()=>({
        text:""
    })
}
</script>

<style lang="scss">
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';
    $chat-finder-color :theme-color-level(secondary, -10);
    .avatar-img{
        border-radius: 50%;
        height: 3.125rem;
        min-height: 3.125rem;
        width: 3.125rem;
        min-width: 3.125rem;
    }
    ul, li {
        padding: 0;
        margin: 0;
    }
   
    .chat-list {
       
    }
    .chat-list-item{
        margin-bottom: 10px;
    }

    .chat-finder {
        margin-bottom: 6px;
        &-input {
            background-color: $chat-finder-color !important;
        }
        &-action {
            background-color: $chat-finder-color !important;
        }
    }   
    .chat-title{
        text-align: left;
        margin: 15px 3px;
    }
    .chat-content {
        padding: 0px 15px;
        height: 100%;
    }
</style>