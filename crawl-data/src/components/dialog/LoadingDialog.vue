<template>
  <sweet-modal ref="modal" :hide-close-button="true" :blocking="true">
    <img src="../../assets/images/sys_loading.gif">
    <p>Hệ thống đang xử lý...<br>Bạn vui lòng đợi trong giây lát.</p>
  </sweet-modal>
</template>

<script>
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
export default {
  props: {
    isLoadingOpen: {
      default: false,
      type: Boolean
    }
  },
  components: {
    SweetModal,
    SweetModalTab
  },
  data() {
    return {};
  },
  watch: {
    isLoadingOpen: function() {
      if (this.isLoadingOpen) {
        this.$refs.modal.open();
      } else {
        this.$refs.modal.close();
      }
    }
  }
};
</script>


<style <style lang="scss" scoped>
img {
  width: 30%;
}
.sweet-content,
.sweet-content-content {
  background: rgba(255, 255, 255, 0.9);
}
</style>

