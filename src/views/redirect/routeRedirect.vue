<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2022-01-05 17:34:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 15:17:26
-->
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const { params, query } = useRoute();
    const { path } = params;
    useRouter()
      .replace({ path: "/" + path, query })
      .catch((err) => {
        console.warn(err);
      });
  },
  // eslint-disable-next-line vue/require-render-return
  render() {
    // Avoid warning for missing template
  },
});
</script>
