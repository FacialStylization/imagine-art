import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCloudUploadAlt,
  faDownload,
  faRedo,
  faShareAlt,
  faFilm,
  faArrowRight,
  faCog,
  faQuestionCircle,
  faUpload,
  faImage,
  faVideo,
  faGear,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

// 防止Font Awesome图标的CSS被提前加载
config.autoAddCss = false;

// 添加所需图标
library.add(
  faCloudUploadAlt,
  faDownload,
  faRedo,
  faShareAlt,
  faFilm,
  faArrowRight,
  faCog,
  faQuestionCircle,
  faUpload,
  faImage,
  faVideo,
  faGear,
  faWandMagicSparkles
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
