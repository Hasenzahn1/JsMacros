package xyz.wagyourtail.jsmacros.client.mixins.access;

import net.minecraft.client.Keyboard;
import net.minecraft.client.gui.Element;
import net.minecraft.client.gui.ParentElement;
import net.minecraft.client.gui.screen.Screen;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;
import xyz.wagyourtail.jsmacros.client.access.IScreenInternal;

@Mixin(Keyboard.class)
public class MixinKeyboard {

    @Redirect(method = "method_1454", at = @At(value = "INVOKE", target = "Lnet/minecraft/client/gui/ParentElement;keyPressed(III)Z"))
    private boolean onKeyPressed(ParentElement instance, int keyCode, int scanCode, int modifiers) {
        ((IScreenInternal) instance).jsmacros_keyPressed(keyCode, scanCode, modifiers);
        return instance.keyPressed(keyCode, scanCode, modifiers);
    }

//    @Redirect(method = "method_1458", at = @At(value = "INVOKE", target = "Lnet/minecraft/client/gui/Element;charTyped(CI)Z"))
//    private static boolean onCharTyped(Element instance, char chr, int modifiers) {
//        ((IScreenInternal) instance).jsmacros_charTyped((char) chr, modifiers);
//        return instance.charTyped(chr, modifiers);
//    }
}
