
<template>
<v-container > 
  <v-row style="max-width:600px">
    <v-col>
<img src="../static/titelbild.jpg" style="max-width: 600px;"/>


<v-divider></v-divider>
<h2>Direkt ab Hof:</h2>
Vom 21. September bis Anfangs November bei der Familie Vögtli/Zaugg/Ming am Kirchrain 17, 4146 Hochwald. Bitte telefonisch vorbestellen unter 061 751 48 21. Von Montag bis Samstag (08:00 – 18:00).

Preise Direktverkauf:
<ul>
<li>8.00 Fr. pro Liter im Offenverkauf (eigenes Gefäss)</li>
<li>8.50 Fr. pro Liter im Becher</li>
</ul>
Anfahrt: Auf der Hauptstrasse in Hochwald bis Dorfzentrum/Schulhaus, dort abbiegen in Oberdorfstrasse, danach weiterfahren bis Kirchrain 17. <a href="https://www.google.com/maps/d/edit?mid=z_u9B_6UYlL0.kBMpDBC7XyMc">Zur Karte.</a>
<br/><br/>
<h2>Per Post (Versand nur CH): </h2>
Jeweils am Montag oder Dienstag verschicken wir den Buttenmost für 8.50 pro Liter plus Porto und Verpackung per Post. Hier können Sie bestellen:
<br/><br/><br/>
      <v-slider
        v-model="zahl"
        dense
        thumb-label="always"
        hint="Regler verstellen, um Menge anzupassen"
        max="20"
        min="1"
        :value="zahl * 2"        
        persistent-hint
      ></v-slider><div style="align:center"><br/>
<v-alert
  color="blue"
  elevation="12"
  prominent
  text
  >

      <pre>Menge:&#160;&#160; {{zahl}} Liter</pre>
      <pre>Preis: {{preis.toFixed(2)}} CHF</pre>
      <pre>Porto:&#160; {{porto.toFixed(2)}} CHF</pre>
      <pre>Total: {{(zahl+preis+porto).toFixed(2)}} CHF</pre>
</v-alert>
      </div>
  
    </v-col>
  </v-row>


  <!-- https://answers.netlify.com/t/vuetify-form-with-nuxt-js-recognized-by-netlify-but-no-form-submissions/11730 -->
  <v-form name="bestellung" ref="form" v-model="valid" action="/danke/" method="POST" lazy-validation data-netlify="true">
              <input type="hidden" name="form-name" value="bestellung" />
            
      <v-row class="text-center" style="max-width:600px">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="Vorname"
            name="Vorname"
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
            label="Nachname"
            name = "Nachname"
            required
          ></v-text-field>
        </v-col>

          <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="street"
            label="Strasse + Nummer"
            name="Strasse Nummer"
            required
          ></v-text-field>
        </v-col>
        
        <v-col
          cols="3"
          md="3"
        >
          <v-text-field
            v-model="plz"
            label="PLZ"
            Name="PLZ"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="9"
          md="9"
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
            v-model="phone"
            label="Telefonnummer"
            name="Telefonnummer"
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
            name="mail"
            required
          ></v-text-field>
            
        </v-col>
         <v-col
          cols="12"
          md="12"
        >
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
         <v-col
          cols="12"
          md="12"
        ><v-btn
  color="primary"
  elevation="2"
  large
  type="submit">
Jetzt bestellen</v-btn>
         </v-col>
      </v-row>
  </v-form>
  <br/><br/>
<h2>Weitere Verkaufstellen:</h2>
Wir beliefern über 40 Läden in der ganzen Region. Benutzen Sie die Suchfunktion oder schauen Sie sich die Liste durch.
<v-row><v-col>
<!-- Daten für Tabelle copy/paste Excel -> http://www.convertcsv.com/csv-to-json.htm -->
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Suchen"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="verkaufsstellen"
      :search="search"
      disable-sort
    ></v-data-table>
  </v-card>
</v-col></v-row>


    </v-container>
</template>

<script>
import Verkaufsstellen from "~/components/verkaufsstellen.vue";
export default {
  components: {
    Verkaufsstellen,
  },
  data() {
    return {
      zahl: 4,
      preis_pro_liter:9.5,
      search: "",
      headers: [
        {
          text: "Ort",
          align: "start",
          filterable: false,
          value: "Ort",
        },
        { text: "Laden", value: "Laden" },
        { text: "Strasse", value: "Strasse" },
        { text: "Kontakt", value: "Kontakt" },
        { text: "Bemerkungen", value: "Bemerkungen" },
      ],
      verkaufsstellen: [
        {
          Ort: "Aesch",
          Laden: 'vor Migros/coop"Brotstand"  Fröhlicher',
          Strasse: "Hauptstrasse 95",
          Kontakt: "079 640 22 87",
          Bemerkungen: "jeden Sa.800-1200",
          Adresse: "Hauptstr.95",
        },
        {
          Ort: "Arboldswil",
          Laden: "Dorfladen",
          Strasse: "Underdorf 19",
          Kontakt: "061 931 17 76",
          Bemerkungen: "vorbestellen",
          Adresse: "Underdorf 19, Arboldswil",
        },
        {
          Ort: "Arlesheim",
          Laden: "Herbstmark Arlesheim",
          Strasse: "Hauptstrasse 25",
          Kontakt: "061 751 48 21",
          Bemerkungen: "17. October 2020",
          Adresse: "Hauptstrasse 25, Arlesheim",
        },
        {
          Ort: "Arlesheim",
          Laden: "Metzgerei Jenzer",
          Strasse: "Ermitagestrasse 16",
          Kontakt: "061 706 52 22",
          Bemerkungen: "Mo-Fr 7-12:15/14-18.30h, Sa 7-16h",
          Adresse: "Ermitagestrasse 16, Arlesheim",
        },
        {
          Ort: "Basel",
          Laden: "Bäumlihofladen",
          Strasse: "Bäumlihofstrasse 148",
          Kontakt: "061 601 30 20",
          Bemerkungen: "",
          Adresse: "Bäumlihofstrasse 148, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Bruderholz-Laden",
          Strasse: "Bruderholzallee 152",
          Kontakt: "079 322 90 92",
          Bemerkungen: "Mo geschl. Di ab 14:00 Mi-So8:30-20:00",
          Adresse: "Bruderholzallee 152, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Peter's Laden",
          Strasse: "St. Galler Ring 176",
          Kontakt: "061 301 03 03",
          Bemerkungen: "Mo-Fr 6-18.30, S 6-12",
          Adresse: "St. Galler Ring 176, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Migros Partner Wanderstrasse",
          Strasse: "Wanderstrasse 121",
          Kontakt: "061 302 31 35",
          Bemerkungen: "Mo-Fr 7.30-20, Sa 7.30-18, So 8-20h",
          Adresse: "Wanderstrasse 121, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Migros Partner Zürcherstrasse",
          Strasse: "Zürcherstrasse 160",
          Kontakt: "061 331 53 00",
          Bemerkungen: "Mo-Fr 7-19h, Sa 7.30-18h",
          Adresse: "Zürcherstrasse 160, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Daniela Fürst Comestibles",
          Strasse: "Wasgenring 74",
          Kontakt: "061 383 73 19",
          Bemerkungen: "Mo-So 7-20h",
          Adresse: "Wasgenring 74, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Apotheke Gellert",
          Strasse: "Karl Jaspers-Allee 1",
          Kontakt: "061 311 05 55",
          Bemerkungen: "Mo-Fr 8-12.15/13.30-18.30, Sa 8-12.15h",
          Adresse: "Karl Jaspers-Allee 1, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Obst und Gemüse Campana",
          Strasse: "Marktplatz",
          Kontakt: "079 214 45 11",
          Bemerkungen: "Di,Do,Fr,Sa",
          Adresse: "Marktplatz, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Zum Kleeblatt",
          Strasse: "Holeestr. 158",
          Kontakt: "061 301 49 56",
          Bemerkungen: "Mo-Fr8:15-12:15/14:00-18:30  Sa 8:15-13:00",
          Adresse: "Holeestr. 158, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Reformhaus Müller",
          Strasse: "Falknerstr. 12",
          Kontakt: "061 261 67 21",
          Bemerkungen: "Mo-Fr:  10:00-18:30 Sa:  09:00-17:00  ",
          Adresse: "Falknerstr. 12, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Lokal",
          Strasse: "Feldbergstr.26",
          Kontakt: "076 541 60 36",
          Bemerkungen: "Mo-Fr:9-19   Sa:9-18",
          Adresse: "Feldbergstr.6, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Wirth's Huus Käsehandel",
          Strasse: "Colmarerstrasse 10",
          Kontakt: "061 381 85 95",
          Bemerkungen: "Mo-Fr 7.30-12.15/14-18.30/Sa730-16h",
          Adresse: "Colmarerstrasse 10, Basel",
        },
        {
          Ort: "Basel",
          Laden: "Finkmüller café, Oelist Müller",
          Strasse: "Güterstr.104",
          Kontakt: "061 271 35 64",
          Bemerkungen: "Mo-Fr 8-21  Sa 9-17  So 10-15",
          Adresse: "Güterstr.104,Basel",
        },
        {
          Ort: "Basel",
          Laden: "Radius 39",
          Strasse: "Wielandplatz 8, Basel",
          Kontakt: "",
          Bemerkungen: "Mo geschlossen",
          Adresse: "Wielandplatz 8, Basel",
        },
        {
          Ort: "Biel-Benken",
          Laden: "Hofladen Zihlmann",
          Strasse: "Hauptstr.41",
          Kontakt: "079 309 23 43",
          Bemerkungen: "Mo-Fr 8-18:30  Sa+So 8-17:30",
          Adresse: "Hauptstr.41,Biel-Benken",
        },
        {
          Ort: "Binningen",
          Laden: "Wuchemärt",
          Strasse: "Dorfplatz beim Feuerwehrmagazin",
          Kontakt: "061 535 90 51",
          Bemerkungen: "Dorfplatz beim Feuerwehrmagazin, Fr. 08:30 - 11:00",
          Adresse: "Binningen",
        },
        {
          Ort: "Birsfelden",
          Laden: "Denner-Satellit",
          Strasse: "Hauptstrasse 23",
          Kontakt: "061 373 37 77",
          Bemerkungen: "Mo-Fr 8-12:15  14:00-18:30    Sa 8-17",
          Adresse: "Hauptstrasse 23, Birsfelden",
        },
        {
          Ort: "Bottmingen",
          Laden: 'Wuchemärt "Brotstand"  Fröhlicher',
          Strasse: "Therwilerstrasse 16",
          Kontakt: "079 640 22 87",
          Bemerkungen: "jeden Di.800-1200",
          Adresse: "Therwilerstrasse 16, Bottmingen",
        },
        {
          Ort: "Breitenbach",
          Laden: "Gemüsestand Marti",
          Strasse: "Eugen-Saner-Platz",
          Kontakt: "061 781 16 71",
          Bemerkungen: "Fr +  Sa 9-11:30",
          Adresse: "Eugen-Saner-Platz, Breitenbach",
        },
        {
          Ort: "Brislach",
          Laden: "Bäckerei Jeker",
          Strasse: "Zwingenstrasse 12",
          Kontakt: "061 783 83 33",
          Bemerkungen: "Mo-Fr 6-18.30, Sa 7-12",
          Adresse: "Zwingenstrasse 12, Brislach",
        },
        {
          Ort: "Büsserach",
          Laden: "Bäckerei Jeker",
          Strasse: "Breitenbachstrasse 20",
          Kontakt: "061 781 13 09",
          Bemerkungen: "Mo-Fr 6-18.30, Sa 7-16, So 7-17h",
          Adresse: "Breitenbachstrasse 20, Büsserach",
        },
        {
          Ort: "Dornach",
          Laden: "Denner-Satellit",
          Strasse: "Hauptstrasse 4",
          Kontakt: "061 703 13 88",
          Bemerkungen: "Mo-Fr 7-18:30  Sa 7-16  So 8-16",
          Adresse: "Hauptstrasse 4, Dornach",
        },
        {
          Ort: "Dornach",
          Laden: "Vital Speisehaus Bio Laden",
          Strasse: "Dorneckstrasse 2",
          Kontakt: "061 706 85 14",
          Bemerkungen: "Mo-Fr 8-18:30    Sa+So 8-16",
          Adresse: "Dorneckstrasse 2, Dornach",
        },
        {
          Ort: "Ettingen",
          Laden: "Bäckerei-Konditorei-Cafe",
          Strasse: "Hauptstrasse 26",
          Kontakt: "061 721 14 77",
          Bemerkungen: "Mo-Fr 6-18.30, Sa 7-14, So 8-12",
          Adresse: "Hauptstrasse 26, Ettingen",
        },
        {
          Ort: "Füllinsdorf",
          Laden: "Migros Schönthal Herbstmarkt",
          Strasse: "Ergolzstrasse 2",
          Kontakt: "061 751 48 21",
          Bemerkungen: "23.+ 24. Okt.2020  8-12 Uhr",
          Adresse: "Ergolzstrasse 2, Füllinsdorf",
        },
        {
          Ort: "Hofstetten",
          Laden: "Jolanda Gschwind",
          Strasse: "Mariasteinerstrasse 14",
          Kontakt: "061 731 14 60",
          Bemerkungen: "vorbestellen",
          Adresse: "Mariasteinerstrasse 14, Hofstetten",
        },
        {
          Ort: "Laufen",
          Laden: "Der Laden",
          Strasse: "Delsbergerstrasse 24",
          Kontakt: "061 763 09 41",
          Bemerkungen: "Di-Fr 8-12:15  14:45-18:30  Sa 8:30-16",
          Adresse: "Delsbergerstrasse 24, Laufen",
        },
        {
          Ort: "Liestal",
          Laden: "Milchhüsli Liestal",
          Strasse: "Zeughausplatz 16",
          Kontakt: "061 627 88 22",
          Bemerkungen: "Mo-Fr 07.30 - 18.30, Sa 07.30 - 16h",
          Adresse: "Zeughausplatz 16, Liestal",
        },
        {
          Ort: "Metzerlen",
          Laden: "Ida Schaffter",
          Strasse: "Hauptstrasse 3",
          Kontakt: "061 731 23 36",
          Bemerkungen: "vorbestellen",
          Adresse: "Hauptstrasse 3, Metzerlen",
        },
        {
          Ort: "Nunningen",
          Laden: "Bäckerei Jeker",
          Strasse: "Bretzwilerstrasse 4",
          Kontakt: "061 791 14 30",
          Bemerkungen: "Mo-Fr 6-18.30, Sa 6.30-13, So 7.30-11.30",
          Adresse: "Bretzwilerstrasse 4, Nunningen",
        },
        {
          Ort: "Oberwil",
          Laden: "Impuls Drogerie Schläpfer",
          Strasse: "Hauptstrasse 39",
          Kontakt: "061 401 34 50",
          Bemerkungen: "Mo-Fr 8-12.15/13.30-18.30, Sa 8-16h",
          Adresse: "Hauptstrasse 39, Oberwil",
        },
        {
          Ort: "Pratteln",
          Laden: "Bielser Obstbau Direktverkauf",
          Strasse: "Hauptstrasse 51",
          Kontakt: "061 821 55 04",
          Bemerkungen: "vorbestellen",
          Adresse: "Hauptstrasse 51, Pratteln",
        },
        {
          Ort: "Reinach",
          Laden: 'Wuchemärt "Brotstand"  Fröhlicher',
          Strasse: "Hauptstrasse 10",
          Kontakt: "079 640 22 87",
          Bemerkungen: "jeden Fr.800-1200",
          Adresse: "Hauptstrasse 10, Reinach",
        },
        {
          Ort: "Rheinfelden",
          Laden: "Zum Nektar",
          Strasse: "Obertorplatz 7",
          Kontakt: "061 831 00 33",
          Bemerkungen: "vorbestellen  Mo geschlossen",
          Adresse: "Obertorplatz 7, Rheinfelden",
        },
        {
          Ort: "Rodersdorf",
          Laden: "Der Laden",
          Strasse: "Bahnhofstrasse 3",
          Kontakt: "061 733 07 77",
          Bemerkungen: "Mo-Fr 7-12.15/14-18.30, Sa 7-12, So 9-12",
          Adresse: "Bahnhofstrasse 3, Rodersdorf",
        },
        {
          Ort: "Seewen",
          Laden: "Dorfladen",
          Strasse: "Dorfstrasse 6",
          Kontakt: "061 911 01 68",
          Bemerkungen: "Mo-Fr 7.30-12.15/14.30-18.30, Di geschlossen",
          Adresse: "Dorfstrasse 6, Seewen",
        },
        {
          Ort: "Sissach",
          Laden: "Treffpunkt Milchhüsli",
          Strasse: "Rheinfelderstr. 121",
          Kontakt: "061 971 22 55",
          Bemerkungen: "Mo-Fr 7-12.15 / 14 - 18.30, Sa 7-15h",
          Adresse: "Rheinfelderstr. 121,Sissach",
        },
        {
          Ort: "Ziefen",
          Laden: "Cheesi Dorfladen",
          Strasse: "Eienstrasse 34",
          Kontakt: "061 931 10 95",
          Bemerkungen: "Mo-Fr 7-12/15-18.30, Sa 7-12h",
          Adresse: "Eienstrasse 34, Ziefen",
        },
      ],
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
