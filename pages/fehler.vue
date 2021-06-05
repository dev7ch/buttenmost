<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        Das hat leider nicht geklappt. Die Zahlung wurde
        {{this.$route.query.fehler}}.
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>
