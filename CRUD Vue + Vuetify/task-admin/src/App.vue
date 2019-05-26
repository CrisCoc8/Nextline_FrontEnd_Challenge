
<template>
  <v-app id="app" class="blue-grey lighten-5" light>
    <v-navigation-drawer
    class="grey lighten-2"
      v-model="drawer"
      clipped
      fixed
      app
    >
    <v-list class="transparent" dense>
      <v-list-tile color="black" :to="{name : 'Tasks'}">
        <v-list-tile-action>
          <v-icon color="black">assignments</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title >Tasks</v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
        </v-list>

    </v-navigation-drawer>


      <v-toolbar color="grey" app fixed clipped-left>
        <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Task Management Tool</v-toolbar-title>
      </v-toolbar>

      <v-content>
        <v-container >
          <v-slide-y-transition mode="out-in">
            <router-view/>
          </v-slide-y-transition>
        </v-container>
      </v-content>


  </v-app>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
     drawer: false
    }
  }
}
</script>

<style media="screen">
#app > div.application--wrap > aside > div.v-list.transparent.v-list--dense.theme--dark > div > a > div.v-list__tile__content > div{
  color:black;
}
  #app > div.application--wrap > main > div > div{
    width: 700px;
  }
  #app > div.application--wrap > main > div{
    background-image:  url('./assets/Fondo.jpg');
  }
</style>
