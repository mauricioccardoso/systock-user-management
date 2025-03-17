<template>
  <v-card class="mx-auto" color="blue-grey-darken-4">
    <v-layout>
      <v-app-bar color="blue-grey-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <v-app-bar-title>Home</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main class="mt-6 d-flex flex-wrap">
        <v-skeleton-loader
          v-for="(item, index) in Array(10).fill(0)"
          class="mx-auto mt-4"
          elevation="12"
          max-width="400"
          type="table-heading, list-item-two-line, image, table-tfoot"
        ></v-skeleton-loader>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts"></script>
