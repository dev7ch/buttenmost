
<template>
  <v-row>
    <v-col class="text-center">
      <img src="../static/titelbild.jpg" alt="Vuetify.js" class="mb-5" />

      <blockquote class="blockquote">
        Buttenmost bestellen
      </blockquote>

      <v-slider
        v-model="zahl"
        dense
        thumb-label="always"
        hint="Anzahl Liter"
        max="20"
        min="1"
        :value="zahl * 2"
      ></v-slider>
      <pre>Liter: {{zahl}}</pre>
      <pre>Preis: {{preis}} CHF</pre>
      <pre>Porto: {{porto}}</pre>
      <pre>Total: {{zahl+preis+porto}}</pre>
      
  
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

          <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="street"
            label="Strasse"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="number"
            label="Nummer"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="plz"
            label="PLZ"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="town"
            label="Ort"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
            
        </v-col>
         <v-col
          cols="12"
          md="12"
        ><v-btn
  color="primary"
  elevation="2"
  large
>Jetzt bestellen</v-btn>
         </v-col>
      </v-row>
    </v-container>
  </v-form>
    </v-col>
  </v-row>
</template>

<script>
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    VuetifyLogo,
  },
  data() {
    return {
      zahl: 4,
      preis_pro_liter:9.5,
    };
  },
  computed: {
    preis: function () {
      return this.zahl * this.preis_pro_liter
    },
    porto: function () {
      if(this.zahl <3){
        return 4.5
      }
      else{
        return 9
      }

    }


  }
};
</script>
