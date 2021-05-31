<template>
  <v-container>
    <v-row style="max-width:600px">
      <v-col>
        <img src="../static/titelbild.jpg" style="max-width: 600px;" />

        <v-divider></v-divider>
        <h2>Direkt ab Hof:</h2>
        Vom 21. September bis Anfangs November bei der Familie Vögtli/Zaugg/Ming
        am Kirchrain 17, 4146 Hochwald. Bitte telefonisch vorbestellen unter 061
        751 48 21. Von Montag bis Samstag (08:00 – 18:00). Preise Direktverkauf:
        <ul>
          <li>8.00 Fr. pro Liter im Offenverkauf (eigenes Gefäss)</li>
          <li>8.50 Fr. pro Liter im Becher</li>
        </ul>
        Anfahrt: Auf der Hauptstrasse in Hochwald bis Dorfzentrum/Schulhaus,
        dort abbiegen in Oberdorfstrasse, danach weiterfahren bis Kirchrain 17.
        <a
          href="https://www.google.com/maps/d/edit?mid=z_u9B_6UYlL0.kBMpDBC7XyMc"
          >Zur Karte.</a
        >
        <br /><br />
        <h2>Per Post (Versand nur CH):</h2>
        Jeweils am Montag oder Dienstag verschicken wir den Buttenmost für 8.50
        pro Liter plus Porto und Verpackung per Post. Hier können Sie bestellen:
        <br /><br /><br />
        <v-slider
          v-model="zahl"
          dense
          thumb-label="always"
          hint="Regler verstellen, um Menge anzupassen"
          max="20"
          min="1"
          :value="zahl * 2"
          persistent-hint
        ></v-slider>
        <div style="align:center">
          <br />
          <v-alert color="blue" elevation="12" prominent text>
            <pre>Menge:&#160;&#160; {{ zahl }} Liter</pre>
            <pre>Preis: {{ preis.toFixed(2) }} CHF</pre>
            <pre>Porto:&#160; {{ porto.toFixed(2) }} CHF</pre>
            <pre>Total: {{ (zahl + preis + porto).toFixed(2) }} CHF</pre>
          </v-alert>
        </div>
      </v-col>
    </v-row>

    <!-- https://answers.netlify.com/t/vuetify-form-with-nuxt-js-recognized-by-netlify-but-no-form-submissions/11730 -->
    <v-form
      name="bestellung"
      ref="form"
      v-model="valid"
      action="/danke/"
      method="POST"
      lazy-validation
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="bestellung" />
      Buttenmost ist ein Frischprodukt. Heute ist der
      {{ heute.toLocaleDateString("de-CH") }}. Wenn Sie jetzt oder bis
      Sonntagabend bestellen, verschicken wir den Buttenmost am:
      {{ stillPossibleShippingDays[0] }}. Gewöhnlich trifft die Sendung zwei,
      maximal drei Tage nach Versanddatum bei Ihnen ein. Möchten Sie den
      Buttenmost lieber an einem anderen Tag erhalten, dann können Sie das
      Versanddatum wählen:
      <v-select
        :items="stillPossibleShippingDays"
        v-model="selected"
      ></v-select>

      <v-row class="text-center" style="max-width:600px">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="Vorname"
            name="Vorname"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Nachname"
            name="Nachname"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="street"
            label="Strasse + Nummer"
            name="Strasse Nummer"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field
            v-model="plz"
            label="PLZ"
            Name="PLZ"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="9" md="9">
          <v-text-field v-model="town" label="Ort" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone"
            label="Telefonnummer"
            name="Telefonnummer"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            name="mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            name="input"
            label="Bemerkungen"
            value=""
            auto-grow
            rows="1"
          ></v-textarea>
        </v-col>

        <input type="hidden" name="Liter" v-bind:value="zahl" />
        <input type="hidden" name="Preis" v-bind:value="preis" />
        <input type="hidden" name="Porto" v-bind:value="porto" />
        <v-col cols="12" md="12"
          ><v-btn color="primary" elevation="2" large type="submit">
            Jetzt bestellen</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <br /><br />
    <h2>Weitere Verkaufstellen:</h2>
    Wir beliefern über 40 Läden in der ganzen Region. Benutzen Sie die
    Suchfunktion oder schauen Sie sich die Liste durch.
    <v-row
      ><v-col>
        <!-- Daten für Tabelle copy/paste Excel -> http://www.convertcsv.com/csv-to-json.htm -->
        <Verkaufsstellen /> </v-col
    ></v-row>
  </v-container>
</template>

<script>
import Verkaufsstellen from "~/components/verkaufsstellen.vue";

export default {
  components: {
    Verkaufsstellen
  },
  data() {
    return {
      zahl: 4,
      preis_pro_liter: 9.5,
      shippingDays: [
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
    preis: function() {
      return this.zahl * this.preis_pro_liter;
    },
    porto: function() {
      if (this.zahl < 3) {
        return 4.5;
      } else {
        return 9;
      }
    },
    heute: function() {
      //return new Date();
      //for testing during Season
      return new Date("2021-09-21");
    },
    stillPossibleShippingDays: function() {
      let possibleDatesArray = [];
      this.shippingDays.forEach(element => {
        let date = new Date(element);
        if (date > this.heute) {
          possibleDatesArray.push(date.toLocaleDateString("de-CH"));
        }
      });
      return possibleDatesArray;
    }
  },

  mounted() {
    this.selected = this.stillPossibleShippingDays[0];
  }
};
</script>
