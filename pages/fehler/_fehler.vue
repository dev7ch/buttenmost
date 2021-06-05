<template>
  <div>
    <h1>Das hat leider nicht geklappt</h1>
    <p>Die Zahlung wurde {{reason}}</p>
    
    <p>Path: {{ $route.path }}</p>
  </div>
</template>
<script>
  export default {
    async asyncData({ params }) {
      const reason = params.fehler
      return { fehler }
    },
  }
</script>