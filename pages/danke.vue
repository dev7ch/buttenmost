<template>
<v-container>
  <v-row class="text-center">
    <v-col>
      Danke für Ihre Bestellung! {{decodeURI(this.$route.query.kunde)}}
    </v-col>
  </v-row>
</v-container>
</template>
<script>

export default {
  
};
</script>