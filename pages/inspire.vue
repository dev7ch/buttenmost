<template>
<v-container>
  <v-row class="text-center">
    <v-col>
      <TestSelect/>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
import TestSelect from '@/components/TestSelect.vue';

export default {
  components: {
    TestSelect
  },
};
</script>