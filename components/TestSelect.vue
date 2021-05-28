<template>
  <div>
    <v-select :items="possibleShippingDays" v-model="selected" />
    {{selected}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      possibleShippingDays: [
        "2021-09-07",
        "2021-09-14",
        "2021-09-21",
        "2021-09-28",
        "2021-10-05",
        "2021-10-12",
        "2021-10-19",
        "2021-10-26",
        "2021-11-02"
      ],
    }
  },
  computed:{
      selected: function(){return this.possibleShippingDays ? this.possibleShippingDays[0] : ""}
  }
}
</script>

<style scoped></style>
