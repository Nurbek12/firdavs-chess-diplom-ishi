<template>
    <v-app-bar color="surface-variant" title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
    <div class="d-flex align-center justify-center" style="height: 100vh; width: 100%;">
        <v-card>
            <v-card-text>
                <div>
                    
                </div>
            </v-card-text>
            <v-card-text>
                <!-- <v-btn>1</v-btn> -->
            </v-card-text>
        </v-card>
    </div>
</template>