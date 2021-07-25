const navegateTo = {
  methods: {
    navegateTo: function (where) {
      const myPath = '/' + where

      if (this.$router.currentRoute.path !== myPath) {
        this.$router.push(where)
      }
    }
  }
}

export default navegateTo
