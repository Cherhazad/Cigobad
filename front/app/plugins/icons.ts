import {addIcons} from "oh-vue-icons";
import {BiSun, FaUsers, MdDarkmode} from "oh-vue-icons/icons";

export default defineNuxtPlugin(() => {
    addIcons(
        FaUsers,
        MdDarkmode,
        BiSun,
    )
})