<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
      >
        <v-list>
          <v-list-item link @click="navegateTo('home')">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="navegateTo('studentsGrid')">
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Alunos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        app
        clipped-left
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>MÓDULO ACADÊMICO</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <v-container 
          fill-height 
          fluid
        >
          <v-layout 
            justify-center
          >
            <v-flex 
              class="page"
              shrink>
              <router-view/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>

      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import navegateTo from '@/mixins/navegateTo'

export default {
    mixins: [navegateTo],
    data: () => ({
      drawer: true,
    }),
}
</script>

<style scoped>
  .page{
    width: 80%;
  }
</style>
