
<template>
  <v-app id="app" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
    <v-list dense>
      <v-list-tile :to="{name : 'Tasks'}">
        <v-list-tile-action>
          <v-icon>assignments</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Tasks</v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
        </v-list>

    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Task Management Tool</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
      <br>
      <h3> Task Management Tool</h3>
    </v-footer>
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
