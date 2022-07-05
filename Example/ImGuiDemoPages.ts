import {ImGui, ImVec2} from 'cpp'
import {$ref, $unref, $set, toCString, toCPtrArray} from 'puerts';
import { ConstraintProfileProperties } from 'ue';

// string literal
let simple_window_titil = toCString("Simple Window"); // faster than passing a string
let listbox_items = [ "Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon"].map(toCString);
let listbox_items_cptr_array = toCPtrArray.apply(null, listbox_items);
(listbox_items_cptr_array as any).__ab = listbox_items; //prevent gc

let f = $ref(0);
let showAnotherWindow = $ref(false);
let showDemoWindow = $ref(false);
let rgb = new Float32Array([114/255, 144/255, 154/255, 255]);
let listbox_item_current = $ref(1);

export function Render() {
    ImGui.Text("Hello, world!");
    ImGui.SliderFloat("float", f, 0.0, 1.0);
    ImGui.ColorEdit3("clear color", rgb);

    if(ImGui.Button("Demo Window"))
    {
        $set(showDemoWindow, !$unref(showDemoWindow));
    }

    if(ImGui.Button("Another Window"))
    {
        $set(showAnotherWindow, !$unref(showAnotherWindow));
    }

    ImGui.ListBox("listbox\n(single select)", listbox_item_current, listbox_items_cptr_array, 9, 4);

    ImGui.Text(`listbox item${$unref(listbox_item_current)} selected`);

    ImGui.Text(`Application average ${(1000 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);

    if ($unref(showAnotherWindow)) {
        ImGui.SetNextWindowSize(new ImVec2(200, 100), 1 << 2)
        ImGui.Begin(simple_window_titil, showAnotherWindow);
        ImGui.Text("hello world");
        ImGui.End();
    }

    if ($unref(showDemoWindow)) {
        ImGui.ShowDemoWindow(showDemoWindow);
    }
}
