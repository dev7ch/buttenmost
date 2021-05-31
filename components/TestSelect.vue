<template>
  <div>
    Possible Dates before "calculating": {{ possibleShippingDays }}
    <hr />
    Possible Dates after "calculating:" {{ stillPossibleShippingDays }}
    <v-select :items="stillPossibleShippingDays" v-model="selected" />
    {{ selected }}

    <v-btn @click="initSelected()">Init</v-btn>
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
      selected: null
    };
  },
  computed: {
    stillPossibleShippingDays() {
      let hilfsarray = [
        "2021-09-14",
        "2021-09-21",
        "2021-09-28",
        "2021-10-05",
        "2021-10-12",
        "2021-10-19",
        "2021-10-26",
        "2021-11-02"
      ];
      return hilfsarray
    },

  },
  methods: {
    initSelected() {
      this.selected = this.stillPossibleShippingDays[0];
    }
  },
  mounted() {
    // setTimeout(() => {
        this.selected = this.stillPossibleShippingDays[0];
    // }, 5000);
}
};
</script>

<style scoped></style>
