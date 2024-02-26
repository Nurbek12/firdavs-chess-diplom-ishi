<template>
    <v-container>
        <v-row>
            <v-col cols="12" v-for="i in 10" :key="i">
                <v-alert
                    icon="mdi-sword-cross"
                    title="Alert title"
                    color="surface"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!">
                    <div class="d-flex justify-end">
                        <v-btn color="primary">Play</v-btn>
                    </div>
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>