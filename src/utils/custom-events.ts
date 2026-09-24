import {VariantType} from "notistack";

export function showToast(message: string, variant: VariantType = 'success') {
    const event = new CustomEvent("show_toast", {
        detail: { message, variant },
    });

    window.dispatchEvent(event);
}