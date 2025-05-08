// src/plugins/globalVueApi.js
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';

export default {
    install: (app) => {
        app.config.globalProperties.$ref = ref;
        app.config.globalProperties.$reactive = reactive;
        app.config.globalProperties.$computed = computed;
        app.config.globalProperties.$watch = watch;
        app.config.globalProperties.$onMounted = onMounted;
        app.config.globalProperties.$onUnmounted = onUnmounted;
    },
};