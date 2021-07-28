<template>
    <v-alert
          v-if="message.show"
          v-bind:type="message.type"
          v-bind:dismissible="message.dismissible"
          dense
          text
        >{{ message.text }}</v-alert>
</template>

<script>
  export default {
    name: "AlertDialog",
    
    data() {
      return {
        message: {
          show: false,
          dismissible: false,
          type: '',
          text: ''
        },
      };
    },

    methods: {
      show(type, text, dismissible){
        this.message.show = true
        this.message.dismissible = !!dismissible || false
        this.message.type = type
        this.message.text = text  
      },
      hide(){
        this.message.show = false
        this.message.dismissible = false
        this.message.type = ''
        this.message.text = ''  
      }
    },
  }
</script>
