---
date: 2024-05-26
---
Being a programmer and avid user of a 32 key layout (see [[keyboard]]), I've spent quite a lot of time optimizing my symbol layer and how it's activated. 

There are two problems with symbols on low key count boards:

1. Speed reduction and false negatives. Regardless of how the symbol layer is activated (HRM or dedicated key), the activation must occur *before* symbol access. Why is this a problem? Well, if you spend enough time coding, you get *really* fast at typing symbols. This rapid layer switching will often result in false negatives because, unless you have unnatural consistency, the symbol key could be pressed prior to the activation key. 

2. Combos are not a perfect solution. Reading the above, you may have thought, why not map every symbol as a combo? Well, this is exactly what [urob](https://github.com/urob/zmk-config) has done and people like it quite a lot. It's not a perfect solution though because we have common symbol pairings like `+=`, `-=`, `>=`, `<=`...and `(),[],{}` (if you don't like auto-closing). These pairings are best mapped as inner rolls for speed and comfort. 

What I'm proposing is a hybrid approach. The concept is very simple: symbols are mapped to a layer *and* each symbol also gets a corresponding combo. When you type a single `<`, you hit the combo. When you type `<=`, you hit the combo for `<` but *keep holding* the pseudo-modifier and press the `=` key. The combo works as expected, but while the pseudo-modifier has not been released, the symbol layer is active. 

Why am I calling it a pseudo-modifier? Because it works similar to a dedicated activation key, but the activation of the layer is only available through a combo + holding action. The timing does take some getting used to, but after a couple days I've found it to be very fast and natural.

**ZMK macro:**
```
macros {
	clh: combo_layer_hybrid {
		compatible = "zmk,behavior-macro-two-param";
		#binding-cells = <2>;
		bindings
			= <&macro_param_1to1>
			, <&macro_press &mo MACRO_PLACEHOLDER>
			, <&macro_param_2to1>
			, <&macro_tap &kp MACRO_PLACEHOLDER>
			, <&macro_pause_for_release>
			, <&macro_param_1to1>
			, <&macro_release &mo MACRO_PLACEHOLDER>
			;
	};
}
```

**ZMK combo example for `=` and key position 14:**
```
//define SYM_PSEUDO_MOD_KEY and SYM_LAYER somewhere

combos {
	compatible = "zmk,combos";
	
	combo_equal {
		timeout-ms = <COMBO>;
		key-positions = <SYM_PSEUDO_MOD_KEY 14>; 
		layers = <DEF>;
		slow-release;
		bindings = <&clh SYM_LAYER EQUAL>;
		require-prior-idle-ms = <COMBO_IDLE>;
	};
}
```

See my [repo](https://github.com/sashalex007/ergo_alex_zmk) for more detail...my personal setup is very unorthodox but in principle, any keymap layer can be converted to a hybrid one. 

Personal keymap:
- cross-hand layers for symbols
- I also use this hybrid approach for the num layer
- my pseudo-modifiers are on the home-row.
- I use urob style HRM's for everything else

Thanks for reading!



