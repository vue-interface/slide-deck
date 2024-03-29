import { ref as p, defineComponent as u, onMounted as g, openBlock as s, createElementBlock as h, createBlock as a, resolveDynamicComponent as k, resolveComponent as A, normalizeClass as c, renderSlot as o, createElementVNode as v, normalizeStyle as $, createVNode as y, Transition as S, withCtx as _, KeepAlive as E, withModifiers as b, normalizeProps as B, guardReactiveProps as C, createTextVNode as L } from "vue";
const x = { class: "slide-deck-slide" };
let f = p();
const z = /* @__PURE__ */ u({
  __name: "Slide",
  props: {
    node: null
  },
  setup(e) {
    const t = e;
    return g(() => {
      var i, n;
      (n = (i = f.value) == null ? void 0 : i.el) == null || n.dispatchEvent(new Event("enter"));
    }), (i, n) => (s(), h("div", x, [
      (s(), a(k(t.node), {
        ref_key: "node",
        ref: f
      }, null, 512))
    ]));
  }
}), w = u({
  components: {
    Slide: z
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Number,
      default: 0
    },
    autoResize: {
      type: Boolean,
      default: !0
    },
    controls: Boolean,
    props: {
      type: Object,
      default: () => ({})
    },
    slots: {
      type: Array,
      default: void 0
    }
  },
  emits: [
    "before-enter",
    "enter",
    "after-enter",
    "before-leave",
    "leave",
    "after-leave"
  ],
  data() {
    return {
      currentActive: this.active,
      direction: "forward",
      maxHeight: void 0,
      mounted: !1,
      lastSlide: null,
      sliding: !1
    };
  },
  watch: {
    currentActive(e, t) {
      this.lastSlide = t, this.direction = this.findIndex(t) > this.findIndex(e) ? "backward" : "forward";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = !0, this.$emit("enter", this.slot());
    });
  },
  methods: {
    findIndex(e) {
      return this.vnodes().findIndex((t, i) => t.key === e || i === e);
    },
    find(e) {
      return this.vnodes()[this.findIndex(e)];
    },
    first() {
      this.goto(0);
    },
    last() {
      this.goto(this.vnodes().length - 1);
    },
    goto(e) {
      this.sliding || (this.currentActive = Math.max(0, e));
    },
    next() {
      this.sliding || (this.currentActive = Math.min(
        this.findIndex(this.currentActive) + 1,
        this.vnodes().length - 1
      ));
    },
    prev() {
      this.sliding || (this.currentActive = Math.max(
        this.findIndex(this.currentActive) - 1,
        0
      ));
    },
    resize(e) {
      const t = getComputedStyle(e).height;
      this.maxHeight = t === "0x" ? this.maxHeight : t;
    },
    slot() {
      return this.find(this.currentActive);
    },
    vnodes() {
      return (this.slots || this.$slots.default(this)).map((e, t) => (e.props = Object.assign(
        {},
        e.props,
        this.props,
        this.attrs
      ), Object.assign(e, {
        key: t
      })));
    },
    onClickControl(e, t) {
      this.sliding || this.goto(t);
    },
    onBeforeLeave(e) {
      this.autoResize && this.resize(e), this.$emit(
        "before-leave",
        this.slot(),
        this.find(this.lastSlide)
      );
    },
    onBeforeEnter() {
      this.sliding = !0, this.$emit(
        "before-enter",
        this.slot(),
        this.find(this.lastSlide)
      );
    },
    onEnter(e) {
      this.$nextTick(() => {
        this.autoResize && this.resize(e), this.$emit(
          "enter",
          this.slot(),
          this.find(this.lastSlide)
        );
      });
    },
    onAfterEnter() {
      this.$emit(
        "after-enter",
        this.slot(),
        this.find(this.lastSlide)
      );
    },
    onLeave() {
      this.$nextTick(() => {
        this.$emit(
          "leave",
          this.slot(),
          this.find(this.lastSlide)
        );
      });
    },
    onAfterLeave() {
      this.sliding = !1, this.$nextTick(() => {
        this.maxHeight = null, this.$emit(
          "after-leave",
          this.slot(),
          this.find(this.lastSlide)
        );
      });
    }
  }
});
const m = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [n, l] of t)
    i[n] = l;
  return i;
};
function I(e, t, i, n, l, r) {
  const d = A("Slide");
  return s(), h("div", {
    class: c(["slide-deck", { sliding: e.sliding }])
  }, [
    o(e.$slots, "top", { active: e.currentActive }),
    v("div", {
      ref: "content",
      class: c(["slide-deck-content", { [e.direction]: !0 }]),
      style: $({ maxHeight: e.maxHeight })
    }, [
      y(S, {
        name: `slide-${e.direction}`,
        onBeforeEnter: e.onBeforeEnter,
        onEnter: e.onEnter,
        onAfterEnter: e.onAfterEnter,
        onBeforeLeave: e.onBeforeLeave,
        onLeave: e.onLeave,
        onAfterLeave: e.onAfterLeave
      }, {
        default: _(() => [
          (s(), a(E, null, [
            (s(), a(d, {
              ref: "slide",
              key: e.currentActive,
              node: e.find(e.currentActive)
            }, null, 8, ["node"]))
          ], 1024))
        ]),
        _: 1
      }, 8, ["name", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
    ], 6),
    o(e.$slots, "middle", { active: e.currentActive }),
    o(e.$slots, "bottom", { active: e.currentActive })
  ], 2);
}
const D = /* @__PURE__ */ m(w, [["render", I]]), H = {
  props: {
    active: {
      type: Number,
      default: 0
    },
    slots: {
      type: Array,
      required: !0
    }
  },
  computed: {
    context() {
      return this;
    }
  },
  methods: {
    isActive(e, t) {
      return e.key === this.active || t === this.active;
    },
    onClick(e, t) {
      this.$emit("click", e, t);
    }
  }
};
const O = { class: "slide-deck-controls" };
function T(e, t, i, n, l, r) {
  return s(), h("div", O, [
    v("a", {
      href: "#",
      class: c(["slide-deck-control-icon", { "is-active": r.isActive(e.slide, i.active) }]),
      onClick: t[0] || (t[0] = b((d) => r.onClick(d, e.slide), ["prevent"]))
    }, [
      o(e.$slots, "default", B(C(Object.assign({ slide: e.slide, active: i.active }, r.context))), () => [
        L("\u2022")
      ])
    ], 2)
  ]);
}
const M = /* @__PURE__ */ m(H, [["render", T]]);
export {
  z as Slide,
  D as SlideDeck,
  M as SlideDeckControls
};
//# sourceMappingURL=slide-deck.js.map
