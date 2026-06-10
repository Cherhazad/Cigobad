import {addIcons, OhVueIcon} from "oh-vue-icons";
import {BiSun, FaUsers, MdDarkmodeRound} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
});

addIcons(
    FaUsers,
    MdDarkmodeRound,
    BiSun,
)
